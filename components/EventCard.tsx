import Link from "next/link";
import type { Event } from "@/lib/types";
import { EVENT_TYPE_EMOJI, EVENT_TYPE_LABELS, EVENT_TYPE_TAG_CLASSES } from "@/lib/types";
import { formatDateShort, formatTime, getCapacityInfo } from "@/lib/utils";

export default function EventCard({
  event,
  confirmedCount,
}: {
  event: Event;
  confirmedCount: number;
}) {
  const capacity = getCapacityInfo(event.capacity, [
    ...Array(confirmedCount).fill({ status: "confirmed" as const }),
  ]);

  const statusLabel = capacity.isFull
    ? "Complet — liste d'attente"
    : capacity.isAlmostFull
    ? "Bientôt complet"
    : "Places disponibles";

  const needsBadge = capacity.isFull || capacity.isAlmostFull;

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
      {needsBadge ? (
        <span
          className="pixel-badge w-fit"
          style={
            {
              "--pixel-bg": capacity.isFull ? "#B23A26" : "#C98A2B",
              "--pixel-text": capacity.isFull ? "#F7F1E6" : "#2E211A",
            } as React.CSSProperties
          }
        >
          {statusLabel}
        </span>
      ) : (
        <p className="text-sm font-medium text-pine">{statusLabel}</p>
      )}
    </Link>
  );
}
