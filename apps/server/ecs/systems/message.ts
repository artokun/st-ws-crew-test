import { Query, Res } from 'thyseus';
import * as flatbuffers from 'flatbuffers';
import { Client } from '../entities/client';
import { WSS } from '../resources/wss';
import { Message, MessageType, ServerStatEvent } from 'models/message';

function createServerStatsMessageBuffer(clientsConnected: number) {
  const builder = new flatbuffers.Builder(1);
  ServerStatEvent.startServerStatEvent(builder);
  ServerStatEvent.addClientsConnected(builder, clientsConnected);
  const serverStatFb = ServerStatEvent.endServerStatEvent(builder);
  Message.startMessage(builder);
  Message.addMessageType(builder, MessageType.ServerStatEvent);
  Message.addMessage(builder, serverStatFb);
  const messageFb = Message.endMessage(builder);
  builder.finish(messageFb);
  return builder.asUint8Array();
}

export async function messageSystem(clients: Query<Client>, wss: Res<WSS>) {
  const serverStatsBuffer = createServerStatsMessageBuffer(clients.length);
  wss.broadcastBuffer(serverStatsBuffer);
}
