-- Agorabica — Ressourcerie (bibliothèque de ressources) + Carte des lieux
-- À exécuter après 0001_init.sql.

create type resource_type as enum ('book', 'podcast', 'documentary', 'article', 'other');

-- ========== RESOURCES ==========
-- Catalogue transversal des ressources citées en book club (pas seulement
-- celle du champ `events.resource_*`, qui reste une mise en avant ponctuelle
-- sur la page de l'événement) : livres, podcasts, documentaires, articles.

create table resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type resource_type not null default 'book',
  author text,
  description text,
  url text,
  cover_image text,
  -- Événement (book club) où la ressource a été mentionnée, si connu.
  event_id uuid references events (id) on delete set null,
  created_at timestamptz not null default now()
);

create index resources_type_idx on resources (type);
create index resources_event_idx on resources (event_id);

alter table resources enable row level security;

create policy "resources_public_read" on resources
  for select using (true);
create policy "resources_admin_write" on resources
  for all using (is_admin()) with check (is_admin());

-- ========== VENUES ==========
-- Lieux mis en avant sur la carte ("les lieux cool où se tiennent les
-- rencontres"). Indépendant des events.venue_name/address en texte libre :
-- une sélection éditorialisée, pas un miroir 1:1 de chaque événement.

create table venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  city text,
  lat double precision,
  lng double precision,
  description text,
  photo_url text,
  -- Un événement représentatif à ce lieu, pour proposer un lien "voir la
  -- prochaine rencontre ici" depuis la carte (optionnel).
  event_id uuid references events (id) on delete set null,
  created_at timestamptz not null default now()
);

create index venues_event_idx on venues (event_id);

alter table venues enable row level security;

create policy "venues_public_read" on venues
  for select using (true);
create policy "venues_admin_write" on venues
  for all using (is_admin()) with check (is_admin());
