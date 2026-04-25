import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

export const metadata: Metadata = {
  title: 'DMCA & Content Removal — OnlyAussieFans',
  description: 'Submit a DMCA takedown notice or request content removal from OnlyAussieFans.',
  alternates: { canonical: `${SITE_URL}/dmca/` },
};

export default function DMCAPage() {
  return (
    <div className="legal-page">
      <h1>DMCA &amp; Content Removal</h1>
      <p className="legal-page-date">We respect intellectual property rights and respond to valid DMCA notices.</p>

      <h2>For Creators — Remove Your Profile</h2>
      <p>
        If you are an OnlyFans creator and wish to have your profile removed from our directory,
        please contact us with the following information:
      </p>
      <ul>
        <li>Your OnlyFans username</li>
        <li>Confirmation that you are the account holder</li>
        <li>Your preferred contact email for confirmation</li>
      </ul>
      <p>
        We will remove your listing within 48 hours of a verified request. Removals are permanent —
        your profile will not be re-added to our index.
      </p>

      <h2>DMCA Takedown Notice</h2>
      <p>
        If you believe content on our site infringes your copyright, please submit a DMCA notice
        containing all of the following:
      </p>
      <ul>
        <li>Identification of the copyrighted work you claim has been infringed</li>
        <li>Identification of the infringing material and its URL on our site</li>
        <li>Your contact information (name, address, email, phone)</li>
        <li>A statement that you have a good faith belief the use is not authorised</li>
        <li>A statement that the information is accurate and, under penalty of perjury, that you are authorised to act on behalf of the rights holder</li>
        <li>Your physical or electronic signature</li>
      </ul>

      <h2>How to Submit</h2>
      <p>
        Note: OnlyAussieFans is a search directory that links to OnlyFans. We do not host creator
        content directly. For images returned from the OnlyFans platform, the correct venue for
        DMCA notices is OnlyFans directly. We only display publicly available profile metadata.
      </p>
      <p>
        We process all valid requests promptly and strive to respond within 48 business hours.
      </p>

      <h2>Counter-Notices</h2>
      <p>
        If you believe content was removed due to a mistake or misidentification, you may submit a
        counter-notice in accordance with the DMCA process. We will forward counter-notices to the
        original complainant.
      </p>
    </div>
  );
}
