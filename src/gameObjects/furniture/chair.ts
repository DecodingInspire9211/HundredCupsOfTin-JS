import {BaseGameObj} from "../../modules/gameobjs/baseGameObj.ts";

export class Chair extends BaseGameObj {
    public x: number = 0;
    public y: number = 0;

    public width: number = 0;
    public height: number = 0;

    public single: number = 0;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 2,
        "currentSpriteIndex": 0
    };


    constructor(name: string, x: number, y: number, width: number, height: number, zOrder: number, single? : any, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.single = typeof single === "number" ? single : undefined;

        if(typeof this.single === "number") {
            this.animationData.firstSpriteIndex = single;
            this.animationData.lastSpriteIndex = single;
        }
        else {
            this.animationData.firstSpriteIndex = 0;
            this.animationData.lastSpriteIndex = 2;
        }

        this.collidable = collidable;
        this.triggerable = triggerable;

        //this.loadImages();
        this.loadImagesFromSpritesheet("../src/components/imgs/chairspritesheet.png", 4, 1);
    }

    getBoxBounds = () => {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y + (this.height - (this.height / 3)),
            bottom: this.y + this.height
        }
    }

    // loadImages = () => {
    //     /* first load images from path */
    //     let image1 = new Image();
    //     image1.src = "../src/components/imgs/chair.png";
    //
    //     /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
    //     this.animationData.animationSprites.push(image1);
    // };


    update = () => {

    }


    render = (ctx: CanvasRenderingContext2D) => {
        //ctx.fillStyle = "chocolate";
        //ctx.fillRect(this.x, this.y, this.width, this.height);

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