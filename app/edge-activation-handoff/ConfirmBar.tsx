const lineOne = 'Your Creative Intuition Activation is on its way to your inbox.';
const lineTwo = 'Before you go and listen, here’s what comes after it.';

// Opt-in confirmation bar: funnel progress steps (picked in design round 1)
export function ConfirmBar() {
  return (
    <aside className="hb-cv1" aria-label="Opt-in confirmation">
      <div className="hb-cv1-inner">
        <ol className="hb-cv1-steps" aria-label="Your progress">
          <li className="is-done"><span aria-hidden="true">✓</span>Free activation <em>sent</em></li>
          <li className="hb-cv1-line" aria-hidden="true" />
          <li className="is-current"><span aria-hidden="true">2</span>What comes next</li>
        </ol>
        <p><strong>{lineOne}</strong> {lineTwo}</p>
      </div>
    </aside>
  );
}
