export class AudioClass {
    audio: HTMLAudioElement;

    constructor(src: string, loop: boolean, volume: number) {
        this.audio = new Audio(src);
        this.audio.loop = loop;
        this.audio.volume = volume;
    }

    play() {
        this.audio.play().then(r => {}  ).catch(e => console.log(e));
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