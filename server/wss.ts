import { ServerWebSocket, WebSocketHandler } from "bun";
import { ServerParams } from "./types";
import { FSWatcher, watch } from "fs";

declare global {
  var ws: ServerWebSocket<unknown> | undefined;
}

export const serveWebsocket: WebSocketHandler<ServerParams> = {
  open: async (ws) => {
    globalThis.ws = ws;
    const watcher = watch("./", { recursive: true });

    if (watcher)
      watcher.on("change", async () => {
        ws.send("reload");
      });
  },
  async message(ws, message) {
    console.log(`Received: ${message}`);
  },
};
