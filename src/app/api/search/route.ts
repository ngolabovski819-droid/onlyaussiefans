import { NextRequest, NextResponse } from 'next/server';
import { fetchCreators } from '@/lib/supabase';
import type { SearchParams } from '@/lib/supabase';
import { filterGroups as filterGroupConfig } from '@/config/filters';
import { fetchSponsoredPage } from '@/config/featured';
import { isSponsorScope } from '@/config/sponsors';

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

function boundedInteger(raw: string | null, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(raw ?? '', 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

const allowedFilterTerms = new Map(
  filterGroupConfig.map((group) => [
    group.id,
    new Set(group.options.flatMap((option) => option.terms)),
  ])
);

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
  const page = boundedInteger(searchParams.get('page'), 1, 1, 10_000);
  const pageSize = boundedInteger(searchParams.get('page_size'), 20, 1, 40);

  const locationTermsRaw = searchParams.get('location_terms');
  const locationTerms = locationTermsRaw
    ? locationTermsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : undefined;

  const categoryTermsRaw = searchParams.get('category_terms');
  const categoryTerms = categoryTermsRaw
    ? categoryTermsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : undefined;

  const skipLocationFilter = searchParams.get('skip_location_filter') === 'true';
  const requestedScope = searchParams.get('scope');
  const scope = requestedScope && isSponsorScope(requestedScope) ? requestedScope : undefined;

  // Filter groups: filter_groups={"appearance":["slim","curvy"],"ethnicity":["asian"]}
  let filterGroups: Record<string, string[]> | undefined;
  const filterGroupsRaw = searchParams.get('filter_groups');
  if (filterGroupsRaw) {
    try {
      const parsed = JSON.parse(filterGroupsRaw);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        filterGroups = {};
        for (const [groupId, terms] of Object.entries(parsed)) {
          const allowed = allowedFilterTerms.get(groupId);
          if (!allowed || !Array.isArray(terms)) continue;
          const validTerms = terms
            .filter((term): term is string => typeof term === 'string' && allowed.has(term))
            .slice(0, 20);
          if (validTerms.length) filterGroups[groupId] = validTerms;
        }
      }
    } catch {
      // ignore malformed input
    }
  }

  try {
    const creatorParams: SearchParams = {
      q,
      verified: verified || undefined,
      price,
      sort,
      locationTerms,
      categoryTerms,
      filterGroups,
      skipLocationFilter,
    };
    const result = scope
      ? await fetchSponsoredPage(scope, creatorParams, page, pageSize)
      : await fetchCreators({ ...creatorParams, page, pageSize });

    // Cache Load More responses for 30s (public, non-personalised search).
    // stale-while-revalidate lets the CDN serve stale data while refreshing.
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (err) {
    console.error('Search route error:', err);
    return NextResponse.json(
      { error: 'Creators are temporarily unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
