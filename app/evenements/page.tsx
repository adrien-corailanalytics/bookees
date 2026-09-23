import Link from "next/link";
import type { Metadata } from "next";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";
import EventCard from "@/components/EventCard";
import T from "@/components/T";
import { cn, formatDateShort } from "@/lib/utils";
import { EVENT_TYPE_BG, type EventType } from "@/lib/types";
import { textes } from "@/content/textes";

const t = textes.evenements;

export const metadata: Metadata = {
  title: t.titre,
  description: t.metaDescription,
};

const FILTERS: { value: EventType | "all"; label: string; active: string }[] = [
  { value: "all", label: t.tous, active: "bg-encre text-white" },
  ...(Object.keys(EVENT_TYPE_BG) as EventType[]).map((type) => ({
    value: type,
    label: textes.types.evenement[type],
    active: EVENT_TYPE_BG[type],
  })),
];

export default async function EvenementsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams.type ?? "all";
  const filtered =
    activeFilter === "all" ? upcoming : upcoming.filter((e) => e.type === activeFilter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="titre-1">{t.titre}</h1>
      <p className="sous-titre mt-4 max-w-xl">
        <T>{t.intro}</T>
      </p>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label={t.filtresLabel}>
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "all" ? "/evenements" : `/evenements?type=${f.value}`}
            className={cn(
              "tag !px-4 !py-1.5 transition-colors",
              activeFilter === f.value ? f.active : "bg-white hover:bg-jaune"
            )}
            aria-current={activeFilter === f.value ? "true" : undefined}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <p className="legende mt-16">{t.vide}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}

      {past.length > 0 && (
        <details className="mt-20 border-t border-encre pt-6">
          <summary className="etiquette cursor-pointer">{t.passes}</summary>
          <ul className="mt-6 divide-y divide-encre/20">
            {past.map((event) => (
              <li key={event.slug} className={cn("flex items-center justify-between gap-4 py-3 text-sm", event.demo && "demo")}>
                <Link href={`/evenements/${event.slug}`} className="lien">
                  <T>{event.title}</T>
                </Link>
                <span className="legende">{formatDateShort(event.start_date)}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
