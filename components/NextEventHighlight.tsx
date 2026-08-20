import Link from "next/link";
import type { Event } from "@/lib/types";
import { EVENT_TYPE_EMOJI, EVENT_TYPE_LABELS } from "@/lib/types";
import { formatDateLong, formatTimeRange, getCapacityInfo } from "@/lib/utils";

export default function NextEventHighlight({
  event,
  confirmedCount,
}: {
  event: Event;
  confirmedCount: number;
}) {
  const capacity = getCapacityInfo(event.capacity, [
    ...Array(confirmedCount).fill({ status: "confirmed" as const }),
  ]);

  return (
    <div className="card grid gap-6 overflow-hidden p-8 sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-center">
      <div>
        <span className="tag">
          {EVENT_TYPE_EMOJI[event.type]} {EVENT_TYPE_LABELS[event.type]}
        </span>
        <h3 className="mt-4 font-serif text-3xl leading-tight text-espresso sm:text-4xl">
          {event.title}
        </h3>
        {event.question && event.question !== event.title && (
          <p className="mt-2 text-lg italic text-espresso/70">{event.question}</p>
        )}
        <dl className="mt-6 grid grid-cols-1 gap-2 text-sm text-espresso/80 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-espresso">Date</dt>
            <dd>{formatDateLong(event.start_date)}</dd>
          </div>
          <div>
            <dt className="font-medium text-espresso">Horaire</dt>
            <dd>{formatTimeRange(event.start_date, event.end_date)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium text-espresso">Lieu</dt>
            <dd>{event.venue_name}, {event.address}</dd>
          </div>
        </dl>
        {!capacity.isFull && (
          <p className="mt-4 text-sm font-medium text-pine">
            {capacity.remaining} place{capacity.remaining > 1 ? "s" : ""} restante
            {capacity.remaining > 1 ? "s" : ""}
          </p>
        )}
        {capacity.isFull && (
          <p className="mt-4 text-sm font-medium text-espresso/60">
            Complet — inscrivez-vous en liste d&rsquo;attente
          </p>
        )}
        <Link href={`/evenements/${event.slug}`} className="btn-primary mt-6">
          {capacity.isFull ? "Rejoindre la liste d'attente" : "S'inscrire"}
        </Link>
      </div>
      <div className="hidden aspect-[4/5] rounded-card bg-gradient-to-br from-coffee via-espresso to-ink md:block" />
    </div>
  );
}
