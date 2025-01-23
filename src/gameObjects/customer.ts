import {BaseGameObj} from "../modules/gameobjs/baseGameObj.ts";
import {Grid} from "../modules/gameobjs/grid.ts";
import {global} from "../modules/global.ts";
import {Key} from "../modules/input/keyHandler.ts";
import {Coffeemachine} from "./furniture/coffeemachine.ts";
import {Label} from "../components/ui/label.ts";
import {Player} from "./player.ts";

export class Customer extends BaseGameObj {
    gap = 12;

    name: string = "Customer";

    triggerDistance: number = 0;
    hasCoffee: boolean = false;
    keyPressed: boolean = false;


    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    actNotice: Label;

    orderTaken: boolean = false;
    served: boolean = false;
    earned: number = 0;

    source: string;

    timer: number = 0;

    constructor(source: string, name: string, x: number, y: number, width: number, height: number, zOrder: number, trigDist: number = 50, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);

        this.source = source;
        this.loadImagesFromSpritesheet(this.source, 1, 1);
        this.getBoxBounds();
        this.getTriggerBounds(trigDist);

        this.triggerDistance = trigDist;

        this.collidable = collidable;
        this.triggerable = triggerable;
        this.actNotice = new Label(this.x, this.y - 20, 50, 20, "", 16, "white");
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
        if (!this.orderTaken) {
            this.actNotice.text = "";
        }

        if (this.orderTaken && !this.served) {
            this.timer += global.deltaTime;

            this.actNotice.text = `Waiting... ${this.timer.toFixed(0)}s/12s`;
            if(this.served) {
                this.actNotice.text = "Thank you!";
                this.timer = 0;
            }

            if (this.timer > 12) {
                this.actNotice.text = "Took too long... Lost money";
                this.loseMoney();
            }
        }
    }

    ui = (ctx) => {
        this.actNotice.ui(ctx);
    }

    render = (ctx) => {
        let sprite = this.getNextSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    }

    reactToTrigger = (source) => {
        if (source instanceof Player) {

            if(!this.orderTaken) {
                this.actNotice.text = "Take Order (E)";
                if(global.handleInput.keyBinary & Key.Act) {
                    this.actNotice.text = "Order taken!";
                    this.orderTaken = true;
                }
            }

            if(this.orderTaken && !source.hasCoffee) {
                this.actNotice.text = "Where is my coffee?";
            }

            if(this.orderTaken && source.hasCoffee && !this.served) {
                this.actNotice.text = "Serve Order (E)";
                if(global.handleInput.keyBinary & Key.Act) {
                    this.actNotice.text = "Thank you!";
                    this.served = true;
                    this.orderTaken = false;
                    source.amountCoffee--;

                    if(source.amountCoffee < 0) {
                        source.amountCoffee = 0;
                    }
                }
            }

            if(this.served)
            {
                this.actNotice.text = "Earn Money (E)";
                if(global.handleInput.keyBinary & Key.Act) {
                    if(!this.keyPressed) {
                        this.earnMoney();
                        this.served = false;
                        this.orderTaken = false;
                        this.keyPressed = true;
                    }
                    else
                    {
                        this.keyPressed = false;
                    }

                }
            }

            // // START TEXT WHEN PLAYER IS NEAR CUSTOMER
            // if (!this.orderTaken) {
            //     this.checkForOrder();
            //
            //     // TAKE ORDER
            //     if (global.handleInput.keyBinary & Key.Act) {
            //         this.takeOrder();
            //     }
            // }
            //
            // // IDLE TEXT WHEN ORDER IS TAKEN BUT NOT SERVED YET
            // if (this.orderTaken && !this.served) {
            //     this.checkForServe();
            //     // SERVE ORDER
            //     if (this.orderTaken && (global.handleInput.keyBinary & Key.Act) && !this.served && !this.hasCoffee) {
            //         this.serveOrder(source);
            //     }
            // }
            //
            // if(this.served && this.hasCoffee) {
            //     this.actNotice.text = "Earn Money (E)";
            //     // EARN MONEY
            //     if ((global.handleInput.keyBinary & Key.Act) && this.served && this.hasCoffee) {
            //         this.earnMoney();
            //     }
            // }
        }
    }


    checkForOrder = () => {
        this.actNotice.text = "Take Order (E)";
    }

    takeOrder = () => {
        this.actNotice.text = "Order taken!";
        this.orderTaken = true;
        this.served = false;
    }

    checkForServe = () => {
        this.actNotice.text = "Serve Order (E)";
    }

    serveOrder = (player: Player) => {
        this.actNotice.text = "Order served!";
        this.served = true;

        // CHECK IF PLAYER HAS COFFEE
        // IF YES, REMOVE COFFEE FROM PLAYER
        // AND SET CUSTOMER TO SERVED STATUS
        if (player.amountCoffee > 0) {
            player.amountCoffee--;
            this.hasCoffee = true;
        }
    }

    receiveCoffee = () => {
        this.hasCoffee = true;
        //console.log("Customer received coffee");
    }

    earnMoney = () => {
        if (this.hasCoffee) {
            this.earned = 5;
            global.economy.addIncome(this.earned);
            this.actNotice.text = `Money earned: ${this.earned}`;

            this.hasCoffee = false;
            this.orderTaken = false;
        }
    }

    loseMoney = () => {
        this.earned = -5;
        global.economy.addExpenses(this.earned);
        this.actNotice.text  = `Money lost: ${this.earned}`;

        this.hasCoffee = false;
        this.orderTaken = false;
    }

    reactToCollision = (source) => {

    }
}