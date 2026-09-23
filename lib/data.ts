import { events } from "@/content/events";
import { resources } from "@/content/resources";
import { venues } from "@/content/venues";
import type { Event, Resource, Venue } from "./types";

// Le contenu vit dans des fichiers TypeScript (`content/`), pas dans une base.
// ~60 ressources et 12 événements par an : une base de données coûterait plus
// cher à maintenir que le contenu qu'elle stockerait.
// ponytail: fichiers en dur — passer à un CMS si quelqu'un doit éditer sans
// toucher au dépôt.

// Les dates sont écrites en heure locale de Paris sans fuseau
// ("2026-09-26T19:00"). On compare en texte ISO avec l'heure actuelle formatée
// de la même façon : suffisant pour trier et filtrer chronologiquement.
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

export function getUpcomingEvents(): Event[] {
  const now = nowParisNaive();
  return events
    .filter((e) => e.end_date >= now)
    .sort((a, b) => a.start_date.localeCompare(b.start_date));
}

export function getPastEvents(): Event[] {
  const now = nowParisNaive();
  return events
    .filter((e) => e.end_date < now)
    .sort((a, b) => b.start_date.localeCompare(a.start_date))
    .slice(0, 12);
}

export function getEventBySlug(slug: string): Event | null {
  return events.find((e) => e.slug === slug) ?? null;
}

export function getResources(): Resource[] {
  return resources;
}

export function getVenues(): Venue[] {
  return venues;
}

export function getResourcesForEvent(slug: string): Resource[] {
  return resources.filter((r) => r.event_slug === slug);
}

export function getVenueByName(name: string): Venue | null {
  return venues.find((v) => v.name === name) ?? null;
}

export function getEventTitle(slug: string | undefined): string | null {
  if (!slug) return null;
  return events.find((e) => e.slug === slug)?.title ?? null;
}
