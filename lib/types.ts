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
  venue_name: string;
  address: string;
  /** Billetterie externe (HelloAsso, Billetweb…). Absent = pas d'inscription. */
  ticket_url?: string;
  /** Le livre / podcast / doc qui sert de support à la séance. */
  resource_title?: string;
  resource_url?: string;
  speakers?: Speaker[];
}

export interface Resource {
  /** Identifiant court et stable, sert d'ancre dans l'URL. */
  id: string;
  title: string;
  type: ResourceType;
  author?: string;
  description?: string;
  url?: string;
  cover_image?: string;
  /** Slug de l'événement où elle a été citée. */
  event_slug?: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city?: string;
  lat: number;
  lng: number;
  description?: string;
  photo_url?: string;
  instagram_url?: string;
}

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  book_club: "Book Club",
  rencontre: "Rencontre",
  communaute: "Communauté",
};

export const EVENT_TYPE_EMOJI: Record<EventType, string> = {
  book_club: "📚",
  rencontre: "🎙",
  communaute: "☕",
};

// Une couleur d'accent par format pour éviter le monochrome — book club =
// studieux (pine), rencontre = énergique (brick), communauté = chaleureux
// (mustard). C'est un code couleur utile, pas de la décoration.
export const EVENT_TYPE_TAG_CLASSES: Record<EventType, string> = {
  book_club: "bg-pine/10 text-pine",
  rencontre: "bg-brick/10 text-brick",
  communaute: "bg-mustard/15 text-mustard",
};

export const EVENT_TYPE_SOLID_CLASSES: Record<EventType, string> = {
  book_club: "bg-pine text-cream",
  rencontre: "bg-brick text-cream",
  communaute: "bg-mustard text-espresso",
};

export const EVENT_TYPE_TEXT_CLASSES: Record<EventType, string> = {
  book_club: "text-pine",
  rencontre: "text-brick",
  communaute: "text-mustard",
};

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  book: "Livre",
  podcast: "Podcast",
  documentary: "Documentaire",
  article: "Article",
  other: "Autre",
};

export const RESOURCE_TYPE_EMOJI: Record<ResourceType, string> = {
  book: "📖",
  podcast: "🎧",
  documentary: "🎬",
  article: "📰",
  other: "🔖",
};

// Couleur de "tranche" par type de ressource, pour le mur de la Ressourcerie.
export const RESOURCE_TYPE_SPINE_COLOR: Record<ResourceType, string> = {
  book: "#4A2E22",
  podcast: "#1F4B3F",
  documentary: "#B23A26",
  article: "#C98A2B",
  other: "#2E211A",
};
