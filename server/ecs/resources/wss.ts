import { randomUUID } from "crypto";
import { ServerParams } from "../../types";
import { Server, ServerWebSocket } from "bun";
import { Entity, struct } from "thyseus";
import { Position } from "../components/position";

let wss: Server;

@struct
export class WSS {
  async initialize() {
    wss = Bun.serve<ServerParams>({
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
      websocket: {
        perMessageDeflate: true,
        open: async (ws) => {
          ws.subscribe("server");
          this.send(ws, ws.data.id);
        },
        close: async (ws) => {
          ws.unsubscribe("server");
        },
        async message(ws, message) {
          if (message === "ping") {
            ws.send("pong");
          }
        },
      },
    });
  }

  get port(): number {
    return wss.port;
  }

  send(ws: ServerWebSocket<ServerParams>, message: string, sender = "server") {
    ws.send(JSON.stringify({ sender, message }));
  }

  broadcast(message: string, sender = "server") {
    wss.publish(sender, JSON.stringify({ sender, message }));
    console.log(`Broadcast (${sender}): ${message}`);
  }

  moveEntity(entity: Readonly<Entity>, pos: Position) {
    wss.publish(
      "server",
      new Float32Array([
        ActionType.Move,
        parseInt(entity.id.toString(), 10),
        pos.x,
        pos.y,
      ]).buffer
    );
  }
}

export enum ActionType {
  Add,
  Remove,
  Move,
}
