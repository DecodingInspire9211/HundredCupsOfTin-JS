import { Scene } from "./scene.js";

export class SceneManager {
    currentScene = null;

    changeScene(newScene) {
        if (this.currentScene) {
            this.currentScene.destroy();
        }

        this.currentScene = newScene;
        this.currentScene.init();
    }

    update() {
        if (this.currentScene) {
            this.currentScene.update();
        }
    }

    render(ctx) {
        if (this.currentScene) {
            this.currentScene.render()
        }
    }
}