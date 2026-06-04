// Endpoints for the blackjack terminal backend (a WebSocket bridge to the C++
// game). Self-hosted on a home machine and exposed via a Cloudflare Tunnel. The
// health URL is used to detect when that machine is powered off (offline screen).
// Override via NEXT_PUBLIC_BLACKJACK_WS_URL.
const BASE =
  process.env.NEXT_PUBLIC_BLACKJACK_WS_URL ||
  "wss://blackjack.atulkodla.com";

export const BLACKJACK_WS_URL = BASE;

export const BLACKJACK_HEALTH_URL =
  BASE.replace(/^ws/, "http").replace(/\/+$/, "") + "/healthz";
