import { Container, IDestroyOptions, Sprite } from "pixi.js";
import { IScene, Manager } from "../Manager";

export class GameScene extends Container implements IScene {
  name: string = "GameScene";
  assetBundles: string[] = ["game", "sounds"];
  bunny!: Sprite;

  constructor() {
    super(); // Mandatory! This calls the superclass constructor.
  }

  constructorWithAwaits(): void {
    // This creates a texture from a 'bunny.png' image
    this.bunny = Sprite.from("bunny");

    this.bunny.anchor.set(0.5);
    this.bunny.x = Manager.width / 2;
    this.bunny.y = Manager.height / 2;

    this.addChild(this.bunny);

    Manager.ws.send("ping");
  }

  update(framesPassed: number): void {
    // rotate the bunny
    this.bunny.rotation += 0.01;
  }

  message(message: MessageEvent): void {
    console.log(`${this.name}: ${message.data}`);
  }

  resize(screenWidth: number, screenHeight: number): void {
    // We can use bunny here because it is a class member!
    this.bunny.x = screenWidth / 2;
    this.bunny.y = screenHeight / 2;
  }

  destroy(options?: boolean | IDestroyOptions | undefined): void {
    this.bunny.destroy();
    Manager.ws.removeEventListener("message", this.message);
  }
}
