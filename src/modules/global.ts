import { BaseGameObj } from "./baseGameObj.ts";
import { SceneManager } from "./SceneManagement/sceneManager.ts";

import { MainMenu } from "../components/scenes/MainMenu.ts";
import { GameWorld } from "../components/scenes/GameWorld.ts";

import { loadFont } from "./internals/loadFont.ts";

interface Global {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    previousTRT: number;
    fps: number;
    deltaTime: number;
    allGameObjects: BaseGameObj[];
    playerObject: {};

    sceneManager: SceneManager;

    init: () => void;
    clearCanvas: () => void;
    updateCanvasSize: () => void;
    getCanvasBounds: () => { left: number; right: number; top: number; bottom: number };
    checkCollisionWithAnyOther: (source: any) => void;
    detectBoxCollision: (gameObject1: any, gameObject2: any) => boolean;

    updateFPS: () => void;
    updateDeltaTime: (totalRunningTime: number) => void;
  };

const global: Global = {
    canvas: document.querySelector("#canvas")!,
    ctx: document.querySelector<HTMLCanvasElement>("#canvas")?.getContext("2d") || null,
    previousTRT: 0,
    deltaTime: 0,
    fps: 0,
    allGameObjects: [] as BaseGameObj[],
    playerObject: {},
    sceneManager: new SceneManager(),

    init: function() {
      this.updateCanvasSize();
      this.getCanvasBounds();

      loadFont('Pixelify Sans', 'src/fonts/PixelifySans-VariableFont_wght.ttf');
      this.ctx!.font = "16px Pixelify Sans";

      //this.sceneManager.changeScene(new MainMenu());
      this.sceneManager.changeScene(new GameWorld());
    },

    clearCanvas: function () {
        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    updateCanvasSize: function () {
        this.canvas!.width = window.innerWidth;
        this.canvas!.height = window.innerHeight;
    },
    
    getCanvasBounds: function() {
      return {
        left: 0,
        right: this.canvas!.width,
        top: 0,
        bottom: this.canvas!.height,
      };
    },

    updateFPS: function() {
        this.fps = Math.round(1 / global.deltaTime);
    },

    updateDeltaTime (totalRunningTime) {
        let currentTRT = totalRunningTime;
        global.deltaTime = (currentTRT - global.previousTRT) / 1000;
        global.previousTRT = currentTRT;
    },
  
    checkCollisionWithAnyOther: function(source) {
      // for (let i = 0; i < this.allGameObjects.length; i++) {
      //   let target = this.allGameObjects[i];
      //   if (target.active) {
      //     let collisionHappened = this.detectBoxCollision(source, target);
      //     if (collisionHappened) {
      //       source.reactToCollision(target);
      //       target.reactToCollision(source);
      //     }
      //   }
      // }
    },
  
    detectBoxCollision: function(gameObject1, gameObject2) {
      let box1 = gameObject1.getBoxBounds();
      let box2 = gameObject2.getBoxBounds();
      if (gameObject1 !== gameObject2) {
        // Add collision detection logic here
        return (
          box1.left < box2.right &&
          box1.right > box2.left &&
          box1.top < box2.bottom &&
          box1.bottom > box2.top
        );
      }
      return false;
    },
  };

  export { global }