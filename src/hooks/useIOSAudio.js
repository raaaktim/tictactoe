import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * useIOSAudio - Synthesizes iOS-quality taptic haptics and glass acoustic sound effects
 * using the browser's built-in Web Audio API. Zero external audio file dependencies.
 */
export function useIOSAudio() {
  const [isMuted, setIsMuted] = useState(() => {
    try {
      const saved = localStorage.getItem('ios_ttt_sound_muted');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const audioCtxRef = useRef(null);

  // Initialize or resume AudioContext on first user interaction
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      try {
        localStorage.setItem('ios_ttt_sound_muted', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  }, []);

  // iOS Taptic Haptic click (mechanical snappy feel)
  const playTap = useCallback(() => {
    if (isMuted) return;
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(8);
      }
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pitch drop creates the authentic iOS subtle keyboard/touch 'pop'
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context might fail before gesture
    }
  }, [isMuted, getAudioContext]);

  // Player X: Crisp crystalline glass ping
  const playMarkX = useCallback(() => {
    if (isMuted) return;
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate([12]);
      }
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // High glass chime harmonic
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5
      osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1760, now); // A6 overtone

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.2);
      osc2.stop(now + 0.2);
    } catch {}
  }, [isMuted, getAudioContext]);

  // Player O: Resonant liquid bubble drop sound
  const playMarkO = useCallback(() => {
    if (isMuted) return;
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate([16]);
      }
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pitch scoop upwards gives the classic water droplet "bloop" effect
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.09);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }, [isMuted, getAudioContext]);

  // iOS Celebratory Victory Glass Chime
  const playWin = useCallback(() => {
    if (isMuted) return;
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate([20, 60, 30, 60, 40]);
      }
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major arpeggio)
      notes.forEach((freq, idx) => {
        const start = ctx.currentTime + idx * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.28, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.5);
      });
    } catch {}
  }, [isMuted, getAudioContext]);

  // Tie sound: gentle low water swirl
  const playTie = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }, [isMuted, getAudioContext]);

  return {
    isMuted,
    toggleMute,
    playTap,
    playMarkX,
    playMarkO,
    playWin,
    playTie
  };
}
