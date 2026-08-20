import Link from "next/link";
import type { Event } from "@/lib/types";
import { EVENT_TYPE_EMOJI, EVENT_TYPE_LABELS } from "@/lib/types";
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

  const statusColor = capacity.isFull
    ? "text-espresso/60"
    : capacity.isAlmostFull
    ? "text-brick"
    : "text-pine";

  return (
    <Link
      href={`/evenements/${event.slug}`}
      className="card flex h-full flex-col gap-3 p-6 focus-visible:outline-brick"
    >
      <div className="flex items-center justify-between">
        <span className="tag">
          {EVENT_TYPE_EMOJI[event.type]} {EVENT_TYPE_LABELS[event.type]}
        </span>
        <span className="text-xs font-medium text-espresso/60">
          {formatDateShort(event.start_date)} · {formatTime(event.start_date)}
        </span>
      </div>
      <h3 className="font-serif text-xl leading-snug text-espresso">{event.title}</h3>
      {event.question && event.question !== event.title && (
        <p className="text-sm italic text-espresso/70">{event.question}</p>
      )}
      <p className="mt-auto text-sm text-espresso/60">{event.venue_name}</p>
      <p className={`text-sm font-medium ${statusColor}`}>{statusLabel}</p>
    </Link>
  );
}
