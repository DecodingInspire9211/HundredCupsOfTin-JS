export enum Key {
    Up = 1 << 0,
    Down = 1 << 1,
    Left = 1 << 2,
    Right = 1 << 3,
    Take = 1 << 4,
    Act = 1 << 5
};

export class KeyHandler {

    keyBinary: number;
    actKeyProcessed: boolean;
    constructor() {
        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
        console.log("Event Listener added");

        this.keyBinary = 0;
        this.actKeyProcessed = false;

    }

    handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "w":
            case "W":
                this.keyBinary! |= Key.Up;
                break;
            case "s":
            case "S":
                this.keyBinary! |= Key.Down;
                break;
            case "a":
            case "A":
                this.keyBinary! |= Key.Left;
                break;
            case "d":
            case "D":
                this.keyBinary! |= Key.Right;
                break;
            case "e":
            case "E":
                if (!this.actKeyProcessed) {
                    this.keyBinary |= Key.Act;
                    this.actKeyProcessed = true;
                }
                break;
            case "q":
            case "Q":
                this.keyBinary! |= Key.Take;
                break;

            // case "Shift":
            //     this.keyBinary |= Key.Shift;
            //     console.log(this.keyBinary);
            //
            //     break;
        }
    }

    handleKeyUp = (event: KeyboardEvent) => {
        switch (event.key) {
            case "w":
            case "W":
                this.keyBinary &= ~Key.Up;
                break;
            case "s":
            case "S":
                this.keyBinary &= ~Key.Down;
                break;
            case "a":
            case "A":
                this.keyBinary &= ~Key.Left;
                break;
            case "d":
            case "D":
                this.keyBinary &= ~Key.Right;
                break;
            case "e":
            case "E":
                this.keyBinary &= ~Key.Act;
                this.actKeyProcessed = false;
                break;
            case "q":
            case "Q":
                this.keyBinary! &= ~Key.Take;
                break;
            // case "Shift":
            //     this.keyBinary &= ~Key.Shift;
            //     console.log(this.keyBinary);
            //
            //     break;
        }
    }


    public dispose(): void {
        document.removeEventListener("keydown", this.handleKeyDown);
        console.log("Event Listener removed");
    }
}