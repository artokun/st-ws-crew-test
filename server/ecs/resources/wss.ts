import { randomUUID } from "crypto";
import { ServerParams } from "../../types";
import { Server, ServerWebSocket } from "bun";
import { Entity, struct } from "thyseus";
import { Position } from "../components/position";
import { emitter } from "../../emitter";

let wss: Server;
let clients = new Map<string, ServerWebSocket<ServerParams>>([]);

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
          clients.set(ws.data.id, ws);
        },
        close: async (ws) => {
          ws.unsubscribe("server");
          clients.delete(ws.data.id);
          emitter.clientDisconnected(ws.data.id);
        },
        async message(ws, message) {
          if (message === "ping") {
            ws.send("pong");
          }
          if (message === "connected") {
            emitter.clientConnected(ws.data.id);
          }
        },
      },
    });
  }

  get port(): number {
    return wss.port;
  }

  send(clientId: string, message: string, sender = "server") {
    const ws = clients.get(clientId);
    if (ws) {
      console.log(`Send (${sender}) to (${clientId}): ${message}`);
      ws.send(JSON.stringify({ sender, message }));
    }
  }

  broadcast(message: string, sender = "server") {
    wss.publish(sender, JSON.stringify({ sender, message }));
    console.log(`Broadcast (${sender}): ${message}`);
  }

  // [ActionType.InitialState, pos.length, id, x, y, id, x, y, ...]
  sendInitialState(
    clientId: string,
    positions: { id: string; position: { x: number; y: number } }[]
  ) {
    const ws = clients.get(clientId);
    if (ws) {
      const positionsArray = new Float32Array(positions.length * 3);
      positions.forEach((p, i) => {
        positionsArray[i * 3] = parseInt(p.id, 10);
        positionsArray[i * 3 + 1] = p.position.x;
        positionsArray[i * 3 + 2] = p.position.y;
      });
      const data = new Float32Array([
        ActionType.InitialState,
        positions.length,
        ...positionsArray,
      ]);
      ws.send(data);
    }
  }
  // [ActionType.Add, id, x, y]
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
  InitialState,
}
