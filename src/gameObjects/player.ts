import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";
import {Grid} from "../modules/gameobjs/grid.ts";
import { global } from "../modules/global.ts";
import { Key } from "../modules/input/keyHandler.ts";
import { Coffeemachine } from "./furniture/coffeemachine.ts";
import {Label} from "../components/ui/label.ts";
import {ImageCl} from "../components/ui/image.ts";
import {Customer} from "./customer.ts";

class Player extends BaseGameObj {
    gap = 12;

    name: string = "Player";

    fullName = {
        nickname: "",
        surname: "",
    };

    // SPEED SCALAR
    speed: number = 256;
    velocity: number = 0;

    previousX: number = 0;
    previousY: number = 0;

    triggerDistance: number = 0;

    wasTriggered: boolean = false;
    hasCoffee: boolean = false;
    amountCoffee: number = 0;

    amountCoffeeText: string = `${this.amountCoffee}`;
    public single: number = 0;

    profile: ImageCl;
    profitdisplay: Label;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 2,
        "currentSpriteIndex": 0
    };

    playername: Label;
    coffeeInHand: Label;
    money: Label;

    constructor(name: string, nickname: string, surname: string, x: number, y: number, width: number, height: number, zOrder: number, trigDist: number = 15, single? : any, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);

        this.single = typeof single === "number" ? single : 0;

        this.animationData.firstSpriteIndex = single;
        this.animationData.lastSpriteIndex = single;
        //this.loadImages();
        this.loadImagesFromSpritesheet("../src/components/imgs/playertest.png", 1, 1);

        this.getBoxBounds();
        this.getTriggerBounds(trigDist);

        this.collidable = collidable;
        this.triggerable = triggerable;

        this.triggerDistance = trigDist;
        this.wasTriggered = false;

        this.fullName.nickname = nickname;
        this.fullName.surname = surname;

        this.amountCoffeeText = "";

        this.profile = new ImageCl(
            "src/components/imgs/profile.png",
            this.gap,
            global.ui!.height - this.gap - 256,
            256,
            256,
            24,
            1
        );
    };

    public getFullName = () => {
        return this.fullName.nickname + " " + this.fullName.surname;
    }

    getBoxBounds = () => {
        return {
            left: this.x+4,
            right: this.x + this.width-4,
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

    update_player_zOrder_by_ytile(grid: Grid) {
        this.zOrder = Math.floor(grid.getCurrentTilePos(this.x, this.y).y);
        //console.log(this.zOrder);
    }

    move = () => {
        //console.log(`${this.x} and ${this.y}`);

        let moveX = 0;
        let moveY = 0;

        if ((global.handleInput.keyBinary & Key.Up) === Key.Up) {
            moveY -= this.speed * global.deltaTime;
        }
        if  ((global.handleInput.keyBinary & Key.Down) === Key.Down)  {

            moveY += this.speed * global.deltaTime;
        }
        if ((global.handleInput.keyBinary & Key.Left) === Key.Left) {
            moveX -= this.speed * global.deltaTime;
        }
        if ((global.handleInput.keyBinary & Key.Right) === Key.Right) {
            moveX += this.speed * global.deltaTime;
        }

        if (moveX !== 0 && moveY !== 0) {
            moveX /= Math.SQRT2;
            moveY /= Math.SQRT2;
        }

        this.x += moveX;
        this.y += moveY;

        //console.log("No key pressed)");

        //global.handleInput.keyBinary = 0 << 0;
    }

    ui = (uictx) => {
        global.economy.getStats();

        this.profitdisplay = new Label(global.ui!.width - 96, global.ui!.height - 64, 64, 64, `Income: ${global.economy.getStats().income}\n\rExpenses: ${global.economy.getStats().expenses}`, 16, "white", "right");

        this.playername = new Label(this.gap + 256, global.ui!.height - this.gap - 56, 64, 64, this.getFullName(), 24, "black", "left");
        this.coffeeInHand = new Label(this.gap + 256, global.ui!.height - (this.gap * 7.25), 64, 0, `${this.amountCoffeeText}`, 12, "white", "left" );
        this.money = new Label(this.gap + 256, global.ui!.height - (this.gap * 7.25), 0, 64, `${global.economy.getStats().currency.symbol} ${global.economy.getStats().money}`, 16, "black", "left");


        this.playername.ui(uictx);
        this.coffeeInHand.ui(uictx);
        this.money.ui(uictx);
        this.profile.ui(uictx);
        this.profitdisplay.ui(uictx);

    }

    update = (): void => {
        this.move();
        global.economy.update();
    }

    render = (ctx: CanvasRenderingContext2D) => {
        if (typeof this.single === "number") {
            let stat = this.animationData.animationSprites[this.single];
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(stat, this.x, this.y, this.width, this.height);
        } else {
            let sprite = this.getNextSprite();
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        }
    }
        //draw triggerbounds
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(this.getTriggerBounds(this.triggerDistance).left, this.getTriggerBounds(this.triggerDistance).top, this.getTriggerBounds(this.triggerDistance).right - this.getTriggerBounds(this.triggerDistance).left, this.getTriggerBounds(this.triggerDistance).bottom - this.getTriggerBounds(this.triggerDistance).top);};

    reactToTrigger = (triggeringObject: any) => {
        if (triggeringObject instanceof Coffeemachine) {

            // HANDLE KEY PRESS - ACT
            if (global.handleInput.keyBinary & Key.Act) {
                triggeringObject.wasTriggered = true;
            } // HANDLE TAKING COFFEE IF "TAKE" KEY IS PRESSED AND IF THE COFFEEMACHINE HAS COFFEE READY
            else if ((global.handleInput.keyBinary & Key.Take) && triggeringObject.coffeeReady)
            {
                if(triggeringObject.coffeeAtMachine > 0) {
                    // Player can't take more than 3 coffee cups at once
                    const coffeeToTake = Math.min(triggeringObject.coffeeAtMachine, 3 - this.amountCoffee);
                    triggeringObject.coffeeAtMachine -= coffeeToTake;

                    this.amountCoffee += coffeeToTake;
                    this.amountCoffeeText = `Coffee in Hand: ${this.amountCoffee}`;
                    this.wasTriggered = false;
                }

                if(this.amountCoffee > 3) {
                    this.amountCoffee = 3;
                    triggeringObject.coffeeAtMachine = 0;
                    this.wasTriggered = false;
                }

                if(this.amountCoffee >= 1)
                {
                    this.hasCoffee = true;
                }
                else {
                    this.hasCoffee = false;
                }
            }
            else {
                triggeringObject.wasTriggered = false;
                this.wasTriggered = false;
            }
        }
        //TODO: PLAYER GIVES MORE THAN 1 COFFEE TO CUSTOMER
        if(triggeringObject instanceof Customer) {
            // HANDLE GIVING COFFEE TO CUSTOMER
            if ((global.handleInput.keyBinary & Key.Act) && this.hasCoffee && !triggeringObject.hasCoffee) {
                // Only remove coffee from player if the customer has more than 0
                if(this.amountCoffee > 0) {
                    this.amountCoffee--;
                    triggeringObject.receiveCoffee();
                }
                
                this.amountCoffeeText = `Coffee in Hand: ${this.amountCoffee}`;

                if (this.amountCoffee <= 0) {
                    this.amountCoffee = 0;
                    this.hasCoffee = false;
                }
            }
        }
    }


    reactToCollision = (collidingObject: any) => {
        switch (collidingObject.name) {
            case "Wall":
            case "Counter":
            case "WallCounter":
            case "Pseudo":
            case "Chair":
            case "Table":
                this.velocity = 0;
                this.x = this.previousX;
                this.y = this.previousY;
                break;

        }
    }
}

export { Player };