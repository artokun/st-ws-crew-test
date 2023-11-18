import { Query, With } from 'thyseus';
import { Velocity } from '../components/velocity';
import { Position } from '../components/position';
import { IsUnit } from '../components/is-unit';

export function moveSystem(players: Query<[Position, Velocity], With<Position, Velocity, IsUnit>>) {
  for (const [pos, vel] of players) {
    pos.add(vel);
  }
}
