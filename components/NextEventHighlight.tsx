import Link from "next/link";
import type { Event } from "@/lib/types";
import { EVENT_TYPE_EMOJI, EVENT_TYPE_LABELS, EVENT_TYPE_TAG_CLASSES } from "@/lib/types";
import { formatDateLong, formatTimeRange } from "@/lib/utils";

export default function NextEventHighlight({ event }: { event: Event }) {
  return (
    <div className="card grid gap-6 overflow-hidden p-8 sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-center">
      <div>
        <span className={`tag ${EVENT_TYPE_TAG_CLASSES[event.type]}`}>
          {EVENT_TYPE_EMOJI[event.type]} {EVENT_TYPE_LABELS[event.type]}
        </span>
        <h3 className="mt-4 font-serif text-3xl leading-tight text-espresso sm:text-4xl">
          {event.title}
        </h3>
        {event.question && event.question !== event.title && (
          <p className="mt-2 border-l-2 border-espresso/15 pl-3 text-lg font-medium text-espresso/75">
            {event.question}
          </p>
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
        <Link
          href={`/evenements/${event.slug}`}
          className="btn-arcade mt-6"
          style={{ "--arcade-bg": "#B23A26" } as React.CSSProperties}
        >
          Voir la séance
        </Link>
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-card bg-gradient-to-br from-coffee via-espresso to-ink md:block">
        <span className="absolute -bottom-6 -right-4 rotate-[-12deg] text-[7rem] leading-none opacity-90">
          {EVENT_TYPE_EMOJI[event.type]}
        </span>
      </div>
    </div>
  );
}
