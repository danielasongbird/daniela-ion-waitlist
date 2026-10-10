'use client';

import { useState } from 'react';
import { Tag, Todo } from './Shared';


const paragraphs = [
  'Each morning you get one audio transmission from me and one soul love letter prompt. I call them transmissions rather than lessons because there’s nothing to take notes on. You listen, and then you write. That’s the whole daily rhythm.',
  'The audios carry what I’ve learned from my own teachers and from a long time in front of a microphone. The letters are yours. You write them to that day’s part of you as openly as you can, including the parts that aren’t pretty. Especially those.',
  'It all lives inside Soul Portal, the community you joined when you signed up for your free activation, so there’s nothing new to set up. Day One is there as soon as you’re in.',
];

const bonuses = [
  { name: 'The Equanimity Transmission', text: 'A private audio that arrives before Day One. Listen to it the evening before you start, so Day One doesn’t begin in the middle of a busy head.' },
  { name: 'Your Before & After Soul Audit', text: 'A short interactive questionnaire you fill in on Day One and again on Day Five, so you can see for yourself what moved and what didn’t.' },
  { name: 'The community inside Soul Portal', text: 'Other women doing the same five days. It works more like a shared practice than a support group: nobody is there to fix you.' },
  { name: 'A live group Q&A with an intuitive transmission', text: 'Bring what came up during your five days and ask me about it directly.' },
];

const todos = (
  <>
    <p className="hb-after-cards"><Todo>Bonus 04 timing conflict: the .docx says this call closes out the five days; the September running order says it happens once a season, with the latest replay available straight away. Confirm which is true.</Todo></p>
    <p className="hb-after-cards"><Todo>The September running order also lists “The New Paradigm Transmission” and “a surprise after Day Five”. The .docx doesn’t mention either. Confirm whether they’re still part of the offer.</Todo></p>
  </>
);

function BonusCard({ bonus, index }: { bonus: (typeof bonuses)[number]; index: number }) {
  return (
    <>
      <small>Bonus 0{index + 1}</small>
      <strong>{bonus.name}</strong>
      <p>{bonus.text}</p>
    </>
  );
}

// Bonuses: tear the wrapping paper (picked in design round 13c)
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function tearEdge(seed: number, side: 'left' | 'right') {
  const random = seeded(seed);
  const points: string[] = [];
  for (let y = 0; y <= 100; y += 2.5) {
    const jag = (random() * 18).toFixed(1);
    points.push(side === 'left' ? `calc(100% - ${jag}px) ${y}%` : `${jag}px ${y}%`);
  }
  return side === 'left'
    ? `polygon(0 0, ${points.join(', ')}, 0 100%)`
    : `polygon(100% 0, 100% 100%, ${points.reverse().join(', ')})`;
}

function RestWrap() {
  const [torn, setTorn] = useState(false);

  return (
    <div className={`hb-wr${torn ? ' is-torn' : ''}`}>
      <div className="hb-wr-inside">
        <p className="hb-wr-label">Also included</p>
        <div className="hb-wr-grid">
          {bonuses.map((bonus, index) => (
            <article key={bonus.name} style={{ transitionDelay: torn ? `${0.3 + index * 0.1}s` : '0s' }}>
              <BonusCard bonus={bonus} index={index} />
            </article>
          ))}
        </div>
      </div>

      <div className="hb-wr-paper hb-wr-left" aria-hidden="true" style={{ clipPath: tearEdge(17, 'left') }}>
        <span className="hb-wr-band" />
      </div>
      <div className="hb-wr-paper hb-wr-right" aria-hidden="true" style={{ clipPath: tearEdge(17, 'right') }}>
        <span className="hb-wr-band" />
      </div>

      {!torn && (
        <div className="hb-wr-center">
          <span className="hb-wr-bow" aria-hidden="true" />
          <button className="hb-wr-open" onClick={() => setTorn(true)} type="button">
            <small>Also included</small>
            tear it open
          </button>
        </div>
      )}
    </div>
  );
}

// Section 11: listen-then-write head (design round 13) with the torn wrapping-paper bonus reveal
export function Intro() {
  return (
    <section className="hb-band hb-cream hb-iv2" id="whats-inside">
      <div className="hb-inner">
        <Tag number={11} name="Product introduction" purpose="Present the offer as the way to implement the mechanism." />
        <div className="hb-iv2-head">
          <p className="hb-kicker">what you get</p>
          <h2>So I packaged the five days into <em>The Edge Activation.</em></h2>
        </div>

        <div className="hb-iv2-flow">
          <div className="hb-iv2-step">
            <span className="hb-iv2-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48"><path d="M8 28v-4a16 16 0 0 1 32 0v4" /><rect x="6" y="28" width="9" height="13" rx="3" /><rect x="33" y="28" width="9" height="13" rx="3" /></svg>
            </span>
            <strong>You listen</strong>
          </div>
          <span className="hb-iv2-then" aria-hidden="true">then</span>
          <div className="hb-iv2-step">
            <span className="hb-iv2-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48"><path d="M32 8l8 8-22 22H10v-8z" /><path d="M28 12l8 8" /></svg>
            </span>
            <strong>you write</strong>
          </div>
        </div>

        <div className="hb-prose hb-iv2-prose">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <RestWrap />
        {todos}
      </div>
    </section>
  );
}

