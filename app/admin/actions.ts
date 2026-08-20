"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/adminAuth";
import type { EventStatus, EventType } from "@/lib/types";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toNaiveTimestamp(datetimeLocal: string): string {
  // "2026-09-10T19:00" -> "2026-09-10 19:00:00"
  return `${datetimeLocal.replace("T", " ")}:00`;
}

function eventFromForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  return {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    type: formData.get("type") as EventType,
    question: (formData.get("question") as string)?.trim() || null,
    description: String(formData.get("description") ?? ""),
    start_date: toNaiveTimestamp(String(formData.get("start_date"))),
    end_date: toNaiveTimestamp(String(formData.get("end_date"))),
    venue_name: String(formData.get("venue_name") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    capacity: Number(formData.get("capacity")) || 20,
    status: formData.get("status") as EventStatus,
    registration_open: formData.get("registration_open") === "on",
    conditions: (formData.get("conditions") as string)?.trim() || null,
    resource_title: (formData.get("resource_title") as string)?.trim() || null,
    resource_url: (formData.get("resource_url") as string)?.trim() || null,
    cover_image: (formData.get("cover_image") as string)?.trim() || null,
  };
}

export async function createEvent(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const values = eventFromForm(formData);

  const { data, error } = await supabase.from("events").insert(values).select("id").single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/evenements");
  redirect(`/admin/evenements/${data.id}`);
}

export async function updateEvent(eventId: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const values = eventFromForm(formData);

  const { error } = await supabase.from("events").update(values).eq("id", eventId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/evenements/" + eventId);
  revalidatePath("/evenements");
  revalidatePath(`/evenements/${values.slug}`);
}

export async function addSpeaker(eventId: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("speakers").insert({
    event_id: eventId,
    name: String(formData.get("name") ?? "").trim(),
    role: (formData.get("role") as string)?.trim() || null,
    bio: (formData.get("bio") as string)?.trim() || null,
    image: (formData.get("image") as string)?.trim() || null,
    sort_order: Number(formData.get("sort_order")) || 0,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/evenements/${eventId}`);
}

export async function deleteSpeaker(speakerId: string, eventId: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("speakers").delete().eq("id", speakerId);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/evenements/${eventId}`);
}

export async function cancelRegistrationAdmin(registrationId: string, eventId: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { data: current } = await supabase
    .from("registrations")
    .select("status")
    .eq("id", registrationId)
    .maybeSingle();

  let candidateId: string | null = null;
  if (current?.status === "confirmed") {
    const { data: candidate } = await supabase
      .from("registrations")
      .select("id")
      .eq("event_id", eventId)
      .eq("status", "waitlist")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    candidateId = candidate?.id ?? null;
  }

  const { error } = await supabase
    .from("registrations")
    .update({ status: "cancelled" })
    .eq("id", registrationId);

  if (error) {
    throw new Error(error.message);
  }

  if (candidateId) {
    const { data: promoted } = await supabase
      .from("registrations")
      .select("*, events(*)")
      .eq("id", candidateId)
      .maybeSingle();

    if (promoted && promoted.status === "confirmed") {
      const { sendWaitlistPromotionEmail } = await import("@/lib/email");
      try {
        await sendWaitlistPromotionEmail(promoted.events, promoted);
      } catch (err) {
        console.error("Échec de l'envoi de l'email de promotion liste d'attente", err);
      }
    }
  }

  revalidatePath(`/admin/evenements/${eventId}`);
}

export async function togglePollPhase(pollId: string, eventId: string, newPhase: "before" | "after") {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("polls")
    .update({ current_phase: newPhase, is_open: true })
    .eq("id", pollId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/evenements/${eventId}`);
  revalidatePath("/evenements");
}

export async function createPoll(eventId: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("polls").insert({
    event_id: eventId,
    question: String(formData.get("question") ?? "").trim(),
    current_phase: "before",
    is_open: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/evenements/${eventId}`);
}
