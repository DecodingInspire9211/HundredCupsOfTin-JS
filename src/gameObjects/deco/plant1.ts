import {BaseGameObj} from "../../modules/gameobjs/baseGameObj.ts";

export class Figtree extends BaseGameObj {
    public x: number = 0;
    public y: number = 0;
    public tileX: number = 0;
    public tileY: number = 0;

    public width: number = 0;
    public height: number = 0;

    constructor(name: string, x: number, y: number, width: number, height: number, trigDist: number, collidable?: boolean, triggerable?: boolean) {
        super(name, x, y, width, height, trigDist, collidable, triggerable);
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.loadImages();
    }

    loadImages = () => {
        /* first load images from path */
        let image1 = new Image();
        image1.src = "imgs/plant1.png";

        /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
        this.animationData.animationSprites.push(image1);
    };

    update = () => {

    }


    render = (ctx: CanvasRenderingContext2D) => {
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        let sprit = this.getNextSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprit, this.x, this.y, this.width, this.height);

    }
}