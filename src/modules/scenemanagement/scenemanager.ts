import { Scene } from "./scene.ts"; // Adjust the import path as necessary

export class SceneManager {
  private activeScenes: Scene[] = [];

  changeScene(
    newScene: Scene,
    // define whether the scenes should be allowed to stack on top of another
    // default value - false
    stackOn: boolean = false,
  ) {
    const namesOfActiveScenes = this.activeScenes.map(
      (activeScene) => activeScene.sceneName,
    );

    console.log("The new scene is", newScene);
    // log for awareness purposes
    if (this.activeScenes.length > 1) {
      console.debug(
        // use %c to make the output use CSS (next argument)
        "%c BE AWARE:\n Multiple scenes loaded\n They are:",
        "background: #222; color: #bada55",
        this.activeScenes,
      );
    }

    if (namesOfActiveScenes.includes(newScene.sceneName)) {
      console.debug(
        "%c BE AWARE:\n A scene with the same name is loaded already",
        "background: #222; color: #bada55",
      );
    }

    // if there is a loaded scene (and not the initial "null")
    // AND stackOn is not permitted
    if (this.activeScenes.length && !stackOn) {
      // delete all scenes, as with stackOn disallowed the next loaded scene should be the only one
      this.activeScenes.forEach((activeScene) => {
        console.log(activeScene);
        // cleanly destroy (one of the) active scene(s)
        activeScene.destroy();
      });
      this.activeScenes = [];
    }

    newScene.init();
    this.activeScenes.push(newScene);
  }

  update(deltaTime: number) {
    if (this.activeScenes.length) {
      // on last element
      this.activeScenes[this.activeScenes.length - 1].update(deltaTime);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.activeScenes.length) {
      this.activeScenes[this.activeScenes.length - 1].render(ctx);
    }
  }

  ui(uictx: CanvasRenderingContext2D) {
    if (this.activeScenes.length) {
      this.activeScenes[this.activeScenes.length - 1].ui(uictx);
    }
  }

  interact() {
    if (this.activeScenes.length) {
      this.activeScenes[this.activeScenes.length - 1].interact();
    }
  }
}
