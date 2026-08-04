import type { Creator } from '@/types/creator';
import {
  fetchCreators,
  fetchCreatorsByUsernames,
  type SearchParams,
  type SearchResult,
} from '@/lib/supabase';
import { getSponsorCampaignsForScope } from './sponsors';

export const categoryScope = (slug: string) => `category:${slug}`;
export const locationScope = (slug: string) => `location:${slug}`;
export const locationCategoryScope = (locationSlug: string, categorySlug: string) =>
  `location-category:${locationSlug}:${categorySlug}`;

/**
 * Fetch a one-based page and merge paid placements into exact global slots.
 * Sponsors deliberately bypass organic filters, while the natural stream
 * keeps its original category/location/search constraints.
 */
export async function fetchSponsoredPage(
  scope: string,
  baseParams: SearchParams,
  page: number,
  pageSize: number,
): Promise<SearchResult> {
  const configuredCampaigns = getSponsorCampaignsForScope(scope);
  if (configuredCampaigns.length === 0) {
    return fetchCreators({ ...baseParams, page, pageSize });
  }

  // Resolve every configured sponsor first. Missing profiles are removed from
  // the placement plan so pages never become short or shift between requests.
  const sponsorCreators = await fetchCreatorsByUsernames(
    configuredCampaigns.map((campaign) => campaign.username),
  );
  const sponsorByUsername = new Map(
    sponsorCreators.map((creator) => [creator.username.toLowerCase(), creator]),
  );
  const campaigns = configuredCampaigns.filter((campaign) =>
    sponsorByUsername.has(campaign.username.toLowerCase()),
  );

  if (campaigns.length === 0) {
    return fetchCreators({ ...baseParams, page, pageSize });
  }

  const windowStart = (page - 1) * pageSize;
  const windowEnd = windowStart + pageSize;
  const pinByIndex = new Map<number, string>();
  let pinsBeforeWindow = 0;

  for (const campaign of campaigns) {
    const index = campaign.position - 1;
    if (index < windowStart) pinsBeforeWindow += 1;
    else if (index < windowEnd) pinByIndex.set(index, campaign.username);
  }

  const naturalOffset = Math.max(0, windowStart - pinsBeforeWindow);
  const sponsorUsernames = campaigns.map((campaign) => campaign.username);
  // Fetch a full page rather than only the expected free slots. This provides
  // a natural fallback and an accurate has-more signal if a pin disappears.
  const naturalResult = await fetchCreators({
    ...baseParams,
    page: 1,
    pageSize,
    offset: naturalOffset,
    excludeUsernames: sponsorUsernames,
  });
  const excluded = new Set(sponsorUsernames.map((username) => username.toLowerCase()));
  const natural = naturalResult.creators.filter(
    (creator) => !excluded.has(creator.username.toLowerCase()),
  );

  const creators: Creator[] = [];
  let naturalIndex = 0;
  for (let index = windowStart; index < windowEnd; index += 1) {
    const pinnedUsername = pinByIndex.get(index);
    const pinnedCreator = pinnedUsername
      ? sponsorByUsername.get(pinnedUsername.toLowerCase())
      : undefined;

    if (pinnedCreator) {
      creators.push({ ...pinnedCreator, sponsored: true });
    } else if (naturalIndex < natural.length) {
      creators.push(natural[naturalIndex]);
      naturalIndex += 1;
    }
  }

  const hasUnusedNaturalRows = naturalIndex < natural.length;
  const hasFuturePins = campaigns.some((campaign) => campaign.position - 1 >= windowEnd);

  return {
    creators,
    total: null,
    hasMore: naturalResult.hasMore || hasUnusedNaturalRows || hasFuturePins,
  };
}

