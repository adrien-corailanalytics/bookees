"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/lib/types";
import { textes } from "@/content/textes";

// Leaflet touche `window` au chargement : le composant carte doit être
// exclu du rendu serveur (ssr:false n'est autorisé que depuis un composant
// client, d'où cet intermédiaire).
const VenueMap = dynamic(() => import("./VenueMap"), {
  ssr: false,
  loading: () => (
    <div className="legende flex h-full items-center justify-center">{textes.carte.chargement}</div>
  ),
});

export default function MapSection({ venues }: { venues: Venue[] }) {
  // `isolate` : les calques Leaflet (z-index 400 à 1000) restent sous l'en-tête collant.
  return (
    <div className="carte fiche isolate h-[420px] w-full sm:h-[520px]">
      <VenueMap venues={venues} />
    </div>
  );
}
