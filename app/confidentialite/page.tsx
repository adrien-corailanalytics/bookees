import type { Metadata } from "next";
import T from "@/components/T";
import { site } from "@/content/site";
import { textes } from "@/content/textes";

const t = textes.confidentialite;

export const metadata: Metadata = {
  title: t.titre,
  description: t.metaDescription,
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="titre-1">{t.titre}</h1>
      <p className="legende mt-3">{t.miseAJour}</p>

      <div className="mt-10 space-y-10">
        {t.sections.map((section) => (
          <section key={section.titre}>
            <h2 className="titre-3">
              <T>{section.titre}</T>
            </h2>
            <p className="mt-3">
              <T>{section.texte}</T>
            </p>
          </section>
        ))}
        <section>
          <h2 className="titre-3">{t.ecrireTitre}</h2>
          <p className="mt-3">
            {t.ecrire}{" "}
            <a href={`mailto:${site.email}`} className="lien">
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
