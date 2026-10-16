import type { CSSProperties, ReactNode } from 'react';

// Deterministic pseudo-random so the torn edges render the same on server and client.
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Builds a clip-path polygon with ragged edges. `edges` picks which sides are torn.
export function tornPolygon(seed: number, amplitude: number, edges: 'top-bottom' | 'all') {
  const random = seeded(seed);
  const jag = () => (random() * amplitude).toFixed(1);
  const points: string[] = [];
  const step = 1.6;
  const sides = edges === 'all' ? amplitude : 0;

  for (let x = 0; x <= 100; x += step) points.push(`${x.toFixed(1)}% ${jag()}px`);
  if (edges === 'all') {
    for (let y = step * 3; y <= 100; y += step * 3) points.push(`calc(100% - ${(random() * sides).toFixed(1)}px) ${y.toFixed(1)}%`);
  }
  for (let x = 100; x >= 0; x -= step) points.push(`${x.toFixed(1)}% calc(100% - ${jag()}px)`);
  if (edges === 'all') {
    for (let y = 100 - step * 3; y >= 0; y -= step * 3) points.push(`${(random() * sides).toFixed(1)}px ${y.toFixed(1)}%`);
  }

  return `polygon(${points.join(', ')})`;
}

type TornPaperProps = {
  children: ReactNode;
  className?: string;
  color: string;
  edges?: 'top-bottom' | 'all';
  rotate?: number;
  seed?: number;
  style?: CSSProperties;
};

export function TornPaper({ children, className = '', color, edges = 'top-bottom', rotate = 0, seed = 7, style }: TornPaperProps) {
  return (
    <div className={`hb-torn ${className}`.trim()} style={{ ...style, transform: `rotate(${rotate}deg)` }}>
      <div className="hb-torn-back" style={{ clipPath: tornPolygon(seed + 101, 11, edges) }} aria-hidden="true" />
      <div className="hb-torn-face" style={{ clipPath: tornPolygon(seed, 8, edges), background: color }}>
        <span className="hb-torn-texture" aria-hidden="true" />
        <div className="hb-torn-content">{children}</div>
      </div>
    </div>
  );
}

// Hand-drawn double underline, as on the reference strip
export function DoodleUnderline() {
  return (
    <svg className="hb-doodle-underline" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 10 C 80 4, 180 6, 296 3" />
      <path d="M18 19 C 100 13, 200 14, 290 10" />
    </svg>
  );
}
