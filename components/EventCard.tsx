import Link from "next/link";
import type { Event } from "@/lib/types";
import { EVENT_TYPE_BG } from "@/lib/types";
import { cn, formatDateShort, formatHour } from "@/lib/utils";
import { textes } from "@/content/textes";
import T from "./T";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/evenements/${event.slug}`}
      className={cn(
        "fiche group flex h-full flex-col bg-white p-5 transition-colors duration-200 hover:bg-jaune",
        event.demo && "demo"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={cn("tag", EVENT_TYPE_BG[event.type])}>
          {textes.types.evenement[event.type]}
        </span>
        <span className="etiquette">
          {formatDateShort(event.start_date)} · {formatHour(event.start_date)}
        </span>
      </div>
      <h3 className="mt-4 font-titre text-2xl leading-tight">
        <T>{event.title}</T>
      </h3>
      {event.question && event.question !== event.title && (
        <p className="mt-2 text-sm">
          <T>{event.question}</T>
        </p>
      )}
      <p className="legende mt-auto pt-4">{event.venue_name}</p>
      {event.ticket_url && (
        <span className="tag mt-3 w-fit bg-white">{textes.evenement.inscriptionOuverte}</span>
      )}
    </Link>
  );
}
