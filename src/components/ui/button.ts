import { BaseUI } from "../../modules/ui/baseUI.ts";
import {global} from "../../modules/global.ts";

export class Button extends BaseUI {
    active: boolean = true;
    onClick: () => any;

    canvas = global.ui!;

    constructor(
        x: number,
        y: number, 
        width: number, 
        height: number, 
        text: string, 
        fontSize: number, 
        fontColor: string, 
        backgroundColor: string, 
        onClick: () => any
    ) {
        super(x, y, width, height, text, fontSize, fontColor, backgroundColor);
        this.onClick = onClick;

        this.canvas!.addEventListener('click', this.handleClick.bind(this));
    }

    ui(ctx: CanvasRenderingContext2D): void {
        if(this.active)
        {
            ctx.fillStyle = `${this.backgroundColor}`;
            ctx.fillRect(this.x, this.y, this.width, this.height);

            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);

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



    handleClick = (event: MouseEvent): void => {
        if(this.active)
        {
            if (this.isClicked(event.offsetX, event.offsetY)) {
                console.log("Button clicked!");
                this.onClick();
            }
        }

    }
}