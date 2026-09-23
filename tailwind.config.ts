import type { Config } from "tailwindcss";

// Charte BOOKÉ·ES (planche ELEMENTS.png de l'équipe design) : texte noir sur
// blanc, quatre pastels en aplat, Veteran Typewriter pour les titres, BBB
// Poppins TN pour le reste.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        encre: "#111111",
        // Gris des légendes : plus foncé que celui de la planche (#BDBDBD),
        // qui n'est pas lisible sur blanc (contraste 1,9:1 ; ici 5,3:1).
        gris: "#6B6B6B",
        vert: "#D9FED7",
        rose: "#FED7E8",
        bleu: "#D7E8FE",
        jaune: "#FEFBD7",
        // Hors charte exprès : ne sert qu'à signaler les textes provisoires.
        brouillon: "#E8590C",
      },
      fontFamily: {
        // Veteran n'a ni « », ni tirets longs, ni points de suspension :
        // ces signes retombent sur Poppins.
        titre: ["var(--font-veteran)", "var(--font-poppins)", "ui-monospace", "monospace"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
