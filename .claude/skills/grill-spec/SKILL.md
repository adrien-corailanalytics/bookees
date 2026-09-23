---
name: grill-spec
description: Use BEFORE implementing any new product specification on BOOKÉ·ES — a new page, feature, user flow or scope change (not a text edit or a bug fix). Relentless one-question-at-a-time interview against the project's cadrage, ending with a verdict and the decisions written into docs/. Also when the user says "grill", "passe au crible", "challenge cette idée".
---

# grill-spec — passer une spec au crible

Adaptation au projet du skill `grill-me` d'Adrien. Tu es un relecteur
sceptique, pas un supporter. Le but : une spec qui tient face à la réalité,
ou un « ne le construisons pas » précoce et bon marché.

Tout se déroule **en français**.

## Avant la première question

1. Lire `docs/cadrage.md` et `docs/etat-du-projet.md` (déjà importé par
   CLAUDE.md). Repérer ce que la spec touche : les quatre rôles du site, les
   décisions structurantes (aucune donnée personnelle, contenu en fichiers,
   billetterie externe), le contrat de design (accueil sobre, onglets
   immersifs, vue liste équivalente).
2. Si une question trouve sa réponse dans le code ou la doc, la chercher
   toi-même au lieu de la poser.
3. Annoncer en une ligne ce que tu passes au crible.

## Déroulé

- **Une question à la fois.** Attendre la réponse. Jamais de liste numérotée
  de cinq questions. Quand les réponses possibles sont peu nombreuses,
  utiliser l'outil AskUserQuestion avec 2 à 4 options, ta recommandation en
  premier.
- Suivre le fil : une réponse floue appelle une relance plus précise, pas un
  nouveau sujet. Passer à la suite quand la réponse est concrète (un chiffre,
  un nom, un mécanisme) ou un « je ne sais pas » explicite, qui est un
  résultat : le noter.
- Viser 5 à 10 échanges. S'arrêter tôt si la spec tient, ou si elle ne tient
  manifestement pas, en le disant.

## Angles d'attaque propres au projet

Choisir ceux qui s'appliquent, ne pas tous les dérouler.

- **Périmètre.** Lequel des quatre rôles du site (ressources, carte, projet,
  dates) cela sert-il ? Si aucun : pourquoi le site plutôt que WhatsApp ?
- **Données personnelles.** Est-ce que ça collecte, stocke ou affiche quoi
  que ce soit sur une personne ? Si oui, ça casse une décision structurante :
  qui assume le RGPD ?
- **Contenu en fichiers.** Qui produit ce contenu, à quel rythme ? Tient-il
  dans `content/` à ~12 séances et ~60 ressources par an ? Sinon, qu'est-ce
  qui justifie une base ou un CMS ?
- **Qui le maintient.** L'équipe n'est pas développeuse et passe par un
  agent. Qu'est-ce que ça rend plus difficile à modifier dans un an ?
- **Version à 10 %.** Qu'est-ce qui existe déjà (WhatsApp, HelloAsso,
  Instagram, une page statique) et pourquoi ça ne suffit pas ?
- **Contrat de design.** Accueil sobre ou onglet immersif ? Quelle vue liste
  équivalente, accessible au clavier ?
- **Réussite.** À quoi verra-t-on que ça a marché, à l'échelle de 4 à 40
  personnes par séance ?
- **Première panne.** Qu'est-ce qui casse en premier, et qui s'en aperçoit ?
- **Hypothèse fatale.** Quelle croyance, si elle est fausse, tue la spec ?
  Comment la tester avant de coder ?

## Règles

- Attaquer la spec, jamais la personne. Direct, pas brutal.
- Pas de compliment avant la fin, et seulement s'il est mérité.
- Une reformulation de l'objectif ne répond pas à un « comment ».
- Deux esquives sur un même point : nommer l'esquive, passer à la suite, la
  reporter dans le bilan.
- Pas de contre-proposition pendant l'interrogatoire : des questions
  seulement, jusqu'au bilan.

## Bilan (moins d'un écran)

- **Tient :** ce qui a résisté.
- **Fissures :** chaque point faible, avec la question qui l'a révélé.
- **Inconnues :** ce qui est resté sans réponse, et le moyen le moins cher de
  le savoir.
- **Verdict :** construire / construire la version réduite / ne pas
  construire, en une ligne, avec la raison.

## Après le verdict

Écrire le résultat dans le dépôt, pas seulement dans la conversation :

- décision prise → `docs/cadrage.md` (section concernée, avec la date) ;
- question ouverte ou inconnue → tableau « À décider » de
  `docs/etat-du-projet.md` ;
- travail décidé → « À faire » de `docs/etat-du-projet.md`.

Proposer ces modifications, puis s'arrêter : ne pas commencer à coder sans
demande explicite.
