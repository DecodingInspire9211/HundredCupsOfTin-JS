import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";
import {Grid} from "../modules/gameobjs/grid.ts";
import { global } from "../modules/global.ts";
import { Key } from "../modules/input/keyHandler.ts";
import {TILE_SIZE} from "../../lib/constants.ts";


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

    constructor(name: string, nickname: string, surname: string, x: number, y: number, width: number, height: number, zOrder: number) {
        super(name, x, y, width, height, zOrder);

        this.fullName.nickname = nickname;
        this.fullName.surname = surname;

        this.x = x;
        this.y = y;
        this.getBoxBounds();
    };

    public getFullName = () => {
        return this.fullName;
    }

    getBoxBounds = () => {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y + (this.height / 2),
            bottom: this.y + this.height
        }
    }

    update_player_zOrder(grid: Grid) {
        if(this.y > ((grid.grid_height / grid.tiles) * 4)) {
            this.zOrder = 5;
            console.log("Player zOrder is 5");
        } else {
            this.zOrder = 1;
        }

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

    update = (): void => {
        this.move();
    }

    render = (ctx: CanvasRenderingContext2D) => {
        // Add player render logic here
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    triggerRadius = () => {

    }

    reactToCollision = (collidingObject: any) => {
        switch (collidingObject.name) {
            case "Wall":
            case "Counter":
            case "WallCounter":
            case "Pseudo":
                this.velocity = 0;
                this.x = this.previousX;
                this.y = this.previousY;
                break;

        }
    }
}

export { Player };