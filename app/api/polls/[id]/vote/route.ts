import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PollChoice, PollPhase } from "@/lib/types";

const VALID_CHOICES: PollChoice[] = ["agree", "disagree", "depends"];
const VALID_PHASES: PollPhase[] = ["before", "after"];

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const choice = body?.choice as PollChoice | undefined;
  const phase = body?.phase as PollPhase | undefined;
  const voterKey = body?.voterKey as string | undefined;

  if (!choice || !VALID_CHOICES.includes(choice)) {
    return NextResponse.json({ error: "invalid_choice" }, { status: 400 });
  }
  if (!phase || !VALID_PHASES.includes(phase)) {
    return NextResponse.json({ error: "invalid_phase" }, { status: 400 });
  }
  if (!voterKey || typeof voterKey !== "string" || voterKey.length > 100) {
    return NextResponse.json({ error: "invalid_voter" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: poll } = await supabase
    .from("polls")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!poll || !poll.is_open || poll.current_phase !== phase) {
    return NextResponse.json({ error: "poll_closed" }, { status: 400 });
  }

  const { error } = await supabase.from("poll_votes").insert({
    poll_id: id,
    phase,
    choice,
    voter_key: voterKey,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "already_voted" }, { status: 409 });
    }
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
