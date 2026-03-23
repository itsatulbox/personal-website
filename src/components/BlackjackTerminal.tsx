"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

const WS_URL =
  process.env.NEXT_PUBLIC_BLACKJACK_WS_URL || "wss://blackjack-terminal.fly.dev";

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

    function connect() {
      if (disposed) return;
      ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        term.clear();
        term.focus();
      };

      ws.onmessage = (e) => {
        term.write(e.data);
      };

      ws.onclose = () => {
        if (disposed) return;
        term.write("\r\n\x1b[90m[Game ended — press any key to restart]\x1b[0m\r\n");
        ws = null;
      };

      ws.onerror = () => {
        term.write("\r\n\x1b[31m[Connection error]\x1b[0m\r\n");
      };
    }

    connect();

    const onDataDisposable = term.onData((data) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      } else if (!ws) {
        // Reconnect on any keypress after disconnect
        connect();
      }
    });

    return () => {
      disposed = true;
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
