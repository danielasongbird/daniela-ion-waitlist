import { Cta, Tag } from './Shared';

const core = ['Five morning audio transmissions, one for each level of your soul', 'Five soul love letter prompts'];
const bonuses = ['The Equanimity Transmission', 'Your Before & After Soul Audit', 'The community inside Soul Portal', 'Live group Q&A + intuitive transmission'];

// Sections 18 and 19 on plum (design rounds 23 and 24):
// the value question leads, then Daniela's letter beside the offer card.
export function Offer() {
  return (
    <section className="hb-band hb-plum hb-of3">
      <div className="hb-inner">
        <Tag number={18} name="Value argument" purpose="Show economic or practical value." />
        <div className="hb-vh2-grid">
          <div>
            <p className="hb-vh2-label">Here’s the more useful way to think about the value.</p>
            <h2 className="hb-vh2-q">What is it worth to finally publish the thing you’ve been sitting on?</h2>
            <p className="hb-vh2-aside">Only you know that number.</p>
          </div>
          <div className="hb-vh2-copy">
            <p>
              But if <span className="hb-vh2-tag">the book chapter</span>, <span className="hb-vh2-tag">the song</span>, <span className="hb-vh2-tag">the offer</span>, or even <span className="hb-vh2-tag">one honest post</span> gets made because of these five mornings, <strong>$27 has done its job several times over.</strong>
            </p>
            <p className="hb-vh2-compare">And if you compare it with the alternatives you’ve probably already tried, such as a coaching session, a course or a weekend away, this is the smallest and easiest to fit into your life by some distance.</p>
          </div>
        </div>

        <div className="hb-of3-stage">
          <div className="hb-of3-letter">
            <p className="hb-of3-letter-lead">Here’s the honest reason it costs $27.</p>
            <p>I would rather you spend five mornings with me for the price of a lunch than try to decide whether to trust me with something bigger. If the five days are useful, you’ll know whether you want more. If they aren’t, you’ve lost very little and you’ll know I’m not the right person for you. I’m fine with either answer.</p>
            <p className="hb-of3-sign">Daniela</p>
          </div>

          <div className="hb-of3-card" id="checkout">
            <Tag number={19} name="Price" purpose="Reveal the offer." />
            <p className="hb-of3-for">You get The Edge Activation today for</p>
            <p className="hb-of3-price">$27</p>
            <ul>
              {core.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="hb-of3-bonus-label">+ bonuses</p>
            <ul className="hb-of3-bonuses">
              {bonuses.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="hb-of3-terms">One payment of $27. No subscription. Immediate access.</p>
            <div className="hb-of-cta-pink"><Cta variant="hero" /></div>
            <p className="hb-of3-time">
              <svg viewBox="0 0 40 24" aria-hidden="true"><path d="M6 22a14 14 0 0 1 28 0" /><path d="M20 2v3M8 7l2 2M32 7l-2 2M2 16h3M35 16h3" /><path d="M2 22h36" /></svg>
              <span>The whole thing takes less than two hours, <em>spread over five mornings.</em></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
