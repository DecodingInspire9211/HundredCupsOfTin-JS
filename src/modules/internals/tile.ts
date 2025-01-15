import {global} from "../global.ts";
import { TILE_SIZE } from '../../../lib/constants.ts';

export class Tile {
    tile_size: number = TILE_SIZE;

    tile_x: number = 0;
    tile_y: number = 0;
    x: number = 0;
    y: number = 0;

    ctx = global.ctx!;

    constructor(tile_x: number, tile_y: number, x: number, y: number) {
        this.tile_x = tile_x * TILE_SIZE;
        this.tile_y = tile_y * TILE_SIZE;
        this.x = x;
        this.y = y;
    }

    update(deltaTime: number) {

    }

    render() {
        this.ctx.fillStyle = "CHOCOLATE";
        this.ctx.fillRect(this.x, this.y, this.tile_size, this.tile_size);
        this.ctx.fillStyle = "white";
        this.ctx.strokeRect(this.x, this.y, this.tile_size, this.tile_size)
    }
}