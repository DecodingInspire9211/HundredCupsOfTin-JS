import { BaseGameObj } from "../../modules/gameobjs/baseGameObj.ts";
import {global} from "../../modules/global.ts";
import { Label } from "../../components/ui/label.ts";
import {Player} from "../player.ts";

export class Coffeemachine extends BaseGameObj {

    coffeeReady: boolean = false;
    brewing: boolean = false;
    wasTriggered: boolean = false;

    radiusTrigger: boolean = false;

    coffeeAtMachine: number = 0;

    timer: number = 0;
    timer2: number = 0;

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
        //console.log(`Player triggered Key.Act: ${this.wasTriggered}\nIs brewing: ${this.brewing}\nCoffee ready: ${this.coffeeReady}\nCoffee at machine: ${this.coffeeAtMachine}`);

        // START BREWING COFFEE AS LONG AS ITS NOT ALREADY BREWING, READY NOR FULL
        if(this.wasTriggered && !this.brewing && this.coffeeAtMachine <= 3)
        {
            global.economy.addExpenses(2.5);
            this.coffeeReady = false;
            this.brewing = true;
        } // IF IT IS BREWING, INCREMENT A TIMER UNTIL IT REACHES 3 SECONDS
        else if(this.brewing && !this.coffeeReady)
        {
            this.timer += global.deltaTime;

            // WHEN TIMER HIT 3 SECONDS; COFFEE IS READY
            if (this.timer >= 3) {
                this.coffeeReady = true;
                this.brewing = false;
                this.timer = 0;
                this.coffeeAtMachine++;

                // IF COFFEE IS READY, PLAYER CAN TAKE IT AND HAVE A COOL DOWN OF 2 SECONDS
                if (this.coffeeReady) {
                    this.timer2 += global.deltaTime;
                    if(this.timer2 >= 2) {
                        this.timer2 = 0;
                        this.coffeeReady = false;
                    }
                }
            }
        }

        // if (this.coffeeReady && this.coffeeAtMachine >= 3) {
        //     this.wasTriggered = false;
        //     this.coffeeReady = false;
        //     this.brewing = false;
        // }
    }

    update = () => {
        this.brewCoffee();
    };

    reactToTrigger = (triggeringObject: any) => {
        if (triggeringObject instanceof Player) {
            this.radiusTrigger = true;
            // if (this.coffeeReady) {
            //     console.log("coffee is ready");
            //     triggeringObject.hasCoffee = true;
            //     triggeringObject.amountCoffee += this.amountCoffee;
            //     this.coffeeReady = false;
            //     this.wasTriggered = false;
            // }
        } else {
            this.radiusTrigger = false;
        }
    }

    ui = (ctx: CanvasRenderingContext2D) => {
        this.timerLabel = new Label(this.x + 20, this.y, 250, 50, this.innerText, 20, "white");

        if(this.radiusTrigger && !this.brewing && !this.coffeeReady) {
            this.innerText = "Brew (E)"
        }
        if(this.radiusTrigger && this.brewing) {
            this.innerText = `${Math.round(this.timer)} of 3 seconds`
        }
        if(this.radiusTrigger && this.coffeeReady) {
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