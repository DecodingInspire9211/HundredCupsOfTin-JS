import { Scene } from "../modules/scenemanagement/scene.ts";
import { Button } from "../components/ui/button.js";

import { global } from "../modules/global.ts";  
import { Cafe } from "./CharacterEditor.ts";

export class MainMenu extends Scene {
    sceneName: string = "MainMenu";
    sceneObjects: any = [];

    private start: Button | null = null;
    private options: Button | null = null;
    private quit: Button | null = null;

    init = () => {
        // Add scene initialization logic here
        this.resetObjects();
        this.createObjects();
        console.log(`${this.sceneName} initialized`);
    };

    update = (deltaTime: number) => {

    };

    render = (ctx: CanvasRenderingContext2D) => {
        // Add scene render logic here
        for(let i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].render(ctx);
        }

        //UI.Button(ctx, 64, 128+16, 256, 64, "Options", 12, "white", "black");
        //UI.Button(ctx, 64, 192+32, 256, 64, "Quit", 12, "white", "black");
    };

    destroy = () => {
        this.destroyObjects();
        console.log(`${this.sceneName} destroyed`);
        // Add scene destroy logic here
    };

    createObjects = () => {
        this.start = new Button(global.canvas!, (global.getCanvasBounds().right / 2) - 128, (global.getCanvasBounds().bottom / 2) - 128, 256, 64, "Start New Game", 18, "white", "brown", () => {
            console.log("Start clicked");
            global.sceneManager.changeScene(new Cafe());
        });
    
        this.options = new Button(global.canvas!, (global.canvas!.width / 2) - 128, (global.canvas!.height / 2), 256, 64, "Options", 18, "white", "brown", () => {
            console.log("Options clicked");
        });
    
        this.quit = new Button(global.canvas!, (global.canvas!.width / 2) - 128, (global.canvas!.height / 2) + 128, 256, 64, "Quit", 18, "white", "brown", () => {
            console.log("Quit clicked");
        });

        this.sceneObjects.push(this.start);
        this.sceneObjects.push(this.options);
        this.sceneObjects.push(this.quit);

        console.log(this.sceneObjects);
    }

    resetObjects = () => {
        this.sceneObjects = [];
        this.start = null;
        this.options = null;
        this.quit = null; 
    }

    destroyObjects = () => {
        this.sceneObjects.forEach((obj: any) => {
            if(obj && typeof obj.destroy === 'function') {
                console.log(`deleting ${obj}...`)
                obj.destroy();
                console.log(`${obj} deleted...`)
            }
        })


        console.log(this.sceneObjects);
    }
}