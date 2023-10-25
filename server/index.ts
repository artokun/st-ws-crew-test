import { randomUUID } from "crypto";
import { GameServer } from "./game";
import { ServerParams } from "./types";
import { serveWebsocket } from "./wss";

export const wss = Bun.serve<ServerParams>({
  port: 3001,
  fetch: (req, server) => {
    // TODO: Set up a pub/sub system for the server
    // https://bun.sh/docs/api/websockets#pub-sub
    if (
      server.upgrade(req, {
        data: {
          id: randomUUID(),
        },
      })
    ) {
      return;
    }

    return new Response("Upgrade failed :(", { status: 500 });
  },
  websocket: serveWebsocket,
});

console.log(`WSS Listening on ws://localhost:${wss.port}`);

const gameServer = new GameServer(wss);
