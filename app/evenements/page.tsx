import Link from "next/link";
import type { Metadata } from "next";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";
import EventCard from "@/components/EventCard";
import { cn } from "@/lib/utils";
import type { EventType } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Événements",
  description: "Tous les book clubs, rencontres et événements communautaires BOOKÉ·ES à venir.",
};

const FILTERS: { value: EventType | "all"; label: string; active: string }[] = [
  { value: "all", label: "Tous", active: "bg-espresso text-cream" },
  { value: "book_club", label: "📚 Book Clubs", active: "bg-pine text-cream" },
  { value: "rencontre", label: "🎙 Rencontres", active: "bg-brick text-cream" },
  { value: "communaute", label: "☕ Communauté", active: "bg-mustard text-espresso" },
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
      <h1 className="font-serif text-4xl text-espresso sm:text-5xl">Événements</h1>
      <p className="mt-3 max-w-xl text-espresso/70">
        Book clubs, rencontres et vie de communauté — tout ce qui se prépare chez BOOKÉ·ES.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par type">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "all" ? "/evenements" : `/evenements?type=${f.value}`}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5",
              activeFilter === f.value ? f.active : "bg-paper text-espresso/70 hover:bg-espresso/10"
            )}
            aria-current={activeFilter === f.value ? "true" : undefined}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-espresso/60">
          Aucun événement à venir dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}

      {past.length > 0 && (
        <details className="mt-20">
          <summary className="cursor-pointer text-sm font-semibold uppercase tracking-wide text-espresso/50">
            Événements passés
          </summary>
          <ul className="mt-6 divide-y divide-espresso/10">
            {past.map((event) => (
              <li key={event.slug} className="flex items-center justify-between py-3 text-sm">
                <span className="text-espresso/70">{event.title}</span>
                <span className="text-espresso/40">{formatDateShort(event.start_date)}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
