import SoulQuizTrigger from '../SoulQuizTrigger';

type V11SupportingCtaProps = {
  className?: string;
  label: string;
};

export default function V11SupportingCta({ className = '', label }: V11SupportingCtaProps) {
  return (
    <SoulQuizTrigger className={`v11-supporting-cta ${className}`.trim()}>
      <span className="v11-supporting-cta-copy">
        <strong>{label}</strong>
        <small>GET INSTANT ACCESS</small>
      </span>
      <span className="v11-supporting-cta-arrow" aria-hidden="true">
        <svg viewBox="0 0 78 42">
          <path d="M4 29 C17 9 37 8 50 18 C58 24 57 33 50 34 C42 35 38 27 45 21 C53 14 65 17 73 23" />
          <path d="M66 15 C69 19 71 21 74 23 C70 25 67 28 64 31" />
        </svg>
      </span>
    </SoulQuizTrigger>
  );
}