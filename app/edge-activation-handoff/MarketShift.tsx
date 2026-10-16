'use client';

import { useEffect, useRef, useState } from 'react';
import { Tag } from './Shared';

// Section 7: sameness grid (design round 9, version 1) with the Human Renaissance feature from version 2
export function MarketShift() {
  const featureRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const feature = featureRef.current;
    if (!feature) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: .4 });
    observer.observe(feature);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hb-band hb-peach hb-mv1">
      <div className="hb-inner">
        <Tag number={7} name="Market shift" purpose="Explain why the old approach has become less effective." />
        <div className="hb-mv1-grid">
          <div>
            <p className="hb-kicker">what changed</p>
            <h2>When competent is that easy to come by, <em>it stops being what people notice.</em></h2>
            <div className="hb-prose hb-mv1-prose">
              <p>Something changed over the last couple of years.</p>
              <p>Anyone can now produce a clean, competent post, email, or sales page in about thirty seconds. The templates are free. The trends are public. The tools are the same for everyone.</p>
            </div>
          </div>

          <div className="hb-mv1-tiles" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => (
              index === 4 ? (
                <div className="hb-mv1-tile is-yours" key={index}>
                  <span className="hb-mv1-yours">what you’ve lived</span>
                </div>
              ) : (
                <div className="hb-mv1-tile" key={index}>
                  <i className="hb-mv1-img" />
                  <i style={{ width: '90%' }} />
                  <i style={{ width: '70%' }} />
                  <i style={{ width: '80%' }} />
                </div>
              )
            ))}
          </div>
        </div>

        <p className="hb-mv1-stop">What people still stop for is the thing no tool can produce from scratch: what you’ve lived, and the specific way you would say it if you weren’t worried about who was reading.</p>

        <div className={`hb-mv2-renaissance${inView ? ' is-in' : ''}`} ref={featureRef}>
          <p className="hb-mv2-call">I call this the</p>
          <p className="hb-mv2-word" aria-label="Human Renaissance.">Human<br />Renaissance.</p>
          <p className="hb-mv2-body">It’s the reason the women moving people right now aren’t the loudest ones. They’re the ones who stopped hiding the part that’s theirs.</p>
        </div>

        <p className="hb-mv2-close">Which means polishing your delivery is no longer enough on its own. The thing worth protecting is the voice underneath it.</p>
      </div>
    </section>
  );
}
