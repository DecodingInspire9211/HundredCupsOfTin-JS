export class Audio {
    constructor(src, loop = false, volume = 1) {
        this.audio = new Audio(src);
        this.audio.loop = loop;
        this.audio.volume = volume;
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    setVolume(volume) {
        this.audio.volume = volume;
    }

    destroy() {
        this.audio = null;
    }
}