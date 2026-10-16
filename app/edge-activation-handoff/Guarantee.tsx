import type { ReactNode } from 'react';
import { Tag, Todo } from './Shared';

const steps: ReactNode[] = [
  <><strong>Check out.</strong> One payment of $27.</>,
  <><strong>You’re in straight away.</strong> Day One is already waiting in Soul Portal.</>,
  <><strong>Tonight:</strong> press play on The Equanimity Transmission.</>,
  <><strong>Tomorrow morning:</strong> Day One begins.</>,
];

// Sections 20 and 21: signed certificate with the rotating 14-day badge (design round 25),
// then the next steps as full-width arrow panels, lilac to plum (design round 26).
export function Guarantee() {
  return (
    <>
      <section className="hb-band hb-cream hb-gt2">
        <div className="hb-inner">
          <Tag number={20} name="Guarantee" purpose="Remove risk." />
          <div className="hb-gt2-cert">
            <span className="hb-gt2-corner is-tl" aria-hidden="true" />
            <span className="hb-gt2-corner is-tr" aria-hidden="true" />
            <span className="hb-gt2-corner is-bl" aria-hidden="true" />
            <span className="hb-gt2-corner is-br" aria-hidden="true" />
            <p className="hb-gt2-label">14-day guarantee</p>
            <h2>Do the five days.</h2>
            <p className="hb-gt2-body">If you finish Day Five and it wasn’t worth $27 to you, email <Todo>support address</Todo> within 14 days of buying and I’ll refund you.</p>
            <p className="hb-gt2-close">No forms, no questions, and you won’t lose your place in Soul Portal.</p>
            <p className="hb-gt2-sign">Daniela</p>

            <div className="hb-gt2-seal" aria-hidden="true">
              <svg viewBox="0 0 300 300">
                <defs>
                  <path id="hb-gt2-circle" d="M150 150 m-122 0 a122 122 0 1 1 244 0 a122 122 0 1 1 -244 0" />
                </defs>
                <text><textPath href="#hb-gt2-circle" textLength="760" lengthAdjust="spacing">14-day guarantee ✦ 14-day guarantee ✦ </textPath></text>
              </svg>
              <span><strong>14</strong><small>days</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="hb-ns3">
        <div className="hb-inner">
          <Tag number={21} name="CTA" purpose="Make the buying action obvious. The button sits in the offer card above; this is its next-step strip." />
          <h3>What happens after you click</h3>
        </div>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>
              <div>
                <small>Step {index + 1}</small>
                <p>{step}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
