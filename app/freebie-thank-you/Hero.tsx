import Link from 'next/link';
import { checkoutHref, Todo } from '../edge-activation-handoff/Shared';
import { Highlight } from '../edge-activation-welcome/Effects';
import { confirmation, hero, video } from './content';

// Sections 1 to 3: the confirmation banner, then the home page's V11 hero frame as one centred
// column, with the video directly under the button (Tripwire update.pdf).
export function Hero() {
  const [beforeEdge, afterEdge] = hero.headline.split('Edge');

  return (
    <div className="hw-stage ft-stage">
      <aside className="v11-fomo ft-confirm" aria-label="Opt-in confirmation">
        <p>
          <span className="ft-tick" aria-hidden="true">✓</span>
          <strong className="hw-shiny">{confirmation.lead}</strong> {confirmation.body}
        </p>
      </aside>

      <header className="v11-nav">
        <Link className="v11-logo" href="/">Daniela<span>✦</span></Link>
        <p>Mindset · Growth · Expansion</p>
      </header>

      <section className="v11-hero ft-hero" aria-labelledby="ft-hero-title">
        <div className="v11-orbit v11-orbit-one" aria-hidden="true" />
        <div className="v11-orbit v11-orbit-two" aria-hidden="true" />

        <div className="v11-story ft-story">
          <p className="ft-product">{hero.eyebrow}</p>
          <p className="v11-eyebrow">{hero.tagline}</p>
          <h1 id="ft-hero-title"><span>{beforeEdge}<Highlight>Edge</Highlight>{afterEdge}</span></h1>
          <p className="ft-sub">{hero.subheadline}</p>
          <p className="v11-deck">{hero.body}</p>
          <div className="v11-hero-cta-wrap">
            <a className="v11-hero-cta-final hw-shimmer-cta" href={checkoutHref}>
              <span className="v11-hero-cta-copy">
                <strong>YES, I WANT THE EDGE ACTIVATION FOR $27</strong>
                <small>ONE PAYMENT · NO SUBSCRIPTION</small>
              </span>
              <span className="v11-hero-cta-arrow" aria-hidden="true">
                <svg viewBox="0 0 78 42">
                  <path d="M4 29 C17 9 37 8 50 18 C58 24 57 33 50 34 C42 35 38 27 45 21 C53 14 65 17 73 23" />
                  <path d="M66 15 C69 19 71 21 74 23 C70 25 67 28 64 31" />
                </svg>
              </span>
            </a>
          </div>

          <div className="ft-video-block">
            <p className="ft-video-heading">{video.heading}</p>
            <div className="ft-video">
              <button className="ft-video-play" type="button" aria-label="Play the one-minute video from Daniela">
                <span className="ft-video-icon" aria-hidden="true" />
              </button>
              <span className="hw-beam" aria-hidden="true" />
            </div>
            <p className="ft-video-caption">{video.caption}</p>
          </div>

          <p className="hw-hero-todo">
            <Todo>
              {checkoutHref.startsWith('#')
                ? 'Video not recorded yet. The $27 buttons scroll to the offer until checkout is connected (checkoutHref in Shared.tsx).'
                : 'Video not recorded yet.'}
            </Todo>
          </p>
        </div>
      </section>
    </div>
  );
}








