import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, categories } from '@/config/categories';
import { states } from '@/config/states';
import { fetchCreators } from '@/lib/supabase';
import CreatorGrid from '@/components/CreatorGrid';
import RelatedLocations from '@/components/RelatedLocations';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  const title = `${cat.label} Australian OnlyFans Creators — Best Aussie ${cat.label} OnlyFans`;
  const desc  = `Find the best ${cat.label} OnlyFans creators from Australia. Browse verified Aussie ${cat.label.toLowerCase()} creators sorted by popularity. Updated daily.`;
  const url   = `${SITE_URL}/categories/${slug}/`;
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, images: [{ url: `${SITE_URL}/categories/${slug}/opengraph-image` }] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const { creators, total, hasMore } = await fetchCreators({
    categoryTerms: cat.terms.length > 0 ? cat.terms : undefined,
    price: cat.priceFilter,
    skipLocationFilter: true,
    pageSize: 24,
    sort: 'popular',
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Where can I find ${cat.label} OnlyFans creators from Australia?`,
        acceptedAnswer: { '@type': 'Answer', text: `OnlyAussieFans lists hundreds of Australian ${cat.label.toLowerCase()} OnlyFans creators. Browse our directory to find verified Aussie creators sorted by popularity.` },
      },
      {
        '@type': 'Question',
        name: `Are there free ${cat.label} Australian OnlyFans accounts?`,
        acceptedAnswer: { '@type': 'Answer', text: `Yes — some Australian ${cat.label.toLowerCase()} creators offer free subscriptions. Filter by price on our search page to find free accounts.` },
      },
      {
        '@type': 'Question',
        name: `How many ${cat.label} OnlyFans creators are in Australia?`,
        acceptedAnswer: { '@type': 'Answer', text: `Our directory currently lists ${total} Australian ${cat.label.toLowerCase()} OnlyFans creators and is updated regularly.` },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: `${SITE_URL}/categories/` },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `${SITE_URL}/categories/${slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="location-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/search">Categories</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{cat.label}</span>
        </nav>

        <div className="location-page-header">
          <h1>{cat.emoji && `${cat.emoji} `}Best {cat.label} Australian OnlyFans Creators</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            {total.toLocaleString()} verified Australian {cat.label.toLowerCase()} creators found
          </p>
          <p className="location-intro">
            Discover the top Australian {cat.label} OnlyFans creators in our daily-updated directory.
            All profiles are verified Aussie creators searched by location and interests.
            Browse, filter and find your perfect Australian {cat.label.toLowerCase()} creator below.
          </p>
        </div>

        <CreatorGrid
          initialCreators={creators}
          initialTotal={total}
          initialHasMore={hasMore}
          categoryTerms={cat.terms.length > 0 ? cat.terms : undefined}
          price={cat.priceFilter}
          skipLocationFilter
        />

        {/* Internal linking: state × category */}
        <RelatedLocations mode="category-in-states" categorySlug={slug} categoryLabel={cat.label} />

        {/* FAQ */}
        <section className="faq-section">
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          <dl className="faq-list">
            <details className="faq-item">
              <summary className="faq-question">Where can I find {cat.label} OnlyFans creators from Australia?</summary>
              <dd className="faq-answer">
                OnlyAussieFans lists hundreds of Australian {cat.label.toLowerCase()} OnlyFans creators.
                Browse our directory, filter by state or city, and find verified Aussie creators sorted by popularity.
              </dd>
            </details>
            <details className="faq-item">
              <summary className="faq-question">Are there free {cat.label} Australian OnlyFans accounts?</summary>
              <dd className="faq-answer">
                Yes — some Australian {cat.label.toLowerCase()} creators offer free subscriptions or trial promotions.
                Use our price filter on the search page to find free accounts specifically.
              </dd>
            </details>
            <details className="faq-item">
              <summary className="faq-question">How many {cat.label} OnlyFans creators are in Australia?</summary>
              <dd className="faq-answer">
                Our directory currently lists {total} Australian {cat.label.toLowerCase()} OnlyFans creators and is
                updated regularly with new profiles.
              </dd>
            </details>
            <details className="faq-item">
              <summary className="faq-question">Which Australian cities have the most {cat.label} OnlyFans creators?</summary>
              <dd className="faq-answer">
                Sydney and Melbourne tend to have the most content creators of all categories.
                Use our state and city filters to narrow your search to specific locations.
              </dd>
            </details>
          </dl>
        </section>

        {/* State quick links */}
        <section style={{ paddingBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Browse {cat.label} Creators by State
          </h2>
          <div className="chips-row chips-row--wrap">
            {states.map(s => (
              <Link key={s.slug} href={`/${s.urlSlug}/${slug}/`} className="location-chip">
                {s.abbr} {cat.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
