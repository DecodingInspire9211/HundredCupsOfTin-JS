import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";
import {Grid} from "../modules/gameobjs/grid.ts";
import { global } from "../modules/global.ts";
import { Key } from "../modules/input/keyHandler.ts";
import { Coffeemachine } from "./furniture/coffeemachine.ts";
import {Label} from "../components/ui/label.ts";
import {WinScreen} from "../components/scenes/WinScreen.ts";
import {LoseScreen} from "../components/scenes/LoseScreen.ts";

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

    constructor(name: string, nickname: string, surname: string, x: number, y: number, width: number, height: number, zOrder: number, trigDist: number = 50, single? : any, collidable?: boolean, triggerable?: boolean) {
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
    };

    public getFullName = () => {
        return this.fullName.nickname + " " + this.fullName.surname;
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

    update_player_zOrder_by_ytile(grid: Grid) {
        this.zOrder = Math.floor(grid.getCurrentTilePos(this.x, this.y).y);
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

    ui = (ctx) => {
        this.playername = new Label(this.gap + 300, global.ui!.height - this.gap - 56, 64, 64, this.getFullName(), 24, "black");
        this.coffeeInHand = new Label(this.gap + 266, global.ui!.height - (this.gap * 7.25), 64, 0, `Coffee in Hand: ${this.amountCoffeeText}`, 12, "white" );
        this.money = new Label(this.gap + 266, global.ui!.height - (this.gap * 7.25), 0, 64, `${global.economy.getStats().currency.symbol} ${global.economy.getStats().money}`, 16, "black" );


        this.playername.ui(ctx);
        this.coffeeInHand.ui(ctx);
        this.money.ui(ctx);

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
                this.hasCoffee = true;
            }
            else {
                triggeringObject.wasTriggered = false;
                this.wasTriggered = false;
            }
        }
        if(triggeringObject.name === "Counter") {
            console.log("Counter");
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