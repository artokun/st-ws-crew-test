import { struct } from "thyseus";

@struct
export class Client {
  id: string;

  constructor(id = "") {
    this.id = id;
  }
}
