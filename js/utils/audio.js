// ==========================================================================
// BID MY CAR - NATIVE WEB AUDIO API SYNTHESIZER
// High-fidelity sound effects for Copart-style auction floor without external files
// ==========================================================================

class AuctionSoundEffects {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Realistic Auctioneer Wooden Gavel Hammer Strike
  playGavel() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Low body strike
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
    
    gain.gain.setValueAtTime(0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);

    // High wood crack click
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(820, t);
    osc2.frequency.exponentialRampToValueAtTime(120, t + 0.05);

    gain2.gain.setValueAtTime(0.6, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t);
    osc2.stop(t + 0.1);
  }

  // Ascending crisp chime when user or bidder places a bid
  playBidChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [587.33, 880]; // D5, A5
    notes.forEach((freq, idx) => {
      const t = this.ctx.currentTime + (idx * 0.07);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  }

  // Outbid warning double alert
  playOutbid() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.setValueAtTime(349.23, t + 0.1);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.setValueAtTime(0.25, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  // Countdown timer pulse tick (last 5 seconds)
  playWarningTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, t);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  // Victory Fanfare when lot is won
  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const t = this.ctx.currentTime + (idx * 0.12);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.7);
    });
  }

  // Run & Drive engine starter simulation
  playEngineStart() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Starter motor cranking
    for (let i = 0; i < 4; i++) {
      const crankTime = t + (i * 0.15);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(70 + (i * 10), crankTime);
      gain.gain.setValueAtTime(0.3, crankTime);
      gain.gain.exponentialRampToValueAtTime(0.01, crankTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(crankTime);
      osc.stop(crankTime + 0.14);
    }

    // Engine catches and revs
    const catchTime = t + 0.65;
    const oscEngine = this.ctx.createOscillator();
    const gainEngine = this.ctx.createGain();
    oscEngine.type = 'triangle';
    oscEngine.frequency.setValueAtTime(110, catchTime);
    oscEngine.frequency.exponentialRampToValueAtTime(280, catchTime + 0.4);
    oscEngine.frequency.exponentialRampToValueAtTime(130, catchTime + 1.2);

    gainEngine.gain.setValueAtTime(0.01, catchTime);
    gainEngine.gain.linearRampToValueAtTime(0.4, catchTime + 0.2);
    gainEngine.gain.exponentialRampToValueAtTime(0.001, catchTime + 1.8);

    oscEngine.connect(gainEngine);
    gainEngine.connect(this.ctx.destination);
    oscEngine.start(catchTime);
    oscEngine.stop(catchTime + 1.9);
  }
}

export const auctionAudio = new AuctionSoundEffects();
