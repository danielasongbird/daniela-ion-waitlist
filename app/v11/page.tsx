import Link from 'next/link';
import type { Metadata } from 'next';


import SoulQuizModal from '../SoulQuizModal';
import SoulQuizTrigger from '../SoulQuizTrigger';
import V11ButtonLab from './V11ButtonLab';
import V11ScrollEffects from './V11ScrollEffects';
import V11SupportingCta from './V11SupportingCta';
import { landingContent as copy } from '../landingContent';
import { portalHref } from '../edge-activation-welcome/content';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
};

const listeningQuestions = [
  'Why does perfectionism keep taking over?',
  'Why can’t I stop overthinking everything?',
  'Why don’t I trust myself anymore?',
  'Why does wanting more feel like too much?',
] as const;

const renaissanceWants = [
  'More influence',
  'More time back',
  'More money',
  'Days that feel like you’re creating things that matter',
] as const;

export default function V11Page() {
  return (
    <main className="concept-page concept-v11">
      <V11ScrollEffects />

      <div className="v11-stage-hero">

      <aside className="v11-fomo" aria-label="Free meditation announcement">
        <p>You would never imagine how much your life could change with just the right <strong>11-minute audio.</strong></p>
        <SoulQuizTrigger>Get instant access here</SoulQuizTrigger>
      </aside>

      <header className="v11-nav">
        <Link className="v11-logo" href="/">Daniela<span>✦</span></Link>
        <p>Mindset · Growth · Expansion</p>
        <div><a href={portalHref}>Soul Portal</a><SoulQuizTrigger>{copy.navCta}</SoulQuizTrigger></div>
      </header>

      <section className="v11-hero" aria-labelledby="v11-title">
        <div className="v11-orbit v11-orbit-one" aria-hidden="true" />
        <div className="v11-orbit v11-orbit-two" aria-hidden="true" />
        <div className="v11-story">
          <p className="v11-eyebrow">{copy.eyebrow}</p>
          <h1 id="v11-title"><span>{copy.title}</span><em>{copy.accent}</em></h1>
          <p className="v11-deck">{copy.deck}</p>
          <V11ButtonLab />
          <small>{copy.note}</small>
        </div>
        <div className="v11-photo" role="img" aria-label="Daniela seated in a relaxed studio portrait">
          <p>{copy.mark}</p>
        </div>
      </section>

      </div>

      <section className="v11-questions" aria-labelledby="v11-questions-title">
        <div className="v11-questions-backdrop" aria-hidden="true" />
        <div className="v11-questions-inner">
          <header className="v11-questions-intro">
            <div>
              <p className="v11-questions-kicker">Before you press play</p>
              <h2 id="v11-questions-title">You already know<span>which one of these <em>is yours.</em></span></h2>
            </div>
          </header>
          <ol className="v11-question-list">
            {listeningQuestions.map((question, index) => (
              <li key={question}>
                <span className="v11-question-number">0{index + 1}</span>
                <div className="v11-waveform" aria-hidden="true">
                  {Array.from({ length: 18 }, (_, barIndex) => (
                    <span key={barIndex} style={{ height: `${10 + ((barIndex * 7 + index * 11) % 34)}px` }} />
                  ))}
                </div>
                <span className="v11-play-icon" aria-hidden="true" />
                <p>{question}</p>
                <span className="v11-question-cta">Trust the download</span>
              </li>
            ))}
          </ol>
          <div className="v11-questions-outro">
            <p>Whichever one made you wince, this activation was made for exactly that moment.</p>
            <V11SupportingCta className="v11-supporting-cta-questions" label="SEND ME MY FREE ACTIVATION" />
          </div>
        </div>
      </section>



      <section className="v11-about" aria-labelledby="v11-about-title">
        <div className="v11-about-inner">
          <figure className="v11-about-portrait">
            <div role="img" aria-label="A close editorial portrait of Daniela" />
            <figcaption>
              <strong>Daniela Ion</strong>
              <span>Founder &middot; Soul Portal</span>
            </figcaption>
          </figure>

          <div className="v11-about-copy">
            <p className="v11-about-kicker">A note from Daniela</p>
            <h2 id="v11-about-title">Hey. <em>I see you.</em></h2>
            <div className="v11-about-prose">
              <p>You&rsquo;ve got real things to say. Somewhere along the way it turned into overthinking every word before you let it out, and wondering what the people who know you in real life would think if they saw the real you. That&rsquo;s performing, and I know how exhausting it is to carry.</p>
              <p>What I know is that the opportunity and the confidence are already in you, and you just haven&rsquo;t been letting yourself lead with them. Stop performing and trust the download when it comes.</p>
              <p>This is my soul speaking to yours.</p>
              <blockquote>You are enough, and you are totally worthy of wanting more.</blockquote>
              <p>Welcome to Soul Portal, where you get to be your truest expression without doubt or fear holding you back.</p>
            </div>
            <p className="v11-about-reminder">Everything is already inside of you. <span>Press play and let it come home.</span></p>
          </div>
        </div>
      </section>

      <section className="v11-renaissance" aria-labelledby="v11-renaissance-title">
        <div className="v11-renaissance-inner">
          <header>
            <p className="v11-questions-kicker">The new currency</p>
            <h2 id="v11-renaissance-title">We&rsquo;re living through <em>a Human Renaissance</em></h2>
          </header>
          <div className="v11-renaissance-prose">
            <p>The old currency of hustle and proving yourself twice as hard is on its way out. The new currency is your lived experience, and everything you&rsquo;ve walked through and learned the hard way is the asset now.</p>
            <p>You already know what you actually want:</p>
            <ul className="v11-renaissance-wants">
              {renaissanceWants.map((want) => (
                <li key={want}><span aria-hidden="true">✦</span>{want}</li>
              ))}
            </ul>
            <p>Soul Portal is the start of an ecosystem for creative women building meaningful businesses through their gifts. When you create from your soul, your book or your music (whatever you&rsquo;re here to make) reaches the people who&rsquo;ve been waiting for your version of it.</p>
            <p>This activation opens you up to what we call serendipity here, the coincidence too precise to be random, like overhearing the one conversation that solves what you&rsquo;ve been stuck on for months.</p>
          </div>
        </div>
      </section>

      <section className="v11-science" aria-labelledby="v11-science-title">
        <div className="v11-science-inner">
          <header>
            <p className="v11-about-kicker">The science</p>
            <h2 id="v11-science-title">Why This Activation <em>Works Differently</em></h2>
          </header>
          <div className="v11-about-prose">
            <p className="v11-science-lead">You&rsquo;ve tried meditations that calm the mind. This one is designed to open your inner knowing.</p>
            <p>At its heart is pink noise, a natural 1/f frequency with the same fractal pattern found in heartbeats and even galaxies. It&rsquo;s used here to soften mental chatter and create a quiet space where your &ldquo;aha&rdquo; moments can surface.</p>
            <p>From your first conscious breath, a gentle guided passage takes you inward, away from the noise of the day, and makes room for what your soul already knows. As your analytical mind softens, your heart and body come into alignment and a quieter voice comes through, the one that sees patterns and feels truth.</p>
            <p>Your heart generates a stronger electromagnetic field than your brain does, and this activation is designed to bring the two into coherence. That&rsquo;s where creative intuition becomes something you feel in your body, the part of you that connects the dots before your logic catches up.</p>
            <p>When you come back you&rsquo;ll feel reset, and for the rest of the day you may notice intuitive hits and small moments of confirmation, like your inner compass coming back online. For women who lead and create, this is a sanctuary you can return to whenever you need reminding that your intuition was always your compass.</p>
          </div>
        </div>
      </section>

      <section className="v11-invitation" aria-labelledby="v11-invitation-title">
        <div className="v11-invitation-rings" aria-hidden="true" />
        <div className="v11-invitation-inner">
          <div className="v11-invitation-copy">
            <p className="v11-invitation-kicker">Eleven minutes. One honest return.</p>
            <h2 id="v11-invitation-title">Come into the sound with <em>one question.</em></h2>

            <SoulQuizTrigger className="v11-audio-card">
              <span className="v11-audio-play" aria-hidden="true" />
              <span>
                <strong>The Creative Intuition Activation</strong>
                <small>11:00 &middot; ready when you are</small>
              </span>
              <span className="v11-audio-arrow" aria-hidden="true">&rarr;</span>
            </SoulQuizTrigger>

            <div className="v11-invitation-facts" aria-label="Audio details">
              <p><strong>11</strong><span>minutes</span></p>
              <p><strong>Free</strong><span>private access</span></p>
            </div>

            <p className="v11-invitation-note">Receive the 11-minute activation and the personal reflection that follows it. Nothing to prepare. Nothing to perform. Just one question worth hearing differently.</p>
          </div>

          <aside className="v11-portal-preview" aria-label="Soul Portal preview">
            <div className="v11-portal-image" aria-hidden="true" />
            <header>
              <span>Soul Portal</span>
              <span>Private access &middot; 100%</span>
            </header>
            <div className="v11-portal-content">
              <p className="v11-portal-kicker">Your private listening room</p>
              <h3>The answer gets quieter before it gets clear.</h3>
              <p>Your 11-minute activation is ready. Create your access, press play, and listen for the part of you that already knows.</p>
              <div className="v11-portal-step">
                <span>Step 1 of 2</span>
                <i />
              </div>
              <V11SupportingCta className="v11-supporting-cta-ipad" label="SEND ME MY FREE ACTIVATION" />
              <small>Private by design &middot; No spam &middot; Unsubscribe anytime</small>
            </div>
          </aside>
        </div>
      </section>


      <section className="v11-final" aria-labelledby="v11-final-title">
        <div className="v11-final-portal">
          <div className="v11-final-ring v11-final-ring-one" aria-hidden="true" />
          <div className="v11-final-ring v11-final-ring-two" aria-hidden="true" />
          <svg className="v11-final-wave" aria-hidden="true" viewBox="0 0 1200 260" preserveAspectRatio="none">
            <path d="M0 132 C95 132 106 54 190 54 C274 54 276 208 362 208 C448 208 445 76 532 76 C619 76 616 184 704 184 C792 184 786 66 874 66 C962 66 962 196 1048 196 C1134 196 1124 132 1200 132" />
            <path d="M0 150 C98 150 105 82 186 82 C267 82 279 188 358 188 C437 188 447 98 526 98 C605 98 618 166 696 166 C774 166 794 92 870 92 C946 92 966 178 1043 178 C1120 178 1136 150 1200 150" />
          </svg>
          <span className="v11-final-dot v11-final-dot-one" aria-hidden="true" />
          <span className="v11-final-dot v11-final-dot-two" aria-hidden="true" />

          <div className="v11-final-content">
            <p>the portal is open</p>
            <h2 id="v11-final-title">Say yes to your truest self. <em>Everything changes from here.</em></h2>
            <V11SupportingCta className="v11-supporting-cta-final" label="SEND ME MY FREE ACTIVATION" />
            <span className="v11-final-line">It&rsquo;s free, and all it asks for is 11 minutes of your day.</span>
          </div>
        </div>
        <p className="v11-final-safety">Listen while still and awake. Use a comfortable volume and pause if the sound causes discomfort.</p>
      </section>

      <section className="v11-bio" aria-labelledby="v11-bio-title">
        <div className="v11-bio-inner">
          <div className="v11-bio-image" role="img" aria-label="Daniela smiling beside a studio microphone" />
          <div className="v11-bio-copy">
            <p className="v11-about-kicker">About Daniela</p>
            <h2 id="v11-bio-title">Daniela Ion</h2>
            <div className="v11-about-prose">
              <p>Daniela Ion has spent her career studying how voice actually moves people, first as a professional recording artist and then as the founder of Her Voice Impacts, where she&rsquo;s interviewed Forbes 30 Under 30 honorees, an MTV Europe Music Award winner, a former EU Commissioner and Deputy Prime Minister, and a bestselling author with millions of copies sold. Through that work she started naming something bigger than any one industry: a human renaissance, where a woman&rsquo;s voice lives in her book, her composition, her film, her fashion line and her thought leadership as much as in how she sings or speaks.</p>
              <p>Soul Portal (Splendour of Unique Love) is built on that belief. It&rsquo;s an ecosystem for women building meaningful businesses through their creativity, where voice in whatever form it takes becomes the ground she builds from, and hers to lead from.</p>
            </div>
            <div className="v11-bio-socials" aria-label="Follow Daniela">
              <a href="https://www.instagram.com/thedaniela.ion" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.linkedin.com/in/danielaion" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="v11-footer">
        <Link className="v11-logo" href="/">Daniela<span>✦</span></Link>
        <p>{copy.footer}</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
      <SoulQuizModal />
    </main>
  );
}
