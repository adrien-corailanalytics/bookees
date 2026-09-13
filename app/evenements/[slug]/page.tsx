import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventBySlug } from "@/lib/data";
import { events } from "@/content/events";
import { siteUrl } from "@/content/site";
import { EVENT_TYPE_EMOJI, EVENT_TYPE_LABELS, EVENT_TYPE_TAG_CLASSES } from "@/lib/types";
import { formatDateLong, formatTimeRange } from "@/lib/utils";
import CalendarButtons from "@/components/CalendarButtons";

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/evenements/${event.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <span className={`tag ${EVENT_TYPE_TAG_CLASSES[event.type]}`}>
        {EVENT_TYPE_EMOJI[event.type]} {EVENT_TYPE_LABELS[event.type]}
      </span>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
        {event.title}
      </h1>
      {event.question && event.question !== event.title && (
        <p className="mt-3 max-w-2xl border-l-2 border-espresso/15 pl-3 font-serif text-xl font-medium text-espresso/75">
          {event.question}
        </p>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <div className="whitespace-pre-line leading-relaxed text-espresso/85">
            {event.description}
          </div>

          {event.resource_title && (
            <div className="card p-6">
              <p className="tag">Ressource associée</p>
              <p className="mt-2 font-serif text-lg text-espresso">{event.resource_title}</p>
              {event.resource_url && (
                <a
                  href={event.resource_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-brick hover:text-bordeaux"
                >
                  Consulter →
                </a>
              )}
            </div>
          )}

          {event.speakers && event.speakers.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl text-espresso">Intervenant·es</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {event.speakers.map((speaker) => (
                  <div key={speaker.name} className="card p-5">
                    <p className="font-serif text-lg text-espresso">{speaker.name}</p>
                    {speaker.role && (
                      <p className="text-sm font-medium text-brick">{speaker.role}</p>
                    )}
                    {speaker.bio && (
                      <p className="mt-2 text-sm leading-relaxed text-espresso/70">
                        {speaker.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium text-espresso">Date</dt>
                <dd className="text-espresso/70">{formatDateLong(event.start_date)}</dd>
              </div>
              <div>
                <dt className="font-medium text-espresso">Horaire</dt>
                <dd className="text-espresso/70">
                  {formatTimeRange(event.start_date, event.end_date)}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-espresso">Lieu</dt>
                <dd className="text-espresso/70">
                  {event.venue_name}
                  <br />
                  {event.address}
                </dd>
              </div>
            </dl>
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-espresso/50">
                Ajouter au calendrier
              </p>
              <CalendarButtons event={event} siteUrl={siteUrl} />
            </div>
          </div>

          {event.ticket_url ? (
            <a
              href={event.ticket_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              Réserver sa place
            </a>
          ) : (
            <div className="card p-6 text-sm text-espresso/60">
              Pas d&rsquo;inscription pour cette séance : venez, c&rsquo;est tout.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
