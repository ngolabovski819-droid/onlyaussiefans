import type { Metadata } from 'next';
import { fetchSponsoredPage } from '@/config/featured';
import SearchFilters from '@/components/SearchFilters';
import CreatorGrid from '@/components/CreatorGrid';
import CreatorSearch from '@/components/CreatorSearch';
import { filterGroups as filterGroupConfig } from '@/config/filters';

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
    filter_groups?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q        = sp.q ?? '';
  const verified = sp.verified === 'true';
  const price    = (sp.price as 'free' | 'under5' | 'under10' | 'any') ?? 'any';
  const sort     = (sp.sort as 'popular' | 'newest') ?? 'popular';
  let selectedFilterGroups: Record<string, string[]> | undefined;
  if (sp.filter_groups) {
    try {
      const parsed = JSON.parse(sp.filter_groups) as Record<string, unknown>;
      selectedFilterGroups = {};
      for (const group of filterGroupConfig) {
        const terms = parsed[group.id];
        if (!Array.isArray(terms)) continue;
        const allowed = new Set(group.options.flatMap((option) => option.terms));
        const valid = terms.filter((term): term is string => typeof term === 'string' && allowed.has(term));
        if (valid.length) selectedFilterGroups[group.id] = valid;
      }
    } catch {
      selectedFilterGroups = undefined;
    }
  }

  const { creators, total, hasMore } = await fetchSponsoredPage(
    'search',
    {
      q: q || undefined,
      verified: verified || undefined,
      price: price !== 'any' ? price : undefined,
      sort,
      filterGroups: selectedFilterGroups,
      revalidate: 30,
    },
    1,
    24,
  );

  return (
    <div className="search-layout">
      <aside className="search-sidebar filters-desktop">
        <SearchFilters />
      </aside>

      <div>
        <div className="search-results-header">
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            {q ? `Results for "${q}"` : 'All Australian Creators'}
          </h1>
          <span className="search-results-context">Australian creators</span>
        </div>

        <CreatorSearch key={q || 'empty-search'} variant="results" initialQuery={q} />

        {/* Mobile filter toggle */}
        <div className="search-mobile-filters">
          <SearchFilters mobile />
        </div>

        <CreatorGrid
          initialCreators={creators}
          initialTotal={total}
          initialHasMore={hasMore}
          pageSize={24}
          q={q || undefined}
          verified={verified || undefined}
          price={price !== 'any' ? price : undefined}
          sort={sort}
          filterGroups={selectedFilterGroups}
          scope="search"
        />
      </div>
    </div>
  );
}
