import { Container, Graphics, IDestroyOptions } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { PlayerScene } from "./PlayerScene";

export class GameScene extends Container implements IScene {
  public name: string = "GameScene";
  assetBundles: string[] = ["game", "sounds"];
  gridGraphics!: Container;

  constructor() {
    super(); // Mandatory! This calls the superclass constructor.
  }

  constructorWithAwaits(): void {
    this.createGrid();

    Manager.ws.send("ping");
  }

  update(framesPassed: number): void {}

  createGrid(): void {
    this.gridGraphics = new Container();
    this.addChild(this.gridGraphics);

    const gridSize = 50;
    const gridWidth = Manager.width / gridSize;
    const gridHeight = Manager.height / gridSize;

    // make main axis double width
    const graphics = new Graphics();
    graphics.lineStyle(2, 0x000000, 1);
    graphics.moveTo(Manager.width / 2, 0);
    graphics.lineTo(Manager.width / 2, Manager.height);
    graphics.moveTo(0, Manager.height / 2);
    graphics.lineTo(Manager.width, Manager.height / 2);
    this.gridGraphics.addChild(graphics);

    // make grid
    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        const graphics = new Graphics();
        graphics.lineStyle(1, 0x000000, 0.5);
        graphics.drawRect(0, 0, gridSize, gridSize);
        graphics.position.x = i * gridSize;
        graphics.position.y = j * gridSize;
        this.gridGraphics.addChild(graphics);
      }
    }
  }

  message(message: MessageEvent): void {
    switch (typeof message.data) {
      case "string":
        console.log(`${this.name}: ${message.data}`);
        break;
      case "object":
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(message.data);
        fileReader.onload = () => {
          const data = new Float32Array(fileReader.result as ArrayBuffer);
          const [action, id, x, y] = data;
          switch (action) {
            case 0:
              console.log(`Add ${id} at ${x}, ${y}`);
              break;
            case 1:
              console.log(`Remove ${id}`);
              break;
            case 2:
              // console.log(`Move ${id} to ${x}, ${y}`);
              let child = this.getChildByName(`PlayerScene ${id}`);
              if (!child) {
                child = this.addChild(new PlayerScene(id, x, y));
              }
              child.position.set(x, y);
              break;
          }
        };
        break;
      default:
        console.log(`${this.name}: ${message.data}`);
    }
  }

  destroy(options?: boolean | IDestroyOptions | undefined): void {
    Manager.ws.removeEventListener("message", this.message);
  }
}
