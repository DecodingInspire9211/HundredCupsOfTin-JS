import { Scene } from "../../modules/scenemanagement/scene.ts";
import { global } from "../../modules/global.ts";
import { AudioClass } from "../../modules/internals/audio.ts";
import { Button } from "../ui/button.ts";
import { GameWorld } from "./GameWorld.ts";
import { ImageCl } from "../ui/image.ts";
import { BaseUI } from "../../modules/ui/baseUI.ts";
import { MainMenu } from "./MainMenu.ts";
import { Label } from "../ui/label.ts";

export class SplashScreen extends Scene {
  gap: number = 12;
  // theme: any = null;
  sceneObjects: [] = [];
  uiIterator: [] = [];

  timer: number = 0;

  constructor() {
    super();
    this.sceneName = "Splash Screen";
    this.sceneObjects = [];

    this.uiIterator = [];

    this.timer = 0;
    console.log(`Scene ${this.sceneName} constructed`);
  }

  init = () => {
    this.createObjects();

    // console.log(this.theme);
    console.log(`Scene ${this.sceneName} initialized`);
  };

  update = () => {
    this.timer += global.deltaTime;
    if (this.timer >= 5) {
      this.timer = 0;
      global.sceneManager.changeScene(new MainMenu());
    }
  };

  render = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < this.sceneObjects.length; i++) {
      this.sceneObjects[i].render(ctx);
    }
  };

  ui = (uictx: CanvasRenderingContext2D) => {
    for (let i = 0; i < this.uiIterator.length; i++) {
      this.uiIterator[i].ui(uictx);
    }
  };

  destroy = () => {
    //this.theme.stop();
    //destroyObjects();

    for (let i = 0; i < this.sceneObjects.length; i++) {
      this.sceneObjects[i].destroy();
    }
  };

  createObjects = () => {
    let author = new Label(
      global.ui!.width / 2 - 128,
      global.ui!.height / 2 - 32,
      256,
      64,
      "Kenneth William Beier",
      40,
      "white",
    );
    let presents = new Label(
      global.ui!.width / 2 - 128,
      global.ui!.height / 2,
      256,
      64,
      "alias DecoWolfdoggo   presents",
      20,
      "white",
    );

    this.uiIterator.push(author);
    this.uiIterator.push(presents);
  };

  destroyObjects = () => {
    // Check if there are objects in the scene
    if (this.sceneObjects.length > 0) {
      // Destroy each object
      this.sceneObjects.forEach((object) => {
        if (object.destroy) {
          object.destroy();
        }
      });

      // Clear the sceneObjects array
      this.sceneObjects = [];
      // theme.stop();
    }
  };
}
