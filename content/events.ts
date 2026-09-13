import type { Event } from "@/lib/types";

// ⚠️ CONTENU DE DÉMONSTRATION — les trois derniers événements sont fictifs
// (villes, cafés et intervenants inventés pendant le prototypage). À remplacer
// par les vraies séances avant d'annoncer l'URL publiquement.
//
// Pour ajouter une séance : copier un bloc, changer le slug (il devient l'URL
// /evenements/<slug>). Les dates sont en heure de Paris, sans fuseau.
// Pas de `ticket_url` = pas de bouton d'inscription sur la page.

export const events: Event[] = [
  {
    slug: "cafe-26-septembre",
    title: "Café BOOKÉ·ES — première rencontre",
    type: "book_club",
    question: "Peut-on encore débattre ?",
    description:
      "Le premier café BOOKÉ·ES. On se retrouve en petit groupe autour d'une " +
      "grande question, sans avoir besoin d'avoir tout lu ni d'avoir un avis " +
      "tranché. Un tour de table, une discussion ouverte, et beaucoup de café.",
    // TODO horaires à confirmer
    start_date: "2026-09-26T19:00",
    end_date: "2026-09-26T21:00",
    venue_name: "Le Coucou",
    address: "Adresse à confirmer",
  },
  {
    slug: "tiktok-democratie",
    title: "TikTok est-il encore compatible avec la démocratie ?",
    type: "rencontre",
    question: "TikTok est-il encore compatible avec la démocratie ?",
    description:
      "Algorithmes de recommandation, viralité, jeunesse politisée sur les " +
      "réseaux : une soirée pour comprendre comment TikTok façonne le débat " +
      "public, avec deux regards qui ne partent pas des mêmes constats.\n\n" +
      "Au programme : présentation, échange entre les intervenants, questions " +
      "du public, puis apéro pour continuer la conversation.",
    start_date: "2026-10-22T19:30",
    end_date: "2026-10-22T22:00",
    venue_name: "La Cabane à Docs",
    address: "12 quai du Port, Marseille",
    speakers: [
      {
        name: "Camille Faure",
        role: "Chercheuse en sociologie des médias",
        bio: "Travaille sur les usages politiques des plateformes vidéo et l'économie de l'attention.",
      },
      {
        name: "Nassim Belkacem",
        role: "Ancien créateur de contenu, consultant en éducation aux médias",
        bio: "A quitté TikTok après trois ans à temps plein pour former des lycéens à l'esprit critique numérique.",
      },
    ],
  },
  {
    slug: "a-quoi-sert-le-travail",
    title: "À quoi sert encore le travail ?",
    type: "book_club",
    question: "À quoi sert encore le travail ?",
    description:
      "Sens au travail, quiet quitting, semaine de 4 jours, revenu universel : " +
      "le travail occupe une place centrale dans nos vies, mais on n'est plus " +
      "vraiment d'accord sur pourquoi. On en discute, livre ou pas, avis " +
      "tranché ou pas.",
    start_date: "2026-11-05T19:00",
    end_date: "2026-11-05T21:00",
    venue_name: "Le Chantier",
    address: "8 rue du Chai des Farines, Bordeaux",
    resource_title: "Bullshit Jobs — David Graeber",
  },
  {
    slug: "qui-decide-de-nos-frontieres",
    title: "Qui décide de nos frontières ?",
    type: "book_club",
    question: "Qui décide de nos frontières ?",
    description:
      "Migrations, asile, politiques européennes : un sujet chargé, qu'on " +
      "essaie d'aborder avec curiosité plutôt qu'avec des slogans. On part " +
      "d'un podcast pour ouvrir la discussion.",
    start_date: "2026-08-05T19:00",
    end_date: "2026-08-05T21:00",
    venue_name: "Le Court Bouillon",
    address: "6 rue des Capucins, Lyon",
    resource_title: "Podcast « Injustices » — épisode sur l'asile en France",
  },
];
