import { Scene } from "../../modules/scenemanagement/scene.js";
import { UI } from "../ui/ui.js";
import { global } from "../../modules/global.js";
import { Button } from "../ui/button.js";
import { GameWorld } from "./GameWorld.js";

export class MainMenu extends Scene {

    gap = 12;
    theme = null;

    constructor() {
        super("Main Menu");
        this.sceneName = "Main Menu";
        this.sceneObjects = [];
        this.start = new Button((global.canvas.width / 2) - 128, global.canvas.height / 2 - 128, 256, 64, "Start", 20, "black", "beige", () => {  
            // let theme = new Audio("../tmhcot.mp3", false, 0.5);
            // theme.play();
            global.sceneManager.changeScene(new GameWorld());
            console.log("start");
        });
        this.options = new Button((global.canvas.width / 2) - 128, (global.canvas.height / 2) - 64 + this.gap, 256, 64, "Options", 20, "black", "beige", () => {
            console.log("options");
        });
        this.quit = new Button((global.canvas.width / 2) - 128, (global.canvas.height / 2) + (this.gap * 2), 256, 64, "Quit", 20, "black", "beige", () => {
            console.log("quit");
        });

        this.theme = new Audio('/src/components/audio/TwelveMonths - Hundred Cups of Tin.ogg', true, 0.5);

        this.sceneObjects.push(this.start);
        this.sceneObjects.push(this.options);
        this.sceneObjects.push(this.quit);

        console.log(`Scene ${this.sceneName} constructed`);

    }

    init = function() {
        this.createObjects();

        this.theme.play();

        console.log(this.theme);


        console.log(`Scene ${this.sceneName} initialized`);
    }

    update = function() {

    }

    render = function(ctx) {
        for(let i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].render(ctx);
        }
    }

    destroy = function() {
        //this.theme.stop();
        //destroyObjects();
    }

    createObjects = function() {

    }

    destroyObjects() {
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
    }
}