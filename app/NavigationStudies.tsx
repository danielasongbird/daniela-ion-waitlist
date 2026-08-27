import SoulQuizTrigger from './SoulQuizTrigger';

type NavigationStudiesProps = {
  cta: string;
};

export default function NavigationStudies({ cta }: NavigationStudiesProps) {
  return (
    <nav className="navigation nav-study nav-study-v2" aria-label="Primary navigation">
      <div className="nav-brand">
        <a className="wordmark" href="#" aria-label="Daniela home">Daniela<span>.</span></a>
        <span className="nav-signature">Mindset / Growth / Expansion</span>
      </div>

      <div className="nav-actions">
        <a className="email-link" href="#">Soul Portal</a>
        <SoulQuizTrigger className="nav-button">{cta}</SoulQuizTrigger>
      </div>
    </nav>
  );
}
