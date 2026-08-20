export type EventType = "book_club" | "rencontre" | "communaute";
export type EventStatus = "draft" | "published" | "cancelled";
export type RegistrationStatus = "confirmed" | "waitlist" | "cancelled";
export type PollPhase = "before" | "after";
export type PollChoice = "agree" | "disagree" | "depends";

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

export interface CapacityInfo {
  taken: number;
  remaining: number;
  isFull: boolean;
  isAlmostFull: boolean;
}
