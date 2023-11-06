import EventEmitter3 from "eventemitter3";

export class Emitter extends EventEmitter3 {
  constructor() {
    super();
  }

  clientConnected(wsClientId: string) {
    this.emit("client-connected", wsClientId);
  }

  clientDisconnected(wsClientId: string) {
    this.emit("client-disconnected", wsClientId);
  }

  onClientConnected(listener: (wsClientId: string) => void) {
    this.on("client-connected", listener);
  }

  onClientDisconnected(listener: (wsClientId: string) => void) {
    this.on("client-disconnected", listener);
  }
}

export const emitter = new Emitter();
