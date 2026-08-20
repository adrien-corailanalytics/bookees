"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelButton({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const router = useRouter();

  async function handleCancel() {
    setState("loading");
    try {
      const res = await fetch(`/api/registrations/${token}/cancel`, { method: "POST" });
      if (!res.ok) throw new Error();
      setState("done");
      router.refresh();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="font-medium text-pine" role="status">
        Votre inscription a bien été annulée. Votre place a été libérée.
      </p>
    );
  }

  return (
    <div>
      <button onClick={handleCancel} disabled={state === "loading"} className="btn-primary">
        {state === "loading" ? "Annulation…" : "Confirmer l'annulation"}
      </button>
      {state === "error" && (
        <p className="mt-2 text-sm text-brick" role="alert">
          Une erreur est survenue, réessayez dans un instant.
        </p>
      )}
    </div>
  );
}
