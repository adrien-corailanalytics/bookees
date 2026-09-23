# BOOKÉ·ES — Document de conception

Ce document résume les décisions de design, pour que n'importe qui reprenant le
projet comprenne le « pourquoi » sans relire l'historique.

## Source de vérité : le kit de l'équipe design (23/09/2026)

Le dossier Drive « Booké·es » (Gabrielle, équipe design) fixe l'identité. Il
**remplace** la direction « café » explorée avant (crème, terracotta, Space
Grotesk, texture quadrillée), abandonnée. Contenu du kit et où il vit dans le
dépôt :

| Élément du kit | Dans le dépôt |
|---|---|
| `ELEMENTS.png` (planche : typo, couleurs, logos) | `docs/charte/planche-elements.png` |
| Logo seul / logo + « Book club conscient » (SVG) | `public/brand/bookees.svg`, `public/brand/bookees-slogan.svg` |
| Monogramme BK, 5 versions (SVG) | `public/brand/bk.svg`, `bk-vert.svg`, `bk-rose.svg`, `bk-bleu.svg`, `bk-jaune.svg` — `bk-vert` sert aussi de favicon (`app/icon.svg`) et de pin sur la carte |
| Polices Veteran Typewriter, BBB Poppins TN | `app/fonts/` (woff2), chargées par `next/font/local` dans `app/layout.tsx` |
| Post Instagram du 26/09 (fiche de bibliothèque) | modèle de `components/Ticket.tsx` ; l'image sert de visuel de partage (`public/evenements/`) |
| Logo du Coucou | `public/lieux/le-coucou.png` |

Les SVG sont ceux du kit, avec la `viewBox` recadrée au plus près du dessin.

## Intention — le contrat (arbitré le 13/09/2026, toujours valable)

- **Accueil = sobre.** Aucune gamification. On trouve sans effort les
  prochaines dates, ce qu'est BOOKÉ·ES, où ça se passe.
- **Onglets = immersion.** La Ressourcerie doit donner la sensation d'entrer
  dans une bibliothèque (référence Habbo) ; la Carte montre les lieux en visuel.
- Toute vue spatiale garde une **vue liste équivalente**, accessible au clavier.
- Pas de gamification à état (badges, progression, rôles) : il n'y a pas de
  comptes.

## Couleurs

| Rôle | Tailwind | Hex | Usage |
|---|---|---|---|
| Texte, traits | `encre` | `#111111` | tout le texte, les filets de 1 px, les boutons pleins |
| Fond | `white` | `#FFFFFF` | fond de page |
| Vert | `vert` | `#D9FED7` | Book club, livres, monogramme principal |
| Rose | `rose` | `#FED7E8` | Rencontres, podcasts, bloc « Rejoindre » |
| Bleu | `bleu` | `#D7E8FE` | Communauté, documentaires |
| Jaune | `jaune` | `#FEFBD7` | articles, survol des cartes et boutons secondaires |
| Légende | `gris` | `#6B6B6B` | légendes ; plus foncé que le gris de la planche, illisible sur blanc |
| Brouillon | `brouillon` | `#E8590C` | **hors charte**, uniquement pour signaler les contenus provisoires |

Les pastels ne servent qu'en **aplat sous du texte noir**, jamais en couleur de
texte (contraste trop faible). Le code couleur par format (vert / rose / bleu)
est un repère utile, pas une décoration : on le garde partout où un format
apparaît (tags, cartes, fiche).

## Typographie

Échelle de la planche (sur un plan de travail de 1 600 px), ramenée à l'écran
par des classes de `app/globals.css` :

| Planche | Classe | Rendu |
|---|---|---|
| Titre 1 — Veteran 48 | `.titre-1` | 36 px mobile / 48 px desktop |
| Titre 2 — Veteran 36 | `.titre-2` | 30 / 36 px |
| TITRE 3 — Poppins Text Reg 32, capitales | `.titre-3` | 20 / 24 px |
| Sous-titre — Poppins Text Reg 24 | `.sous-titre` | 18 / 20 px |
| Légende — Poppins Text Reg 20, gris | `.legende` | 14 px |
| Texte — Poppins Text Reg 20 | corps | 17 px |

