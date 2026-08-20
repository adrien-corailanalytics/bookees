# Agorabica

Site web du MVP Agorabica — communauté parisienne pour comprendre, discuter et
agir sur les sujets de société. Book clubs, rencontres, vie de communauté,
inscription aux événements avec gestion de capacité et liste d'attente, ajout
au calendrier, sondage "Avant / Après", administration simple.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS**
- **Supabase** : Postgres (données), Auth (admin uniquement), RLS pour la sécurité
- **Resend** : emails transactionnels (confirmation, liste d'attente, promotion)
- **Vercel** : hébergement recommandé

Aucune clé API n'est écrite en dur dans le code : tout passe par des variables
d'environnement (voir `.env.example`).

### Ce qui a été vérifié pendant le développement

`npm install`, `npm run build` (TypeScript strict + Turbopack) et `npx eslint .`
passent tous sans erreur. Le serveur de dev a été lancé et toutes les pages
qui ne dépendent pas de Supabase ont été vérifiées visuellement dans un
navigateur (accueil avec données factices en erreur gracieuse, Le Comptoir,
Découvrir Agorabica, Confidentialité, 404, connexion admin, menu mobile).

Ce qui n'a **pas** pu être testé faute d'un projet Supabase / Resend réel
disponible pendant le développement : les écritures en base (inscription,
annulation, promotion de liste d'attente, création/édition d'événement en
admin) et l'envoi effectif des emails. La section "Tester les parcours
critiques" ci-dessous couvre précisément ces cas — à faire une fois Supabase
et Resend configurés, avant mise en production.

## 1. Installation locale

Prérequis : Node.js 20+, un compte [Supabase](https://supabase.com) (gratuit),
un compte [Resend](https://resend.com) (gratuit).

```bash
npm install
cp .env.example .env.local
```

Remplissez `.env.local` (voir sections 2 et 3 ci-dessous pour obtenir les
valeurs), puis :

```bash
npm run dev
```

Le site est disponible sur http://localhost:3000.

## 2. Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com/dashboard).
2. Dans **Project Settings > API**, récupérez `Project URL`,
   `anon public key` et `service_role key` → à mettre dans `.env.local`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`).
3. Ouvrez **SQL Editor** et exécutez, dans l'ordre :
   - le contenu de [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
     (schéma complet : tables, index, contraintes, trigger de promotion de
     liste d'attente, RLS)
   - puis le contenu de [`supabase/seed.sql`](supabase/seed.sql) (données de
     démonstration : 4 événements, intervenants, un sondage avec quelques votes)

   Si vous utilisez la [CLI Supabase](https://supabase.com/docs/guides/cli) et
   avez lié le projet (`supabase link`), vous pouvez aussi faire :
   ```bash
   supabase db push
   psql "$(supabase db show-connection-string --db-url)" -f supabase/seed.sql
   ```

### Créer le premier compte administrateur

Les visiteurs n'ont jamais besoin de compte. Seule l'administration (Sarah,
Angela) doit en avoir un.

1. Dans le dashboard Supabase : **Authentication > Users > Add user**, créez
   un utilisateur avec un email et un mot de passe (cochez "Auto Confirm User"
   pour éviter l'email de vérification).
2. Copiez son `User UID`.
3. Dans **SQL Editor**, exécutez :
   ```sql
   insert into admins (user_id) values ('COLLEZ-L-UID-ICI');
   ```
4. Ce compte peut maintenant se connecter sur `/admin/login`.

Répétez l'étape 1-3 pour chaque membre de l'équipe.

## 3. Configuration email (Resend)

1. Créez un compte sur [resend.com](https://resend.com).
2. **Domains** : ajoutez et vérifiez votre domaine (ex. `agorabica.fr`) via
   les enregistrements DNS fournis. Sans domaine vérifié, vous pouvez tester
   avec le domaine `resend.dev` fourni par défaut, mais uniquement vers
   l'adresse email de votre propre compte Resend (limitation du mode test).
3. **API Keys** : créez une clé → `RESEND_API_KEY` dans `.env.local`.
4. `EMAIL_FROM` : une adresse sur le domaine vérifié, ex.
   `"Agorabica <bonjour@agorabica.fr>"`.

## 4. Lancement

```bash
npm run dev       # développement, http://localhost:3000
npm run build     # build de production
npm run start     # sert le build de production
```

## 5. Déploiement sur Vercel

1. Poussez ce dossier sur un dépôt GitHub (dépôt dédié, distinct du reste de
   votre code).
2. Sur [vercel.com](https://vercel.com), **New Project** → importez le dépôt.
3. Renseignez les variables d'environnement (les mêmes que `.env.local`) dans
   **Settings > Environment Variables**, y compris
   `NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr` (important : utilisé dans
   les liens des emails et l'OpenGraph).
4. Déployez. Aucune configuration Next.js supplémentaire n'est nécessaire.
5. Une fois le domaine définitif connu, mettez à jour `NEXT_PUBLIC_SITE_URL`
   et redéployez.

## 6. Structure du projet

```
app/                      Pages et routes (App Router)
  page.tsx                 Accueil
  evenements/               Liste + détail événement
  le-comptoir/              Page communautaire
  a-propos/                 Découvrir Agorabica
  confidentialite/           Politique de confidentialité
  annulation/[token]/        Annulation d'inscription
  admin/                     Interface d'administration (protégée)
  api/                       Route Handlers (inscription, ics, sondages…)
components/                Composants React réutilisables
lib/                       Logique métier (dates, ics, emails, accès données)
supabase/
  migrations/0001_init.sql   Schéma complet + RLS + trigger
  seed.sql                    Données de démonstration
```

## 7. Modèle de données

Voir [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
pour le détail complet (types, contraintes, policies). Résumé :

- **events** — un événement (book club, rencontre ou communauté)
- **speakers** — intervenants liés à un événement
- **registrations** — une inscription, avec `status` (`confirmed` /
  `waitlist` / `cancelled`) et `cancellation_token` (utilisé dans le lien
  d'annulation de l'email, sans avoir besoin de compte)
- **newsletter_subscribers** — emails opt-in newsletter, **strictement
  séparé** des inscriptions événement
- **admins** — table d'autorisation liée à `auth.users`, seule condition pour
  accéder à `/admin`
- **polls** / **poll_votes** — fonction "Avant / Après" ; les votes
  individuels ne sont jamais exposés publiquement, seuls des agrégats via la
  fonction SQL `get_poll_results`

Un index unique empêche un même email de s'inscrire deux fois activement au
même événement. Un trigger SQL (`promote_next_waitlisted`) promeut
automatiquement la première personne en liste d'attente dès qu'une place se
libère ; le code applicatif (route d'annulation publique et action admin)
envoie alors l'email de confirmation à la personne promue.

## 8. Administration

`/admin/login` → email + mot de passe Supabase Auth (voir section 2). Permet
de :
- créer / modifier un événement, le publier ou le dépublier, définir sa
  capacité
- ajouter/retirer des intervenants
- voir les inscrits confirmés, la liste d'attente, annuler une inscription
- exporter les inscriptions en CSV
- créer un sondage "Avant / Après" et basculer entre les phases

## 9. Tester les parcours critiques

Avant de considérer le site prêt, vérifiez ces 5 parcours de bout en bout
(nécessite `npm run dev` fonctionnel avec Supabase et Resend configurés) :

1. **Accueil → événement → inscription → confirmation → Google Calendar**
   Allez sur `/`, cliquez sur l'événement mis en avant, remplissez le
   formulaire (cochez la case RGPD, laissez la newsletter décochée),
   validez. Vous devez voir la confirmation inline avec les boutons calendrier,
   et recevoir l'email de confirmation avec le bon horaire de Paris.
2. **Accueil → événement → inscription → téléchargement `.ics`**
   Sur la page de confirmation ou dans l'email, cliquez "Apple / .ics" :
   un fichier se télécharge et s'ouvre correctement dans Calendrier/Outlook.
3. **Événement complet → liste d'attente**
   Dans `/admin`, réduisez la capacité d'un événement à 1, inscrivez une
   première personne (confirmée), puis une seconde (doit passer en liste
   d'attente, avec le bon message "Rejoindre la liste d'attente").
4. **Admin → création d'un événement → publication → apparition sur le site**
   `/admin/evenements/nouveau`, remplissez, statut "Publié", enregistrez.
   L'événement doit apparaître sur `/evenements` et sa page `/evenements/[slug]`
   doit être accessible.
5. **Inscrit → lien d'annulation → place libérée**
   Utilisez le lien d'annulation reçu par email (`/annulation/[token]`),
   confirmez. Si quelqu'un était en liste d'attente pour cet événement, il
   doit automatiquement passer "confirmé" et recevoir un email de promotion.

`npm run build` a été vérifié avec succès (TypeScript strict + Turbopack +
ESLint) sur ce projet ; s'il échoue de votre côté, la cause la plus probable
est une dépendance dont la version exacte a évolué depuis la rédaction de ce
projet — ajustez les versions dans `package.json` en conséquence.

## 10. RGPD

- Inscription événement et newsletter sont deux choix strictement séparés ;
  la newsletter n'est jamais cochée par défaut.
- Aucun traceur publicitaire. Pour des statistiques respectueuses de la vie
  privée, ajoutez plus tard [Plausible](https://plausible.io) ou
  [Fathom](https://usefathom.com) (script unique, pas de cookie).
- Politique de confidentialité : `/confidentialite`.
- Demande de suppression de données : email vers `bonjour@agorabica.fr`
  (traitement manuel pour le MVP — voir "Aller plus loin").

## 11. Aller plus loin (hors périmètre du MVP, volontairement)

- **Suppression RGPD en un clic** : pour l'instant la demande passe par email
  et un `delete` manuel en base. Un formulaire self-service avec vérification
  d'email serait la prochaine étape.
- **Upload d'images** : le champ "image de couverture" est une simple URL.
  Pour un vrai upload depuis l'admin, utiliser Supabase Storage (bucket
  public) + un composant d'upload, en réutilisant `next.config.mjs` qui
  autorise déjà les images `*.supabase.co`.
- **Rate limiting / anti-spam** sur `/api/register` et `/api/newsletter` :
  pour un MVP à faible volume ce n'est pas critique, mais avant une forte
  audience, ajouter un rate limit (ex. Vercel Edge Config + Upstash) ou un
  reCAPTCHA/hCaptcha léger sur les formulaires publics.
- **Notification automatique par email lors d'une promotion déclenchée par un
  chemin qui ne passe pas par le code applicatif** (ex. modification directe
  en SQL) : actuellement l'email de promotion liste d'attente est envoyé par
  le code applicatif (route d'annulation + action admin), pas par le trigger
  SQL lui-même. Pour une garantie à 100 % indépendante du chemin
  d'appel, ajouter un Database Webhook Supabase sur `registrations` (event
  `UPDATE`) déclenchant une Edge Function qui appelle Resend.
- **Pagination** de la liste des inscrits en admin pour les très grosses
  rencontres (>200 inscrits).
