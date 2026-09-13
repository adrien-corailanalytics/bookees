import Link from "next/link";
import type { Event } from "@/lib/types";
import { EVENT_TYPE_EMOJI, EVENT_TYPE_LABELS, EVENT_TYPE_TAG_CLASSES } from "@/lib/types";
import { formatDateShort, formatTime } from "@/lib/utils";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/evenements/${event.slug}`}
      className="card group flex h-full flex-col gap-3 p-6 focus-visible:outline-brick"
    >
      <div className="flex items-center justify-between">
        <span
          className={`tag transition-transform duration-200 group-hover:-rotate-2 ${EVENT_TYPE_TAG_CLASSES[event.type]}`}
        >
          {EVENT_TYPE_EMOJI[event.type]} {EVENT_TYPE_LABELS[event.type]}
        </span>
        <span className="text-xs font-medium text-espresso/60">
          {formatDateShort(event.start_date)} · {formatTime(event.start_date)}
        </span>
      </div>
      <h3 className="font-serif text-xl leading-snug text-espresso">{event.title}</h3>
      {event.question && event.question !== event.title && (
        <p className="border-l-2 border-espresso/15 pl-3 text-sm font-medium text-espresso/70">
          {event.question}
        </p>
      )}
      <p className="mt-auto text-sm text-espresso/60">{event.venue_name}</p>
      {event.ticket_url && (
        <span
          className="pixel-badge w-fit"
          style={{ "--pixel-bg": "#1F4B3F", "--pixel-text": "#F7F1E6" } as React.CSSProperties}
        >
          Inscription ouverte
        </span>
      )}
    </Link>
  );
}
