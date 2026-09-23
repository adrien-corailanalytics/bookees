// Tous les textes affichés par le site, à un seul endroit.
//
// Un texte qui commence par "[BROUILLON] " a été rédigé par un agent et n'a
// pas encore été choisi par l'équipe : le site l'affiche surligné en orange.
// Pour le valider, retirer le préfixe (en réécrivant le texte si besoin).
// `grep -rn BROUILLON content/` liste tout ce qui reste à choisir.
//
// Les événements, lieux et ressources inventés portent `demo: true` dans leur
// propre fichier : ils s'affichent encadrés en orange, avec la mention
// « fictif ».
//
// Les intitulés purement fonctionnels (menus, boutons, « Date », « Lieu »)
// ne sont pas marqués, mais ils sont ici aussi : on peut tous les changer.

import type { EventType, ResourceType } from "@/lib/types";

export const textes = {
  meta: {
    titre: "BOOKÉ·ES · Book club conscient",
    description:
      "Des évènements où écouter, parler, se retrouver (ou même être seul·e dans son coin).",
  },

  navigation: {
    allerAuContenu: "Aller au contenu",
    accueil: "BOOKÉ·ES, accueil",
    evenements: "Événements",
    ressourcerie: "Ressourcerie",
    carte: "Carte",
    projet: "Le projet",
    ouvrirMenu: "Ouvrir le menu",
    fermerMenu: "Fermer le menu",
  },

  accueil: {
    // Bio Instagram de l'équipe.
    intro:
      "Des évènements où écouter, parler, se retrouver (ou même être seul·e dans son coin).",
    ctaDates: "Voir les prochaines dates",
    ctaProjet: "Découvrir le projet",
    prochainRendezVous: "Prochain rendez-vous",
    voirSeance: "Voir la séance",
    filRouge: {
      titre: "Comprendre, discuter, agir",
      etapes: [
        {
          titre: "Comprendre",
          texte:
            "[BROUILLON] Un livre, un podcast ou un documentaire pour poser les bases " +
            "d'un sujet, sans jargon ni simplification.",
        },
        {
          titre: "Discuter",
          texte:
            "[BROUILLON] Des regards complémentaires, jamais un « pour / contre ». " +
            "Le désaccord est bienvenu, c'est même tout l'intérêt.",
        },
        {
          titre: "Agir",
          texte:
            "[BROUILLON] Des initiatives portées par les membres, à rejoindre ou à proposer.",
        },
      ],
    },
    formatsTitre: "Nos formats",
    voirLesDates: "Voir les dates",
    nousRejoindre: "Nous rejoindre",
    prochainesDates: "Prochaines dates",
    toutVoir: "Tout voir",
    rejoindre: {
      titre: "Rejoindre la communauté",
      texte:
        "[BROUILLON] Les dates se donnent ici, la conversation continue sur WhatsApp. " +
        "Écrivez-nous pour en être.",
      whatsapp: "Rejoindre le groupe WhatsApp",
      instagram: "Suivre sur Instagram",
      email: "Nous écrire",
    },
  },

  // Utilisés sur l'accueil et sur la page « Le projet ».
  formats: [
    {
      type: "book_club",
      titre: "Book club",
      rythme: "Une fois par mois",
      texte:
        "[BROUILLON] En petit groupe, dans un café. Une grande question, un livre " +
        "(ou un podcast, un documentaire, un rapport) pour nourrir l'échange. Pas " +
        "d'invité : on facilite la discussion.",
    },
    {
      type: "rencontre",
      titre: "Les Rencontres",
      rythme: "Tous les deux mois",
      texte:
        "[BROUILLON] Un format plus large, avec deux invité·es aux regards " +
        "complémentaires, puis un échange avec la salle.",
    },
    {
      type: "communaute",
      titre: "La communauté",
      rythme: "Entre deux séances",
      texte:
        "[BROUILLON] Sur WhatsApp : la question du comptoir, des votes, des coups de " +
        "cœur et les initiatives des membres.",
    },
  ] satisfies { type: EventType; titre: string; rythme: string; texte: string }[],

  projet: {
    titre: "Le projet",
    metaDescription:
      "[BROUILLON] BOOKÉ·ES, book club conscient : comprendre, discuter et agir sur " +
      "les sujets de société, sans y laisser ses amitiés.",
    chapeau: "Book club conscient.",
    paragraphes: [
      "[BROUILLON] BOOKÉ·ES est un book club conscient : une communauté qui veut mieux " +
        "comprendre, discuter et agir sur les sujets de société, sans militantisme ni " +
        "recherche artificielle de consensus.",
      "[BROUILLON] Chaque séance part d'une grande question et d'une ressource : un " +
        "livre, un podcast, un documentaire, un rapport. Pas besoin d'avoir tout lu ni " +
        "d'avoir un avis tranché pour venir.",
      "[BROUILLON] Notre principe : des regards complémentaires, jamais un « pour / " +
        "contre ». On assume le désaccord, c'est même tout l'intérêt.",
    ],
    formatsTitre: "Les formats",
    cta: "Voir les prochaines dates",
  },

  evenements: {
    titre: "Événements",
    metaDescription:
      "[BROUILLON] Tous les book clubs, rencontres et moments de communauté BOOKÉ·ES à venir.",
    intro:
      "[BROUILLON] Book clubs, rencontres et moments de communauté : tout ce qui se " +
      "prépare chez BOOKÉ·ES.",
    filtresLabel: "Filtrer par format",
    tous: "Tous",
    vide: "Aucun événement à venir dans cette catégorie pour le moment.",
    passes: "Événements passés",
  },

  evenement: {
    retour: "Tous les événements",
    quand: "Quand",
    voirSurLaCarte: "Voir le lieu sur la carte",
    calendrier: "Ajouter au calendrier",
    reserver: "Réserver sa place",
    inscriptionOuverte: "Inscription ouverte",
    sansInscription: "Entrée libre.",
    intervenants: "Intervenant·es",
    support: "Support de la séance",
  },

  // La fiche de bibliothèque (components/Ticket.tsx), reprise du post Instagram.
  ticket: {
    lieu: "Lieu",
    titreAuteur: "Titre/auteur·ice",
    date: "Date",
  },

  ressourcerie: {
    titre: "La Ressourcerie",
    metaDescription:
      "[BROUILLON] Tous les livres, podcasts, documentaires et articles cités en séance, " +
      "réunis au même endroit.",
    intro:
      "[BROUILLON] Tout ce qui a nourri une discussion en séance (livres, podcasts, " +
      "documentaires, articles) réuni au même endroit, pour y revenir quand vous voulez.",
    vide: "[BROUILLON] La Ressourcerie se remplit au fil des séances. Revenez bientôt.",
    fiche: "N°",
    vuAu: "Vu en séance :",
    consulter: "Consulter",
  },

  carte: {
    titre: "La Carte",
    metaDescription: "[BROUILLON] Les lieux qui accueillent les séances BOOKÉ·ES.",
    intro:
      "[BROUILLON] Les lieux qui accueillent BOOKÉ·ES, repérés par la communauté, un par un.",
    vide: "Aucun lieu répertorié pour le moment.",
    chargement: "Chargement de la carte…",
    instagram: "Voir le lieu sur Instagram",
  },

  confidentialite: {
    titre: "Confidentialité",
    metaDescription:
      "[BROUILLON] Ce site ne collecte aucune donnée personnelle : ni compte, ni formulaire, ni traceur.",
    miseAJour: "Dernière mise à jour : septembre 2026",
    sections: [
      {
        titre: "[BROUILLON] Ce site ne collecte rien",
        texte:
          "[BROUILLON] Il n'y a ni compte, ni formulaire d'inscription, ni newsletter, ni " +
          "base de données de membres. Aucun cookie n'est déposé, aucun traceur " +
          "publicitaire ni outil de mesure d'audience n'est installé. Vous pouvez lire " +
          "l'intégralité du site sans laisser la moindre trace chez nous.",
      },
      {
        titre: "Les services tiers",
        texte:
          "[BROUILLON] Le site est hébergé par Vercel, dont les serveurs conservent des " +
          "journaux techniques (adresse IP, date, page demandée) pour assurer le " +
          "fonctionnement du service. La carte des lieux affiche des fonds de plan servis " +
          "par OpenStreetMap, qui reçoit donc votre adresse IP lorsque vous ouvrez la page " +
          "Carte. Si une billetterie externe est utilisée pour réserver une place, elle " +
          "applique sa propre politique de confidentialité, indiquée sur son site.",
      },
    ],
    ecrireTitre: "Nous écrire",
    ecrire: "Pour toute question, écrivez à",
  },

  pied: {
    explorer: "Explorer",
    bonASavoir: "Bon à savoir",
    confidentialite: "Confidentialité",
    instagram: "Instagram",
  },

  erreur: {
    titre: "[BROUILLON] Un souci de notre côté, pas du vôtre.",
    texte: "Le site rencontre un problème temporaire. Réessayez dans un instant.",
    bouton: "Réessayer",
  },

  introuvable: {
    titre: "Cette page n'existe pas.",
    texte:
      "[BROUILLON] Elle a peut-être été déplacée, ou l'événement n'est plus en ligne.",
    bouton: "Retour à l'accueil",
  },

  types: {
    evenement: {
      book_club: "Book club",
      rencontre: "Rencontre",
      communaute: "Communauté",
    } satisfies Record<EventType, string>,
    ressource: {
      book: { un: "Livre", plusieurs: "Livres" },
      podcast: { un: "Podcast", plusieurs: "Podcasts" },
      documentary: { un: "Documentaire", plusieurs: "Documentaires" },
      article: { un: "Article", plusieurs: "Articles" },
      other: { un: "Autre", plusieurs: "Et aussi" },
    } satisfies Record<ResourceType, { un: string; plusieurs: string }>,
  },
};
