"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Venue } from "@/lib/types";
import { textes } from "@/content/textes";
import T from "./T";

// Le monogramme BK en pin, à la place de l'icône Leaflet par défaut (dont les
// images ne se résolvent pas avec le bundler de Next.js).
const pinIcon = L.icon({
  iconUrl: "/brand/bk-vert.svg",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -18],
});

export default function VenueMap({ venues }: { venues: Venue[] }) {
  const positions = venues.map((v) => [v.lat, v.lng] as [number, number]);
  const view =
    positions.length > 1
      ? { bounds: positions, boundsOptions: { padding: [48, 48] as [number, number] } }
      : { center: positions[0] ?? ([46.6, 2.3] as [number, number]), zoom: positions.length ? 15 : 5 };

  return (
    <MapContainer {...view} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {venues.map((venue) => (
        <Marker key={venue.id} position={[venue.lat, venue.lng]} icon={pinIcon}>
          <Popup>
            <div className="min-w-[180px] text-encre">
              <p className="!m-0 font-titre text-lg">{venue.name}</p>
              <p className="!mb-1.5 !mt-0.5 text-xs text-gris">
                {venue.address}
                {venue.city ? `, ${venue.city}` : ""}
              </p>
              {venue.demo && <p className="!my-1 text-xs font-semibold uppercase text-brouillon">fictif</p>}
              {venue.description && (
                <p className="!my-0 !mb-1.5 text-[0.82rem] leading-snug">
                  <T>{venue.description}</T>
                </p>
              )}
              {venue.instagram_url && (
                <a
                  href={venue.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold !text-encre underline"
                >
                  {textes.carte.instagram} →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
