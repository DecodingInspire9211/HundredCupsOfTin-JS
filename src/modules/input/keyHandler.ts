import {global} from "../global.ts";

export class KeyHandler {
    constructor() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);

    }

    private handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "w":
            case "ArrowUp":
                break;

            case "a":
            case "ArrowLeft":
                break;

            case "s":
            case "ArrowDown":
                break;

            case "d":
            case "ArrowRight":
                break;
        }
    }

    private handleKeyUp = (event: KeyboardEvent) => {
    }


    public dispose(): void {
        document.removeEventListener("keydown", this.handleKeyDown);
        console.log("Event Listener removed");
    }
}