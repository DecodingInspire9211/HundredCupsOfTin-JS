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

    grid: Grid;

    // SPEED SCALAR
    speed: number = 1000;

    constructor(name: string, nickname: string, surname: string, x: number, y: number, width: number, height: number, grid: Grid) {
        super(name, x, y, width, height);

        this.fullName.nickname = nickname;
        this.fullName.surname = surname;

        this.x = x;
        this.y = y

        this.grid = grid;
    };

    public getFullName = () => {
        return this.fullName;
    }

    move = () => {
        //console.log(`${this.x} and ${this.y}`);
        //console.log(`keyfucker${global.handleInput.keyBinary}`);

        if ((global.handleInput.keyBinary & Key.Up) === Key.Up) {
            this.y -= 64; // this.speed * global.deltaTime;
        }
        if  ((global.handleInput.keyBinary & Key.Down) === Key.Down)  {

            this.y += 64; // this.speed * global.deltaTime;
        }
        if ((global.handleInput.keyBinary & Key.Left) === Key.Left) {
            this.x -= 64; // this.speed * global.deltaTime;
        }
        if ((global.handleInput.keyBinary & Key.Right) === Key.Right) {
            this.x += 64; // this.speed * global.deltaTime;
        }

        if ((global.handleInput.keyBinary & Key.None) === Key.None) {
            this.x = this.x;
            this.y = this.y;
        }
        //console.log("No key pressed)");

        global.handleInput.keyBinary = 0 << 0;
    }

    update = (): void => {
        this.move();
    }

    render = (ctx) => {
        // Add player render logic here
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    triggerRadius = () => {

    }

    reactToCollision = () => {

    }
}

export { Player };