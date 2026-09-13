# BOKÉ·ES — Document de conception

Ce document résume les décisions de design prises pendant le développement du
site, pour que n'importe qui reprenant le projet comprenne le "pourquoi"
sans avoir à relire tout l'historique de conversation.

## État actuel du projet — deux couches à ne pas confondre

1. **L'application réelle** (ce dépôt, `app/`, `components/`, `lib/`,
   `supabase/`) — un Next.js complet, fonctionnel, branché à Supabase.
   Elle porte encore le nom et l'identité visuelle **Agorabica** (palette
   café — cream/espresso/brick — typographie Fraunces + Inter).
2. **La direction visuelle BOKÉ·ES** — validée dans une maquette HTML
   statique (`design/bokees-preview.html`, aussi publiée en ligne, voir
   plus bas), mais **pas encore reportée dans l'application réelle**. C'est
   la prochaine étape : appliquer ce qui suit aux vrais composants React.

Ne pas supposer que le code actuel reflète la marque BOKÉ·ES — il ne le fait
pas encore. Ce document décrit la cible.

## Identité de marque

- **Nom** : BOKÉ·ES (jeu de mots "book" + suffixe inclusif "·es").
- **Positionnement** : "Book club conscient." — un book club qui aide à
  comprendre, discuter et agir sur les sujets de société, sans dogmatisme.
- **Logo** : deux fichiers fournis par la cliente, dans `public/brand/` :
  - `logo-mark.jpg` — le monogramme (deux cercles imbriqués, façon
    hourglass/infini), utilisé seul comme icône (header, footer, ticket).
  - `wordmark.jpg` — le logotype complet "BOKÉ·ES", lettrage géométrique
    bespoke (le "O" reprend le monogramme, le "K" a un éclat de lignes
    radiales, le "S" a un empattement fluide). À utiliser tel quel pour les
    placements de marque importants (hero, ex-libris) — ce n'est **pas**
    une police, donc le texte "BOKÉ·ES" ailleurs sur le site est composé en
    Space Grotesk gras, qui n'est qu'un standard de substitution.
  - Les deux images ont un fond blanc à grille (papier quadrillé) — c'est
    devenu un motif de marque à part entière, pas un simple fond
    d'exportation (voir "Texture grille" ci-dessous).

## Palette

Décision explicite : **pas de vert menthe, pas de cream+terracotta+serif**
(ce dernier combo est le cliché le plus reconnaissable des sites générés
par IA — volontairement évité). La palette retenue est chaude, feutrée,
sobre :

| Rôle | Variable CSS | Hex | Usage |
|---|---|---|---|
| Fond principal | `--cream` | `#EFE6D3` | papier kraft/avoine, avec grille |
| Fond carte | `--paper` | `#F6F0E3` | cartes, surfaces |
| Papier du ticket | `--ticket-paper` | `#F8F3E7` | uniquement le composant ticket, distinct par sa bordure/ombre, pas par une couleur criarde |
| Encre | `--espresso` | `#241F18` | texte principal |
| Encre profonde | `--ink` | `#17130E` | fonds sombres (bibliothèque, comptoir) |
| Accent unique | `--brick` | `#A6553A` | terracotta cassé, PAS le rouge-brique vif d'origine — utilisé avec parcimonie |
| Accent hover | `--bordeaux` | `#7C3F2C` | |
| Book Club | `--pine` | `#3C5245` | vert de garde muet, code couleur du format |
| Communauté | `--mustard` | `#B8823A` | ocre muet, code couleur du format |

Les couleurs fonctionnelles (pine/brick/mustard = book club/rencontre/
communauté) sont **conservées** pour le repérage visuel des formats
d'événements — ce n'est pas une décoration, c'est un code couleur utile.

## Typographie

- **Space Grotesk** (600/700) — titres, wordmark de secours, éléments UI en
  majuscules. Choisi pour son caractère géométrique proche du logo.
- **IBM Plex Mono** — tout ce qui évoque la fiche/le ticket de bibliothèque :
  dates, labels de champs, le ticket entier, les numéros "01/02/03".
- **Inter** — texte courant (paragraphes). Reste le cheval de bataille pour
  la lisibilité, volontairement neutre.

## Texture grille

Les deux fichiers logo ont un fond quadrillé (papier millimétré). Plutôt que
de le considérer comme un artefact d'export, il est repris comme motif de
fond sur tout le site (`background-image` avec deux `linear-gradient`
superposés, 22px de pas) — c'est ce qui relie visuellement le reste du site
au logo, conformément à la demande "une DA en lien avec le logo".

## Pas d'emoji comme puces

Décision explicite après retour "que ça fasse pas IA" : les emoji utilisés
comme puces de section (📚🎙☕🔍💬🌱 etc.) ont été retirés. Remplacés par :
- couleur + libellé texte pour les tags de format (pas de picto)
- numérotation "01/02/03" en mono pour "BOKÉ·ES en trois gestes"
- initiale du format (B/R/C) dans les badges circulaires "Nos formats"

## Coins et géométrie

