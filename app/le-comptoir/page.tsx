import type { Metadata } from "next";
import { questions, facts, initiatives } from "@/lib/comptoirContent";

export const metadata: Metadata = {
  title: "Le Comptoir",
  description:
    "La question du comptoir, ce que vous ne saviez peut-être pas, et les initiatives portées par la communauté BOOKÉ·ES.",
};

export default function ComptoirPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-serif text-4xl text-espresso sm:text-5xl">Le Comptoir</h1>
      <p className="mt-3 max-w-xl text-espresso/70">
        Le versant vivant de BOOKÉ·ES, entre deux rencontres : des questions à débattre,
        des choses à savoir, des initiatives à rejoindre.
      </p>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-espresso">☕ La question du comptoir</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {questions.map((q) => (
            <div key={q.id} className="card p-6">
              <p className="font-serif text-lg leading-snug text-espresso">{q.question}</p>
              {q.ctaUrl && (
                <a
                  href={q.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-brick hover:text-bordeaux"
                >
                  {q.ctaLabel} →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-espresso">🔎 Vous le saviez ?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.id} className="card p-6">
              <p className="font-serif text-lg text-espresso">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-espresso/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-espresso">🌱 À vous de jouer</h2>
        <div className="mt-6 space-y-4">
          {initiatives.map((i) => (
            <div key={i.id} className="card flex flex-col gap-1 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-lg text-espresso">{i.title}</p>
                <p className="text-xs uppercase tracking-wide text-espresso/50">{i.author}</p>
                <p className="mt-2 text-sm leading-relaxed text-espresso/70">{i.description}</p>
              </div>
              {i.ctaUrl && (
                <a
                  href={i.ctaUrl}
                  className="btn-secondary mt-3 shrink-0 !px-4 !py-2 text-sm sm:mt-0"
                >
                  {i.ctaLabel}
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-espresso/60">
          Une initiative à proposer ?{" "}
          <a href="mailto:bonjour@bookees.fr" className="text-brick hover:text-bordeaux">
            Écrivez-nous
          </a>
          .
        </p>
      </section>
    </div>
  );
}
