"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/lib/types";

// Leaflet touche `window` au chargement : le composant carte doit être
// exclu du rendu serveur (ssr:false n'est autorisé que depuis un composant
// client, d'où cet intermédiaire).
const VenueMap = dynamic(() => import("./VenueMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-espresso/50">
      Chargement de la carte…
    </div>
  ),
});

export default function MapSection({ venues }: { venues: Venue[] }) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-card border-2 border-espresso shadow-card sm:h-[520px]">
      <VenueMap venues={venues} />
    </div>
  );
}
