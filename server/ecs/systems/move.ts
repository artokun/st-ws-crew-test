import { Commands, Entity, Query, Res, With } from "thyseus";
import { Velocity } from "../components/velocity";
import { Position } from "../components/position";
import { WSS } from "../resources/wss";
import { IsPlayer } from "../components/is-player";

export function moveSystem(
  commands: Commands,
  players: Query<
    [Entity, Position, Velocity],
    With<Position, Velocity, IsPlayer>
  >,
  server: Res<WSS>
) {
  for (const [entity, pos, vel] of players) {
    pos.add(vel);
    server.moveEntity(entity, pos);
  }
}
