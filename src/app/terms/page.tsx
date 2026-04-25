import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

export const metadata: Metadata = {
  title: 'Terms of Service — OnlyAussieFans',
  description: 'Terms of service for OnlyAussieFans, Australia\'s OnlyFans search directory.',
  alternates: { canonical: `${SITE_URL}/terms/` },
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      <p className="legal-page-date">Last updated: January 2026</p>

      <h2>Age Requirement</h2>
      <p>
        OnlyAussieFans is an adult content directory. You must be 18 years of age or older to use
        this website. By accessing our site, you confirm you meet this age requirement.
      </p>

      <h2>Use of the Site</h2>
      <p>You agree to use OnlyAussieFans only for lawful purposes and in a manner that does not:</p>
      <ul>
        <li>Violate any applicable Australian or international laws</li>
        <li>Infringe the intellectual property rights of any creator or third party</li>
        <li>Attempt to scrape, crawl or automated-access our platform without permission</li>
        <li>Interfere with the security or integrity of our systems</li>
      </ul>

      <h2>Disclaimers</h2>
      <p>
        OnlyAussieFans is an independent directory service. We are not affiliated with, endorsed by,
        or in partnership with OnlyFans or any creator listed on this platform. Creator information
        is sourced from publicly available data and may not always be current.
      </p>
      <p>
        We make no representations about the accuracy, completeness or reliability of creator
        information. Subscription prices, bundle availability and profile status are subject to
        change at any time by the creator.
      </p>

      <h2>Links to External Sites</h2>
      <p>
        Our site contains links to OnlyFans creator profiles. These are external websites subject
        to their own terms and policies. We are not responsible for the content of external sites.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        Creator images and content remain the property of the respective creators. If you are a
        creator and wish to have your information removed, please use our DMCA/contact page.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by Australian law, OnlyAussieFans is not liable for any
        direct, indirect, incidental or consequential damages arising from your use of this site.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of New South Wales, Australia. Any disputes shall be
        subject to the exclusive jurisdiction of the courts of New South Wales.
      </p>
    </div>
  );
}
