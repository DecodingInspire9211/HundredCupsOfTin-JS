import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";
import {Grid} from "../modules/gameobjs/grid.ts";
import { global } from "../modules/global.ts";
import { Key } from "../modules/input/keyHandler.ts";
import { Coffeemachine } from "./coffeemachine.ts";
import {Label} from "../components/ui/label.ts";

class Player extends BaseGameObj {
    name: string = "Player";

    fullName = {
        nickname: "",
        surname: "",
    };

    x: number;
    y: number;

    // SPEED SCALAR
    speed: number = 256;
    velocity: number = 0;

    private previousX: number = 0;
    private previousY: number = 0;

    private triggerDistance: number = 0;

    wasTriggered: boolean = false;
    hasCoffee: boolean = false;
    amountCoffee: number = 0;

    amountLabel: Label = new Label(0, 0, 0, 0, "", 0, "");
    public single: number = 0;


    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 2,
        "currentSpriteIndex": 0
    };

    constructor(name: string, nickname: string, surname: string, x: number, y: number, width: number, height: number, zOrder: number, trigDist: number = 50, single? : any, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.single = typeof single === "number" ? single : 0;

        if(typeof this.single === "number") {
            this.animationData.firstSpriteIndex = single;
            this.animationData.lastSpriteIndex = single;
        }
        else {
            this.animationData.firstSpriteIndex = 0;
            this.animationData.lastSpriteIndex = 2;
        }
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
        this.zOrder = grid.getCurrentTilePos(this.x, this.y).y;
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
        if(this.amountCoffee == 1) {
            this.amountLabel = new Label(global.getCanvasBounds().left + 12, global.getCanvasBounds().bottom - 256, 250, 50, `Carrying ${this.amountCoffee} Coffee Cup`, 20, "white");
            this.amountLabel.render(ctx);
        }
        else
        {
            this.amountLabel = new Label(global.getCanvasBounds().left + 12, global.getCanvasBounds().bottom - 256, 250, 50, `Carrying ${this.amountCoffee} Coffee Cups`, 20, "white");
            this.amountLabel.render(ctx);
        }
    }

    update = (): void => {
        this.move();
    }

    render = (ctx: CanvasRenderingContext2D) => {
        if(typeof this.single === "number") {
            let stat = this.animationData.animationSprites[this.single];
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(stat, this.x, this.y, this.width, this.height);
        }
        else {
            let sprite = this.getNextSprite();
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        }

        //draw triggerbounds
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.getTriggerBounds(this.triggerDistance).left, this.getTriggerBounds(this.triggerDistance).top, this.getTriggerBounds(this.triggerDistance).right - this.getTriggerBounds(this.triggerDistance).left, this.getTriggerBounds(this.triggerDistance).bottom - this.getTriggerBounds(this.triggerDistance).top);};

    reactToTrigger = (triggeringObject: any) => {
        if (triggeringObject instanceof Coffeemachine) {
            console.log("Player triggered Coffeemachine");
            if (global.handleInput.keyBinary & Key.Act) {
                triggeringObject.wasTriggered = true;
                this.wasTriggered = true;
            } else {
                this.wasTriggered = false;
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