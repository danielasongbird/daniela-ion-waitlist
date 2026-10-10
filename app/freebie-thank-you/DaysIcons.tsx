import type { ReactNode } from 'react';

// Hand-drawn animated icons for the five days (kept from the first five-days round). They use the page's
// #pv-sketch filter for the boiling hand-drawn line; styles in days.css.
const icons: ReactNode[] = [
  // Embodiment: a grounded figure
  <svg key="a" viewBox="0 0 120 120"><circle cx="60" cy="30" r="12" /><path d="M60 44 C52 60 50 74 52 92 M60 44 C68 60 70 74 68 92 M40 62 Q60 54 80 62" /><path className="pv-dicon-glow" d="M22 100 Q60 94 98 100" /></svg>,
  // Expression: a voice and its sound waves
  <svg key="b" viewBox="0 0 120 120"><path d="M30 46 Q30 32 46 32 H64 Q78 32 78 46 V58 Q78 72 64 72 H50 L38 84 V72 Q30 70 30 58 Z" /><path className="pv-dicon-wave" d="M88 44 Q96 54 88 64" /><path className="pv-dicon-wave is-2" d="M96 36 Q108 54 96 72" /></svg>,
  // Resonance: a heart with ripples
  <svg key="c" viewBox="0 0 120 120"><path d="M60 88 C30 68 28 44 44 38 C54 34 60 44 60 48 C60 44 66 34 76 38 C92 44 90 68 60 88 Z" /><circle className="pv-dicon-ripple" cx="60" cy="60" r="40" /><circle className="pv-dicon-ripple is-2" cx="60" cy="60" r="40" /></svg>,
  // Incubation: a crescent moon over a seed
  <svg key="d" viewBox="0 0 120 120"><path d="M70 22 A26 26 0 1 0 92 54 A20 20 0 1 1 70 22 Z" /><ellipse className="pv-dicon-glow" cx="48" cy="88" rx="12" ry="16" /><path d="M48 72 Q52 64 58 62" /></svg>,
  // Sovereignty: a crown
  <svg key="e" viewBox="0 0 120 120"><path d="M24 82 L30 40 L48 60 L60 32 L72 60 L90 40 L96 82 Z" /><path d="M26 94 H94" /><circle className="pv-dicon-glow" cx="60" cy="32" r="4" /></svg>,
];

export function DayIcon({ index, className = '' }: { index: number; className?: string }) {
  return (
    <span className={`pv-dicon ${className}`} aria-hidden="true">
      <span className="pv-dicon-sketch">{icons[index]}</span>
    </span>
  );
}

