---
name: captures
description: Use after any visible change on BOOKÉ·ES (styles, components, pages, content that renders) and before saying it looks right — builds, serves the production build and takes full-page desktop + mobile screenshots with overflow, draft-count and JS-error checks. Also for "screenshot", "montre-moi", "vérifie le rendu", or checking a Vercel preview URL.
---

# captures — voir le site avant de dire que c'est bon

## Lancer

```bash
npm run build
npx next start -p 3123 > /tmp/bookees-start.log 2>&1 &   # en arrière-plan
node .claude/skills/captures/captures.mjs http://localhost:3123 --out <dossier> / /evenements /evenements/cafe-26-septembre /ressourcerie /carte /a-propos
pkill -f "next start -p 3123"                      # à la fin
```

- `--out` : prendre le dossier scratchpad de la session s'il y en a un, sinon
  le script écrit dans `$TMPDIR/bookees-captures`.
- Ne capturer que les pages touchées, plus l'accueil.
- Pour un aperçu Vercel, remplacer l'URL locale par celle de l'aperçu (s'il
  est protégé, le script capture la page de connexion : le signaler).
- `next dev` n'est pas utile ici : on vérifie le build de production.

## Lire le bilan

Une ligne par page et par format :

```
✔ /carte [mobile] « La Carte — BOOKÉ·ES » — 4 provisoire(s)
✖ / [mobile] « … » — déborde de 38px
```

- **déborde** : quelque chose dépasse la largeur de l'écran (mobile 375 px),
  à corriger.
- **erreur(s) JS** : erreur console ou exception, à corriger.
- **provisoire(s)** : nombre de textes `[BROUILLON]` et de contenus « fictif »
  visibles. Utile pour dire à l'équipe ce qui reste à choisir sur la page.

Le script sort en erreur (code 1) s'il y a un débordement ou une erreur JS.

## Puis regarder

Ouvrir les PNG avec l'outil Read et **les regarder** : alignements, texte
coupé, logo déformé, contraste, respect de `docs/design.md` (noir sur blanc,
pastels en aplat, Veteran pour les titres). Un bilan tout vert ne prouve pas
que c'est beau.
