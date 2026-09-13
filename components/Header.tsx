"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/evenements", label: "Événements" },
  { href: "/ressourcerie", label: "Ressourcerie" },
  { href: "/carte", label: "Carte" },
  { href: "/le-comptoir", label: "Le Comptoir" },
  { href: "/a-propos", label: "Découvrir" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-espresso hover:text-brick"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-espresso/80 hover:text-brick"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/evenements" className="btn-primary hidden lg:inline-flex">
          Voir les rencontres
        </Link>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-espresso lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-espresso/10 bg-cream px-5 py-4 lg:hidden"
          aria-label="Navigation principale"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                    pathname === link.href
                      ? "bg-espresso text-cream"
                      : "text-espresso/80 hover:bg-espresso/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/evenements"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 w-full"
          >
            Voir les rencontres
          </Link>
        </nav>
      )}
    </header>
  );
}
