import { Container, Sprite } from "pixi.js";
import { IScene, Manager } from "../Manager";

export class GameScene extends Container implements IScene {
  private clampy: Sprite;

  constructor() {
    super(); // Mandatory! This calls the superclass constructor.

    // This creates a texture from a 'bunny.png' image
    this.clampy = Sprite.from("bunny");

    this.clampy.anchor.set(0.5);
    this.clampy.x = Manager.width / 2;
    this.clampy.y = Manager.height / 2;
    this.addChild(this.clampy);
  }

  update(framesPassed: number): void {
    // We can use clampy here because it is a class member!
    this.clampy.rotation += 0.01;
  }

  resize(screenWidth: number, screenHeight: number): void {
    // We can use clampy here because it is a class member!
    this.clampy.x = screenWidth / 2;
    this.clampy.y = screenHeight / 2;
  }
}
