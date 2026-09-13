import type { Event } from "./types";

function foldLine(line: string): string {
  // RFC 5545: les lignes de plus de 75 octets doivent être repliées.
  if (line.length <= 75) return line;
  let result = "";
  let rest = line;
  while (rest.length > 75) {
    result += rest.slice(0, 75) + "\r\n ";
    rest = rest.slice(75);
  }
  return result + rest;
}

function escapeText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

// Heure naive "2026-09-10 19:00" -> "20260910T190000"
function toLocalStamp(dateStr: string): string {
  const [datePart, timePart] = dateStr.replace(" ", "T").split("T");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = (timePart ?? "00:00").split(":");
  return `${year}${month}${day}T${hour.padStart(2, "0")}${minute.padStart(2, "0")}00`;
}

function nowStamp(): string {
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// Définition standard du fuseau Europe/Paris (CET/CEST), nécessaire pour que
// les dates avec TZID soient interprétées correctement par tous les clients
// calendrier (y compris ceux qui ne connaissent pas la base IANA).
const VTIMEZONE_PARIS = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/Paris",
  "X-LIC-LOCATION:Europe/Paris",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
].join("\r\n");

export function generateICS(event: Event, siteUrl: string): string {
  const eventUrl = `${siteUrl}/evenements/${event.slug}`;
  const question = event.question ? `${event.question}\n\n` : "";
  const description = escapeText(`${question}${event.description}\n\n${eventUrl}`);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BOOKÉ·ES//Evenements//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    VTIMEZONE_PARIS,
    "BEGIN:VEVENT",
    `UID:${event.slug}@bookees`,
    `DTSTAMP:${nowStamp()}`,
    `DTSTART;TZID=Europe/Paris:${toLocalStamp(event.start_date)}`,
    `DTEND;TZID=Europe/Paris:${toLocalStamp(event.end_date)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapeText(`${event.venue_name}, ${event.address}`)}`,
    `URL:${eventUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(foldLine).join("\r\n") + "\r\n";
}
