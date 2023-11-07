import { Commands } from "thyseus";
import { Position } from "../components/position";
import { IsPlayer } from "../components/is-player";
import { Velocity } from "../components/velocity";

export function spawnSystem(commands: Commands) {
  commands.spawn().addType(IsPlayer).add(Position.from(0, 0));
}
