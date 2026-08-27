import Link from 'next/link';

import ConceptSwitcher from '../ConceptSwitcher';
import SoulQuizModal from '../SoulQuizModal';
import SoulQuizTrigger from '../SoulQuizTrigger';
import { landingContent as copy } from '../landingContent';

export default function V10Page() {
  return (
    <main className="concept-page concept-v10">
      <ConceptSwitcher current="V10" />
      <aside className="v10-fomo" aria-label="Free audio announcement"><strong>Something inside you already knows.</strong><p>{copy.noticeLead} {copy.notice}</p><SoulQuizTrigger>Claim the audio</SoulQuizTrigger></aside>
      <header className="v10-nav"><Link className="v10-logo" href="/">DANIELA<span>+</span></Link><p>For women becoming impossible to ignore</p><div><a href="#">Soul Portal</a><SoulQuizTrigger>{copy.navCta}</SoulQuizTrigger></div></header>
      <section className="v10-hero" aria-labelledby="v10-title">
        <div className="v10-story">
          <p className="v10-eyebrow">Your next-level energy starts here</p>
          <h1 id="v10-title">{copy.title}</h1>
          <p className="v10-accent">{copy.accent}</p>
          <p className="v10-deck">{copy.deck}</p>
          <SoulQuizTrigger className="v10-primary">Yes, unlock it for me <span aria-hidden="true">&rarr;</span></SoulQuizTrigger>
          <small>{copy.note}</small>
        </div>
        <div className="v10-portrait" role="img" aria-label="Daniela in a bold pink suit"><span>THE<br />SIGNAL<br />IS YOU.</span><small>07:00 private audio</small></div>
        <div className="v10-pulse"><span>07</span><p>Minutes.<br />One shift.<br />Your move.</p><em>{copy.mark}</em></div>
      </section>
      <footer className="v10-footer"><Link className="v10-logo" href="/">DANIELA<span>+</span></Link><p>{copy.footer}</p><p>&copy; {new Date().getFullYear()} / Soul Portal</p></footer>
      <SoulQuizModal />
    </main>
  );
}
