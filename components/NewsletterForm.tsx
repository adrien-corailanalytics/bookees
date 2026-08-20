"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm({ source }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="font-medium text-pine">
        Merci ! Vous recevrez nos prochaines actualités par email.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label htmlFor="newsletter-email" className="sr-only">
        Adresse email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="vous@exemple.fr"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full border border-espresso/20 bg-paper px-5 py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-brick sm:w-72"
      />
      <button type="submit" disabled={state === "loading"} className="btn-primary whitespace-nowrap">
        {state === "loading" ? "Envoi…" : "Rejoindre la communauté"}
      </button>
      {state === "error" && (
        <p className="text-sm text-brick" role="alert">
          Un souci est survenu, réessayez dans un instant.
        </p>
      )}
    </form>
  );
}
