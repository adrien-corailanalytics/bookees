import Image from "next/image";
import Link from "next/link";
import { getUpcomingEvents } from "@/lib/data";
import { EVENT_TYPE_BG } from "@/lib/types";
import { cn } from "@/lib/utils";
import Ticket from "@/components/Ticket";
import EventCard from "@/components/EventCard";
import T from "@/components/T";
import { site } from "@/content/site";
import { textes } from "@/content/textes";
import logo from "@/public/brand/bookees-slogan.svg";

const t = textes.accueil;
const STEP_BG = ["bg-vert", "bg-rose", "bg-bleu"];

export default function HomePage() {
  const events = getUpcomingEvents();
  const nextEvent = events[0];
  const otherEvents = events.slice(1, 4);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:py-20 md:grid-cols-[1.1fr_1fr]">
        <div>
          <h1>
            <Image src={logo} alt="BOOKÉ·ES — Book club conscient" className="h-auto w-full max-w-md" priority />
          </h1>
          <p className="sous-titre mt-10 max-w-xl">
            <T>{t.intro}</T>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/evenements" className="btn">
              {t.ctaDates}
            </Link>
            <Link href="/a-propos" className="btn-ghost">
              {t.ctaProjet}
            </Link>
          </div>
        </div>

        {nextEvent && (
          <div className={cn("mx-auto w-full max-w-md", nextEvent.demo && "demo")}>
            <p className="etiquette mb-3">{t.prochainRendezVous}</p>
            <Ticket event={nextEvent} />
            <Link href={`/evenements/${nextEvent.slug}`} className="lien mt-4 inline-block text-sm font-semibold">
              {t.voirSeance} →
            </Link>
          </div>
        )}
      </section>

      <section className="border-t border-encre">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="titre-2">{t.filRouge.titre}</h2>
          <ol className="mt-10 grid gap-10 sm:grid-cols-3">
            {t.filRouge.etapes.map((step, i) => (
              <li key={step.titre}>
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full border border-encre font-titre text-2xl",
                    STEP_BG[i]
                  )}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="titre-3 mt-5">{step.titre}</h3>
                <p className="mt-2">
                  <T>{step.texte}</T>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-encre">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="titre-2">{t.formatsTitre}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {textes.formats.map((format) => (
              <div key={format.type} className={cn("fiche flex flex-col", EVENT_TYPE_BG[format.type])}>
                <p className="etiquette border-b border-encre px-5 py-3">{format.rythme}</p>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-titre text-2xl">{format.titre}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem]">
                    <T>{format.texte}</T>
                  </p>
                  {format.type === "communaute" ? (
                    <a href="#rejoindre" className="lien mt-5 text-sm font-semibold">
                      {t.nousRejoindre} →
                    </a>
                  ) : (
                    <Link href={`/evenements?type=${format.type}`} className="lien mt-5 text-sm font-semibold">
                      {t.voirLesDates} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {otherEvents.length > 0 && (
        <section className="border-t border-encre">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="titre-2">{t.prochainesDates}</h2>
              <Link href="/evenements" className="lien text-sm font-semibold">
                {t.toutVoir} →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="rejoindre" className="border-t border-encre bg-rose">
        <div className="mx-auto max-w-xl px-5 py-16 text-center sm:py-20">
          <h2 className="titre-2">{t.rejoindre.titre}</h2>
          <p className="mt-4">
            <T>{t.rejoindre.texte}</T>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {site.whatsappUrl && (
              <a href={site.whatsappUrl} className="btn">
                {t.rejoindre.whatsapp}
              </a>
            )}
            {site.instagramUrl && (
              <a href={site.instagramUrl} className="btn">
                {t.rejoindre.instagram}
              </a>
            )}
            <a href={`mailto:${site.email}`} className="btn-ghost">
              {t.rejoindre.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
