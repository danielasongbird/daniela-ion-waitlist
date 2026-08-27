import ConceptSwitcher from './ConceptSwitcher';
import HeroSlideshow from './HeroSlideshow';
import NavigationStudies from './NavigationStudies';
import SoulQuizModal from './SoulQuizModal';
import SoulQuizTrigger from './SoulQuizTrigger';
import { landingContent } from './landingContent';

const design = {
  ...landingContent,
  images: [
    '/images/hero-design-v4-editorial-cutout.webp',
    '/images/hero-design-v4-rose-pose-05.webp',
    '/images/hero-design-v4-pose-02.webp',
    '/images/hero-design-v4-rose-pose-06.webp',
    '/images/hero-design-v4-pose-04.webp',
    '/images/hero-design-v4-rose-pose-07.webp',
  ],
  steps: landingContent.steps.map((label) => ({ label, body: '' })),
  folio: 'Cover study / 01',
};

export default function Home() {
  return (
    <main className="page-shell design-v4">
      <ConceptSwitcher current="V1" />
      <aside className="fomo-bar" aria-label="Free meditation announcement">
        <p><strong>{design.noticeLead}</strong> {design.notice}</p>
        <SoulQuizTrigger className="fomo-quiz-trigger">Hear yourself</SoulQuizTrigger>
      </aside>

      <NavigationStudies cta={design.navCta} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-card">
          <HeroSlideshow images={design.images} />
          <div className="cover-type" aria-hidden="true">
            <span>Hear</span>
            <span>Yourself</span>
          </div>

          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">{design.eyebrow}</p>
              <h1 id="hero-title">
                <span>{design.title}</span>
                <em>{design.accent}</em>
              </h1>
              <p className="subheadline">{design.deck}</p>

              <ol className="design-steps steps-v2" aria-label="What the practice includes">
                {design.steps.map((step, index) => (
                  <li key={step.label}>
                    <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="step-copy">{step.label}</p>
                      {step.body && <p>{step.body}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div id="freebie-form" className="optin-form cta-only">
              <SoulQuizTrigger className="quiz-open-button">{design.cta}</SoulQuizTrigger>
              <p className="form-note">{design.note}</p>
            </div>

            <p className="card-mark" aria-hidden="true">{design.mark}</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a className="wordmark footer-mark" href="#" aria-label="Daniela home">Daniela<span>.</span></a>
        <p>{design.footer}</p>
        <p>&copy; {new Date().getFullYear()} Daniela</p>
      </footer>
      <SoulQuizModal />
    </main>
  );
}
