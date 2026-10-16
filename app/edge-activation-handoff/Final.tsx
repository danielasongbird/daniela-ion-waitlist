import type { CSSProperties } from 'react';
import { Cta, Tag } from './Shared';

const ringBars = Array.from({ length: 64 }, (_, i) => ({ angle: i * (360 / 64), delay: ((i * 37) % 64) / 40 }));

// Section 24: the orb (design round 28). Fills the screen: drifting colour field,
// a pulsing audio ring around the offer, and a marquee pinned to the bottom.
export function Final() {
  return (
    <section className="hb-fc3" aria-labelledby="hb-fc3-title">
      <span className="hb-fc3-blob is-1" aria-hidden="true" />
      <span className="hb-fc3-blob is-2" aria-hidden="true" />
      <span className="hb-fc3-blob is-3" aria-hidden="true" />

      <div className="hb-fc3-stage">
        <div className="hb-inner hb-fc3-content">
          <Tag number={24} name="Final CTA" purpose="Repeat offer, price, and action." />
          <div className="hb-fc3-ring" aria-hidden="true">
            {ringBars.map((bar, index) => (
              <i key={index} style={{ '--a': `${bar.angle}deg`, animationDelay: `${bar.delay}s` } as CSSProperties} />
            ))}
          </div>
          <p className="hb-fc3-kicker">day one opens the moment you’re in</p>
          <h2 id="hb-fc3-title">The Edge Activation. <em>Five mornings.</em></h2>
          <p className="hb-fc3-sub">One audio and one letter each day. $27, once.</p>
          <div className="hb-of-cta-pink"><Cta variant="hero" align="center" /></div>
        </div>

        <div className="hb-fc3-marquee" aria-hidden="true">
          <div>
            {Array.from({ length: 2 }).map((_, copy) => (
              <span key={copy}>
                Five mornings <i>✦</i> One audio <i>✦</i> One letter <i>✦</i> $27, once <i>✦</i> Day one opens the moment you’re in <i>✦</i>{' '}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="hb-ps hb-fc3-ps">P.S. If you remember one thing from this page: strategy can tell you how to say it. It can’t tell you what’s yours to say. That’s what these five mornings are for.</p>
    </section>
  );
}
