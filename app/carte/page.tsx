import Image from "next/image";
import type { Metadata } from "next";
import { getVenues } from "@/lib/data";
import MapSection from "@/components/MapSection";
import T from "@/components/T";
import { cn } from "@/lib/utils";
import { textes } from "@/content/textes";

const t = textes.carte;

export const metadata: Metadata = {
  title: t.titre,
  description: t.metaDescription,
};

export default function CartePage() {
  const venues = getVenues();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="titre-1">{t.titre}</h1>
      <p className="sous-titre mt-4 max-w-xl">
        <T>{t.intro}</T>
      </p>

      <div className="mt-10">
        <MapSection venues={venues} />
      </div>

      {venues.length === 0 ? (
        <p className="legende mt-10">{t.vide}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <article key={venue.id} id={venue.id} className={cn("fiche flex flex-col scroll-mt-24", venue.demo && "demo")}>
              {venue.logo_url && (
                <div className="flex h-32 items-center justify-center border-b border-encre bg-white p-4">
                  <Image
                    src={venue.logo_url}
                    alt=""
                    width={1430}
                    height={801}
                    className="h-full w-auto object-contain"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="font-titre text-2xl">{venue.name}</h2>
                <p className="legende mt-1">
                  {venue.address}
                  {venue.city ? `, ${venue.city}` : ""}
                </p>
                {venue.description && (
                  <p className="mt-3 text-sm">
                    <T>{venue.description}</T>
                  </p>
                )}
                {venue.instagram_url && (
                  <a
                    href={venue.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lien mt-3 inline-block text-sm font-semibold"
                  >
                    {t.instagram} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
