import { Tag } from './Shared';

const tips = ['A better hook.', 'A tighter format.', 'A clearer niche.', 'Posting more consistently.', 'Another course on storytelling.'];

// Section 6: advice ribbon (design round 7), closing with concede-then-turn (design round 8)
export function OldBelief() {
  const row = tips.map((tip) => (
    <span key={tip}>{tip}<i aria-hidden="true">✦</i></span>
  ));

  return (
    <section className="hb-ov2">
      <div className="hb-inner hb-ov2-head">
        <Tag number={6} name="Old belief" purpose="Explain what they have been taught." />
        <p className="hb-kicker">what you’ve been told</p>
        <h2>Strategy can tell you how to say something. <em>It can’t tell you what’s yours to say.</em></h2>
        <p className="hb-ov2-told">You’ve probably been told the fix is craft.</p>
      </div>

      <div className="hb-ov2-ribbon">
        <div className="hb-ov2-row" aria-hidden="true">{row}{row}{row}{row}</div>
        <ul className="hb-ov2-list">{tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
      </div>

      <div className="hb-inner hb-ob3">
        <p className="hb-ob3-para">
          That advice made sense when the hard part was knowing how. Most of us learned the mechanics because we had to, and they helped. I’m not going to tell you strategy is the problem.{' '}
          <span className="hb-ob3-circled">It isn’t.
            <svg viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true"><path d="M92 8 C 60 -2, 12 6, 6 24 C 0 44, 70 50, 106 38 C 122 30, 118 12, 84 6" /></svg>
          </span>
        </p>
        <div className="hb-ob3-but" aria-hidden="true">
          <span>but…</span>
          <svg viewBox="0 0 70 30"><path d="M3 18 C 20 6, 40 26, 62 14 M52 7 L63 14 L54 23" /></svg>
        </div>
        <p className="hb-ob3-edit">More technique, applied to a voice you’ve already edited down, gives you a more polished version of the edit.</p>
      </div>
    </section>
  );
}
