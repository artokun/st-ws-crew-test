// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { ClientUpdateEvent, ClientUpdateEventT } from '../../flatbuffers/message/client-update-event.js';
import { InitClientEvent, InitClientEventT } from '../../flatbuffers/message/init-client-event.js';
import { InitStateEvent, InitStateEventT } from '../../flatbuffers/message/init-state-event.js';
import { MessageType, unionToMessageType, unionListToMessageType } from '../../flatbuffers/message/message-type.js';
import { NoOpEvent, NoOpEventT } from '../../flatbuffers/message/no-op-event.js';
import { ServerStatEvent, ServerStatEventT } from '../../flatbuffers/message/server-stat-event.js';


export class Message implements flatbuffers.IUnpackableObject<MessageT> {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Message {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsMessage(bb:flatbuffers.ByteBuffer, obj?:Message):Message {
  return (obj || new Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsMessage(bb:flatbuffers.ByteBuffer, obj?:Message):Message {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

messageType():MessageType {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : MessageType.NONE;
}

message<T extends flatbuffers.Table>(obj:any):any|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__union(obj, this.bb_pos + offset) : null;
}

static startMessage(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addMessageType(builder:flatbuffers.Builder, messageType:MessageType) {
  builder.addFieldInt8(0, messageType, MessageType.NONE);
}

static addMessage(builder:flatbuffers.Builder, messageOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, messageOffset, 0);
}

static endMessage(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishMessageBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedMessageBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}

static createMessage(builder:flatbuffers.Builder, messageType:MessageType, messageOffset:flatbuffers.Offset):flatbuffers.Offset {
  Message.startMessage(builder);
  Message.addMessageType(builder, messageType);
  Message.addMessage(builder, messageOffset);
  return Message.endMessage(builder);
}

unpack(): MessageT {
  return new MessageT(
    this.messageType(),
    (() => {
      const temp = unionToMessageType(this.messageType(), this.message.bind(this));
      if(temp === null) { return null; }
      return temp.unpack()
  })()
  );
}


unpackTo(_o: MessageT): void {
  _o.messageType = this.messageType();
  _o.message = (() => {
      const temp = unionToMessageType(this.messageType(), this.message.bind(this));
      if(temp === null) { return null; }
      return temp.unpack()
  })();
}
}

export class MessageT implements flatbuffers.IGeneratedObject {
constructor(
  public messageType: MessageType = MessageType.NONE,
  public message: ClientUpdateEventT|InitClientEventT|InitStateEventT|NoOpEventT|ServerStatEventT|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const message = builder.createObjectOffset(this.message);

  return Message.createMessage(builder,
    this.messageType,
    message
  );
}
}
