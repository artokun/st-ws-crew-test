import { ServerParams } from "./types";
import { serveStatic } from "./utils";
import { serveWebsocket } from "./wss";

export const server = Bun.serve<ServerParams>({
  fetch: serveStatic,
  websocket: serveWebsocket,
});

console.log(`Listening on localhost:${server.port}`);
