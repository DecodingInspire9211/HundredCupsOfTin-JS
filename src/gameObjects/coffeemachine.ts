import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";
import {global} from "../modules/global.ts";
import { Label } from "../components/ui/label.ts";
import {Player} from "../gameObjects/player.ts";
import {TILE_SIZE} from "../../lib/constants.ts";
import {Key} from "../modules/input/keyHandler.ts";

export class Coffeemachine extends BaseGameObj {

    coffeeReady: boolean = false;
    brewing: boolean = false;
    wasTriggered: boolean = false;

    radiusTrigger: boolean = false;

    timer: number = 0;

    player: Player;

    timerLabel: Label | undefined;

    constructor(name: string, x: number, y: number, width: number, height:number, zOrder:number, ) {
        super(name, x, y, width, height, zOrder);
        this.loadImages();
    }
    loadImages = () => {
        /* first load images from path */
        let image1 = new Image();
        image1.src = "../src/components/imgs/cafemach.png";
        /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
        this.animationData.animationSprites.push(image1);
    };

    brewCoffee = () => {
        this.brewing = true;
        this.timer += global.deltaTime;
        if (this.timer >= 3) {
            this.coffeeReady = true;
            this.brewing = false;
        }
        if (this.timer >= 4) {
            this.timer = 0;
            this.coffeeReady = false;
        }
    }

    update = () => {
        if (this.wasTriggered) {
            this.brewCoffee();
        }
    };

    reactToTrigger = (triggeringObject: any) => {
        if (triggeringObject instanceof Player) {
            this.radiusTrigger = true;
            if(this.coffeeReady)
            {
                triggeringObject.hasCoffee = true;
                triggeringObject.amountCoffee++;
                this.coffeeReady = false;
                this.wasTriggered = false;
            }
        }
        else {
            this.radiusTrigger = false;
        }
    }

    render = (ctx: CanvasRenderingContext2D) => {
        let sprite = this.getNextSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        //
        // if(this.triggers) {
        //     this.timerLabel = new Label(this.x + 20, this.y, 250, 50, `Brew (E)`, 20, "white");
        //     this.timerLabel.render(ctx);
        // }
        if(this.brewing) {
            this.timerLabel = new Label(this.x + 20, this.y, 250, 50, `${Math.round(this.timer)} of 3 seconds`, 20, "white");
            this.timerLabel.render(ctx);
        }
        if(this.coffeeReady) {
            this.timerLabel = new Label(this.x + 20, this.y, 250, 50, `Coffee is ready!`, 20, "white");
            this.timerLabel.render(ctx);
        }
        if(this.radiusTrigger) {
            this.timerLabel = new Label(this.x + 20, this.y, 250, 50, `Brew (E)`, 20, "white");
            this.timerLabel.render(ctx);
        }

    };
}