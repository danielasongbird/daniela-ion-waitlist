import type { ReactNode } from 'react';

// Hand-drawn animated icons for the four bonuses and the Day Five surprise, in the same boiling
// sketch line as the day icons (#pv-sketch filter). Styles in bonus.css.
const icons: ReactNode[] = [
  // The Equanimity Transmission: headphones over a wave that settles flat
  <svg key="a" viewBox="0 0 120 120"><path d="M28 70 V58 Q28 26 60 26 Q92 26 92 58 V70" /><rect x="22" y="64" width="16" height="26" rx="7" /><rect x="82" y="64" width="16" height="26" rx="7" /><path className="pv-bicon-calm" d="M40 102 Q50 92 60 102 T80 102" /></svg>,
  // The New Paradigm Transmission: a woman with light radiating around her
  <svg key="b" viewBox="0 0 120 120"><circle cx="60" cy="44" r="13" /><path d="M36 96 Q38 66 60 64 Q82 66 84 96" /><path className="pv-bicon-ray" d="M60 14 V22 M30 26 L36 32 M90 26 L84 32 M18 50 H26 M94 50 H102" /></svg>,
  // Your Before & After Soul Audit: two pages, the second one ticked
  <svg key="c" viewBox="0 0 120 120"><rect x="18" y="26" width="38" height="60" rx="6" /><path d="M26 40 H48 M26 50 H44 M26 60 H48" /><rect x="64" y="34" width="38" height="60" rx="6" /><path className="pv-bicon-tick" pathLength="1" d="M72 64 L80 72 L94 54" /></svg>,
  // Live Quarterly Q&A: a live dot broadcasting beside a question bubble
  <svg key="d" viewBox="0 0 120 120"><circle className="pv-bicon-live" cx="34" cy="60" r="6" /><path className="pv-bicon-arc" d="M22 46 Q14 60 22 74" /><path className="pv-bicon-arc is-2" d="M46 46 Q54 60 46 74" /><path d="M64 36 H98 Q104 36 104 42 V66 Q104 72 98 72 H80 L70 82 V72 H64 Q58 72 58 66 V42 Q58 36 64 36 Z" /><path d="M76 48 Q76 42 81 42 Q86 42 86 47 Q86 51 81 53 V57 M81 63 V64" /></svg>,
];

// The Day Five surprise: a wrapped gift whose lid lifts and settles
const gift = (
  <svg viewBox="0 0 120 120"><g className="pv-bicon-lid"><rect x="22" y="40" width="76" height="16" rx="4" /><path d="M60 40 Q46 20 38 30 Q34 40 60 40 Q86 40 82 30 Q74 20 60 40" /></g><rect x="28" y="56" width="64" height="44" rx="4" /><path d="M60 56 V100" /></svg>
);

export function BonusIcon({ index, className = '' }: { index: number; className?: string }) {
  return (
    <span className={`pv-bicon ${className}`} aria-hidden="true">
      <span className="pv-bicon-sketch">{icons[index]}</span>
    </span>
  );
}

export function GiftIcon({ className = '' }: { className?: string }) {
  return (
    <span className={`pv-bicon is-gift ${className}`} aria-hidden="true">
      <span className="pv-bicon-sketch">{gift}</span>
    </span>
  );
}
