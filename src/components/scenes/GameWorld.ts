import { Scene } from "../../modules/scenemanagement/scene.ts";

import {Map} from "../../types/level.ts";
import {Player} from "../../modules/gameobjs/player.ts";
export class GameWorld extends Scene {

    constructor() {
        super();
    }

    init = () => {
        this.createObjects();
        console.log(`Scene ${this.sceneName} initialized`);
    }

    update = () => {
        this.player.update();
    }

    render = (ctx: CanvasRenderingContext2D) => {
        //this.map.flat().forEach(tile => tile.node.render())

        //this.player.render(ctx);


        for(let i = 0; i < this.sceneObjects.length; i++) {
            if(this.sceneObjects[i]!.active === true)
            {
                this.sceneObjects[i].render(ctx);
                console.log(`Object ${this.sceneObjects[i].name} rendered`);
            }
        }
    }

    destroy = () => {
        // if (this.destroyObjects()) {
        //     console.log(`Scene ${this.sceneName} destroyed`);
        // }
        this.sceneObjects.forEach(object => {
            //this.sceneObjects[object].active = false;
        });
    }

    createObjects = function() {
        //TODO: Implement the game
        const ret =  new Button(this.gap, this.gap, 64, 64, "<-", 20, "black", "beige", () => {
             global.sceneManager.changeScene(new MainMenu());
        });

        const gameArea = new GameArea(global.canvas!.width/2, global.canvas!.height/2);



        this.sceneObjects.push(ret);
        this.sceneObjects.push(gameArea);

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