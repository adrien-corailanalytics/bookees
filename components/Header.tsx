"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { textes } from "@/content/textes";
import { cn } from "@/lib/utils";
import monogram from "@/public/brand/bk-vert.svg";
import wordmark from "@/public/brand/bookees.svg";

const t = textes.navigation;

const links = [
  { href: "/evenements", label: t.evenements },
  { href: "/ressourcerie", label: t.ressourcerie },
  { href: "/carte", label: t.carte },
  { href: "/a-propos", label: t.projet },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-encre bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
        <Link href="/" aria-label={t.accueil} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src={monogram} alt="" className="h-10 w-10" priority />
          <Image src={wordmark} alt="" className="h-5 w-auto sm:h-6" priority />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "text-sm font-semibold underline-offset-[6px] hover:underline",
                isActive(link.href) && "underline decoration-2"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/evenements" className="btn hidden !py-2.5 lg:inline-flex">
          {t.cta}
        </Link>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-encre lg:hidden"
          aria-label={open ? t.fermerMenu : t.ouvrirMenu}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-encre bg-white px-5 py-4 lg:hidden" aria-label="Navigation principale">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-encre/15 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn("block py-3 font-titre text-2xl", isActive(link.href) && "underline decoration-2 underline-offset-4")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/evenements" onClick={() => setOpen(false)} className="btn mt-4 w-full">
            {t.cta}
          </Link>
        </nav>
      )}
    </header>
  );
}
