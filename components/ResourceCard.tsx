import Link from "next/link";
import type { Resource } from "@/lib/types";
import { RESOURCE_TYPE_SPINE_COLOR } from "@/lib/types";
import { getEventTitle } from "@/lib/data";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const eventTitle = getEventTitle(resource.event_slug);

  return (
    <div
      className="flex h-full min-w-[220px] max-w-[240px] flex-1 flex-col overflow-hidden rounded-md bg-paper shadow-card transition-transform duration-200 hover:-translate-y-1.5"
      style={{ borderLeft: `6px solid ${RESOURCE_TYPE_SPINE_COLOR[resource.type]}` }}
    >
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg leading-snug text-espresso">{resource.title}</h3>
        {resource.author && (
          <p className="mt-1 text-sm font-medium text-espresso/60">{resource.author}</p>
        )}
        {resource.description && (
          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-espresso/75">
            {resource.description}
          </p>
        )}
        <div className="mt-auto space-y-2 pt-4">
          {eventTitle && (
            <Link
              href={`/evenements/${resource.event_slug}`}
              className="block text-xs font-semibold text-pine hover:text-espresso"
            >
              Vu au book club : {eventTitle} →
            </Link>
          )}
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs font-semibold text-brick hover:text-bordeaux"
            >
              Consulter →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
