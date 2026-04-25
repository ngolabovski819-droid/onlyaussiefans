import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/config/categories';

export const metadata: Metadata = {
  title: 'OnlyFans Categories — Browse Australian Creators | OnlyAussieFans',
  description:
    'Browse all Australian OnlyFans categories — MILF, BBW, teen, latina, ebony, fitness, trans, free and more. Find the perfect Aussie creator for every taste.',
  alternates: { canonical: 'https://onlyaussiefans.com/categories/' },
};

const SITE_URL = 'https://onlyaussiefans.com';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Categories', item: `${SITE_URL}/categories/` },
  ],
};

// ── Section definitions ────────────────────────────────────────────────────
const SECTIONS: { heading: string; emoji: string; slugs: string[] }[] = [
  {
    heading: 'Most Popular',
    emoji: '🔥',
    slugs: ['milf', 'bbw', 'teen', 'latina', 'asian', 'ebony', 'blonde', 'trans', 'lesbian', 'free', 'fitness', 'petite'],
  },
  {
    heading: 'By Appearance',
    emoji: '💅',
    slugs: ['busty', 'curvy', 'athletic', 'natural', 'redhead', 'brunette', 'tattoo'],
  },
  {
    heading: 'By Ethnicity',
    emoji: '🌏',
    slugs: ['asian', 'latina', 'ebony', 'indian'],
  },
  {
    heading: 'By Age',
    emoji: '⏳',
    slugs: ['teen', 'milf', 'mature'],
  },
  {
    heading: 'Gender & Identity',
    emoji: '🏳️‍🌈',
    slugs: ['trans', 'lesbian', 'femboy', 'couples'],
  },
  {
    heading: 'Content Type',
    emoji: '🎬',
    slugs: ['amateur', 'bdsm', 'feet', 'goth', 'cosplay', 'model', 'nurse', 'teacher', 'gfe', 'joi', 'pov', 'asmr', 'squirt'],
  },
  {
    heading: 'Special Deals',
    emoji: '🆓',
    slugs: ['free', 'milf-free'],
  },
];

// Build a lookup map
const catMap = Object.fromEntries(categories.map((c) => [c.slug, c]));

// Colour palette cycling for section accents
const SECTION_COLOURS = [
  { border: 'rgba(236,72,153,0.35)', glow: 'rgba(236,72,153,0.07)', dot: '#ec4899' },
  { border: 'rgba(124,58,237,0.35)', glow: 'rgba(124,58,237,0.07)', dot: '#9d5cf7' },
  { border: 'rgba(34,197,94,0.35)',  glow: 'rgba(34,197,94,0.07)',  dot: '#22c55e' },
  { border: 'rgba(251,146,60,0.35)', glow: 'rgba(251,146,60,0.07)', dot: '#fb923c' },
  { border: 'rgba(56,189,248,0.35)', glow: 'rgba(56,189,248,0.07)', dot: '#38bdf8' },
  { border: 'rgba(167,139,250,0.35)',glow: 'rgba(167,139,250,0.07)',dot: '#a78bfa' },
  { border: 'rgba(34,197,94,0.35)',  glow: 'rgba(34,197,94,0.07)',  dot: '#22c55e' },
];

export default function CategoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.25rem 4rem' }}>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <nav
            aria-label="Breadcrumb"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}
          >
            <Link href="/" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--accent-light)' }}>Categories</span>
          </nav>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f0f0f5, #9d5cf7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.9rem',
          }}>
            Browse All Categories
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 540, margin: '0 auto' }}>
            {categories.length} categories of Australian OnlyFans creators — find exactly what you&apos;re looking for.
          </p>
        </div>

        {/* ── Quick-jump pills ────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          justifyContent: 'center', marginBottom: '3.5rem',
        }}>
          {SECTIONS.map((s) => (
            <a
              key={s.heading}
              href={`#${s.heading.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 99,
                fontSize: '0.8rem',
                fontWeight: 600,
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                transition: 'all 0.15s',
              }}
            >
              {s.emoji} {s.heading}
            </a>
          ))}
        </div>

        {/* ── Sections ────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {SECTIONS.map((section, si) => {
            const colour = SECTION_COLOURS[si % SECTION_COLOURS.length];
            const items = section.slugs.map((s) => catMap[s]).filter(Boolean);
            if (!items.length) return null;
            const sectionId = section.heading.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            return (
              <section key={section.heading} id={sectionId}>
                {/* Section heading */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{section.emoji}</span>
                  <h2 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}>
                    {section.heading}
                  </h2>
                  <div style={{ flex: 1, height: 1, background: colour.border }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {items.length} categories
                  </span>
                </div>

                {/* Category cards grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '0.75rem',
                }}>
                  {items.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius)',
                        background: 'var(--surface)',
                        border: `1px solid ${colour.border}`,
                        boxShadow: `0 0 0 0 ${colour.glow}`,
                        transition: 'all 0.18s',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--text)',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                      className="cat-card"
                    >
                      {/* Accent dot */}
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: colour.dot, flexShrink: 0,
                      }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {cat.emoji ? `${cat.emoji} ` : ''}{cat.label}
                      </span>
                      {cat.priceFilter === 'free' && (
                        <span style={{
                          marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700,
                          padding: '0.1rem 0.4rem', borderRadius: 99,
                          background: 'rgba(34,197,94,0.18)', color: '#22c55e',
                          flexShrink: 0,
                        }}>FREE</span>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* ── All categories A–Z ───────────────────────────────────────── */}
        <section style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>📋</span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>All Categories A–Z</h2>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '0.6rem',
          }}>
            {[...categories]
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.875rem',
                    borderRadius: 'var(--radius)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                    transition: 'all 0.15s',
                    textDecoration: 'none',
                  }}
                  className="cat-card-subtle"
                >
                  <span>{cat.label}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, opacity: 0.45 }}>
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
          </div>
        </section>

      </div>

      {/* Hover styles via a global style tag */}
      <style>{`
        .cat-card:hover {
          background: var(--surface-raised) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 24px var(--accent-glow) !important;
          color: #fff !important;
        }
        .cat-card-subtle:hover {
          background: var(--surface-raised) !important;
          border-color: var(--border) !important;
          color: var(--text) !important;
        }
        @media (min-width: 640px) {
          .cat-card { min-height: 56px; }
        }
      `}</style>
    </>
  );
}
