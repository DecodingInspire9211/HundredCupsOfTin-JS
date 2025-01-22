import { Scene } from "../../modules/scenemanagement/scene.ts";
import { global } from "../../modules/global.ts";
import { GameWorld } from "./GameWorld.ts";
import {TextClass} from "../ui/text.ts";

export class WinScreen extends Scene {

    gap: number = 12;
    theme: any = null;
    sceneObjects: [] = [];
    uiIterator: [] = [];

    timer: number = 0;

    constructor() {
        super();
        this.sceneName = "Intro Screen";
        this.sceneObjects = [];

        this.uiIterator = [];

        this.timer = 0;
        console.log(`Scene ${this.sceneName} constructed`);

    }

    init = () => {
        this.createObjects();

        console.log(this.theme);
        console.log(`Scene ${this.sceneName} initialized`);
    }

    update = () => {
        this.timer += global.deltaTime;
        if (this.timer >= 10) {
            this.timer = 0;
            window.stop();
        }
    }

        render = (ctx: CanvasRenderingContext2D) => {
            for (let i = 0; i < this.sceneObjects.length; i++) {
                this.sceneObjects[i].render(ctx);
            }
        }

        ui = (uictx: CanvasRenderingContext2D) => {
            for (let i = 0; i < this.uiIterator.length; i++) {
                this.uiIterator[i].ui(uictx);
            }
        }

        destroy = () => {
            //this.theme.stop();
            //destroyObjects();

            for (let i = 0; i < this.sceneObjects.length; i++) {
                this.sceneObjects[i].destroy();
            }
        }

        createObjects = () => {
            let text = new TextClass("/src/gameObjects/text/Win.txt", 0, -128, global.ui!.width, global.ui!.height, "", 12, "#000000");

            this.uiIterator.push(text);
        }

        destroyObjects = () => {
            // Check if there are objects in the scene
            if (this.sceneObjects.length > 0) {
                // Destroy each object
                this.sceneObjects.forEach(object => {
                    if (object.destroy) {
                        object.destroy();
                    }
                });

                // Clear the sceneObjects array
                this.sceneObjects = [];
            }
        };
    };