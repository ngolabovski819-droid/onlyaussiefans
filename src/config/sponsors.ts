/**
 * Paid creator campaigns.
 *
 * Keep every campaign in this one list so grid positions, search placements,
 * creative overrides, and click tracking cannot drift out of sync.
 *
 * Update campaign usernames, placement scopes, links, tags, and image assets
 * here. An omitted `scopes` array means the campaign is site-wide.
 *
 * Example:
 * {
 *   username: 'creatorname',
 *   position: 1,
 *   scopes: ['sitewide'],
 *   searchDropdown: true,
 *   linkOverride: 'https://onlyfans.com/creatorname/c123',
 *   clickTable: 'sponsor_clicks_creatorname',
 *   imageOverride: '/uploads/sponsors/creatorname/cover-01.jpg',
 *   galleryImages: ['/uploads/sponsors/creatorname/cover-02.jpg'],
 *   tags: ['GFE', 'Cosplay'],
 *   additionalTagCount: 4,
 * }
 */

export type SponsorScope =
  | 'sitewide'
  | 'home'
  | 'search'
  | 'directory'
  | `category:${string}`
  | `location:${string}`
  | `location-category:${string}:${string}`;

export interface SponsorCampaign {
  username: string;
  /** One-based global card position across pagination. */
  position: number;
  /** Omit or include `sitewide` to show on every creator grid. */
  scopes?: SponsorScope[];
  /** Override whether this campaign appears in focused search boxes. */
  searchDropdown?: boolean;
  /** Custom outbound referral/tracking URL. */
  linkOverride?: string;
  /** Per-campaign Supabase click table written by /go/[username]. */
  clickTable?: string;
  /** Primary card/search image under public/ or an absolute URL. */
  imageOverride?: string;
  /** Short labels over the sponsored card image. */
  tags?: string[];
  /** Extra tag count rendered as +N. */
  additionalTagCount?: number;
  /** Additional carousel images under public/ or absolute URLs. */
  galleryImages?: string[];
}

export const SPONSOR_CAMPAIGNS: readonly SponsorCampaign[] = [
  {
    username: 'cosplaytsumiko',
    position: 1,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/cosplaytsumiko/c58',
    clickTable: 'sponsor_clicks_oaussief_cosplaytsumiko',
    imageOverride: '/uploads/sponsors/cosplaytsumiko/tsumiko-01.jpg',
    tags: ['Cosplay', 'Big tits', 'Blonde'],
    additionalTagCount: 8,
    galleryImages: [
      '/uploads/sponsors/cosplaytsumiko/tsumiko-02.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-03.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-04.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-05.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-06.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-07.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-08.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-09.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-10.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-11.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-12.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-13.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-14.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-15.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-16.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-17.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-18.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-19.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-20.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-21.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-22.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-23.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-24.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-25.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-26.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-27.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-28.jpg',
      '/uploads/sponsors/cosplaytsumiko/tsumiko-29.jpg',
    ],
  },
  {
    username: 'rocketreynaxo',
    position: 2,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/rocketreynaxo/trial/12v36e0ushqqqe1bdaqa4gramuus1m2d',
    clickTable: 'sponsor_clicks_oaussief_rocketreynaxo',
    imageOverride: '/uploads/sponsors/rocketreynaxo/rocket-01.jpg',
    tags: ['Asian MILF', 'Busty', 'Curvy'],
    galleryImages: [
      '/uploads/sponsors/rocketreynaxo/rocket-02.jpg',
      '/uploads/sponsors/rocketreynaxo/rocket-03.jpg',
      '/uploads/sponsors/rocketreynaxo/rocket-04.jpg',
      '/uploads/sponsors/rocketreynaxo/rocket-05.jpg',
      '/uploads/sponsors/rocketreynaxo/rocket-06.jpg',
      '/uploads/sponsors/rocketreynaxo/rocket-07.jpg',
      '/uploads/sponsors/rocketreynaxo/rocket-08.jpg',
      '/uploads/sponsors/rocketreynaxo/rocket-09.jpg',
      '/uploads/sponsors/rocketreynaxo/rocket-10.jpg',
    ],
  },
  {
    username: 'hannazuki',
    position: 3,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/hannazuki/trial/kqv4mhnqp9ifhpwin0vtfxnsscmlv9jy',
    clickTable: 'sponsor_clicks_oaussief_hannazuki',
    imageOverride: '/uploads/sponsors/hannazuki/hanna-01.jpg',
    tags: ['asian', 'cosplay', 'egirl', 'GFE'],
    galleryImages: [
      '/uploads/sponsors/hannazuki/hanna-02.jpg',
      '/uploads/sponsors/hannazuki/hanna-03.jpg',
      '/uploads/sponsors/hannazuki/hanna-04.jpg',
      '/uploads/sponsors/hannazuki/hanna-05.jpg',
      '/uploads/sponsors/hannazuki/hanna-06.jpg',
      '/uploads/sponsors/hannazuki/hanna-07.jpg',
    ],
  },
  {
    username: 'emilylopz',
    position: 4,
    scopes: ['sitewide'],
    searchDropdown: false,
    linkOverride: 'https://onlyfans.com/emilylopz/c545',
    clickTable: 'sponsor_clicks_oaussief_emilylopz',
    tags: ['GFE', 'Feet fetish', 'Squirting'],
    additionalTagCount: 9,
    galleryImages: [
      '/uploads/sponsors/emilylopz/emily-01.jpg',
      '/uploads/sponsors/emilylopz/emily-02.jpg',
      '/uploads/sponsors/emilylopz/emily-03.jpg',
      '/uploads/sponsors/emilylopz/emily-04.jpg',
      '/uploads/sponsors/emilylopz/emily-05.jpg',
      '/uploads/sponsors/emilylopz/emily-06.jpg',
      '/uploads/sponsors/emilylopz/emily-07.jpg',
      '/uploads/sponsors/emilylopz/emily-08.jpg',
      '/uploads/sponsors/emilylopz/emily-09.jpg',
      '/uploads/sponsors/emilylopz/emily-10.jpg',
      '/uploads/sponsors/emilylopz/emily-11.jpg',
      '/uploads/sponsors/emilylopz/emily-12.jpg',
      '/uploads/sponsors/emilylopz/emily-13.jpg',
      '/uploads/sponsors/emilylopz/emily-14.jpg',
      '/uploads/sponsors/emilylopz/emily-15.jpg',
      '/uploads/sponsors/emilylopz/emily-16.jpg',
      '/uploads/sponsors/emilylopz/emily-17.jpg',
      '/uploads/sponsors/emilylopz/emily-18.jpg',
      '/uploads/sponsors/emilylopz/emily-19.jpg',
      '/uploads/sponsors/emilylopz/emily-20.jpg',
      '/uploads/sponsors/emilylopz/emily-21.jpg',
      '/uploads/sponsors/emilylopz/emily-22.jpg',
      '/uploads/sponsors/emilylopz/emily-23.jpg',
      '/uploads/sponsors/emilylopz/emily-24.jpg',
    ],
  },
];

