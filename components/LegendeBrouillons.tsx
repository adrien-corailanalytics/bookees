"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Pastille en bas de page : combien de contenus provisoires sur la page, et un
// bouton pour masquer le surlignage le temps de juger le design. Disparaît
// d'elle-même quand il n'y a plus rien à choisir.
export default function LegendeBrouillons() {
  const pathname = usePathname();
  const [total, setTotal] = useState(0);
  const [masque, setMasque] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setTotal(document.querySelectorAll(".brouillon, .demo").length)
    );
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("sans-brouillon", masque);
  }, [masque]);

  if (total === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-full border border-brouillon bg-white py-1.5 pl-4 pr-1.5 text-xs shadow-sm">
      <span>
        <span className="font-semibold text-brouillon">{total}</span> contenu
        {total > 1 ? "s" : ""} provisoire{total > 1 ? "s" : ""}
      </span>
      <button
        type="button"
        onClick={() => setMasque((v) => !v)}
        aria-pressed={masque}
        className="rounded-full bg-brouillon px-3 py-1 font-semibold text-white"
      >
        {masque ? "Montrer" : "Masquer"}
      </button>
    </div>
  );
}
