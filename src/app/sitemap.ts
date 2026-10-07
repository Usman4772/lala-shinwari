import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/book", "/events", "/gallery", "/contact", "/order"];
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: r === "" || r === "/menu" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/menu" ? 0.9 : 0.7,
  }));
}
