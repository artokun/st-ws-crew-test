import { Res } from 'thyseus';
import { WSS } from '../resources/wss';

export async function websocketSystem(wss: Res<WSS>) {
  await wss.initialize();
  console.log(`WSS Listening on ws://localhost:${wss.port}`);
}
