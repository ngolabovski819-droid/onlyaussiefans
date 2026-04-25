import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

export const metadata: Metadata = {
  title: 'Privacy Policy — OnlyAussieFans',
  description: 'Privacy policy for OnlyAussieFans. Learn how we collect, use and protect your data.',
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-page-date">Last updated: January 2026</p>

      <h2>Information We Collect</h2>
      <p>
        OnlyAussieFans does not require account creation and does not collect personally identifiable
        information from visitors beyond standard web analytics. We may collect:
      </p>
      <ul>
        <li>Browser type and version via standard HTTP headers</li>
        <li>Anonymised page view data via analytics tools</li>
        <li>Search query terms (anonymised, not linked to individuals)</li>
        <li>Age gate confirmation (stored locally in your browser only)</li>
      </ul>

      <h2>Cookies &amp; Local Storage</h2>
      <p>
        We use browser local storage to remember your age gate confirmation. We may use analytics
        cookies (e.g. Google Analytics) to understand how visitors use our site. These cookies do
        not contain personally identifiable information.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        Our site links to OnlyFans creator profiles. When you click a creator link, you leave our
        site and OnlyFans&apos; privacy policy applies. We use image proxy services (images.weserv.nl)
        to serve optimised images.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain anonymised analytics data for up to 24 months. We do not sell, rent or share
        visitor data with third parties for marketing purposes.
      </p>

      <h2>Your Rights</h2>
      <p>
        Under Australian Privacy Act 1988 principles, you have the right to access information
        held about you and to request corrections. Contact us via our contact page for any
        privacy-related requests.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Continued use of the site after
        changes constitutes acceptance of the updated policy.
      </p>
    </div>
  );
}
