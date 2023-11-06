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
    console.log("client connected", clientId);
    connectEvent.create(new ConnectEvent(clientId));
  }

  function disconnectHandler(clientId: string) {
    console.log("client disconnected", clientId);
    disconectEvent.create(new DisconnectEvent(clientId));
  }

  emitter.onClientConnected(connectHandler);
  emitter.onClientDisconnected(disconnectHandler);
}
