import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Todo } from '../edge-activation-handoff/Shared';
import { portalHref } from './content';
import { Highlight } from './Effects';
import { Fireworks, type Burst } from './Fireworks';

const checks = ['Payment confirmed', 'Soul Portal access', 'Day One ready when you are'];

// Soft fireworks blooming in turn around the frame, kept clear of the portrait's face.
const bursts: Burst[] = [
  { x: 64, y: 12, delay: 0, colour: '#f48bb3', m: [10, 53] },
  { x: 88, y: 32, delay: 1.1, colour: '#cbb0ed', m: [90, 55] },
  { x: 92, y: 74, delay: 2.2, colour: '#9b4d86', m: [90, 72] },
  { x: 48, y: 8, delay: 1.6, colour: '#e987aa', m: [10, 66] },
  { x: 80, y: 92, delay: 2.8, colour: '#f48bb3', m: [88, 88] },
  { x: 8, y: 92, delay: 0.6, colour: '#cbb0ed', m: [10, 94] },
];

// Welcome hero: the home page's V11 hero, flipped, with a checklist and a continuous
// fireworks celebration inside the frame (design rounds 1 and 2).
export function Hero() {
  return (
    <div className="hw-stage">
      <aside className="v11-fomo" aria-label="Order confirmation">
        <p><strong className="hw-shiny">Payment confirmed.</strong> The Edge Activation is yours, and Day One is waiting inside Soul Portal.</p>
        <a className="hw-fomo-link" href={portalHref}>Go to Soul Portal</a>
      </aside>

      <header className="v11-nav">
        <Link className="v11-logo" href="/">Daniela<span>✦</span></Link>
        <p>Mindset · Growth · Expansion</p>
        <div><a href={portalHref}>Soul Portal</a><a className="hw-nav-btn" href={portalHref}>Go to Soul Portal</a></div>
      </header>

      <section className="v11-hero hw-hv2" aria-labelledby="hw-hero-title">
        <div className="v11-orbit v11-orbit-one" aria-hidden="true" />
        <div className="v11-orbit v11-orbit-two" aria-hidden="true" />
        <div className="v11-photo hw-hv2-photo" role="img" aria-label="Daniela at a table beside a studio microphone">
          <p>see you inside</p>
          <span className="hw-beam" aria-hidden="true" />
        </div>

        <Fireworks bursts={bursts} />

        <div className="v11-story">
          <p className="v11-eyebrow">welcome home</p>
          <h1 id="hw-hero-title"><span>You’re in.</span><em><Highlight>Day One</Highlight> is waiting for you.</em></h1>
          <ul className="hw-hv2-checks">
            {checks.map((check, index) => (
              <li key={check} style={{ '--i': index } as CSSProperties}>{check}</li>
            ))}
          </ul>
          <p className="v11-deck">The Edge Activation is yours: five mornings, five audio transmissions and five soul love letters. Everything lives inside Soul Portal, the community you joined when you signed up for your free activation.</p>
          <div className="v11-hero-cta-wrap">
            <a className="v11-hero-cta-final hw-shimmer-cta" href={portalHref}>
              <span className="v11-hero-cta-copy">
                <strong>GO TO SOUL PORTAL</strong>
                <small>DAY ONE IS WAITING</small>
              </span>
              <span className="v11-hero-cta-arrow" aria-hidden="true">
                <svg viewBox="0 0 78 42">
                  <path d="M4 29 C17 9 37 8 50 18 C58 24 57 33 50 34 C42 35 38 27 45 21 C53 14 65 17 73 23" />
                  <path d="M66 15 C69 19 71 21 74 23 C70 25 67 28 64 31" />
                </svg>
              </span>
            </a>
          </div>
          <small>From Daniela Ion, recording artist and founder of Soul Portal and Her Voice Impacts.</small>
          {portalHref.startsWith('#') && (
            <p className="hw-hero-todo"><Todo>Link the Soul Portal buttons on this page (portalHref in content.ts).</Todo></p>
          )}
        </div>
      </section>
    </div>
  );
}

