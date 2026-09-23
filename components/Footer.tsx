import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-serif text-xl font-semibold text-espresso">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm text-espresso/70">
              Des idées, des livres, des gens. Autour d&rsquo;un café.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-espresso">Explorer</p>
            <ul className="space-y-2 text-sm text-espresso/70">
              <li><Link href="/evenements" className="hover:text-brick">Événements</Link></li>
              <li><Link href="/ressourcerie" className="hover:text-brick">La Ressourcerie</Link></li>
              <li><Link href="/carte" className="hover:text-brick">La Carte</Link></li>
              <li><Link href="/a-propos" className="hover:text-brick">Découvrir BOOKÉ·ES</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-espresso">Bon à savoir</p>
            <ul className="space-y-2 text-sm text-espresso/70">
              <li><Link href="/confidentialite" className="hover:text-brick">Confidentialité & RGPD</Link></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-brick">{site.email}</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs text-espresso/50">
          © {new Date().getFullYear()} {site.name}.
        </p>
      </div>
    </footer>
  );
}
