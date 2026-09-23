import type { Event } from "@/lib/types";

// Le 26 septembre vient du post Instagram de l'équipe (date, horaire, lieu,
// livre, mention). Les trois autres séances sont inventées (`demo: true`) :
// à remplacer par les vraies avant d'annoncer l'URL.
//
// Pour ajouter une séance : copier un bloc, changer le slug (il devient l'URL
// /evenements/<slug>). Les dates sont en heure de Paris, sans fuseau.
// Pas de `ticket_url` = pas de bouton d'inscription sur la page.
// Le livre de la séance se déclare dans content/resources.ts (`event_slug`).
// Textes provisoires : préfixe "[BROUILLON] ", voir content/textes.ts.

export const events: Event[] = [
  {
    slug: "cafe-26-septembre",
    title: "[BROUILLON] Premier café BOOKÉ·ES",
    type: "book_club",
    description:
      "[BROUILLON] Le premier café BOOKÉ·ES, en petit groupe, autour de « Comment tout " +
      "peut s'effondrer ». Pas besoin d'avoir tout lu ni d'avoir un avis tranché : un " +
      "tour de table, une discussion ouverte, et du café.",
    start_date: "2026-09-26T11:00",
    end_date: "2026-09-26T13:00",
    venue_name: "Le Coucou",
    address: "183 rue des Pyrénées, 75020 Paris",
    note: "Première édition gratuite",
    image: "/evenements/cafe-26-septembre.png",
  },
  {
    slug: "tiktok-democratie",
    demo: true,
    title: "TikTok est-il encore compatible avec la démocratie ?",
    type: "rencontre",
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
    demo: true,
    title: "À quoi sert encore le travail ?",
    type: "book_club",
    description:
      "Sens au travail, quiet quitting, semaine de 4 jours, revenu universel : " +
      "le travail occupe une place centrale dans nos vies, mais on n'est plus " +
      "vraiment d'accord sur pourquoi. On en discute, livre ou pas, avis " +
      "tranché ou pas.",
    start_date: "2026-11-05T19:00",
    end_date: "2026-11-05T21:00",
    venue_name: "Le Chantier",
    address: "8 rue du Chai des Farines, Bordeaux",
  },
  {
    slug: "qui-decide-de-nos-frontieres",
    demo: true,
    title: "Qui décide de nos frontières ?",
    type: "book_club",
    description:
      "Migrations, asile, politiques européennes : un sujet chargé, qu'on " +
      "essaie d'aborder avec curiosité plutôt qu'avec des slogans. On part " +
      "d'un podcast pour ouvrir la discussion.",
    start_date: "2026-08-05T19:00",
    end_date: "2026-08-05T21:00",
    venue_name: "Le Court Bouillon",
    address: "6 rue des Capucins, Lyon",
  },
];
