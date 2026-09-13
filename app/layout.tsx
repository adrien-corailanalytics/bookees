import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Le contenu est figé au build ; on régénère chaque heure pour qu'un événement
// passé bascule tout seul dans "Événements passés" sans redéploiement.
export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BOOKÉ·ES — Comprendre. Discuter. Agir.",
    template: "%s — BOOKÉ·ES",
  },
  description:
    "BOOKÉ·ES est une communauté pour celles et ceux qui veulent mieux comprendre, discuter et agir sur les sujets de société. Book clubs, rencontres et vie de communauté, autour d'un café.",
  openGraph: {
    title: "BOOKÉ·ES — Comprendre. Discuter. Agir.",
    description: "Des idées, des livres, des gens. Autour d'un café.",
    url: siteUrl,
    siteName: "BOOKÉ·ES",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
