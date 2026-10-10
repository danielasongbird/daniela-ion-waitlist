'use client';

import type { CSSProperties } from 'react';
import { Tag } from './Shared';
import { useInView } from './useInView';

const replies = [
  <>Fair question. You’ve probably done more of this than most people selling it.</>,
  <>The difference is <strong>where it points.</strong> Most of those practices end with you feeling better. This one ends with <strong>you making something.</strong></>,
  <>Every morning’s writing is aimed at your creative work, in a sequence that moves from your body, to your voice, to the work itself. It’s <strong>inner work with an output.</strong></>,
  <>You also finish with <strong>evidence.</strong> The Soul Audit on Day One and Day Five means you aren’t relying on a vague sense that something shifted. You can read your own before and after.</>,
  <>So the question isn’t whether you’ve done inner work. It’s whether that work has ever been connected to the thing you’re trying to make.</>,
];

// Section 14: message thread, replies arrive one at a time (picked in design round 17)
export function Objection() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);

  return (
    <section className="hb-band hb-cream hb-oj2">
      <div className="hb-inner">
        <Tag number={14} name="Objection #1" purpose="Handle the biggest resistance point." />
        <div className="hb-oj2-head"><p className="hb-kicker">a fair question</p></div>
        <div ref={ref} className={`hb-oj2-thread${inView ? ' is-in' : ''}`}>
          <div className="hb-oj2-ask">
            <h2 className="hb-objection">“I’ve already done meditation, journaling, breathwork. <em>How is this different?”</em></h2>
          </div>
          {replies.map((reply, index) => (
            <div className="hb-oj2-reply" key={index} style={{ '--i': index } as CSSProperties}>
              <span className="hb-oj2-typing" aria-hidden="true"><i /><i /><i /></span>
              <p>{reply}</p>
            </div>
          ))}
          <span className="hb-oj2-avatar" role="img" aria-label="Daniela" />
        </div>
      </div>
    </section>
  );
}
