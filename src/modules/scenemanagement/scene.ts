import { BaseGameObj } from "../gameobjs/baseGameObj";
import {BaseUI} from "../ui/baseUI.ts";

export class Scene {
    sceneName: string;
    sceneObjects: BaseGameObj[];
    uiIterator: BaseUI[];

    init: () => void;
    update: (deltaTime: number) => void;
    render: (ctx: CanvasRenderingContext2D) => void;
    interact: () => void;
    ui: (uictx: CanvasRenderingContext2D) => void;
    destroy: () => void;

    constructor() {
        this.sceneName = "";
        this.sceneObjects = [];
        this.uiIterator = [];

        this.init = () => {};
        this.update = () => {};
        this.render = (ctx: CanvasRenderingContext2D) => {};
        this.interact = () => {};
        this.ui = (uictx: CanvasRenderingContext2D) => {};
        this.destroy = () => {};

        this.createObjects = () => {};
        this.destroyObjects = () => {};
        this.resetObjects = () => {};
    }

    createObjects: () => void;
    destroyObjects: () => void;
    resetObjects: () => void;
}