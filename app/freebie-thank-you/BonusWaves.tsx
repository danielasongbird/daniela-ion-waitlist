import type { CSSProperties } from 'react';

// Bonuses background (background round, version 2): hand-drawn circular sound waves that fade in and
// out at scattered spots in the section's margins, each ring turning slowly. Styles in bonus.css (.pv-bw*).

// Where each circle sits (percent of the section), its size in px, and when its fade cycle starts
const spots = [
  { x: '6%', y: '14%', size: 260, delay: 0 },
  { x: '93%', y: '9%', size: 320, delay: 2.2 },
  { x: '96%', y: '48%', size: 220, delay: 4.6 },
  { x: '5%', y: '62%', size: 230, delay: 1.3 },
  { x: '52%', y: '97%', size: 260, delay: 3.4 },
  { x: '96%', y: '92%', size: 200, delay: 6.1 },
  { x: '22%', y: '17%', size: 170, delay: 5.3 },
];

// A closed circle whose radius ripples like a sound wave: r = radius + amplitude * sin(k·θ + phase)
export function waveRing(radius: number, amplitude: number, k: number, phase: number) {
  const points = Array.from({ length: 181 }, (_, i) => {
    const angle = (i / 180) * Math.PI * 2;
    const r = radius + amplitude * Math.sin(k * angle + phase);
    return `${(100 + r * Math.cos(angle)).toFixed(1)} ${(100 + r * Math.sin(angle)).toFixed(1)}`;
  });
  return `M${points.join(' L')} Z`;
}

const rings = [waveRing(52, 6, 8, 0), waveRing(68, 5, 11, 1), waveRing(84, 4, 15, 2)];

export function BonusWaves() {
  return (
    <div className="pv-bw" aria-hidden="true">
      {spots.map((spot) => (
        <span
          key={`${spot.x}-${spot.y}`}
          className="pv-bw-spot"
          style={{ left: spot.x, top: spot.y, '--size': `${spot.size}px`, '--bw-d': `${spot.delay}s` } as CSSProperties}
        >
          <svg viewBox="0 0 200 200">
            {rings.map((d, ring) => <path key={ring} className={`pv-bw-wave is-${ring + 1}`} d={d} />)}
          </svg>
        </span>
      ))}
    </div>
  );
}
