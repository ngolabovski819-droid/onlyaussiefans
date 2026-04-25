import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

export const metadata: Metadata = {
  title: 'About OnlyAussieFans — Australia\'s #1 OnlyFans Directory',
  description: 'Learn about OnlyAussieFans, Australia\'s dedicated OnlyFans search engine. Discover how we index and organise Australian creators.',
  alternates: { canonical: `${SITE_URL}/about/` },
};

export default function AboutPage() {
  return (
    <div className="legal-page">
      <h1>About OnlyAussieFans</h1>
      <p className="legal-page-date">Australia&apos;s #1 OnlyFans Search Engine</p>

      <h2>What We Do</h2>
      <p>
        OnlyAussieFans is Australia&apos;s dedicated OnlyFans search engine and creator directory.
        We index Australian OnlyFans creators to help fans discover content from local creators
        that matches their interests and budget.
      </p>
      <p>
        Our platform is updated daily with new and existing creator profiles, allowing you to search
        by state, city, category and price. We&apos;re independent and not affiliated with OnlyFans.
      </p>

      <h2>Our Mission</h2>
      <p>
        We believe Australian fans deserve a dedicated, high-quality search tool built specifically
        for discovering local content creators. Our goal is to make it easy to find verified
        Australian OnlyFans creators without having to scroll endlessly through generic directories.
      </p>

      <h2>How We Work</h2>
      <ul>
        <li>We index publicly available creator information from OnlyFans</li>
        <li>Creator profiles are updated regularly to reflect current pricing and status</li>
        <li>All creators listed have Australian location indicators in their profiles</li>
        <li>We do not manage, operate or take fees from any OnlyFans creator</li>
      </ul>

      <h2>Content Policy</h2>
      <p>
        OnlyAussieFans is an adult content directory. All creators listed on our platform are 18+
        and have agreed to OnlyFans&apos; terms of service. We do not host any adult content directly
        on our platform — we link to external OnlyFans profiles only.
      </p>

      <h2>Contact</h2>
      <p>
        For enquiries, corrections, or DMCA requests, please use the relevant page linked in our
        footer. We aim to respond to all legitimate requests within 48 hours.
      </p>
    </div>
  );
}
