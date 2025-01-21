import {BaseGameObj} from "../modules/gameobjs/baseGameObj.ts";

export class Table extends BaseGameObj {
    public x: number = 0;
    public y: number = 0;

    public width: number = 0;
    public height: number = 0;

    animationData: any = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "elapsedSpriteTime": 0,
        "currentSpriteIndex": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
    }

    constructor(name: string, x: number, y: number, width: number, height: number, zOrder: number, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loadImages();

        this.collidable = collidable;
        this.triggerable = triggerable
    }

    getBoxBounds = () => {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y + (this.height - (this.height / 3)),
            bottom: this.y + this.height
        }
    }


    loadImages = () => {
        /* first load images from path */
        let image1 = new Image();
        image1.src = "../src/components/imgs/table.png";

        /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
        this.animationData.animationSprites.push(image1);
    };

    update = () => {

    }


    render = (ctx: CanvasRenderingContext2D) => {
        //ctx.fillStyle = "maroon";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        let sprite = this.getNextSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);

    }
}