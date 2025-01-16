import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";
import {global} from "../modules/global.ts";
import {Grid} from "../modules/gameobjs/grid.ts";

class Player extends BaseGameObj {
    name: string = "Player";

    fullName = {
        nickname: "",
        surname: "",
    };

    x: number = 0;
    y: number = 0;

    tileX: number = 0;
    tileY: number = 0;

    grid: Grid;

    // SPEED SCALAR
    speed: number = 1;

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
        // let direction = global.handleInput.direction;
        //
        // if(this.grid.getTilePos().y < 0)
        // {
        //     this.grid.setTilePos(this.grid.getTilePos().x, 0);
        // }
        //
        // if(this.grid.getTilePos().y > this.grid.tiles)
        // {
        //     this.grid.setTilePos(this.grid.getTilePos().x, 12);
        // }
        //
        // if(this.x < 0)
        // {
        //     this.grid.setTilePos(0, this.grid.getTilePos().y);
        // }
        //
        // if(this.x > this.grid.tiles)
        // {
        //     this.grid.setTilePos(12, this.grid.getTilePos().y);
        // }
        //
        // switch(direction) {
        //     case "up":
        //         console.log("UP");
        //         this.grid.setPos(this.x, this.y - 1);
        //         break;
        //     case "down":
        //         console.log("DOWN");
        //         this.grid.setPos(this.x, this.y + 1);
        //         break;
        //     case "left":
        //         console.log("LEFT");
        //         this.grid.setPos(this.x - 1 , this.y);
        //         break;
        //     case "right":
        //         console.log("RIGHT");
        //         this.grid.setPos(this.x + 1, this.y + 1);
        //         break;
        // }
    }

    update = (): void => {
        this.move();
    }

    render = function(ctx) {
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