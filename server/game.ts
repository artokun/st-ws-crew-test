import { Server } from "bun";
import { broadcast } from "./wss";
import {
  Commands,
  DefaultSchedule,
  Entity,
  Query,
  StartSchedule,
  With,
  World,
  applyCommands,
  struct,
} from "thyseus";

export class GameServer {
  constructor(wss: Server) {
    broadcast("GameServer created");
  }
}

@struct
class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

@struct
class Position extends Vec2 {}

@struct
class Velocity extends Vec2 {}

@struct
class Player {
  name: string = "test";
  id: Entity = new Entity();
}

function helloSystem() {
  console.log("hello");
}

function spawnSystem(commands: Commands) {
  const entity = commands.spawn();
  entity.addType(Player).add(new Position(0, 0)).add(new Velocity(1, 1));
  console.log("spawned entity", entity.id);
}

function moveSystem(
  players: Query<[Player, Position, Velocity], With<Position, Velocity>>
) {
  for (const [player, pos, vel] of players) {
    pos.x += vel.x;
    pos.y += vel.y;
    console.log(player.name, pos.x, pos.y, vel.x, vel.y);
  }
}

function gameLoopSystem(world: World) {
  async function loop() {
    await world.runSchedule(DefaultSchedule);
    setTimeout(loop, 1000);
  }
  loop();
}

const world = await World.new()
  .addSystemsToSchedule(
    StartSchedule,
    spawnSystem,
    applyCommands,
    gameLoopSystem
  )
  .addSystems(helloSystem, moveSystem)
  .build();

world.start();
