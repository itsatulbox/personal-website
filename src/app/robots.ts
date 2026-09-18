import type { MetadataRoute } from "next";
import { AI_BOTS } from "@/lib/aiBots";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
      // Listed explicitly (even though "*" already covers them) so tokens like
      // Google-Extended / Applebot-Extended, which only exist as robots.txt
      // controls for AI training and grounding, are unambiguously opted out.
      {
        userAgent: AI_BOTS,
        disallow: "/",
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
      },
    ],
  };
}
