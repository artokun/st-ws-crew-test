import { Commands, Entity, EventReader, Query, Res, With } from "thyseus";
import { ConnectEvent, DisconnectEvent } from "../events/connectionEvents";
import { WSS } from "../resources/wss";
import { Client } from "../entities/client";
import { IsPlayer } from "../components/is-player";
import { Position } from "../components/position";

export function handleClientConnectSystem(
  commands: Commands,
  players: Query<[Entity, Position], With<IsPlayer, Position>>,
  connectEvents: EventReader<ConnectEvent>,
  wss: Res<WSS>
) {
  if (connectEvents.length === 0) return;

  const positions = [];

  for (const [entity, position] of players) {
    positions.push({
      id: entity.id.toString(),
      position: { x: position.x, y: position.y },
    });
  }

  for (const client of connectEvents) {
    commands.spawn().add(Client.from(client.wsClientId));
    wss.sendInitialState(client.wsClientId, positions);
    wss.broadcast(`Player ${client.wsClientId} connected`);
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
    disconnectingClients.push(disconnectClient.wsClientId);
  }

  if (disconnectingClients.length > 0) {
    for (const [entity, client] of clients) {
      if (disconnectingClients.includes(client.wsClientId)) {
        commands.despawn(entity);
        wss.broadcast(`Player ${client.wsClientId} disconnected`);
      }
    }
  }

  disconnectEvents.clear();
}
