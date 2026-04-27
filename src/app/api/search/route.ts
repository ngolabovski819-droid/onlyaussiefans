import { NextRequest, NextResponse } from 'next/server';
import { fetchCreators } from '@/lib/supabase';
import type { SearchParams } from '@/lib/supabase';

export const runtime = 'nodejs'; // edge doesn't support all Node.js APIs used by Supabase fetch cache

// Simple in-memory rate limiter: 10 requests per 10 seconds per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function GET(req: NextRequest) {
  // Rate limiting
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '10' } }
    );
  }

  const { searchParams } = req.nextUrl;

  const q = searchParams.get('q') ?? undefined;
  const verified = searchParams.get('verified') === 'true';
  const priceRaw = searchParams.get('price') ?? undefined;
  const price = ['free', 'under5', 'under10', 'any'].includes(priceRaw ?? '')
    ? (priceRaw as SearchParams['price'])
    : undefined;
  const sort = searchParams.get('sort') === 'newest' ? 'newest' : 'popular';
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const pageSize = Math.min(40, Math.max(1, parseInt(searchParams.get('page_size') ?? '20', 10)));

  const locationTermsRaw = searchParams.get('location_terms');
  const locationTerms = locationTermsRaw
    ? locationTermsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : undefined;

  const categoryTermsRaw = searchParams.get('category_terms');
  const categoryTerms = categoryTermsRaw
    ? categoryTermsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : undefined;

  // Skip the AU location filter when:
  //   (a) caller explicitly sets skip_location_filter=true, OR
  //   (b) category terms are present with no location terms (category pages search globally)
  const skipLocationFilter =
    searchParams.get('skip_location_filter') === 'true' ||
    (!!categoryTerms?.length && !locationTerms?.length);

  // Filter groups: filter_groups={"appearance":["slim","curvy"],"ethnicity":["asian"]}
  let filterGroups: Record<string, string[]> | undefined;
  const filterGroupsRaw = searchParams.get('filter_groups');
  if (filterGroupsRaw) {
    try {
      const parsed = JSON.parse(filterGroupsRaw);
      if (typeof parsed === 'object' && parsed !== null) {
        filterGroups = parsed as Record<string, string[]>;
      }
    } catch {
      // ignore malformed input
    }
  }

  try {
    const result = await fetchCreators({
      q,
      verified: verified || undefined,
      price,
      sort,
      page,
      pageSize,
      locationTerms,
      categoryTerms,
      filterGroups,
      skipLocationFilter,
    });

    // Cache Load More responses for 30s (public, non-personalised search).
    // stale-while-revalidate lets the CDN serve stale data while refreshing.
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (err) {
    console.error('Search route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
