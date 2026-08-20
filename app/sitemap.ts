import type { MetadataRoute } from "next";
import { getUpcomingEvents } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const events = await getUpcomingEvents().catch(() => []);

  const staticRoutes = ["", "/evenements", "/le-comptoir", "/a-propos", "/confidentialite"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    })
  );

  const eventRoutes = events.map((event) => ({
    url: `${siteUrl}/evenements/${event.slug}`,
    lastModified: new Date(event.created_at),
  }));

  return [...staticRoutes, ...eventRoutes];
}
