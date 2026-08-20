import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Event, Registration } from "@/lib/types";
import { formatDateLong, formatTimeRange } from "@/lib/utils";
import CancelButton from "@/components/CancelButton";

export const metadata = { title: "Annuler mon inscription" };

export default async function CancelPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("registrations")
    .select("*, events(*)")
    .eq("cancellation_token", token)
    .maybeSingle();

  if (!data) notFound();

  const registration = data as Registration & { events: Event };
  const event = registration.events;

  return (
    <div className="mx-auto max-w-lg px-5 py-20">
      <h1 className="font-serif text-3xl text-espresso">Annuler mon inscription</h1>

      {registration.status === "cancelled" ? (
        <p className="mt-6 text-espresso/70">Cette inscription a déjà été annulée.</p>
      ) : (
        <>
          <div className="card mt-6 p-6">
            <p className="font-serif text-lg text-espresso">{event.title}</p>
            <p className="mt-1 text-sm text-espresso/70">{formatDateLong(event.start_date)}</p>
            <p className="text-sm text-espresso/70">
              {formatTimeRange(event.start_date, event.end_date)}
            </p>
            <p className="mt-3 text-sm text-espresso/60">
              Inscrit·e en tant que {registration.first_name} {registration.last_name} (
              {registration.email})
            </p>
          </div>
          <p className="mt-6 text-sm text-espresso/70">
            Si une place se libère, elle sera automatiquement proposée à la première personne
            de la liste d&rsquo;attente.
          </p>
          <div className="mt-6">
            <CancelButton token={token} />
          </div>
        </>
      )}
    </div>
  );
}
