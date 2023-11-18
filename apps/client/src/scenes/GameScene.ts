import { Container, Graphics, IDestroyOptions } from "pixi.js";
import * as flatbuffers from "flatbuffers";
import { IScene, Manager } from "../Manager";
import {
  ClientUpdateEventT,
  InitClientEventT,
  InitStateEventT,
  Message,
} from "models/message";
import { ClientAction } from "models/client";
import { UnitScene } from "./UnitScene";

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

    // make main axis double width
    const graphics = new Graphics();
    graphics.lineStyle(2, 0x00ff00, 1);
    graphics.moveTo(0, -Manager.height / 2);
    graphics.lineTo(0, Manager.height / 2);
    graphics.lineStyle(2, 0xff0000, 1);
    graphics.moveTo(-Manager.width / 2, 0);
    graphics.lineTo(Manager.width / 2, 0);
    this.gridGraphics.addChild(graphics);
  }

  async message(message: MessageEvent) {
    switch (typeof message.data) {
      case "string":
        console.log(`${this.name}: ${message.data}`);
        break;
      case "object":
        const buffer = new Uint8Array(await message.data.arrayBuffer());
        const event = Message.getRootAsMessage(
          new flatbuffers.ByteBuffer(buffer)
        ).unpack();
        switch (event.message?.constructor) {
          case InitClientEventT:
            const initClientMessage = event.message as InitClientEventT;
            Manager.ws.clientId = String(initClientMessage.client?.id);
            console.debug("CLIENT ID:", initClientMessage.client?.id);
            break;
          case ClientUpdateEventT:
            const clientUpdateMessage = event.message as ClientUpdateEventT;
            console.log(
              `Client ${clientUpdateMessage.client?.name} (${
                clientUpdateMessage.client?.id
              } just ${ClientAction[clientUpdateMessage.action]})`
            );
            break;
          case InitStateEventT:
            const initStateMessage = event.message as InitStateEventT;
            for (const unit of initStateMessage.units || []) {
              const unitScene = new UnitScene(unit);
              this.addChild(unitScene);
            }
            break;
          default:
            console.error("unknown GameScene event", event);
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
