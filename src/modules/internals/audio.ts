export class AudioClass {
  private audioContext: AudioContext;
  private source: AudioBufferSourceNode | null = null;
  private gainNode: GainNode;

  constructor(
    private url: string,
    private loop: boolean = false,
    private volume: number = 1.0,
  ) {
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    this.loadAudio()
      .then((v: AudioBuffer) => {
        this.play(v);
      })
      .catch((e) => console.error(`Error loading audio: ${e}`));
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.volume;
    this.gainNode.connect(this.audioContext.destination);
  }

  private async loadAudio() {
    let response = await fetch(this.url);

    // console.log(response.headers.get("content-type"));
    // console.log(this.url);

    const permissibleFormats = ["audio/mpeg", "audio/ogg", "audio/wav"];
    if (!permissibleFormats.includes(response.headers.get("content-type")!)) {
      throw new Error(
        `Invalid audio format! ${response.headers.get("content-type")}`,
      );
    }
    const arrayBuffer = await response.arrayBuffer();
    try {
      console.log(arrayBuffer);
      return this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      throw error;
    }
  }

  public play(buffer: AudioBuffer) {
    if (buffer) {
      this.source = this.audioContext.createBufferSource();
      this.source.buffer = buffer;
      this.source.loop = this.loop;
      this.source.connect(this.gainNode);
      this.source.start(0);
    } else {
      console.error("Audio buffer is not loaded yet.");
    }
  }

  public stop() {
    console.log("BBBBBBBBBBBBBbb");
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
