"use strict";

const http = require("node:http");
const crypto = require("node:crypto");
const { WebSocketServer } = require("ws");
const pty = require("node-pty");

const num = (v, d) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : d);

const PORT = num(process.env.PORT, 8080);
const HOST = process.env.HOST || "0.0.0.0";
const GAME_BIN = process.env.GAME_BIN || "blackjack";

const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS || "https://atulkodla.com,https://www.atulkodla.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);
// Browsers always send Origin on a WebSocket handshake and on a cross-origin
// fetch, so an absent Origin means a non-browser client.
const ALLOW_NO_ORIGIN = process.env.ALLOW_NO_ORIGIN === "1";

// Sized against the container limits: 32 games plus node stays under
// mem_limit 256m / pids_limit 128 (see compose.yaml).
const MAX_CONNECTIONS = num(process.env.MAX_CONNECTIONS, 32);
const MAX_CONNECTIONS_PER_IP = num(process.env.MAX_CONNECTIONS_PER_IP, 3);
const CONNECT_WINDOW_MS = num(process.env.CONNECT_WINDOW_MS, 60_000);
const MAX_CONNECTS_PER_WINDOW = num(process.env.MAX_CONNECTS_PER_WINDOW, 20);

// One keystroke, or one paste. Anything larger is not a terminal user.
const MAX_PAYLOAD_BYTES = num(process.env.MAX_PAYLOAD_BYTES, 4096);
const INPUT_BYTES_PER_SEC = num(process.env.INPUT_BYTES_PER_SEC, 4096);
const INPUT_BURST_BYTES = num(process.env.INPUT_BURST_BYTES, 16_384);

const IDLE_TIMEOUT_MS = num(process.env.IDLE_TIMEOUT_MS, 5 * 60_000);
const MAX_SESSION_MS = num(process.env.MAX_SESSION_MS, 30 * 60_000);
const PING_INTERVAL_MS = num(process.env.PING_INTERVAL_MS, 30_000);

// A client that stops reading must not let the pty buffer without bound.
const BACKPRESSURE_PAUSE_BYTES = num(process.env.BACKPRESSURE_PAUSE_BYTES, 256 * 1024);
const BACKPRESSURE_KILL_BYTES = num(process.env.BACKPRESSURE_KILL_BYTES, 4 * 1024 * 1024);
const DRAIN_POLL_MS = 50;

const SHUTDOWN_GRACE_MS = num(process.env.SHUTDOWN_GRACE_MS, 5_000);

// Log IPs as a per-process salted digest: enough to correlate abuse within one
// run, not a retained record of who played.
const IP_SALT = crypto.randomBytes(16);
const ipTag = (ip) =>
  ip ? crypto.createHash("sha256").update(IP_SALT).update(ip).digest("hex").slice(0, 12) : "anon";

function log(event, fields) {
  process.stdout.write(JSON.stringify({ ts: new Date().toISOString(), event, ...fields }) + "\n");
}

const clients = new Set();
const perIp = new Map(); // ip -> { open: number, recent: number[] }

function ipState(ip) {
  let s = perIp.get(ip);
  if (!s) {
    s = { open: 0, recent: [] };
    perIp.set(ip, s);
  }
  return s;
}

const pruneTimer = setInterval(() => {
  const cutoff = Date.now() - CONNECT_WINDOW_MS;
  for (const [ip, s] of perIp) {
    s.recent = s.recent.filter((t) => t > cutoff);
    if (s.open === 0 && s.recent.length === 0) perIp.delete(ip);
  }
}, CONNECT_WINDOW_MS);
pruneTimer.unref();

// The listener is only reachable over loopback: the container port is published
// to 127.0.0.1 and the tunnel daemon is the sole ingress. That is the only
// reason a forwarded client-IP header can be believed here. Widening the
// publish binding invalidates this and re-opens per-IP spoofing.
function isPrivatePeer(addr) {
  if (!addr) return false;
  const a = addr.replace(/^::ffff:/, "");
  if (a === "127.0.0.1" || a === "::1") return true;
  if (/^10\./.test(a) || /^192\.168\./.test(a)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(a)) return true;
  if (/^f[cd]/i.test(a)) return true;
  return false;
}

let warnedNoForwardedIp = 0;

// Returns null when every visitor would collapse onto the same proxy address.
// Applying a per-IP cap to that key would cap the whole site at three players,
// so an unidentified client is governed by the global cap alone.
function clientIp(req, socket) {
  const peer = (socket.remoteAddress || "").replace(/^::ffff:/, "");
  if (!isPrivatePeer(peer)) return peer || null;

  const fwd = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0 && fwd.length < 200) {
    const first = fwd.split(",")[0].trim();
    if (first) return first;
  }
  const now = Date.now();
  if (now - warnedNoForwardedIp > 60_000) {
    warnedNoForwardedIp = now;
    log("no_forwarded_ip", { peer });
  }
  return null;
}

function originAllowed(origin) {
  if (!origin) return ALLOW_NO_ORIGIN;
  return ALLOWED_ORIGINS.has(origin);
}

