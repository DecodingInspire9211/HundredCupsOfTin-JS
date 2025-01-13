import { global } from "./modules/global.js";

// TODO: Implement Initialisation of the game

global.init();

function gameLoop(totalRunningTime) {
    // PREPARE FOR RENDERING
    global.clearCanvas();
    global.updateCanvasSize();

    // STATS
    global.dt(totalRunningTime);
    global.updateFPS();
    global.ctx.fillText(`FPS: ${Math.round(global.fps)} - ∂t: ${global.deltaTime}`, global.getCanvasBounds().left+64, global.getCanvasBounds().bottom-80);
    global.ctx.fillText(`left: ${global.getCanvasBounds().left}\ntop: ${global.getCanvasBounds().top}\nright: ${global.getCanvasBounds().right}\nbottom: ${global.getCanvasBounds().bottom}\n`, global.getCanvasBounds().left+64, global.getCanvasBounds().bottom-64);

    // UPDATE

    global.sceneManager.update();

    // RENDER

    global.sceneManager.render(global.ctx);

    // REQUEST ANIMATION FRAME
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);