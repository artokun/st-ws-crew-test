import EventEmitter from 'eventemitter3';

export class SpaceTradersRT extends EventEmitter {
  private username: string;
  private isConnected = false;

  constructor(username: string) {
    super();
    this.username = username;
  }
}
