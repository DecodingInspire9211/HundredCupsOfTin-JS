import { BaseUI } from "../../modules/ui/baseUI.js";
import { global } from "../../modules/global.js";

export class Button extends BaseUI {
    active = true;
    x;
    y;
    width;
    height;
    text;
    fontSize;
    fontColor;
    backgroundColor;
    onClick;

    constructor(x, y, width, height, text, fontSize, fontColor, backgroundColor, onClick) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;
        this.onClick = onClick;

        global.canvas.addEventListener("click", this.handleClick.bind(this));
    }

    render = function(ctx) {        
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.font = `${this.fontSize}px Pixelify Sans`;
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.text, this.x + this.width / 2 - global.ctx.measureText(this.text).width / 2, this.y + this.height / 2 + 6);
    }       

    isClicked(mouseX, mouseY) {
        return mouseX > this.x &&
            mouseX < this.x + this.width &&
            mouseY > this.y &&
            mouseY < this.y + this.height;
    }

    handleClick(event) {
        if (this.isClicked(event.offsetX, event.offsetY)) {
            if (this.onClick()) {
                return true;
            }
        }
    }
}