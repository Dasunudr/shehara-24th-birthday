// Ambient Web Audio Romantic Synth Player
// Provides soft, relaxing melodic piano/pad chords when no MP3 file is loaded

class AmbientSynthPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private masterGain: GainNode | null = null;

  // Chord notes (frequencies in Hz for a soft romantic progression: Fmaj9 -> Cmaj7 -> Dm9 -> Bbmaj7)
  private chords = [
    [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
    [130.81, 196.00, 246.94, 261.63, 329.63], // Cmaj7
    [146.83, 220.00, 261.63, 349.23, 440.00], // Dm9
    [116.54, 174.61, 220.00, 261.63, 349.23], // Bbmaj7
    [164.81, 246.94, 293.66, 370.00, 440.00], // E min / G add9
    [130.81, 164.81, 196.00, 246.94, 293.66], // C add9
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.playNextChord();
    this.timerId = setInterval(() => {
      if (this.isPlaying) {
        this.playNextChord();
      }
    }, 4500);
  }

  private playNextChord() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine + gentle triangle harmonic mix
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      // Lowpass filter for warm, velvety tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, now);

      // Soft swell envelope
      const startTime = now + idx * 0.12;
      const duration = 4.2;
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.8);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.5);
    });

    // Add a tiny delicate high sparkle bell
    if (Math.random() > 0.3) {
      const bellFreq = [523.25, 659.25, 783.99, 1046.50][Math.floor(Math.random() * 4)];
      const bellOsc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bellOsc.type = "sine";
      bellOsc.frequency.setValueAtTime(bellFreq, now + 1.2);

      bellGain.gain.setValueAtTime(0.0001, now + 1.2);
      bellGain.gain.exponentialRampToValueAtTime(0.05, now + 1.3);
      bellGain.gain.exponentialRampToValueAtTime(0.00001, now + 3.5);

      bellOsc.connect(bellGain);
      bellGain.connect(this.masterGain);

      bellOsc.start(now + 1.2);
      bellOsc.stop(now + 3.6);
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getActive(): boolean {
    return this.isPlaying;
  }
}

export const ambientSynth = typeof window !== "undefined" ? new AmbientSynthPlayer() : null;
