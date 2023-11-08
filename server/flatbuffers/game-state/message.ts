// automatically generated by the FlatBuffers compiler, do not modify

import { MoveToMessage, MoveToMessageT } from '../../flatbuffers/game-state/move-to-message.js';
import { SelectMessage, SelectMessageT } from '../../flatbuffers/game-state/select-message.js';


export enum Message {
  NONE = 0,
  SelectMessage = 1,
  MoveToMessage = 2
}

export function unionToMessage(
  type: Message,
  accessor: (obj:MoveToMessage|SelectMessage) => MoveToMessage|SelectMessage|null
): MoveToMessage|SelectMessage|null {
  switch(Message[type]) {
    case 'NONE': return null; 
    case 'SelectMessage': return accessor(new SelectMessage())! as SelectMessage;
    case 'MoveToMessage': return accessor(new MoveToMessage())! as MoveToMessage;
    default: return null;
  }
}

export function unionListToMessage(
  type: Message, 
  accessor: (index: number, obj:MoveToMessage|SelectMessage) => MoveToMessage|SelectMessage|null, 
  index: number
): MoveToMessage|SelectMessage|null {
  switch(Message[type]) {
    case 'NONE': return null; 
    case 'SelectMessage': return accessor(index, new SelectMessage())! as SelectMessage;
    case 'MoveToMessage': return accessor(index, new MoveToMessage())! as MoveToMessage;
    default: return null;
  }
}
