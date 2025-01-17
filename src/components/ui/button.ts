import { BaseUI } from "../../modules/ui/baseUI.ts";
import {global} from "../../modules/global.ts";

export class Button extends BaseUI {
    active: boolean = true;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    onClick: () => any;

    canvas = global.canvas!;

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
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;
        this.onClick = onClick;

        this.canvas!.addEventListener('click', this.handleClick.bind(this));
    }



    render(ctx: CanvasRenderingContext2D): void {
        if(this.active)
        {
            ctx.fillStyle = `${this.backgroundColor}`;
            ctx.fillRect(this.x, this.y, this.width, this.height);

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