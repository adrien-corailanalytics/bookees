import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Découvrir Agorabica",
  description:
    "Agorabica, communauté parisienne pour comprendre, discuter et agir sur les sujets de société — sans y laisser ses amitiés.",
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-4xl text-espresso sm:text-5xl">Découvrir Agorabica</h1>
      <p className="mt-6 font-serif text-xl italic text-brick">
        Des idées, des livres, des gens. Autour d&rsquo;un café.
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-espresso/85">
        <p>
          Agorabica vient de la rencontre entre l&rsquo;<strong>agora</strong>, la place publique
          où l&rsquo;on débat, et l&rsquo;<strong>arabica</strong>, le café qui accompagne les
          conversations qui durent. C&rsquo;est une communauté parisienne pour celles et ceux qui
          veulent mieux comprendre, discuter et agir sur les sujets qui traversent la société —
          démocratie, travail, écologie, numérique, migrations, polarisation.
        </p>
        <p>
          On n&rsquo;est pas là pour vous dire quoi penser, mais pour vous donner envie de
          comprendre davantage — et de discuter avec des personnes qui ne pensent pas exactement
          comme vous, sans que ça tourne au clash.
        </p>
        <p>
          Notre posture : curieuse plutôt que militante, exigeante mais accessible, jamais
          culpabilisatrice. On assume le désaccord ; on ne cherche pas à le faire disparaître.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {[
          { emoji: "📚", title: "Book Clubs", text: "15 à 25 personnes, chaque mois, autour d'un livre ou d'une ressource." },
          { emoji: "🎙", title: "Rencontres", text: "40 à 100 personnes, tous les 1,5 à 2 mois, avec des invités aux regards complémentaires." },
          { emoji: "☕", title: "Communauté", text: "Initiatives, recommandations et projets portés par les membres." },
        ].map((f) => (
          <div key={f.title} className="card p-6">
            <span className="text-2xl">{f.emoji}</span>
            <p className="mt-2 font-serif text-lg text-espresso">{f.title}</p>
            <p className="mt-1 text-sm text-espresso/70">{f.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link href="/evenements" className="btn-primary">
          Voir les prochaines rencontres
        </Link>
        <Link href="/le-comptoir" className="btn-secondary">
          Voir le Comptoir
        </Link>
      </div>
    </div>
  );
}
