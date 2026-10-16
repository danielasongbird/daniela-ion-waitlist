import Link from 'next/link';
import { checkoutHref, Todo } from '../edge-activation-handoff/Shared';
import { TextGenerate } from '../edge-activation-welcome/Effects';
import {
  confirmation, daysIntro, hero,
  pullQuote, socials, testimonial, video, whyNow,
} from './content';
import { Bonuses } from './Bonuses';
import { DayCarousel } from './DaysCarousel';
import { Home } from './Home';
import { NoteVersions } from './NoteVersions';
import { OfferVersions } from './OfferVersions';
import { BuyPill, delay } from './PortalParts';
import { PortalRuntime } from './PortalRuntime';
import { SketchFilter } from './WhyArt';
import { WhyRows } from './WhyRows';
import { ScrollWords } from './WhyClient';
import { socialLinks } from './Sections';

// V2: the same copy (Tripwire update.pdf) in the client's preferred "portal access" style:
// dark plum over tinted photography, Playfair headings, rose-gold pill buttons, spaced small caps,
// segmented step bars and device-style frames.


export function PortalVersion() {
  return (
    <main className="pv">
      {/* Hero, with the video directly under the button. The banner sits on the hero's photo. */}
      <section className="pv-hero" aria-labelledby="pv-title">
        <div className="pv-hero-bg" aria-hidden="true" />
        {/* Hero photo (hero image round, version 1): Daniela at the mic, her face to the right of the card */}
        <div className="pv-hero-photo-bg" role="img" aria-label="Daniela in a pink suit beside a studio microphone">
          <span className="pv-hero-photo-img" aria-hidden="true" />
        </div>
        <aside className="pv-banner" id="free-activation" aria-label="Opt-in confirmation">
          <div className="pv-banner-inner">
            <div className="pv-banner-steps" aria-hidden="true">
              <p><span>Step 1 of 2</span><span>Complete</span></p>
              <div className="pv-banner-bar"><span className="is-done" /><span className="is-next" /></div>
              <p className="pv-banner-names"><span>✓ Free activation sent</span><span>What comes next</span></p>
            </div>
            <p className="pv-banner-copy"><strong>{confirmation.lead}</strong> {confirmation.body}</p>
          </div>
        </aside>
        {/* Navbar: centred wordmark with rose-gold hairlines (navbar round, version 2) */}
        <header className="pv-nav">
          <span className="pv-nav-line is-left" aria-hidden="true" />
          <Link className="pv-brand" href="/">Daniela<span>✦</span></Link>
          <span className="pv-nav-line is-right" aria-hidden="true" />
          <p>Mindset · Growth · Expansion</p>
        </header>

        {/* Hero (hero round, version 3): centred see-through glass card over a full-bleed photo.
            The video sits inside the card, right after the subheadline (the user moved it there,
            overriding the PDF's "directly under the button" note). */}
        <div className="pv-hero-inner">
          <div className="pv-hero-card pv-rv">
            {/* Alert strip (new copy, not from the PDF; replaces the eyebrow row at the user's request) */}
            <p className="pv-hero-alert" role="note">
              <span className="pv-hero-alert-dot" aria-hidden="true" />
              <strong>{hero.alert.lead}</strong>
              <span>{hero.alert.follow}</span>
            </p>
            <p className="pv-tagline">{hero.tagline}</p>
            <h1 id="pv-title">{hero.headline}</h1>
            <p className="pv-sub">{hero.subheadline}</p>

            <div className="pv-video-block">
              <p className="pv-video-heading">{video.heading}</p>
              {/* Video placeholder (a plain player, no device mockup) until the video is recorded */}
              <div className="pv-video">
                <button className="pv-play" type="button" aria-label="Play the one-minute video from Daniela"><span /></button>
                <div className="pv-video-bar" aria-hidden="true">
                  <span>0:00</span>
                  <span className="pv-video-track"><i /></span>
                  <span>1:00</span>
                </div>
              </div>
              <p className="pv-caption">{video.caption}</p>
            </div>

            <p className="pv-body">{hero.bodyShort}</p>
            <BuyPill />
          </div>
          <p className="pv-todo">
            <Todo>
              {checkoutHref.startsWith('#')
                ? 'Video not recorded yet. The $27 buttons scroll to the offer until checkout is connected.'
                : 'Video not recorded yet.'}
            </Todo>
          </p>
        </div>
      </section>

      {/* Why now (manifesto, light theme). Background: V1's outlined "Edge" watermark and tilted square
          orbits. The first paragraph is a lead whose words light up on scroll; the middle three are stacked
          rows, each with a hand-drawn motion graphic. */}
      <section className="pv-band pv-why">
        <SketchFilter />
        <span className="pv-why-mark" aria-hidden="true">Edge</span>
        <span className="pv-why-orbit is-1" aria-hidden="true" />
        <span className="pv-why-orbit is-2" aria-hidden="true" />
        <div className="pv-inner pv-center">
          {/* The heading block freezes together with the card deck while the cards stack */}
          <WhyRows
            head={(
              <>
                <p className="pv-label pv-rv">why now</p>
                <div className="pv-rv" style={delay(0.08)}>
                  <h2>The Human Renaissance is asking for <em>your Edge</em></h2>
                </div>
                <ScrollWords className="pv-why-statement" text={whyNow[0]} />
              </>
            )}
          />
          <p className="pv-why-closing pv-rv">{whyNow[4]}</p>
        </div>
        <TextGenerate className="pv-why-quote" text={pullQuote} />
      </section>

      {/* Five days: hand-drawn day icons in a full-width carousel (five-days layout round, version 3) */}
      <section className="pv-band pv-days">
        <div className="pv-inner">
          <div className="pv-days-head pv-rv">
            <p className="pv-label">your five days</p>
            <h2>One level of your soul <em>each morning, for five days</em></h2>
            <p className="pv-lede">{daysIntro}</p>
          </div>
          <DayCarousel />
          <div className="pv-center pv-rv"><BuyPill note="One payment. No subscription. Day One is waiting the moment you’re in." /></div>
        </div>
      </section>

      {/* Social proof */}
      <section className="pv-band pv-proof">
        <div className="pv-inner pv-narrow">
          <p className="pv-label pv-rv">{testimonial.eyebrow}</p>
          <p className="pv-proof-pull pv-rv" style={delay(0.08)}>{testimonial.pull}</p>
          <figure className="pv-card pv-rv" style={delay(0.16)}>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption><strong>{testimonial.name}</strong><span>{testimonial.role}</span></figcaption>
          </figure>
        </div>
      </section>

      {/* Bonuses: editorial index, light theme, circular sound waves */}
      <Bonuses />

      {/* Your home: podcast chair photo fading into the spiral plum, branded card over her chest */}
      <Home />

      {/* A note from Daniela (design round in NoteVersions) */}
      <NoteVersions />

      {/* Selected editorial offer with the approved product visual and checkout preview. */}
      <OfferVersions />

      {/* Footer + socials */}
      <footer className="pv-footer">
        <div className="pv-inner pv-narrow pv-center">
          <Link className="pv-brand" href="/">Daniela<span>✦</span></Link>
          <p className="pv-label">{socials.eyebrow}</p>
          <h2>{socials.heading}</h2>
          <p className="pv-lede">{socials.body}</p>
          <ul className="pv-socials">
            {socialLinks.map((link) => (
              <li key={link.network}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  <span className="pv-social-icon" aria-hidden="true">{link.icon}</span>
                  <span><small>{link.network}</small>{link.handle}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="pv-todo"><Todo>Substack link for Soul Transmissions. Add any other platforms Daniela wants listed.</Todo></p>
          <p className="pv-legal">&copy; Daniela Ion · Soul Portal</p>
        </div>
      </footer>
      <PortalRuntime />
    </main>
  );
}




























