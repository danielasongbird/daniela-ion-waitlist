import { BonusIndex } from './BonusClient';
import { BonusWaves } from './BonusWaves';

// V2 bonuses: the editorial index (bonuses round, version 2) in a light theme over hand-drawn circular
// sound waves (background round, version 2). Styles in bonus.css.
export function Bonuses() {
  return (
    <section className="pv-band pv-bonus">
      <BonusWaves />
      <div className="pv-inner">
        <div className="pv-center pv-rv">
          <p className="pv-label">your bonuses</p>
          <h2>Also waiting for you <em>inside Soul Portal</em></h2>
        </div>
        <BonusIndex />
      </div>
    </section>
  );
}
