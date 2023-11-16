import { Commands } from "thyseus";
import { Position } from "../components/position";
import { IsUnit } from "../components/is-unit";
import { ControlledBy } from "../components/controlled-by";

export function spawnSystem(commands: Commands) {
  commands
    .spawn()
    .addType(IsUnit)
    .add(Position.from(0, 0))
    .addType(ControlledBy);
  commands
    .spawn()
    .addType(IsUnit)
    .add(Position.from(-100, 0))
    .addType(ControlledBy);
  commands
    .spawn()
    .addType(IsUnit)
    .add(Position.from(100, 0))
    .addType(ControlledBy);
}
