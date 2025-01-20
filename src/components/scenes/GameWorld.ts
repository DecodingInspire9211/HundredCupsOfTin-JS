import { Scene } from "../../modules/scenemanagement/scene.ts";
import { Wall } from "../../gameObjects/wall.ts"
import { Button} from "../ui/button.ts";
import { Label } from "../ui/label.ts";
import { TILE_SIZE } from "../../../lib/constants.ts";
import {Floor} from "../../gameObjects/floor.ts";
import {global} from "../../modules/global.ts";
import {MainMenu} from "./MainMenu.ts";
import {Grid} from "../../modules/gameobjs/grid.ts";
import {Player} from "../../gameObjects/player.ts";
import {Counter} from "../../gameObjects/counter.ts";
import {WallCounter} from "../../gameObjects/wallcounter.ts";
import {Pseudo} from "../../gameObjects/pseudo.ts";
import {Chair} from "../../gameObjects/chair.ts";
import {Table} from "../../gameObjects/table.ts";
import {AudioClass} from "../../modules/internals/audio.ts";
import {Coffeemachine} from "../../gameObjects/coffeemachine.ts";
import {BaseGameObj} from "../../modules/gameobjs/baseGameObj.ts";

export class GameWorld extends Scene {

    gap = 12;
    player: Player;
    grid: Grid;
    coffeemachine: Coffeemachine;
    sceneObjects: BaseGameObj[];

    player_zOrder: number = 2;

    constructor() {
        super();
        this.sceneName = "Game World";
        this.sceneObjects = [];
        this.grid = new Grid(12);

        this.grid.setPos(2, 2);
        this.player = new Player("Player", "Knox", "Janáček", this.grid.margin_x, this.grid.margin_y, TILE_SIZE, TILE_SIZE * 2, this.player_zOrder);
    }



    init = () => {
        this.createObjects();
        console.log(`Scene ${this.sceneName} initialized`);
    }

    update = () => {
        this.player.update_player_zOrder(this.grid);
        this.player.update()

        // PLAYER TRIGGER
        if (this.player.wasTriggered) {

            // BREW COFFEE
            if(this.player.amountCoffee >= 3) {
                console.log("you cant hold more but three cups of coffee");
                this.player.amountCoffee = 3;
                this.player.wasTriggered = false;
            }
            else {
                this.coffeemachine.brewCoffee();

                if (this.coffeemachine.coffeeReady) {
                    this.player.hasCoffee = true;
                    this.player.amountCoffee++;
                    this.coffeemachine.coffeeReady = false;
                    this.player.wasTriggered = false;
                }
            }
        }
    }

    render = (ctx: CanvasRenderingContext2D) => {
        //this.map.flat().forEach(tile => tile.node.render())

        this.player.render(ctx);
        this.coffeemachine.render(ctx);

        for(let i = 0; i < this.sceneObjects.length; i++) {
            if(this.sceneObjects[i]!.active === true)
            {
                this.sceneObjects[i].storePositionOfPreviousFrame();
                global.checkCollisionWithAnyOther(this.sceneObjects[i]);
                global.checkTriggerWithAnyOther(this.sceneObjects[i]);
                this.sceneObjects[i].render(ctx);
                //console.log(`Object ${this.sceneObjects[i].name} rendered`);
            }
        }
    }

    destroy = () => {
        if (this.destroyObjects()) {
             console.log(`Scene ${this.sceneName} destroyed`);
        }
        this.sceneObjects.forEach(object => {
             object.active = false;
        });
    }

    createObjects = () => {
        const theme = new AudioClass("/src/components/audio/tmhcot_nes_fin.mp3", true, 0.5);

        //TODO: Implement the game
        const ret =  new Button(this.gap, this.gap, 64, 64, "<-", 20, "black", "beige", () => {
            theme.stop();
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
                let floor = new Floor(`Floor`, this.grid.x, this.grid.y, TILE_SIZE, TILE_SIZE);
                this.sceneObjects.push(floor);
            }
        }

        for(let x = 0; x < this.grid.tiles; x++) {
            this.grid.setPos(x, 0)
            let wall = new Wall(`Wall`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 1);
            this.sceneObjects.push(wall);
        }

        for(let x = 6; x < this.grid.tiles; x++) {
            this.grid.setPos(x, 0.5)
            let wallCounter = new WallCounter(`WallCounter`, this.grid.x, this.grid.y - (TILE_SIZE * 1.5), TILE_SIZE, TILE_SIZE*2.5, 2);
            this.sceneObjects.push(wallCounter);
        }

        for(let x = 6; x < this.grid.tiles; x++) {
            this.grid.setPos(x, 3)
            let pseudo = new Pseudo(`Pseudo`, this.grid.x, this.grid.y - ((TILE_SIZE / 2)-(TILE_SIZE/2)), TILE_SIZE, TILE_SIZE*0.5, 2);
            let counter = new Counter(`Counter`, this.grid.x, this.grid.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE*1.5, 4);
            this.sceneObjects.push(pseudo)
            this.sceneObjects.push(counter);

        }

        this.grid.setPos(10, 10);
        let chair = new Chair(`Chair`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 6, 1);

        this.grid.setPos(9, 10);
        let table = new Table(`Table`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 6);

        this.grid.setPos(8, 10);
        let chair1 = new Chair(`Chair`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 6);

        this.grid.setPos(9, 4);
        let chair2 = new Chair(`Chair`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 6, 3);

        this.grid.setPos(7, 4);
        let chair3 = new Chair(`Chair`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 6, 3);

        this.grid.setPos(4, 9);
        let chair4 = new Chair(`Chair`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 6, 1);
        this.grid.setPos(3, 9);
        let table3 = new Table(`Table`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 6);

        this.grid.setPos(2, 9);
        let chair5 = new Chair(`Chair`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE * 2, 6);

        this.grid.setPos(10, 3.5);
        this.coffeemachine = new Coffeemachine(`Coffeemachine`, this.grid.x, this.grid.y - TILE_SIZE, TILE_SIZE, TILE_SIZE, 6);

        this.sceneObjects.push(chair);
        this.sceneObjects.push(table);
        this.sceneObjects.push(chair1);
        this.sceneObjects.push(chair2);
        this.sceneObjects.push(chair3);
        this.sceneObjects.push(chair4);
        this.sceneObjects.push(table3);
        this.sceneObjects.push(chair5);

        this.sceneObjects.push(this.player);

        this.sceneObjects.push(ret);

        this.sceneObjects.push(this.coffeemachine);

        this.sceneObjects.sort((a, b) => a.zOrder - b.zOrder);


        // this.sceneObjects.forEach(object => {
        //     //console.log(`Object ${object} created`);
        //     //this.sceneObjects[object].active = true;
        // });
    }

     destroyObjects = () => {
         // Check if there are objects in the scene
         if (this.sceneObjects.length > 0) {
             // Destroy each object
             this.sceneObjects.forEach(object => {
                 object.destroy();
             });

             // Clear the sceneObjects array
             this.sceneObjects = [];

             return true;
         }
     }
}