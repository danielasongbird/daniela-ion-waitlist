'use client';

import type { CSSProperties } from 'react';
import { Tag } from './Shared';
import { useInView } from './useInView';

// Deterministic sparkles for the B half
const sparkles = Array.from({ length: 9 }, (_, i) => ({
  left: 12 + ((i * 29) % 78),
  delay: (i * 0.9) % 6,
  size: 8 + (i % 3) * 4,
}));

// Section 23: split screen (design round 27). A loops in place, B rises into the light.
export function Contrast() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);

  return (
    <section className="hb-cc2">
      <div className="hb-cc2-head hb-inner">
        <Tag number={23} name="Contrast close" purpose="Show the cost of continuing versus trying the new approach." />
        <p className="hb-kicker">your call</p>
        <h2>You have two <em>reasonable choices.</em></h2>
      </div>

      <div ref={ref} className={`hb-cc2-split${inView ? ' is-in' : ''}`}>
        <article className="hb-cc2-a">
          <span className="hb-cc2-loop" aria-hidden="true">
            <i className="hb-cc2-spin">↻</i>
            <span className="hb-cc2-draft"><span className="hb-cc2-typed" /><i className="hb-cc2-caret" /></span>
          </span>
          <b aria-hidden="true">A</b>
          <p>You can carry on the way you are. Keep the hooks, keep the calendar, keep rewriting until it feels safe. It works well enough, and some weeks it works well.</p>
        </article>

        <span className="hb-cc2-or" aria-hidden="true">or</span>

        <article className="hb-cc2-b">
          <span className="hb-cc2-rays" aria-hidden="true" />
          <span className="hb-cc2-sun" aria-hidden="true" />
          <span className="hb-cc2-sparkles" aria-hidden="true">
            {sparkles.map((s, index) => (
              <i key={index} style={{ left: `${s.left}%`, animationDelay: `${s.delay}s`, fontSize: s.size } as CSSProperties}>✦</i>
            ))}
          </span>
          <b aria-hidden="true">B</b>
          <p>Or you can spend $27 and five mornings finding out what you sound like when you stop editing yourself first. If you don’t like what you find, you’ve lost less than the cost of a dinner out.</p>
        </article>
      </div>

      <div className="hb-cc2-either">
        <p>Either way, you’re about to listen to your free activation. <em>This is about what you do with what you hear.</em></p>
      </div>
    </section>
  );
}
