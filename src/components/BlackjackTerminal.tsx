"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { BLACKJACK_WS_URL, BLACKJACK_HEALTH_URL } from "@/lib/blackjack";

// Shown when the self-hosted machine is powered off (health check unreachable).
// ︎ forces text presentation so every suit renders as a uniform glyph
// (otherwise some fonts show ♥/♦ in larger emoji style).
const OFFLINE_SCREEN = [
  "",
  "",
  "  ♠︎ ♥︎ ♦︎ ♣︎",
  "",
  "  my machine is powered off,",
  "  please check again later.",
  "",
].join("\r\n");

export default function BlackjackTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "monospace",
      theme: { background: "#000000", foreground: "#ffffff" },
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(containerRef.current);
    fitAddon.fit();

    const resizeObserver = new ResizeObserver(() => fitAddon.fit());
    resizeObserver.observe(containerRef.current);

    let ws: WebSocket | null = null;
    let disposed = false;
    let recheckTimer: ReturnType<typeof setTimeout> | null = null;

    // Is the host reachable? The health endpoint sends CORS headers, so a
    // successful response means the machine is up; any failure (machine off,
    // tunnel down) rejects or returns a blocked response.
    async function isHostUp() {
      try {
        const res = await fetch(BLACKJACK_HEALTH_URL, { cache: "no-store" });
        return res.ok;
      } catch {
        return false;
      }
    }

    async function checkAndConnect() {
      if (disposed) return;
      if (await isHostUp()) {
        connect();
      } else {
        if (disposed) return;
        term.clear();
        term.write(OFFLINE_SCREEN);
        // Keep checking quietly; connect as soon as the machine comes back.
        recheckTimer = setTimeout(checkAndConnect, 15000);
      }
    }

    function connect() {
      if (disposed) return;
      ws = new WebSocket(BLACKJACK_WS_URL);

      ws.onopen = () => {
        term.clear();
        term.focus();
      };

      ws.onmessage = (e) => {
        term.write(e.data);
      };

      ws.onclose = () => {
        if (disposed) return;
        ws = null;
        term.write(
          "\r\n\x1b[90m[Game ended — press any key to restart]\x1b[0m\r\n"
        );
      };

      ws.onerror = () => {
        // onclose fires next; the keypress handler re-checks host health.
      };
    }

    term.write("\x1b[90mConnecting…\x1b[0m\r\n");
    checkAndConnect();

    const onDataDisposable = term.onData((data) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      } else if (!ws) {
        // After a game ends (or a failed connect), re-check the host and
        // either restart the game or show the offline screen.
        if (recheckTimer) clearTimeout(recheckTimer);
        checkAndConnect();
      }
    });

    return () => {
      disposed = true;
      if (recheckTimer) clearTimeout(recheckTimer);
      resizeObserver.disconnect();
      onDataDisposable.dispose();
      ws?.close();
      term.dispose();
    };
  }, []);

  // Stop keyboard events from bubbling to the modal's Escape handler
  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      onKeyDown={(e) => e.stopPropagation()}
    />
  );
}
