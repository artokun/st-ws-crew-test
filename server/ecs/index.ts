import { StartSchedule, World, applyCommands } from "thyseus";
import { loopSystem } from "./systems/loop";
import { moveSystem } from "./systems/move";
import { spawnSystem } from "./systems/spawn";
import { websocketSystem } from "./systems/websocket";

const world = await World.new()
  .addSystemsToSchedule(
    StartSchedule,
    websocketSystem,
    spawnSystem,
    applyCommands,
    loopSystem
  )
  .addSystems(moveSystem, applyCommands)
  .build();

world.start();
