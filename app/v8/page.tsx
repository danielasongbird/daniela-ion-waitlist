import Link from 'next/link';

import ConceptSwitcher from '../ConceptSwitcher';
import SoulQuizModal from '../SoulQuizModal';
import SoulQuizTrigger from '../SoulQuizTrigger';
import { landingContent as copy } from '../landingContent';

export default function V8Page() {
  return (
    <main className="concept-page concept-v8">
      <ConceptSwitcher current="V8" />
      <aside className="v8-fomo" aria-label="Free audio announcement">
        <span>Private release</span><p><strong>{copy.noticeLead}</strong> {copy.notice}</p><SoulQuizTrigger>Enter the edit</SoulQuizTrigger>
      </aside>
      <header className="v8-nav">
        <Link className="v8-logo" href="/">Daniela</Link>
        <p>Mindset / Growth / Expansion</p>
        <div><a href="#">Soul Portal</a><SoulQuizTrigger>{copy.navCta}</SoulQuizTrigger></div>
      </header>
      <section className="v8-hero" aria-labelledby="v8-title">
        <aside className="v8-rail" aria-hidden="true"><span>01</span><p>The Identity Edit</p></aside>
        <div className="v8-story">
          <div className="v8-meta"><span>Audio study No. 01</span><span>07 minutes</span></div>
          <p className="v8-eyebrow">Elegance begins within</p>
          <h1 id="v8-title">{copy.title}</h1>
          <p className="v8-accent">{copy.accent}</p>
          <p className="v8-deck">{copy.deck}</p>
          <div className="v8-action"><SoulQuizTrigger>{copy.cta}</SoulQuizTrigger><small>{copy.note}</small></div>
        </div>
        <div className="v8-portrait" role="img" aria-label="Daniela standing confidently in a black dress">
          <span>Who do you choose to be?</span><small>Daniela / Soul Portal</small>
        </div>
      </section>
      <footer className="v8-footer"><Link className="v8-logo" href="/">Daniela</Link><p>{copy.footer}</p><p>&copy; {new Date().getFullYear()}</p></footer>
      <SoulQuizModal />
    </main>
  );
}
