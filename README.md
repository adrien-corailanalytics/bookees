# BOOKÉ·ES

Site vitrine de BOOKÉ·ES — book club conscient. Les prochaines dates, la
Ressourcerie (tout ce qui a été cité en séance), la carte des lieux, et de quoi
comprendre le projet.

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
npm run build    # vérifie types + build de production
```

## Modifier le contenu

Tout est dans `content/` — quatre fichiers, commentés, sans SQL ni interface
d'administration :

| Fichier | Contenu |
|---|---|
| `content/events.ts` | les séances (à venir et passées) |
| `content/resources.ts` | la Ressourcerie |
| `content/venues.ts` | les lieux affichés sur la carte |
| `content/site.ts` | nom, contact, liens WhatsApp / Instagram |

Ajouter une ressource = copier un bloc, le remplir, commiter. Vercel redéploie
tout seul. Le tri à venir / passé se fait sur les dates, il n'y a rien à cocher.

Pour un lieu, il faut `lat` et `lng` : ouvrir le lieu sur Google Maps, clic droit
sur le point, les deux nombres affichés en haut sont lat puis lng.

## Structure

```
app/            pages (accueil, événements, ressourcerie, carte, à-propos…)
components/     composants React
content/        LE CONTENU — c'est ici qu'on édite
lib/            types, sélecteurs sur le contenu, formatage de dates, .ics
public/brand/   logo et logotype fournis par l'équipe design
DESIGN.md       l'intention de design et les décisions prises
```

## Reste à faire

- Remplacer le contenu de démonstration par les vraies séances et ressources
  (les fichiers `content/` portent un bandeau ⚠️ en tête).
- Acheter le nom de domaine et le renseigner dans `content/site.ts` + Vercel.
- Ajouter Le Coucou dans `content/venues.ts` (adresse + coordonnées).
- Appliquer l'identité visuelle BOOKÉ·ES aux composants (voir `DESIGN.md`).
