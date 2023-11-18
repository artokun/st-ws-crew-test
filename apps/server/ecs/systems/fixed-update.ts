import { Mut, Res, SystemRes, World, f32, struct } from "thyseus";
import { FIXED_STEP_MS, schedules } from "../constants";
import { FixedTime } from "../resources/fixed-time";

@struct
class Data {
  loop: f32 = 0;
  update: f32 = 0;
}

/**
 * Runs the fixed update system, which updates the game state at a fixed time step.
 * @param data The system data.
 * @param time The fixed time resource.
 * @param world The ECS world.
 */
export async function fixedUpdateSystem(
  data: SystemRes<Data>,
  time: Res<Mut<FixedTime>>,
  world: World
) {
  const now = performance.now();
  const delta = now - data.loop;

  data.loop = now;
  data.update += delta;

  time.delta = FIXED_STEP_MS / 1000;

  while (data.update >= FIXED_STEP_MS) {
    time.value = now - data.update;

    // @ts-expect-error
    time.serialize();

    await world.runSchedule(schedules.FixedUpdate);

    data.update -= FIXED_STEP_MS;
  }
}
