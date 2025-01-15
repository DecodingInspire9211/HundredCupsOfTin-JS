import {TILE_SIZE} from "../../../lib/constants.ts";
import {global} from "../global.ts";

export class CanvasNode {
    tileSize = TILE_SIZE;
    tileX: number;
    tileY: number;
    x: number;
    y: number;

    direction: 'up' | 'right' | 'bottom' | 'down';

    constructor(x: number, y: number, tileX: number, tileY: number) {
        this.x = x;
        this.y = y;
        this.tileX = tileX;
        this.tileY = tileY;
    }

    render() {

    }

    update() {

    }

    checkCollision(node: CanvasNode): boolean {
        return this.tileX === node.tileX && this.tileY === node.tileY
    }
}