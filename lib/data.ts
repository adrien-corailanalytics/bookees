import { cache } from "react";
import { createClient } from "./supabase/server";
import type { Event, Registration, PollResultRow, Resource, Venue } from "./types";

// Les dates sont stockées en naive local Paris ; on compare en texte ISO
// avec l'heure actuelle formatée de la même façon, ce qui reste correct
// pour un tri/filtre chronologique simple.
function nowParisNaive(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value;
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*, speakers(*)")
    .eq("status", "published")
    .gte("start_date", nowParisNaive())
    .order("start_date", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Event[];
}

export async function getPastEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .lt("start_date", nowParisNaive())
    .order("start_date", { ascending: false })
    .limit(12);

  if (error) throw error;
  return (data ?? []) as Event[];
}

export async function getNextEvent(): Promise<Event | null> {
  const events = await getUpcomingEvents();
  return events[0] ?? null;
}

// cache() déduplique les appels identiques au sein d'un même rendu de page
// (generateMetadata + le composant de page appellent tous deux cette
// fonction pour le même slug, sans dupliquer la requête à Supabase).
export const getEventBySlug = cache(async (slug: string): Promise<Event | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*, speakers(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  const event = data as Event;
  if (event.status !== "published") return null;
  return event;
});

export async function getConfirmedRegistrations(eventId: string): Promise<Registration[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", eventId)
    .neq("status", "cancelled");

  if (error) throw error;
  return (data ?? []) as Registration[];
}

export async function getConfirmedCounts(eventIds: string[]): Promise<Record<string, number>> {
  if (eventIds.length === 0) return {};
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("event_id")
    .in("event_id", eventIds)
    .eq("status", "confirmed");

  if (error) throw error;
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.event_id] = (counts[row.event_id] ?? 0) + 1;
  }
  return counts;
}

export async function getPollForEvent(eventId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("polls")
    .select("*")
    .eq("event_id", eventId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getPollResults(pollId: string): Promise<PollResultRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_poll_results", { p_poll_id: pollId });
  if (error) throw error;
  return (data ?? []) as PollResultRow[];
}

export async function getResources(): Promise<Resource[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*, events(title, slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Resource[];
}

export async function getVenues(): Promise<Venue[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("venues")
    .select("*, events(title, slug)")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Venue[];
}
