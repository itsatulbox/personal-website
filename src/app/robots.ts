import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
      },
    ],
    sitemap: "https://atulkodla.com/sitemap.xml",
  };
}
