export enum Key {
    Up = 1 << 0,
    Down = 1 << 1,
    Left = 1 << 2,
    Right = 1 << 3,
    //Shift = 1 << 4
};

export class KeyHandler {

    keyBinary: number;
    constructor() {
        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
        console.log("Event Listener added");

        this.keyBinary = 0;
    }

    handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "w":
                this.keyBinary! |= Key.Up;
                break;
            case "s":
                this.keyBinary! |= Key.Down;
                break;
            case "a":
                this.keyBinary! |= Key.Left;
                break;
            case "d":
                this.keyBinary! |= Key.Right;
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
                this.keyBinary &= ~Key.Up;
                console.log(this.keyBinary);
                break;
            case "s":
                this.keyBinary &= ~Key.Down;
                console.log(this.keyBinary);

                break;
            case "a":
                this.keyBinary &= ~Key.Left;
                console.log(this.keyBinary);

                break;
            case "d":
                this.keyBinary &= ~Key.Right;
                console.log(this.keyBinary);

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