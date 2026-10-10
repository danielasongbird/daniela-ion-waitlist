// Hand-drawn motion graphics for the V2 "why now" rows. Lines get a live "boiling" wobble from the
// shared #pv-sketch filter (turbulence with a changing seed), so they read as drawn by hand.

// Defines the sketch filter once for all three illustrations.
export function SketchFilter() {
  return (
    <svg className="pv-sketch-defs" aria-hidden="true" focusable="false">
      <filter id="pv-sketch" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1">
          <animate attributeName="seed" values="1;2;3;4;5" dur="0.9s" repeatCount="indefinite" calcMode="discrete" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="2.6" />
      </filter>
    </svg>
  );
}

const loop =
  'M28 96 C26 44 108 30 130 70 C150 108 84 132 70 96 C58 62 118 44 150 68 C182 92 154 134 122 118 C92 102 108 58 160 60 C194 62 204 98 190 112';

// 1. The perfectionism loop: a scribbled coil, with a rose stroke that keeps chasing around it.
export function LoopArt() {
  return (
    <svg className="pv-art pv-art-loop" viewBox="0 0 220 160" aria-hidden="true">
      <g filter="url(#pv-sketch)">
        <path className="pv-art-faint" d={loop} pathLength={1} />
        <path className="pv-art-chase" d={loop} pathLength={1} />
        <path className="pv-art-faint" d="M186 104 l9 8 l-11 5" />
      </g>
    </svg>
  );
}

// A wide wave (period 40) that scrolls sideways inside a clip window (long enough to cover it while it moves).
const wave = Array.from({ length: 16 }, (_, i) => `q10 ${i % 2 ? 18 : -18} 20 0`).join(' ');

// 2. Polished sameness vs a real frequency: flat identical lines, one living wave rolling through.
export function SamenessArt() {
  return (
    <svg className="pv-art pv-art-same" viewBox="0 0 220 160" aria-hidden="true">
      <defs>
        <clipPath id="pv-art-window"><rect x="16" y="40" width="188" height="80" /></clipPath>
      </defs>
      <g filter="url(#pv-sketch)">
        {[28, 48, 112, 132].map((y) => <path key={y} className="pv-art-faint" d={`M18 ${y} H202`} />)}
        <g clipPath="url(#pv-art-window)">
          <path className="pv-art-wave" d={`M-40 80 ${wave}`} />
        </g>
      </g>
    </svg>
  );
}

// 3. Your frequency: a voice sending out sound-wave arcs, and a pulsing equalizer.
export function FrequencyArt() {
  return (
    <svg className="pv-art pv-art-freq" viewBox="0 0 220 160" aria-hidden="true">
      <g filter="url(#pv-sketch)">
        <circle className="pv-art-dot" cx="44" cy="80" r="7" />
        {['M62 60 Q74 80 62 100', 'M76 46 Q96 80 76 114', 'M90 32 Q118 80 90 128'].map((d, i) => (
          <path key={d} className="pv-art-arc" d={d} style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
        {[40, 64, 30, 56, 22, 46].map((h, i) => (
          <path key={i} className="pv-art-bar" d={`M${140 + i * 12} ${80 - h / 2} V${80 + h / 2}`} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </g>
    </svg>
  );
}


