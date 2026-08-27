import Link from 'next/link';


import SoulQuizModal from '../SoulQuizModal';
import SoulQuizTrigger from '../SoulQuizTrigger';
import V11ButtonLab from './V11ButtonLab';
import V11ScrollEffects from './V11ScrollEffects';
import V11SupportingCta from './V11SupportingCta';
import { landingContent as copy } from '../landingContent';

const listeningQuestions = [
  'Why do I keep returning to this loop?',
  'What is perfectionism protecting me from?',
  'What feels like the next honest move?',
  'What would I choose without the audience?',
  'Which part of this is actually mine?',
] as const;

export default function V11Page() {
  return (
    <main className="concept-page concept-v11">
      <V11ScrollEffects />

      <div className="v11-stage-hero">

      <aside className="v11-fomo" aria-label="Free meditation announcement">
        <p>You would never imagine how much your life could change with just the right <strong>seven minutes audio.</strong></p>
        <SoulQuizTrigger>Get instant access here</SoulQuizTrigger>
      </aside>

      <header className="v11-nav">
        <Link className="v11-logo" href="/">Daniela<span>✦</span></Link>
        <p>Mindset · Growth · Expansion</p>
        <div><a href="#">Soul Portal</a><SoulQuizTrigger>{copy.navCta}</SoulQuizTrigger></div>
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
              <h2 id="v11-questions-title">The Answer You&apos;re Seeking,<span>Starts With <em>Asking The Right Questions</em></span></h2>
              <p>Bring the decision, pattern, or quiet thought you keep circling. You do not need to solve it before you listen. You only need to let it be heard.</p>
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
              </li>
            ))}
          </ol>
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
            <h2 id="v11-about-title">This is my soul <em>speaking to yours.</em></h2>
            <div className="v11-about-prose">
              <p>I know telling your story has never felt like you, that you&rsquo;ve been holding back something you were made to share because you&rsquo;re terrified of getting it wrong.</p>
              <p>I know what it&rsquo;s like to have so much bubbling up inside of you, but you&rsquo;ve played small in releasing it. Overthinking every word so it doesn&rsquo;t sound cringey. Watching everyone you know in real life and wondering what they&rsquo;d think if they saw the real you.</p>
              <p>I know the ache of wanting deeper alignment, unapologetic confidence in your own voice, and the creative flow you know is yours.</p>
              <blockquote>You are enough, and you are totally worthy.</blockquote>
              <p>Are you ready to stop creating for approval and start creating because it feels like coming home?</p>
              <p>Welcome to Soul Portal. This is where you get to be your truest expression of yourself, without doubt or fear holding you back.</p>
            </div>
            <p className="v11-about-reminder"><span>Remember:</span> Everything is inside of you.</p>
          </div>
        </div>
      </section>

      <section className="v11-invitation" aria-labelledby="v11-invitation-title">
        <div className="v11-invitation-rings" aria-hidden="true" />
        <div className="v11-invitation-inner">
          <div className="v11-invitation-copy">
            <p className="v11-invitation-kicker">Seven minutes. One honest return.</p>
            <h2 id="v11-invitation-title">Come into the sound with <em>one question.</em></h2>

            <SoulQuizTrigger className="v11-audio-card">
              <span className="v11-audio-play" aria-hidden="true" />
              <span>
                <strong>Your Private Reset</strong>
                <small>07:00 &middot; ready when you are</small>
              </span>
              <span className="v11-audio-arrow" aria-hidden="true">&rarr;</span>
            </SoulQuizTrigger>

            <div className="v11-invitation-facts" aria-label="Audio details">
              <p><strong>07</strong><span>minutes</span></p>
              <p><strong>Free</strong><span>private access</span></p>
            </div>

            <p className="v11-invitation-note">Receive the seven-minute audio and the personal reflection that follows it. Nothing to prepare. Nothing to perform. Just one question worth hearing differently.</p>
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
              <p>Your seven-minute audio is ready. Create your access, press play, and listen for the part of you that already knows.</p>
              <div className="v11-portal-step">
                <span>Step 1 of 2</span>
                <i />
              </div>
              <V11SupportingCta className="v11-supporting-cta-ipad" label="UNLOCK MY AUDIO" />
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
            <span>Seven minutes. Free. No performance required.</span>
            <V11SupportingCta className="v11-supporting-cta-final" label="PRESS PLAY" />
          </div>
        </div>
        <p className="v11-final-safety">Listen while still and awake. Use a comfortable volume and pause if the sound causes discomfort.</p>
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
