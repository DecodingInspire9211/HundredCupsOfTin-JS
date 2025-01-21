import { BaseGameObj } from "../../modules/gameobjs/baseGameObj.ts";
import {global} from "../../modules/global.ts";
import { Label } from "../../components/ui/label.ts";
import {Player} from "../player.ts";

export class Coffeemachine extends BaseGameObj {

    coffeeReady: boolean = false;
    brewing: boolean = false;
    wasTriggered: boolean = false;

    radiusTrigger: boolean = false;

    amountCoffee: number = 0;

    timer: number = 0;

    timerLabel: Label | null;

    innerText: string = "";
    constructor(name: string, x: number, y: number, width: number, height:number, zOrder:number, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);

        this.collidable = collidable;
        this.triggerable = triggerable;

        this.timerLabel = new Label(0, 0, 0, 0, "", 0, "");

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
        this.coffeeReady = false;
        this.brewing = true;
        console.log("Brewing coffee...");
        this.timer += global.deltaTime;
        if (this.timer >= 3) {
            this.coffeeReady = true;
            this.brewing = false;
            this.timer = 0;
        }

        if ((this.timer == 3) && this.coffeeReady) {
            this.coffeeReady = false;
            this.amountCoffee++;
            console.log(`Coffeemachine has ${this.amountCoffee} coffee`);
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
            //console.log("Player is near coffee machine");
            if(this.coffeeReady)
            {
                console.log("coffee is ready");
                triggeringObject.hasCoffee = true;
                triggeringObject.amountCoffee += this.amountCoffee;
                this.coffeeReady = false;
                this.wasTriggered = false;
            }
            else
            {
                triggeringObject.hasCoffee = triggeringObject.hasCoffee;
                triggeringObject.amountCoffee = triggeringObject.amountCoffee;
            }
        }

        if(!(triggeringObject instanceof Player)) {
            this.radiusTrigger = false;
        }
    }

    ui = (ctx: CanvasRenderingContext2D) => {
        this.timerLabel = new Label(this.x + 20, this.y, 250, 50, this.innerText, 20, "white");

        if(this.radiusTrigger) {
            this.innerText = "Brew (E)"
        }
        if(this.radiusTrigger && this.brewing) {
            this.innerText = `${Math.round(this.timer)} of 3 seconds`
        }
        if(this.coffeeReady) {
            this.innerText = "Coffee ready! Take (Q))"
        }
        if(!this.radiusTrigger) {
            this.innerText = "";
        }

        this.timerLabel.ui(ctx);
    }

    render = (ctx: CanvasRenderingContext2D) => {
        let sprite = this.getNextSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);

    };
}