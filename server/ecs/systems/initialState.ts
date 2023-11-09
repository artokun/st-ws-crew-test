import { Commands, Entity, EventReader, Query, Res, With } from "thyseus";
import flatbuffers from "flatbuffers";
import { ConnectEvent, DisconnectEvent } from "../events/connectionEvents";
import { WSS } from "../resources/wss";
import { Client } from "../entities/client";
import {
  Client as ClientFB,
  InitClientEvent,
  Message,
  MessageType,
} from "../../flatbuffers/message";

export function handleClientConnectSystem(
  connectEvents: EventReader<ConnectEvent>,
  commands: Commands,
  wss: Res<WSS>
) {
  if (connectEvents.length === 0) return;

  for (const client of connectEvents) {
    commands.spawn().add(new Client(client.clientId));
    console.log("spawned", client.clientId);

    // Build Message ... tediously
    const builder = new flatbuffers.Builder(1);
    const id = builder.createString(client.clientId);
    ClientFB.startClient(builder);
    ClientFB.addId(builder, id);
    const clientFb = ClientFB.endClient(builder);
    InitClientEvent.startInitClientEvent(builder);
    InitClientEvent.addClient(builder, clientFb);
    const eventFb = InitClientEvent.endInitClientEvent(builder);
    Message.startMessage(builder);
    Message.addMessageType(builder, MessageType.InitClientEvent);
    Message.addMessage(builder, eventFb);
    const messageFb = Message.endMessage(builder);
    builder.finish(messageFb);
    const messageBuffer = builder.asUint8Array();
    wss.sendBuffer(messageBuffer, client.clientId);
    wss.broadcast(`Client ${client.clientId} connected`);
  }

  connectEvents.clear();
}

export function handleClientDisconnectSystem(
  commands: Commands,
  clients: Query<[Entity, Client], With<Client>>,
  disconnectEvents: EventReader<DisconnectEvent>,
  wss: Res<WSS>
) {
  if (disconnectEvents.length === 0) return;

  const disconnectingClients = [];
  for (const disconnectClient of disconnectEvents) {
    disconnectingClients.push(disconnectClient.clientId);
  }

  if (disconnectingClients.length > 0) {
    for (const [entity, client] of clients) {
      console.log(disconnectingClients, client.id);
      if (disconnectingClients.includes(client.id)) {
        commands.despawn(entity);
        console.log("despawned", client.id);
        wss.broadcast(`Client ${client.id} disconnected`);
      }
    }
  }

  disconnectEvents.clear();
}
