import { EventWriter, struct } from "thyseus";
import { emitter } from "../../emitter";

@struct
export class ConnectEvent {
  wsClientId: string;

  constructor(wsClientId = "") {
    this.wsClientId = wsClientId;
  }
}

@struct
export class DisconnectEvent {
  wsClientId: string;

  constructor(wsClientId = "") {
    this.wsClientId = wsClientId;
  }
}

export function websocketListenerSystem(
  connectEvent: EventWriter<ConnectEvent>,
  disconectEvent: EventWriter<DisconnectEvent>
) {
  function connectHandler(clientId: string) {
    connectEvent.create(new ConnectEvent(clientId));
  }

  function disconnectHandler(clientId: string) {
    disconectEvent.create(new DisconnectEvent(clientId));
  }

  emitter.onClientConnected(connectHandler);
  emitter.onClientDisconnected(disconnectHandler);
}
