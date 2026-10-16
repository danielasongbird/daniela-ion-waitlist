import type { ReactNode } from 'react';

export const checkoutHref = process.env.NEXT_PUBLIC_EDGE_CHECKOUT_URL || '#checkout';
const ctaLabel = 'YES, I WANT THE EDGE ACTIVATION FOR $27';
const ctaNote = 'One payment. No subscription. Day One is waiting the moment you’re in.';

export function Tag({ number, name, purpose }: { number: number; name: string; purpose: string }) {
  return (
    <div className="hb-tag" id={`section-${number}`}>
      <p><span>Section {String(number).padStart(2, '0')}</span> {name}</p>
      <p className="hb-purpose">{purpose}</p>
    </div>
  );
}

function CtaArrow() {
  return (
    <svg viewBox="0 0 78 42">
      <path d="M4 29 C17 9 37 8 50 18 C58 24 57 33 50 34 C42 35 38 27 45 21 C53 14 65 17 73 23" />
      <path d="M66 15 C69 19 71 21 74 23 C70 25 67 28 64 31" />
    </svg>
  );
}

export function Cta({ variant = 'supporting', align = 'start' }: { variant?: 'hero' | 'supporting'; align?: 'start' | 'center' }) {
  const base = variant === 'hero' ? 'v11-hero-cta' : 'v11-supporting-cta';
  const className = variant === 'hero' ? 'v11-hero-cta-final' : 'v11-supporting-cta';

  return (
    <div className={`hb-cta hb-cta-${align}${variant === 'hero' ? ' v11-hero-cta-wrap' : ''}`}>
      <a className={className} href={checkoutHref}>
        <span className={`${base}-copy`}>
          <strong>{ctaLabel}</strong>
          <small>ONE PAYMENT · NO SUBSCRIPTION</small>
        </span>
        <span className={`${base}-arrow`} aria-hidden="true"><CtaArrow /></span>
      </a>
      <p>{ctaNote}</p>
    </div>
  );
}

export function Todo({ children }: { children: ReactNode }) {
  return <mark className="hb-todo">[{children}]</mark>;
}
