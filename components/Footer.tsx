import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { textes } from "@/content/textes";
import logo from "@/public/brand/bookees-slogan.svg";
import bkVert from "@/public/brand/bk-vert.svg";
import bkRose from "@/public/brand/bk-rose.svg";
import bkBleu from "@/public/brand/bk-bleu.svg";
import bkJaune from "@/public/brand/bk-jaune.svg";

const t = textes.pied;
const n = textes.navigation;

export default function Footer() {
  return (
    <footer className="border-t border-encre">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src={logo} alt="BOOKÉ·ES — Book club conscient" className="h-auto w-48" />
            <div className="mt-6 flex gap-2" aria-hidden="true">
              {[bkVert, bkRose, bkBleu, bkJaune].map((src) => (
                <Image key={src.src} src={src} alt="" className="h-9 w-9" />
              ))}
            </div>
          </div>
          <div>
            <p className="etiquette mb-4">{t.explorer}</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/evenements" className="lien">{n.evenements}</Link></li>
              <li><Link href="/ressourcerie" className="lien">{n.ressourcerie}</Link></li>
              <li><Link href="/carte" className="lien">{n.carte}</Link></li>
              <li><Link href="/a-propos" className="lien">{n.projet}</Link></li>
            </ul>
          </div>
          <div>
            <p className="etiquette mb-4">{t.bonASavoir}</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/confidentialite" className="lien">{t.confidentialite}</Link></li>
              <li><a href={`mailto:${site.email}`} className="lien">{site.email}</a></li>
              {site.instagramUrl && (
                <li><a href={site.instagramUrl} className="lien">{t.instagram}</a></li>
              )}
            </ul>
          </div>
        </div>
        <p className="legende mt-12">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
