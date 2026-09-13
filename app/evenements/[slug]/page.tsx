import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventBySlug, getConfirmedCounts, getPollForEvent } from "@/lib/data";
import { EVENT_TYPE_EMOJI, EVENT_TYPE_LABELS, EVENT_TYPE_TAG_CLASSES } from "@/lib/types";
import { formatDateLong, formatTimeRange, getCapacityInfo } from "@/lib/utils";
import RegisterForm from "@/components/RegisterForm";
import PollWidget from "@/components/PollWidget";
import CapacityBar from "@/components/CapacityBar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
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
      images: event.cover_image ? [event.cover_image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const counts = await getConfirmedCounts([event.id]);
  const confirmedCount = counts[event.id] ?? 0;
  const capacity = getCapacityInfo(event.capacity, [
    ...Array(confirmedCount).fill({ status: "confirmed" as const }),
  ]);
  const poll = await getPollForEvent(event.id);

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

      {event.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={event.cover_image}
          alt=""
          className="mt-8 aspect-[16/9] w-full rounded-card object-cover"
        />
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
                {event.speakers
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((speaker) => (
                    <div key={speaker.id} className="card p-5">
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

          {event.conditions && (
            <div>
              <h2 className="font-serif text-xl text-espresso">Conditions</h2>
              <p className="mt-2 text-sm text-espresso/70">{event.conditions}</p>
            </div>
          )}

          {poll && (
            <PollWidget
              pollId={poll.id}
              question={poll.question}
              currentPhase={poll.current_phase}
              isOpen={poll.is_open}
            />
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
              <div>
                <dt className="font-medium text-espresso">Places</dt>
                <dd className={capacity.isFull ? "text-espresso/60" : "text-pine"}>
                  {capacity.isFull
                    ? "Complet"
                    : `${capacity.remaining} / ${event.capacity} disponibles`}
                </dd>
              </div>
            </dl>
            <div className="mt-4">
              <CapacityBar capacity={capacity} />
            </div>
          </div>

          {event.registration_open ? (
            <RegisterForm event={event} isFull={capacity.isFull} siteUrl={siteUrl} />
          ) : (
            <div className="card p-6 text-sm text-espresso/60">
              Les inscriptions ne sont pas encore ouvertes pour cet événement.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
