"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("Identifiants incorrects.");
      setLoading(false);
      return;
    }

    const next = searchParams.get("next") ?? "/admin";
    router.push(next);
    router.refresh();
  }

  const notAdmin = searchParams.get("error") === "not_admin";

  return (
    <div className="w-full">
      <h1 className="font-serif text-3xl text-espresso">Administration</h1>
      <p className="mt-2 text-sm text-espresso/60">Réservé à l&rsquo;équipe Agorabica.</p>

      {notAdmin && (
        <p className="mt-4 rounded-lg bg-brick/10 p-3 text-sm text-brick" role="alert">
          Ce compte n&rsquo;a pas les droits d&rsquo;administration.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-espresso">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-espresso">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-espresso/20 bg-paper px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        {error && (
          <p className="text-sm text-brick" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
