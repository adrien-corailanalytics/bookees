import type { Venue } from "@/lib/types";

// Le Coucou vient du post Instagram de l'équipe. Les trois autres lieux sont
// inventés (`demo: true`).
//
// Pour trouver lat/lng : ouvrir le lieu sur Google Maps, clic droit sur le
// point → les deux nombres affichés en haut sont lat puis lng.
// `name` doit être écrit comme `venue_name` dans content/events.ts pour que
// la fiche de la séance affiche le logo du lieu.

export const venues: Venue[] = [
  {
    id: "le-coucou",
    name: "Le Coucou",
    address: "183 rue des Pyrénées",
    city: "75020 Paris",
    lat: 48.8608583,
    lng: 2.4003691,
    logo_url: "/lieux/le-coucou.png",
  },
  {
    id: "le-court-bouillon",
    demo: true,
    name: "Le Court Bouillon",
    address: "6 rue des Capucins",
    city: "Lyon",
    lat: 45.764,
    lng: 4.8357,
    description:
      "Un café associatif dans la Presqu'île, grande table commune parfaite " +
      "pour les book clubs.",
  },
  {
    id: "la-cabane-a-docs",
    demo: true,
    name: "La Cabane à Docs",
    address: "12 quai du Port",
    city: "Marseille",
    lat: 43.2965,
    lng: 5.3698,
    description:
      "Une friche culturelle avec vue sur le Vieux-Port, où se tiennent les " +
      "grandes rencontres.",
  },
  {
    id: "le-chantier",
    demo: true,
    name: "Le Chantier",
    address: "8 rue du Chai des Farines",
    city: "Bordeaux",
    lat: 44.8378,
    lng: -0.5792,
    description:
      "Un tiers-lieu dans un ancien chai, ambiance chaleureuse et beaucoup de lumière.",
  },
];
