"use client";

import type { Event } from "@/lib/types";
import SubmitButton from "./SubmitButton";

function toDatetimeLocal(naive?: string): string {
  if (!naive) return "";
  return naive.replace(" ", "T").slice(0, 16);
}

export default function EventForm({
  action,
  event,
}: {
  action: (formData: FormData) => void;
  event?: Event;
}) {
  return (
    <form action={action} className="space-y-6 rounded-card bg-cream p-6 shadow-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-espresso">
            Titre
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={event?.title}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-medium text-espresso">
            Slug URL <span className="font-normal text-espresso/50">(optionnel, généré depuis le titre sinon)</span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={event?.slug}
            placeholder="peut-on-encore-debattre"
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium text-espresso">
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={event?.type ?? "book_club"}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          >
            <option value="book_club">📚 Book Club</option>
            <option value="rencontre">🎙 Rencontre</option>
            <option value="communaute">☕ Communauté</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="question" className="mb-1 block text-sm font-medium text-espresso">
            Grande question <span className="font-normal text-espresso/50">(optionnel)</span>
          </label>
          <input
            id="question"
            name="question"
            defaultValue={event?.question ?? ""}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-espresso">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            required
            defaultValue={event?.description}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="start_date" className="mb-1 block text-sm font-medium text-espresso">
            Début (heure de Paris)
          </label>
          <input
            id="start_date"
            name="start_date"
            type="datetime-local"
            required
            defaultValue={toDatetimeLocal(event?.start_date)}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="end_date" className="mb-1 block text-sm font-medium text-espresso">
            Fin (heure de Paris)
          </label>
          <input
            id="end_date"
            name="end_date"
            type="datetime-local"
            required
            defaultValue={toDatetimeLocal(event?.end_date)}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="venue_name" className="mb-1 block text-sm font-medium text-espresso">
            Lieu
          </label>
          <input
            id="venue_name"
            name="venue_name"
            required
            defaultValue={event?.venue_name}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="address" className="mb-1 block text-sm font-medium text-espresso">
            Adresse
          </label>
          <input
            id="address"
            name="address"
            required
            defaultValue={event?.address}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="capacity" className="mb-1 block text-sm font-medium text-espresso">
            Capacité
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min={1}
            required
            defaultValue={event?.capacity ?? 20}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-espresso">
            Statut
          </label>
          <select
            id="status"
            name="status"
            defaultValue={event?.status ?? "draft"}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            id="registration_open"
            name="registration_open"
            type="checkbox"
            defaultChecked={event?.registration_open ?? true}
          />
          <label htmlFor="registration_open" className="text-sm text-espresso">
            Inscriptions ouvertes
          </label>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="resource_title" className="mb-1 block text-sm font-medium text-espresso">
            Ressource associée (livre, podcast…) <span className="font-normal text-espresso/50">(optionnel)</span>
          </label>
          <input
            id="resource_title"
            name="resource_title"
            defaultValue={event?.resource_title ?? ""}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="resource_url" className="mb-1 block text-sm font-medium text-espresso">
            Lien de la ressource <span className="font-normal text-espresso/50">(optionnel)</span>
          </label>
          <input
            id="resource_url"
            name="resource_url"
            type="url"
            defaultValue={event?.resource_url ?? ""}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="conditions" className="mb-1 block text-sm font-medium text-espresso">
            Conditions <span className="font-normal text-espresso/50">(optionnel)</span>
          </label>
          <input
            id="conditions"
            name="conditions"
            defaultValue={event?.conditions ?? ""}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cover_image" className="mb-1 block text-sm font-medium text-espresso">
            Image de couverture (URL) <span className="font-normal text-espresso/50">(optionnel)</span>
          </label>
          <input
            id="cover_image"
            name="cover_image"
            type="url"
            defaultValue={event?.cover_image ?? ""}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
      </div>

      <SubmitButton
        label={event ? "Enregistrer les modifications" : "Créer l'événement"}
        pendingLabel="Enregistrement…"
      />
    </form>
  );
}
