// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Client } from '../../flatbuffers/message/client.js';


export class InitClientEvent {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):InitClientEvent {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsInitClientEvent(bb:flatbuffers.ByteBuffer, obj?:InitClientEvent):InitClientEvent {
  return (obj || new InitClientEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsInitClientEvent(bb:flatbuffers.ByteBuffer, obj?:InitClientEvent):InitClientEvent {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new InitClientEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

client(obj?:Client):Client|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new Client()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

static startInitClientEvent(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addClient(builder:flatbuffers.Builder, clientOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, clientOffset, 0);
}

static endInitClientEvent(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createInitClientEvent(builder:flatbuffers.Builder, clientOffset:flatbuffers.Offset):flatbuffers.Offset {
  InitClientEvent.startInitClientEvent(builder);
  InitClientEvent.addClient(builder, clientOffset);
  return InitClientEvent.endInitClientEvent(builder);
}
}