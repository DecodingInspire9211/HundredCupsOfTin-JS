import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";
import {Grid} from "../modules/gameobjs/grid.ts";
import { global } from "../modules/global.ts";
import { Key } from "../modules/input/keyHandler.ts";
import { Coffeemachine } from "./furniture/coffeemachine.ts";
import {Label} from "../components/ui/label.ts";
import {Player} from "./player.ts";

export class Customer extends BaseGameObj {
    gap = 12;

    name: string = "Customer";

    triggerDistance: number = 0;
    hasCoffee: boolean = false;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 2,
        "currentSpriteIndex": 0
    };

    actNotice: Label | null;
    actText: string = "";

    orderTaken: boolean = false;
    served: boolean = false;
    earned: number = 0;

    constructor(name: string, x: number, y: number, width: number, height: number, zOrder: number, trigDist: number = 50, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);

        this.loadImagesFromSpritesheet("../src/components/imgs/playertest.png", 1, 1);
        this.getBoxBounds();
        this.getTriggerBounds(trigDist);

        this.triggerDistance = trigDist;

        this.collidable = collidable;
        this.triggerable = triggerable;
    }

    getBoxBounds = () => {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y + (this.height - (this.height / 3)),
            bottom: this.y + this.height
        }
    }

    getTriggerBounds = (triggerDistance: number) => {
        return {
            left: this.getBoxBounds().left - triggerDistance,
            right: this.getBoxBounds().right + triggerDistance,
            top: this.getBoxBounds().top - triggerDistance,
            bottom: this.getBoxBounds().bottom + triggerDistance
        }
    }

    update = () => {

    }

    ui = (ctx) => {
        this.actNotice = new Label(this.x, this.y - 20, 50, 20, `${this.actText}`, 16, "white");

        this.actNotice.ui(ctx);
    }

    render = (ctx) => {
            //let sprite = this.getNextSprite();
            ctx.imageSmoothingEnabled = false;
            //ctx.drawImage(sprite, this.x, this.y, this.width, this.height);

            ctx.fillStyle = "white";
            ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToTrigger = (source) => {
        if(source instanceof Player) {

            // START TEXT WHEN PLAYER IS NEAR CUSTOMER
            if(!this.orderTaken)
            {
                this.checkForOrder();
            }

            // TAKE ORDER
            if(global.handleInput.keyBinary & Key.Act)
            {
                this.takeOrder();

                // IDLE TEXT WHEN ORDER IS TAKEN BUT NOT SERVED YET
                if(this.orderTaken && !this.served)
                {
                    this.checkForServe();
                }
            }



            // SERVE ORDER
            if(this.orderTaken && (global.handleInput.keyBinary & Key.Act) && !this.served && !this.hasCoffee)
            {
                this.serveOrder(source);
            }

            // EARN MONEY
            if((global.handleInput.keyBinary & Key.Act) && this.served && this.hasCoffee)
            {
                this.earnMoney();
            }


        }
    }

    checkForOrder = () => {
        this.actText = "Take Order (E)";
    }

    takeOrder = () => {
        this.actText = "Order taken!";
        this.orderTaken = true;
    }

    checkForServe = () => {
        this.actText = "Serve Order (E)";
    }

    serveOrder = (player: Player) => {
        this.actText = "Order served!";
        this.served = true;

        //CHECK IF PLAYER HAS COFFEE
        // IF YES, REMOVE COFFEE FROM PLAYER
        // AND SET CUSTOMER TO SERVED STATUS
        if(player.amountCoffee > 0)
        {
            player.amountCoffee--;
            this.hasCoffee = true;
        }
    }

    earnMoney = () => {
        if(this.hasCoffee)
        {
            this.earned = 5;
            global.economy.addIncome(this.earned);
            this.actText = `Money earned: ${this.earned}`;
        }
    }

    reactToCollision = (source) => {
        console.log("Customer is collided by: " + source.name);
    }
}