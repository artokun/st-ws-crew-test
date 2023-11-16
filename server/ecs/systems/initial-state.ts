import { Commands, Entity, EventReader, Or, Query, Res, With } from "thyseus";
import flatbuffers from "flatbuffers";
import { ConnectEvent, DisconnectEvent } from "../events/connectionEvents";
import { WSS } from "../resources/wss";
import { Client } from "../entities/client";
import {
  Client as ClientFB,
  InitClientEvent,
  Message,
  MessageType,
  Unit,
  Vec2,
} from "../../flatbuffers/message";
import { IsUnit } from "../components/is-unit";
import { Position } from "../components/position";
import { InitStateEvent } from "../../../src/flatbuffers/message";
import { ControlledBy } from "../components/controlled-by";

function createClientIdMessageBuffer(clientId: string) {
  const builder = new flatbuffers.Builder(1);
  const id = builder.createString(clientId);
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
  return builder.asUint8Array();
}

function createUnitPositionMessageBuffer(
  units: Query<[Entity, Position, ControlledBy], With<IsUnit>>
) {
  const builder = new flatbuffers.Builder(1);
  const unitsVector = [];
  for (const [entity, position, controlledBy] of units) {
    const x = position.x;
    const y = position.y;
    const controlledById = builder.createString(controlledBy.clientId ?? "");
    Unit.startUnit(builder);
    Unit.addId(builder, Number(entity.id));
    Unit.addPosition(builder, Vec2.createVec2(builder, x, y));
    Unit.addControlledBy(builder, controlledById); // TODO
    unitsVector.push(Unit.endUnit(builder));
  }
  const unitsVectorOffset = InitStateEvent.createUnitsVector(
    builder,
    unitsVector
  );

  InitStateEvent.startInitStateEvent(builder);
  InitStateEvent.addUnits(builder, unitsVectorOffset);
  const initStateFb = InitStateEvent.endInitStateEvent(builder);

  Message.startMessage(builder);
  Message.addMessageType(builder, MessageType.InitStateEvent);
  Message.addMessage(builder, initStateFb);
  const messageFb = Message.endMessage(builder);
  builder.finish(messageFb);
  return builder.asUint8Array();
}

export function handleClientConnectSystem(
  connectEvents: EventReader<ConnectEvent>,
  units: Query<[Entity, Position, ControlledBy], With<IsUnit>>,
  commands: Commands,
  wss: Res<WSS>
) {
  if (connectEvents.length === 0) return;

  for (const client of connectEvents) {
    commands.spawn().add(new Client(client.clientId));
    console.log("client", client.clientId.split("-")[4], "connected");

    const messageBuffer = createClientIdMessageBuffer(client.clientId);
    wss.sendBuffer(messageBuffer, client.clientId);

    const unitPositionMessageBuffer = createUnitPositionMessageBuffer(units);
    wss.sendBuffer(unitPositionMessageBuffer, client.clientId);

    wss.broadcast({ type: "CLIENT_JOINED", data: client.clientId });
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
      if (disconnectingClients.includes(client.id)) {
        commands.despawn(entity);
        const clientId = disconnectingClients.find(
          (id) => id === client.id
        ) as string;
        console.log("client", clientId.split("-")[4], "disconnected");
        wss.broadcast({ type: "CLIENT_LEFT", data: clientId }, "server");
      }
    }
  }

  disconnectEvents.clear();
}
