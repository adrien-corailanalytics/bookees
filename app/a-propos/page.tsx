import type { Metadata } from "next";
import Link from "next/link";
import Squiggle from "@/components/Squiggle";

export const metadata: Metadata = {
  title: "Découvrir BOOKÉ·ES",
  description:
    "BOOKÉ·ES, communauté pour comprendre, discuter et agir sur les sujets de société — sans y laisser ses amitiés.",
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-4xl text-espresso sm:text-5xl">Découvrir BOOKÉ·ES</h1>
      <p className="relative mt-6 inline-block font-serif text-xl font-semibold text-brick">
        Des idées, des livres, des gens. Autour d&rsquo;un café.
        <Squiggle className="absolute -bottom-1.5 left-0 h-2 w-full text-brick/60" />
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-espresso/85">
        <p>
          BOOKÉ·ES vient de la rencontre entre l&rsquo;<strong>agora</strong>, la place publique
          où l&rsquo;on débat, et l&rsquo;<strong>arabica</strong>, le café qui accompagne les
          conversations qui durent. C&rsquo;est une communauté pour celles et ceux qui veulent
          mieux comprendre, discuter et agir sur les sujets qui traversent la société —
          démocratie, travail, écologie, numérique, migrations, polarisation.
        </p>
        <p>
          L&rsquo;objectif : donner envie de creuser un sujet, puis d&rsquo;en discuter avec des
          gens qui ne pensent pas comme vous, sans que la soirée tourne au clash.
        </p>
        <p>
          Notre posture : curieuse, exigeante, accessible, jamais culpabilisatrice. On assume le
          désaccord — c&rsquo;est même tout le principe.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {[
          { emoji: "📚", title: "Book Clubs", text: "15 à 25 personnes, chaque mois, autour d'un livre ou d'une ressource.", badge: "bg-pine/10" },
          { emoji: "🎙", title: "Rencontres", text: "40 à 100 personnes, tous les 1,5 à 2 mois, avec des invités aux regards complémentaires.", badge: "bg-brick/10" },
          { emoji: "☕", title: "Communauté", text: "Initiatives, recommandations et projets portés par les membres.", badge: "bg-mustard/15" },
        ].map((f) => (
          <div key={f.title} className="card group p-6">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full text-xl transition-transform duration-200 group-hover:rotate-12 ${f.badge}`}
            >
              {f.emoji}
            </span>
            <p className="mt-3 font-serif text-lg text-espresso">{f.title}</p>
            <p className="mt-1 text-sm text-espresso/70">{f.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link href="/evenements" className="btn-primary">
          Voir les prochaines rencontres
        </Link>
      </div>
    </div>
  );
}
