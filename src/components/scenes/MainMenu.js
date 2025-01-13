import { Scene } from "../../modules/scenemanagement/scene.js";

export class MainMenu extends Scene {
    sceneName = "Main Menu";
    sceneObjects = [];

    init() {
        this.createObjects();
        console.log(`Scene ${this.sceneName} initialized`);
    }

    update() {

    }

    render() {
        for(let i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].render();
        }
    }

    destroy() {
        if (this.destroyObjects()) {
            console.log(`Scene ${this.sceneName} destroyed`);
        }
    }

    createObjects() {
        this.start = new Button(global.canvas.width / 2, global.canvas.height / 2, 200, 50, "Start", "white", "black", 20, "Pixelify Sans", "center", "middle", "pointer", () => {  
            global.sceneManager.changeScene(new GameScene());
        });
    }

    destroyObjects(sceneObjects) {
        // Check if there are objects in the scene
    }
}