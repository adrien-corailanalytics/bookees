import type { CapacityInfo, RegistrationStatus } from "./types";

const PARIS_TZ = "Europe/Paris";

// Les dates event.start_date / end_date sont stockées en "naive timestamp"
// représentant directement l'heure locale de Paris (ex: "2026-09-10T19:00:00").
// On les affiche donc SANS conversion de fuseau horaire.
function parseNaive(dateStr: string): Date {
  // new Date("2026-09-10T19:00:00") est interprété comme heure locale du
  // serveur, ce qui est incorrect si le serveur ne tourne pas en Europe/Paris.
  // On parse donc manuellement les composants.
  const [datePart, timePart] = dateStr.replace(" ", "T").split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = (timePart ?? "00:00").split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

export function formatDateLong(dateStr: string): string {
  const d = parseNaive(dateStr);
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function formatDateShort(dateStr: string): string {
  const d = parseNaive(dateStr);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(d);
}

export function formatTime(dateStr: string): string {
  const d = parseNaive(dateStr);
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(d);
}

export function formatTimeRange(startStr: string, endStr: string): string {
  return `${formatTime(startStr)} – ${formatTime(endStr)}`;
}

// Convertit une date naive "heure de Paris" en Date UTC réelle, pour générer
// des liens Google Calendar / Outlook (qui attendent des timestamps UTC).
// Utilise Intl pour déterminer l'offset Paris (CET/CEST) à cette date précise,
// sans dépendre des règles DST codées en dur.
export function parisNaiveToUTC(dateStr: string): Date {
  const [datePart, timePart] = dateStr.replace(" ", "T").split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = (timePart ?? "00:00").split(":").map(Number);

  // Estimation initiale en traitant les composants comme UTC.
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute));

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PARIS_TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(guess);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const parisAsUTC = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute")
  );

  // Décalage entre l'heure Paris affichée pour `guess` et `guess` lui-même.
  const offsetMs = parisAsUTC - guess.getTime();
  return new Date(guess.getTime() - offsetMs);
}

export function getCapacityInfo(
  capacity: number,
  registrations: { status: RegistrationStatus }[]
): CapacityInfo {
  const taken = registrations.filter((r) => r.status === "confirmed").length;
  const remaining = Math.max(capacity - taken, 0);
  return {
    taken,
    remaining,
    isFull: remaining <= 0,
    isAlmostFull: remaining > 0 && remaining <= Math.max(3, Math.ceil(capacity * 0.15)),
  };
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
