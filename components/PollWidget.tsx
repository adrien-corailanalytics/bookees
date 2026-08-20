"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { PollChoice, PollPhase, PollResultRow } from "@/lib/types";

const CHOICE_LABELS: Record<PollChoice, string> = {
  agree: "D'accord",
  disagree: "Pas d'accord",
  depends: "Ça dépend",
};

const CHOICE_COLORS: Record<PollChoice, string> = {
  agree: "bg-pine",
  disagree: "bg-brick",
  depends: "bg-espresso/40",
};

function getVoterKey(): string {
  const KEY = "agorabica_voter_key";
  let key = localStorage.getItem(KEY);
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem(KEY, key);
  }
  return key;
}

function votedFlagKey(pollId: string, phase: PollPhase) {
  return `agorabica_voted_${pollId}_${phase}`;
}

// localStorage est une source externe synchrone : useSyncExternalStore est le
// mécanisme React recommandé pour la lire sans provoquer de mismatch SSR
// (le serveur n'a pas accès à localStorage, d'où le snapshot serveur `false`).
function noopSubscribe() {
  return () => {};
}

function makeGetVotedSnapshot(pollId: string, phase: PollPhase) {
  return () => localStorage.getItem(votedFlagKey(pollId, phase)) === "1";
}

function getServerVotedSnapshot() {
  return false;
}

function PhaseResults({ phase, results }: { phase: PollPhase; results: PollResultRow[] }) {
  const rows = results.filter((r) => r.phase === phase);
  const total = rows.reduce((sum, r) => sum + Number(r.votes), 0);

  if (total === 0) {
    return <p className="text-sm text-espresso/50">Pas encore de votes.</p>;
  }

  return (
    <div className="space-y-2">
      {(["agree", "disagree", "depends"] as PollChoice[]).map((choice) => {
        const row = rows.find((r) => r.choice === choice);
        const votes = row ? Number(row.votes) : 0;
        const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
        return (
          <div key={choice}>
            <div className="mb-1 flex justify-between text-xs text-espresso/70">
              <span>{CHOICE_LABELS[choice]}</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-espresso/10">
              <div
                className={`h-full rounded-full ${CHOICE_COLORS[choice]} transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
      <p className="pt-1 text-xs text-espresso/50">{total} vote{total > 1 ? "s" : ""}</p>
    </div>
  );
}

export default function PollWidget({
  pollId,
  question,
  currentPhase,
  isOpen,
}: {
  pollId: string;
  question: string;
  currentPhase: PollPhase;
  isOpen: boolean;
}) {
  const votedInStorage = useSyncExternalStore(
    noopSubscribe,
    makeGetVotedSnapshot(pollId, currentPhase),
    getServerVotedSnapshot
  );
  const [justVoted, setJustVoted] = useState(false);
  const hasVoted = votedInStorage || justVoted;

  const [results, setResults] = useState<PollResultRow[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(async () => {
    const res = await fetch(`/api/polls/${pollId}/results`);
    if (res.ok) {
      setResults(await res.json());
    }
  }, [pollId]);

  useEffect(() => {
    if (hasVoted) {
      // Récupère les résultats agrégés depuis l'API au montage / changement
      // de statut de vote ; setResults n'est appelé qu'après la réponse
      // réseau, pas de façon synchrone dans le corps de l'effet.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchResults();
    }
  }, [hasVoted, fetchResults]);

  async function vote(choice: PollChoice) {
    setLoading(true);
    try {
      const res = await fetch(`/api/polls/${pollId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice, phase: currentPhase, voterKey: getVoterKey() }),
      });
      if (res.ok) {
        localStorage.setItem(votedFlagKey(pollId, currentPhase), "1");
        setJustVoted(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-7">
      <p className="tag">Avant / Après</p>
      <h3 className="mt-3 font-serif text-xl leading-snug text-espresso">{question}</h3>

      {!hasVoted && isOpen && (
        <div className="mt-5 flex flex-wrap gap-2">
          {(["agree", "disagree", "depends"] as PollChoice[]).map((choice) => (
            <button
              key={choice}
              disabled={loading}
              onClick={() => vote(choice)}
              className="btn-secondary !px-4 !py-2 text-sm"
            >
              {CHOICE_LABELS[choice]}
            </button>
          ))}
        </div>
      )}

      {!hasVoted && !isOpen && (
        <p className="mt-4 text-sm text-espresso/60">Le vote n&rsquo;est pas ouvert pour le moment.</p>
      )}

      {hasVoted && (
        <div className="mt-5 space-y-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-espresso/50">
              Avant la rencontre
            </p>
            {results ? <PhaseResults phase="before" results={results} /> : null}
          </div>
          {results?.some((r) => r.phase === "after") && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-espresso/50">
                Après la rencontre
              </p>
              <PhaseResults phase="after" results={results} />
            </div>
          )}
          <p className="text-xs text-espresso/50">Merci d&rsquo;avoir voté !</p>
        </div>
      )}
    </div>
  );
}
