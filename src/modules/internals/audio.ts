interface AudioManagerTrackOptions {
  loop: boolean;
}
export class AudioManager {
  // context for all sources and tracks
  private audioContext: AudioContext;
  // private source: AudioBufferSourceNode | null = null;
  private gainNode: GainNode;
  private activeTracks: AudioBufferSourceNode[] = [];

  constructor(
    firstSourceURL?: string,
    audioManagerTrackOptions: AudioManagerTrackOptions = {
      loop: false,
    },
    volume: number = 1.0,
  ) {
    // set up an audiocontext to be used with several different sources
    this.audioContext = new (window.AudioContext ||
      // TODO is webkitAudioContext really needed?
      (window as any).webkitAudioContext)();
    console.log(firstSourceURL);
    if (firstSourceURL) {
      this.addTrack(firstSourceURL);
    }

    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 1;
    this.gainNode.connect(this.audioContext.destination);
  }

  private addTrackFromBuffer(
    audioBuffer: AudioBuffer,
    trackOptions: AudioManagerTrackOptions,
  ) {
    const trackBufferSourceNode = this.audioContext.createBufferSource();
    trackBufferSourceNode.buffer = audioBuffer;
    trackBufferSourceNode.loop = trackOptions.loop;
    trackBufferSourceNode.connect(this.gainNode);
    trackBufferSourceNode.start();
    return trackBufferSourceNode;
  }

  private async loadAudioToBuffer(url: string): Promise<AudioBuffer> {
    let response = await fetch(url);

    // console.log(response.headers.get("content-type"));
    // console.log(this.url);

    const permissibleFormats = ["audio/mpeg", "audio/ogg", "audio/wav"];
    // if the format is not allowed, e.g text, html or an image was returned due to a web server misconfiguration
    if (!permissibleFormats.includes(response.headers.get("content-type")!)) {
      throw new Error(
        `Invalid audio format! ${response.headers.get("content-type")}`,
      );
    }
    // generic array buffer, empty, no audio
    const arrayBuffer = await response.arrayBuffer();
    // decode audio into the arrayBuffer above
    try {
      return this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      throw error;
    }
  }

  public addTrack(
    sourceURL: string,
    audioManagerTrackOptions: AudioManagerTrackOptions = {
      loop: false,
    },
    // TODO make track volume actually apply
    volume: number = 0.5,
  ) {
    // TODO make track volume changeable
    this.loadAudioToBuffer(sourceURL)
      .then((buffer: AudioBuffer) => {
        let newTrack = this.addTrackFromBuffer(
          buffer,
          audioManagerTrackOptions,
        );
        this.activeTracks.push(newTrack);
        console.log(this.activeTracks);
      })
      .catch((e) => console.error(`Error loading new audio source: ${e}`));
  }

  public stopAll() {
    this.activeTracks.forEach((sourceBufferNode) => {
      sourceBufferNode.stop(0);
      sourceBufferNode.disconnect();
    });
    this.activeTracks = [];
  }

  public setVolume(volume: number) {
    this.gainNode.gain.value = volume;
  }
}
