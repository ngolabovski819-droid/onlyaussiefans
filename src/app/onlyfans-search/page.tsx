import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchCreators } from '@/lib/supabase';
import { states } from '@/config/states';
import { popularCategories } from '@/config/categories';
import CreatorGrid from '@/components/CreatorGrid';
import StatsBar from '@/components/StatsBar';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

export const metadata: Metadata = {
  title: 'Australian OnlyFans Search Engine — Find AU Creators by Category & Location',
  description:
    'The best Australian OnlyFans search engine. Browse 500+ verified AU creators by category, city and state. Free, MILF, Latina, BBW, Blonde and more.',
  alternates: { canonical: `${SITE_URL}/onlyfans-search/` },
  openGraph: {
    title: 'Australian OnlyFans Search Engine',
    description: 'Find verified AU OnlyFans creators by category, city & price.',
    url: `${SITE_URL}/onlyfans-search/`,
  },
};

export default async function OnlyFansSearchPage() {
  const { creators, total, hasMore } = await fetchCreators({ pageSize: 20, sort: 'popular', revalidate: 3600 });

  return (
    <div className="page-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
        Australian OnlyFans Search Engine
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 700, marginBottom: '2rem', lineHeight: 1.7 }}>
        Welcome to OnlyAussieFans — the most comprehensive directory of Australian OnlyFans creators.
        Search by category, city or state and filter by price to find your perfect Aussie creator.
      </p>

      <StatsBar />

      <section style={{ margin: '2.5rem 0' }}>
        <h2 className="section-heading">Browse by State</h2>
        <div className="chips-row chips-row--wrap">
          {states.map(s => (
            <Link key={s.slug} href={`/${s.urlSlug}/`} className="location-chip location-chip--state">
              <strong style={{ color: 'var(--accent-light)', marginRight: 4 }}>{s.abbr}</strong>
              {s.label}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ margin: '2.5rem 0' }}>
        <h2 className="section-heading">Popular Categories</h2>
        <div className="chips-row chips-row--wrap">
          {popularCategories.map(c => (
            <Link key={c.slug} href={`/categories/${c.slug}/`} className="category-chip">
              {c.emoji && <span>{c.emoji}</span>}
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ margin: '2.5rem 0' }}>
        <h2 className="section-heading">All Australian Creators</h2>
        <CreatorGrid
          initialCreators={creators}
          initialTotal={total}
          initialHasMore={hasMore}
          />
      </section>

      {/* SEO text block */}
      <section style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', maxWidth: 800 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-light)' }}>
          About OnlyAussieFans
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
          OnlyAussieFans is Australia&apos;s dedicated OnlyFans search engine, helping fans discover
          Australian content creators quickly and easily. Unlike generic search engines, our platform
          is built specifically for finding Aussie OnlyFans creators — from Sydney, Melbourne,
          Brisbane, Perth and everywhere in between.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          Our database is updated regularly with new Australian creators across dozens of categories.
          Use our advanced filters to find verified creators, free OnlyFans pages, or creators in your
          local city. Whether you&apos;re looking for MILF OnlyFans, BBW creators, fitness models, or
          Australian amateur creators, our search engine has you covered.
        </p>
      </section>
    </div>
  );
}
