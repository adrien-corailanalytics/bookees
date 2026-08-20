import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendRegistrationEmail } from "@/lib/email";
import type { Event, Registration } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { eventId, firstName, lastName, email, firstTime, source, newsletterOptIn } = body as {
    eventId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    firstTime?: boolean;
    source?: string;
    newsletterOptIn?: boolean;
  };

  if (!eventId || !firstName?.trim() || !lastName?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .eq("status", "published")
    .maybeSingle();

  if (eventError || !event) {
    return NextResponse.json({ error: "event_not_found" }, { status: 404 });
  }
  const typedEvent = event as Event;

  if (!typedEvent.registration_open) {
    return NextResponse.json({ error: "registration_closed" }, { status: 400 });
  }

  const { count: confirmedCount } = await supabase
    .from("registrations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId)
    .eq("status", "confirmed");

  const status = (confirmedCount ?? 0) < typedEvent.capacity ? "confirmed" : "waitlist";

  const { data: registration, error: insertError } = await supabase
    .from("registrations")
    .insert({
      event_id: eventId,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim().toLowerCase(),
      status,
      first_time: Boolean(firstTime),
      source: source || null,
      newsletter_opt_in: Boolean(newsletterOptIn),
    })
    .select()
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  if (newsletterOptIn) {
    await supabase
      .from("newsletter_subscribers")
      .upsert({ email: email.trim().toLowerCase(), source: "registration" }, { onConflict: "email" });
  }

  try {
    await sendRegistrationEmail(typedEvent, registration as Registration);
  } catch (err) {
    // L'inscription est déjà enregistrée : un échec d'envoi d'email ne doit
    // pas faire échouer l'inscription elle-même.
    console.error("Échec de l'envoi de l'email de confirmation", err);
  }

  return NextResponse.json({ status, registrationId: (registration as Registration).id });
}
