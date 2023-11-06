import { Commands, Entity, EventReader, Query, Res, With } from "thyseus";
import { ConnectEvent, DisconnectEvent } from "../events/connectionEvents";
import { WSS } from "../resources/wss";
import { Client } from "../entities/client";

export function initialStateSystem(
  commands: Commands,
  connectEvents: EventReader<ConnectEvent>,
  clients: Query<[Entity, Client], With<Client>>,
  disconnectEvents: EventReader<DisconnectEvent>,
  wss: Res<WSS>
) {
  for (const client of connectEvents) {
    commands.spawn().add(Client.from(client.wsClientId));
    wss.send(client.wsClientId, "hello");
  }

  connectEvents.clear();

  const disconnectingClients = [];
  for (const initialStateEvent of disconnectEvents) {
    disconnectingClients.push(initialStateEvent.wsClientId);
  }

  if (disconnectingClients.length > 0) {
    for (const [entity, client] of clients) {
      if (disconnectingClients.includes(client.wsClientId)) {
        commands.despawn(entity);
      }
    }
  }

  disconnectEvents.clear();
}
