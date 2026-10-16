'use client';

import { useEffect, useRef, useState } from 'react';
import { Tag } from './Shared';

const steps = [
  'You know what you want to say, so you write it.',
  'Then you read it back as your most skeptical former colleague, your aunt, and a stranger who might screenshot it.',
  'You cut the line that was actually true.',
  'You post the safer version, or you post nothing and tell yourself you’ll come back to it.',
];
const cutStep = 2;

// Section 5: the loop, step by step on a lilac wash, closing with pinned drafts (design rounds 5 and 6)
export function Problem() {
  const listRef = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const list = listRef.current;
      if (list) {
        const rect = list.getBoundingClientRect();
        const progress = (window.innerHeight * 0.6 - rect.top) / rect.height;
        setFill(Math.max(0, Math.min(1, progress)));
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hb-qv3">
      <div className="hb-inner">
        <Tag number={5} name="Problem recognition" purpose="Describe the prospect’s frustrating current experience." />
        <div className="hb-qv3-grid">
          <div className="hb-qv3-sticky">
            <p className="hb-kicker">the post you didn’t publish</p>
            <h2>You open a <em>blank caption.</em></h2>
          </div>
          <div className="hb-qv3-stepwrap">
            <span className="hb-qv3-track" aria-hidden="true"><i style={{ transform: `scaleY(${fill})` }} /></span>
            <ol className="hb-qv3-steps" ref={listRef}>
              {steps.map((step, index) => (
                <li key={step} className={fill >= (index + 0.5) / steps.length ? 'is-lit' : undefined}>
                  <span>0{index + 1}</span>
                  <p>{index === cutStep ? <s className="hb-qv3-cut">{step}</s> : step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="hb-qc2">
          <div className="hb-qc2-notes">
            <p>Or it’s the book, and the chapter that has been <strong>“almost there” since spring</strong>. Or <strong>the song</strong>. Or <strong>the offer page you’ve rewritten four times</strong> and still don’t like.</p>
            <p><strong>It isn’t that you don’t know how.</strong> You know how to write a hook. You know where the button goes. You’ve probably explained it to someone else.</p>
            <p>What went missing is <strong>the part that comes before the how</strong>: <strong>the sentence that arrived whole</strong>, before you started managing how it would land.</p>
          </div>
          <p className="hb-qc2-question">Have you noticed that the things you’re proudest of are usually the ones you almost didn’t publish?</p>
        </div>
      </div>
    </section>
  );
}
