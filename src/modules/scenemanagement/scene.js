export class Scene {
    constructor(sceneName) {
        this.sceneName = sceneName;
        this.sceneObjects = [];

        this.init = function () { };
        this.update = function () { };
        this.render = function () { };
        this.destroy = function () { };

        this.createObjects = function () { };
        this.destroyObjects = function () { };
        this.resetObjects = function () { };
    }

    init() {
        this.createObjects();
        console.log(`Scene ${this.sceneName} initialized`);

    }

    update() {

    }

    render() {

    }

    destroy() {
        if (this.destroyObjects()) {
            console.log(`Scene ${this.sceneName} destroyed`);
        }
    }

    createObjects() {
    }

    destroyObjects(sceneObjects) {
        // Check if there are objects in the scene, if so, destroy them
        if (this.sceneObjects.length > 0) {
            // This foreach will call the destroy method of each object inside sceneObjects!
            this.sceneObjects.forEach(object => {
                object.destroy();
            });

            // Clear the sceneObjects array
            this.sceneObjects = [];

            // Return true to indicate that the objects were destroyed
            return true;
        }
    }

    resetObjects() {

    }
}