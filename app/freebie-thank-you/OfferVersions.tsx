import { testimonial } from './content';
import { ProductVisual } from './ProductVisual';
import { checkoutHref } from '../edge-activation-handoff/Shared';

const essentials = [
  { count: '5', label: 'Guided audios' },
  { count: '5', label: 'Soul love letters' },
  { count: '4', label: 'Included bonuses' },
];

function OrderField({ label, placeholder, className = '' }: { label: string; placeholder: string; className?: string }) {
  return (
    <label className={`pv-order-field ${className}`}>
      <span>{label}</span>
      <input type="text" placeholder={placeholder} readOnly autoComplete="off" aria-describedby="pv-checkout-preview" />
    </label>
  );
}

function OneStepOrderForm() {
  const checkoutConfigured = checkoutHref !== '#checkout';

  return (
    <div className="pv-order-card" role="region" aria-labelledby="pv-order-title">
      <header className="pv-order-head">
        <p className="pv-order-kicker">Your five mornings begin here</p>
        <h3 id="pv-order-title">Complete your order</h3>
        <p>One payment. No subscription.</p>
      </header>

      <div className="pv-order-summary">
        <div>
          <p className="pv-order-product-name">The Edge Activation</p>
          <p className="pv-order-product-detail">5-day audio journey + 4 bonuses</p>
        </div>
        <p className="pv-order-price"><strong>$27</strong><span>USD · one time</span></p>
      </div>
      {/* Layout preview only: keep fields read-only and payment disabled until a
          provider-hosted payment element and a verified checkout endpoint exist. */}
      <fieldset className="pv-order-group">
        <legend><span>1</span> Your details</legend>
        <p className="pv-order-hint">Your access link will be sent to this email.</p>
        <div className="pv-order-fields is-contact">
          <OrderField label="Email address" placeholder="you@example.com" />
          <OrderField label="Full name" placeholder="Your name" />
        </div>
      </fieldset>

      <fieldset className="pv-order-group">
        <legend><span>2</span> Payment details</legend>
        <div className="pv-order-fields is-payment">
          <OrderField label="Card number" placeholder="1234  5678  9012  3456" className="is-card" />
          <OrderField label="Expiry date" placeholder="MM / YY" />
          <OrderField label="Security code" placeholder="CVC" />
          <OrderField label="Billing country" placeholder="Select your country" className="is-country" />
        </div>
      </fieldset>

      <div className="pv-order-total"><span>Total today</span><strong>$27 <small>USD</small></strong></div>
      {checkoutConfigured ? (
        <a className="pv-order-submit" href={checkoutHref} aria-describedby="pv-checkout-preview">
          <span>Get The Edge Activation</span>
          <span aria-hidden="true">→</span>
        </a>
      ) : (
        <button className="pv-order-submit" type="button" disabled aria-describedby="pv-checkout-preview">
          <span>Get The Edge Activation</span>
          <span aria-hidden="true">→</span>
        </button>
      )}
      <p className="pv-order-reassurance">Day One is ready immediately after purchase.</p>
      <p className="pv-order-policy"><strong>A little room to feel the difference.</strong> Complete Day Five and, if it wasn’t worth $27 to you, request a refund within 14 days of purchase.</p>
      <a className="pv-order-decline" href="#free-activation">I’ll start with my free activation instead</a>
      <p className="pv-order-preview" id="pv-checkout-preview">{checkoutConfigured ? 'Continue to secure checkout.' : 'Design preview · Payments are not enabled.'}</p>
    </div>
  );
}

export function OfferVersions() {
  return (
    <section id="checkout" className="pv-convert is-editorial pv-order-section" aria-labelledby="pv-offer-title">
      <span className="pv-convert-orbit is-one" aria-hidden="true" />
      <span className="pv-convert-orbit is-two" aria-hidden="true" />
      <div className="pv-inner pv-convert-grid pv-order-grid">
        <article className="pv-convert-copy">
          <p className="pv-convert-eyebrow">A private invitation from Daniela</p>
          <h2 id="pv-offer-title">Five mornings to meet the voice <em>you keep editing out.</em></h2>
          <p className="pv-convert-lede"><strong>The Edge Activation.</strong> A five-day guided audio journey to reconnect with your own voice—and bring more of it into your work.</p>
          <ProductVisual />
          <ul className="pv-offer-inclusions" aria-label="Included in your journey">
            {essentials.map(({ count, label }) => <li key={label}><strong>{count}</strong><span>{label}</span></li>)}
          </ul>
          <p className="pv-offer-rhythm">One audio. One soul love letter. Each morning, for five days.</p>
          <figure className="pv-offer-proof">
            <blockquote>{testimonial.pull}</blockquote>
            <figcaption><strong>{testimonial.name}</strong><span>On working with Daniela</span></figcaption>
          </figure>
        </article>
        <OneStepOrderForm />
      </div>
    </section>
  );
}
