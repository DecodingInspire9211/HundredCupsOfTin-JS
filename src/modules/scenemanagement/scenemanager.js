import { Scene } from "./scene.js";

export class SceneManager {
    constructor() {
        this.currentScene = null;
        this.activeScenes = [];
    }

    changeScene(newScene = typeof Scene) {
        if(this.currentScene == newScene) {
            console.log("Scene already active");
        } else if (this.currentScene) {
            console.log(this.activeScenes);
            this.activeScenes.pop();
            this.currentScene.destroy();
        }

        this.currentScene = newScene;
        this.currentScene.init();
        this.activeScenes.push(this.currentScene);
        console.log(this.activeScenes);
    }

    // loadAdditive(addScene = typeof Scene) {
    //     this.addScene.init();
    //     this.activeScenes.push(this.addScene);
    //     console.log(this.activeScenes);
    // }

    // unloadAdditive(addScene = typeof Scene) {
    //     this.addScene.destroy();
    //     this.activeScenes.pop();
    //     console.log(this.activeScenes);
    // }

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