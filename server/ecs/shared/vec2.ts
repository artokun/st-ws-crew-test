import { struct, f64 } from "thyseus";

@struct
export class Vec2 {
  x: f64 = 0;
  y: f64 = 0;

  static from(x: f64, y: f64): Vec2 {
    return Object.assign(new this(), { x, y });
  }

  add(vec: Vec2): Vec2 {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }
}
