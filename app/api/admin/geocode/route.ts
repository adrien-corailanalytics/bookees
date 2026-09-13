import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";

// Géocodage gratuit via Nominatim (OpenStreetMap) : pas de clé API, donc pas
// de coût — respecte leur politique d'usage (User-Agent identifié, un seul
// appel par action admin, jamais en boucle).
export async function GET(request: Request) {
  await requireAdmin();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim().length < 3) {
    return NextResponse.json({ error: "invalid_query" }, { status: 400 });
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Agorabica (admin geocode, contact: bonjour@agorabica.fr)" },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "geocode_failed" }, { status: 502 });
  }

  const results = (await res.json()) as { lat: string; lon: string }[];
  if (results.length === 0) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ lat: Number(results[0].lat), lng: Number(results[0].lon) });
}
