-- Données de démonstration Agorabica
-- À exécuter après 0001_init.sql (SQL Editor Supabase, ou `supabase db reset`).

insert into events (
  slug, title, type, question, description, start_date, end_date, venue_name,
  address, capacity, status, registration_open, resource_title, resource_url
) values (
  'peut-on-encore-debattre',
  'Peut-on encore débattre ?',
  'book_club',
  'Peut-on encore débattre ?',
  E'On se retrouve autour d''un livre pour parler de polarisation, de désaccord et de conversation démocratique. Pas besoin de l''avoir lu en entier : quelques pages ou l''envie d''en discuter suffisent.\n\nAu programme : un tour de table, une discussion ouverte, et beaucoup de café. On cherche moins à trancher qu''à mieux comprendre pourquoi on n''est pas d''accord — et si c''est si grave que ça.',
  '2026-09-10 19:00',
  '2026-09-10 21:00',
  'Le Court Bouillon',
  '6 rue des Capucins, Lyon',
  20,
  'published',
  true,
  E'Pourquoi n''arrivons-nous plus à nous parler ? — Gérald Bronner',
  null
),
(
  'tiktok-democratie',
  'TikTok est-il encore compatible avec la démocratie ?',
  'rencontre',
  'TikTok est-il encore compatible avec la démocratie ?',
  E'Algorithmes de recommandation, viralité, jeunesse politisée sur les réseaux : une soirée pour comprendre comment TikTok façonne le débat public, avec deux regards qui ne partent pas des mêmes constats.\n\nAu programme : présentation, échange entre les intervenants, questions du public, puis apéro pour continuer la conversation.',
  '2026-09-24 19:30',
  '2026-09-24 22:00',
  'La Cabane à Docs',
  '12 quai du Port, Marseille',
  80,
  'published',
  true,
  null,
  null
),
(
  'a-quoi-sert-le-travail',
  'À quoi sert encore le travail ?',
  'book_club',
  'À quoi sert encore le travail ?',
  E'Sens au travail, quiet quitting, semaine de 4 jours, revenu universel : le travail occupe une place centrale dans nos vies, mais on n''est plus vraiment d''accord sur pourquoi. On en discute, livre ou pas, avis tranché ou pas.',
  '2026-10-08 19:00',
  '2026-10-08 21:00',
  'Le Chantier',
  '8 rue du Chai des Farines, Bordeaux',
  20,
  'published',
  true,
  E'Bullshit Jobs — David Graeber',
  null
),
(
  'qui-decide-de-nos-frontieres',
  'Qui décide de nos frontières ?',
  'book_club',
  'Qui décide de nos frontières ?',
  E'Migrations, asile, politiques européennes : un sujet chargé, qu''on essaie d''aborder avec curiosité plutôt qu''avec des slogans. On part d''un podcast pour ouvrir la discussion.',
  '2026-08-05 19:00',
  '2026-08-05 21:00',
  'Le Court Bouillon',
  '6 rue des Capucins, Lyon',
  20,
  'published',
  false,
  E'Podcast "Injustices" — épisode sur l''asile en France',
  null
);

insert into speakers (event_id, name, role, bio, sort_order)
select id, 'Camille Faure', 'Chercheuse en sociologie des médias', 'Travaille sur les usages politiques des plateformes vidéo et l''économie de l''attention.', 0
from events where slug = 'tiktok-democratie';

insert into speakers (event_id, name, role, bio, sort_order)
select id, 'Nassim Belkacem', 'Ancien créateur de contenu, consultant en éducation aux médias', 'A quitté TikTok après trois ans à temps plein pour former des lycéens à l''esprit critique numérique.', 1
from events where slug = 'tiktok-democratie';

insert into polls (event_id, question, current_phase)
select id, 'Les réseaux sociaux font-ils plus de mal que de bien à la démocratie ?', 'before'
from events where slug = 'tiktok-democratie';

-- Quelques votes de démonstration pour visualiser la dataviz avant/après.
insert into poll_votes (poll_id, phase, choice, voter_key)
select p.id, 'before', c.choice, 'seed-' || c.n
from polls p,
  (values ('agree'::poll_choice, 1), ('agree'::poll_choice, 2), ('agree'::poll_choice, 3),
          ('agree'::poll_choice, 4), ('agree'::poll_choice, 5), ('agree'::poll_choice, 6),
          ('disagree'::poll_choice, 7), ('disagree'::poll_choice, 8),
          ('depends'::poll_choice, 9), ('depends'::poll_choice, 10)) as c(choice, n)
where p.event_id = (select id from events where slug = 'tiktok-democratie');