const server = http.createServer(
  {
    noDelay: true,
    // Bounds the header-read phase, which is also the pre-upgrade phase: a
    // handshake that never completes cannot pin a socket.
    headersTimeout: 8_000,
    requestTimeout: 12_000,
    keepAliveTimeout: 5_000,
    maxHeadersCount: 64,
    // These timeouts are enforced by a sweep, not per-socket timers, so the
    // sweep period is the real upper bound. The 30s default would let a stalled
    // handshake outlive headersTimeout threefold.
    connectionsCheckingInterval: 2_000,
  },
  (req, res) => {
    const origin = req.headers.origin;
    const headers = {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      vary: "Origin",
    };
    if (origin && originAllowed(origin)) headers["access-control-allow-origin"] = origin;

    if (req.method === "OPTIONS") {
      headers["access-control-allow-methods"] = "GET, HEAD, OPTIONS";
      headers["access-control-max-age"] = "600";
      res.writeHead(204, headers);
      res.end();
      return;
    }
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, headers);
      res.end();
      return;
    }

    const path = (req.url || "/").split("?")[0];
    if (path === "/healthz" || path === "/") {
      res.writeHead(200, headers);
      res.end(req.method === "HEAD" ? undefined : "ok");
      return;
    }
    res.writeHead(404, headers);
    res.end();
  }
);

server.on("clientError", (err, socket) => {
  if (socket.writable) socket.end("HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n");
  socket.destroy();
  log("client_error", { code: err && err.code });
});

server.on("error", (err) => {
  log("server_error", { code: err && err.code, message: err && err.message });
  process.exit(1);
});

const wss = new WebSocketServer({
  noServer: true,
  maxPayload: MAX_PAYLOAD_BYTES,
  // Per-connection zlib contexts retain megabytes each and let a small frame
  // expand into a large allocation.
  perMessageDeflate: false,
});

wss.on("error", (err) => log("wss_error", { message: err && err.message }));

function refuse(socket, status, reason) {
  const body = `${status} ${reason}\n`;
  if (socket.writable) {
    socket.write(
      `HTTP/1.1 ${status} ${reason}\r\n` +
        "Connection: close\r\n" +
        "Content-Type: text/plain; charset=utf-8\r\n" +
        `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n` +
        body
    );
  }
  socket.destroy();
}

server.on("upgrade", (req, socket, head) => {
  // A peer reset between 'upgrade' and handleUpgrade emits on the raw socket,
  // which has no listener of its own yet; unhandled, that throws on the process.
  const onPreUpgradeError = (err) => log("upgrade_socket_error", { code: err && err.code });
  socket.on("error", onPreUpgradeError);

  const ip = clientIp(req, socket);
  const tag = ipTag(ip);
  const origin = req.headers.origin;
  const path = (req.url || "/").split("?")[0];

  if (!originAllowed(origin)) {
    log("refused", { reason: "origin", tag, origin: origin || null });
    return refuse(socket, 403, "Forbidden");
  }
  if (path !== "/" && path !== "/ws") {
    log("refused", { reason: "path", tag, path });
    return refuse(socket, 404, "Not Found");
  }
  if (clients.size >= MAX_CONNECTIONS) {
    log("refused", { reason: "global_cap", tag, open: clients.size });
    return refuse(socket, 503, "Service Unavailable");
  }

  const now = Date.now();
  const st = ip ? ipState(ip) : null;
  if (st) {
    st.recent = st.recent.filter((t) => t > now - CONNECT_WINDOW_MS);
    if (st.open >= MAX_CONNECTIONS_PER_IP) {
      log("refused", { reason: "ip_cap", tag, open: st.open });
      return refuse(socket, 429, "Too Many Requests");
    }
    if (st.recent.length >= MAX_CONNECTS_PER_WINDOW) {
      log("refused", { reason: "ip_rate", tag, recent: st.recent.length });
      return refuse(socket, 429, "Too Many Requests");
    }
  }

  wss.handleUpgrade(req, socket, head, (ws) => {
    socket.removeListener("error", onPreUpgradeError);
    if (st) {
      st.open += 1;
      st.recent.push(now);
    }
    startSession(ws, ip, tag);
  });
});

