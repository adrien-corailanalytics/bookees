"use client";

import { useState, type FormEvent } from "react";
import type { Event } from "@/lib/types";
import CalendarButtons from "./CalendarButtons";

const SOURCES = [
  "Bouche-à-oreille",
  "Instagram",
  "Newsletter",
  "Un événement précédent",
  "Recherche Google",
  "Autre",
];

export default function RegisterForm({
  event,
  isFull,
  siteUrl,
}: {
  event: Event;
  isFull: boolean;
  siteUrl: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstTime, setFirstTime] = useState(false);
  const [source, setSource] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "error" | "confirmed" | "waitlist">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          firstName,
          lastName,
          email,
          firstTime,
          source,
          newsletterOptIn,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(
          data.error === "duplicate"
            ? "Vous êtes déjà inscrit·e à cet événement avec cette adresse email."
            : "Une erreur est survenue. Réessayez dans un instant."
        );
        setState("error");
        return;
      }

      setState(data.status === "waitlist" ? "waitlist" : "confirmed");
    } catch {
      setErrorMessage("Une erreur est survenue. Réessayez dans un instant.");
      setState("error");
    }
  }

  if (state === "confirmed" || state === "waitlist") {
    return (
      <div className="card p-7" role="status">
        <p className="text-2xl">{state === "confirmed" ? "✓" : "⏳"}</p>
        <h3 className="mt-3 font-serif text-2xl text-espresso">
          {state === "confirmed" ? "Inscription confirmée !" : "Vous êtes sur liste d'attente"}
        </h3>
        <p className="mt-2 text-sm text-espresso/70">
          {state === "confirmed"
            ? `À très vite, ${firstName} ! Un email de confirmation vient de vous être envoyé, avec le lien pour annuler si besoin.`
            : `L'événement est complet, mais on vous préviendra par email si une place se libère.`}
        </p>
        {state === "confirmed" && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-espresso">Ajouter à mon agenda</p>
            <CalendarButtons event={event} siteUrl={siteUrl} />
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-7">
      <h3 className="font-serif text-2xl text-espresso">
        {isFull ? "Rejoindre la liste d'attente" : "Je m'inscris"}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-espresso">
            Prénom
          </label>
          <input
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border border-espresso/20 bg-cream px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-espresso">
            Nom
          </label>
          <input
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border border-espresso/20 bg-cream px-4 py-2.5 text-sm focus:border-brick"
          />
        </div>
      </div>
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
          className="w-full rounded-lg border border-espresso/20 bg-cream px-4 py-2.5 text-sm focus:border-brick"
        />
      </div>
      <div>
        <label htmlFor="source" className="mb-1 block text-sm font-medium text-espresso">
          Comment avez-vous connu Agorabica ? <span className="font-normal text-espresso/50">(optionnel)</span>
        </label>
        <select
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full rounded-lg border border-espresso/20 bg-cream px-4 py-2.5 text-sm focus:border-brick"
        >
          <option value="">— Choisir —</option>
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-start gap-2 text-sm text-espresso/80">
        <input
          type="checkbox"
          checked={firstTime}
          onChange={(e) => setFirstTime(e.target.checked)}
          className="mt-0.5"
        />
        Je viens pour la première fois à Agorabica
      </label>
      <label className="flex items-start gap-2 text-sm text-espresso/80">
        <input
          type="checkbox"
          checked={newsletterOptIn}
          onChange={(e) => setNewsletterOptIn(e.target.checked)}
          className="mt-0.5"
        />
        Je souhaite aussi recevoir la newsletter Agorabica
      </label>
      <label className="flex items-start gap-2 text-sm text-espresso/80">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        J&rsquo;accepte que mes informations soient utilisées pour traiter mon inscription à
        cet événement, conformément à la{" "}
        <a href="/confidentialite" className="underline hover:text-brick">
          politique de confidentialité
        </a>
        .
      </label>

      {state === "error" && (
        <p className="text-sm text-brick" role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" disabled={state === "loading"} className="btn-primary w-full">
        {state === "loading"
          ? "Envoi…"
          : isFull
          ? "Rejoindre la liste d'attente"
          : "Je m'inscris"}
      </button>
    </form>
  );
}
