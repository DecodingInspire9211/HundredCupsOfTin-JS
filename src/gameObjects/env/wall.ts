import {BaseGameObj} from "../../modules/gameobjs/baseGameObj.ts";

export class Wall extends BaseGameObj {
    public x: number = 0;
    public y: number = 0;

    public width: number = 0;
    public height: number = 0;

    collidable: boolean | undefined = true;
    triggerable: boolean | undefined = false;

    single: number | undefined = 0;

    animationData: any = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "elapsedSpriteTime": 0,
        "currentSpriteIndex": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
    }

    constructor(name: string, x: number, y: number, width: number, height: number, zOrder: number, single?: any, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.collidable = collidable;
        this.triggerable = triggerable;

        this.single = typeof single === "number" ? single : undefined;

        if(typeof this.single === "number") {
            this.animationData.firstSpriteIndex = single;
            this.animationData.lastSpriteIndex = single;
        }
        else {
            this.animationData.firstSpriteIndex = 0;
            this.animationData.lastSpriteIndex = 8;
        }

        this.loadImagesFromSpritesheet("../src/components/imgs/walltestnew.png", 9, 1);
    }

    // loadImages = () => {
    //     /* first load images from path */
    //     let image1 = new Image();
    //     image1.src = "../src/components/imgs/environment/wall.png";
    //
    //     /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
    //     this.animationData.animationSprites.push(image1);
    // };

    update = () => {

    }


    render = (ctx: CanvasRenderingContext2D) => {
        if(typeof this.single === "number") {
            let stat = this.animationData.animationSprites[this.single];
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(stat, this.x, this.y, this.width, this.height);
        }
        else {
            let sprite = this.getNextSprite();
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        }

    }
}