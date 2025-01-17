import { BaseUI } from "../../modules/ui/baseUI.ts";
import { global } from "../../modules/global.ts";

export class Image extends BaseUI {
    active = true;
    x;
    y;
    width;
    height;

    source;

    animationData: any = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "elapsedSpriteTime": 0,
        "currentSpriteIndex": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
    }


    constructor(source: string, x: number = 0, y: number = 0, width: number = 128, height:number = 128) {
        super(x, y, width, height, "", 0, "", "");
        this.source = source;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.loadImages();
    }

    loadImages = () => {
        /* first load images from path */
        let image2 = new Image();
        image1.src = "../src/components/imgs/wall.png";

        /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
        this.animationData.animationSprites.push(image1);
    };

    update = () => {

    }


    render = (ctx: CanvasRenderingContext2D) => {
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        let sprite = this.getNextSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);

    }
}