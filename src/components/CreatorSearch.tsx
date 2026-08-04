'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchHistoryDropdown from './SearchHistoryDropdown';
import {
  addSearchTerm,
  clearSearchHistory,
  getSearchHistory,
  removeSearchTerm,
} from '@/lib/searchHistory';

interface Props {
  variant?: 'hero' | 'results';
  initialQuery?: string;
}

export default function CreatorSearch({ variant = 'hero', initialQuery = '' }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<string[]>(getSearchHistory);

  const runSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setQuery(clean);
    setHistory(addSearchTerm(clean));
    setFocused(false);
    router.push(`/search?q=${encodeURIComponent(clean)}`);
  };

  return (
    <div className={`creator-search creator-search--${variant}`}>
      <form
        className={variant === 'hero' ? 'hero-search' : 'results-search'}
        onSubmit={(event) => {
          event.preventDefault();
          runSearch(query);
        }}
      >
        <input
          type="search"
          value={query}
          className={variant === 'hero' ? 'hero-search-input' : 'results-search-input'}
          placeholder="Search by name, city or category…"
          aria-label="Search creators"
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <button type="submit" className={variant === 'hero' ? 'hero-search-btn' : 'results-search-btn'}>
          Search
        </button>
      </form>

      {focused && query.trim().length === 0 && (
        <SearchHistoryDropdown
          history={history}
          onSelect={runSearch}
          onRemove={(term) => setHistory(removeSearchTerm(term))}
          onClear={() => setHistory(clearSearchHistory())}
        />
      )}
    </div>
  );
}
