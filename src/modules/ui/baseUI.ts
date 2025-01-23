// @ts-ignore
import { global } from "../global.ts";

export class BaseUI {
    active: boolean = true;
    x: number;
    y: number;
    width: number;
    height: number;

    text: string;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;

    constructor(x: number, y: number, width: number, height: number, text: string, fontSize: number, fontColor: string, backgroundColor: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.backgroundColor = backgroundColor;

        global.allGameObjects.push(this);
    }

    getBoxBounds = () => {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }

    getTriggerBounds = (triggerDistance: number) => {
        return {
            left: this.getBoxBounds().left + triggerDistance,
            right: this.getBoxBounds().right + triggerDistance,
            top: this.getBoxBounds().top + triggerDistance,
            bottom: this.getBoxBounds().bottom + triggerDistance
        }
    }

    update = function() {

    }

    //only added because of time constraints from project
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    getNextSprite = () : HTMLImageElement => {
        this.animationData.currentSpriteElapsedTime += global.deltaTime!;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };

    loadImages = (imageSources: any) => {
        /* first load images from path */

        for (let i = 0; i < imageSources.length; i++) {
            let image = new Image();
            image.src = imageSources[i];

            /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
            this.animationData.animationSprites.push(image);
        }
    };



    loadImagesFromSpritesheet = (spritesheetPath: string, cols: number, rows: number) => {
        // Calculate the number of rows and columns
        //const cols = Math.floor(spritesheetWidth / singleSpriteWidth);
        //const rows = Math.floor(spritesheetHeight / singleSpriteHeight);
        const totalSprites = cols * rows;

        // Pre-create an array with `Image` objects for all sprites
        this.animationData.animationSprites = Array.from({ length: totalSprites }, () => new Image());

        // Load the spritesheet
        const spritesheet = new Image();
        spritesheet.src = spritesheetPath;

        // Add a "load" event listener to the spritesheet
        spritesheet.addEventListener("load", () => {
            const spritesheetWidth = spritesheet.width;
            const spritesheetHeight = spritesheet.height;
            const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
            const singleSpriteHeight = Math.floor(spritesheetHeight / rows);


            // Create a temporary canvas to extract sprites from the spritesheet
            const tempSpritesheetCanvas = document.createElement("canvas");
            const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
            tempSpritesheetCanvas.width = singleSpriteWidth;
            tempSpritesheetCanvas.height = singleSpriteHeight;

            // Loop through each sprite's row and column position
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {

                    // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                    tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx.drawImage(
                        spritesheet,
                        col * singleSpriteWidth,
                        row * singleSpriteHeight,
                        singleSpriteWidth,
                        singleSpriteHeight,
                        0,
                        0,
                        singleSpriteWidth,
                        singleSpriteHeight
                    );

                    // assign it to the corresponding Image object
                    const index = row * cols + col;
                    this.animationData.animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        });
    }

    switchCurrentSprites = (firstSpriteIndex, lastSpriteIndex) => {
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }




    destroy = function() {
    }

    storePositionOfPreviousFrame = function() {}

    reactToCollision = function() {}

    reactToTrigger = function(triggeringObject: any) {

    }

    render() {}

    ui(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `${this.backgroundColor || 'black'}`;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = `${this.fontColor || 'white'}`;
        ctx.font = `${this.fontSize}px Pixelify Sans`;
        ctx.fillText(this.text, this.x + this.width / 2 - ctx.measureText(this.text).width / 2, this.y + this.height / 2 + 6);
    }
}