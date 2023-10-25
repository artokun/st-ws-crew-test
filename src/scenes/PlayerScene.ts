import { Container, Graphics } from "pixi.js";
import { IScene, Manager } from "../Manager";

export class PlayerScene extends Container implements IScene {
  public name: string = "PlayerScene";
  public id: string;
  public assetBundles: string[] = [];
  public g!: Graphics;

  constructor(id: string) {
    super();
    this.id = id;
    this.g = new Graphics();
    this.g.beginFill(0xff0000);
    this.g.drawCircle(0, 0, 20);
    this.g.endFill();
    this.addChild(this.g);

    this.x = Manager.width / 2;
    this.y = Manager.height / 2;
  }

  public constructorWithAwaits(): void {}

  public message(message: MessageEvent): void {
    // To be a scene we must have the message method even if we don't use it.
  }

  public update(framesPassed: number): void {
    // To be a scene we must have the update method even if we don't use it.
  }
}
