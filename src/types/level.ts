import { Player } from "../modules/gameobjs/player.ts";
import { Input } from "../modules/internals/input.ts";
import {CanvasNode} from "../modules/internals/canvas_node.ts";

export type LevelTile = {
    node: CanvasNode;
    collisionMask: number;
}

export type Map = LevelTile[][];

export interface Level {
    player: Player;
    map: Map;
    input: Input;

    render(): void;
}