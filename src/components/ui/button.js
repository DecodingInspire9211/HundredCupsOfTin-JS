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

        this.canvas.addEventListener("click", this.handleClick.bind(this));
    }

    render() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.font = `${this.fontSize}px Pixelify Sans`;
        this.ctx.fillStyle = this.fontColor;
        this.ctx.fillText(this.text, this.x + 10, this.y + 20);
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