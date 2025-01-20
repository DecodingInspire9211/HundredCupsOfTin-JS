import { Scene } from "../../modules/scenemanagement/scene.ts";
import { global } from "../../modules/global.ts";
import { AudioClass } from "../../modules/internals/audio.ts";
import { Button } from "../ui/button.ts";
import { GameWorld } from "./GameWorld.ts";
import { ImageCl } from "../ui/image.ts";

export class MainMenu extends Scene {

    gap: number = 12;
    theme: any = null;
    sceneObjects: [] = [];

    constructor() {
        super();
        this.sceneName = "Main Menu";
        this.sceneObjects = [];

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

    destroy = () => {
        //this.theme.stop();
        //destroyObjects();

        for(let i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].destroy();
        }
    }

    createObjects = () => {
        const title = new ImageCl("src/components/imgs/title.png", (global.canvas!.width / 2) - 128 - 64, (global.canvas!.height / 2) - 256 + this.gap, 384, 64);
        const start = new Button((global.canvas!.width / 2) - 128, global.canvas!.height / 2 - 128, 256, 64, "Start", 20, "black", "beige", () => {
            theme.stop();
            global.sceneManager.changeScene(new GameWorld());
        });
        const options = new Button((global.canvas!.width / 2) - 128, (global.canvas!.height / 2) - 64 + this.gap, 256, 64, "Options", 20, "black", "beige", () => {
            console.log("options");
        });
        const quit = new Button((global.canvas!.width / 2) - 128, (global.canvas!.height / 2) + (this.gap * 2), 256, 64, "Quit", 20, "black", "beige", () => {
            console.log("quit");
        });

        const theme = new AudioClass("/src/components/audio/tmhcot_nes_fin.mp3", false, 0.5);

        this.sceneObjects.push(title);
        this.sceneObjects.push(start);
        this.sceneObjects.push(options);
        this.sceneObjects.push(quit);
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