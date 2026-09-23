import Image from "next/image";
import type { Event } from "@/lib/types";
import { EVENT_TYPE_BG } from "@/lib/types";
import { getResourcesForEvent, getVenueByName } from "@/lib/data";
import { cn, formatDayMonth, formatHourRange, formatMonthTicket } from "@/lib/utils";
import { textes } from "@/content/textes";
import T from "./T";
import logo from "@/public/brand/bookees-slogan.svg";

// La fiche de bibliothèque du post Instagram de l'équipe, en HTML : mois et
// année, logo, LIEU, puis le tableau TITRE/AUTEUR·ICE | DATE.
export default function Ticket({ event }: { event: Event }) {
  const resources = getResourcesForEvent(event.slug);
  const venue = getVenueByName(event.venue_name);
  const rows = resources.length > 0 ? resources : [{ id: "seance", title: event.title, author: "" }];
  // Lignes vides pour garder l'allure d'une carte d'emprunt, comme sur le post.
  const emptyRows = Math.max(0, 3 - rows.length);

  return (
    <div className={cn("fiche px-5 pb-5 sm:px-7", EVENT_TYPE_BG[event.type])}>
      <div className="flex justify-between border-b border-encre py-3 text-sm font-semibold">
        <span>{formatMonthTicket(event.start_date)}</span>
        <span>{event.start_date.slice(0, 4)}</span>
      </div>

      <div className="border-b border-encre py-6">
        <Image src={logo} alt="BOOKÉ·ES — Book club conscient" className="mx-auto h-auto w-44" />
      </div>

      <div className="py-4">
        <p className="etiquette">{textes.ticket.lieu}</p>
        <div className="mt-2 grid grid-cols-2 items-center gap-4">
          {venue?.logo_url ? (
            <Image
              src={venue.logo_url}
              alt={event.venue_name}
              width={1430}
              height={801}
              className="h-auto w-full max-w-[9rem] mix-blend-multiply"
            />
          ) : (
            <p className="font-titre text-2xl leading-tight">{event.venue_name}</p>
          )}
          <p className="whitespace-pre-line text-sm">{event.address.replace(", ", "\n")}</p>
        </div>
      </div>

      <table className="w-full border-t-[3px] border-double border-encre text-left">
        <thead>
          <tr className="border-b border-encre">
            <th scope="col" className="etiquette py-3 pr-3 font-semibold">
              {textes.ticket.titreAuteur}
            </th>
            <th scope="col" className="etiquette w-24 border-l border-encre py-3 pl-3 font-semibold">
              {textes.ticket.date}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} className="border-b border-encre align-top">
              <td className="py-3 pr-3">
                <p className="font-titre text-lg leading-snug sm:text-xl">
                  <T>{row.title}</T>
                </p>
                {row.author && <p className="mt-1 font-titre text-sm">{row.author}</p>}
              </td>
              <td className="border-l border-encre py-3 pl-3 font-titre">
                {i === 0 && (
                  <>
                    <p className="text-lg sm:text-xl">{formatDayMonth(event.start_date)}</p>
                    <p className="mt-1 text-sm">{formatHourRange(event.start_date, event.end_date)}</p>
                  </>
                )}
              </td>
            </tr>
          ))}
          {Array.from({ length: emptyRows }, (_, i) => (
            <tr key={i} className="h-10 border-b border-encre" aria-hidden="true">
              <td />
              <td className="border-l border-encre" />
            </tr>
          ))}
        </tbody>
      </table>

      {event.note && <p className="mt-4 text-center italic">{event.note}</p>}
    </div>
  );
}
