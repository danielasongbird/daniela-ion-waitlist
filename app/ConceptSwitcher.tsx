import Link from 'next/link';

const concepts = [
  { href: '/', label: 'V1' },
  { href: '/v3', label: 'V3' },
  { href: '/v4', label: 'V4' },
  { href: '/v6', label: 'V6' },
  { href: '/v8', label: 'V8' },
  { href: '/v9', label: 'V9' },
  { href: '/v10', label: 'V10' },
  { href: '/v11', label: 'V11' },
] as const;

export default function ConceptSwitcher({ current }: { current: string }) {
  return (
    <nav className="concept-switcher" aria-label="Landing page concepts">
      <span>Concepts</span>
      {concepts.map((concept) => (
        <Link aria-current={current === concept.label ? 'page' : undefined} href={concept.href} key={concept.href}>
          {concept.label}
        </Link>
      ))}
    </nav>
  );
}
