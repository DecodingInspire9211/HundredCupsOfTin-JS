import { BaseUI } from "../../modules/ui/baseUI.js";
import { global } from "../../modules/global.js";

export class Button extends BaseUI {
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

    render = function() {
        global.ctx.fillStyle = this.backgroundColor;
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        global.ctx.font = `${this.fontSize}px Pixelify Sans`;
        global.ctx.fillStyle = this.fontColor;
        global.ctx.fillText(this.text, this.x + 10, this.y + 20);
    }

    isClicked(mouseX, mouseY) {
        return mouseX > this.x &&
            mouseX < this.x + this.width &&
            mouseY > this.y &&
            mouseY < this.y + this.height;
    }

    handleClick(event) {
        if (this.isClicked(event.offsetX, event.offsetY)) {
            this.onClick();
        }
    }
}