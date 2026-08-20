"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <p className="font-serif text-5xl text-brick">☕</p>
      <h1 className="mt-4 font-serif text-2xl text-espresso">
        Un souci de connexion, pas de vous.
      </h1>
      <p className="mt-2 text-espresso/70">
        Le site rencontre un problème temporaire. Réessayez dans un instant.
      </p>
      <button onClick={() => reset()} className="btn-primary mt-8">
        Réessayer
      </button>
    </div>
  );
}