const NORMALIZED = new Map(
  SPONSOR_CAMPAIGNS.map((campaign) => [campaign.username.trim().toLowerCase(), campaign]),
);

function isSitewide(campaign: SponsorCampaign): boolean {
  return !campaign.scopes?.length || campaign.scopes.includes('sitewide');
}

/** Case-insensitive campaign lookup. */
export function getSponsorCampaign(username: string): SponsorCampaign | undefined {
  return NORMALIZED.get(username.trim().toLowerCase());
}

/** Ordered, deduplicated campaigns that belong in a creator-grid scope. */
export function getSponsorCampaignsForScope(scope: string): SponsorCampaign[] {
  const seenUsers = new Set<string>();
  const seenPositions = new Set<number>();

  return SPONSOR_CAMPAIGNS
    .filter((campaign) => isSitewide(campaign) || campaign.scopes?.includes(scope as SponsorScope))
    .filter((campaign) => campaign.username.trim() && Number.isInteger(campaign.position) && campaign.position > 0)
    .slice()
    .sort((a, b) => a.position - b.position)
    .filter((campaign) => {
      const username = campaign.username.trim().toLowerCase();
      if (seenUsers.has(username) || seenPositions.has(campaign.position)) return false;
      seenUsers.add(username);
      seenPositions.add(campaign.position);
      return true;
    });
}

/** Search placements derive from the same campaign list as grid placements. */
export function getSearchSponsorCampaigns(): SponsorCampaign[] {
  const seen = new Set<string>();
  return SPONSOR_CAMPAIGNS
    .filter((campaign) => campaign.searchDropdown ?? isSitewide(campaign))
    .slice()
    .sort((a, b) => a.position - b.position)
    .filter((campaign) => {
      const username = campaign.username.trim().toLowerCase();
      if (!username || seen.has(username)) return false;
      seen.add(username);
      return true;
    });
}

export function isSponsorScope(value: string): boolean {
  return /^(home|search|directory|category:[a-z0-9-]+|location:[a-z0-9-]+|location-category:[a-z0-9-]+:[a-z0-9-]+)$/u.test(value);
}
