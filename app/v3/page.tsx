import Link from 'next/link';

import ConceptSwitcher from '../ConceptSwitcher';
import SoulQuizModal from '../SoulQuizModal';
import SoulQuizTrigger from '../SoulQuizTrigger';
import { landingContent as copy } from '../landingContent';

export default function V3Page() {
  return (
    <main className="concept-page concept-v3">
      <ConceptSwitcher current="V3" />
      <aside className="v3-fomo" aria-label="Free meditation announcement">
        <p><strong>{copy.noticeLead}</strong> {copy.notice}</p>
        <SoulQuizTrigger>Hear yourself</SoulQuizTrigger>
      </aside>

      <header className="v3-nav">
        <Link className="v3-logo" href="/">DANIELA</Link>
        <p>THE PRIVATE EDIT / No. 01</p>
        <div><a href="#">Soul Portal</a><SoulQuizTrigger>{copy.navCta}</SoulQuizTrigger></div>
      </header>

      <section className="v3-hero" aria-labelledby="v3-title">
        <div className="v3-photo" role="img" aria-label="Daniela in a black dress">
          <span>{copy.mark}</span>
        </div>
        <div className="v3-story">
          <p className="v3-eyebrow">{copy.eyebrow}</p>
          <h1 id="v3-title">{copy.title}</h1>
          <p className="v3-accent">{copy.accent}</p>
          <p className="v3-deck">{copy.deck}</p>
          <SoulQuizTrigger className="v3-primary">{copy.cta}</SoulQuizTrigger>
          <small>{copy.note}</small>
        </div>
      </section>

      <footer className="v3-footer">
        <p>DANIELA</p><p>{copy.footer}</p><p>&copy; {new Date().getFullYear()}</p>
      </footer>
      <SoulQuizModal />
    </main>
  );
}
