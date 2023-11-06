import { struct } from "thyseus";

@struct
export class Client {
  wsClientId: string = "";

  static from(wsClientId: string): Client {
    return Object.assign(new this(), { wsClientId });
  }
}
