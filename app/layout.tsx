import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegendeBrouillons from "@/components/LegendeBrouillons";
import { site, siteUrl } from "@/content/site";
import { textes } from "@/content/textes";
import "./globals.css";

// Polices de la charte (dossier Drive « Booké·es / Polices »). Les ligatures
// inclusives de BBB Poppins TN sont coupées dans app/globals.css.
const poppins = localFont({
  src: [
    { path: "./fonts/BBBPoppinsTN-TextRegular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/BBBPoppinsTN-TextRegularItalic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/BBBPoppinsTN-TextSemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const veteran = localFont({
  src: "./fonts/VeteranTypewriter.woff2",
  variable: "--font-veteran",
  display: "swap",
});

// Le contenu est figé au build ; on régénère chaque heure pour qu'un événement
// passé bascule tout seul dans "Événements passés" sans redéploiement.
export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: textes.meta.titre,
    template: `%s · ${site.name}`,
  },
  description: textes.meta.description,
  openGraph: {
    title: textes.meta.titre,
    description: textes.meta.description,
    url: siteUrl,
    siteName: site.name,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${veteran.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-encre focus:px-4 focus:py-2 focus:text-white"
        >
          {textes.navigation.allerAuContenu}
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <LegendeBrouillons />
      </body>
    </html>
  );
}
