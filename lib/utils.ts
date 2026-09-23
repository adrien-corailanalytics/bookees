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

// Formats de la fiche de bibliothèque (post Instagram) : "SEPT", "26/09", "11h – 13h".
export function formatMonthTicket(dateStr: string): string {
  const month = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" });
  return month.format(parseNaive(dateStr)).replace(".", "").toUpperCase();
}

export function formatDayMonth(dateStr: string): string {
  const [, month, day] = dateStr.slice(0, 10).split("-");
  return `${day}/${month}`;
}

export function formatHour(dateStr: string): string {
  const [hour, minute] = dateStr.slice(11, 16).split(":");
  return `${Number(hour)}h${minute === "00" ? "" : minute}`;
}

export function formatHourRange(startStr: string, endStr: string): string {
  return `${formatHour(startStr)} – ${formatHour(endStr)}`;
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

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
