import {global} from "../global.ts";

export class BaseGameObj {
    /// public properties
    public name: string = "";

    public active : boolean = true;
    public collidable: boolean | undefined = false;
    public triggerable: boolean | undefined = false;

    public x: number = 0;
    public y: number = 0;

    previousX: number = 0;
    previousY: number = 0;

    public width: number = 0;
    public height: number = 0;

    public zOrder: number = 0;

    public triggerDistance: number = 0;



    /// internal properties
    animationData: any = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "elapsedSpriteTime": 0,
        "currentSpriteIndex": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
    };

    update = function() {
    
    };

    render = (ctx: CanvasRenderingContext2D) => {
        let sprite = this.getNextSprite();
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    interact = () => {

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

    getNextSprite = () => {
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
                    tempSpritesheetCtx!.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx!.drawImage(
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

    switchCurrentSprites = (firstSpriteIndex : any, lastSpriteIndex : any) => {
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }

    //@ts-ignore
    reactToCollision = function(collidingObject: any) {

    }

    //@ts-ignore
    reactToTrigger = function(triggeringObject: any) {

    }

    destroy = () => {
        // Remove the object from the global array
        delete this.animationData;
    }

    storePositionOfPreviousFrame(): void {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    constructor(name: string, x: number, y: number, width: number, height: number, zOrder?: number, collidable: boolean = false, triggerable: boolean = false) {
        this.name = name;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.previousX = x;
        this.previousY = y;

        this.zOrder = zOrder || -1; // Initialize zOrder
        this.collidable = collidable; // Initialize collidable
        this.triggerable = triggerable

        global.allGameObjects.push(this);
    };
}