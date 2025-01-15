import {Player} from "../../modules/gameobjs/player.ts";
import {Map} from "../../.././types/level.ts"
import {Floor} from "../../../modules/gameobjs/floor.ts";
import {GameWorld} from "../GameWorld.ts";
import {CollisionMask} from "../../../../lib/constants.ts";

export class Cafe extends GameWorld {
    map: Map = Array.from({length: 12})
        .map((_, i) => {
            return Array.from({length: 12})
                .map((_, j) => {
                    return {
                        node: new Floor(j, i, j, i),
                        collisionMask: CollisionMask.FLOOR,
                    }
                })
        })

    constructor(player: Player) {
        super(player);
        this.init();
    }
}
