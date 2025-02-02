import { Scene } from "../../modules/scenemanagement/scene.ts";
import { global } from "../../modules/global.ts";
import { Button } from "../ui/button.ts";
import { ImageCl } from "../ui/image.ts";
import { BaseUI } from "../../modules/ui/baseUI.ts";
import { Label } from "../ui/label.ts";
import { IntroScreen } from "./IntroScreen.ts";
import {GameWorld} from "./GameWorld.ts";

export class MainMenu extends Scene {
  gap: number = 12;
  uiIterator: BaseUI[] = [];

  constructor() {
    super();
    this.sceneName = "Main Menu";

    this.uiIterator = [];
    console.log(`Scene ${this.sceneName} constructed`);
  }

  init = () => {
    this.createObjects();

    console.log(`Scene ${this.sceneName} initialized`);
  };

  update = function () {};

  // TODO determine if this is needed in the MainMenu
  // render = (ctx: CanvasRenderingContext2D) => {
  //   for (let i = 0; i < this.sceneObjects.length; i++) {
  //     this.sceneObjects[i].render(ctx);
  //   }
  // };

  ui = (uictx: CanvasRenderingContext2D) => {
    for (let i = 0; i < this.uiIterator.length; i++) {
      this.uiIterator[i].ui(uictx);
    }
  };

  destroy = () => {
    this.destroyObjects();

    // TODO are there even sceneObjects in the MainMenu?
    // for (let i = 0; i < this.sceneObjects.length; i++) {
    //   this.sceneObjects[i].destroy();
    // }
  };

  createObjects = () => {
    //const bg = new ImageCl("src/components/imgs/splash.png", 0, 0, global.ui!.width, global.ui!.height);
    const title = new ImageCl(
      "src/components/imgs/PixelTitle.png",
      global.ui!.width / 2 - 256,
      global.canvas!.height / 2 - 256 - 64 + this.gap,
      512,
      96,
    );

    const copy = new Label(
      global.ui!.width / 2,
      global.ui!.height - 16,
      0,
      0,
      "Kenneth William Beier (C) 2025",
      20,
      "white",
    );

    const start = new Button(
      global.ui!.width / 2 - 128,
      global.ui!.height / 2 - 128,
      256,
      64,
      "Start",
      20,
      "black",
      "beige",
      () => {
        if(new URL(location.href).searchParams.has("skip")) {
          global.sceneManager.changeScene(new GameWorld());
        }
        else {
          global.sceneManager.changeScene(new IntroScreen());
        }
      },
    );
    const options = new Button(
      global.ui!.width / 2 - 128,
      global.ui!.height / 2 - 64 + this.gap,
      256,
      64,
      "Options",
      20,
      "black",
      "beige",
      () => {
        console.log("options");
      },
    );
    const quit = new Button(
      global.ui!.width / 2 - 128,
      global.ui!.height / 2 + this.gap * 2,
      256,
      64,
      "Quit",
      20,
      "black",
      "beige",
      // on click
      () => {
        console.log("quit");
        window.stop();
      },
    );

    global.audioManager.addTrack("/src/components/audio/tmhcot_theme_nes.ogg", {
      loop: true,
    });

    //this.uiIterator.push(bg);
    this.uiIterator.push(title);
    this.uiIterator.push(copy);
    this.uiIterator.push(start);
    this.uiIterator.push(options);
    this.uiIterator.push(quit);
    //
    // this.sceneObjects.forEach(object => {
    //     object.init();
    // });
  };

  destroyObjects = () => {
    // Destroy each UI object
    this.uiIterator.forEach((uiObject) => {
      if (uiObject.destroy) {
        uiObject.destroy();
      }
    });

    console.log("The Main Menu scene has been destroyed");
    // Clear the sceneObjects array
    this.sceneObjects = [];
  };
}