À savoir :
- **Veteran Typewriter** n'a ni « », ni tirets longs, ni points de suspension.
  Ces signes retombent sur Poppins (pile `font-titre`). Éviter les tirets
  longs dans les titres.
- **BBB Poppins TN** est une Poppins post-binaire : ses ligatures remplacent les
  formes inclusives par des glyphes fusionnés (« invité·es », et aussi
  « BOOKÉ·ES »). **Ligatures coupées** (`font-feature-settings` dans
  `app/globals.css`, décision du 23/09) : le point médian reste visible, comme
  sur le logo. Les réactiver = supprimer cette ligne.
- Les valeurs tapées à la machine (titres d'ouvrages, auteur·ices, dates de la
  fiche) sont en Veteran, comme sur le post Instagram.
- Intitulés de fiche (LIEU, DATE, TITRE/AUTEUR·ICE) : `.etiquette`, capitales
  espacées.

## Géométrie

- Filets noirs de 1 px, angles droits : c'est la fiche de bibliothèque.
  Classe `.fiche`.
- Les cercles sont réservés à ce qui fait écho au monogramme : boutons et tags
  en pilule, pastilles numérotées 01/02/03, pins de carte.
- Pas d'ombre portée, pas d'emoji.

## Composants

- **Fiche de bibliothèque** (`components/Ticket.tsx`) : reproduction HTML du
  post Instagram — mois / année, logo + slogan, LIEU (logo du lieu s'il existe,
  sinon son nom), tableau TITRE/AUTEUR·ICE | DATE alimenté par les ressources
  liées à la séance (`event_slug`), lignes vides pour l'allure d'une carte
  d'emprunt, mention en italique (`note`). Fond = couleur du format. Utilisée
  sur l'accueil (prochain rendez-vous) et sur la page de chaque séance.
- **Carte d'événement** (`EventCard`) : fiche blanche, tag du format, date en
  capitales, titre en Veteran ; jaune au survol.
- **Fiche de ressource** (`ResourceCard`) : fiche de catalogue — type et
  numéro en en-tête, aplat de la couleur du type.
- **Carte des lieux** (`VenueMap`) : fond OpenStreetMap passé en niveaux de gris
  (CSS), pins = monogramme BK vert, cadrage automatique sur les lieux.

## Contenus provisoires

Demande de l'équipe : pouvoir choisir elle-même tout ce qui est affiché. Donc
tout texte rédigé par un agent est visible comme tel sur le site :

- Texte préfixé `[BROUILLON] ` dans `content/` → rendu par `components/T.tsx`,
  surligné orange pointillé.
- Enregistrement inventé (`demo: true`) → encadré orange avec la mention
  « fictif ».
- `components/LegendeBrouillons.tsx` affiche en bas à gauche le nombre de
  contenus provisoires de la page, avec un bouton pour masquer le surlignage
  le temps de juger le design. Elle disparaît quand il ne reste rien.

Le préfixe reste visible là où le composant `T` ne passe pas (titre d'onglet,
aperçu de partage, fichier .ics) : c'est voulu, un brouillon ne doit pas
passer pour un texte validé.

## Ressourcerie immersive — à construire

Concept validé avant le kit (maquette `docs/archives/maquette-direction-cafe.html`,
**ancienne palette**, à ne reprendre que pour les mécaniques) :

1. **Porte d'entrée** : deux battants qui coulissent et révèlent la
   bibliothèque.
2. **Perspective légère** sur le meuble (`perspective` + `rotateX(7deg)`).
3. **Emprunt** : cliquer sur un dos de livre l'« emprunte » (compteur en haut
   du rayon, état local au navigateur, pas de compte).

À transposer dans la charte actuelle (pastels, filets noirs, Veteran sur les
dos). La grille de fiches actuelle (`app/ressourcerie/page.tsx`) restera la vue
liste équivalente exigée par le contrat.

## Références

- Maquette de l'ancienne direction (pour la Ressourcerie uniquement) :
  [`archives/maquette-direction-cafe.html`](archives/maquette-direction-cafe.html)
