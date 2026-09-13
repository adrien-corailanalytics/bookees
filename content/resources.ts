import type { Resource } from "@/lib/types";

// ⚠️ CONTENU DE DÉMONSTRATION — ces entrées viennent du prototype. Les livres
// existent, mais ils n'ont pas encore été cités dans un vrai café.
//
// Pour ajouter une ressource : copier un bloc. `id` doit être unique et stable
// (il sert d'ancre). `event_slug` relie la ressource à la séance où elle a été
// évoquée — laisser vide si elle vient d'une discussion hors séance.

export const resources: Resource[] = [
  {
    id: "bronner-nous-parler",
    title: "Pourquoi n'arrivons-nous plus à nous parler ?",
    type: "book",
    author: "Gérald Bronner",
    description:
      "Sur la polarisation et le désaccord démocratique — le point de départ " +
      "de la discussion sur « Peut-on encore débattre ? ».",
  },
  {
    id: "graeber-bullshit-jobs",
    title: "Bullshit Jobs",
    type: "book",
    author: "David Graeber",
    description:
      "Une exploration du sens (ou de l'absence de sens) au travail.",
    event_slug: "a-quoi-sert-le-travail",
  },
  {
    id: "injustices-podcast",
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
    title: "The Social Dilemma",
    type: "documentary",
    author: "Jeff Orlowski",
    description:
      "D'anciens ingénieurs de la tech racontent comment les plateformes " +
      "captent l'attention — utile pour comprendre les mécaniques derrière TikTok.",
    event_slug: "tiktok-democratie",
  },
  {
    id: "desmurget-cretin-digital",
    title: "La fabrique du crétin digital",
    type: "book",
    author: "Michel Desmurget",
    description:
      "Un contrepoint aux discours sur les écrans, à prendre avec la nuance " +
      "qu'il mérite.",
  },
  {
    id: "harari-sapiens",
    title: "Sapiens : une brève histoire de l'humanité",
    type: "book",
    author: "Yuval Noah Harari",
    description:
      "Régulièrement recommandé en fin de rencontre pour prendre du recul.",
  },
];
