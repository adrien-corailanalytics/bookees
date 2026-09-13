import type { Venue } from "@/lib/types";

// ⚠️ CONTENU DE DÉMONSTRATION — lieux inventés pendant le prototypage.
// Le Coucou (lieu du café du 26 septembre) manque : il faut son adresse et ses
// coordonnées avant de l'ajouter, sinon il n'apparaît pas sur la carte.
//
// Pour trouver lat/lng : ouvrir le lieu sur Google Maps, clic droit sur le
// point → les deux nombres affichés en haut sont lat puis lng.
// `instagram_url` alimentera le visuel de la fiche lieu.

export const venues: Venue[] = [
  {
    id: "le-court-bouillon",
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
    name: "Le Chantier",
    address: "8 rue du Chai des Farines",
    city: "Bordeaux",
    lat: 44.8378,
    lng: -0.5792,
    description:
      "Un tiers-lieu dans un ancien chai, ambiance chaleureuse et beaucoup de lumière.",
  },
];
