import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStateByUrlSlug, states } from '@/config/states';
import { getCityByUrlSlug, cities } from '@/config/cities';
import { getCategoryBySlug, categories, popularCategories } from '@/config/categories';
import { fetchCreators } from '@/lib/supabase';
import CreatorGrid from '@/components/CreatorGrid';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

interface Props {
  params: Promise<{ locationSlug: string; categorySlug: string }>;
}

/** Generate top combinations: all states × popular categories + all cities × popular categories */
export async function generateStaticParams() {
  const params: { locationSlug: string; categorySlug: string }[] = [];
  const popularSlugs = popularCategories.map(c => c.slug);
  for (const s of states) {
    for (const slug of popularSlugs) {
      params.push({ locationSlug: s.urlSlug, categorySlug: slug });
    }
  }
  for (const c of cities) {
    for (const slug of popularSlugs) {
      params.push({ locationSlug: c.urlSlug, categorySlug: slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationSlug, categorySlug } = await params;
  const state = getStateByUrlSlug(locationSlug);
  const city  = !state ? getCityByUrlSlug(locationSlug) : null;
  const loc   = state ?? city;
  const cat   = getCategoryBySlug(categorySlug);
  if (!loc || !cat) return {};
  const title = `Best ${cat.label} OnlyFans in ${loc.label} (2026)`;
  const desc  = `Find the top ${cat.label} OnlyFans creators from ${loc.label}, Australia. Browse verified Aussie ${cat.label.toLowerCase()} creators updated daily.`;
  const url   = `${SITE_URL}/${locationSlug}/${categorySlug}/`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url },
  };
}

export default async function LocationCategoryPage({ params }: Props) {
  const { locationSlug, categorySlug } = await params;
  const state = getStateByUrlSlug(locationSlug);
  const city  = !state ? getCityByUrlSlug(locationSlug) : null;
  const cat   = getCategoryBySlug(categorySlug);

  if ((!state && !city) || !cat) notFound();

  const loc = (state ?? city)!;

  const { creators, total, hasMore } = await fetchCreators({
    locationTerms: loc.terms,
    categoryTerms: cat.terms,
    pageSize: 24,
    sort: 'popular',
    revalidate: 3600,
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: loc.label, item: `${SITE_URL}/${locationSlug}/` },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `${SITE_URL}/${locationSlug}/${categorySlug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="location-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href={`/${locationSlug}/`}>{loc.label}</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{cat.label}</span>
        </nav>

        <div className="location-page-header">
          <h1>
            Best {cat.emoji && `${cat.emoji} `}{cat.label} OnlyFans Creators in {loc.label}
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {total.toLocaleString()} {cat.label.toLowerCase()} creators from {loc.label}
          </p>
          <p className="location-intro">
            Browse the best {cat.label} OnlyFans creators based in {loc.label}, Australia.
            All profiles are filtered specifically for {loc.label}-based creators matching the{' '}
            {cat.label.toLowerCase()} category. Updated daily.
          </p>
        </div>

        <CreatorGrid
          initialCreators={creators}
          initialTotal={total}
          initialHasMore={hasMore}
          locationTerms={loc.terms}
          categoryTerms={cat.terms}
        />

        {/* Related categories in same location */}
        <section style={{ margin: '2.5rem 0 1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Other Categories in {loc.label}
          </h2>
          <div className="chips-row chips-row--wrap">
            {popularCategories
              .filter(c => c.slug !== categorySlug)
              .slice(0, 12)
              .map(c => (
                <Link key={c.slug} href={`/${locationSlug}/${c.slug}/`} className="category-chip">
                  {c.emoji && <span>{c.emoji}</span>}
                  {c.label}
                </Link>
              ))}
          </div>
        </section>

        {/* Same category in other locations */}
        <section style={{ paddingBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            {cat.label} Creators in Other States
          </h2>
          <div className="chips-row chips-row--wrap">
            {states
              .filter(s => s.urlSlug !== locationSlug)
              .map(s => (
                <Link key={s.slug} href={`/${s.urlSlug}/${categorySlug}/`} className="location-chip">
                  {s.abbr} {cat.label}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
