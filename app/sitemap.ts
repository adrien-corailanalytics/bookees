import type { MetadataRoute } from "next";
import { getUpcomingEvents } from "@/lib/data";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/evenements",
    "/ressourcerie",
    "/carte",
    "/a-propos",
    "/confidentialite",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const eventRoutes = getUpcomingEvents().map((event) => ({
    url: `${siteUrl}/evenements/${event.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...eventRoutes];
}
