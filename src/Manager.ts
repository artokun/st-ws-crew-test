import { Application, DisplayObject } from "pixi.js";

export class Manager {
  private constructor() {}

  private static app: Application;
  private static currentScene: IScene;

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

    // Add the ticker
    Manager.app.ticker.add(Manager.update);

    // listen for the browser telling us that the screen size changed
    window.addEventListener("resize", Manager.resize);

    // call it manually once so we are sure we are the correct size after starting
    Manager.resize();
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
  public static changeScene(newScene: IScene): void {
    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    // Add the new one
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

    // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
  }
}

export interface IScene extends DisplayObject {
  update(framesPassed: number): void;
  resize(screenWidth: number, screenHeight: number): void;
}
