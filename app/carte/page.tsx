import type { Metadata } from "next";
import Link from "next/link";
import { getVenues } from "@/lib/data";
import MapSection from "@/components/MapSection";

export const metadata: Metadata = {
  title: "La Carte",
  description: "Les lieux où se tiennent les rencontres Agorabica — cafés, tiers-lieux et friches culturelles.",
};

export default async function CartePage() {
  const venues = await getVenues().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-serif text-4xl text-espresso sm:text-5xl">La Carte</h1>
      <p className="mt-3 max-w-xl text-espresso/70">
        Les lieux qui accueillent les rencontres Agorabica — repérés par la communauté, un par
        un.
      </p>

      <div className="mt-10">
        <MapSection venues={venues} />
      </div>

      {venues.length === 0 ? (
        <p className="mt-10 text-espresso/60">Aucun lieu répertorié pour le moment.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <div key={venue.id} className="card p-6">
              <h3 className="font-serif text-lg text-espresso">{venue.name}</h3>
              <p className="mt-1 text-sm text-espresso/60">
                {venue.address}
                {venue.city ? `, ${venue.city}` : ""}
              </p>
              {venue.description && (
                <p className="mt-3 text-sm leading-relaxed text-espresso/75">
                  {venue.description}
                </p>
              )}
              {venue.events && (
                <Link
                  href={`/evenements/${venue.events.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-brick hover:text-bordeaux"
                >
                  Voir la rencontre →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
