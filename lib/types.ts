export type EventType = "book_club" | "rencontre" | "communaute";
export type ResourceType = "book" | "podcast" | "documentary" | "article" | "other";

export interface Speaker {
  name: string;
  role?: string;
  bio?: string;
}

export interface Event {
  slug: string;
  title: string;
  type: EventType;
  /** La grande question de la séance, si elle diffère du titre. */
  question?: string;
  description: string;
  /** Heure locale de Paris, sans fuseau : "2026-09-26T19:00". */
  start_date: string;
  end_date: string;
  /** Doit correspondre au `name` d'un lieu de content/venues.ts pour afficher son logo. */
  venue_name: string;
  address: string;
  /** Billetterie externe (HelloAsso, Billetweb…). Absent = pas d'inscription. */
  ticket_url?: string;
  /** Mention en bas de la fiche, ex. « Première édition gratuite ». */
  note?: string;
  /** Visuel de partage (WhatsApp, réseaux), chemin dans public/. */
  image?: string;
  speakers?: Speaker[];
  /** Événement inventé : affiché avec la mention « fictif ». */
  demo?: boolean;
}

export interface Resource {
  /** Identifiant court et stable, sert d'ancre dans l'URL. */
  id: string;
  title: string;
  type: ResourceType;
  author?: string;
  description?: string;
  url?: string;
  /** Slug de l'événement où elle sert de support ou a été citée. */
  event_slug?: string;
  demo?: boolean;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city?: string;
  lat: number;
  lng: number;
  description?: string;
  /** Logo du lieu, chemin dans public/ (fond blanc accepté). */
  logo_url?: string;
  instagram_url?: string;
  demo?: boolean;
}

// Un pastel par format : c'est un code de repérage, pas une décoration.
export const EVENT_TYPE_BG: Record<EventType, string> = {
  book_club: "bg-vert",
  rencontre: "bg-rose",
  communaute: "bg-bleu",
};

export const RESOURCE_TYPE_BG: Record<ResourceType, string> = {
  book: "bg-vert",
  podcast: "bg-rose",
  documentary: "bg-bleu",
  article: "bg-jaune",
  other: "bg-white",
};
