import type { Resource } from "@/lib/types";

// Le livre du 26 septembre vient du post Instagram de l'équipe. Les autres
// entrées viennent du prototype (`demo: true`) : les livres existent, mais ils
// n'ont pas été cités dans un vrai café.
//
// Pour ajouter une ressource : copier un bloc. `id` doit être unique et stable
// (il sert d'ancre). `event_slug` relie la ressource à la séance où elle a été
// évoquée : elle apparaît alors sur la fiche de la séance. Laisser vide si
// elle vient d'une discussion hors séance.

export const resources: Resource[] = [
  {
    id: "servigne-stevens-effondrer",
    title: "Comment tout peut s'effondrer",
    type: "book",
    author: "Pablo Servigne & Raphaël Stevens",
    event_slug: "cafe-26-septembre",
  },
  {
    id: "bronner-nous-parler",
    demo: true,
    title: "Pourquoi n'arrivons-nous plus à nous parler ?",
    type: "book",
    author: "Gérald Bronner",
    description: "Sur la polarisation et le désaccord démocratique.",
  },
  {
    id: "graeber-bullshit-jobs",
    demo: true,
    title: "Bullshit Jobs",
    type: "book",
    author: "David Graeber",
    description: "Une exploration du sens (ou de l'absence de sens) au travail.",
    event_slug: "a-quoi-sert-le-travail",
  },
  {
    id: "injustices-podcast",
    demo: true,
    title: "Injustices",
    type: "podcast",
    author: "Binge Audio",
    description:
      "Une série d'enquête sur les inégalités face à la justice en France, " +
      "point de départ d'une discussion sur les frontières et l'asile.",
    event_slug: "qui-decide-de-nos-frontieres",
  },
  {
    id: "the-social-dilemma",
    demo: true,
    title: "The Social Dilemma",
    type: "documentary",
    author: "Jeff Orlowski",
    description:
      "D'anciens ingénieurs de la tech racontent comment les plateformes " +
      "captent l'attention.",
    event_slug: "tiktok-democratie",
  },
  {
    id: "desmurget-cretin-digital",
    demo: true,
    title: "La fabrique du crétin digital",
    type: "book",
    author: "Michel Desmurget",
    description:
      "Un contrepoint aux discours sur les écrans, à prendre avec la nuance " +
      "qu'il mérite.",
  },
  {
    id: "harari-sapiens",
    demo: true,
    title: "Sapiens : une brève histoire de l'humanité",
    type: "book",
    author: "Yuval Noah Harari",
    description: "Régulièrement recommandé en fin de rencontre pour prendre du recul.",
  },
];
