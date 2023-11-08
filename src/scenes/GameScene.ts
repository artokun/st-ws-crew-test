import { Container, Graphics, IDestroyOptions } from "pixi.js";
import * as flatbuffers from "flatbuffers";
import { IScene, Manager } from "../Manager";
import { PlayerScene } from "./PlayerScene";
import { GameState, MessageType } from "../flatbuffers/game-state";

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

  async message(message: MessageEvent) {
    switch (typeof message.data) {
      case "string":
        console.log(`${this.name}: ${message.data}`);
        break;
      case "object":
        const buffer = new Uint8Array(await message.data.arrayBuffer());
        const game = GameState.getRootAsGameState(
          new flatbuffers.ByteBuffer(buffer)
        ).unpack();
        switch (game.messageType) {
          case MessageType.InitialState:
            for (const player of game.players) {
              this.addChild(
                new PlayerScene(
                  player.id,
                  player.position!.x,
                  player.position!.y
                )
              );
            }
            break;
        }
        break;
      default:
        console.log(`${this.name}: ${message.data}`);
    }
  }

  destroy(options?: boolean | IDestroyOptions | undefined): void {
    Manager.ws.removeEventListener("message", this.message);
  }
}
