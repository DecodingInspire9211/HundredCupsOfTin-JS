import { Scene } from './scene.ts'; // Adjust the import path as necessary

export class SceneManager {
    private currScene: Scene | null = null;
    private activeScenes: Scene[] = [];

    changeScene(newScene: Scene) {
        if(this.currScene == newScene) {
            console.log("Scene already active");
        } else if (this.currScene) {
            console.log(this.activeScenes);
            this.activeScenes.pop();
            this.currScene.destroy();
        }
        this.currScene = newScene;
        this.currScene.init();
        this.activeScenes.push(this.currScene);
        console.log(this.activeScenes);
    }

    update(deltaTime: number) {
        if (this.currScene) {
            this.currScene.update(deltaTime);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.currScene) {
            this.currScene.render(ctx);
        }
    }

    ui(uictx: CanvasRenderingContext2D)
    {
        if (this.currScene) {
            this.currScene.ui(uictx)
        }
    }

    interact() {
        if (this.currScene) {
            this.currScene.interact();
        }
    }
}