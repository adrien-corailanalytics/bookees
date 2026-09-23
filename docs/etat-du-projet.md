# BOOKÉ·ES — État du projet

Mis à jour le **23 septembre 2026**.

Ce document est la mémoire du projet : où on en est, ce qui est fait, ce qui
reste à décider et à faire. On le met à jour à la fin de chaque session de
travail. Les décisions de fond vivent dans [cadrage.md](cadrage.md), le
design dans [design.md](design.md).

## En bref

- **Le site** : une vitrine en cinq rubriques (accueil, événements et fiche de
  chaque séance, Ressourcerie, Carte, Le projet) plus la page Confidentialité.
  Il affiche, il ne stocke rien : ni compte, ni formulaire, ni base de données.
- **La nouvelle version** (charte du kit design, vraies infos du 26/09, textes
  provisoires signalés) est prête sur la branche `charte-kit-design`, mais
  **pas encore en ligne**.
- **En ligne aujourd'hui** : <https://bookees-tp8n.vercel.app>, l'ancienne
  version. Elle affiche **une heure et une adresse fausses pour le 26/09**
  (19h et « Adresse à confirmer »).
- **Prochaine échéance** : **samedi 26 septembre 2026, 11h–13h**, premier café
  au Coucou (183 rue des Pyrénées, Paris 20e) autour de *Comment tout peut
  s'effondrer* (Pablo Servigne et Raphaël Stevens). Première édition
  gratuite, sans inscription.

## Urgent, avant le 26/09

1. **Mettre en ligne la nouvelle version**, pour corriger l'heure et l'adresse.
   Relire l'aperçu Vercel de la PR, puis la fusionner (Adrien).
2. **Choisir ce que voient les visiteurs d'ici là.** En l'état, les textes
   provisoires s'affichent surlignés en orange et les contenus inventés sont
   encadrés « fictif ». C'est voulu pour l'équipe, mais c'est aussi ce que
   verra quelqu'un à qui on donne l'adresse au café. Au minimum : l'accroche
   de l'accueil et la page de la séance du 26/09 (voir « À décider »).
3. **Adresse de contact** : `bonjour@bookees.fr` n'existe pas (le domaine n'est
   pas acheté). Le bouton « Nous écrire » envoie donc dans le vide. Mettre une
   adresse qui fonctionne dans `content/site.ts`, ou acheter le domaine.

## Ce qui est fait

