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

    Manager.ws.send("connected");
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
    graphics.moveTo(0, -Manager.height / 2);
    graphics.lineTo(0, Manager.height / 2);
    graphics.moveTo(-Manager.width / 2, 0);
    graphics.lineTo(Manager.width / 2, 0);
    this.gridGraphics.addChild(graphics);

    // make grid
    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        const graphics = new Graphics();
        graphics.lineStyle(1, 0x000000, 0.5);
        graphics.drawRect(0, 0, gridSize, gridSize);
        graphics.position.set(
          i * gridSize - Manager.width / 2,
          j * gridSize - Manager.height / 2
        );
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
          const [action, ...rest] = data;
          switch (action) {
            case 0:
              let [addId, addX, addY] = rest;
              console.log(`Add ${addId} at ${addX}, ${addY}`);
              break;
            case 1:
              let [removeId] = rest;
              console.log(`Remove ${removeId}`);
              break;
            case 2:
              // console.log(`Move ${id} to ${x}, ${y}`);
              let [moveId, moveX, moveY] = rest;
              let child = this.getChildByName(`PlayerScene ${moveId}`);
              if (!child) {
                child = this.addChild(new PlayerScene(moveId, moveX, moveY));
              }
              child.position.set(moveX, moveY);
              break;
            case 3:
              let [posLength, ...positions] = rest;
              for (let i = 0; i < posLength; i++) {
                let id = positions[i * 3];
                let x = positions[i * 3 + 1];
                let y = positions[i * 3 + 2];
                console.log(`Add ${id} at ${x}, ${y}`);
                let child = this.getChildByName(`PlayerScene ${id}`);
                if (!child) {
                  child = this.addChild(new PlayerScene(id, x, y));
                }
                child.position.set(x, y);
              }
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
