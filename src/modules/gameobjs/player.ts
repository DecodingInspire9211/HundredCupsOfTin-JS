import { BaseGameObj } from "./baseGameObj.ts";
import { TILE_SIZE, CollisionMask } from "../../../lib/constants.ts";
import { Floor}  from "./floor.ts";
import { Map } from "../../types/level.ts";
//import { EventTargetMixin } from "../input/event-target.decorator.ts";
import {CanvasNode} from "../internals/canvas_node.ts";

export class Player extends BaseGameObj {

    private tilesPerSecond = 6;

    private moveStartTime: number = 0;
    private moving: boolean = false;
    private startX: number = 0;
    private startY: number = 0;
    private targetX: number = 0;
    private targetY: number = 0;

    constructor(x: number, y: number, width: number, height: number) {
        super("Player", x, y, width, height);
        this.width = TILE_SIZE;
        this.height = TILE_SIZE;

    }

    update = () =>
    {
        if (this.moving) {
            const elapsed = (Date.now() - this.moveStartTime) / 1000; // Time in seconds
            const moveDuration = 1 / this.tilesPerSecond; // Duration to move one tile

            if (elapsed >= moveDuration) {
                // Movement complete
                this.x = this.targetX;
                this.y = this.targetY;
                this.moving = false;
            } else {
                // Smooth interpolation
                const t = elapsed / moveDuration;
                this.x = this.startX + t * (this.targetX - this.startX);
                this.y = this.startY + t * (this.targetY - this.startY);
            }
        }
    }

    render = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.tile_size, this.tile_size)
    };

    setTilePos(tileX: number, tileY: number)
    {
        this.tileX = tileX;
        this.tileY = tileY;
        this.x = tileX * TILE_SIZE;
        this.y = tileY * TILE_SIZE;
        this.moving = false;
    }

    move(direction: string, map: Map)
    {
        if(this.moving) return;

        let newTileX = this.tileX;
        let newTileY = this.tileY;

        if (direction === 'up') {
            newTileY--;
            this.direction = 'up';
        }
        if (direction === 'down') {
            newTileY++;
            this.direction = 'down';
        }
        if (direction === 'left') {
            newTileX--;
            this.direction = 'left';
        }
        if (direction === 'right') {
            newTileX++;
            this.direction = 'right';
        }

        //this.animatedSpriteNode.playAnimation(`walk_${this.direction}`);

        if (
            newTileX >= 0 &&
            newTileX < map[0].length &&
            newTileY >= 0 &&
            newTileY < map.length &&
            map[newTileX][newTileY].collisionMask === CollisionMask.FLOOR
        ) {
            this.tileX = newTileX;
            this.tileY = newTileY;

            this.startX = this.x;
            this.startY = this.y;
            this.targetX = this.tileX * TILE_SIZE;
            this.targetY = this.tileY * TILE_SIZE;
            this.moveStartTime = Date.now();
            this.moving = true;
        }
    }
}