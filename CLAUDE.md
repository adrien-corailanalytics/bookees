@AGENTS.md

# BOOKÉ·ES — règles de travail

Site vitrine d'un book club (Next.js 16 statique, contenu en fichiers,
déployé par Vercel). L'équipe n'est pas développeuse : elle demande, tu
exécutes, et le dépôt garde la mémoire.

## Début et fin de session

- L'état du projet est importé ci-dessous. Avant une décision de fond, lire
  `docs/cadrage.md` ; avant tout travail d'interface, `docs/design.md`.
- **La mémoire du projet est le dépôt, pas la conversation.** En fin de
  tâche, mettre à jour `docs/etat-du-projet.md` (fait / à décider / à faire,
  journal daté) et, si une décision de fond a été prise, `docs/cadrage.md`.
  Ces mises à jour vont dans le même commit que le travail qu'elles décrivent.

@docs/etat-du-projet.md

## Nouvelle spec produit → `grill-spec` d'abord

Dès qu'une demande ajoute ou change une fonctionnalité, une page, un parcours
ou le périmètre (pas une correction de texte ni un bug), lancer le skill
`grill-spec` **avant** d'écrire du code, et s'y tenir jusqu'au verdict. Le
cadrage fixe quatre rôles au site ; tout ce qui en sort doit être tranché
explicitement.

## Contenu : ne jamais faire passer un texte inventé pour validé

- Tout texte que tu rédiges toi-même (accroche, description, paragraphe,
  titre) s'écrit avec le préfixe `[BROUILLON] ` : il s'affiche surligné.
- Tout enregistrement inventé (séance, lieu, ressource) porte `demo: true`.
- Ne retirer un préfixe ou un `demo: true` que si l'équipe a fourni ou validé
  le contenu, et le dire dans le message de commit.
- Les textes des pages sont dans `content/textes.ts`, les données dans
  `content/events.ts`, `resources.ts`, `venues.ts`. Recette détaillée : skill
  `modifier-contenu`.

## Vérifier

- `npm run check` : types, lint, tests (`tests/`). Tourne aussi en hook
  pre-commit. Un commit qui ne passe pas ne part pas.
- Build : `npm run build` ; serveur de dev : `npm run dev`.
- Après tout changement visible : skill `captures` (captures d'écran desktop et
  mobile, débordement horizontal, erreurs console). Regarder les images avant
  de dire que c'est bon.
- Logique non triviale (dates, contenu, .ics…) : ajouter un cas dans
  `tests/site.test.ts`.

## Commits et PR

- Jamais de commit sur `main` : une branche par sujet (`kebab-case` en
  français, ex. `seance-octobre`, `ressourcerie-immersive`).
- Un commit = une intention. Il doit passer `npm run check` seul : la PR est
  fusionnée par *Rebase and merge*, chaque commit arrive tel quel sur `main`.
- Message en français. Titre : un verbe à l'infinitif, ≤ 72 caractères
  (« Ajouter la séance du 15 octobre », « Contenu : valider l'accroche de
  l'accueil »). Corps : le **pourquoi**, ce qui n'est pas visible dans le diff,
  et ce qui a été écarté. C'est ce que relira la prochaine session via
  `git log`.
- Pas d'attribution IA (pas de `Co-Authored-By: Claude`, pas de « Generated
  with »).
- PR : remplir `.github/pull_request_template.md`. Pousser et ouvrir la PR
  seulement quand on te le demande ; ne jamais fusionner sans accord explicite.
- Mise en ligne : skill `deployer`.

## Pièges connus

- `next dev` réécrit le bloc Next.js d'`AGENTS.md` : ne pas l'éditer, le
  commiter tel quel s'il change.
- Lire le guide Next.js dans `node_modules/next/dist/docs/` avant d'utiliser
  une API Next (version 16, conventions changées).
- Veteran Typewriter n'a ni « », ni tirets longs, ni points de suspension
  (repli sur Poppins) : pas de tiret long dans un titre.
- Les ligatures de BBB Poppins TN sont coupées exprès (`app/globals.css`) :
  sinon « invité·es » et « BOOKÉ·ES » deviennent des glyphes fusionnés.
  Décision du 23/09, ne pas les réactiver sans l'équipe.
- Alerte macOS « … ne peut pas être ouvert » (sharp, next-swc) ou `next build`
  muet : fichiers en quarantaine (dossier reçu par AirDrop). Réinstaller
  `rm -rf node_modules && npm ci`, et retirer la quarantaine du reste :
  `xattr -dr com.apple.quarantine .`
- Carte Leaflet : garder `isolate` sur son conteneur, sinon elle passe
  au-dessus de l'en-tête.
- `NEXT_PUBLIC_SITE_URL` : une vraie URL ou rien, jamais une valeur vide.
- Le dépôt est **public** : aucun secret, aucune donnée personnelle (emails
  privés, numéros) dans le code, les docs ou les commits.
