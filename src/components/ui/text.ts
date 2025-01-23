import { BaseUI } from "../../modules/ui/baseUI.ts";
import {global} from "../../modules/global.ts";


export class TextClass extends BaseUI {
    active: boolean = true;
    path: string = "";
    textfile: string[] = [];

    reader: FileReader;

    canvas = global.ui!;

    constructor(
        path: string,
        x: number,
        y: number,
        width: number,
        height: number,
        fontSize: number,
        fontColor: string,
    ) {
        super(x, y, width, height, "", fontSize, fontColor, "");
        this.path = path;

        this.reader = new FileReader();
        this.reader.onload = () => {
            const result = this.reader.result as string;
            this.textfile = result.split("\n");
        }

        this.loadFile();
    }

    loadFile() {
        fetch(this.path)
            .then(response => response.blob())
            .then(blob => this.reader.readAsText(blob))
            .catch(error => console.error('Error reading file:', error));
    }

    ui(ctx: CanvasRenderingContext2D): void {
        if(this.active)
        {
            for(let i = 0; i < this.textfile.length; i++) {
                if(i === 0) {
                    ctx.fillStyle = `${this.fontColor}`;
                    ctx.font = `32px Pixelify Sans`;
                    ctx.fillText(this.textfile[i], this.x + this.width / 2 - ctx.measureText(this.textfile[i]).width / 2, this.y + this.height / 2 + (i * 24));
                } else if (i >= 1)
                {
                    ctx.fillStyle = `${this.fontColor}`;
                    ctx.font = `16px Pixelify Sans`;
                    ctx.fillText(this.textfile[i], this.x + this.width / 2 - ctx.measureText(this.textfile[i]).width / 2, this.y + this.height / 2 + (i * 16));

                }
            }
        }
    }

    destroy = (): void => {
        this.active = false;
    }

}