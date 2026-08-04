import type { Creator } from '@/types/creator';
import { AU_TERMS_LOCATION } from './au-terms';

export interface SearchParams {
  q?: string;
  verified?: boolean;
  price?: 'free' | 'under5' | 'under10' | 'any';
  sort?: 'popular' | 'newest';
  page?: number;
  pageSize?: number;
  /** State/city-specific terms. */
  locationTerms?: string[];
  /** Category terms searched across username, name and about. */
  categoryTerms?: string[];
  /** Each filter group is ANDed; terms within a group are ORed. */
  filterGroups?: Record<string, string[]>;
  /** Explicitly allow global results. Normal directory pages must not set this. */
  skipLocationFilter?: boolean;
  revalidate?: number;
  /** Explicit natural-stream offset used when paid cards occupy grid slots. */
  offset?: number;
  /** Creators removed from the natural stream so paid cards cannot duplicate. */
  excludeUsernames?: string[];
}

export interface SearchResult {
  creators: Creator[];
  /** Exact totals are omitted because counting the multi-million-row table times out. */
  total: null;
  hasMore: boolean;
}

export class CreatorFetchError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'CreatorFetchError';
  }
}

const CARD_COLS = [
  'id', 'username', 'name', 'about', 'location', 'avatar', 'avatar_c144', 'header',
  'isverified', 'subscribeprice', 'photoscount', 'videoscount', 'postscount',
  'subscriberscount', 'favoritedcount', 'first_seen_at',
  'bundle1_price', 'bundle1_duration', 'bundle1_discount',
  'bundle2_price', 'bundle2_duration', 'bundle2_discount',
  'bundle3_price', 'bundle3_duration', 'bundle3_discount',
  'promotion1_price', 'promotion1_discount',
].join(',');

function mapCreator(raw: Record<string, unknown>): Creator {
  return {
    id: raw.id as number,
    username: raw.username as string,
    name: (raw.name as string) ?? null,
    about: (raw.about as string) ?? null,
    location: (raw.location as string) ?? null,
    avatar: (raw.avatar as string) ?? null,
    avatarC144: (raw.avatar_c144 as string) ?? null,
    header: (raw.header as string) ?? null,
    isVerified: Boolean(raw.isverified),
    subscribePrice: raw.subscribeprice != null ? Number(raw.subscribeprice) : null,
    favoritedCount: Number(raw.favoritedcount ?? 0),
    firstSeenAt: (raw.first_seen_at as string) ?? null,
    subscribersCount: raw.subscriberscount != null ? Number(raw.subscriberscount) : null,
    postsCount: raw.postscount != null ? Number(raw.postscount) : null,
    photosCount: raw.photoscount != null ? Number(raw.photoscount) : null,
    videosCount: raw.videoscount != null ? Number(raw.videoscount) : null,
    bundle1Price: raw.bundle1_price != null ? Number(raw.bundle1_price) : null,
    bundle1Duration: raw.bundle1_duration != null ? Number(raw.bundle1_duration) : null,
    bundle1Discount: raw.bundle1_discount != null ? Number(raw.bundle1_discount) : null,
    bundle2Price: raw.bundle2_price != null ? Number(raw.bundle2_price) : null,
    bundle2Duration: raw.bundle2_duration != null ? Number(raw.bundle2_duration) : null,
    bundle2Discount: raw.bundle2_discount != null ? Number(raw.bundle2_discount) : null,
    bundle3Price: raw.bundle3_price != null ? Number(raw.bundle3_price) : null,
    bundle3Duration: raw.bundle3_duration != null ? Number(raw.bundle3_duration) : null,
    bundle3Discount: raw.bundle3_discount != null ? Number(raw.bundle3_discount) : null,
    promotion1Price: raw.promotion1_price != null ? Number(raw.promotion1_price) : null,
    promotion1Discount: raw.promotion1_discount != null ? Number(raw.promotion1_discount) : null,
  };
}

/** Keep PostgREST filter syntax out of user-provided search terms. */
function cleanTerm(term: string): string {
  return term
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}\s'_-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}

