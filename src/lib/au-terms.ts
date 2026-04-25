/**
 * Terms for searching the `location` column — short abbreviations are fine
 * here since location fields are terse and rarely produce false positives.
 */
export const AU_TERMS_LOCATION: string[] = [
  'australia', 'australian', 'aussie',
  'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
  'canberra', 'hobart', 'darwin', 'cairns',
  'gold coast', 'sunshine coast', 'newcastle', 'wollongong', 'geelong',
  'townsville', 'ballarat', 'bendigo', 'launceston', 'mackay',
  'nsw', 'vic', 'qld', 'wa', 'sa', 'act', 'tas', 'nt',
  'new south wales', 'victoria', 'queensland',
  'western australia', 'south australia', 'tasmania', 'northern territory',
];

/**
 * Terms safe to search inside free-text bio (`about`) — short abbreviations
 * and ambiguous words omitted to avoid false positives:
 *   - dropped: wa, sa, nt, act, vic (match partial words / common elsewhere)
 *   - dropped: nsw, qld, tas (3-letter codes — too risky in bio text)
 *   - dropped: victoria (very common given name)
 *   - dropped: newcastle (city exists in UK too)
 */
export const AU_TERMS_BIO: string[] = [
  'australia', 'australian', 'aussie',
  'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
  'canberra', 'hobart', 'darwin', 'cairns',
  'gold coast', 'sunshine coast', 'wollongong', 'geelong',
  'townsville', 'ballarat', 'bendigo', 'launceston', 'mackay',
  'new south wales', 'queensland',
  'western australia', 'south australia', 'tasmania', 'northern territory',
];

/**
 * Returns a PostgREST OR expression covering all AU location terms.
 * Searches `location` column only — `about` wildcard scans across 100k rows
 * are too slow and cause Supabase 500 timeouts.
 */
export function buildAuOrExpression(): string {
  const parts = AU_TERMS_LOCATION.map((t) => `location.ilike.*${t}*`);
  return `(${parts.join(',')})`;
}

/** @deprecated kept for reference — use AU_TERMS_LOCATION / AU_TERMS_BIO directly */
export const AU_TERMS = AU_TERMS_LOCATION;
