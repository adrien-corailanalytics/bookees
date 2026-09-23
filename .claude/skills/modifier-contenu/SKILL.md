---
name: modifier-contenu
description: Use when the BOOKÉ·ES team asks to change what the site displays — validate or rewrite a text, add or edit a session (séance), a resource (livre, podcast…), a venue (lieu), replace demo content, fill the WhatsApp/Instagram/email links. Covers content/ files, the [BROUILLON] and demo conventions, geocoding, venue logos and the commit message.
---

# modifier-contenu — changer ce que le site affiche

Tout le contenu est dans `content/`. Aucun contenu dans les composants.

| Quoi | Fichier |
|---|---|
| Textes des pages (accroches, paragraphes, boutons, menus) | `content/textes.ts` |
| Séances | `content/events.ts` |
| Ressourcerie | `content/resources.ts` |
| Lieux de la carte | `content/venues.ts` |
| Email, WhatsApp, Instagram | `content/site.ts` |

## Règle d'or

- Texte fourni ou validé par l'équipe → tel quel, **sans** préfixe.
- Texte que tu rédiges → préfixe exact `[BROUILLON] ` (crochets, majuscules,
  une espace). Le test `npm test` refuse toute autre graphie.
- Enregistrement inventé ou d'exemple → `demo: true`.
- En cas de doute sur l'origine d'un texte, demander ; ne pas deviner.

## Recettes

### Valider un texte

Remplacer la chaîne dans `content/textes.ts` (ou le fichier concerné) par le
texte donné, sans préfixe. Si l'équipe valide le brouillon tel quel : retirer
seulement `[BROUILLON] `. Retrouver la chaîne à partir de ce qui s'affiche :
`grep -rn "début du texte" content/`.

### Ajouter une séance (`content/events.ts`)

- `slug` : unique, en minuscules avec tirets ; il devient l'URL
  `/evenements/<slug>` et ne doit plus changer une fois partagé.
- `type` : `book_club`, `rencontre` ou `communaute` (fixe la couleur).
- `start_date` / `end_date` : heure de Paris, format exact `2026-10-15T19:00`.
- `venue_name` : écrit **exactement** comme le `name` du lieu dans
  `venues.ts` (sinon pas de logo sur la fiche, et le test échoue). Ajouter le
  lieu d'abord s'il n'existe pas.
- `address` : « rue, code postal ville » ; la virgule sert de retour à la
  ligne sur la fiche.
- Le livre (ou podcast…) de la séance se déclare dans `resources.ts` avec
  `event_slug: "<slug>"`, pas dans la séance.
- Optionnels : `question` (grande question), `note` (mention en bas de fiche,
  ex. « Première édition gratuite »), `ticket_url` (billetterie : fait
  apparaître le bouton « Réserver »), `speakers`, `image` (visuel de partage
  dans `public/evenements/<slug>.png`, idéalement 1080×1350 ou 1200×630).
- Titre et description non fournis → les rédiger en `[BROUILLON] `.

### Ajouter une ressource (`content/resources.ts`)

`id` unique et stable (sert d'ancre `/ressourcerie#<id>`), `type` (`book`,
`podcast`, `documentary`, `article`, `other`), `title`, `author`, et
`event_slug` si elle a été citée en séance. `description` et `url` sont
optionnelles : ne pas inventer de description sans `[BROUILLON] `.

### Ajouter un lieu (`content/venues.ts`)

- Coordonnées : les demander (Google Maps, clic droit sur le point), ou les
  obtenir depuis l'adresse avec
  `https://nominatim.openstreetmap.org/search?q=<adresse>&format=json&limit=1`
  (WebFetch). Vérifier que `display_name` correspond bien au lieu.
- Logo : PNG ou SVG dans `public/lieux/<id>.png`, `logo_url: "/lieux/<id>.png"`.
  Un fond blanc passe (fusion `multiply` sur la fiche). Les composants
  prennent 1430×801 comme dimensions indicatives : un autre format s'affiche
  quand même correctement (hauteur auto).

### Remplacer une démo

Supprimer l'enregistrement `demo: true` plutôt que le « réparer » : une
ressource démo reliée à une séance démo part avec elle. Relancer `npm test`
(références orphelines).

### Liens de contact (`content/site.ts`)

`whatsappUrl` / `instagramUrl` vides = bouton ou lien masqué. Ne mettre un
lien d'invitation WhatsApp qu'avec l'accord explicite de l'équipe : le dépôt
et le site sont publics.

## Finir

1. `npm run check`.
2. Changement visible (nouvelle séance, nouveau lieu) : skill `captures` sur
   les pages concernées, et regarder les images.
3. Mettre à jour `docs/etat-du-projet.md` si l'état change (ex. une décision
   « À décider » tranchée, le compteur de brouillons).
4. Commit sur une branche, titre `Contenu : <ce qui change>`, et dans le corps
   la source du contenu (« fourni par l'équipe le 02/10 », « rédigé, en
   brouillon »).
