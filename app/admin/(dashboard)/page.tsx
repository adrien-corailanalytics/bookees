import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getConfirmedCounts } from "@/lib/data";
import { EVENT_TYPE_LABELS } from "@/lib/types";
import type { Event } from "@/lib/types";
import { formatDateShort, formatTime, cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  draft: "Brouillon",
  published: "Publié",
  cancelled: "Annulé",
};

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-espresso/10 text-espresso/70",
  published: "bg-pine/10 text-pine",
  cancelled: "bg-brick/10 text-brick",
};

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

  const typedEvents = (events ?? []) as Event[];
  const counts = await getConfirmedCounts(typedEvents.map((e) => e.id));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-espresso">Événements</h1>
        <Link href="/admin/evenements/nouveau" className="btn-primary">
          + Nouvel événement
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-card bg-cream shadow-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-espresso/10 text-xs uppercase tracking-wide text-espresso/50">
              <th className="px-5 py-3">Titre</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Places</th>
              <th className="px-5 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {typedEvents.map((event) => (
              <tr key={event.id} className="border-b border-espresso/5 last:border-0 hover:bg-paper">
                <td className="px-5 py-4">
                  <Link href={`/admin/evenements/${event.id}`} className="font-medium text-espresso hover:text-brick">
                    {event.title}
                  </Link>
                </td>
                <td className="px-5 py-4 text-espresso/70">{EVENT_TYPE_LABELS[event.type]}</td>
                <td className="px-5 py-4 text-espresso/70">
                  {formatDateShort(event.start_date)} · {formatTime(event.start_date)}
                </td>
                <td className="px-5 py-4 text-espresso/70">
                  {counts[event.id] ?? 0} / {event.capacity}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      STATUS_STYLES[event.status]
                    )}
                  >
                    {STATUS_LABELS[event.status]}
                  </span>
                </td>
              </tr>
            ))}
            {typedEvents.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-espresso/50">
                  Aucun événement pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
