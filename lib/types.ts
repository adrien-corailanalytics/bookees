export type EventType = "book_club" | "rencontre" | "communaute";
export type EventStatus = "draft" | "published" | "cancelled";
export type RegistrationStatus = "confirmed" | "waitlist" | "cancelled";
export type PollPhase = "before" | "after";
export type PollChoice = "agree" | "disagree" | "depends";
export type ResourceType = "book" | "podcast" | "documentary" | "article" | "other";

export interface Speaker {
  id: string;
  event_id: string;
  name: string;
  role: string | null;
  bio: string | null;
  image: string | null;
  sort_order: number;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  type: EventType;
  question: string | null;
  description: string;
  start_date: string;
  end_date: string;
  timezone: string;
  venue_name: string;
  address: string;
  capacity: number;
  status: EventStatus;
  cover_image: string | null;
  registration_open: boolean;
  conditions: string | null;
  resource_title: string | null;
  resource_url: string | null;
  created_at: string;
  speakers?: Speaker[];
}

export interface Registration {
  id: string;
  event_id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: RegistrationStatus;
  first_time: boolean;
  source: string | null;
  newsletter_opt_in: boolean;
  cancellation_token: string;
  created_at: string;
}

export interface Poll {
  id: string;
  event_id: string;
  question: string;
  current_phase: PollPhase;
  is_open: boolean;
  created_at: string;
}

export interface PollResultRow {
  phase: PollPhase;
  choice: PollChoice;
  votes: number;
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

// Une couleur d'accent par format pour éviter le monochrome et rendre le
// magazine plus vivant — book club = studieux (pine), rencontre = énergique
// (brick), communauté = chaleureux (mustard).
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

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  author: string | null;
  description: string | null;
  url: string | null;
  cover_image: string | null;
  event_id: string | null;
  created_at: string;
  events?: { title: string; slug: string } | null;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string | null;
  lat: number | null;
  lng: number | null;
  description: string | null;
  photo_url: string | null;
  event_id: string | null;
  created_at: string;
  events?: { title: string; slug: string } | null;
}

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

export interface CapacityInfo {
  taken: number;
  remaining: number;
  isFull: boolean;
  isAlmostFull: boolean;
}