function startSession(ws, ip, tag) {
  const id = crypto.randomUUID().slice(0, 8);
  const startedAt = Date.now();
  clients.add(ws);

  let proc = null;
  let closed = false;
  let paused = false;
  let drainTimer = null;
  let idleTimer = null;
  let maxSessionTimer = null;
  let tokens = INPUT_BURST_BYTES;
  let lastRefill = startedAt;

  ws.isAlive = true;
  ws.sessionId = id;

  const cleanup = (reason) => {
    if (closed) return;
    closed = true;
    clients.delete(ws);
    if (ip) {
      const st = perIp.get(ip);
      if (st && st.open > 0) st.open -= 1;
    }
    clearTimeout(idleTimer);
    clearTimeout(maxSessionTimer);
    clearInterval(drainTimer);
    if (proc) {
      try {
        proc.kill();
      } catch {
        /* already reaped */
      }
      proc = null;
    }
    log("session_end", { id, tag, reason, ms: Date.now() - startedAt, open: clients.size });
  };

  const shut = (code, reason) => {
    try {
      ws.close(code, reason);
    } catch {
      /* socket already gone */
    }
    setTimeout(() => {
      if (ws.readyState !== ws.CLOSED) ws.terminate();
    }, 1_000).unref();
  };

  const end = (reason, code, text) => {
    log(reason, { id, tag });
    cleanup(reason);
    shut(code, text);
  };

  maxSessionTimer = setTimeout(() => end("session_limit", 1000, "session limit"), MAX_SESSION_MS);

  const armIdle = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => end("session_idle", 1000, "idle"), IDLE_TIMEOUT_MS);
  };
  armIdle();

  ws.on("error", (err) => {
    log("ws_error", { id, tag, code: err && err.code, message: err && err.message });
    cleanup("ws_error");
    try {
      ws.terminate();
    } catch {
      /* already destroyed */
    }
  });

  ws.on("close", (code) => cleanup(`close_${code}`));
  ws.on("pong", () => {
    ws.isAlive = true;
  });

  try {
    proc = pty.spawn(GAME_BIN, [], {
      name: "xterm-256color",
      cols: 80,
      rows: 24,
      cwd: "/tmp",
      // The game inherits nothing from the container environment.
      env: {
        TERM: "xterm-256color",
        PATH: "/usr/local/bin:/usr/bin:/bin",
        HOME: "/tmp",
        LANG: "C.UTF-8",
      },
    });
  } catch (err) {
    log("spawn_failed", { id, tag, message: err && err.message });
    try {
      ws.send("\r\n\x1b[31mgame unavailable, try again later\x1b[0m\r\n");
    } catch {
      /* client already gone */
    }
    cleanup("spawn_failed");
    shut(1011, "spawn failed");
    return;
  }

  log("session_start", { id, tag, pid: proc.pid, open: clients.size });

  proc.onData((data) => {
    if (closed || ws.readyState !== ws.OPEN) return;
    ws.send(data);

    if (ws.bufferedAmount > BACKPRESSURE_KILL_BYTES) {
      log("backpressure_kill", { id, tag, buffered: ws.bufferedAmount });
      cleanup("backpressure");
      ws.terminate();
      return;
    }
    if (!paused && ws.bufferedAmount > BACKPRESSURE_PAUSE_BYTES) {
      paused = true;
      proc.pause();
      drainTimer = setInterval(() => {
        if (closed) {
          clearInterval(drainTimer);
          return;
        }
        if (ws.bufferedAmount < BACKPRESSURE_PAUSE_BYTES / 2) {
          clearInterval(drainTimer);
          drainTimer = null;
          paused = false;
          if (proc) proc.resume();
        }
      }, DRAIN_POLL_MS);
    }
  });

  proc.onExit(({ exitCode, signal }) => {
    log("game_exit", { id, tag, exitCode, signal });
    cleanup("game_exit");
    shut(1000, "game over");
  });

  ws.on("message", (data, isBinary) => {
    if (closed || !proc) return;
    if (isBinary) return;

    const now = Date.now();
    tokens = Math.min(
      INPUT_BURST_BYTES,
      tokens + ((now - lastRefill) / 1000) * INPUT_BYTES_PER_SEC
    );
    lastRefill = now;
    if (data.length > tokens) {
      end("input_flood", 1008, "too fast");
      return;
    }
    tokens -= data.length;

    armIdle();
    try {
      proc.write(data.toString("utf8"));
    } catch (err) {
      log("pty_write_failed", { id, tag, message: err && err.message });
      cleanup("pty_write_failed");
      shut(1011, "game gone");
    }
  });
}

const heartbeat = setInterval(() => {
  for (const ws of clients) {
    if (ws.isAlive === false) {
      log("heartbeat_timeout", { id: ws.sessionId });
      ws.terminate();
      continue;
    }
    ws.isAlive = false;
    try {
      ws.ping();
    } catch {
      ws.terminate();
    }
  }
}, PING_INTERVAL_MS);
heartbeat.unref();

let shuttingDown = false;
function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  log("shutdown", { signal, open: clients.size });
  clearInterval(heartbeat);
  clearInterval(pruneTimer);
  server.close();
  for (const ws of clients) {
    try {
      ws.close(1012, "restarting");
    } catch {
      /* ignore */
    }
  }
  const poll = setInterval(() => {
    if (clients.size === 0) {
      clearInterval(poll);
      log("shutdown_complete", { signal });
      process.exit(0);
    }
  }, 100);
  setTimeout(() => {
    for (const ws of clients) ws.terminate();
    log("shutdown_forced", { signal });
    process.exit(0);
  }, SHUTDOWN_GRACE_MS).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Exit on the structured log, not a bare stack on stderr: this line is the only
// record of why the process died.
process.on("uncaughtException", (err) => {
  log("uncaught_exception", { message: err && err.message, stack: err && err.stack });
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  log("unhandled_rejection", { reason: String(reason) });
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  log("listening", {
    port: PORT,
    host: HOST,
    origins: [...ALLOWED_ORIGINS],
    maxConnections: MAX_CONNECTIONS,
    maxPerIp: MAX_CONNECTIONS_PER_IP,
  });
});
