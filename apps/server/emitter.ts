import { ServerWebSocket } from 'bun';
import EventEmitter3 from 'eventemitter3';
import { ServerParams } from './types';

export class Emitter extends EventEmitter3 {
  clientConnected(ws: ServerWebSocket<ServerParams>) {
    this.emit('client-connected', ws);
  }

  clientDisconnected(ws: ServerWebSocket<ServerParams>) {
    this.emit('client-disconnected', ws);
  }

  onClientConnected(listener: (ws: ServerWebSocket<ServerParams>) => void) {
    this.on('client-connected', listener);
  }

  onClientDisconnected(listener: (ws: ServerWebSocket<ServerParams>) => void) {
    this.on('client-disconnected', listener);
  }
}

export const emitter = new Emitter();
