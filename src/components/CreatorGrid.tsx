'use client';

import { useState, useCallback } from 'react';
import type { Creator } from '@/types/creator';
import CreatorCard from './CreatorCard';

interface Props {
  initialCreators: Creator[];
  initialHasMore: boolean;
  initialTotal: number;
  locationTerms?: string[];
  categoryTerms?: string[];
  filterGroups?: Record<string, string[]>;
  verified?: boolean;
  price?: string;
  sort?: string;
  q?: string;
}

const PAGE_SIZE = 20;

export default function CreatorGrid({
  initialCreators,
  initialHasMore,
  initialTotal,
  locationTerms,
  categoryTerms,
  filterGroups,
  verified,
  price,
  sort,
  q,
}: Props) {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (verified) params.set('verified', 'true');
      if (price && price !== 'any') params.set('price', price);
      if (sort) params.set('sort', sort);
      params.set('page', String(nextPage));
      params.set('page_size', String(PAGE_SIZE));
      if (locationTerms?.length) params.set('location_terms', locationTerms.join(','));
      if (categoryTerms?.length) params.set('category_terms', categoryTerms.join(','));
      if (filterGroups && Object.keys(filterGroups).length) {
        params.set('filter_groups', JSON.stringify(filterGroups));
      }

      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setCreators((prev) => [...prev, ...data.creators]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, q, verified, price, sort, locationTerms, categoryTerms, filterGroups]);

  if (creators.length === 0) {
    return (
      <div className="empty-state">
        <p>No Australian creators found matching your filters.</p>
        <a href="/search" className="empty-state-link">Try a broader search</a>
      </div>
    );
  }

  return (
    <div>
      <p className="results-count">
        Showing <strong>{creators.length}</strong>{initialTotal > creators.length ? ` of ${initialTotal.toLocaleString()}` : ''} Australian creators
      </p>
      <div className="creator-grid">
        {creators.map((c, i) => (
          <CreatorCard key={c.id} creator={c} index={i} />
        ))}
      </div>
      {hasMore && (
        <div className="load-more-wrap">
          <button
            className="load-more-btn"
            onClick={loadMore}
            disabled={loading}
            aria-label="Load more creators"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
