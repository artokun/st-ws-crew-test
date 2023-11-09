import { EventWriter, struct } from "thyseus";
import { emitter } from "../../emitter";
import { ServerWebSocket } from "bun";
import { ServerParams } from "../../types";

@struct
export class ConnectEvent {
  clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }
}

@struct
export class DisconnectEvent {
  clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }
}

export function websocketListenerSystem(
  connectEvent: EventWriter<ConnectEvent>,
  disconectEvent: EventWriter<DisconnectEvent>
) {
  function connectHandler(ws: ServerWebSocket<ServerParams>) {
    connectEvent.create(new ConnectEvent(ws.data.id));
  }

  function disconnectHandler(ws: ServerWebSocket<ServerParams>) {
    disconectEvent.create(new DisconnectEvent(ws.data.id));
  }

  emitter.onClientConnected(connectHandler);
  emitter.onClientDisconnected(disconnectHandler);
}
