import { BaseUI } from "../../modules/ui/baseUI.ts";
import { global } from "../../modules/global.ts";

export class Image extends BaseUI {
    active = true;
    x;
    y;
    width;
    height;

    source;

    constructor(source: string, x: number = 0, y: number = 0, width: number = 128, height:number = 128) {
        super(x, y, width, height, "", 0, "", "");
        this.source = source;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render = (ctx: CanvasRenderingContext2D) => {
        let img = new Image(this.source);

        img.onerror = () => {
            console.error(`Error occured`)
        }

        ctx.drawImage(, this.x, this.y, this.width, this.height);
    }       
}