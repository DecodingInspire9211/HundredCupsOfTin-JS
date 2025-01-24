import { BaseGameObj } from "../../modules/gameobjs/baseGameObj.ts";
import {global} from "../../modules/global.ts";
import { Label } from "../../components/ui/label.ts";
import {Player} from "../player.ts";
import {Key} from "../../modules/input/keyHandler.ts";

export class Coffeemachine extends BaseGameObj {

    coffeeReady: boolean = false;
    brewing: boolean = false;
    wasTriggered: boolean = false;

    radiusTrigger: boolean = false;

    coffeeAtMachine: number = 0;

    timer: number = 0;
    timer2: number = 0;
    textTimer: number = 0;

    timerLabel: Label;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 5,
        "currentSpriteIndex": 0
    };

    constructor(name: string, x: number, y: number, width: number, height:number, zOrder:number, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);

        this.collidable = collidable;
        this.triggerable = triggerable;

        this.timerLabel = new Label(this.x + 20, this.y, 250, 50, "", 20, "gold", "left");

        this.loadImagesFromSpritesheet("../src/components/imgs/coffeemachine_spritesheet.png", 2, 3);
        this.animationData.timePerSprite = 0.5;

        this.switchCurrentSprites(0, 1);
    }

    brewCoffee = () => {
        //console.log(`Player triggered Key.Act: ${this.wasTriggered}\nIs brewing: ${this.brewing}\nCoffee ready: ${this.coffeeReady}\nCoffee at machine: ${this.coffeeAtMachine}`);

        // START BREWING COFFEE AS LONG AS ITS NOT ALREADY BREWING, READY NOR FULL
        if(this.wasTriggered && !this.brewing && this.coffeeAtMachine < 3)
        {
            this.switchCurrentSprites(2, 3);

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

        if(this.brewing)
        {
            this.timerLabel.text = `${Math.round(this.timer)} of 3 seconds`
            this.switchCurrentSprites(2, 3);
        }
        if(this.coffeeReady)
        {
            this.switchCurrentSprites(4, 5);
        }



        if(this.radiusTrigger && !this.brewing) {
            //this.timerLabel.text = "Brew (E)"
        }

        this.brewCoffee();

        this.textTimer += global.deltaTime;

        if(this.textTimer >= 3) {
            this.textTimer = 0;
            this.timerLabel.text = "";
        }

        this.timerLabel.text = "";

    }

    reactToTrigger = (triggeringObject: any) => {
        if (triggeringObject instanceof Player) {
            if(this.coffeeAtMachine <= 0)
            {
                this.coffeeReady = false;
            }

            if(this.coffeeAtMachine <= 0 || !this.brewing)
            {
                this.timerLabel.text = "Brew (E)";
            }
            else
            {
                this.timerLabel.text = `${this.coffeeAtMachine} cups ready! Take (Q)`
            }

            if(this.coffeeReady)
            {
                this.timerLabel.text = `${this.coffeeAtMachine} cups ready! Take (Q)`
                if(global.handleInput.keyBinary & Key.Take) {
                    if(this.coffeeAtMachine < 0) {
                        this.timerLabel.text = "Brew (E)";
                        this.coffeeReady = false;
                    }
                }
            }

            if(this.brewing) {
                this.timerLabel.text = `${Math.round(this.timer)} of 3 seconds`
            }

            if(this.coffeeAtMachine >= 3 && !this.brewing) {
                this.timerLabel.text = "Machine is full! Take (Q)";
            }

            // if (this.coffeeReady) {
            //     console.log("coffee is ready");
            //     triggeringObject.hasCoffee = true;
            //     triggeringObject.amountCoffee += this.amountCoffee;
            //     this.coffeeReady = false;
            //     this.wasTriggered = false;
            // }
        }
    }



    ui = (ctx: CanvasRenderingContext2D) => {
        this.timerLabel.ui(ctx);
    }

    render = (ctx: CanvasRenderingContext2D) => {
        let sprite = this.getNextSprite();
        if (sprite instanceof HTMLImageElement) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        } else {
            console.error("Invalid sprite type:", sprite);
        }

    };
}