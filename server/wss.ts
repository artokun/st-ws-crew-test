import { ServerWebSocket, WebSocketHandler } from "bun";
import { ServerParams } from "./types";
import { wss } from ".";

export const serveWebsocket: WebSocketHandler<ServerParams> = {
  perMessageDeflate: true,
  open: async (ws) => {
    ws.subscribe("server");
    send(ws, ws.data.id);
  },
  close: async (ws) => {
    ws.unsubscribe("server");
  },
  async message(ws, message) {
    if (message === "ping") {
      ws.send("pong");
    }
  },
};

export const broadcast = (message: string, sender = "server:broadcast") => {
  wss.publish(sender, JSON.stringify({ sender, message }));
  console.log(`Broadcast: ${message}`);
};

export const send = (
  ws: ServerWebSocket<ServerParams>,
  message: string,
  sender = "server:direct"
) => {
  ws.send(JSON.stringify({ sender, message }));
};
