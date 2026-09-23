import type { Metadata } from "next";
import Link from "next/link";
import { EVENT_TYPE_BG } from "@/lib/types";
import { cn } from "@/lib/utils";
import T from "@/components/T";
import { textes } from "@/content/textes";

const t = textes.projet;

export const metadata: Metadata = {
  title: t.titre,
  description: t.metaDescription,
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="titre-1">{t.titre}</h1>
      <p className="sous-titre mt-4">{t.chapeau}</p>

      <div className="mt-10 space-y-6">
        {t.paragraphes.map((paragraph) => (
          <p key={paragraph}>
            <T>{paragraph}</T>
          </p>
        ))}
      </div>

      <h2 className="titre-2 mt-16">{t.formatsTitre}</h2>
      <div className="mt-8 divide-y divide-encre border-y border-encre">
        {textes.formats.map((format) => (
          <div key={format.type} className="grid gap-3 py-6 sm:grid-cols-[12rem_1fr]">
            <div>
              <span className={cn("tag", EVENT_TYPE_BG[format.type])}>{format.rythme}</span>
              <p className="mt-3 font-titre text-2xl">{format.titre}</p>
            </div>
            <p>
              <T>{format.texte}</T>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/evenements" className="btn">
          {t.cta}
        </Link>
      </div>
    </div>
  );
}
