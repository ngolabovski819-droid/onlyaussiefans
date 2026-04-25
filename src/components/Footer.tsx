import Link from 'next/link';
import { states } from '@/config/states';
import { popularCategories } from '@/config/categories';

export default function Footer() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">OnlyAussieFans</Link>
            <p className="footer-tagline">
              Australia&apos;s largest OnlyFans creator directory. Find free and premium Aussie creators updated daily.
            </p>
            <p className="footer-disclaimer">
              OnlyAussieFans.com is not affiliated with or endorsed by OnlyFans or Fenix International Limited.
              All profiles linked are publicly listed. This site is for adults 18+ only.
            </p>
          </div>

          {/* States */}
          <div className="footer-col">
            <h3 className="footer-heading">Browse by State</h3>
            <ul className="footer-list">
              {states.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.urlSlug}/`} className="footer-link">
                    {s.label} ({s.abbr})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h3 className="footer-heading">Top Categories</h3>
            <ul className="footer-list">
              {popularCategories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}/`} className="footer-link">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories/" className="footer-link">All Categories →</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h3 className="footer-heading">Information</h3>
            <ul className="footer-list">
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
              <li><Link href="/search" className="footer-link">Search Creators</Link></li>
              <li><Link href="/onlyfans-search" className="footer-link">OnlyFans Search</Link></li>
            </ul>
            <h3 className="footer-heading" style={{ marginTop: '1rem' }}>Legal</h3>
            <ul className="footer-list">
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms of Use</Link></li>
              <li><Link href="/dmca" className="footer-link">DMCA / Takedowns</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} OnlyAussieFans. All rights reserved.</p>
          <p className="footer-compliance">
            This website contains adult content and is intended for persons aged 18 and over.
            By using this site you confirm you are 18+.{' '}
            <Link href="/privacy" className="footer-link">Privacy Policy</Link> |{' '}
            <Link href="/terms" className="footer-link">Terms of Use</Link>
          </p>
          <p className="footer-hreflang">
            <link rel="alternate" hrefLang="en-AU" href={siteUrl} />
          </p>
        </div>
      </div>
    </footer>
  );
}
