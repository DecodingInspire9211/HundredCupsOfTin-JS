import { Scene } from "../../modules/scenemanagement/scene.ts";
import { global } from "../../modules/global.ts";
import { AudioClass } from "../../modules/internals/audio.ts";
import { Button } from "../ui/button.ts";
import { GameWorld } from "./GameWorld.ts";
import { ImageCl } from "../ui/image.ts";
import {BaseUI} from "../../modules/ui/baseUI.ts";
import {Label} from "../ui/label.ts";

export class MainMenu extends Scene {

    gap: number = 12;
    theme: any = null;
    sceneObjects: [] = [];
    uiIterator: [] = [];

    constructor() {
        super();
        this.sceneName = "Main Menu";
        this.sceneObjects = [];

        this.uiIterator = [];
        console.log(`Scene ${this.sceneName} constructed`);

    }

    init = () => {
        this.createObjects();

        console.log(this.theme);
        console.log(`Scene ${this.sceneName} initialized`);
    }

    update = function() {

    }

    render = (ctx: CanvasRenderingContext2D) => {
        for(let i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].render(ctx);
        }
    }

    ui = (uictx: CanvasRenderingContext2D) => {
        for(let i = 0; i < this.uiIterator.length; i++) {
            this.uiIterator[i].ui(uictx);
        }
    }

    destroy = () => {
        //this.theme.stop();
        //destroyObjects();

        for(let i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].destroy();
        }
    }

    createObjects = () => {
        //const bg = new ImageCl("src/components/imgs/splash.png", 0, 0, global.ui!.width, global.ui!.height);
        const title = new ImageCl("src/components/imgs/title.png", (global.ui!.width / 2) - 256, (global.canvas!.height / 2) - 256 - 64 + this.gap, 512, 96);

        const copy = new Label((global.ui!.width / 2) , global.ui!.height - 16, 0, 0, "Kenneth William Beier (C) 2025", 20, "white");

        const start = new Button((global.ui!.width / 2) - 128, global.ui!.height / 2 - 128, 256, 64, "Start", 20, "black", "beige", () => {
            theme.stop();
            global.sceneManager.changeScene(new GameWorld());
        });
        const options = new Button((global.ui!.width / 2) - 128, (global.ui!.height / 2) - 64 + this.gap, 256, 64, "Options", 20, "black", "beige", () => {
            console.log("options");
        });
        const quit = new Button((global.ui!.width / 2) - 128, (global.ui!.height / 2) + (this.gap * 2), 256, 64, "Quit", 20, "black", "beige", () => {
            console.log("quit");
            window.stop();
        });

        const theme = new AudioClass("/src/components/audio/tmhcot_theme_nes.ogg", true, 0.5);

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
    }

    destroyObjects = () => {
        // Check if there are objects in the scene
        if (this.sceneObjects.length > 0) {
        // Destroy each object
            this.sceneObjects.forEach(object => {
                if(object.destroy)
                {
                    object.destroy();
                }
            });

            // Clear the sceneObjects array
            this.sceneObjects = [];
            theme.stop();
        }
    };
}