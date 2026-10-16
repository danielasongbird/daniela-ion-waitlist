import { Tag, Todo } from './Shared';

// Section 17: round portrait inside a rotating podcast-name ring, left-aligned reading column (picked in design round 22).
export function Podcast() {
  return (
    <section className="hb-band hb-pc3">
      <div className="hb-inner">
        <Tag number={17} name="More proof" purpose="Use different proof from the previous section." />
        <div className="hb-pc3-badge">
          <svg className="hb-pc3-ring" viewBox="0 0 300 300" aria-hidden="true">
            <defs>
              <path id="hb-pc3-circle" d="M150 150 m-128 0 a128 128 0 1 1 256 0 a128 128 0 1 1 -256 0" />
            </defs>
            <text>
              <textPath href="#hb-pc3-circle" textLength="796" lengthAdjust="spacing">Her Voice Impacts ✦ Her Voice Impacts ✦ Her Voice Impacts ✦</textPath>
            </text>
          </svg>
          <span className="hb-pc3-photo" role="img" aria-label="Daniela in an armchair beside a studio microphone" />
        </div>

        <div className="hb-pc3-copy">
          <p className="hb-kicker">from the podcast</p>
          <p className="hb-pc3-lead">
            On Her Voice Impacts I’ve spent hours with women whose work reaches millions of people, including <mark>a Forbes 30 Under 30 honoree</mark>, <mark>an MTV Europe Music Award winner</mark> and <mark>a bestselling author</mark>.
          </p>
          <p className="hb-pc3-a">The pattern I kept noticing wasn’t better tactics.</p>
          <p className="hb-pc3-b">It was that they had stopped apologising for the specific way they see things.</p>
          <svg className="hb-pc3-line" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 20 H200 L210 8 L220 32 L230 4 L240 36 L250 12 L260 28 L270 20 H330 L340 10 L350 30 L360 14 L370 26 L380 20 H600" />
          </svg>
          <div className="hb-pc3-todos">
            <p><Todo>Confirm this observation is Daniela’s own and that she’s comfortable referencing her guests this way. If not, cut the paragraph.</Todo></p>
            <p><Todo>Proof needed: a Before &amp; After Soul Audit excerpt from a real participant, shared with permission. One question, her Day One answer, her Day Five answer.</Todo></p>
          </div>
        </div>
      </div>
    </section>
  );
}
