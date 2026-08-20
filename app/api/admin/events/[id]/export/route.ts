import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { createClient } from "@/lib/supabase/server";
import type { Registration } from "@/lib/types";

function csvEscape(value: string): string {
  if (/[",\n;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("event_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const rows = (data ?? []) as Registration[];
  const header = [
    "Prénom",
    "Nom",
    "Email",
    "Statut",
    "Première fois",
    "Source",
    "Newsletter",
    "Inscrit le",
  ];

  const lines = [header.join(";")];
  for (const r of rows) {
    lines.push(
      [
        r.first_name,
        r.last_name,
        r.email,
        r.status,
        r.first_time ? "Oui" : "Non",
        r.source ?? "",
        r.newsletter_opt_in ? "Oui" : "Non",
        new Date(r.created_at).toLocaleString("fr-FR"),
      ]
        .map((v) => csvEscape(String(v)))
        .join(";")
    );
  }

  const csv = "﻿" + lines.join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscriptions-${id}.csv"`,
    },
  });
}
