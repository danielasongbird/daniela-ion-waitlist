'use client';

import { useState, type ReactNode } from 'react';
import { Tag, Todo } from './Shared';

const faqs: Array<{ q: string; a: ReactNode }> = [
  { q: 'Is this a subscription or a one-time payment?', a: 'One time. $27 gets you all five days and the bonuses, with no recurring charge.' },
  { q: 'How much time do I need each day?', a: 'About fifteen to twenty minutes: enough to listen to the transmission and write your letter.' },
  { q: 'What if I miss a day?', a: 'You keep your access, so you can move through the five levels at your own pace. It works best slow and felt, not rushed.' },
  { q: 'Do I need experience with meditation or energy work?', a: 'None. All you need is a quiet quarter of an hour and a willingness to be honest on the page.' },
  { q: 'Do I have to share my letters?', a: 'No. They’re yours. Share them in the community only if you want to.' },
  { q: 'I’m not a “content creator”. Is this for me?', a: 'If you make something (posts, a book, songs, a digital product, talks, a body of thought leadership) and you catch yourself softening it before anyone sees it, yes.' },
  { q: 'Is this therapy or coaching?', a: 'No. It’s a creative practice. It doesn’t replace therapy, medical care, or professional advice.' },
  { q: 'Where does everything live?', a: 'Inside Soul Portal, the community you joined when you signed up for your free activation. Your five days, bonuses and live session replays are all there.' },
  { q: 'When is the live Q&A?', a: <Todo>Answer depends on the timing conflict flagged in Section 11.</Todo> },
  { q: 'What happens after the five days?', a: 'You’ll be welcomed into the next part of the portal. That’s all I’ll say for now.' },
  { q: 'When do I get access?', a: 'Immediately after payment.' },
];

// Section 22: sticky heading with floating question marks, smooth numbered accordion (design round 29).
// Sits last on the page, just before the footer.
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="hb-band hb-cream hb-fq1" id="faq">
      <div className="hb-inner hb-fq1-grid">
        <div className="hb-fq1-side">
          <Tag number={22} name="Additional objections / FAQ" purpose="Resolve remaining concerns." />
          <p className="hb-kicker">before you decide</p>
          <h2>Frequently asked <em>questions</em></h2>
          <div className="hb-fq1-marks" aria-hidden="true"><i>?</i><i>?</i><i>?</i></div>
        </div>
        <ol className="hb-fq1-list">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q} className={isOpen ? 'is-open' : ''}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : index)}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <span>{item.q}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="hb-fq1-answer"><div><p>{item.a}</p></div></div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
