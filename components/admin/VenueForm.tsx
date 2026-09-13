"use client";

import { useState } from "react";
import SubmitButton from "./SubmitButton";

export default function VenueForm({
  action,
  events,
}: {
  action: (formData: FormData) => void;
  events: { id: string; title: string }[];
}) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState("");

  async function handleGeocode() {
    if (!address.trim()) {
      setGeocodeError("Renseignez d'abord une adresse.");
      return;
    }
    setGeocoding(true);
    setGeocodeError("");
    try {
      const query = [address, city].filter(Boolean).join(", ");
      const res = await fetch(`/api/admin/geocode?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) {
        setGeocodeError("Lieu introuvable, entrez les coordonnées manuellement.");
        return;
      }
      setLat(String(data.lat));
      setLng(String(data.lng));
    } catch {
      setGeocodeError("Une erreur est survenue.");
    } finally {
      setGeocoding(false);
    }
  }

  return (
    <form action={action} className="mt-8 grid gap-3 rounded-card bg-cream p-6 shadow-card sm:grid-cols-2">
      <input
        name="name"
        required
        placeholder="Nom du lieu"
        className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm sm:col-span-2"
      />
      <input
        name="address"
        required
        placeholder="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm"
      />
      <input
        name="city"
        placeholder="Ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm"
      />
      <textarea
        name="description"
        placeholder="Description / ambiance du lieu"
        rows={2}
        className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm sm:col-span-2"
      />
      <select name="event_id" className="rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm sm:col-span-2">
        <option value="">Événement représentatif (optionnel)</option>
        {events.map((e) => (
          <option key={e.id} value={e.id}>
            {e.title}
          </option>
        ))}
      </select>

      <div className="flex items-end gap-2 sm:col-span-2">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-espresso/60">Latitude</label>
          <input
            name="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="45.7640"
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs text-espresso/60">Longitude</label>
          <input
            name="lng"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="4.8357"
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleGeocode}
          disabled={geocoding}
          className="btn-secondary !px-4 !py-2.5 text-sm"
        >
          {geocoding ? "…" : "Géocoder"}
        </button>
      </div>
      {geocodeError && <p className="text-xs text-brick sm:col-span-2">{geocodeError}</p>}

      <div className="sm:col-span-2">
        <SubmitButton label="Ajouter le lieu" pendingLabel="Ajout…" />
      </div>
    </form>
  );
}
