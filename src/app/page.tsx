import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchCreators } from '@/lib/supabase';
import { popularCategories } from '@/config/categories';
import { states } from '@/config/states';
import CreatorGrid from '@/components/CreatorGrid';
import CreatorGridSkeleton from '@/components/CreatorGridSkeleton';
import StatsBar from '@/components/StatsBar';
import CategoryBrowse from '@/components/CategoryBrowse';
import { Suspense } from 'react';

export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

export const metadata: Metadata = {
  title: 'OnlyAussieFans — Find the Best Australian OnlyFans Creators',
  description:
    'Discover top Australian OnlyFans creators sorted by popularity. Search by city, state, category and price. 500+ verified Aussie creators.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'OnlyAussieFans — #1 Australian OnlyFans Search Engine',
    description: 'Find top Aussie OnlyFans creators by location, category & price.',
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-default.svg`, width: 1200, height: 630 }],
  },
};

async function TrendingCreators() {
  const { creators, total, hasMore } = await fetchCreators({ pageSize: 20, sort: 'popular', revalidate: 300 });
  return (
    <CreatorGrid
      initialCreators={creators}
      initialTotal={total}
      initialHasMore={hasMore}
      />
  );
}

const QUICK_TABS = [
  { label: 'All Creators', href: '/search' },
  { label: 'Free OnlyFans', href: '/categories/free' },
  { label: 'Verified Only', href: '/search?verified=true' },
  { label: 'New to OnlyFans', href: '/categories/new' },
];

const REVIEWS = [
  { text: "Found my favourite Aussie creator in under 30 seconds. The filters are actually useful!", author: "User from Sydney" },
  { text: "Finally a search site specifically for Australian creators. Much better than scrolling Reddit!", author: "Perth fan" },
  { text: "The location filter is brilliant. Found Brisbane creators I never knew existed.", author: "Brisbane user" },
];

export default async function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <p className="hero-eyebrow">🇦🇺 Australia&apos;s #1 OnlyFans Directory</p>
        <h1 className="hero-title">
          Find the Best{' '}
          <span className="hero-title-gradient">Australian OnlyFans</span>{' '}
          Creators
        </h1>
        <p className="hero-subtitle">
          Search 500+ verified Aussie creators by location, category and price.
          Updated daily with the latest profiles.
        </p>

        {/* Hero search */}
        <form action="/search" method="GET">
          <div className="hero-search">
            <input
              type="text"
              name="q"
              className="hero-search-input"
              placeholder="Search by name, city or category…"
              aria-label="Search creators"
            />
            <button type="submit" className="hero-search-btn">Search</button>
          </div>
        </form>

        {/* Quick tabs */}
        <div className="hero-quick-tabs">
          {QUICK_TABS.map(t => (
            <Link key={t.href} href={t.href} className="hero-quick-tab">{t.label}</Link>
          ))}
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <StatsBar />

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

      {/* ── Trending Creators ── */}
      <section style={{ padding: '2.5rem 1.5rem', maxWidth: 1400, margin: '0 auto' }}>
        <h2 className="section-heading">🔥 Trending Australian Creators</h2>
        <Suspense fallback={<CreatorGridSkeleton />}>
          <TrendingCreators />
        </Suspense>
      </section>

      {/* ── Category Browse ── */}
      <CategoryBrowse />

      {/* ── Popular Cities ── */}
      <section style={{ padding: '0 1.5rem 3rem', maxWidth: 1400, margin: '0 auto' }}>
        <h2 className="section-heading">Popular Cities</h2>
        <div className="chips-row chips-row--wrap">
          {[
            { label: 'Sydney OnlyFans', href: '/sydney-onlyfans/' },
            { label: 'Melbourne OnlyFans', href: '/melbourne-onlyfans/' },
            { label: 'Brisbane OnlyFans', href: '/brisbane-onlyfans/' },
            { label: 'Perth OnlyFans', href: '/perth-onlyfans/' },
            { label: 'Gold Coast OnlyFans', href: '/gold-coast-onlyfans/' },
            { label: 'Adelaide OnlyFans', href: '/adelaide-onlyfans/' },
            { label: 'Canberra OnlyFans', href: '/canberra-onlyfans/' },
            { label: 'Darwin OnlyFans', href: '/darwin-onlyfans/' },
          ].map(c => (
            <Link key={c.href} href={c.href} className="location-chip">{c.label}</Link>
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
              <p className="review-text">"{r.text}"</p>
              <p className="review-author">— {r.author}</p>
            </div>
          ))}
        </div>
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
