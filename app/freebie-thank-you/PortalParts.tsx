import type { CSSProperties, ReactNode } from 'react';
import { checkoutHref } from '../edge-activation-handoff/Shared';

// Building blocks shared by V2 and its section design rounds.

export const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;

export function BuyPill({ note }: { note?: string }) {
  return (
    <div className="pv-buy">
      <a className="pv-pill" href={checkoutHref}>Yes, I want The Edge Activation for $27</a>
      <p className="pv-buy-sub">One payment · No subscription</p>
      {note && <p className="pv-buy-note">{note}</p>}
    </div>
  );
}

// Segmented bar, like the opt-in's "Step 1 of 3"; segments fill in turn when it scrolls into view.
export function Steps({ label, right, total, filled }: { label: string; right: string; total: number; filled: number }) {
  return (
    <div className="pv-steps">
      <p><span>{label}</span><span>{right}</span></p>
      <div className="pv-steps-bar" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <span key={index} className={index < filled ? 'is-on' : undefined} style={delay(0.15 * index)} />
        ))}
      </div>
    </div>
  );
}

export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`pv-frame ${className}`}>
      <span className="pv-notch" aria-hidden="true" />
      {children}
    </div>
  );
}





