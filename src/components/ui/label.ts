import { BaseUI } from "../../modules/ui/baseUI.ts";
import {global} from "../../modules/global.ts";

export class Label extends BaseUI {
    active: boolean = true;

    canvas = global.ui!;

    constructor(
        x: number,
        y: number, 
        width: number, 
        height: number, 
        text: string, 
        fontSize: number, 
        fontColor: string, 
    ) {
        super(x, y, width, height, text, fontSize, fontColor, "");
    }


    ui(ctx: CanvasRenderingContext2D): void {
        if(this.active)
        {
            ctx.fillStyle = `${this.fontColor}`;
            ctx.font = `${this.fontSize}px Pixelify Sans`;
            ctx.fillText(this.text, this.x + this.width / 2 - ctx.measureText(this.text).width / 2, this.y + this.height / 2 + 6);
        }
    }

    destroy = (): void => {
        this.active = false;
    }


    isClicked = (mouseX: number, mouseY: number): boolean => {
        return mouseX >= this.x &&
        mouseY >= this.y &&
        mouseX <= this.x + this.width &&
        mouseY <= this.y + this.height;
    }
}