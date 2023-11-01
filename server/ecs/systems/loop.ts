import { World, DefaultSchedule } from "thyseus";

export function loopSystem(world: World) {
  async function loop() {
    await world.runSchedule(DefaultSchedule);
    setTimeout(loop, 1000 / 60);
  }
  loop();
}
