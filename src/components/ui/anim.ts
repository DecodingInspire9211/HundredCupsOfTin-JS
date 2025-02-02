import { BaseUI } from "../../modules/ui/baseUI.ts";

export class Anim extends BaseUI {
    active = true;
    x;
    y;
    width;
    height;

    source;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 23,
        "currentSpriteIndex": 0
    };

    columns: number | undefined;
    rows: number | undefined;

    constructor(source: string, x: number = 0, y: number = 0, width: number = 128, height:number = 128, columns?: number, rows?: number) {
        super(x, y, width, height, "", 0, "", "");
        this.source = source;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.columns = columns;
        this.rows = rows;

        this.loadImagesFromSpritesheet(this.source, this.columns!, this.rows!)
        this.animationData.firstSpriteIndex = 0;
        this.animationData.lastSpriteIndex = (this.columns! - 1) * this.rows!;
    }

    update = () => {

    }

    ui = (ctx: CanvasRenderingContext2D) => {
        let sprite = this.getNextSprite();
        if (sprite instanceof HTMLImageElement) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        } else {
            console.error("Invalid sprite type:", sprite);
        }
    };

    destroy = () => {
        //delete this.animationData;
    }
}