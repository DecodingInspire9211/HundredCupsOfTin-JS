export class AudioClass {
    private audioContext: AudioContext;
    private buffer: AudioBuffer | null = null;
    private source: AudioBufferSourceNode | null = null;
    private gainNode: GainNode;

    constructor(private url: string, private loop: boolean = false, private volume: number = 1.0) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = this.volume;
        this.gainNode.connect(this.audioContext.destination);

        this.loadAudio().then(() => console.log("Audio loaded")).catch(error => console.error("Error loading audio:", error));
    }

    private async loadAudio() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
        } catch (error) {
            console.error("Error decoding audio data:", error);
            throw error;
        }
    }

    public play() {
        if (this.buffer) {
            this.source = this.audioContext.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.loop = this.loop;
            this.source.connect(this.gainNode);
            this.source.start(0);
        } else {
            console.error("Audio buffer is not loaded yet.");
        }
    }

    public stop() {
        if (this.source) {
            this.source.stop(0);
            this.source.disconnect();
            this.source = null;
        }
    }

    public setVolume(volume: number) {
        this.gainNode.gain.value = volume;
    }
}