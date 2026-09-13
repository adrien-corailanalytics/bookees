// Les chaînes de marque vivent ici, à un seul endroit. Renommer le projet ou
// changer l'adresse de contact = éditer ce fichier.

export const site = {
  name: "BOOKÉ·ES",
  tagline: "Book club conscient.",
  description:
    "Un book club pour celles et ceux qui veulent mieux comprendre, discuter " +
    "et agir sur les sujets de société. Sans slogans, sans y laisser ses amitiés.",
  // TODO : domaine pas encore acheté — mettre à jour ici et dans Vercel.
  email: "bonjour@bookees.fr",
  // Lien d'invitation au groupe WhatsApp. Vide = le bouton ne s'affiche pas.
  whatsappUrl: "",
  instagramUrl: "",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
