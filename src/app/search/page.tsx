import type { Metadata } from 'next';
import { fetchCreators } from '@/lib/supabase';
import SearchFilters from '@/components/SearchFilters';
import CreatorGrid from '@/components/CreatorGrid';

export const metadata: Metadata = {
  title: 'Search Australian OnlyFans Creators',
  robots: { index: false, follow: true },
};

interface Props {
  searchParams: Promise<{
    q?: string;
    verified?: string;
    price?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q        = sp.q ?? '';
  const verified = sp.verified === 'true';
  const price    = (sp.price as 'free' | 'under5' | 'under10' | 'any') ?? 'any';
  const sort     = (sp.sort as 'popular' | 'newest') ?? 'popular';

  const { creators, total, hasMore } = await fetchCreators({
    q: q || undefined,
    verified: verified || undefined,
    price: price !== 'any' ? price : undefined,
    sort,
    pageSize: 24,
    skipLocationFilter: true,
    revalidate: 30,
  });

  return (
    <div className="search-layout">
      <aside className="search-sidebar filters-desktop">
        <SearchFilters />
      </aside>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            {q ? `Results for "${q}"` : 'All Australian Creators'}
          </h1>
          <span className="results-count">{total.toLocaleString()} creators</span>
        </div>

        {/* Mobile filter toggle */}
        <div className="filters-mobile-toggle" style={{ display: 'none' }}>
          <SearchFilters mobile />
        </div>

        <CreatorGrid
          initialCreators={creators}
          initialTotal={total}
          initialHasMore={hasMore}
          q={q || undefined}
          verified={verified || undefined}
          price={price !== 'any' ? price : undefined}
          sort={sort}
          skipLocationFilter={true}
        />
      </div>
    </div>
  );
}
