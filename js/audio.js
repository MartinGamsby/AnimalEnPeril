// ============================================================
// Audio Engine
// ============================================================

const Audio = {
  ctx: null,
  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  },
  _osc(type, freq, dur, vol = 0.15) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, this.ctx.currentTime);
    g.gain.setValueAtTime(vol, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(); o.stop(this.ctx.currentTime + dur);
    return o;
  },
  jump() {
    const o = this._osc('sine', 320, 0.12, 0.1);
    if (o) o.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.1);
  },
  flip() {
    this._osc('triangle', 120, 0.25, 0.12);
    const o = this._osc('sine', 200, 0.2, 0.08);
    if (o) o.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.18);
  },
  collect() {
    const t = this.ctx ? this.ctx.currentTime : 0;
    if (!this.ctx) return;
    [523, 659, 784].forEach((f, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.1, t + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.15);
      o.connect(g).connect(this.ctx.destination);
      o.start(t + i * 0.06); o.stop(t + i * 0.06 + 0.15);
    });
  },
  dash() {
    if (!this.ctx) return;
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.08, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const s = this.ctx.createBufferSource();
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    s.buffer = buf; f.type = 'bandpass'; f.frequency.value = 1500;
    g.gain.setValueAtTime(0.12, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    s.connect(f).connect(g).connect(this.ctx.destination);
    s.start();
  },
  die() {
    const o = this._osc('sawtooth', 200, 0.4, 0.15);
    if (o) o.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.35);
    this._osc('square', 80, 0.3, 0.05);
  },
  portal() {
    [262, 330, 392, 523].forEach((f, i) => {
      if (!this.ctx) return;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      const t = this.ctx.currentTime + i * 0.1;
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      o.connect(g).connect(this.ctx.destination);
      o.start(t); o.stop(t + 0.5);
    });
  },
  shift() {
    const o = this._osc('square', 150, 0.2, 0.08);
    if (o) {
      o.frequency.setValueAtTime(150, this.ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.05);
      o.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.18);
    }
  },
  error() { this._osc('square', 100, 0.15, 0.08); },
  levelStart() {
    [262, 330, 392, 523].forEach((f, i) => {
      if (!this.ctx) return;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      const t = this.ctx.currentTime + i * 0.12;
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      o.connect(g).connect(this.ctx.destination);
      o.start(t); o.stop(t + 0.3);
    });
  },
  buy() {
    [392, 523, 659].forEach((f, i) => {
      if (!this.ctx) return;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      const t = this.ctx.currentTime + i * 0.08;
      g.gain.setValueAtTime(0.1, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.connect(g).connect(this.ctx.destination);
      o.start(t); o.stop(t + 0.2);
    });
  },
};
