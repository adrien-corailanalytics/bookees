import type { Metadata } from "next";
import { getResources } from "@/lib/data";
import ResourceCard from "@/components/ResourceCard";
import T from "@/components/T";
import type { ResourceType } from "@/lib/types";
import { textes } from "@/content/textes";

const t = textes.ressourcerie;

export const metadata: Metadata = {
  title: t.titre,
  description: t.metaDescription,
};

const SHELF_ORDER: ResourceType[] = ["book", "podcast", "documentary", "article", "other"];

// ponytail: fiches rangées par rayon. La version immersive (porte, meuble,
// emprunt — docs/design.md) reste à construire ; cette grille restera sa vue liste.
export default function RessourceriePage() {
  const resources = getResources();
  const shelves = SHELF_ORDER.map((type) => ({
    type,
    items: resources.filter((r) => r.type === type),
  })).filter((shelf) => shelf.items.length > 0);
  // Numéros de fiche dans l'ordre d'affichage, rayon après rayon.
  const order = shelves.flatMap((shelf) => shelf.items.map((r) => r.id));
  const number = (id: string) => order.indexOf(id) + 1;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="titre-1">{t.titre}</h1>
      <p className="sous-titre mt-4 max-w-2xl">
        <T>{t.intro}</T>
      </p>

      {shelves.length === 0 && (
        <p className="legende mt-16">
          <T>{t.vide}</T>
        </p>
      )}

      <div className="mt-14 space-y-16">
        {shelves.map((shelf) => (
          <section key={shelf.type} aria-labelledby={`rayon-${shelf.type}`}>
            <div className="flex items-baseline justify-between border-b-[3px] border-double border-encre pb-3">
              <h2 id={`rayon-${shelf.type}`} className="titre-2">
                {textes.types.ressource[shelf.type].plusieurs}
              </h2>
              <span className="etiquette">{shelf.items.length}</span>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shelf.items.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} number={number(resource.id)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
