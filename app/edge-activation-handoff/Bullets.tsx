import { Cta, Tag, Todo } from './Shared';

// Each bullet split into [before, key phrase, after] so the key phrase can be highlighted.
const bullets: Array<[string, string, string]> = [
  ['Why ', 'Day One has nothing to do with content', ', and why skipping it is the reason most voice work doesn’t last.'],
  ['The difference between ', 'the voice you use and the voice you manage', ', and how to tell which one wrote your last post.'],
  ['Why the letters ask for ', 'the darker parts', ' on purpose, and what happens to your work when you stop leaving them out.'],
  ['How to tell ', 'a flinch from a real no', ': the moment right before you delete a line, and what that moment is usually protecting.'],
  ['Why forcing ideas tends to produce your most average work, and ', 'the Day Four practice', ' for letting the next idea come to you instead.'],
  ['The Day Five shift from ', '“Am I allowed to say this?” to “Is this mine to say?”', ''],
  ['What to do with ', 'your five letters afterwards', ', so the writing you did for yourself becomes raw material for what you make next.'],
];

// Section 12: highlighted grid (picked in design round 14)
export function Bullets() {
  return (
    <section className="hb-band hb-peach hb-bv3">
      <div className="hb-inner">
        <Tag number={12} name="Curiosity bullets" purpose="Sell the knowledge and outcomes inside the product." />
        <div className="hb-bv3-head">
          <p className="hb-kicker">inside the five days</p>
          <h2>Inside <em>the five days</em></h2>
        </div>
        <ol className="hb-bv3-grid">
          {bullets.map(([before, key, after], index) => (
            <li key={key}>
              <span>0{index + 1}</span>
              <p>{before}<strong>{key}</strong>{after}</p>
            </li>
          ))}
        </ol>
        <p className="hb-after-cards"><Todo>Check each bullet against the recorded audios. Keep only what the five days actually cover, and replace anything too general with the real moment from that day.</Todo></p>
        <Cta align="center" />
      </div>
    </section>
  );
}
