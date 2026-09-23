# BOOKÉ·ES

Site vitrine de BOOKÉ·ES — book club conscient. Les prochaines dates, la
Ressourcerie (tout ce qui a été cité en séance), la carte des lieux, et de quoi
comprendre le projet.

**Où en est le projet, ce qui reste à décider : [docs/etat-du-projet.md](docs/etat-du-projet.md).**

## Ce que le site fait — et ne fait pas

Il **affiche**. Il ne **stocke** rien.

Pas de compte, pas de formulaire, pas de base de données, pas d'email
transactionnel, pas de cookie. Les inscriptions aux séances, quand il y en aura,
passeront par une billetterie externe : il suffit de renseigner `ticket_url` sur
l'événement pour faire apparaître le bouton.

C'est un choix, pas un manque. ~60 ressources et 12 événements par an ne
justifient pas une base de données — le contenu vit dans des fichiers, versionné
avec le code.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS**
- **Leaflet / OpenStreetMap** pour la carte
- **Vercel** pour l'hébergement
- Contenu : fichiers TypeScript dans `content/`

Aucune variable d'environnement n'est nécessaire pour faire tourner le site,
sauf `NEXT_PUBLIC_SITE_URL` en production (liens absolus, OpenGraph, .ics).

## Installation

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # types + lint + tests (lancé aussi avant chaque commit)
npm run build    # build de production
```

> **Sur le Mac d'Adrien** : la politique de sécurité du système empêche le
> chargement du binaire natif `@next/swc-darwin-arm64`, et Turbopack (le moteur
> par défaut de Next 16) en a besoin. Ajouter `-- --webpack` aux deux commandes :
> `npm run dev -- --webpack`, `npm run build -- --webpack`. Sans effet sur
> Vercel, qui construit sous Linux avec les bindings natifs.

## Modifier le contenu

Tout est dans `content/` — cinq fichiers, commentés, sans SQL ni interface
d'administration :

| Fichier | Contenu |
|---|---|
| `content/textes.ts` | tous les textes des pages (accroches, paragraphes, menus, boutons) |
| `content/events.ts` | les séances (à venir et passées) |
| `content/resources.ts` | la Ressourcerie |
| `content/venues.ts` | les lieux affichés sur la carte |
| `content/site.ts` | nom, contact, liens WhatsApp / Instagram |

Ajouter une ressource = copier un bloc, le remplir, commiter. Vercel redéploie
tout seul. Le tri à venir / passé se fait sur les dates, il n'y a rien à cocher.

**Textes provisoires.** Un texte qui commence par `[BROUILLON] ` a été rédigé par
un agent, pas choisi par l'équipe : le site l'affiche surligné en orange, et une
pastille en bas de page compte ce qui reste à choisir. Un événement, un lieu ou
une ressource inventé porte `demo: true` et s'affiche encadré avec la mention
« fictif ». Valider = retirer le préfixe ou le `demo: true`.
`grep -rn "BROUILLON\|demo: true" content/` liste tout ce qui reste.

Pour un lieu, il faut `lat` et `lng` : ouvrir le lieu sur Google Maps, clic droit
sur le point, les deux nombres affichés en haut sont lat puis lng.

## Structure

```
app/            pages (accueil, événements, ressourcerie, carte, projet…)
  fonts/        polices de la charte (Veteran Typewriter, BBB Poppins TN)
components/     composants React
content/        LE CONTENU — c'est ici qu'on édite
lib/            types, sélecteurs sur le contenu, formatage de dates, .ics
public/         logos (brand/), logos des lieux (lieux/), visuels des séances
tests/          garde-fous sur le contenu, les dates et le .ics
docs/
  etat-du-projet.md   où on en est, ce qui reste à décider
  cadrage.md          les décisions et les contraintes
  design.md           la charte et les composants
  charte/             planche de référence du kit design
  archives/           maquette de l'ancienne direction (café)
CLAUDE.md       règles de travail pour Claude ; skills dans .claude/skills/
```

## Contribuer

Une branche par sujet, une PR, fusion par « Rebase and merge » : chaque commit
arrive tel quel sur `main`, il doit donc passer `npm run check` et expliquer
son pourquoi. La CI GitHub relance les vérifications et le build ; Vercel
publie un aperçu de chaque PR et met en ligne `main`.
