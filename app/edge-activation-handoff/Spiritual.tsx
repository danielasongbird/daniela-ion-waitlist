'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Tag } from './Shared';
import { useInView } from './useInView';

const headphones = (
  <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 20v-4a11 11 0 0 1 22 0v4" /><rect x="4" y="19" width="6" height="9" rx="2" /><rect x="22" y="19" width="6" height="9" rx="2" /></svg>
);
const envelope = (
  <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="8" width="24" height="17" rx="2" /><path d="M4 10l12 9 12-9" /></svg>
);
const eye = (
  <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16z" /><circle cx="16" cy="16" r="4" /></svg>
);

const steps: Array<[ReactNode, string]> = [
  [headphones, 'listen to a short audio'],
  [envelope, 'write a private letter'],
  [eye, 'notice what’s different about what you wrote'],
];

// Deterministic star field
const stars = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 37.3) % 100,
  top: (i * 53.7) % 92,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.6,
}));

// Section 16: dawn. Night sky warms into a sunrise, the practice stands on the ground (design round 19).
// Sky text: the question leads, the answer steps down, the two words land as the payoff (round 20).
// Ground: editorial split with big numerals, strategy in a plum card (round 21).
export function Spiritual() {
  const [skyRef, skyIn] = useInView<HTMLElement>(0.3);
  const [groundRef, groundIn] = useInView<HTMLDivElement>(0.3);

  return (
    <section ref={skyRef} className={`hb-sd1${skyIn ? ' is-in' : ''}`}>
      <div className="hb-sd1-sky">
        <span className="hb-sd-stars" aria-hidden="true">
          {stars.map((star, index) => (
            <i
              key={index}
              style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size, animationDelay: `${star.delay}s` } as CSSProperties}
            />
          ))}
        </span>
        <span className="hb-sd1-sun" aria-hidden="true" />
        <div className="hb-inner hb-sd-sky-inner hb-sh1">
          <Tag number={16} name="Objection #2" purpose="Handle another concern." />
          <p className="hb-kicker">another fair question</p>
          <h2 className="hb-objection">“This sounds a bit <em>spiritual for me.”</em></h2>
          <span className="hb-sh1-spark" aria-hidden="true">✦</span>
          <p className="hb-sh1-pretend">Some of my language is spiritual, and I’m not going to pretend otherwise.</p>
          <p className="hb-sh1-words"><b>I say <em>soul.</em></b> <span aria-hidden="true">·</span> <b>I say <em>transmission.</em></b></p>
        </div>
      </div>

      <div className="hb-sd1-ground">
        <svg className="hb-sd-horizon" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 80 C 360 0, 1080 0, 1440 80 Z" />
        </svg>
        <div ref={groundRef} className={`hb-inner hb-sg2${groundIn ? ' is-in' : ''}`}>
          <div className="hb-sg2-grid">
            <div>
              <p className="hb-sd-concrete">The practice itself is <em>concrete:</em></p>
              <div className="hb-sg2-suns" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((day) => (
                  <svg key={day} viewBox="0 0 40 24" style={{ '--d': day } as CSSProperties}>
                    <path d="M6 22a14 14 0 0 1 28 0" />
                    <path d="M20 2v3M8 7l2 2M32 7l-2 2M2 16h3M35 16h3" />
                    <path d="M2 22h36" />
                  </svg>
                ))}
              </div>
              <p className="hb-sg2-believe">You don’t need to believe anything in particular for that to work. You need to do it five mornings in a row and be honest on the page.</p>
            </div>
            <ol className="hb-sg2-list">
              {steps.map(([icon, text], index) => (
                <li key={text}>
                  <b>{index + 1}</b>
                  <span>{text}</span>
                  {icon}
                </li>
              ))}
            </ol>
          </div>
          <div className="hb-sg2-card">
            <p>I’m also not going to tell you your intuition is always right, or that you should throw out your strategy.</p>
            <p className="hb-sg2-keep">Keep your strategy.</p>
            <p>This is for the voice that uses it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
