import { struct } from 'thyseus';

@struct
export class ControlledBy {
  clientId: string;

  constructor(clientId: string = '') {
    this.clientId = clientId;
  }
}
