"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Venue } from "@/lib/types";

// Icône de pin "fait main" plutôt que l'icône par défaut de Leaflet (dont les
// fichiers image ne se résolvent pas correctement avec le bundler de Next.js
// — un problème classique de react-leaflet). divIcon nous permet en plus de
// reprendre directement les couleurs de la marque façon Mapstr.
const pinIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:30px;height:30px;border-radius:50% 50% 50% 0;
      background:#B23A26;border:2px solid #2E211A;
      transform:rotate(-45deg);
      box-shadow:2px 2px 0 rgba(46,33,26,0.3);
      display:flex;align-items:center;justify-content:center;
    ">
      <span style="transform:rotate(45deg);font-size:14px;">☕</span>
    </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

export default function VenueMap({ venues }: { venues: Venue[] }) {
  const located = venues.filter((v) => v.lat != null && v.lng != null);
  const center: [number, number] =
    located.length > 0
      ? [
          located.reduce((s, v) => s + (v.lat ?? 0), 0) / located.length,
          located.reduce((s, v) => s + (v.lng ?? 0), 0) / located.length,
        ]
      : [46.6, 2.3]; // Centre approximatif de la France, si aucun lieu géolocalisé.

  return (
    <MapContainer
      center={center}
      zoom={located.length > 1 ? 5 : 12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {located.map((venue) => (
        <Marker key={venue.id} position={[venue.lat as number, venue.lng as number]} icon={pinIcon}>
          <Popup>
            <div style={{ fontFamily: "Inter, sans-serif", minWidth: 180 }}>
              <p style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "1rem", margin: 0 }}>
                {venue.name}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#6b5c4d", margin: "2px 0 6px" }}>
                {venue.address}
                {venue.city ? `, ${venue.city}` : ""}
              </p>
              {venue.description && (
                <p style={{ fontSize: "0.82rem", lineHeight: 1.4, margin: "0 0 6px" }}>
                  {venue.description}
                </p>
              )}
              {venue.instagram_url && (
                <a
                  href={venue.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.8rem", fontWeight: 600, color: "#B23A26" }}
                >
                  Voir le lieu sur Instagram →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
