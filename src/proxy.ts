import type { NextRequest } from "next/server";
import { AI_BOTS } from "@/lib/aiBots";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const AI_BOT_PATTERN = new RegExp(AI_BOTS.map(escapeRegExp).join("|"), "i");

// Well-behaved AI crawlers already stop at robots.txt; this returns an empty 403
// to the ones that identify themselves but ignore it, so no page or the CV is
// ever served to them.
export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  if (AI_BOT_PATTERN.test(userAgent)) {
    return new Response(null, { status: 403 });
  }
}

export const config = {
  // robots.txt stays reachable so compliant crawlers read the disallow rules
  // instead of treating a 403 as "no robots.txt, crawl everything".
  matcher: ["/((?!_next/static|_next/image|robots\\.txt).*)"],
};
