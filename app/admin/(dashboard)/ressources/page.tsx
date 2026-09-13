import { createClient } from "@/lib/supabase/server";
import { createResource, deleteResource } from "@/app/admin/actions";
import SubmitButton from "@/components/admin/SubmitButton";
import { RESOURCE_TYPE_LABELS } from "@/lib/types";
import type { Resource, Event, ResourceType } from "@/lib/types";

export default async function AdminResourcesPage() {
  const supabase = await createClient();

  const [{ data: resources }, { data: events }] = await Promise.all([
    supabase.from("resources").select("*, events(title, slug)").order("created_at", { ascending: false }),
    supabase.from("events").select("id, title").order("start_date", { ascending: false }),
  ]);

  const typedResources = (resources ?? []) as Resource[];
  const typedEvents = (events ?? []) as Pick<Event, "id" | "title">[];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-serif text-3xl text-espresso">La Ressourcerie</h1>
      <p className="mt-2 text-sm text-espresso/60">
        Le catalogue affiché sur la page publique &laquo;&nbsp;Ressourcerie&nbsp;&raquo;.
      </p>

      <div className="mt-8 space-y-3">
        {typedResources.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-lg bg-cream p-4 shadow-card">
            <div>
              <p className="font-medium text-espresso">
                {r.title} <span className="text-xs font-normal text-espresso/50">— {RESOURCE_TYPE_LABELS[r.type]}</span>
              </p>
              {r.author && <p className="text-sm text-espresso/60">{r.author}</p>}
              {r.events && <p className="text-xs text-pine">Lié à : {r.events.title}</p>}
            </div>
            <form action={deleteResource.bind(null, r.id)}>
              <button type="submit" className="text-sm text-brick hover:text-bordeaux">
                Retirer
              </button>
            </form>
          </div>
        ))}
        {typedResources.length === 0 && (
          <p className="text-sm text-espresso/50">Aucune ressource pour le moment.</p>
        )}
      </div>

      <form action={createResource} className="mt-8 grid gap-3 rounded-card bg-cream p-6 shadow-card sm:grid-cols-2">
        <input
          name="title"
          required
          placeholder="Titre"
          className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm sm:col-span-2"
        />
        <select name="type" className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm">
          {(Object.keys(RESOURCE_TYPE_LABELS) as ResourceType[]).map((t) => (
            <option key={t} value={t}>
              {RESOURCE_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <input
          name="author"
          placeholder="Auteur·ice (optionnel)"
          className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm"
        />
        <textarea
          name="description"
          placeholder="Description courte"
          rows={2}
          className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm sm:col-span-2"
        />
        <input
          name="url"
          type="url"
          placeholder="Lien (optionnel)"
          className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm"
        />
        <select name="event_id" className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm">
          <option value="">Événement lié (optionnel)</option>
          {typedEvents.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </select>
        <div className="sm:col-span-2">
          <SubmitButton label="Ajouter la ressource" pendingLabel="Ajout…" />
        </div>
      </form>
    </div>
  );
}
