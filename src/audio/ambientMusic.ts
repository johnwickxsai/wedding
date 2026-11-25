/**
 * Gentle synthesized Southeast Asian pentatonic harp & chime ambience
 * built with the Web Audio API so it works reliably offline without external files.
 * Starts strictly after a user gesture (tapping "Open").
 */

// D Major Pentatonic frequencies spanning gentle mid-register harp notes
const MELODY_SEQUENCE: Array<{ freq: number; beat: number; dur: number; gain: number }> = [
  { freq: 293.66, beat: 0, dur: 2.8, gain: 0.14 },   // D4
  { freq: 369.99, beat: 1.5, dur: 2.4, gain: 0.11 }, // F#4
  { freq: 440.0, beat: 3.0, dur: 3.0, gain: 0.13 },  // A4
  { freq: 587.33, beat: 4.5, dur: 3.2, gain: 0.1 },  // D5
  { freq: 493.88, beat: 6.0, dur: 2.8, gain: 0.11 }, // B4
  { freq: 440.0, beat: 7.5, dur: 3.2, gain: 0.12 },  // A4
  { freq: 329.63, beat: 9.0, dur: 2.6, gain: 0.11 }, // E4
  { freq: 369.99, beat: 10.5, dur: 2.8, gain: 0.12 }, // F#4
  { freq: 440.0, beat: 12.0, dur: 3.4, gain: 0.12 }, // A4
  { freq: 587.33, beat: 13.5, dur: 2.8, gain: 0.09 }, // D5
  { freq: 659.25, beat: 15.0, dur: 3.4, gain: 0.08 }, // E5
  { freq: 587.33, beat: 16.5, dur: 3.8, gain: 0.1 }, // D5
  { freq: 440.0, beat: 18.0, dur: 3.2, gain: 0.11 }, // A4
  { freq: 369.99, beat: 19.5, dur: 3.6, gain: 0.1 }, // F#4
  { freq: 329.63, beat: 21.0, dur: 3.2, gain: 0.11 }, // E4
  { freq: 293.66, beat: 22.5, dur: 4.2, gain: 0.13 }, // D4
];

const PAD_CHORDS: Array<{ freqs: number[]; beat: number; dur: number }> = [
  { freqs: [146.83, 220.0, 293.66], beat: 0, dur: 6.5 },    // D5 warm drone
  { freqs: [123.47, 185.0, 246.94], beat: 6.0, dur: 6.5 },  // Bm soft pad
  { freqs: [164.81, 246.94, 329.63], beat: 12.0, dur: 6.5 }, // Em7 shimmer
  { freqs: [110.0, 164.81, 220.0], beat: 18.0, dur: 6.5 },  // A sus warmth
];

const BEAT_SECONDS = 0.72;
const LOOP_BEATS = 24;
const TARGET_VOLUME = 0.32;

export class WeddingMusicController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private timerId: number | null = null;
  private muted = false;
  private started = false;

  public start(): void {
    if (typeof window === 'undefined') return;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(2100, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(0.7, this.ctx.currentTime);

      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    if (!this.started) {
      this.started = true;
      this.muted = false;
      this.fadeGain(TARGET_VOLUME, 1.4);
      this.scheduleLoop();
      this.timerId = window.setInterval(() => {
        if (!this.muted && this.ctx && this.ctx.state === 'running') {
          this.scheduleLoop();
        }
      }, LOOP_BEATS * BEAT_SECONDS * 1000);
    } else if (this.muted) {
      this.setMuted(false);
    }
  }

  public setMuted(nextMuted: boolean): void {
    this.muted = nextMuted;
    if (!this.ctx || !this.masterGain) return;

    if (nextMuted) {
      this.fadeGain(0.0001, 0.45);
    } else {
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      this.fadeGain(TARGET_VOLUME, 0.65);
    }
  }

  public toggleMute(): boolean {
    if (!this.started) {
      this.start();
      return false;
    }
    this.setMuted(!this.muted);
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public dispose(): void {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.masterGain = null;
      this.filterNode = null;
    }
    this.started = false;
  }

  private fadeGain(target: number, durationSeconds: number): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(target, now + durationSeconds);
  }

  private scheduleLoop(): void {
    if (!this.ctx || !this.filterNode) return;
    const baseTime = this.ctx.currentTime + 0.08;

    for (const chord of PAD_CHORDS) {
      const startTime = baseTime + chord.beat * BEAT_SECONDS;
      const duration = chord.dur * BEAT_SECONDS;
      for (const freq of chord.freqs) {
        this.playPadTone(freq, startTime, duration);
      }
    }

    for (const note of MELODY_SEQUENCE) {
      const startTime = baseTime + note.beat * BEAT_SECONDS;
      const duration = note.dur * BEAT_SECONDS;
      this.playHarpPluck(note.freq, startTime, duration, note.gain);
    }
  }

  private playHarpPluck(freq: number, startTime: number, duration: number, peakGain: number): void {
    if (!this.ctx || !this.filterNode) return;

    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    const harmonicGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 2, startTime);
    harmonicGain.gain.setValueAtTime(0.18, startTime);

    env.gain.setValueAtTime(0.0001, startTime);
    env.gain.linearRampToValueAtTime(peakGain, startTime + 0.035);
    env.gain.exponentialRampToValueAtTime(peakGain * 0.35, startTime + 0.45);
    env.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(env);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(env);
    env.connect(this.filterNode);

    osc.start(startTime);
    harmonic.start(startTime);
    osc.stop(startTime + duration + 0.05);
    harmonic.stop(startTime + duration + 0.05);
  }

  private playPadTone(freq: number, startTime: number, duration: number): void {
    if (!this.ctx || !this.filterNode) return;

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    env.gain.setValueAtTime(0.0001, startTime);
    env.gain.linearRampToValueAtTime(0.032, startTime + duration * 0.35);
    env.gain.linearRampToValueAtTime(0.024, startTime + duration * 0.7);
    env.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(env);
    env.connect(this.filterNode);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }
}
