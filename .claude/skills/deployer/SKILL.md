---
name: deployer
description: Use when putting BOOKÉ·ES changes online — pushing a branch, opening or checking a PR, reading the Vercel preview, merging to main (production), verifying production, rolling back, or touching Vercel environment variables / the domain.
---

# deployer — mettre en ligne

## Comment ça marche ici

- **Vercel est branché sur GitHub** (`adrien-corailanalytics/bookees`). Pas de
  CLI Vercel : tout passe par git, `gh` et le tableau de bord Vercel.
- Chaque branche poussée et chaque PR → **déploiement d'aperçu**. Les aperçus
  sont protégés (connexion Vercel requise) : pour les montrer à l'équipe,
  utiliser « Share » dans le tableau de bord Vercel.
- **Fusion dans `main` = mise en production.** URL publique actuelle :
  <https://bookees-tp8n.vercel.app> (pas encore de domaine).
- Deux projets Vercel déploient le même dépôt (voir `docs/etat-du-projet.md`,
  « À décider ») : vérifier les deux statuts tant que ce n'est pas réglé.
- La CI GitHub (`.github/workflows/check.yml`) relance `npm run check` et le
  build sur chaque PR.

## Avant de pousser

1. `git status` propre, branche ≠ `main`, commits relus (`git log main..`) :
   un commit = une intention, message qui dit pourquoi.
2. `npm run check` et `npm run build`.
3. Faire le point sur ce qui s'affichera, et le dire à l'utilisateur :
   ```bash
   grep -c '"\[BROUILLON\] ' content/*.ts   # textes provisoires (hors commentaires)
   grep -c 'demo: true,' content/*.ts        # contenus inventés
   ```
   S'il en reste et que l'adresse du site va être partagée publiquement,
   le signaler avant de continuer : ils s'affichent surlignés et « fictif ».

## Pousser et ouvrir la PR (seulement sur demande)

```bash
git push -u origin <branche>
gh pr create --base main --title "<titre>" --body-file <fichier>   # modèle : .github/pull_request_template.md
gh pr checks <n> --watch            # CI + Vercel
gh pr view <n> --comments           # le bot Vercel y poste l'URL d'aperçu
```

Vérifier l'aperçu (skill `captures` avec l'URL d'aperçu si elle est
accessible, sinon demander à l'utilisateur de l'ouvrir).

## Fusionner (seulement avec un accord explicite)

```bash
gh pr merge <n> --rebase --delete-branch
```

*Rebase and merge* : chaque commit arrive tel quel sur `main`, l'historique
reste lisible pour les sessions suivantes. Pas de squash, sauf si les commits
de la branche sont du travail en cours.

## Vérifier la production

Attendre le déploiement :

```bash
gh api repos/adrien-corailanalytics/bookees/deployments --jq '.[0:2][] | {environment, sha: .sha[0:7], created_at}'
```

Puis, sur l'URL publique :

```bash
BASE=https://bookees-tp8n.vercel.app
for p in / /evenements /ressourcerie /carte /a-propos /confidentialite /sitemap.xml; do
  printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' $BASE$p)" "$p"; done
curl -s $BASE/ | grep -o '<title>[^<]*</title>'
curl -s $BASE/api/events/<slug>/ics | head -30                  # heure et lieu corrects
curl -s $BASE/evenements/<slug> | grep -o 'og:image" content="[^"]*"'   # URL absolue du bon domaine
```

Contrôler à l'œil la prochaine séance (date, heure, adresse) : c'est
l'information que les gens viennent chercher.

## Revenir en arrière

- Rapide : tableau de bord Vercel → Deployments → déploiement précédent →
  « Instant Rollback ».
- Durable : `git revert <sha>` sur une branche, PR, fusion. Ne jamais
  réécrire l'historique de `main`.

## Variables et domaine

- `NEXT_PUBLIC_SITE_URL` (Vercel → Settings → Environment Variables) : une
  vraie URL (`https://bookees.fr`) ou **absente**, jamais vide. Absente, le
  site prend l'URL que Vercel injecte.
- Le jour où le domaine existe : l'ajouter dans Vercel (Settings → Domains),
  renseigner `NEXT_PUBLIC_SITE_URL` et `site.email` (`content/site.ts`),
  redéployer, puis vérifier les `og:image` et le `.ics`.
- Aucune autre variable n'est nécessaire. Les anciennes clés Supabase et
  Resend ne servent plus.

## Après

Mettre à jour `docs/etat-du-projet.md` (ce qui est en ligne, date, journal)
dans le commit suivant, ou dans la PR si elle est encore ouverte.
