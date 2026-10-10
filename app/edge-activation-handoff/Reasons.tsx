import { Cta, Tag } from './Shared';
import { DoodleUnderline, TornPaper } from './TornPaper';

const reasons = [
  { title: 'The order matters.', text: 'You can’t express what you aren’t in contact with. Most voice advice starts at Day Two and skips Day One. We start in the body because that’s where you feel the flinch before you edit.' },
  { title: 'The letter has no audience.', text: 'Each morning you write a soul love letter to the part of you that day is about. Nobody reads it unless you choose to share it. With no one watching, there is nothing to perform, and you get to hear what you actually sound like. That’s the voice we’re after.' },
  { title: 'Small and daily beats big and once.', text: 'Fifteen to twenty minutes on five mornings in a row happens inside your real week, next to your real work. A retreat is lovely, and then you go home. By Day Five this is a habit you’ve already started, not a memory of a nice weekend.' },
  { title: 'Receiving comes before producing.', text: 'Day Four is about letting ideas arrive instead of squeezing them out. Most of us only ever practise the squeezing.' },
];

const colours = ['#f48bb3', '#cbb0ed', '#f7d3c3', '#fff6ea'];
const tilts = [-2.2, 1.6, 1.2, -1.8];

// Section 9: torn collage (picked in design round 11)
export function Reasons() {
  return (
    <section className="hb-rv2">
      <div className="hb-inner">
        <Tag number={9} name="Mechanism explanation" purpose="Explain why it works." />
        <div className="hb-rv2-head">
          <p className="hb-kicker">why it works</p>
          <h2>This works for four <span className="hb-rv1-under">fairly ordinary reasons.<DoodleUnderline /></span></h2>
        </div>

        <div className="hb-rv2-board">
          {reasons.map((reason, index) => (
            <TornPaper className="hb-rv2-scrap" color={colours[index]} edges="all" key={reason.title} rotate={tilts[index]} seed={31 + index * 7}>
              <span className="hb-rv2-num">0{index + 1}</span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </TornPaper>
          ))}
        </div>
      </div>

      <TornPaper className="hb-rv2-limit" color="#372044" rotate={1.5} seed={61}>
        <div className="hb-inner">
          <p>One honest limit: this won’t make you fearless. You’ll still feel the pull to soften the line. The difference is that you’ll recognise it as a flinch, not as proof the work is bad.</p>
        </div>
      </TornPaper>

      <div className="hb-inner">
        <Cta align="center" />
      </div>
    </section>
  );
}
