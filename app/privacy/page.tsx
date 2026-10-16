import Link from 'next/link';
import type { Metadata } from 'next';
import './privacy.css';

export const metadata: Metadata = { alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <nav className="privacy-nav">
        <Link href="/waitlist">Soul Portal <em>Splendour of Unique Love</em></Link>
        <Link href="/waitlist">Return to the waitlist</Link>
      </nav>

      <article className="privacy-content">
        <p className="privacy-kicker">Privacy by design</p>
        <h1>Privacy notice</h1>
        <p className="privacy-updated">Draft for client legal approval · Updated August 29, 2026</p>

        <div className="privacy-alert">
          This is an implementation-ready draft, not final legal advice. The client must add the responsible business identity, contact details, approved processors, and jurisdiction-specific wording before public launch.
        </div>

        <section>
          <h2>Information collected</h2>
          <p>When you join the Soul Portal waitlist, we collect the email address you provide, your consent, and basic attribution information such as campaign source when it is present in the page link. The email provider and hosting platform may also process ordinary technical information needed to deliver and secure the service.</p>
        </section>

        <section>
          <h2>How it is used</h2>
          <p>Your information is used to manage the Soul Portal waitlist, send the private first reveal and early-access updates, operate and secure the signup experience, and understand which communications bring visitors to the page.</p>
        </section>

        <section>
          <h2>Consent and your choices</h2>
          <p>Waitlist emails are sent on the basis of your consent. You may unsubscribe using the link included in any Soul Portal email. Unsubscribing stops future marketing messages, subject to any records that must be retained for legal or security reasons.</p>
        </section>

        <section>
          <h2>Sharing and processors</h2>
          <p>Information may be processed by service providers used for website hosting, email delivery, analytics, and security. It is not sold. The final policy will name or categorize the approved providers after the client’s email and analytics services are selected.</p>
        </section>

        <section>
          <h2>Retention and rights</h2>
          <p>Waitlist information should be retained only while it is needed for the purposes above or required by law. Depending on your location, you may have rights to access, correct, delete, restrict, or export your information and to withdraw consent.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>The responsible business name and privacy contact must be inserted here before launch. Until then, this page must remain marked as a draft.</p>
        </section>
      </article>

      <footer className="privacy-footer">
        <p>Soul Portal</p>
        <p>Splendour of Unique Love</p>
      </footer>
    </main>
  );
}
