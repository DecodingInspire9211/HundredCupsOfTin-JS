export class Input {
    private keys: Set<string>;
    private KeyUpCallback: Array<(key: string) => void> = [];

    constructor() {
        this.keys = new Set();
        window.addEventListener('keydown', (e) => this.keys.add(e.key));
        window.addEventListener('keyup', (e) => {
            this.keys.delete(e.key);

            this.KeyUpCallback.forEach(callback => callback(e.key));
        });
    }

    isKeyPress(key: string): boolean {
        return  this.keys.has(key);
    }

    addKeyUpCallback(callback: (key:string) => void)
    {
        return this.KeyUpCallback.push(callback);
    }

    static onKeyPress(key: string, callback: (key: string) => void) {
        return window.addEventListener('keydown', (e) => {
            if(e.key === key) {
                callback(e.key)
            }
        });
    }
}