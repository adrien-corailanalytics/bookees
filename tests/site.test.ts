// Garde-fous sur ce qui casse sans bruit : un contenu mal relié, un préfixe
// de brouillon mal écrit, un .ics mal plié, un décalage d'heure.
// Lancé par `npm test` (runner natif de Node, sans dépendance).

import { test } from "node:test";
import assert from "node:assert/strict";
import { events } from "../content/events.ts";
import { resources } from "../content/resources.ts";
import { venues } from "../content/venues.ts";
import { textes } from "../content/textes.ts";
import { generateICS } from "../lib/ics.ts";
import { formatDayMonth, formatHourRange, formatMonthTicket, parisNaiveToUTC } from "../lib/utils.ts";

function assertUnique(values: string[], what: string) {
  const dup = values.filter((v, i) => values.indexOf(v) !== i);
  assert.deepEqual(dup, [], `${what} en double : ${dup.join(", ")}`);
}

test("contenu : identifiants uniques et références valides", () => {
  assertUnique(events.map((e) => e.slug), "slug de séance");
  assertUnique(resources.map((r) => r.id), "id de ressource");
  assertUnique(venues.map((v) => v.id), "id de lieu");

  const slugs = new Set(events.map((e) => e.slug));
  for (const r of resources) {
    if (r.event_slug) assert.ok(slugs.has(r.event_slug), `ressource ${r.id} : séance inconnue « ${r.event_slug} »`);
  }

  const venueNames = new Set(venues.map((v) => v.name));
  for (const e of events) {
    assert.ok(venueNames.has(e.venue_name), `séance ${e.slug} : lieu « ${e.venue_name} » absent de content/venues.ts`);
    assert.match(e.start_date, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, `séance ${e.slug} : start_date`);
    assert.match(e.end_date, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, `séance ${e.slug} : end_date`);
    assert.ok(e.end_date > e.start_date, `séance ${e.slug} : fin avant le début`);
  }
});

test("contenu : le préfixe de brouillon est écrit exactement « [BROUILLON] »", () => {
  const strings: string[] = [];
  const walk = (value: unknown) => {
    if (typeof value === "string") strings.push(value);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  };
  walk([textes, events, resources, venues]);

  // Mal écrit, le préfixe s'afficherait tel quel au lieu d'être surligné.
  const malformed = strings.filter((s) => /brouillon/i.test(s) && !/^\[BROUILLON\] \S/.test(s));
  assert.deepEqual(malformed, []);
});

test("ics : lignes pliées proprement, texte échappé", () => {
  // Une séance dont la description contient des retours à la ligne et des virgules.
  const event = events.find((e) => e.description.includes("\n")) ?? events[0];
  const ics = generateICS(event, "https://example.org");
  const raw = ics.trimEnd().split("\r\n");
  assert.deepEqual(raw.filter((l) => l.trim() === ""), [], "ligne vide (repliage à travers un saut de ligne)");
  for (const line of ics.replace(/\r\n /g, "").trimEnd().split("\r\n")) {
    assert.match(line, /^[A-Z-]+[:;]/, `ligne qui n'est pas une propriété : « ${line} »`);
  }
});

test("dates : formats de la fiche et heure de Paris", () => {
  assert.equal(formatDayMonth("2026-09-26T11:00"), "26/09");
  assert.equal(formatMonthTicket("2026-09-26T11:00"), "SEPT");
  assert.equal(formatHourRange("2026-10-22T19:30", "2026-10-22T22:00"), "19h30 – 22h");
  assert.equal(parisNaiveToUTC("2026-09-26T11:00").toISOString(), "2026-09-26T09:00:00.000Z"); // été
  assert.equal(parisNaiveToUTC("2026-12-01T19:00").toISOString(), "2026-12-01T18:00:00.000Z"); // hiver
});
