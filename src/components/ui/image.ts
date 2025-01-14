import { BaseUI } from "../../modules/ui/baseUI.ts";
import { global } from "../../modules/global.ts";

export class Image extends BaseUI {
    active = true;
    x;
    y;
    width;
    height;

    source;

    constructor(source, x = 0, y = 0, width = 128, height = 128) {
        super(x, y, width, height, "", 0, "", "");
        this.source = source;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render = function(ctx) {        
        ctx.drawImage(this.source, this.x, this.y, this.width, this.height);
    }       
}