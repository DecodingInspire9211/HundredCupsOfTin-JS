import { MainMenu } from "../components/scenes/MainMenu.js";
import { SceneManager } from "./scenemanagement/scenemanager.js";

import { loadFont } from "./internals/loadFont.js";

const global = {};

// GLOBAL VARS

global.canvas = document.getElementById("canvas");  // Get the canvas element
global.ctx = global.canvas.getContext("2d");        // Get the 2D context of the canvas
global.previousTRT = 0;                             // Store the previous timestamp
global.fps = 0;                                     // Store the frames per second
global.deltaTime = 0;                               // Store the delta time
global.allGameObjects = [];                         // Store all game objects
global.playerObject = {};                           // Store the player object

global.sceneManager = new SceneManager();           // Store the scene manager

global.ctx.imageSmoothingEnabled = false;           // Disable image smoothing for pixel art
global.ctx.font = "";             // Set the default font

// GLOBAL FUNCTIONS

global.clearCanvas = function () {
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
}

global.dt = function (totalRunningTime) {
    let currentTRT = totalRunningTime;
    global.deltaTime = (currentTRT - global.previousTRT) / 1000;
    global.previousTRT = currentTRT;
}

global.updateFPS = function () {
    global.fps = Math.round(1 / global.deltaTime);
}

global.init = function () {
    global.updateCanvasSize();
    global.getCanvasBounds();
    
    loadFont('Pixelify Sans', 'src/fonts/PixelifySans-VariableFont_wght.ttf');
    global.ctx.font = "16px Pixelify Sans";

    global.sceneManager.changeScene(new MainMenu());
   

    console.log("Game initialized");
}

global.updateCanvasSize = function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

global.getCanvasBounds = function () {
    return {
        left: 0,
        right: this.canvas.width,
        top: 0,
        bottom: this.canvas.height
    };
}

global.checkCollisionWithOther = function (source) {
    for (let i = 0; i < this.allGameObjects.length; i++) {
        let target = this.allGameObjects[i];
        if (target.active) {
            let collisionHappened = this.detectBoxCollision(source, target);
            if (collisionHappened) {
                source.reactToCollision(target);
                target.reactToCollision(source);
            }
        }
    }
}

global.detectBoxCollision = function (source, target) {
    let sourceBounds = source.getBounds();
    let targetBounds = target.getBounds();

    return sourceBounds.left < targetBounds.right &&
        sourceBounds.right > targetBounds.left &&
        sourceBounds.top < targetBounds.bottom &&
        sourceBounds.bottom > targetBounds.top;
}

export { global };