# BOOKÉ·ES — cadrage

Ce qui a été décidé et ce qui est contraint. À lire avant de concevoir quoi que
ce soit sur ce projet. Ce qui reste ouvert, et l'avancement, sont dans
[etat-du-projet.md](etat-du-projet.md). Dernière révision : 23 septembre 2026.

## Le projet

BOOKÉ·ES est un book club conscient : une communauté qui veut mieux comprendre,
discuter et agir sur les sujets de société, sans militantisme ni recherche
artificielle de consensus. Fil rouge : **comprendre → discuter → agir**.

Trois dimensions :

- **Book club** — une fois par mois, dans un café, petit groupe. Une grande
  question, un livre (ou un podcast, un documentaire, un rapport) comme support.
  Pas d'invité : on facilite l'échange.
- **Les Rencontres** — tous les deux mois, format plus large, avec idéalement
  deux invité·es aux regards complémentaires.
- **La communauté** — entre les événements, sur WhatsApp : question du comptoir,
  votes, coups de cœur, initiatives des membres.

Principe éditorial : des **regards complémentaires**, jamais un « pour / contre ».

## Ordres de grandeur (septembre 2026)

Ce sont les chiffres qui justifient l'architecture. S'ils changent d'un ordre de
grandeur, l'architecture doit être rediscutée.

| | |
|---|---|
| Groupe WhatsApp | ~30 personnes |
| Présents au dernier café | 10 |
| Fourchette par séance | 4 à 40 |
| Ressources citées par séance | ~5, soit ~60 par an |
| Événements par an | ~12 |
| Lieux différents par an | ~12 |

## Rôles du site et de WhatsApp

- **WhatsApp** = la communauté proche. C'est là que la conversation vit.
- **Le site** = la vitrine officielle publique. Il s'adresse aussi à des gens
  qui ne sont pas (encore) dans le groupe.

Le site ne cherche pas à remplacer le groupe ni à « faire vivre » une communauté
en ligne. Il montre, il archive, il oriente.

## Ce que le site doit permettre

1. Consulter les **ressources** évoquées en séance, dans un format bibliothèque.
2. Voir la **carte** des lieux utilisés, façon Mapstr.
3. Comprendre le **projet** : contexte, objectifs, formats.
4. Voir les **prochaines dates**.

Rien d'autre n'est dans le périmètre aujourd'hui.

## Décisions structurantes

**Aucune donnée personnelle collectée.** Pas de compte, pas de formulaire, pas
de newsletter, pas de base de données. Le site affiche, il ne stocke pas.
Conséquence : pas de RGPD à gérer, pas de fuite possible, pas de modération.

**Le contenu vit dans des fichiers** (`content/`), versionné avec le code. 60
ressources par an ne justifient pas une base de données ni un CMS. L'équipe
projet édite en demandant à un agent, qui écrit dans le bon fichier et commite.

**Les inscriptions passent par une billetterie externe** (type HelloAsso,
Billetweb), pas par le site. Décidé parce que les séances deviendront
probablement payantes, et qu'une billetterie maison avec paiement est hors
de proportion avec le besoin. Concrètement : renseigner `ticket_url` sur un
événement fait apparaître le bouton de réservation.

**Le référencement n'est pas un objectif.** Le volume de visiteurs est
indifférent. Ce qui compte, c'est d'exister publiquement avec une identité
propre — c'est la raison d'être du site face à une simple page Notion.

## Intention de design

Résumée ici, détaillée dans [design.md](design.md) :

- **Accueil sobre.** Textes percutants, information trouvable sans effort.
  Aucune gamification.
- **Onglets immersifs.** La Ressourcerie donne la sensation d'entrer dans une
  bibliothèque où l'on se déplace (référence Habbo) ; la Carte est interactive
  et montre les lieux en visuel (photo ou post Instagram).
- Registre d'ensemble cosy, « Pinterest vibe ».
- La gamification est **spatiale et visuelle**, jamais mécanique : il n'y a pas
  de comptes, donc pas de badges, pas de progression, pas de rôles attribués.
  Les rôles imaginés dans le cadrage initial (Éclaireur, Bibliothécaire,
  Contradicteur, Barista de l'Agora, Reporter, Entremetteur citoyen) se jouent
  dans la vraie vie, pas dans le produit.
- Toute vue spatiale garde une **vue liste équivalente**, accessible au clavier.

## Historique du nom

Le projet s'est appelé **Agorabica**. Il s'appelle maintenant **BOOKÉ·ES** —
deux O, le logotype les fait se chevaucher. Il ne reste plus de trace de
l'ancien nom dans le code ni dans le dépôt (`bookees`).
