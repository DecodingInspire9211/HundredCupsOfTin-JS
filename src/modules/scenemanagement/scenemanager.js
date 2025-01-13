import { Scene } from "./scene.js";

export class SceneManager {
    constructor() {
        this.currentScene = null;
    }

    changeScene(newScene = typeof Scene) {
        if (this.currentScene) {
            this.currentScene.destroy();
        }

        this.currentScene = newScene;
        this.currentScene.init();
    }

    update(deltaTime) {
        if (this.currentScene) {
            this.currentScene.update(deltaTime);
        }
    }

    render(ctx) {
        if (this.currentScene) {
            this.currentScene.render(ctx)
        }
    }
}