import type { CSSProperties } from 'react';

// x/y are % positions in the frame; m is an optional [x, y] used on phones, where the text fills the width.
export type Burst = { x: number; y: number; delay: number; colour: string; m?: [number, number] };

const rays = Array.from({ length: 12 }, (_, i) => i * 30);

// Soft fireworks blooming in turn, on a loop. Styles live in hero.css (.hw-fireworks, .hw-burst).
export function Fireworks({ bursts }: { bursts: Burst[] }) {
  return (
    <span className="hw-fireworks" aria-hidden="true">
      {bursts.map((burst, index) => {
        const [mx, my] = burst.m ?? [burst.x, burst.y];
        return (
          <span key={index} className="hw-burst" style={{ '--x': `${burst.x}%`, '--y': `${burst.y}%`, '--mx': `${mx}%`, '--my': `${my}%`, '--delay': `${burst.delay}s`, '--c': burst.colour } as CSSProperties}>
            {rays.map((angle) => <i key={angle} style={{ '--a': `${angle}deg` } as CSSProperties} />)}
            <b />
          </span>
        );
      })}
    </span>
  );
}

