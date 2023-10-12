import { ServerParams } from "./types";
import { serveWebsocket } from "./wss";

export const server = Bun.serve<ServerParams>({
  port: 3001,
  fetch: (req, server) => {
    // TODO: Set up a pub/sub system for the server
    // https://bun.sh/docs/api/websockets#pub-sub
    if (
      server.upgrade(req, {
        data: {},
      })
    ) {
      return;
    }

    return new Response("Upgrade failed :(", { status: 500 });
  },
  websocket: serveWebsocket,
});

console.log(`WSS Listening on ws://localhost:${server.port}`);
