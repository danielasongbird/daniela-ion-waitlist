import { Cta, Tag, Todo } from './Shared';

const badge = 'stop performing · start transmitting · ';

// Sections 1 to 3: centred hero with a video thumbnail (picked in design round 3)
export function Hero() {
  return (
    <section className="hb-hv2" aria-labelledby="hb-title">
      <div className="hb-inner">
        <Tag number={1} name="Pre-headline" purpose="Qualify the reader or establish context." />
        <p className="hb-hv2-eyebrow">For creative women who write the post, delete the post, and publish a safer one.</p>

        <Tag number={2} name="Headline" purpose="Problem + mechanism + desired result." />
        <h1 id="hb-title"><span>Stop <b className="hb-hv2-highlight">Rewriting Yourself</b> Until You Sound Like Everyone Else</span></h1>
        <p className="hb-hv2-accent">The Edge Activation: five mornings to find the voice you keep editing out, and to start creating from it.</p>

        <div className="hb-hv2-video">
          <button className="hb-hv2-thumb" type="button" aria-label="Play the one-minute video from Daniela">
            <span className="hb-hv2-play" aria-hidden="true" />
            <span className="hb-hv2-caption"><strong>A note from Daniela</strong> 1:00</span>
          </button>
          <svg className="hb-hv2-badge" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="hb-hv2-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
            </defs>
            <circle cx="100" cy="100" r="96" />
            <text><textPath href="#hb-hv2-circle" textLength="462" lengthAdjust="spacing">{badge}</textPath></text>
            <text className="hb-hv2-star" x="100" y="112" textAnchor="middle">✦</text>
          </svg>
        </div>
        <p className="hb-hv2-video-note"><Todo>Video not recorded yet. The 60-second on-camera script is in the September tripwire running order.</Todo></p>

        <Tag number={3} name="Subheadline" purpose="Add ease, specificity, or objection removal." />
        <p className="hb-hv2-deck">A five-day audio journey for creative women who have plenty to say and keep sanding it down before anyone sees it. Each morning you get one guided audio from me and one private letter prompt. About fifteen to twenty minutes a day. No new strategy to learn, no content calendar, nothing you have to post.</p>
        <Cta variant="hero" align="center" />
      </div>
    </section>
  );
}
