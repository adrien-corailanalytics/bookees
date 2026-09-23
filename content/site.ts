// Les coordonnées du projet, à un seul endroit. Les textes affichés sont dans
// content/textes.ts.

export const site = {
  name: "BOOKÉ·ES",
  // TODO : domaine pas encore acheté — mettre à jour ici et dans Vercel.
  email: "bonjour@bookees.fr",
  // Lien d'invitation au groupe WhatsApp. Vide = le bouton ne s'affiche pas.
  whatsappUrl: "",
  instagramUrl: "",
};

// Une variable d'environnement définie mais vide est traitée comme absente :
// `?? "…"` ne rattrape que `undefined`, et `new URL("")` fait planter le build
// au chargement du module (metadataBase dans app/layout.tsx).
// Sans URL explicite, on prend celle que Vercel injecte au déploiement.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.startsWith("http") ? explicit : `https://${explicit}`;
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
