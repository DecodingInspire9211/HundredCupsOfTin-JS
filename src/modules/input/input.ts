import { global } from "../global.js";

function move(event: KeyboardEvent) {
    // event is declared but its value is never read

    // // Example Movement for the PacMan Game
    // switch(event.key) {
    //     case "d":
    //         global.playerObject.xVelocity = 100;
    //         global.playerObject.yVelocity = 0;
    //         //global.playerObject.switchCurrentSprites(0, 2);
    //         break;
    //     case "a":
    //         global.playerObject.xVelocity = -100;
    //         global.playerObject.yVelocity = 0;
    //         //global.playerObject.switchCurrentSprites(6, 8);
    //         break;
    //     case "w":
    //         global.playerObject.xVelocity = 0;
    //         global.playerObject.yVelocity = -100;
    //         //global.playerObject.switchCurrentSprites(9, 11);
    //         break;
    //     case "s":
    //         global.playerObject.xVelocity = 0;
    //         global.playerObject.yVelocity = 100;
    //         //global.playerObject.switchCurrentSprites(3, 5);
    //         break;
    // }
}

function stop() {

    //if you just want to move as long as the player presses a key
    global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0;
}

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);