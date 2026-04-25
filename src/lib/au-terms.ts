/** All terms used to identify Australian creators in the location column */
export const AU_TERMS: string[] = [
  'australia', 'australian', 'aussie',
  'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
  'canberra', 'hobart', 'darwin', 'cairns',
  'gold coast', 'sunshine coast', 'newcastle', 'wollongong', 'geelong',
  'townsville', 'ballarat', 'bendigo', 'launceston', 'mackay',
  'nsw', 'vic', 'qld', 'wa', 'sa', 'act', 'tas', 'nt',
  'new south wales', 'victoria', 'queensland',
  'western australia', 'south australia', 'tasmania', 'northern territory',
];

/** Returns a PostgREST OR expression covering all AU location terms.
 *  Searches `location` column only — kept short to avoid URL length limits.
 *  Individual location pages add `about` column via locationTerms in fetchCreators. */
export function buildAuOrExpression(): string {
  const parts = AU_TERMS.map((t) => `location.ilike.*${t}*`);
  return `(${parts.join(',')})`;
}