/** Whole-word matching prevents `trans` from matching `transmitting`. */
function wordMatch(column: string, term: string): string | null {
  const cleaned = cleanTerm(term);
  // pg_trgm cannot index one- or two-character patterns. Every configured
  // abbreviation has a longer city/state synonym in the same OR group.
  const searchableLength = cleaned.replace(/[\s'_-]/g, '').length;
  return searchableLength >= 3 ? `${column}.imatch.\\m${cleaned}\\M` : null;
}

function orClause(columns: string[], terms: string[]): string | null {
  const expressions = terms.flatMap((term) =>
    columns
      .map((column) => wordMatch(column, term))
      .filter((value): value is string => value !== null)
  );
  return expressions.length > 0 ? `(${expressions.join(',')})` : null;
}

function wholeTermPattern(terms: string[]): RegExp | null {
  const cleanedTerms = terms.map(cleanTerm).filter(Boolean);
  if (cleanedTerms.length === 0) return null;

  const alternatives = cleanedTerms
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  return new RegExp(
    `(^|[^\\p{L}\\p{N}_])(?:${alternatives})(?=$|[^\\p{L}\\p{N}_])`,
    'iu'
  );
}

function matchesWholeText(text: string, terms: string[]): boolean {
  const pattern = wholeTermPattern(terms);
  return pattern ? pattern.test(text) : true;
}

function matchesWholeTerm(creator: Creator, terms: string[]): boolean {
  return matchesWholeText(
    `${creator.username} ${creator.name ?? ''} ${creator.about ?? ''}`,
    terms
  );
}

function isLikelyForeignLocation(location: string | null): boolean {
  if (!location) return false;
  const value = location.normalize('NFKC').toLocaleLowerCase();

  // An explicit Australian marker wins over a secondary travel/location label.
  if (/\b(australia|australian|aussie)\b/u.test(value)) return false;

  const withoutNewSouthWales = value.replace(/new south wales/gu, '');
  return (
    /\b(usa|united states|united kingdom|england|scotland|canada|new zealand|ireland)\b/u.test(withoutNewSouthWales) ||
    /\bnewcastle upon tyne\b/u.test(value) ||
    /\bnew brunswick\b/u.test(value) ||
    /\bpalmerston north\b/u.test(value) ||
    /\bvictoria\s*,?\s*(bc|b\.c\.|british columbia)\b/u.test(value) ||
    /\bmelbourne\s*,?\s*(fl|florida)\b/u.test(value) ||
    /\btorquay\b.*\bdevon\b|\bdevon\b.*\btorquay\b/u.test(value)
  );
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json() as { message?: string; code?: string };
    return [body.code, body.message].filter(Boolean).join(': ').slice(0, 300);
  } catch {
    return `HTTP ${res.status}`;
  }
}

export async function fetchCreators(params: SearchParams): Promise<SearchResult> {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
    throw new CreatorFetchError('Creator database is not configured');
  }

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;
  const offset = params.offset ?? (page - 1) * pageSize;
  const excludedUsernames = (params.excludeUsernames ?? [])
    .map((username) => username.trim().replace(/[^a-zA-Z0-9._-]/g, ''))
    .filter(Boolean);
  const excludedLower = new Set(excludedUsernames.map((username) => username.toLowerCase()));
  const useAustralianCategoryIndex =
    params.locationTerms?.length === 1 &&
    params.locationTerms[0].toLowerCase() === 'australia' &&
    Boolean(params.categoryTerms?.length) &&
    !params.q;
  const useCandidatePool = !useAustralianCategoryIndex;

  const qp = new URLSearchParams();
  qp.set('select', CARD_COLS);
  qp.set('isperformer', 'eq.true');
  if (excludedUsernames.length > 0) {
    qp.set('username', `not.in.(${excludedUsernames.map((username) => `"${username}"`).join(',')})`);
  }

  const andClauses: string[] = [];

  // All directory/search/category pages are Australian unless a caller opts out.
  if (useAustralianCategoryIndex) {
    qp.set('location', 'ilike.*australia*');
  } else {
    const locationTerms = params.locationTerms?.length
      ? params.locationTerms
      : params.skipLocationFilter
        ? undefined
        : AU_TERMS_LOCATION;
    if (locationTerms) {
      const clause = orClause(['location'], locationTerms);
      if (clause) andClauses.push(clause);
    }
  }

  if (!useCandidatePool && params.q?.trim()) {
    const terms = params.q.split(/[|,]/).map((term) => term.trim()).filter(Boolean);
    const clause = orClause(['username', 'name', 'about'], terms);
    if (clause) andClauses.push(clause);
  }

  if (!useCandidatePool && params.categoryTerms?.length) {
    const clause = useAustralianCategoryIndex
      ? `(${params.categoryTerms
          .map(cleanTerm)
          .filter(Boolean)
          .map((term) => `search_text.like.*${term.toLowerCase()}*australia*`)
          .join(',')})`
      : orClause(['username', 'name', 'about'], params.categoryTerms);
    if (clause) andClauses.push(clause);
  }

  if (!useCandidatePool && params.filterGroups) {
    for (const terms of Object.values(params.filterGroups)) {
      if (terms.length > 0) {
        const clause = orClause(['about'], terms);
        if (clause) andClauses.push(clause);
      }
    }
  }

  let rawFilter = '';
  if (andClauses.length === 1) {
    rawFilter = `&or=${andClauses[0]}`;
  } else if (andClauses.length > 1) {
    rawFilter = `&and=(${andClauses.map((clause) => `or${clause}`).join(',')})`;
  }

  if (!useCandidatePool && params.verified) qp.set('isverified', 'eq.true');

  if (!useCandidatePool && params.price === 'free') {
    qp.set('subscribeprice', 'eq.0');
  } else if (!useCandidatePool && params.price === 'under5') {
    qp.set('subscribeprice', 'lte.5');
  } else if (!useCandidatePool && params.price === 'under10') {
    qp.set('subscribeprice', 'lte.10');
  }

  if (!useCandidatePool) {
    if (params.sort === 'newest') {
      qp.set('order', 'first_seen_at.desc.nullslast,favoritedcount.desc,id.desc');
    } else {
      qp.set('order', 'favoritedcount.desc,subscribeprice.asc.nullslast,id.desc');
    }
  }

  // Category pages use the indexed generated search_text column, then discard
  // substring false positives in application code. Overfetching from page one
  // keeps filtered pagination stable (notably for short terms such as `trans`).
  const candidateLimit = useAustralianCategoryIndex
    ? Math.min(999, Math.max(250, (offset + pageSize) * 4))
    : useCandidatePool
      ? 1000
      : pageSize;
  qp.set('limit', String(useCandidatePool ? candidateLimit : candidateLimit + 1));
  qp.set('offset', useAustralianCategoryIndex || useCandidatePool ? '0' : String(offset));

  const finalUrl = `${supabaseUrl}/rest/v1/onlyfans_profiles?${qp.toString()}${rawFilter}`;
  const request = (retry: boolean) => fetch(finalUrl, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Accept-Profile': 'public',
    },
    ...(retry
      ? { cache: 'no-store' as const }
      : { next: { revalidate: params.revalidate ?? 300 } }),
  });

  let res: Response | undefined;
  let networkError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      res = await request(attempt === 1);
      if (res.ok || res.status < 500) break;
    } catch (error) {
      networkError = error;
    }
  }

  if (!res) {
    throw new CreatorFetchError(
      networkError instanceof Error ? networkError.message : 'Creator database request failed'
    );
  }
  if (!res.ok) {
    throw new CreatorFetchError(await readErrorMessage(res), res.status);
  }

  const data: Record<string, unknown>[] = await res.json();
  if (useAustralianCategoryIndex) {
    const matchingCreators = data
      .slice(0, candidateLimit)
      .map(mapCreator)
      .filter((creator) => !excludedLower.has(creator.username.toLowerCase()))
      .filter((creator) => matchesWholeTerm(creator, params.categoryTerms ?? []));
    const creators = matchingCreators.slice(offset, offset + pageSize);
    const hasMore = matchingCreators.length > offset + pageSize;
    return { creators, total: null, hasMore };
  }

  if (useCandidatePool) {
    let candidates = data
      .map(mapCreator)
      .filter((creator) => !excludedLower.has(creator.username.toLowerCase()))
      .filter((creator) => !isLikelyForeignLocation(creator.location));

    if (params.q?.trim()) {
      const queryTerms = params.q
        .split(/[|,]/)
        .map(cleanTerm)
        .filter(Boolean)
        .map((term) => term.toLocaleLowerCase());
      candidates = candidates.filter((creator) => {
        const haystack = `${creator.username} ${creator.name ?? ''} ${creator.about ?? ''}`.toLocaleLowerCase();
        return queryTerms.some((term) => haystack.includes(term));
      });
    }

    if (params.categoryTerms?.length) {
      candidates = candidates.filter((creator) => matchesWholeTerm(creator, params.categoryTerms ?? []));
    }

    if (params.filterGroups) {
      candidates = candidates.filter((creator) =>
        Object.values(params.filterGroups ?? {}).every((terms) =>
          terms.length === 0 || matchesWholeText(creator.about ?? '', terms)
        )
      );
    }

    if (params.verified) candidates = candidates.filter((creator) => creator.isVerified);
    if (params.price === 'free') {
      candidates = candidates.filter((creator) => creator.subscribePrice === 0);
    } else if (params.price === 'under5') {
      candidates = candidates.filter(
        (creator) => creator.subscribePrice !== null && creator.subscribePrice <= 5
      );
    } else if (params.price === 'under10') {
      candidates = candidates.filter(
        (creator) => creator.subscribePrice !== null && creator.subscribePrice <= 10
      );
    }

    if (params.sort === 'newest') {
      candidates.sort((a, b) => {
        const aTime = Date.parse(a.firstSeenAt ?? '');
        const bTime = Date.parse(b.firstSeenAt ?? '');
        if (Number.isNaN(aTime) && Number.isNaN(bTime)) return comparePopularCreators(a, b);
        if (Number.isNaN(aTime)) return 1;
        if (Number.isNaN(bTime)) return -1;
        return bTime === aTime ? comparePopularCreators(a, b) : bTime - aTime;
      });
    } else {
      candidates.sort(comparePopularCreators);
    }

    const creators = candidates.slice(offset, offset + pageSize);
    const hasMore = candidates.length > offset + pageSize;
    return { creators, total: null, hasMore };
  }

  const hasMore = data.length > pageSize;
  const creators = data
    .slice(0, pageSize)
    .map(mapCreator)
    .filter((creator) => !excludedLower.has(creator.username.toLowerCase()));

  return { creators, total: null, hasMore };
}

