// automatically generated by the FlatBuffers compiler, do not modify

import { ClientUpdateEvent, ClientUpdateEventT } from '../message/client-update-event.js';
import { InitClientEvent, InitClientEventT } from '../message/init-client-event.js';
import { InitStateEvent, InitStateEventT } from '../message/init-state-event.js';
import { NoOpEvent, NoOpEventT } from '../message/no-op-event.js';
import { ServerStatEvent, ServerStatEventT } from '../message/server-stat-event.js';


export enum MessageType {
  NONE = 0,
  NoOpEvent = 1,
  InitClientEvent = 2,
  InitStateEvent = 3,
  ClientUpdateEvent = 4,
  ServerStatEvent = 5
}

export function unionToMessageType(
  type: MessageType,
  accessor: (obj:ClientUpdateEvent|InitClientEvent|InitStateEvent|NoOpEvent|ServerStatEvent) => ClientUpdateEvent|InitClientEvent|InitStateEvent|NoOpEvent|ServerStatEvent|null
): ClientUpdateEvent|InitClientEvent|InitStateEvent|NoOpEvent|ServerStatEvent|null {
  switch(MessageType[type]) {
    case 'NONE': return null; 
    case 'NoOpEvent': return accessor(new NoOpEvent())! as NoOpEvent;
    case 'InitClientEvent': return accessor(new InitClientEvent())! as InitClientEvent;
    case 'InitStateEvent': return accessor(new InitStateEvent())! as InitStateEvent;
    case 'ClientUpdateEvent': return accessor(new ClientUpdateEvent())! as ClientUpdateEvent;
    case 'ServerStatEvent': return accessor(new ServerStatEvent())! as ServerStatEvent;
    default: return null;
  }
}

export function unionListToMessageType(
  type: MessageType, 
  accessor: (index: number, obj:ClientUpdateEvent|InitClientEvent|InitStateEvent|NoOpEvent|ServerStatEvent) => ClientUpdateEvent|InitClientEvent|InitStateEvent|NoOpEvent|ServerStatEvent|null, 
  index: number
): ClientUpdateEvent|InitClientEvent|InitStateEvent|NoOpEvent|ServerStatEvent|null {
  switch(MessageType[type]) {
    case 'NONE': return null; 
    case 'NoOpEvent': return accessor(index, new NoOpEvent())! as NoOpEvent;
    case 'InitClientEvent': return accessor(index, new InitClientEvent())! as InitClientEvent;
    case 'InitStateEvent': return accessor(index, new InitStateEvent())! as InitStateEvent;
    case 'ClientUpdateEvent': return accessor(index, new ClientUpdateEvent())! as ClientUpdateEvent;
    case 'ServerStatEvent': return accessor(index, new ServerStatEvent())! as ServerStatEvent;
    default: return null;
  }
}
