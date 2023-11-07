import { StartSchedule, World, applyCommands } from "thyseus";
import { loopSystem } from "./systems/loop";
import { moveSystem } from "./systems/move";
import { spawnSystem } from "./systems/spawn";
import { websocketSystem } from "./systems/websocket";
import { websocketListenerSystem } from "./events/connectionEvents";
import {
  handleClientConnectSystem,
  handleClientDisconnectSystem,
} from "./systems/initialState";

const world = await World.new()
  .addSystemsToSchedule(
    StartSchedule,
    websocketSystem,
    websocketListenerSystem,
    spawnSystem,
    applyCommands,
    loopSystem
  )
  .addSystems(
    handleClientDisconnectSystem,
    handleClientConnectSystem,
    moveSystem,
    applyCommands
  )
  .build();

world.start();
