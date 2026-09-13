import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-serif text-xl font-semibold text-espresso">AGORABICA</p>
            <p className="mt-2 max-w-xs text-sm text-espresso/70">
              Des idées, des livres, des gens. Autour d&rsquo;un café.
            </p>
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-espresso">Restez informé·e</p>
              <NewsletterForm source="footer" />
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-espresso">Explorer</p>
            <ul className="space-y-2 text-sm text-espresso/70">
              <li><Link href="/evenements" className="hover:text-brick">Événements</Link></li>
              <li><Link href="/le-comptoir" className="hover:text-brick">Le Comptoir</Link></li>
              <li><Link href="/a-propos" className="hover:text-brick">Découvrir Agorabica</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-espresso">Bon à savoir</p>
            <ul className="space-y-2 text-sm text-espresso/70">
              <li><Link href="/confidentialite" className="hover:text-brick">Confidentialité & RGPD</Link></li>
              <li><a href="mailto:bonjour@agorabica.fr" className="hover:text-brick">bonjour@agorabica.fr</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs text-espresso/50">
          © {new Date().getFullYear()} Agorabica.
        </p>
      </div>
    </footer>
  );
}
