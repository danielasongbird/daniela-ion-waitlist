import Link from 'next/link';

import ConceptSwitcher from '../ConceptSwitcher';
import SoulQuizModal from '../SoulQuizModal';
import SoulQuizTrigger from '../SoulQuizTrigger';
import { landingContent as copy } from '../landingContent';

export default function V4Page() {
  return (
    <main className="concept-page concept-v4">
      <ConceptSwitcher current="V4" />
      <aside className="v4-fomo" aria-label="Free meditation announcement">
        <p><strong>{copy.noticeLead}</strong> {copy.notice}</p>
        <SoulQuizTrigger>Hear yourself</SoulQuizTrigger>
      </aside>

      <header className="v4-nav">
        <Link className="v4-logo" href="/">Daniela<span>✦</span></Link>
        <p>Mindset · Growth · Expansion</p>
        <div><a href="#">Soul Portal</a><SoulQuizTrigger>{copy.navCta}</SoulQuizTrigger></div>
      </header>

      <section className="v4-hero" aria-labelledby="v4-title">
        <div className="v4-orbit v4-orbit-one" aria-hidden="true" />
        <div className="v4-orbit v4-orbit-two" aria-hidden="true" />
        <div className="v4-story">
          <p className="v4-eyebrow">{copy.eyebrow}</p>
          <h1 id="v4-title"><span>{copy.title}</span><em>{copy.accent}</em></h1>
          <p className="v4-deck">{copy.deck}</p>
          <SoulQuizTrigger className="v4-primary">{copy.cta}</SoulQuizTrigger>
          <small>{copy.note}</small>
        </div>
        <div className="v4-photo" role="img" aria-label="Daniela seated in a relaxed studio portrait">
          <p>{copy.mark}</p>
        </div>
      </section>

      <footer className="v4-footer">
        <Link className="v4-logo" href="/">Daniela<span>✦</span></Link>
        <p>{copy.footer}</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
      <SoulQuizModal />
    </main>
  );
}
