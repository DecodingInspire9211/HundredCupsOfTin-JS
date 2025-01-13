export class BaseUI {
    x;
    y;
    width;
    height;

    text;
    fontSize;
    fontColor;
    backgroundColor;

    constructor(x, y, width, height, text, fontSize, fontColor, backgroundColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;
    }

    render() {
        ctx.fillStyle = `${this.backgroundColor || 'black'}`;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = `${this.fontColor || 'white'}`;
        ctx.font = `${this.fontSize}px Pixelify Sans`;
        ctx.fillText(this.text, this.x + this.width / 2 - ctx.measureText(this.text).width / 2, this.y + this.height / 2 + 6);
    }

    destroy() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.text = null;
        this.fontSize = null;
        this.fontColor = null;
        this.backgroundColor = null;
    }
}