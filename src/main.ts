// @ts-ignore
import { global } from "./modules/global.ts";

global.init();

function gameLoop(totalRunningTime: number) {  

    // PREPARE FOR RENDERING
    global.clearCanvas();
    global.updateCanvasSize();

    // STATS
    global.updateDeltaTime(totalRunningTime);
    global.updateFPS();

    global.ctx!.font = "16px Pixelify Sans";
    global.ctx!.fillStyle = "white";
    global.ctx!.fillText(`FPS: ${Math.round(global.fps)} - ∂t: ${global.deltaTime}`, global.getCanvasBounds().left+64, global.getCanvasBounds().bottom-80);
    global.ctx!.fillText(`left: ${global.getCanvasBounds().left}\ntop: ${global.getCanvasBounds().top}\nright: ${global.getCanvasBounds().right}\nbottom: ${global.getCanvasBounds().bottom}\n`, global.getCanvasBounds().left+64, global.getCanvasBounds().bottom-64);


    // update
    global.sceneManager.update(global.deltaTime);

    // render
    global.sceneManager.render(global.ctx!);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);