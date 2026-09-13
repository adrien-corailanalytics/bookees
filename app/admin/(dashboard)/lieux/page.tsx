import { createClient } from "@/lib/supabase/server";
import { createVenue, deleteVenue } from "@/app/admin/actions";
import VenueForm from "@/components/admin/VenueForm";
import type { Venue, Event } from "@/lib/types";

export default async function AdminVenuesPage() {
  const supabase = await createClient();

  const [{ data: venues }, { data: events }] = await Promise.all([
    supabase.from("venues").select("*, events(title, slug)").order("created_at", { ascending: true }),
    supabase.from("events").select("id, title").order("start_date", { ascending: false }),
  ]);

  const typedVenues = (venues ?? []) as Venue[];
  const typedEvents = (events ?? []) as Pick<Event, "id" | "title">[];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-serif text-3xl text-espresso">La Carte</h1>
      <p className="mt-2 text-sm text-espresso/60">
        Les lieux affichés sur la carte publique. Le géocodage résout une adresse en
        coordonnées automatiquement (via OpenStreetMap, gratuit).
      </p>

      <div className="mt-8 space-y-3">
        {typedVenues.map((v) => (
          <div key={v.id} className="flex items-center justify-between rounded-lg bg-cream p-4 shadow-card">
            <div>
              <p className="font-medium text-espresso">{v.name}</p>
              <p className="text-sm text-espresso/60">
                {v.address}
                {v.city ? `, ${v.city}` : ""}
              </p>
              <p className="text-xs text-espresso/40">
                {v.lat != null && v.lng != null ? `${v.lat}, ${v.lng}` : "Non géolocalisé"}
              </p>
            </div>
            <form action={deleteVenue.bind(null, v.id)}>
              <button type="submit" className="text-sm text-brick hover:text-bordeaux">
                Retirer
              </button>
            </form>
          </div>
        ))}
        {typedVenues.length === 0 && (
          <p className="text-sm text-espresso/50">Aucun lieu pour le moment.</p>
        )}
      </div>

      <VenueForm action={createVenue} events={typedEvents} />
    </div>
  );
}
