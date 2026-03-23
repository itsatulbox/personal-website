const { WebSocketServer } = require("ws");
const pty = require("node-pty");

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

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
