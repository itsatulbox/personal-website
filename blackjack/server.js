const http = require("http");
const { WebSocketServer } = require("ws");
const pty = require("node-pty");

// Plain HTTP server: serves a CORS-enabled health endpoint the frontend probes
// to tell whether the self-hosted machine is online before opening a WebSocket.
const server = http.createServer((req, res) => {
  if (req.url === "/healthz" || req.url === "/") {
    res.writeHead(200, {
      "content-type": "text/plain",
      "access-control-allow-origin": "*",
    });
    res.end("ok");
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  const proc = pty.spawn("blackjack", [], {
    name: "xterm-256color",
    cols: 80,
    rows: 24,
  });

  proc.onData((data) => ws.send(data));
  proc.onExit(() => ws.close());
  ws.on("message", (msg) => proc.write(msg.toString()));
  ws.on("close", () => proc.kill());
});

server.listen(process.env.PORT || 8080);
