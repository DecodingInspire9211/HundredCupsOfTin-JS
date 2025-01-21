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

    global.uictx!.font = "16px Pixelify Sans";
    global.uictx!.fillStyle = "white";
    global.uictx!.fillText(`FPS: ${Math.round(global.fps)} - ∂t: ${global.deltaTime}`, global.getCanvasBounds().left, global.getCanvasBounds().bottom);
    //global.ctx!.fillText(`left: ${global.getCanvasBounds().left}\ntop: ${global.getCanvasBounds().top}\nright: ${global.getCanvasBounds().right}\nbottom: ${global.getCanvasBounds().bottom}\n`, global.getCanvasBounds().left+64, global.getCanvasBounds().bottom-64);

    // update
    global.sceneManager.update(global.deltaTime);

    // render
    global.allGameObjects.sort((a, b) => a.zOrder - b.zOrder);
    global.sceneManager.interact();
    global.sceneManager.render(global.ctx!);
    global.sceneManager.ui(global.uictx!);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);