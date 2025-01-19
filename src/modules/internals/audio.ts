export class AudioClass {
    audioContext: AudioContext;
    source: AudioBufferSourceNode | null;
    gainNode: GainNode;
    buffer: AudioBuffer | null;

    // window.AudioContext = window.AudioContext||window.webkitAudioContext; //fix up prefixing
    // var context = new AudioContext(); //context
    // var source = context.createBufferSource(); //source node
    // source.connect(context.destination); //connect source to speakers so we can hear it
    // var request = new XMLHttpRequest();
    // request.open('GET', url, true);
    // request.responseType = 'arraybuffer'; //the  response is an array of bits
    // request.onload = function() {
    //     context.decodeAudioData(request.response, function(response) {
    //         source.buffer = response;
    //         source.start(0); //play audio immediately
    //         source.loop = true;
    //     }, function () { console.error('The request failed.'); } );
    // }
    // request.send();

    constructor(src: string, loop: boolean, volume: number) {
        this.audioContext = new AudioContext();
        this.source = null;
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = volume;
        this.gainNode.connect(this.audioContext.destination);
        this.buffer = null;

        source.connect(context.destination); //connect source to speakers so we can hear it##
        

        this.loadAudio(src, loop);
    }

    async loadAudio(src: string, loop: boolean) {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = loop;
        this.source.connect(this.gainNode);
        console.log("Audio loaded");
    }

    play() {
        console.log(`Audio ${this.source} and ${this.buffer}`);


        if (this.source && this.buffer) {
            this.source.start(0);
            console.log(`Audio ${this.source} playing`);
        }
    }

    pause() {
        if (this.source) {
            this.source.stop();
            this.source = null;
        }
    }

    stop() {
        this.pause();
    }

    setVolume(volume: number) {
        this.gainNode.gain.value = volume;
    }

    destroy() {
        this.stop();
        this.audioContext.close();
    }
}