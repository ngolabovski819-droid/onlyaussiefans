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
    username: 'emilylopz',
    position: 1,
    scopes: ['sitewide'],
    searchDropdown: true,
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
    searchDropdown: false,
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
    username: 'rinayanami',
    position: 4,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/rinayanami/c31',
    clickTable: 'sponsor_clicks_oaussief_rinayanami',
    imageOverride: '/uploads/sponsors/rinayanami/rina-01.jpg',
    tags: ['Petite', 'Asian', 'Nerdy', 'GFE'],
    additionalTagCount: 5,
    galleryImages: [
      '/uploads/sponsors/rinayanami/rina-02.jpg',
      '/uploads/sponsors/rinayanami/rina-03.jpg',
      '/uploads/sponsors/rinayanami/rina-04.jpg',
      '/uploads/sponsors/rinayanami/rina-05.jpg',
      '/uploads/sponsors/rinayanami/rina-06.jpg',
      '/uploads/sponsors/rinayanami/rina-07.jpg',
      '/uploads/sponsors/rinayanami/rina-08.jpg',
      '/uploads/sponsors/rinayanami/rina-09.jpg',
      '/uploads/sponsors/rinayanami/rina-10.jpg',
      '/uploads/sponsors/rinayanami/rina-11.jpg',
    ],
  },
  {
    username: 'sophiescrts',
    position: 5,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/sophiescrts/c7',
    clickTable: 'sponsor_clicks_oaussief_sophiescrts',
    imageOverride: '/uploads/sponsors/sophiescrts/sophie-01.jpg',
    tags: ['Natural big tits', 'Brunette'],
    additionalTagCount: 9,
    galleryImages: [
      '/uploads/sponsors/sophiescrts/sophie-02.jpg',
      '/uploads/sponsors/sophiescrts/sophie-03.jpg',
      '/uploads/sponsors/sophiescrts/sophie-04.jpg',
      '/uploads/sponsors/sophiescrts/sophie-05.jpg',
      '/uploads/sponsors/sophiescrts/sophie-06.jpg',
      '/uploads/sponsors/sophiescrts/sophie-07.jpg',
      '/uploads/sponsors/sophiescrts/sophie-08.jpg',
      '/uploads/sponsors/sophiescrts/sophie-09.jpg',
      '/uploads/sponsors/sophiescrts/sophie-10.jpg',
      '/uploads/sponsors/sophiescrts/sophie-11.jpg',
      '/uploads/sponsors/sophiescrts/sophie-12.jpg',
      '/uploads/sponsors/sophiescrts/sophie-13.jpg',
      '/uploads/sponsors/sophiescrts/sophie-14.jpg',
      '/uploads/sponsors/sophiescrts/sophie-15.jpg',
      '/uploads/sponsors/sophiescrts/sophie-16.jpg',
      '/uploads/sponsors/sophiescrts/sophie-17.jpg',
      '/uploads/sponsors/sophiescrts/sophie-18.jpg',
      '/uploads/sponsors/sophiescrts/sophie-19.jpg',
      '/uploads/sponsors/sophiescrts/sophie-20.jpg',
      '/uploads/sponsors/sophiescrts/sophie-21.jpg',
      '/uploads/sponsors/sophiescrts/sophie-22.jpg',
      '/uploads/sponsors/sophiescrts/sophie-23.jpg',
      '/uploads/sponsors/sophiescrts/sophie-24.jpg',
      '/uploads/sponsors/sophiescrts/sophie-25.jpg',
      '/uploads/sponsors/sophiescrts/sophie-26.jpg',
      '/uploads/sponsors/sophiescrts/sophie-27.jpg',
      '/uploads/sponsors/sophiescrts/sophie-28.jpg',
      '/uploads/sponsors/sophiescrts/sophie-29.jpg',
      '/uploads/sponsors/sophiescrts/sophie-30.jpg',
      '/uploads/sponsors/sophiescrts/sophie-31.jpg',
      '/uploads/sponsors/sophiescrts/sophie-32.jpg',
      '/uploads/sponsors/sophiescrts/sophie-33.jpg',
      '/uploads/sponsors/sophiescrts/sophie-34.jpg',
      '/uploads/sponsors/sophiescrts/sophie-35.jpg',
      '/uploads/sponsors/sophiescrts/sophie-36.jpg',
      '/uploads/sponsors/sophiescrts/sophie-37.jpg',
      '/uploads/sponsors/sophiescrts/sophie-38.jpg',
      '/uploads/sponsors/sophiescrts/sophie-39.jpg',
      '/uploads/sponsors/sophiescrts/sophie-40.jpg',
      '/uploads/sponsors/sophiescrts/sophie-41.jpg',
      '/uploads/sponsors/sophiescrts/sophie-42.jpg',
      '/uploads/sponsors/sophiescrts/sophie-43.jpg',
      '/uploads/sponsors/sophiescrts/sophie-44.jpg',
      '/uploads/sponsors/sophiescrts/sophie-45.jpg',
      '/uploads/sponsors/sophiescrts/sophie-46.jpg',
      '/uploads/sponsors/sophiescrts/sophie-47.jpg',
      '/uploads/sponsors/sophiescrts/sophie-48.jpg',
      '/uploads/sponsors/sophiescrts/sophie-49.jpg',
      '/uploads/sponsors/sophiescrts/sophie-50.jpg',
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

/**
 * Vanity slugs for the `/go/<slug>` redirect ONLY. Lets a sponsor share
 * `onlyaussiefans.com/go/<anything>` — the OF username of a profile in the owner's promo
 * sheet, an IG/TikTok persona, a per-campaign name — instead of `/go/<of-username>`. The
 * route resolves the alias to the target's campaign (linkOverride + clickTable) and logs
 * the click with `placement: 'vanity:<alias>'`, so each shared link reports separately.
 *
 * Alias → real OF username, both matched case-insensitively. Adding one is a single line +
 * deploy: no DNS, no Vercel config, no migration (it reuses the target's table). Cards,
 * profile pages and click-token minting never see aliases — they key on the real username
 * via getSponsorCampaign().
 *
 * Mirrors GO_ALIASES in the fanspedia and findbyface repos; each site's alias list is
 * independent, since promo-sheet rows are sold per-site.
 */
export const GO_ALIASES: Record<string, string> = {
  // emilylopz
  bigtittytifff: 'emilylopz',
  bxbyclash: 'emilylopz',
  // rocketreynaxo
  bigbootyjudy20: 'rocketreynaxo',
  shaycrazychic: 'rocketreynaxo',
  // sophiescrts
  heyitsjudyy: 'sophiescrts',
  zoeycollins8x: 'sophiescrts',
  // rinayanami
  amelielou: 'rinayanami',
};

const NORMALIZED_ALIASES = new Map(
  Object.entries(GO_ALIASES).map(([alias, username]) => [
    alias.trim().toLowerCase(),
    username.trim().toLowerCase(),
  ]),
);

// Build-time guard (runs on module load, so `next build` fails loudly on a bad config): an
// alias that shadows a real campaign username would silently hijack that sponsor's /go/ link,
// and an alias pointing at a non-sponsor would redirect but never log.
for (const [alias, username] of NORMALIZED_ALIASES) {
  if (NORMALIZED.has(alias)) {
    throw new Error(`GO_ALIASES: "${alias}" collides with a SPONSOR_CAMPAIGNS username`);
  }
  if (!NORMALIZED.has(username)) {
    throw new Error(`GO_ALIASES: "${alias}" points at "${username}", which has no campaign`);
  }
}

/**
 * Resolve a `/go/<slug>` path segment to the real sponsor username. Non-aliases resolve to
 * themselves unchanged, so existing `/go/<username>` links behave exactly as before.
 */
export function resolveGoAlias(slug: string): { username: string; isAlias: boolean } {
  const target = NORMALIZED_ALIASES.get(slug.trim().toLowerCase());
  return target ? { username: target, isAlias: true } : { username: slug, isAlias: false };
}
