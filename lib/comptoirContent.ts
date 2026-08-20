// Contenu éditorial du Comptoir. Structuré pour pouvoir être repris tel
// quel depuis une table Supabase plus tard (un type = une table, un item =
// une ligne) sans changer les composants qui consomment ces données.

export interface ComptoirQuestion {
  id: string;
  question: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface ComptoirFact {
  id: string;
  title: string;
  body: string;
}

export interface ComptoirInitiative {
  id: string;
  title: string;
  author: string;
  description: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export const questions: ComptoirQuestion[] = [
  {
    id: "q1",
    question: "Quelle idée avez-vous complètement changée ces cinq dernières années ?",
    ctaLabel: "Répondre sur Instagram",
    ctaUrl: "https://instagram.com",
  },
  {
    id: "q2",
    question: "Y a-t-il un sujet sur lequel vous évitez de débattre avec vos proches ?",
    ctaLabel: "En discuter sur WhatsApp",
    ctaUrl: "https://wa.me/",
  },
];

export const facts: ComptoirFact[] = [
  {
    id: "f1",
    title: "Combien de temps prend une loi ?",
    body: "En France, un projet de loi peut être examiné pendant plus d'un an, entre l'Assemblée nationale et le Sénat, avant d'être définitivement adopté — ou abandonné en cours de route à tout moment.",
  },
  {
    id: "f2",
    title: "Qui vote vraiment aux européennes ?",
    body: "Le taux de participation aux élections européennes en France dépasse rarement 50%, un chiffre stable depuis plusieurs scrutins, malgré l'ampleur des compétences de l'UE dans la vie quotidienne.",
  },
];

export const initiatives: ComptoirInitiative[] = [
  {
    id: "i1",
    title: "Collecte de livres pour une bibliothèque associative",
    author: "Proposé par un membre de la communauté",
    description:
      "Un·e membre organise une collecte de livres pour une bibliothèque associative du 19e arrondissement. Dépôt possible lors du prochain book club.",
    ctaLabel: "En savoir plus",
    ctaUrl: "mailto:bonjour@agorabica.fr",
  },
  {
    id: "i2",
    title: "Recherche bénévoles pour l'accueil des rencontres",
    author: "Équipe Agorabica",
    description:
      "Un coup de main pour l'accueil et l'installation avant les grandes rencontres bimestrielles ? Quelques heures suffisent, ambiance garantie.",
    ctaLabel: "Se proposer",
    ctaUrl: "mailto:bonjour@agorabica.fr",
  },
];
