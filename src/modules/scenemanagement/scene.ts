import { BaseGameObj } from "../gameobjs/baseGameObj";

export class Scene {
    sceneName: string;
    sceneObjects: [];

    init: () => void;
    update: (deltaTime: number) => void;
    render: (ctx: CanvasRenderingContext2D) => void;
    destroy: () => void;

    constructor() {
        this.sceneName = "";
        this.sceneObjects = [];

        this.init = () => {};
        this.update = () => {};
        this.render = (ctx: CanvasRenderingContext2D) => {};
        this.destroy = () => {};

        this.createObjects = () => {};
        this.destroyObjects = () => {};
        this.resetObjects = () => {};
    }

    createObjects: () => void;
    destroyObjects: () => void;
    resetObjects: () => void;
}