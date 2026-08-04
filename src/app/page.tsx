import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchSponsoredPage } from '@/config/featured';
import { popularCategories } from '@/config/categories';
import { states } from '@/config/states';
import { cities } from '@/config/cities';
import CreatorGrid from '@/components/CreatorGrid';
import CreatorGridSkeleton from '@/components/CreatorGridSkeleton';
import CategoryBrowse from '@/components/CategoryBrowse';
import CreatorSearch from '@/components/CreatorSearch';
import { Suspense } from 'react';

export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

export const metadata: Metadata = {
  title: 'OnlyAussieFans — Find the Best Australian OnlyFans Creators',
  description:
    'Discover top Australian OnlyFans creators sorted by popularity. Search by city, state, category and price. 20,000+ verified Aussie OnlyFans creators, updated daily.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'OnlyAussieFans — #1 Australian OnlyFans Search Engine',
    description: 'Find top Aussie OnlyFans creators by location, category & price. 20,000+ verified profiles.',
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

// Safe AU location terms — no ambiguous abbreviations that match US/intl locations.
// 'australia' covers ~726 creators (dominant). Other city/state names add specificity.
// Deliberately excluded: 'victoria' (matches Victoria BC, Canada),
//   'newcastle' (matches Newcastle Upon Tyne, UK).
const AU_TERMS = [
  'australia', 'australian', 'aussie',
  'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'canberra', 'darwin', 'hobart',
  'gold coast', 'sunshine coast', 'wollongong', 'geelong', 'cairns', 'townsville',
  'new south wales', 'queensland', 'western australia', 'south australia', 'northern territory', 'tasmania',
];

async function TrendingCreators() {
  const { creators, total, hasMore } = await fetchSponsoredPage(
    'home',
    { sort: 'popular', revalidate: 300, locationTerms: AU_TERMS },
    1,
    20,
  );
  return (
    <CreatorGrid
      initialCreators={creators}
      initialTotal={total}
      initialHasMore={hasMore}
      locationTerms={AU_TERMS}
      scope="home"
      />
  );
}

// Anchor text mined from competitor keyword research (Aug 2026) — mapped to
// dedicated pages (not query-param views) so each earns its own indexable
// URL and long-tail search intent.
const POPULAR_SEARCHES = [
  { label: 'Free Australian OnlyFans', href: '/categories/free/' },
  { label: 'Verified Aussie OnlyFans', href: '/categories/verified-aussie-onlyfans/' },
  { label: 'Best Aussie OnlyFans', href: '/categories/best-aussie-onlyfans/' },
  { label: 'New Australian OnlyFans Creators', href: '/categories/new-australian-onlyfans-creators/' },
  { label: 'Australian OnlyFans Models', href: '/categories/model/' },
  { label: 'Australian OnlyFans MILFs', href: '/categories/milf/' },
  { label: 'Cairns OnlyFans', href: '/cairns-onlyfans/' },
  { label: 'Queensland OnlyFans', href: '/queensland-onlyfans/' },
  { label: 'Aussie OnlyFans Fitness Models', href: '/categories/fitness/' },
  { label: 'Under $10 Aussie OnlyFans', href: '/categories/under-10-aussie-onlyfans/' },
];

const FAQS = [
  {
    q: 'How many Australian OnlyFans creators are on OnlyAussieFans?',
    a: 'We index over 20,000 Australian OnlyFans creators, and around 20,000 of those are verified profiles. New creators are added and existing profiles refreshed daily.',
  },
  {
    q: 'Is OnlyAussieFans free to use?',
    a: 'Yes — browsing, searching and filtering is completely free. You only pay if and when you subscribe to a creator directly on OnlyFans.',
  },
  {
    q: 'How do I find OnlyFans creators from a specific Australian city or state?',
    a: 'Use the location search bar, or browse by state or city using the links on this page. Every Australian state and major city has its own dedicated directory page.',
  },
  {
    q: 'Can I find free Australian OnlyFans accounts?',
    a: "Yes. Select the 'Free' category or filter results by price to see Aussie creators with $0 subscriptions.",
  },
  {
    q: 'Are the creators listed here verified?',
    a: "Most are — toggle the Verified filter on any search or browse page to show only creators who have completed OnlyFans' identity verification.",
  },
];

const REVIEWS = [
  { text: "Found my favourite Aussie creator in under 30 seconds. The filters are actually useful!", author: "User from Sydney" },
  { text: "Finally a search site specifically for Australian creators. Much better than scrolling Reddit!", author: "Perth fan" },
  { text: "The location filter is brilliant. Found Brisbane creators I never knew existed.", author: "Brisbane user" },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default async function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="hero">
        <p className="hero-eyebrow">🇦🇺 Australia&apos;s #1 OnlyFans Directory</p>
        <h1 className="hero-title">
          Find the Best{' '}
          <span className="hero-title-gradient">Australian OnlyFans</span>{' '}
          Creators
        </h1>
        <p className="hero-subtitle">
          Search 20,000+ verified Aussie OnlyFans creators by location, category and price.
          Updated daily with the latest profiles.
        </p>

        {/* Hero search */}
        <CreatorSearch />
      </section>

      {/* ── Trending Creators ── */}
      <section style={{ padding: '1rem 1.5rem 0', maxWidth: 1400, margin: '0 auto' }}>
        <h2 className="section-heading">🔥 Trending Australian OnlyFans Creators</h2>
        <Suspense fallback={<CreatorGridSkeleton />}>
          <TrendingCreators />
        </Suspense>
      </section>

      {/* ── Browse by State ── */}
      <section style={{ padding: '2.5rem 1.5rem 0', maxWidth: 1400, margin: '0 auto' }}>
        <h2 className="section-heading">Browse by Australian State</h2>
        <div className="chips-row chips-row--wrap">
          {states.map(s => (
            <Link key={s.slug} href={`/${s.urlSlug}/`} className="location-chip location-chip--state">
              {s.abbr} — {s.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Category Browse ── */}
      <CategoryBrowse />

      {/* ── Popular Cities ── */}
      <section style={{ padding: '0 1.5rem 3rem', maxWidth: 1400, margin: '0 auto' }}>
        <h2 className="section-heading">Popular Australian OnlyFans Cities</h2>
        <div className="chips-row chips-row--wrap">
          {cities.map(c => (
            <Link key={c.urlSlug} href={`/${c.urlSlug}/`} className="location-chip">
              {c.label} OnlyFans
            </Link>
          ))}
        </div>
      </section>

      {/* ── Popular Searches (long-tail SEO internal links) ── */}
      <section style={{ padding: '0 1.5rem 3rem', maxWidth: 1400, margin: '0 auto' }}>
        <h2 className="section-heading">Popular Australian OnlyFans Searches</h2>
        <div className="chips-row chips-row--wrap">
          {POPULAR_SEARCHES.map(s => (
            <Link key={s.href} href={s.href} className="location-chip">{s.label}</Link>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="how-it-works">
        <h2 className="how-it-works-title">How OnlyAussieFans Works</h2>
        <p className="how-it-works-sub">Finding your favourite Aussie creator is quick and easy.</p>
        <div className="how-it-works-steps">
          <div className="how-step">
            <div className="how-step-num">01</div>
            <h3>Search or Browse</h3>
            <p>Use our search bar or browse by state, city or category to find creators.</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">02</div>
            <h3>Filter Results</h3>
            <p>Narrow down by price, verified status, content type and more with our advanced filters.</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">03</div>
            <h3>Visit Their Page</h3>
            <p>Click any creator card to visit their official OnlyFans profile and subscribe.</p>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="social-proof">
        <h2 className="social-proof-title">Loved by Australian Fans</h2>
        <p className="social-proof-rating">⭐⭐⭐⭐⭐  4.9 out of 5 from fan reviews</p>
        <div className="review-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">&ldquo;{r.text}&rdquo;</p>
              <p className="review-author">— {r.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" style={{ maxWidth: 1400, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h2 className="faq-heading">Frequently Asked Questions about Australian OnlyFans</h2>
        <dl className="faq-list">
          {FAQS.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question">{faq.q}</summary>
              <dd className="faq-answer">{faq.a}</dd>
            </details>
          ))}
        </dl>
      </section>

      {/* ── Popular Categories quick links ── */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-heading">Popular Categories</h2>
        <div className="chips-row chips-row--wrap" style={{ justifyContent: 'center' }}>
          {popularCategories.slice(0, 16).map(c => (
            <Link key={c.slug} href={`/categories/${c.slug}/`} className="category-chip">
              {c.emoji && <span>{c.emoji}</span>}
              {c.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
