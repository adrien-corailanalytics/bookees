import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Ce site ne collecte aucune donnée personnelle : ni compte, ni formulaire, ni traceur.",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-4xl text-espresso">Confidentialité</h1>
      <p className="mt-3 text-sm text-espresso/60">Dernière mise à jour : septembre 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-espresso/85">
        <section>
          <h2 className="font-serif text-xl text-espresso">Ce site ne collecte rien</h2>
          <p className="mt-2">
            Il n&rsquo;y a ni compte, ni formulaire d&rsquo;inscription, ni newsletter, ni base
            de données de membres. Aucun cookie n&rsquo;est déposé, aucun traceur publicitaire
            ni outil de mesure d&rsquo;audience n&rsquo;est installé. Vous pouvez lire
            l&rsquo;intégralité du site sans laisser la moindre trace chez nous.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso">Les services tiers</h2>
          <p className="mt-2">
            Le site est hébergé par Vercel, dont les serveurs conservent des journaux techniques
            (adresse IP, date, page demandée) pour assurer le fonctionnement du service. La carte
            des lieux affiche des fonds de plan servis par OpenStreetMap, qui reçoit donc votre
            adresse IP lorsque vous ouvrez la page Carte. Si un jour une billetterie externe est
            utilisée pour réserver une place, elle appliquera sa propre politique de
            confidentialité, indiquée sur son site.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso">Nous écrire</h2>
          <p className="mt-2">
            Pour toute question, écrivez à{" "}
            <a href={`mailto:${site.email}`} className="text-brick hover:text-bordeaux">
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
