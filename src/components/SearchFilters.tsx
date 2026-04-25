'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { filterGroups } from '@/config/filters';

interface Props {
  onFiltersChange?: (params: URLSearchParams) => void;
  mobile?: boolean;
}

export default function SearchFilters({ onFiltersChange }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [verified, setVerified] = useState(searchParams.get('verified') === 'true');
  const [price, setPrice] = useState(searchParams.get('price') ?? 'any');
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'popular');
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Count active filters
  const activeCount =
    Object.values(selected).flat().length +
    (verified ? 1 : 0) +
    (price !== 'any' ? 1 : 0);

  const toggleGroup = (id: string) => setOpen((v) => ({ ...v, [id]: !v[id] }));

  const toggleOption = (groupId: string, terms: string[]) => {
    setSelected((prev) => {
      const existing = prev[groupId] ?? [];
      const key = terms.join(',');
      const alreadySelected = existing.join(',').includes(terms[0]);
      if (alreadySelected) {
        const next = existing.filter((t) => !terms.includes(t));
        if (next.length === 0) {
          const { [groupId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [groupId]: next };
      }
      return { ...prev, [groupId]: [...existing, ...terms] };
    });
  };

  const applyFilters = useCallback(() => {
    const current = new URLSearchParams(searchParams.toString());

    // Remove old filter params
    current.delete('filter_groups');
    current.delete('verified');
    current.delete('price');
    current.delete('sort');
    current.delete('page');

    if (Object.keys(selected).length > 0) {
      current.set('filter_groups', JSON.stringify(selected));
    }
    if (verified) current.set('verified', 'true');
    if (price !== 'any') current.set('price', price);
    if (sort !== 'popular') current.set('sort', sort);

    router.push(`/search?${current.toString()}`);
    setMobileOpen(false);
    onFiltersChange?.(current);
  }, [selected, verified, price, sort, router, searchParams, onFiltersChange]);

  const clearAll = () => {
    setSelected({});
    setVerified(false);
    setPrice('any');
    setSort('popular');
  };

  const filterPanelContent = (
    <div className="filters-panel" ref={panelRef}>
      <div className="filters-header">
        <span className="filters-title">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
            <path d="M1 3h14M4 8h8M7 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Filters {activeCount > 0 && <span className="filters-badge">{activeCount}</span>}
        </span>
        {activeCount > 0 && (
          <button className="filters-clear" onClick={clearAll}>Clear all</button>
        )}
      </div>

      {/* Sort */}
      <div className="filter-group">
        <div className="filter-group-header" onClick={() => toggleGroup('_sort')}>
          <span>Sort</span>
          <span>{open['_sort'] ? '▲' : '▼'}</span>
        </div>
        {open['_sort'] && (
          <div className="filter-group-body">
            {['popular', 'newest'].map((s) => (
              <label key={s} className="filter-option">
                <input type="radio" name="sort" checked={sort === s} onChange={() => setSort(s)} />
                <span>{s === 'popular' ? '🔥 Most Popular' : '✨ Newest'}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Verified toggle */}
      <div className="filter-group">
        <label className="filter-verified-row">
          <span>Verified Only</span>
          <button
            className={`filter-toggle ${verified ? 'filter-toggle--on' : ''}`}
            onClick={() => setVerified((v) => !v)}
            role="switch"
            aria-checked={verified}
          >
            <span className="filter-toggle-thumb" />
          </button>
        </label>
      </div>

      {/* Filter groups */}
      {filterGroups
        .filter((g) => g.type !== 'price') // handle pricing separately
        .map((group) => {
          const isOpen = open[group.id] ?? false;
          const selectedInGroup = selected[group.id] ?? [];
          return (
            <div key={group.id} className="filter-group">
              <div
                className="filter-group-header"
                onClick={() => toggleGroup(group.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleGroup(group.id)}
              >
                <span>
                  {group.label}
                  {selectedInGroup.length > 0 && (
                    <span className="filter-group-count"> ({Math.floor(selectedInGroup.length / (group.options[0]?.terms.length || 1))})</span>
                  )}
                </span>
                <span>{isOpen ? '▲' : '▼'}</span>
              </div>
              {isOpen && (
                <div className="filter-group-body">
                  {group.type === 'location'
                    ? group.options.map((opt) => (
                        <a
                          key={opt.label}
                          href={`/${opt.terms[0]?.replace(/\s+/g, '-')}-onlyfans/`}
                          className="filter-option filter-option--link"
                        >
                          {opt.label} →
                        </a>
                      ))
                    : group.options.map((opt) => {
                        const isChecked = opt.terms.every((t) => selectedInGroup.includes(t));
                        return (
                          <label key={opt.label} className="filter-option">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleOption(group.id, opt.terms)}
                            />
                            <span>{opt.label}</span>
                          </label>
                        );
                      })}
                </div>
              )}
            </div>
          );
        })}

      {/* Pricing */}
      <div className="filter-group">
        <div className="filter-group-header" onClick={() => toggleGroup('_price')}>
          <span>Pricing</span>
          <span>{open['_price'] ? '▲' : '▼'}</span>
        </div>
        {open['_price'] && (
          <div className="filter-group-body">
            {[
              { label: 'Any Price', value: 'any' },
              { label: 'Free', value: 'free' },
              { label: 'Under A$5', value: 'under5' },
              { label: 'Under A$10', value: 'under10' },
            ].map((p) => (
              <label key={p.value} className="filter-option">
                <input type="radio" name="price" checked={price === p.value} onChange={() => setPrice(p.value)} />
                <span>{p.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button className="filters-apply-btn" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="filters-mobile-toggle"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 3h14M4 8h8M7 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Filters {activeCount > 0 && <span className="filters-badge">{activeCount}</span>}
      </button>

      {/* Desktop sidebar */}
      <div className="filters-desktop">{filterPanelContent}</div>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="filters-mobile-sheet">
          <div className="filters-mobile-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="filters-mobile-content">
            {filterPanelContent}
          </div>
        </div>
      )}
    </>
  );
}
