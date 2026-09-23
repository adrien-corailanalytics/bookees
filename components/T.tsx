const MARQUE = "[BROUILLON] ";

// Affiche un texte de content/. S'il commence par "[BROUILLON] ", c'est un
// texte rédigé par un agent que l'équipe n'a pas encore choisi : il est
// surligné pour qu'on le repère sur la page. Retirer le préfixe = le valider.
export default function T({ children }: { children: string }) {
  if (!children.startsWith(MARQUE)) return children;
  return (
    <span className="brouillon" title="Texte provisoire, à choisir dans content/">
      {children.slice(MARQUE.length)}
    </span>
  );
}
