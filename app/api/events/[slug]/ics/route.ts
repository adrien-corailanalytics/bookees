import { NextResponse } from "next/server";
import { getEventBySlug } from "@/lib/data";
import { generateICS } from "@/lib/ics";
import { siteUrl } from "@/content/site";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const ics = generateICS(event, siteUrl);

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
    },
  });
}
