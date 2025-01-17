import { Scene } from "../../modules/scenemanagement/scene.ts";
import { Wall } from "../../gameObjects/wall.ts"
import { Button} from "../ui/button.ts";
import { TILE_SIZE } from "../../../lib/constants.ts";
import {Floor} from "../../gameObjects/floor.ts";
import {global} from "../../modules/global.ts";
import {MainMenu} from "./MainMenu.ts";
import {Grid} from "../../modules/gameobjs/grid.ts";
import {Player} from "../../gameObjects/player.ts";
import {Counter} from "../../gameObjects/counter.ts";

export class GameWorld extends Scene {

    gap = 12;
    player: Player;
    grid: Grid;

    constructor() {
        super();
        this.sceneName = "Game World";
        this.sceneObjects = [];
        this.grid = new Grid(12);
        this.player = new Player("Player", "Knox", "Janáček", this.grid.margin_x, this.grid.margin_y, TILE_SIZE, TILE_SIZE * 2);
    }

    init = () => {
        this.createObjects();
        console.log(`Scene ${this.sceneName} initialized`);
    }

    update = () => {
        this.player.update()
    }

    render = (ctx: CanvasRenderingContext2D) => {
        //this.map.flat().forEach(tile => tile.node.render())

        this.player.render(ctx);

        for(let i = 0; i < this.sceneObjects.length; i++) {
            if(this.sceneObjects[i]!.active === true)
            {
                this.sceneObjects[i].render(ctx);
                //console.log(`Object ${this.sceneObjects[i].name} rendered`);
            }
        }
    }

    destroy = () => {
        // if (this.destroyObjects()) {
        //     console.log(`Scene ${this.sceneName} destroyed`);
        // }
        // this.sceneObjects.forEach(object => {
        //     //this.sceneObjects[object].active = false;
        // });
    }

    createObjects = () => {
        //TODO: Implement the game
        const ret =  new Button(this.gap, this.gap, 64, 64, "<-", 20, "black", "beige", () => {
             global.sceneManager.changeScene(new MainMenu());
        });

        // for(let j = 0; j < 12; j++) {
        //     for(let k = 0; k < 12; k++)
        //     {
        //         let floor = new Floor(`Floor${j + k}`, TILE_SIZE + (64 * k), TILE_SIZE + (TILE_SIZE * 2) + (64 * j), TILE_SIZE, TILE_SIZE)
        //         this.sceneObjects.push(floor);
        //     }
        // }

        for(let y = 0; y < this.grid.tiles; y++) {
            for(let x = 0; x < this.grid.tiles; x++) {
                this.grid.setPos(x, y);
                let floor = new Floor(`Floor${x + y}`, this.grid.x, this.grid.y, TILE_SIZE, TILE_SIZE);
                this.sceneObjects.push(floor);
            }
        }

        for(let x = 0; x < this.grid.tiles; x++) {
            this.grid.setPos(x, 0)
            let wall = new Wall(`Wall${x}`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2);
            this.sceneObjects.push(wall);
        }

        for(let x = 6; x < this.grid.tiles; x++) {
            this.grid.setPos(x, 2)
            let counter = new Counter(`Wall${x}`, this.grid.x, this.grid.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE*1.5);
            this.sceneObjects.push(counter);
        }


        this.sceneObjects.push(ret);
        this.sceneObjects.push(this.player);

        // this.sceneObjects.forEach(object => {
        //     //console.log(`Object ${object} created`);
        //     //this.sceneObjects[object].active = true;
        // });
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