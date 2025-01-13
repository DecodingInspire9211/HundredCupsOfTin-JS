import { Scene } from "../../modules/scenemanagement/scene.js";
import { UI } from "../ui/ui.js";
import { global } from "../../modules/global.js";
import { Button } from "../ui/button.js";

export class MainMenu extends Scene {

    constructor() {
        super("Main Menu");
        this.sceneName = "Main Menu";
        this.sceneObjects = [];
        this.start = new Button(global.canvas.width / 2, global.canvas.height / 2, 200, 50, "Start", 20, "black", "beige", () => {  
            //let theme = new Audio('src/components/audio/TwelveMonths - Hundred Cups of Tin.mp3', false, 0.5);
            //theme.play();
            console.log("yems");
        });
        console.log(`Scene ${this.sceneName} constructed`);

    }

    init = function() {
        this.createObjects();

        let theme = new Audio('src/components/audio/TwelveMonths - Hundred Cups of Tin.mp3', false, 0.5);
        theme.play();

        console.log(`Scene ${this.sceneName} initialized`);
    }

    update = function() {

    }

    render = function() {
        for(let i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].render();
        }
    }

    destroy = function() {
        // if (this.destroyObjects()) {
        //     console.log(`Scene ${this.sceneName} destroyed`);
        // }
    }

    createObjects = function() {


        this.sceneObjects.push(this.start);
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