Ni `rounded-2xl` partout (réflexe SaaS générique), ni tout à angle droit
(trop clivant en interne). Compromis retenu : rayon modéré (10px) sur les
cartes/blocs structurels, cercles conservés uniquement là où ils font écho
au logo (boutons pill, badges ronds, pins de carte).

## Composants clés à reporter dans l'app réelle

### 1. Le ticket (`.ticket`)
Fiche de bibliothèque à l'ancienne inspirée d'une vraie carte d'emprunt :
mois/année, wordmark, "LIEU" avec adresse alignée à droite, "TITRE/AUTEUR —
DATE" en ligne de tableau, note de bas de ticket en italique. Pensé pour
devenir l'écran de confirmation d'inscription à un événement (actuellement
l'app réelle a un panneau de confirmation générique dans `RegisterForm.tsx`
— à remplacer par ce composant).

### 2. La Ressourcerie — expérience "entrer dans une bibliothèque"
Ce n'est plus une simple étagère décorative. Trois mécaniques, dans
l'ordre :
1. **Porte d'entrée cliquable** (`.library-gate`) : deux battants qui
   coulissent à l'ouverture, révélant la bibliothèque. Reproduit le geste
   d'entrer physiquement dans un lieu — demande explicite de la cliente
   après plusieurs itérations jugées "pas encore là".
2. **Perspective 3D légère** (`perspective` + `rotateX(7deg)` sur le
   meuble) : donne une impression de profondeur/de lever les yeux vers
   l'étagère, sans casser la lisibilité.
3. **Mécanique d'emprunt gamifiée** : cliquer sur un dos de livre
   "l'emprunte" (incrémente un compteur affiché en haut du rayon,
   `#bokeesTally`). Les dos décoratifs (`.spine-filler`, sans titre lisible)
   ne sont pas cliquables — seuls les vrais dos de ressources
   (`.spine`, avec titre + fiche au survol) le sont.

Palette des dos : cuir dégradé façon reliure Pléiade (`color-mix` CSS),
tranches dorées à la feuille, lettrage or — PAS les couleurs vives de la
marque (le vert bouteille/bordeaux/marine sont des tons cuir, pas les
`--pine`/`--brick` du reste du site).

**À faire pour la vraie app** : `app/ressourcerie/page.tsx` affiche
actuellement une liste de cartes plates (`ResourceCard.tsx`). Il faut
reconstruire cette page avec la porte + le meuble + la mécanique d'emprunt
(l'emprunt peut rester un état local/localStorage, pas besoin de le
persister en base pour le MVP).

### 3. La Carte
Recentrée sur Paris (demande explicite, malgré la communauté n'étant plus
positionnée comme parisienne dans le texte — la carte de démonstration
reste un ancrage Paris pour le côté "repéré par la communauté"). Fond
illustré (Seine stylisée + trame de rues en CSS), pins façon Mapstr avec
fiche au survol. L'app réelle utilise déjà Leaflet + OpenStreetMap
(`components/VenueMap.tsx`) — fonctionnellement équivalent, juste avec de
vraies tuiles de carte au lieu d'un fond illustré. Pas de contradiction à
résoudre, les deux approches sont compatibles (l'app réelle est même plus
fonctionnelle que la maquette ici).

### 4. Touches gamifiées (déjà présentes conceptuellement, à retrouver dans le vrai code)
- `.btn-arcade` — bouton à relief dur façon Habbo/Neopets (s'enfonce au
  clic). Déjà implémenté dans l'app réelle (`app/globals.css`).
- `.xp-bar` — barre de capacité façon barre de vie. Déjà implémenté
  (`components/CapacityBar.tsx`).
- `.pixel-badge` — badge à bordure épaisse et ombre dure pour les statuts
  ("Bientôt complet"). Déjà implémenté.

Ces trois-là existent déjà dans l'app réelle avec l'ancienne palette
Agorabica — il suffira de changer les valeurs de couleur, pas la logique.

## Références

- Maquette publiée (interactive, à jour) :
  https://claude.ai/code/artifact/129c65f6-edc5-4987-a445-17dd9fc7aee3
- Copie autonome (fonctionne hors ligne, logo intégré) :
  [`design/bokees-preview.html`](design/bokees-preview.html)
- Fichiers logo sources : [`public/brand/logo-mark.jpg`](public/brand/logo-mark.jpg),
  [`public/brand/wordmark.jpg`](public/brand/wordmark.jpg)

## Ce qui reste ouvert

- Le rebrand Agorabica → BOKÉ·ES n'a pas été appliqué au code réel (nom,
  emails transactionnels, `README.md`, metadata OpenGraph, favicon,
  `package.json`, variables d'environnement `EMAIL_FROM`). C'est un chantier
  à part, distinct de ce document.
- La mécanique d'emprunt de la Ressourcerie n'existe que dans la maquette
  HTML — pas encore de composant React équivalent.
- Pas de décision prise sur la persistance de l'état "emprunté" (local au
  navigateur suffit pour le MVP, une vraie liste de lecture par utilisateur
  impliquerait des comptes visiteurs, explicitement hors scope du brief
  initial).
