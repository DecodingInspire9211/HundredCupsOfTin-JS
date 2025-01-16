// @ts-ignore
import { global } from "../global.ts";

export class BaseGameObj {
    /// public properties
    public name: string = "";

    public active : boolean = true;

    public x: number = 0;
    public y: number = 0;
    // public tileX: number = 0;
    // public tileY: number = 0;

    //private previousX: number = 0;
    //private previousY: number = 0;

    public width: number = 0;
    public height: number = 0;

    /// internal properties
    animationData: any = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "elapsedSpriteTime": 0,
        "currentSpriteIndex": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
    };

    constructor(name: string, x: number, y: number, width: number, height: number) {
        this.name = name;
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.previousX = x;
        this.previousY = y;

        global.allGameObjects.push(this);
    };

    /// essential methods

    update = function() {
    
    };

    render = function(ctx: CanvasRenderingContext2D) {
        let sprite = this.getNextSprite();
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    storePositionOfPreviousFrame = () => {
        this.previousX = this.x;
        this.previousY = this.y;
    };

    getBoxBounds = () => {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    }

    getNextSprite = () => {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };

    loadImages = (imageSources) => {
        /* first load images from path */

        for (let i = 0; i < imageSources.length; i++) {
            let image = new Image();
            image.src = imageSources[i];

            /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
            this.animationData.animationSprites.push(image);
        }
    };



    loadImagesFromSpritesheet = (spritesheetPath, cols, rows) => {
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

    switchCurrentSprites = function (firstSpriteIndex, lastSpriteIndex) {
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }

    reactToCollision = function(collidingObject) {

    }
}