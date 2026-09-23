import Link from "next/link";
import { getUpcomingEvents } from "@/lib/data";
import NextEventHighlight from "@/components/NextEventHighlight";
import EventCard from "@/components/EventCard";
import ScrollReveal from "@/components/ScrollReveal";
import Squiggle from "@/components/Squiggle";
import { site } from "@/content/site";

export default function HomePage() {
  const events = getUpcomingEvents();
  const nextEvent = events[0];
  const otherEvents = events.slice(1, 4);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pt-20">
        <div className="max-w-2xl animate-fadeUp">
          <h1 className="font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl">
            {site.name}
          </h1>
          <p className="relative mt-5 inline-block font-serif text-xl font-semibold text-brick sm:text-2xl">
            Le book club où l&rsquo;on parle du monde.
            <Squiggle className="absolute -bottom-2 left-0 h-2.5 w-full text-brick/60" />
          </p>
          <p className="mt-6 text-lg leading-relaxed text-espresso/80">
            Une communauté pour celles et ceux qui veulent mieux comprendre, discuter et
            agir sur les sujets de société — démocratie, travail, écologie, numérique,
            migrations. Sans slogans, sans y laisser ses amitiés.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/evenements" className="btn-primary">
              Voir les prochaines rencontres
            </Link>
            <Link href="/a-propos" className="btn-secondary">
              Découvrir BOOKÉ·ES
            </Link>
          </div>
        </div>
      </section>

      {nextEvent && (
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <ScrollReveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-espresso/50">
              Prochain rendez-vous
            </p>
            <NextEventHighlight event={nextEvent} />
          </ScrollReveal>
        </section>
      )}

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <h2 className="text-center font-serif text-3xl text-espresso sm:text-4xl">
              BOOKÉ·ES en trois gestes
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { title: "Comprendre", text: "Un livre, un podcast, un documentaire pour poser les bases d'un sujet — sans jargon ni simplification.", emoji: "🔍" },
              { title: "Discuter", text: "Des rencontres pensées pour l'échange réel, avec des personnes qui ne pensent pas comme vous.", emoji: "💬" },
              { title: "Agir", text: "Des initiatives citoyennes portées par la communauté, à rejoindre ou à proposer.", emoji: "🌱" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="text-center">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="mt-3 font-serif text-xl text-espresso">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso/70">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <ScrollReveal>
          <h2 className="font-serif text-3xl text-espresso sm:text-4xl">Nos formats</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { emoji: "📚", title: "Book Clubs", text: "15 à 25 personnes, une fois par mois, dans un café indépendant. Une grande question, un livre ou une ressource pour nourrir l'échange.", href: "/evenements?type=book_club", badge: "bg-pine/10", link: "text-pine" },
            { emoji: "🎙", title: "Rencontres BOOKÉ·ES", text: "40 à 100 personnes, tous les 1,5 à 2 mois. Une question, deux regards complémentaires, un échange avec le public — et un apéro.", href: "/evenements?type=rencontre", badge: "bg-brick/10", link: "text-brick" },
            { emoji: "☕", title: "Communauté", text: "Initiatives, recommandations, projets citoyens portés par les membres. Le versant vivant de BOOKÉ·ES, entre deux rencontres.", href: "#rejoindre", badge: "bg-mustard/15", link: "text-mustard" },
          ].map((format, i) => (
            <ScrollReveal key={format.title} delay={i * 100}>
              <Link href={format.href} className="card group flex h-full flex-col p-7">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-xl transition-transform duration-200 group-hover:rotate-12 ${format.badge}`}
                >
                  {format.emoji}
                </span>
                <h3 className="mt-3 font-serif text-xl text-espresso">{format.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso/70">{format.text}</p>
                <span className={`mt-4 text-sm font-semibold ${format.link}`}>En savoir plus →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {otherEvents.length > 0 && (
        <section className="bg-paper py-20">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex items-baseline justify-between">
              <ScrollReveal>
                <h2 className="font-serif text-3xl text-espresso sm:text-4xl">
                  Quelques prochaines rencontres
                </h2>
              </ScrollReveal>
              <Link href="/evenements" className="hidden text-sm font-semibold text-brick sm:inline">
                Tout voir →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherEvents.map((event, i) => (
                <ScrollReveal key={event.slug} delay={i * 80}>
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="rejoindre" className="border-t border-espresso/10 bg-paper py-20">
        <div className="mx-auto max-w-xl px-5 text-center">
          <h2 className="font-serif text-3xl text-espresso">Rejoindre la communauté</h2>
          <p className="mt-3 text-espresso/70">
            Les dates se donnent ici, la conversation continue dans le groupe.
            Écrivez-nous pour en être.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {site.whatsappUrl && (
              <a href={site.whatsappUrl} className="btn-primary">
                Rejoindre le groupe
              </a>
            )}
            <a href={`mailto:${site.email}`} className="btn-secondary">
              Nous écrire
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
