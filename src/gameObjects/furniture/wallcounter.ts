import {BaseGameObj} from "../../modules/gameobjs/baseGameObj.ts";

export class WallCounter extends BaseGameObj {
    public x: number = 0;
    public y: number = 0;
    public tileX: number = 0;
    public tileY: number = 0;

    public width: number = 0;
    public height: number = 0;

    constructor(name: string, x: number, y: number, width: number, height: number, zOrder: number, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, zOrder);
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loadImages();

        this.collidable = collidable;
        this.triggerable = triggerable;
    }

    loadImages = () => {
        /* first load images from path */
        let image1 = new Image();
        image1.src = "imgs/wallcounter.png";

        /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
        this.animationData.animationSprites.push(image1);
    };

    update = () => {

    }

    getBoxBounds = () => {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
    }


    render = (ctx: CanvasRenderingContext2D) => {
        //ctx.fillStyle = "brown";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.strokeStyle = "red";
        //ctx.strokeRect(this.x, this.y, (this.getBoxBounds().right - this.getBoxBounds().left), (this.getBoxBounds().bottom - this.getBoxBounds().top));
        let sprit = this.getNextSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprit, this.x, this.y, this.width, this.height);
    }
}