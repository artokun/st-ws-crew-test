import { Query, Res } from 'thyseus';
import { Client } from '../entities/client';
import { WSS } from '../resources/wss';

export async function messageSystem(clients: Query<Client>, wss: Res<WSS>) {
  wss.broadcast(
    {
      type: 'SERVER_STATS',
      data: {
        clients: clients.length,
      },
    },
    'server'
  );
}
