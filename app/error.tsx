"use client";

import { useEffect } from "react";
import T from "@/components/T";
import { textes } from "@/content/textes";

const t = textes.erreur;

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
      <h1 className="titre-2">
        <T>{t.titre}</T>
      </h1>
      <p className="mt-3">{t.texte}</p>
      <button onClick={() => reset()} className="btn mt-8">
        {t.bouton}
      </button>
    </div>
  );
}
