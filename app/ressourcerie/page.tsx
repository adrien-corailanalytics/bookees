import type { Metadata } from "next";
import { getResources } from "@/lib/data";
import ResourceCard from "@/components/ResourceCard";
import type { ResourceType } from "@/lib/types";
import { RESOURCE_TYPE_LABELS, RESOURCE_TYPE_EMOJI } from "@/lib/types";

export const metadata: Metadata = {
  title: "La Ressourcerie",
  description:
    "Tous les livres, podcasts, documentaires et articles cités dans les book clubs BOOKÉ·ES, réunis au même endroit.",
};

const SHELF_ORDER: ResourceType[] = ["book", "podcast", "documentary", "article", "other"];

export default function RessourceriePage() {
  const resources = getResources();

  const shelves = SHELF_ORDER.map((type) => ({
    type,
    items: resources.filter((r) => r.type === type),
  })).filter((shelf) => shelf.items.length > 0);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-5 pt-16">
        <h1 className="font-serif text-4xl text-espresso sm:text-5xl">La Ressourcerie</h1>
        <p className="mt-3 max-w-xl text-espresso/70">
          Tout ce qui a nourri une discussion en book club — livres, podcasts, documentaires,
          articles — réuni au même endroit pour y revenir quand vous voulez.
        </p>
      </div>

      <div className="relative mt-12 overflow-hidden pb-20 pt-4">
        {/* Fond "vieille bibliothèque" : bois chaud + halos façon lumière de bougie. */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 10%, rgba(201,138,43,0.16), transparent 60%)," +
              "radial-gradient(ellipse 50% 35% at 85% 60%, rgba(201,138,43,0.12), transparent 60%)," +
              "linear-gradient(180deg, #2E211A 0%, #241A14 100%)",
          }}
        />

        <div className="mx-auto max-w-6xl space-y-14 px-5">
          {shelves.length === 0 && (
            <p className="rounded-md bg-paper/95 p-8 text-center text-espresso/60">
              La Ressourcerie se remplit au fil des book clubs — revenez bientôt.
            </p>
          )}

          {shelves.map((shelf) => (
            <section key={shelf.type}>
              <div className="mb-5 flex items-center gap-2">
                <span className="text-xl">{RESOURCE_TYPE_EMOJI[shelf.type]}</span>
                <h2 className="font-serif text-2xl text-cream">
                  {RESOURCE_TYPE_LABELS[shelf.type]}s
                </h2>
              </div>

              <div className="flex flex-wrap gap-5">
                {shelf.items.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>

              {/* Tablette de l'étagère */}
              <div
                className="mt-8 h-3 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #6b4a35 0%, #4a2e22 60%, #3a2318 100%)",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
                }}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
