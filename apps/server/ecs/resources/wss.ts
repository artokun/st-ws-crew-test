import { ServerParams } from "../../types";
import { Server, ServerWebSocket } from "bun";
import { struct } from "thyseus";
import { emitter } from "../../emitter";
import { randomUUID } from "crypto";

let clients: Map<string, ServerWebSocket<ServerParams>>;
let wss: Server;

@struct
export class WSS {
  async initialize() {
    clients = new Map<string, ServerWebSocket<ServerParams>>();
    wss = Bun.serve<ServerParams>({
      port: 3001,
      fetch: (req, server) => {
        if (
          server.upgrade(req, {
            data: {
              id: randomUUID(),
              authToken: null,
            },
          })
        ) {
          return;
        }
        return new Response("Upgrade failed :(", { status: 500 });
      },
      websocket: {
        open: async (ws) => {
          ws.subscribe("server");
          clients.set(ws.data.id, ws);
        },
        close: async (ws) => {
          clients.delete(ws.data.id);
          emitter.clientDisconnected(ws);
        },
        async message(ws, message) {
          if (message === "ping") {
            ws.send("pong");
          }
          if (message === "connected") {
            emitter.clientConnected(ws);
          }
        },
      },
    });
  }

  get clients() {
    return clients;
  }

  get port(): number {
    return wss.port;
  }

  send(clientId: string, message: string, sender = "server") {
    const ws = clients.get(clientId);
    if (ws) {
      ws.send(JSON.stringify({ sender, message }));
      // console.debug(`Send (${sender}) to (${clientId}): ${message}`);
    }
  }

  broadcast(message: string | object, sender = "server") {
    wss.publish(sender, JSON.stringify({ sender, message }));
    // console.debug(`Broadcast (${sender}): ${JSON.stringify(message)}`);
  }

  broadcastBuffer(buffer: Uint8Array, topic = "server") {
    wss.publish(topic, buffer, true);
  }

  sendBuffer(buffer: Uint8Array, clientId: string) {
    const ws = clients.get(clientId);
    if (ws) {
      ws.sendBinary(buffer, true);
    }
  }
}
