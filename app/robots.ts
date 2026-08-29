import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /admin is the owner-facing Oracle and Architect console; /api serves JSON, not pages.
      // Neither belongs in a search index.
      disallow: ["/admin/", "/api/"]
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
