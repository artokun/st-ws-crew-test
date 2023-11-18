import { World, DefaultSchedule } from 'thyseus';
import { LOOP_STEP_MS } from '../constants';

/**
 * Runs the default schedule in a loop with a fixed time step.
 * @param world The world to run the schedule on.
 */
export function loopSystem(world: World) {
  async function loop() {
    await world.runSchedule(DefaultSchedule);
    setTimeout(loop, LOOP_STEP_MS);
  }
  loop();
}
