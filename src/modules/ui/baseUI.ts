// @ts-ignore
import { global } from "../global.ts";

export class BaseUI {
    active: boolean = true;
    x: number;
    y: number;
    width: number;
    height: number;

    text: string;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;

    constructor(x: number, y: number, width: number, height: number, text: string, fontSize: number, fontColor: string, backgroundColor: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;

        global.allGameObjects.push(this);
    }

    getBoxBounds = () => {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }

    update = function() {

    }

    //only added because of time constraints from project
    animationData: any = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "elapsedSpriteTime": 0,
        "currentSpriteIndex": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
    };

    getNextSprite = () => {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };

    storePositionOfPreviousFrame = function() {}

    reactToCollision = function() {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `${this.backgroundColor || 'black'}`;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = `${this.fontColor || 'white'}`;
        ctx.font = `${this.fontSize}px Pixelify Sans`;
        ctx.fillText(this.text, this.x + this.width / 2 - ctx.measureText(this.text).width / 2, this.y + this.height / 2 + 6);
    }
}