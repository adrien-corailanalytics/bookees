import type { CapacityInfo } from "@/lib/types";

// Barre de remplissage façon "barre de vie" : un clin d'œil ludique aux jeux
// en ligne du début des années 2000, réutilisé pour visualiser les places
// prises sur un événement d'un coup d'œil.
export default function CapacityBar({ capacity }: { capacity: CapacityInfo }) {
  const total = capacity.taken + capacity.remaining;
  const pct = total > 0 ? Math.min(100, Math.round((capacity.taken / total) * 100)) : 0;
  const color = capacity.isFull ? "#B23A26" : capacity.isAlmostFull ? "#C98A2B" : "#1F4B3F";

  return (
    <div>
      <div className="xp-bar" role="img" aria-label={`${capacity.taken} places prises sur ${total}`}>
        <div className="xp-bar-fill" style={{ width: `${pct}%`, "--xp-color": color } as React.CSSProperties} />
      </div>
      <p className="mt-1.5 text-xs font-semibold text-espresso/60">
        {capacity.taken} / {total} places prises
      </p>
    </div>
  );
}
