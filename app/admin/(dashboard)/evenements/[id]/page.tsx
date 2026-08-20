import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Event, Registration, Speaker } from "@/lib/types";
import EventForm from "@/components/admin/EventForm";
import SubmitButton from "@/components/admin/SubmitButton";
import {
  updateEvent,
  addSpeaker,
  deleteSpeaker,
  cancelRegistrationAdmin,
  createPoll,
  togglePollPhase,
} from "@/app/admin/actions";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*, speakers(*)")
    .eq("id", id)
    .maybeSingle();

  if (!event) notFound();
  const typedEvent = event as Event;

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", id)
    .order("created_at", { ascending: true });

  const typedRegistrations = (registrations ?? []) as Registration[];
  const confirmed = typedRegistrations.filter((r) => r.status === "confirmed");
  const waitlist = typedRegistrations.filter((r) => r.status === "waitlist");
  const cancelled = typedRegistrations.filter((r) => r.status === "cancelled");

  const { data: poll } = await supabase
    .from("polls")
    .select("*")
    .eq("event_id", id)
    .maybeSingle();

  const boundUpdate = updateEvent.bind(null, id);
  const boundAddSpeaker = addSpeaker.bind(null, id);
  const boundCreatePoll = createPoll.bind(null, id);

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <div>
        <h1 className="font-serif text-3xl text-espresso">{typedEvent.title}</h1>
        <p className="mt-1 text-sm text-espresso/60">/evenements/{typedEvent.slug}</p>
      </div>

      <EventForm action={boundUpdate} event={typedEvent} />

      <section>
        <h2 className="font-serif text-2xl text-espresso">Intervenant·es</h2>
        <div className="mt-4 space-y-3">
          {(typedEvent.speakers ?? []).map((speaker: Speaker) => (
            <div key={speaker.id} className="flex items-center justify-between rounded-lg bg-cream p-4 shadow-card">
              <div>
                <p className="font-medium text-espresso">{speaker.name}</p>
                {speaker.role && <p className="text-sm text-espresso/60">{speaker.role}</p>}
              </div>
              <form action={deleteSpeaker.bind(null, speaker.id, id)}>
                <button type="submit" className="text-sm text-brick hover:text-bordeaux">
                  Retirer
                </button>
              </form>
            </div>
          ))}
        </div>

        <form action={boundAddSpeaker} className="mt-4 grid gap-3 rounded-card bg-cream p-6 shadow-card sm:grid-cols-2">
          <input name="name" required placeholder="Nom" className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm" />
          <input name="role" placeholder="Rôle" className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm" />
          <textarea name="bio" placeholder="Bio" rows={2} className="sm:col-span-2 rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm" />
          <div className="sm:col-span-2">
            <SubmitButton label="Ajouter l'intervenant·e" pendingLabel="Ajout…" />
          </div>
        </form>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-espresso">
            Inscriptions ({confirmed.length}/{typedEvent.capacity})
          </h2>
          <a
            href={`/api/admin/events/${id}/export`}
            className="btn-secondary !px-4 !py-2 text-sm"
          >
            Exporter en CSV
          </a>
        </div>

        <RegistrationTable title="Confirmées" registrations={confirmed} eventId={id} />
        <RegistrationTable title="Liste d'attente" registrations={waitlist} eventId={id} />
        {cancelled.length > 0 && (
          <RegistrationTable title="Annulées" registrations={cancelled} eventId={id} readOnly />
        )}
      </section>

      <section>
        <h2 className="font-serif text-2xl text-espresso">Sondage &laquo;&nbsp;Avant / Après&nbsp;&raquo;</h2>
        {poll ? (
          <div className="mt-4 rounded-card bg-cream p-6 shadow-card">
            <p className="font-medium text-espresso">{poll.question}</p>
            <p className="mt-1 text-sm text-espresso/60">
              Phase actuelle : <strong>{poll.current_phase === "before" ? "Avant" : "Après"}</strong>
            </p>
            <div className="mt-4 flex gap-3">
              <form action={togglePollPhase.bind(null, poll.id, id, "before")}>
                <button type="submit" className="btn-secondary !px-4 !py-2 text-sm" disabled={poll.current_phase === "before"}>
                  Ouvrir la phase &laquo;&nbsp;Avant&nbsp;&raquo;
                </button>
              </form>
              <form action={togglePollPhase.bind(null, poll.id, id, "after")}>
                <button type="submit" className="btn-secondary !px-4 !py-2 text-sm" disabled={poll.current_phase === "after"}>
                  Ouvrir la phase &laquo;&nbsp;Après&nbsp;&raquo;
                </button>
              </form>
            </div>
          </div>
        ) : (
          <form action={boundCreatePoll} className="mt-4 flex gap-3 rounded-card bg-cream p-6 shadow-card">
            <input
              name="question"
              required
              placeholder="Les réseaux sociaux font-ils plus de mal que de bien à la démocratie ?"
              className="flex-1 rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm"
            />
            <SubmitButton label="Créer le sondage" pendingLabel="Création…" />
          </form>
        )}
      </section>
    </div>
  );
}

function RegistrationTable({
  title,
  registrations,
  eventId,
  readOnly,
}: {
  title: string;
  registrations: Registration[];
  eventId: string;
  readOnly?: boolean;
}) {
  if (registrations.length === 0) {
    return (
      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-espresso/50">{title}</h3>
        <p className="mt-2 text-sm text-espresso/50">Personne pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-espresso/50">{title}</h3>
      <div className="mt-2 overflow-hidden rounded-card bg-cream shadow-card">
        <table className="w-full text-left text-sm">
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id} className="border-b border-espresso/5 last:border-0">
                <td className="px-4 py-3">
                  {r.first_name} {r.last_name}
                </td>
                <td className="px-4 py-3 text-espresso/60">{r.email}</td>
                <td className="px-4 py-3 text-espresso/60">{r.first_time ? "1re fois" : ""}</td>
                {!readOnly && (
                  <td className="px-4 py-3 text-right">
                    <form action={cancelRegistrationAdmin.bind(null, r.id, eventId)}>
                      <button type="submit" className="text-xs text-brick hover:text-bordeaux">
                        Annuler
                      </button>
                    </form>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
