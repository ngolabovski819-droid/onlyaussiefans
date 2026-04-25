import type { Creator } from '@/types/creator';
import { buildAuOrExpression } from './au-terms';

export interface SearchParams {
  q?: string;
  verified?: boolean;
  price?: 'free' | 'under5' | 'under10' | 'any';
  sort?: 'popular' | 'newest';
  page?: number;
  pageSize?: number;
  /** State/city specific terms — replaces the broad AU filter */
  locationTerms?: string[];
  /** Category terms searched across username, name, about */
  categoryTerms?: string[];
  /** Per-filter-group terms: { groupId: selectedTerms[] }. Each group is ANDed; within a group terms are ORed. */
  filterGroups?: Record<string, string[]>;
  /** Revalidate tag for Next.js fetch caching */
  revalidate?: number;
}

export interface SearchResult {
  creators: Creator[];
  total: number;
  hasMore: boolean;
}

const CARD_COLS = [
  'id', 'username', 'name', 'about', 'location', 'avatar', 'avatar_c144',
  'isverified', 'subscribeprice', 'photoscount', 'videoscount', 'postscount',
  'subscriberscount', 'favoritedcount',
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
    isVerified: Boolean(raw.isverified),
    subscribePrice: raw.subscribeprice != null ? Number(raw.subscribeprice) : null,
    favoritedCount: Number(raw.favoritedcount ?? 0),
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

export async function fetchCreators(params: SearchParams): Promise<SearchResult> {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
    return { creators: [], total: 0, hasMore: false };
  }

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;
  const offset = (page - 1) * pageSize;

  // Use a plain params object — we'll build the final URL manually so PostgREST
  // filter expressions (or/and) are NOT percent-encoded (PostgREST requires raw parens/commas)
  const qp = new URLSearchParams();
  qp.set('select', CARD_COLS);
  qp.set('isperformer', 'eq.true');

  // Build AND clauses — each is a parenthesized OR expression
  const andClauses: string[] = [];

  // 1. Location scope — state/city terms override broad AU filter
  if (params.locationTerms && params.locationTerms.length > 0) {
    const parts = params.locationTerms.flatMap((t) => [
      `location.ilike.*${t}*`,
      `about.ilike.*${t}*`,
    ]);
    andClauses.push(`(${parts.join(',')})`);
  } else {
    andClauses.push(buildAuOrExpression());
  }

  // 2. Text query — across username, name, about only
  if (params.q && params.q.trim()) {
    const terms = params.q.split(/[|,]/).map((t) => t.trim()).filter(Boolean);
    const cols = ['username', 'name', 'about'];
    const exprs = terms.flatMap((t) => cols.map((c) => `${c}.ilike.*${t}*`));
    andClauses.push(`(${exprs.join(',')})`);
  }

  // 3. Category terms — across username, name, about
  if (params.categoryTerms && params.categoryTerms.length > 0) {
    const cols = ['username', 'name', 'about'];
    const exprs = params.categoryTerms.flatMap((t) => cols.map((c) => `${c}.ilike.*${t}*`));
    andClauses.push(`(${exprs.join(',')})`);
  }

  // 4. Filter groups
  if (params.filterGroups) {
    for (const terms of Object.values(params.filterGroups)) {
      if (terms.length > 0) {
        const exprs = terms.map((t) => `about.ilike.*${t}*`);
        andClauses.push(`(${exprs.join(',')})`);
      }
    }
  }

  // Build raw filter string — must NOT be percent-encoded
  let rawFilter = '';
  if (andClauses.length === 1) {
    rawFilter = `&or=${andClauses[0]}`;
  } else if (andClauses.length > 1) {
    const parts = andClauses.map((c) => `or${c}`);
    rawFilter = `&and=(${parts.join(',')})`;
  }

  // Verified filter
  if (params.verified) {
    qp.set('isverified', 'eq.true');
  }

  // Price filter
  if (params.price === 'free') {
    qp.set('subscribeprice', 'eq.0');
  } else if (params.price === 'under5') {
    qp.set('subscribeprice', 'lte.5');
  } else if (params.price === 'under10') {
    qp.set('subscribeprice', 'lte.10');
  }

  // Sort
  if (params.sort === 'newest') {
    qp.set('order', 'first_seen_at.desc.nullslast,favoritedcount.desc');
  } else {
    qp.set('order', 'favoritedcount.desc,subscribeprice.asc.nullslast');
  }

  qp.set('limit', String(pageSize));
  qp.set('offset', String(offset));

  // Final URL: standard params (safely encoded) + raw filter appended manually
  const finalUrl = `${supabaseUrl}/rest/v1/onlyfans_profiles?${qp.toString()}${rawFilter}`;

  let res: Response;
  try {
    res = await fetch(finalUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Accept-Profile': 'public',
        Prefer: 'count=exact',
      },
      next: { revalidate: params.revalidate ?? 300 },
    });
  } catch {
    return { creators: [], total: 0, hasMore: false };
  }

  if (!res.ok) {
    return { creators: [], total: 0, hasMore: false };
  }

  const contentRange = res.headers.get('content-range') ?? '';
  const total = parseInt(contentRange.split('/')[1] ?? '0', 10) || 0;
  const data: Record<string, unknown>[] = await res.json();
  const creators = data.map(mapCreator);

  return { creators, total, hasMore: offset + creators.length < total };
}
