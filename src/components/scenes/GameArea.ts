
import {Floor} from "../../modules/gameobjs/floor.ts";

export class GameArea {
    map: Floor[][] = Array.from({length: 10}, (_, i) => Array.from({length: 10}, (_, j) => new Floor(i * 64 , j, i * 64, j * 64)));

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.map = this.map;
        console.log("GameArea constructed");
    }

    render = () => {
        this.map.forEach((row) => {
            row.forEach((tile) => {
                tile.render();
            })
        });
    }
}