import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventBySlug, getResourcesForEvent, getVenueByName } from "@/lib/data";
import { events } from "@/content/events";
import { siteUrl } from "@/content/site";
import { textes } from "@/content/textes";
import { EVENT_TYPE_BG } from "@/lib/types";
import { cn, formatDateLong, formatHourRange } from "@/lib/utils";
import CalendarButtons from "@/components/CalendarButtons";
import Ticket from "@/components/Ticket";
import T from "@/components/T";

const t = textes.evenement;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  const title = event.title;
  const description = event.question ?? event.description.slice(0, 150);
  const images = event.image ? [event.image] : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/evenements/${event.slug}`,
      type: "article",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const resources = getResourcesForEvent(event.slug);
  const venue = getVenueByName(event.venue_name);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/evenements" className="etiquette lien">
        ← {t.retour}
      </Link>

      <div className={cn("mt-8", event.demo && "demo")}>
        <span className={cn("tag", EVENT_TYPE_BG[event.type])}>
          {textes.types.evenement[event.type]}
        </span>
        <h1 className="titre-1 mt-4 max-w-3xl">
          <T>{event.title}</T>
        </h1>
        {event.question && event.question !== event.title && (
          <p className="sous-titre mt-4 max-w-2xl">
            <T>{event.question}</T>
          </p>
        )}

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-12">
            <p className="whitespace-pre-line">
              <T>{event.description}</T>
            </p>

            {resources.length > 0 && (
              <div>
                <h2 className="titre-3">{t.support}</h2>
                <ul className="mt-4 divide-y divide-encre border-y border-encre">
                  {resources.map((resource) => (
                    <li key={resource.id} className="py-4">
                      <Link href={`/ressourcerie#${resource.id}`} className="lien font-titre text-xl">
                        {resource.title}
                      </Link>
                      {resource.author && <p className="mt-1 font-titre text-sm">{resource.author}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h2 className="titre-3">{t.intervenants}</h2>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  {event.speakers.map((speaker) => (
                    <div key={speaker.name} className="fiche p-5">
                      <p className="font-titre text-xl">{speaker.name}</p>
                      {speaker.role && <p className="legende mt-1">{speaker.role}</p>}
                      {speaker.bio && <p className="mt-3 text-sm">{speaker.bio}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Ticket event={event} />

            <dl className="text-sm">
              <dt className="etiquette">{t.quand}</dt>
              <dd className="mt-1 first-letter:uppercase">
                {formatDateLong(event.start_date)}, {formatHourRange(event.start_date, event.end_date)}
              </dd>
            </dl>

            {venue && (
              <Link href={`/carte#${venue.id}`} className="lien block text-sm font-semibold">
                {t.voirSurLaCarte} →
              </Link>
            )}

            <div>
              <p className="etiquette mb-2">{t.calendrier}</p>
              <CalendarButtons event={event} siteUrl={siteUrl} />
            </div>

            {event.ticket_url ? (
              <a href={event.ticket_url} target="_blank" rel="noopener noreferrer" className="btn w-full">
                {t.reserver}
              </a>
            ) : (
              <p className="border-t border-encre pt-4 text-sm">
                <T>{t.sansInscription}</T>
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