/** Fetch configured paid creators by case-insensitive username. */
export async function fetchCreatorsByUsernames(
  usernames: string[],
  revalidate = 3600,
): Promise<Creator[]> {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseKey = process.env.SUPABASE_KEY;
  const cleaned = Array.from(new Set(
    usernames
      .map((username) => username.trim().replace(/[^a-zA-Z0-9._-]/g, ''))
      .filter(Boolean),
  )).slice(0, 20);

  if (!supabaseUrl || !supabaseKey || cleaned.length === 0) return [];

  const qp = new URLSearchParams();
  qp.set('select', CARD_COLS);
  qp.set('or', `(${cleaned.map((username) => `username.ilike.${username}`).join(',')})`);
  qp.set('limit', String(cleaned.length));

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/onlyfans_profiles?${qp.toString()}`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Accept-Profile': 'public',
        Prefer: 'count=none',
      },
      next: { revalidate },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return [];
    const rows: Record<string, unknown>[] = await response.json();
    return rows.map(mapCreator);
  } catch {
    return [];
  }
}

function comparePopularCreators(a: Creator, b: Creator): number {
  if (a.favoritedCount !== b.favoritedCount) return b.favoritedCount - a.favoritedCount;

  const aPrice = a.subscribePrice ?? Number.POSITIVE_INFINITY;
  const bPrice = b.subscribePrice ?? Number.POSITIVE_INFINITY;
  if (aPrice !== bPrice) return aPrice - bPrice;

  return b.id - a.id;
}
