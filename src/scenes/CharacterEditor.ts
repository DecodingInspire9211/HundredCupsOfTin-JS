import { Scene } from "../modules/scenemanagement/scene.ts";
import { Button } from "../components/ui/button.js";

import { global } from "../modules/global.ts";
import { MainMenu } from "./MainMenu.ts";

export class Cafe implements Scene {
    sceneName: string = "Cafe";
    sceneObjects: any = [];

    private return: Button | null = null;

    init = () => {
        // Add scene initialization logic here
        this.createObjects();
        console.log(`${this.sceneName} initialized`);
    };

    update = (deltaTime: number) => {

    };

    render = (ctx: CanvasRenderingContext2D) => {
        // Add scene render logic here

        //if return is active, render it
        for(let i = 0; i < this.sceneObjects.length; i++)
        {
            this.sceneObjects[i].render(ctx);
        }

        //UI.Button(ctx, 64, 128+16, 256, 64, "Options", 12, "white", "black");
        //UI.Button(ctx, 64, 192+32, 256, 64, "Quit", 12, "white", "black");
    };

    destroy = () => {
        this.createObjects();
    };

    createObjects = () => {
        this.return = new Button(global.canvas!, global.canvas!.width - 256 - 64, global.canvas!.height - 64 - 64, 256, 64, "Return to Main Menu", 18, "white", "black", () => {
            console.log("Return clicked");
            global.sceneManager.changeScene(new MainMenu());
        });

        this.sceneObjects.push(this.return);
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

    resetObjects = () => {
        this.sceneObjects = [];
        this.return = null;
    }
}