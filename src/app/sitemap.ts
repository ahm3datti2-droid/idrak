import type { MetadataRoute } from "next";
import { articles } from "@/lib/data";

const BASE = "https://idrak-nine.vercel.app";
const staticRoutes = ["", "/awareness", "/algorithms", "/influence", "/verify", "/privacy", "/digital-mirror", "/algorithm-lab", "/challenges", "/library", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((r) => ({ url: `${BASE}${r}`, lastModified: now, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.8 })),
    ...articles.map((a) => ({ url: `${BASE}/library/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
