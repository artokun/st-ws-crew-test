import { struct } from 'thyseus';

@struct
export class Client {
  id: string;
  name: string;

  constructor(id = '') {
    this.id = id;
    this.name = '';
  }

  setName(name: string) {
    this.name = name;
  }
}
