'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import type { Creator } from '@/types/creator';
import CreatorCard from './CreatorCard';

interface Props {
  initialCreators: Creator[];
  initialHasMore: boolean;
  initialTotal: number | null;
  pageSize?: number;
  locationTerms?: string[];
  categoryTerms?: string[];
  filterGroups?: Record<string, string[]>;
  verified?: boolean;
  price?: string;
  sort?: string;
  q?: string;
  /** When true, load-more skips the AU location filter (used for category pages) */
  skipLocationFilter?: boolean;
  /** Stable paid-placement scope shared by SSR and Load More. */
  scope?: string;
}

export default function CreatorGrid({
  initialCreators,
  initialHasMore,
  initialTotal,
  pageSize = 20,
  locationTerms,
  categoryTerms,
  filterGroups,
  verified,
  price,
  sort,
  q,
  skipLocationFilter,
  scope,
}: Props) {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setLoadError(null);
    const nextPage = page + 1;
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (verified) params.set('verified', 'true');
      if (price && price !== 'any') params.set('price', price);
      if (sort) params.set('sort', sort);
      params.set('page', String(nextPage));
      params.set('page_size', String(pageSize));
      if (locationTerms?.length) params.set('location_terms', locationTerms.join(','));
      if (categoryTerms?.length) params.set('category_terms', categoryTerms.join(','));
      if (filterGroups && Object.keys(filterGroups).length) {
        params.set('filter_groups', JSON.stringify(filterGroups));
      }
      // Skip AU location filter when on a category page (matches SSR behaviour)
      if (skipLocationFilter) params.set('skip_location_filter', 'true');
      if (scope) params.set('scope', scope);

      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error('Creators are temporarily unavailable. Please try again.');
      const data = await res.json();
      setCreators((prev) => {
        const existingIds = new Set(prev.map((creator) => creator.id));
        return [...prev, ...data.creators.filter((creator: Creator) => !existingIds.has(creator.id))];
      });
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (e) {
      console.error(e);
      setLoadError(e instanceof Error ? e.message : 'Creators are temporarily unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, pageSize, q, verified, price, sort, locationTerms, categoryTerms, filterGroups, skipLocationFilter, scope]);

  if (creators.length === 0) {
    return (
      <div className="empty-state">
        <p>No Australian creators found matching your filters.</p>
        <Link href="/search" className="empty-state-link">Try a broader search</Link>
      </div>
    );
  }

  return (
    <div>
      <p className="results-count">
        Showing <strong>{creators.length}</strong>{initialTotal !== null && initialTotal > creators.length ? ` of ${initialTotal.toLocaleString()}` : ''} Australian creators
      </p>
      <div className="creator-grid">
        {creators.map((c, i) => (
          <CreatorCard key={c.id} creator={c} index={i} placementScope={scope} />
        ))}
      </div>
      {hasMore && (
        <div className="load-more-wrap">
          {loadError && <p className="load-more-error" role="alert">{loadError}</p>}
          <button
            className="load-more-btn"
            onClick={loadMore}
            disabled={loading}
            aria-label="Load more creators"
          >
            {loading ? 'Loading...' : loadError ? 'Try Again' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
