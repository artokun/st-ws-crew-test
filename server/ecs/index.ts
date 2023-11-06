import { StartSchedule, World, applyCommands } from "thyseus";
import { loopSystem } from "./systems/loop";
import { moveSystem } from "./systems/move";
import { spawnSystem } from "./systems/spawn";
import { websocketSystem } from "./systems/websocket";
import { websocketListenerSystem } from "./events/connectionEvents";
import { initialStateSystem } from "./systems/initialState";

const world = await World.new()
  .addSystemsToSchedule(
    StartSchedule,
    websocketSystem,
    websocketListenerSystem,
    spawnSystem,
    applyCommands,
    loopSystem
  )
  .addSystems(initialStateSystem, moveSystem, applyCommands)
  .build();

world.start();
