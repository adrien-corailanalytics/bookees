import { cn } from "@/lib/utils";

// Accent graphique "fait main" pour souligner un mot-clé sans recourir au
// réflexe italique — plus ludique, plus proche d'un carnet de café que d'un
// gabarit générique.
export default function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={cn("h-[0.4em] w-full", className)}
      aria-hidden="true"
    >
      <path
        d="M2 8C20 2 35 2 50 7C65 12 80 12 98 6C116 0 132 1 148 7C164 13 180 11 198 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
