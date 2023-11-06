import { Commands } from "thyseus";
import { Position } from "../components/position";
import { IsPlayer } from "../components/is-player";

export function spawnSystem(commands: Commands) {
  commands.spawn().addType(IsPlayer).add(Position.from(-100, -100));
  commands.spawn().addType(IsPlayer).add(Position.from(-100, 0));
  commands.spawn().addType(IsPlayer).add(Position.from(0, 0));
  commands.spawn().addType(IsPlayer).add(Position.from(100, 100));
}
