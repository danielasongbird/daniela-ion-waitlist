import type { CSSProperties } from 'react';

// Background waves (waves round, version 2): four overlapping waves in a pink-to-lilac gradient, one
// glowing, rolling left to right like an audio waveform. It sits behind the stacked cards and pins at
// their mid-height while they stack.

// A sine-like wave from x=from to x=to (viewBox units), built from quadratic segments.
function wave(y: number, amp: number, period: number, from: number, to: number) {
  const half = period / 2;
  const steps = Math.ceil((to - from) / half);
  return `M${from} ${y} q${period / 4} ${-amp} ${half} 0 ` + Array.from({ length: steps }, () => `t${half} 0`).join(' ');
}

const waves = [
  { amp: 70, period: 700, dur: 16, width: 2.6 },
  { amp: 42, period: 460, dur: 11, width: 1.8 },
  { amp: 90, period: 1100, dur: 22, width: 1.4 },
  { amp: 28, period: 300, dur: 8, width: 1.4 },
];

export function WhyWaveform() {
  return (
    <div className="pv-waves" aria-hidden="true">
      <svg className="pv-waves-svg" viewBox="0 0 1600 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pv-wave-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#e7a3b8" />
            <stop offset=".5" stopColor="#c98bb0" />
            <stop offset="1" stopColor="#b9a0de" />
          </linearGradient>
        </defs>
        {waves.map((w, i) => (
          <g key={i} className="pv-wave-flow" style={{ '--dur': `${w.dur}s`, '--shift': `${w.period}px` } as CSSProperties}>
            <path className={`pv-waveform${i === 0 ? ' is-glow' : ''}`} d={wave(150, w.amp, w.period, -2400, 3200)} strokeWidth={w.width} />
          </g>
        ))}
      </svg>
    </div>
  );
}

