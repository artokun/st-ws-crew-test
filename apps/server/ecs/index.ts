import { StartSchedule, World, applyCommands } from 'thyseus';
import { loopSystem } from './systems/loop';
import { moveSystem } from './systems/move';
import { spawnSystem } from './systems/spawn';
import { websocketSystem } from './systems/websocket';
import { websocketListenerSystem } from './events/connectionEvents';
import { handleClientConnectSystem, handleClientDisconnectSystem } from './systems/initial-state';
import { fixedUpdateSystem } from './systems/fixed-update';
import { messageSystem } from './systems/message';
import { schedules } from './constants';

const world = await World.new()
  .addSystemsToSchedule(StartSchedule, websocketSystem, websocketListenerSystem, spawnSystem, applyCommands, loopSystem)
  .addSystemsToSchedule(schedules.FixedUpdate, messageSystem)
  .addSystems(handleClientDisconnectSystem, handleClientConnectSystem, moveSystem, fixedUpdateSystem, applyCommands)
  .build();

world.start();
