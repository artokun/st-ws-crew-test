import { Application, Assets, DisplayObject } from "pixi.js";
import { manifest } from "./assets";

export class Manager {
  private constructor() {}

  private static app: Application;
  private static currentScene: IScene;

  public static ws: WebSocket;
  public static get width(): number {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  }
  public static get height(): number {
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
  }

  private static initializeAssetsPromise: Promise<unknown>;
  private static initializeWebsocketPromise: Promise<void>;

  // Use this function ONCE to start the entire machinery
  public static initialize(background: number): void {
    // Create our pixi app
    Manager.app = new Application({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resizeTo: window,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
    });

    // Initialize the websocket
    Manager.initializeWebsocketPromise = Manager.initializeWebsocket();

    // Add the ticker
    Manager.app.ticker.add(Manager.update);

    // listen for the browser telling us that the screen size changed
    window.addEventListener("resize", Manager.resize);

    // call it manually once so we are sure we are the correct size after starting
    Manager.resize();

    // We store it to be sure we can use Assets later on
    Manager.initializeAssetsPromise = Assets.init({ manifest: manifest });

    // Black js magic to extract the bundle names into an array.
    const bundleNames = manifest.bundles.map((b) => b.name);

    // Initialize the assets and then start downloading the bundles in the background
    Manager.initializeAssetsPromise.then(() =>
      Assets.backgroundLoadBundle(bundleNames)
    );
  }

  public static async initializeWebsocket(): Promise<void> {
    if (Manager.ws) {
      Manager.ws.close();
    }

    return new Promise((resolve) => {
      Manager.ws = new WebSocket("ws://localhost:3001");
      Manager.ws.onopen = () => {
        console.log("WebSocket Client Connected");
      };
      Manager.ws.onmessage = ({ data }) => {
        resolve();
      };
      Manager.ws.onclose = () => {
        console.log("WebSocket Client Disconnected");
      };
    });
  }

  public static resize(): void {
    if (Manager.currentScene) {
      Manager.currentScene.resize(Manager.width, Manager.height);
    }

    // current screen size
    const screenWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const screenHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    // uniform scale for our game
    const scale = Math.min(
      screenWidth / Manager.width,
      screenHeight / Manager.height
    );

    // the "uniformly englarged" size for our game
    const enlargedWidth = Math.floor(scale * Manager.width);
    const enlargedHeight = Math.floor(scale * Manager.height);

    // margins for centering our game
    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;

    // now we use css trickery to set the sizes and margins
    Manager.app.view.style!.width = `${enlargedWidth}px`;
    Manager.app.view.style!.height = `${enlargedHeight}px`;
    // @ts-ignore
    Manager.app.view.style!.marginLeft =
      // @ts-ignore
      Manager.app.view.style!.marginRight = `${horizontalMargin}px`;
    // @ts-ignore
    Manager.app.view.style!.marginTop =
      // @ts-ignore
      Manager.app.view.style!.marginBottom = `${verticalMargin}px`;
  }

  // Call this function when you want to go to a new scene
  public static async changeScene(newScene: IScene): Promise<void> {
    // let's make sure our Assets were initialized correctly
    await Manager.initializeAssetsPromise;

    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    // If you were to show a loading thingy, this will be the place to show it...

    // Now, let's start downloading the assets we need and wait for them...
    await Promise.all([
      Assets.loadBundle(newScene.assetBundles),
      Manager.initializeWebsocketPromise,
    ]);

    // If you have shown a loading thingy, this will be the place to hide it...

    // we listen for messages from the server
    Manager.ws.addEventListener("message", newScene.message.bind(newScene));

    // when we have assets and a stable socket connection, we tell that scene
    newScene.constructorWithAwaits();

    // we now store it and show it, as it is completely created
    Manager.currentScene = newScene;
    Manager.app.stage.addChild(Manager.currentScene);
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private static update(framesPassed: number): void {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
    if (Manager.currentScene) {
      Manager.currentScene.update(framesPassed);
    }
  }
}

export interface IScene extends DisplayObject {
  update(framesPassed: number): void;
  resize(screenWidth: number, screenHeight: number): void;
  message<T>(message: MessageEvent<T>): void;
  constructorWithAwaits(): void;
  assetBundles: string[];
}
