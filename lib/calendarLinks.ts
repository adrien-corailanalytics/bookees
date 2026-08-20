import type { Event } from "./types";
import { parisNaiveToUTC } from "./utils";

function toUtcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function eventLocation(event: Event): string {
  return `${event.venue_name}, ${event.address}`;
}

function eventDescription(event: Event, siteUrl: string): string {
  const question = event.question ? `${event.question}\n\n` : "";
  return `${question}${event.description}\n\nPlus d'informations : ${siteUrl}/evenements/${event.slug}`;
}

export function googleCalendarUrl(event: Event, siteUrl: string): string {
  const start = toUtcStamp(parisNaiveToUTC(event.start_date));
  const end = toUtcStamp(parisNaiveToUTC(event.end_date));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: eventDescription(event, siteUrl),
    location: eventLocation(event),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(event: Event, siteUrl: string): string {
  const start = parisNaiveToUTC(event.start_date).toISOString();
  const end = parisNaiveToUTC(event.end_date).toISOString();
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: start,
    enddt: end,
    body: eventDescription(event, siteUrl),
    location: eventLocation(event),
  });
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function icsDownloadUrl(event: Event, siteUrl: string): string {
  return `${siteUrl}/api/events/${event.slug}/ics`;
}
