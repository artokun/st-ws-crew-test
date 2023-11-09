// automatically generated by the FlatBuffers compiler, do not modify

import { InitClientEvent } from '../../flatbuffers/message/init-client-event.js';
import { InitStateEvent } from '../../flatbuffers/message/init-state-event.js';
import { NoOpEvent } from '../../flatbuffers/message/no-op-event.js';


export enum Event {
  NONE = 0,
  NoOpEvent = 1,
  InitClientEvent = 2,
  InitStateEvent = 3
}

export function unionToEvent(
  type: Event,
  accessor: (obj:InitClientEvent|InitStateEvent|NoOpEvent) => InitClientEvent|InitStateEvent|NoOpEvent|null
): InitClientEvent|InitStateEvent|NoOpEvent|null {
  switch(Event[type]) {
    case 'NONE': return null; 
    case 'NoOpEvent': return accessor(new NoOpEvent())! as NoOpEvent;
    case 'InitClientEvent': return accessor(new InitClientEvent())! as InitClientEvent;
    case 'InitStateEvent': return accessor(new InitStateEvent())! as InitStateEvent;
    default: return null;
  }
}

export function unionListToEvent(
  type: Event, 
  accessor: (index: number, obj:InitClientEvent|InitStateEvent|NoOpEvent) => InitClientEvent|InitStateEvent|NoOpEvent|null, 
  index: number
): InitClientEvent|InitStateEvent|NoOpEvent|null {
  switch(Event[type]) {
    case 'NONE': return null; 
    case 'NoOpEvent': return accessor(index, new NoOpEvent())! as NoOpEvent;
    case 'InitClientEvent': return accessor(index, new InitClientEvent())! as InitClientEvent;
    case 'InitStateEvent': return accessor(index, new InitStateEvent())! as InitStateEvent;
    default: return null;
  }
}
