import SoulQuizTrigger from '../SoulQuizTrigger';

export default function V11ButtonLab() {
  return (
    <div className="v11-hero-cta-wrap">
      <SoulQuizTrigger className="v11-hero-cta-final">
        <span className="v11-hero-cta-copy">
          <strong>SEND ME MY FREE ACTIVATION</strong>
          <small>GET INSTANT ACCESS</small>
        </span>
        <span className="v11-hero-cta-arrow" aria-hidden="true">
          <svg viewBox="0 0 78 42">
            <path d="M4 29 C17 9 37 8 50 18 C58 24 57 33 50 34 C42 35 38 27 45 21 C53 14 65 17 73 23" />
            <path d="M66 15 C69 19 71 21 74 23 C70 25 67 28 64 31" />
          </svg>
        </span>
      </SoulQuizTrigger>
    </div>
  );
}