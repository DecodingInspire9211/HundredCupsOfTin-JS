import { BaseGameObj } from "../gameobjs/baseGameObj";
import {BaseUI} from "../ui/baseUI.ts";

export class Scene {
    sceneName: string;
    sceneObjects: BaseGameObj[];
    uiIterator: BaseUI[];

    init: () => void | any;
    update: (deltaTime: number) => void | any;
    render: (ctx: CanvasRenderingContext2D) => void | any;
    interact: () => void | any;
    ui: (uictx: CanvasRenderingContext2D) => void | any;
    destroy: () => void | any;

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