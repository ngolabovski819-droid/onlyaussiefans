import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug } from '@/config/categories';
import { states } from '@/config/states';
import { categoryScope, fetchSponsoredPage } from '@/config/featured';
import CreatorGrid from '@/components/CreatorGrid';
import RelatedLocations from '@/components/RelatedLocations';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  const title = cat.metaTitle ?? `${cat.label} Australian OnlyFans Creators — Best Aussie ${cat.label} OnlyFans`;
  const desc  = cat.metaDesc ?? `Find the best ${cat.label} OnlyFans creators from Australia. Browse verified Aussie ${cat.label.toLowerCase()} creators sorted by popularity. Updated daily.`;
  const url   = `${SITE_URL}/categories/${slug}/`;
  return {
    // cat.metaTitle overrides already include the "| OnlyAussieFans" suffix —
    // bypass the layout's title template so it isn't doubled up. The
    // generic (non-override) title has no suffix, so it uses the template.
    title: cat.metaTitle ? { absolute: cat.metaTitle } : title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, images: [{ url: `${SITE_URL}/categories/${slug}/opengraph-image` }] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  const scope = categoryScope(slug);

  const { creators, total, hasMore } = await fetchSponsoredPage(
    scope,
    {
      locationTerms: ['australia'],
      categoryTerms: cat.terms.length > 0 ? cat.terms : undefined,
      price: cat.priceFilter,
      verified: cat.verified,
      sort: cat.sort ?? 'popular',
    },
    1,
    24,
  );

  const genericFaqs = [
    {
      q: `Where can I find ${cat.label} OnlyFans creators from Australia?`,
      a: `OnlyAussieFans lists hundreds of Australian ${cat.label.toLowerCase()} OnlyFans creators. Browse our directory to find verified Aussie creators sorted by popularity.`,
    },
    {
      q: `Are there free ${cat.label} Australian OnlyFans accounts?`,
      a: `Yes — some Australian ${cat.label.toLowerCase()} creators offer free subscriptions. Filter by price on our search page to find free accounts.`,
    },
    {
      q: `How many ${cat.label} OnlyFans creators are in Australia?`,
      a: `Our Australian ${cat.label.toLowerCase()} creator directory is updated regularly as new profiles are discovered.`,
    },
    {
      q: `Which Australian cities have the most ${cat.label} OnlyFans creators?`,
      a: 'Sydney and Melbourne tend to have the most content creators of all categories. Use our state and city filters to narrow your search to specific locations.',
    },
  ];
  const faqs = cat.faqs ?? genericFaqs;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
          <h1>{cat.h1 ?? `${cat.emoji ? `${cat.emoji} ` : ''}Best ${cat.label} Australian OnlyFans Creators`}</h1>
          {!cat.intro && (
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Verified Australian {cat.label.toLowerCase()} creators
            </p>
          )}
          <p className="location-intro">
            {cat.intro ?? `Discover the top Australian ${cat.label} OnlyFans creators in our daily-updated directory. All profiles are verified Aussie creators searched by location and interests. Browse, filter and find your perfect Australian ${cat.label.toLowerCase()} creator below.`}
          </p>
        </div>

        <CreatorGrid
          key={slug}
          initialCreators={creators}
          initialTotal={total}
          initialHasMore={hasMore}
          pageSize={24}
          locationTerms={['australia']}
          categoryTerms={cat.terms.length > 0 ? cat.terms : undefined}
          price={cat.priceFilter}
          verified={cat.verified}
          sort={cat.sort}
          scope={scope}
        />

        {/* Internal linking: state × category (skipped for attribute-style
            pages — the generic "Best {label} in {location}" template reads
            wrong once {label} is already a full phrase like "Best Aussie
            OnlyFans"). */}
        {!cat.h1 && <RelatedLocations mode="category-in-states" categorySlug={slug} categoryLabel={cat.label} />}

        {/* FAQ */}
        <section className="faq-section">
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          <dl className="faq-list">
            {faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">{faq.q}</summary>
                <dd className="faq-answer">{faq.a}</dd>
              </details>
            ))}
          </dl>
        </section>

        {/* State quick links */}
        {!cat.h1 && (
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
        )}
      </div>
    </>
  );
}
