import { Commands, Res } from "thyseus";
import { Position } from "../components/position";
import { Velocity } from "../components/velocity";
import { IsPlayer } from "../components/is-player";
import { WSS } from "../resources/wss";

export function spawnSystem(commands: Commands, wss: Res<WSS>) {
  for (let i = 0; i < 4; i++) {
    const pos = Position.from(0, 0);
    commands
      .spawn()
      .addType(IsPlayer)
      .add(pos)
      .add(Velocity.from(1, 1 + i * 0.5));
  }
}
