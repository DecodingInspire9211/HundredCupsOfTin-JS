export class Coffeemachine extends BaseGameObj {
    constructor(name: string, x: number, y: number, width: number, height:number, zOrder:number) {
        super(name, x, y, width, height, zOrder);
        this.loadImages();
    }
    loadImages = () => {
        /* first load images from path */
        let image1 = new Image();
        image1.src = "../src/components/imgs/coffeemachine.png";
        /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
        this.animationData.animationSprites.push(image1);
    };

    update = () => {
    };

    render = (ctx) => {
        let sprite = this.getNextSprite();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };
}