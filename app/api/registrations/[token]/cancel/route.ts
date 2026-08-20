import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWaitlistPromotionEmail } from "@/lib/email";
import type { Event, Registration } from "@/lib/types";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();

  const { data: registration, error } = await supabase
    .from("registrations")
    .select("*, events(*)")
    .eq("cancellation_token", token)
    .maybeSingle();

  if (error || !registration) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const typed = registration as Registration & { events: Event };

  if (typed.status === "cancelled") {
    return NextResponse.json({ ok: true, alreadyCancelled: true });
  }

  const wasConfirmed = typed.status === "confirmed";

  // Avant d'annuler : identifier qui serait promu (le trigger SQL fera la
  // promotion effective au niveau de la base lors de l'UPDATE ci-dessous).
  let candidateId: string | null = null;
  if (wasConfirmed) {
    const { data: candidate } = await supabase
      .from("registrations")
      .select("id")
      .eq("event_id", typed.event_id)
      .eq("status", "waitlist")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    candidateId = candidate?.id ?? null;
  }

  const { error: updateError } = await supabase
    .from("registrations")
    .update({ status: "cancelled" })
    .eq("id", typed.id);

  if (updateError) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  if (candidateId) {
    const { data: promoted } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", candidateId)
      .maybeSingle();

    if (promoted && (promoted as Registration).status === "confirmed") {
      try {
        await sendWaitlistPromotionEmail(typed.events, promoted as Registration);
      } catch (err) {
        console.error("Échec de l'envoi de l'email de promotion liste d'attente", err);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