| Sujet | Où en est-on | Où regarder |
|---|---|---|
| Cadrage | Site vitrine sans données personnelles, contenu en fichiers, inscriptions par billetterie externe (13/09) | [cadrage.md](cadrage.md) |
| Pages | Accueil, Événements (filtres par format, séances passées), fiche de séance (ajout à l'agenda Google / Outlook / Apple), Ressourcerie, Carte, Le projet, Confidentialité, page 404 | `app/` |
| Charte | Kit design du 23/09 appliqué partout : noir sur blanc, pastels, Veteran Typewriter et BBB Poppins TN, logos SVG, favicon BK | [design.md](design.md) |
| Fiche de bibliothèque | Le post Instagram du 26/09 refait en HTML, sur l'accueil et sur chaque séance | `components/Ticket.tsx` |
| Contenu réel | Séance du 26/09, lieu Le Coucou (sur la carte, avec son logo), livre du 26/09 | `content/` |
| Textes provisoires | Tous les textes sont dans un seul fichier. 29 textes rédigés par un agent sont marqués `[BROUILLON]` et surlignés sur le site ; 12 contenus inventés (3 séances, 6 ressources, 3 lieux) sont encadrés « fictif » | `content/textes.ts` |
| Nettoyage | Le Comptoir retiré (hors périmètre), restes de Supabase supprimés | historique git |
| Garde-fous | `npm run check` (types, lint, tests) avant chaque commit ; la CI GitHub le relance avec le build sur chaque PR | `tests/`, `.github/` |
| Travail avec Claude | Règles du projet et skills (spec produit, contenu, déploiement, captures d'écran) | `CLAUDE.md`, `.claude/skills/` |

## À décider

| # | Sujet | Ce qu'il faut trancher | Recommandation |
|---|---|---|---|
| 1 | **Textes du site** | Les 29 textes `[BROUILLON]` : accroche de l'accueil, les trois étapes (comprendre, discuter, agir), les trois formats, le bloc « Rejoindre », les trois paragraphes de « Le projet », les intros de page, la Confidentialité, les messages d'erreur | Commencer par l'accueil et la séance du 26/09 ; le reste peut attendre |
| 2 | **Séance du 26/09** | Titre de la page, texte de présentation, et s'il y a une « grande question » | À écrire avant de partager l'adresse du site |
| 3 | **Contenus inventés** | 3 séances fictives (dont des dates à Marseille et Bordeaux), 6 ressources, 3 lieux : les retirer ou les garder comme démonstration | Retirer les séances fictives avant de montrer le site à l'extérieur : elles annoncent de fausses dates |
| 4 | **« BOOKÉ·ES » dans le texte** | La police BBB Poppins TN fusionne « É·E » en un seul glyphe inclusif ; le logo, lui, garde le point médian. Garder ou forcer le point visible pour le nom | À trancher par l'équipe design (Gabrielle) |
| 5 | **Nom de domaine et email** | Quel domaine (`bookees.fr` ?), quelle adresse de contact | ~12 €/an, 10 minutes ; débloque aussi l'email |
| 6 | **Billetterie** | HelloAsso, Billetweb… pour les séances payantes à venir | Tester avec un événement gratuit sur HelloAsso |
| 7 | **WhatsApp sur le site** | Mettre un lien d'invitation public ? N'importe qui pourrait rejoindre le groupe. Sans lien, le bouton reste caché | À décider selon la taille voulue du groupe |
| 8 | **Instagram** | Le kit contient des avatars : le compte existe-t-il ? Si oui, donner l'adresse | Lien affiché dans le pied de page dès qu'il est renseigné |
| 9 | **Deux projets Vercel** | Deux projets déploient le même dépôt (`bookees-tp8n`, public, et un second, protégé par mot de passe) | En garder un seul |
| 10 | **Dépôt public et polices** | Le dépôt GitHub est public, donc les fichiers de police aussi. BBB Poppins TN est sous licence libre ; Veteran Typewriter est « gratuite, revente interdite », sans mention claire de redistribution | Rendre le dépôt privé, ou vérifier la licence |
| 11 | **Ressourcerie immersive** | La construire (porte, étagère, emprunt ; environ une semaine) ou garder la grille de fiches | À passer au crible (skill `grill-spec`) avant de s'y engager |
| 12 | **Le Comptoir** | Idée gelée : une page « entre deux rencontres » (question du comptoir, « vous le saviez ? », initiatives des membres) | À rouvrir seulement si WhatsApp ne suffit plus. Ancien code : `git show 8ca1c7e:app/le-comptoir/page.tsx` |

## À faire

- [ ] Relire et fusionner la PR `charte-kit-design` (voir « Urgent »).
- [ ] Après le 26/09 : ajouter à la Ressourcerie ce qui a été cité pendant la
      séance (`content/resources.ts`, relié par `event_slug`).
- [ ] Révoquer les anciennes clés Supabase et Resend : elles sont encore dans
      `.env.local` sur le Mac d'Adrien, alors que le site ne s'en sert plus.
      Supprimer ensuite ces lignes (seule `NEXT_PUBLIC_SITE_URL` sert encore).
- [ ] Protéger `main` sur GitHub : fusion par PR uniquement, CI obligatoire,
      suppression automatique des branches fusionnées.
- [ ] Quand le domaine existe : le renseigner dans `content/site.ts` et dans
      la variable `NEXT_PUBLIC_SITE_URL` sur Vercel (jamais vide).
- [ ] Ajouter un visuel (photo, logo) à chaque lieu de la carte.

## Comment on travaille

- **Changer un texte, ajouter une séance, un livre, un lieu** : le demander à
  Claude dans ce dépôt, ou éditer `content/` directement. Un texte écrit par
  Claude arrive toujours marqué `[BROUILLON]` ; c'est l'équipe qui le valide.
- **Nouvelle idée de fonctionnalité** : Claude la passe d'abord au crible
  (skill `grill-spec`, une question à la fois) avant d'écrire du code. Les
  décisions prises sont reportées dans `cadrage.md` et ici.
- **Toute modification** passe par une branche et une PR. La CI vérifie, Vercel
  publie un aperçu, la fusion dans `main` met en ligne.
- Le détail des règles est dans [`CLAUDE.md`](../CLAUDE.md) ; l'installation dans
  le [`README`](../README.md).

## Journal

- **20/08/2026** — Premier prototype « Agorabica » (Angela) : Supabase,
  inscriptions, administration.
- **13/09/2026** — Recentrage sur la vitrine : suppression de Supabase et des
  inscriptions, contenu en fichiers, nouveau nom BOOKÉ·ES. Mise en ligne sur
  Vercel.
- **23/09/2026** — Kit design reçu : charte appliquée, fiche de bibliothèque,
  vraies infos du 26/09, textes provisoires signalés. Le Comptoir retiré.
  Tests, CI et règles de travail avec Claude ajoutés ; documentation rangée
  dans `docs/`.
