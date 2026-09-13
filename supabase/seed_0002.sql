-- Données de démonstration pour la Ressourcerie et la Carte.
-- À exécuter après 0002_resources_venues.sql et seed.sql.

insert into resources (title, type, author, description, event_id)
select 'Pourquoi n''arrivons-nous plus à nous parler ?', 'book', 'Gérald Bronner',
  E'Le livre qui a nourri la discussion du book club sur la polarisation et le désaccord démocratique.',
  id
from events where slug = 'peut-on-encore-debattre';

insert into resources (title, type, author, description)
values (
  'Bullshit Jobs',
  'book',
  'David Graeber',
  E'Une exploration incontournable du sens (ou de l''absence de sens) au travail — cité en plusieurs book clubs.'
);

insert into resources (title, type, author, description)
values (
  'Injustices',
  'podcast',
  'Binge Audio',
  E'Une série d''enquête sur les inégalités face à la justice en France, point de départ d''une discussion sur les frontières et l''asile.'
);

insert into resources (title, type, author, description)
values (
  'The Social Dilemma',
  'documentary',
  'Jeff Orlowski',
  E'D''anciens ingénieurs de la tech racontent comment les plateformes captent l''attention — utile pour comprendre les mécaniques derrière TikTok.'
);

insert into resources (title, type, author, description, url)
values (
  'La fabrique du crétin digital',
  'article',
  'Michel Desmurget (entretien)',
  E'Un contrepoint utile aux discours sur les écrans, à prendre avec la nuance qu''il mérite.',
  null
);

insert into resources (title, type, author, description)
values (
  'Sapiens : une brève histoire de l''humanité',
  'book',
  'Yuval Noah Harari',
  E'Régulièrement recommandé en fin de rencontre pour prendre du recul sur les sujets de société.'
);

-- ========== VENUES (carte) ==========

insert into venues (name, address, city, lat, lng, description)
values (
  'Le Court Bouillon',
  '6 rue des Capucins',
  'Lyon',
  45.7640,
  4.8357,
  E'Un café associatif dans la Presqu''île, grande table commune parfaite pour les book clubs.'
);

insert into venues (name, address, city, lat, lng, description)
values (
  'La Cabane à Docs',
  '12 quai du Port',
  'Marseille',
  43.2965,
  5.3698,
  E'Une friche culturelle avec vue sur le Vieux-Port, où se tiennent les grandes rencontres Agorabica.'
);

insert into venues (name, address, city, lat, lng, description)
values (
  'Le Chantier',
  '8 rue du Chai des Farines',
  'Bordeaux',
  44.8378,
  -0.5792,
  E'Un tiers-lieu dans un ancien chai, ambiance chaleureuse et beaucoup de lumière.'
);
