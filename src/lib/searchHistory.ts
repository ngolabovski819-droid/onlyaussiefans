const STORAGE_KEY = 'onlyaussiefans_search_history';
const MAX_ENTRIES = 8;

export function getSearchHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((term): term is string => typeof term === 'string').slice(0, MAX_ENTRIES)
      : [];
  } catch {
    return [];
  }
}

export function addSearchTerm(term: string): string[] {
  const clean = term.trim();
  if (!clean) return getSearchHistory();
  const next = [
    clean,
    ...getSearchHistory().filter((item) => item.toLowerCase() !== clean.toLowerCase()),
  ].slice(0, MAX_ENTRIES);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  return next;
}

export function removeSearchTerm(term: string): string[] {
  const next = getSearchHistory().filter((item) => item.toLowerCase() !== term.toLowerCase());
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  return next;
}

export function clearSearchHistory(): string[] {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  return [];
}

