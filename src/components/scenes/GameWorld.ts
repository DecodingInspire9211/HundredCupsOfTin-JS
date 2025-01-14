import { Scene } from "../../modules/scenemanagement/scene.ts";
import { UI } from "../ui/ui.ts";
import { global } from "../../modules/global.ts";
import { Button } from "../ui/button.ts";
import { MainMenu } from "./MainMenu.ts";

export class GameWorld extends Scene {

    gap = 12;

    constructor() {
        super();
        this.sceneName = "GameWorld";
        this.sceneObjects = [];

        // this.return = new Button(this.gap, this.gap, 64, 64, "<-", 20, "black", "beige", () => {
        //     global.sceneManager.changeScene(new MainMenu());
        // });

        // this.sceneObjects.push(this.return);

        console.log(`Scene ${this.sceneName} constructed`);
    }

    init = function() {
        this.createObjects();

        // let theme = new Audio('src/components/audio/TwelveMonths - Hundred Cups of Tin.mp3', false, 0.5);
        // theme.play();

        console.log(`Scene ${this.sceneName} initialized`);
    }

    update = function() {

    }

    render = function(ctx) {
        // if(this.sceneObjects.active) {
        //     for(let i = 0; i < this.sceneObjects.length; i++) {
        //         this.sceneObjects[i].render(ctx);
        //     }
        // }

        for(let i = 0; i < this.sceneObjects.length; i++) {
            if(this.sceneObjects[i].active === true)
            {
                this.sceneObjects[i].render(ctx);

            }
        }
    }

    destroy = function() {
        // if (this.destroyObjects()) {
        //     console.log(`Scene ${this.sceneName} destroyed`);
        // }
        this.sceneObjects.forEach(object => {
            this.sceneObjects[object].active = false;
        });
    }

    createObjects = function() {
        //TODO: Implement the game
        const ret =  new Button(this.gap, this.gap, 64, 64, "<-", 20, "black", "beige", () => {
             global.sceneManager.changeScene(new MainMenu());
        });

        this.sceneObjects.push(ret);

        this.sceneObjects.forEach(object => {
            console.log(`Object ${object} created`);
            //this.sceneObjects[object].active = true;
        });
    }

    // destroyObjects = function(sceneObjects) {
    //     // Check if there are objects in the scene
    //     if (this.sceneObjects.length > 0) {
    //         // Destroy each object
    //         this.sceneObjects.forEach(object => {
    //             object.destroy();
    //         });

    //         // Clear the sceneObjects array
    //         this.sceneObjects = [];
    //         theme.stop();

    //         return true;
    //     }
    // }
}