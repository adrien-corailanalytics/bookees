-- Agorabica — schéma initial
-- À exécuter via `supabase db push` ou en collant dans le SQL Editor de Supabase.

create extension if not exists "pgcrypto";

-- ========== ENUMS ==========

create type event_type as enum ('book_club', 'rencontre', 'communaute');
create type event_status as enum ('draft', 'published', 'cancelled');
create type registration_status as enum ('confirmed', 'waitlist', 'cancelled');
create type poll_phase as enum ('before', 'after');
create type poll_choice as enum ('agree', 'disagree', 'depends');

-- ========== EVENTS ==========

create table events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  type event_type not null,
  question text,
  description text not null default '',
  -- Stockées en heure locale de Paris (naive), l'app est mono-timezone.
  start_date timestamp not null,
  end_date timestamp not null,
  timezone text not null default 'Europe/Paris',
  venue_name text not null,
  address text not null,
  capacity int not null default 20,
  status event_status not null default 'draft',
  cover_image text,
  registration_open boolean not null default true,
  conditions text,
  resource_title text,
  resource_url text,
  created_at timestamptz not null default now()
);

create index events_status_start_idx on events (status, start_date);

-- ========== SPEAKERS ==========

create table speakers (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events (id) on delete cascade,
  name text not null,
  role text,
  bio text,
  image text,
  sort_order int not null default 0
);

create index speakers_event_idx on speakers (event_id);

-- ========== REGISTRATIONS ==========

create table registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  status registration_status not null default 'confirmed',
  first_time boolean not null default false,
  source text,
  newsletter_opt_in boolean not null default false,
  cancellation_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create index registrations_event_idx on registrations (event_id, status);
create unique index registrations_token_idx on registrations (cancellation_token);

-- Empêche les doublons actifs (une même personne ne s'inscrit qu'une fois
-- par événement tant qu'elle n'a pas annulé).
create unique index registrations_unique_active_email
  on registrations (event_id, lower(email))
  where status <> 'cancelled';

-- ========== NEWSLETTER ==========

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text,
  created_at timestamptz not null default now()
);

-- ========== ADMINS ==========
-- Table d'autorisation : un utilisateur Supabase Auth doit y figurer pour
-- accéder à /admin. Ajouter une ligne manuellement après avoir créé le
-- compte via Supabase Auth (voir README).

create table admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- ========== POLLS (fonction "Avant / Après") ==========

create table polls (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events (id) on delete cascade,
  question text not null,
  current_phase poll_phase not null default 'before',
  is_open boolean not null default true,
  created_at timestamptz not null default now()
);

create index polls_event_idx on polls (event_id);

create table poll_votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references polls (id) on delete cascade,
  phase poll_phase not null,
  choice poll_choice not null,
  -- identifiant anonyme généré côté client (localStorage), pas de donnée
  -- personnelle : sert uniquement à limiter à un vote par phase.
  voter_key text not null,
  created_at timestamptz not null default now()
);

create unique index poll_votes_unique_vote
  on poll_votes (poll_id, phase, voter_key);

-- ========== TRIGGER : promotion automatique de la liste d'attente ==========
-- Quand une inscription passe à "cancelled" (annulation), on promeut
-- automatiquement la plus ancienne personne en liste d'attente pour le
-- même événement. L'email de notification à la personne promue est envoyé
-- par le code applicatif (pas par ce trigger : Postgres ne peut pas appeler
-- Resend directement) — voir app/api/registrations/[token]/cancel/route.ts
-- et app/admin/actions.ts (cancelRegistrationAdmin), qui identifient la
-- candidate avant l'UPDATE puis lui envoient l'email juste après. Un
-- changement de statut fait par un autre chemin (SQL direct, etc.) ne
-- déclenchera pas cet email — voir README section "Aller plus loin".

create or replace function promote_next_waitlisted()
returns trigger as $$
declare
  next_id uuid;
begin
  if new.status = 'cancelled' and old.status = 'confirmed' then
    select id into next_id
    from registrations
    where event_id = new.event_id
      and status = 'waitlist'
    order by created_at asc
    limit 1
    for update skip locked;

    if next_id is not null then
      update registrations set status = 'confirmed' where id = next_id;
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_promote_next_waitlisted
  after update of status on registrations
  for each row
  execute function promote_next_waitlisted();

-- ========== RPC : résultats de sondage agrégés (pas de vote individuel exposé) ==========

create or replace function get_poll_results(p_poll_id uuid)
returns table (phase poll_phase, choice poll_choice, votes bigint) as $$
  select phase, choice, count(*) as votes
  from poll_votes
  where poll_id = p_poll_id
  group by phase, choice;
$$ language sql stable security definer;

-- ========== ROW LEVEL SECURITY ==========

alter table events enable row level security;
alter table speakers enable row level security;
alter table registrations enable row level security;
alter table newsletter_subscribers enable row level security;
alter table admins enable row level security;
alter table polls enable row level security;
alter table poll_votes enable row level security;

-- Helper : l'utilisateur courant est-il admin ?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from admins where user_id = auth.uid()
  );
$$ language sql stable security definer;

-- Events : lecture publique des events publiés, tout pour les admins.
create policy "events_public_read" on events
  for select using (status = 'published' or is_admin());
create policy "events_admin_write" on events
  for all using (is_admin()) with check (is_admin());

-- Speakers : lisibles si l'event parent est publié (ou admin).
create policy "speakers_public_read" on speakers
  for select using (
    exists (
      select 1 from events e
      where e.id = speakers.event_id and (e.status = 'published' or is_admin())
    )
  );
create policy "speakers_admin_write" on speakers
  for all using (is_admin()) with check (is_admin());

-- Registrations : création publique (le formulaire d'inscription), pas de
-- lecture publique (données personnelles). Les admins voient/gèrent tout.
-- L'annulation et la confirmation passent par des Route Handlers utilisant
-- la clé service_role (contournent RLS), le token faisant office d'autorisation.
create policy "registrations_public_insert" on registrations
  for insert with check (true);
create policy "registrations_admin_read" on registrations
  for select using (is_admin());
create policy "registrations_admin_write" on registrations
  for update using (is_admin());

-- Newsletter : inscription publique, lecture admin uniquement.
create policy "newsletter_public_insert" on newsletter_subscribers
  for insert with check (true);
create policy "newsletter_admin_read" on newsletter_subscribers
  for select using (is_admin());

-- Admins : lecture de sa propre ligne uniquement (sert à vérifier le rôle côté client si besoin).
create policy "admins_self_read" on admins
  for select using (auth.uid() = user_id);

-- Polls : lecture publique si le poll est lié à un event publié.
create policy "polls_public_read" on polls
  for select using (
    exists (
      select 1 from events e
      where e.id = polls.event_id and (e.status = 'published' or is_admin())
    )
  );
create policy "polls_admin_write" on polls
  for all using (is_admin()) with check (is_admin());

-- Poll votes : insertion publique (le vote lui-même), pas de lecture directe
-- (on passe par la fonction get_poll_results qui n'expose que des agrégats).
create policy "poll_votes_public_insert" on poll_votes
  for insert with check (true);
create policy "poll_votes_admin_read" on poll_votes
  for select using (is_admin());
