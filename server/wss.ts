import { ServerWebSocket, WebSocketHandler } from "bun";
import { ServerParams } from "./types";

declare global {
  var ws: ServerWebSocket<unknown> | undefined;
}

export const serveWebsocket: WebSocketHandler<ServerParams> = {
  perMessageDeflate: true,
  open: async (ws) => {
    globalThis.ws = ws;

    ws.send("Hello from the server!");
  },
  async message(ws, message) {
    if (message === "ping") {
      ws.send("pong");
    }
  },
};
