import { Tag } from './Shared';

// Section 13: full-bleed editorial split (picked in design round 16)
export function Future() {
  return (
    <section className="hb-fp3">
      <div className="hb-fp3-photo" role="img" aria-label="Daniela Ion in a pink suit" />
      <div className="hb-fp3-text">
        <Tag number={13} name="Future pace" purpose="Show what implementation looks like." />
        <p className="hb-kicker">a few weeks from now</p>
        <h2>Picture an ordinary Tuesday <em>a few weeks from now.</em></h2>
        <ol className="hb-fv1-beats">
          <li><span>1</span><p>You sit down to write the caption, the chapter, or the verse. The first line arrives, and you feel the familiar pull to soften it.</p></li>
          <li className="is-turn"><span>2</span><p>This time you notice the pull and you know what it is. <strong>You leave the line in.</strong></p></li>
          <li><span>3</span><p>Maybe the piece does well and maybe it doesn’t. Either way it sounds like you, and you can stand behind it without refreshing the comments to find out whether you should.</p></li>
        </ol>
        <p className="hb-fv1-strategy">Nothing about your strategy has to change. You still use hooks and you still plan. You’ve just stopped asking the room for permission before you start.</p>
      </div>
    </section>
  );
}
