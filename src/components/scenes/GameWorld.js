import { Scene } from "../../modules/scenemanagement/scene.js";
import { UI } from "../ui/ui.js";
import { global } from "../../modules/global.js";
import { Button } from "../ui/button.js";
import { MainMenu } from "./MainMenu.js";

export class GameWorld extends Scene {

    gap = 12;

    constructor() {
        super("GameWorld");
        this.sceneName = "GameWorld";
        this.sceneObjects = [];

        this.return = new Button(this.gap, this.gap, 64, 64, "<-", 20, "black", "beige", () => {
            global.sceneManager.changeScene(new MainMenu());
        });

        this.sceneObjects.push(this.return);

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
        for(let i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].render(ctx);
        }
    }

    destroy = function() {
        // if (this.destroyObjects()) {
        //     console.log(`Scene ${this.sceneName} destroyed`);
        // }
    }

    createObjects = function() {
        //TODO: Implement the game
    }

    destroyObjects = function(sceneObjects) {
        // Check if there are objects in the scene
        if (this.sceneObjects.length > 0) {
            // Destroy each object
            this.sceneObjects.forEach(object => {
                object.destroy();
            });

            // Clear the sceneObjects array
            this.sceneObjects = [];
            theme.stop();

            return true;
        }
    }
}