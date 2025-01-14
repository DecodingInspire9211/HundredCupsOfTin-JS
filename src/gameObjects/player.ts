import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";

class Player extends BaseGameObj {
    name: string = "Player";
    
    x: number = 0;
    y: number = 0;

    width: number = 16;
    height: number = 32;

    // SPEED SCALAR
    speed: number = 1;

    xVelocity: number = 0;
    yVelocity: number = 0;

    constructor(name: string, x: number, y: number, width: number, height: number) {
        super(name, x, y, width, height);
    };

    update = function() {
        // Add player update logic here
    };

    render = function() {
        // Add player render logic here
    };
}

export { Player };