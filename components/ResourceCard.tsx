import Link from "next/link";
import type { Resource } from "@/lib/types";
import { RESOURCE_TYPE_BG } from "@/lib/types";
import { getEventTitle } from "@/lib/data";
import { cn } from "@/lib/utils";
import { textes } from "@/content/textes";
import T from "./T";

// Une fiche de catalogue : type et numéro en en-tête, titre tapé à la machine.
export default function ResourceCard({ resource, number }: { resource: Resource; number: number }) {
  const eventTitle = getEventTitle(resource.event_slug);

  return (
    <article
      id={resource.id}
      className={cn("fiche flex h-full flex-col", RESOURCE_TYPE_BG[resource.type], resource.demo && "demo")}
    >
      <div className="etiquette flex justify-between border-b border-encre px-4 py-2">
        <span>{textes.types.ressource[resource.type].un}</span>
        <span>
          {textes.ressourcerie.fiche} {String(number).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-titre text-xl leading-snug">{resource.title}</h3>
        {resource.author && <p className="mt-1 font-titre text-sm">{resource.author}</p>}
        {resource.description && (
          <p className="mt-3 text-sm leading-relaxed">
            <T>{resource.description}</T>
          </p>
        )}
        <div className="mt-auto space-y-1 pt-4 text-sm">
          {eventTitle && (
            <p>
              {textes.ressourcerie.vuAu}{" "}
              <Link href={`/evenements/${resource.event_slug}`} className="lien">
                <T>{eventTitle}</T>
              </Link>
            </p>
          )}
          {resource.url && (
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="lien block font-semibold">
              {textes.ressourcerie.consulter} →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
