import {TILE_SIZE} from "../../../lib/constants.ts";
import {global} from "../global.ts";

export class Grid {
    tiles: number;
    grid: any[][];

    margin_x: number;
    margin_y: number;

    tileX: number = 0;
    tileY: number = 0;

    grid_width: number;
    grid_height: number;

    x: number = 0;
    y: number = 0;

    constructor(tiles: number) {
        this.tiles = tiles;
        this.grid = Array.from({length: tiles}, () => Array.from({length: tiles}, () => 0));

        this.grid_width = tiles * TILE_SIZE;
        this.grid_height = tiles * TILE_SIZE;

        this.margin_x = (global.canvas!.width - (TILE_SIZE * tiles)) / 2;
        this.margin_y = (global.canvas!.height - (TILE_SIZE * tiles)) / 2;

    }

    setPos = (tileX: number, tileY: number) => {
        this.x = this.margin_x + (tileX * TILE_SIZE);
        this.y = this.margin_y + (tileY * TILE_SIZE);
    }

    setTilePos = (tileX: number, tileY: number) => {
        this.tileX = tileX;
        this.tileY = tileY;
    }



    getTilePos = () => {
        return {x: this.x / TILE_SIZE, y: this.y / TILE_SIZE};
    }

    getCurrentTilePos = (_x: number, _y: number) => {
        return {x: Math.trunc(_x) / TILE_SIZE, y: Math.trunc(_y) / TILE_SIZE};
    }

    getPos = () => {
        return {x: this.x, y: this.y};
    }
}