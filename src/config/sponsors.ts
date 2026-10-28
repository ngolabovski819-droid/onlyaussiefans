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
  /** One-based search-dropdown slot, independent of the creator-grid position. */
  searchPosition?: number;
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
    username: 'sarahwylde',
    position: 1,
    scopes: ['sitewide'],
    searchDropdown: false,
    linkOverride: 'https://onlyfans.com/sarahwylde/c35',
    clickTable: 'sponsor_clicks_oaussief_sarahwylde',
    imageOverride: '/uploads/sponsors/sarahwylde/sarah-01.jpg',
    tags: ['Fetish friendly', 'Blonde'],
    additionalTagCount: 9,
    galleryImages: [
      '/uploads/sponsors/sarahwylde/sarah-02.jpg',
      '/uploads/sponsors/sarahwylde/sarah-03.jpg',
    ],
  },
  {
    username: 'vietnami',
    position: 2,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/vietnami/c157',
    clickTable: 'sponsor_clicks_oaussief_vietnami',
    imageOverride: '/uploads/sponsors/vietnami/nami-01.jpg',
    tags: ['Petite', 'Kinky'],
    galleryImages: [
      '/uploads/sponsors/vietnami/nami-02.jpg',
      '/uploads/sponsors/vietnami/nami-03.jpg',
    ],
  },
  {
    username: 'emilylopz',
    position: 3,
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
    username: 'aussiesunlocked',
    position: 4,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/aussiesunlocked/c304',
    clickTable: 'sponsor_clicks_oaussief_aussiesunlocked',
    imageOverride: '/uploads/sponsors/aussiesunlocked/aussies-01.jpg',
    tags: ['Horny duo', 'JOI'],
    additionalTagCount: 8,
    galleryImages: [
      '/uploads/sponsors/aussiesunlocked/aussies-02.jpg',
      '/uploads/sponsors/aussiesunlocked/aussies-03.jpg',
    ],
  },
  {
    username: 'hannazuki',
    position: 5,
    scopes: ['sitewide'],
    searchDropdown: false,
    linkOverride: 'https://onlyfans.com/hannazuki/c1043',
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
    username: 'sophiescrts',
    position: 6,
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
  {
    username: 'zoeprvx',
    position: 10,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/zoeprvx/c7',
    clickTable: 'sponsor_clicks_oaussief_zoeprvx',
    imageOverride: '/uploads/sponsors/zoeprvx/zoe-01.jpg',
    tags: ['Fetish friendly', '19 y/o'],
    additionalTagCount: 8,
    galleryImages: [
      '/uploads/sponsors/zoeprvx/zoe-02.jpg',
      '/uploads/sponsors/zoeprvx/zoe-03.jpg',
      '/uploads/sponsors/zoeprvx/zoe-04.jpg',
      '/uploads/sponsors/zoeprvx/zoe-05.jpg',
      '/uploads/sponsors/zoeprvx/zoe-06.jpg',
      '/uploads/sponsors/zoeprvx/zoe-07.jpg',
      '/uploads/sponsors/zoeprvx/zoe-08.jpg',
      '/uploads/sponsors/zoeprvx/zoe-09.jpg',
      '/uploads/sponsors/zoeprvx/zoe-10.jpg',
      '/uploads/sponsors/zoeprvx/zoe-11.jpg',
      '/uploads/sponsors/zoeprvx/zoe-12.jpg',
      '/uploads/sponsors/zoeprvx/zoe-13.jpg',
      '/uploads/sponsors/zoeprvx/zoe-14.jpg',
      '/uploads/sponsors/zoeprvx/zoe-15.jpg',
      '/uploads/sponsors/zoeprvx/zoe-16.jpg',
      '/uploads/sponsors/zoeprvx/zoe-17.jpg',
      '/uploads/sponsors/zoeprvx/zoe-18.jpg',
      '/uploads/sponsors/zoeprvx/zoe-19.jpg',
      '/uploads/sponsors/zoeprvx/zoe-20.jpg',
    ],
  },
  {
    username: 'lucierain',
    position: 12,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/lucierain/c49',
    clickTable: 'sponsor_clicks_oaussief_lucierain',
    imageOverride: '/uploads/sponsors/lucierain/lucie-01.jpg',
    tags: ['Fetish friendly', '18 y/o'],
    additionalTagCount: 8,
    galleryImages: [
      '/uploads/sponsors/lucierain/lucie-02.jpg',
      '/uploads/sponsors/lucierain/lucie-03.jpg',
      '/uploads/sponsors/lucierain/lucie-04.jpg',
      '/uploads/sponsors/lucierain/lucie-05.jpg',
    ],
  },
  {
    username: 'eviecarrol',
    position: 14,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/eviecarrol/c141',
    clickTable: 'sponsor_clicks_oaussief_eviecarrol',
    imageOverride: '/uploads/sponsors/eviecarrol/evie-01.jpg',
    tags: ['18 y/o', 'Petite', 'Blonde'],
    additionalTagCount: 6,
    galleryImages: [
      '/uploads/sponsors/eviecarrol/evie-02.jpg',
    ],
  },
  {
    username: 'amymyohmy',
    position: 16,
    scopes: ['sitewide'],
    searchDropdown: true,
    linkOverride: 'https://onlyfans.com/amymyohmy/c206',
    clickTable: 'sponsor_clicks_oaussief_amymyohmy',
    imageOverride: '/uploads/sponsors/amymyohmy/amy-01.jpg',
    tags: ['18 y/o', 'Student'],
    additionalTagCount: 7,
    galleryImages: [
      '/uploads/sponsors/amymyohmy/amy-02.jpg',
    ],
  },
  {
    username: 'emillyybrown',
    position: 13,
    scopes: ['sitewide'],
    searchDropdown: false,
    linkOverride: 'https://onlyfans.com/emillyybrown/c510',
    clickTable: 'sponsor_clicks_oaussief_emillyybrown',
    imageOverride: '/uploads/sponsors/emillyybrown/emily-01.jpg',
    tags: ['18 y/o', 'Art student', 'New to OF'],
    additionalTagCount: 4,
    galleryImages: [
      '/uploads/sponsors/emillyybrown/emily-02.jpg',
      '/uploads/sponsors/emillyybrown/emily-03.jpg',
      '/uploads/sponsors/emillyybrown/emily-04.jpg',
      '/uploads/sponsors/emillyybrown/emily-05.jpg',
      '/uploads/sponsors/emillyybrown/emily-06.jpg',
      '/uploads/sponsors/emillyybrown/emily-07.jpg',
      '/uploads/sponsors/emillyybrown/emily-08.jpg',
      '/uploads/sponsors/emillyybrown/emily-09.jpg',
      '/uploads/sponsors/emillyybrown/emily-10.jpg',
      '/uploads/sponsors/emillyybrown/emily-11.jpg',
    ],
  },
  {
    username: 'lillyylou',
    position: 18,
    scopes: ['sitewide'],
    searchDropdown: false,
    linkOverride: 'https://onlyfans.com/lillyylou/c385',
    clickTable: 'sponsor_clicks_oaussief_lillyylou',
    imageOverride: '/uploads/sponsors/lillyylou/lilly-01.jpg',
    tags: ['Fetish friendly', '18 y/o', 'New to OF'],
    additionalTagCount: 8,
    galleryImages: [
      '/uploads/sponsors/lillyylou/lilly-02.jpg',
      '/uploads/sponsors/lillyylou/lilly-03.jpg',
      '/uploads/sponsors/lillyylou/lilly-04.jpg',
      '/uploads/sponsors/lillyylou/lilly-05.jpg',
      '/uploads/sponsors/lillyylou/lilly-06.jpg',
      '/uploads/sponsors/lillyylou/lilly-07.jpg',
    ],
  },
  {
    username: 'itsgiastar',
    position: 19,
    scopes: ['sitewide'],
    searchDropdown: true,
    searchPosition: 2,
    linkOverride: 'https://onlyfans.com/itsgiastar/c1',
    clickTable: 'sponsor_clicks_oaussief_itsgiastar',
    imageOverride: '/uploads/sponsors/itsgiastar/gia-01.jpg',
    tags: ['Femdom', 'Fetish-friendly'],
    additionalTagCount: 9,
    galleryImages: [
      '/uploads/sponsors/itsgiastar/gia-02.jpg',
      '/uploads/sponsors/itsgiastar/gia-03.jpg',
      '/uploads/sponsors/itsgiastar/gia-04.jpg',
      '/uploads/sponsors/itsgiastar/gia-05.jpg',
      '/uploads/sponsors/itsgiastar/gia-06.jpg',
      '/uploads/sponsors/itsgiastar/gia-07.jpg',
      '/uploads/sponsors/itsgiastar/gia-08.jpg',
      '/uploads/sponsors/itsgiastar/gia-09.jpg',
      '/uploads/sponsors/itsgiastar/gia-10.jpg',
      '/uploads/sponsors/itsgiastar/gia-11.jpg',
      '/uploads/sponsors/itsgiastar/gia-12.jpg',
    ],
  },
  {
    username: 'aprilcollinsss',
    position: 20,
    scopes: ['sitewide'],
    searchDropdown: true,
    searchPosition: 1,
    linkOverride: 'https://onlyfans.com/aprilcollinsss/c75',
    clickTable: 'sponsor_clicks_oaussief_aprilcollinsss',
    imageOverride: '/uploads/sponsors/aprilcollinsss/april-01.jpg',
    tags: ['Goon', 'Blonde', '19 y/o'],
    additionalTagCount: 4,
    galleryImages: [
      '/uploads/sponsors/aprilcollinsss/april-02.jpg',
      '/uploads/sponsors/aprilcollinsss/april-03.jpg',
      '/uploads/sponsors/aprilcollinsss/april-04.jpg',
    ],
  },
  {
    username: 'ellaajanee',
    position: 8,
    scopes: ['sitewide'],
    searchDropdown: false,
    linkOverride: 'https://onlyfans.com/ellaajanee/c320',
    clickTable: 'sponsor_clicks_oaussief_ellaajanee',
    imageOverride: '/uploads/sponsors/ellaajanee/ella-01.jpg',
    tags: ['Platinum blonde', 'Big tits', '18 y/o'],
    additionalTagCount: 5,
    galleryImages: [
      '/uploads/sponsors/ellaajanee/ella-02.jpg',
      '/uploads/sponsors/ellaajanee/ella-03.jpg',
      '/uploads/sponsors/ellaajanee/ella-04.jpg',
    ],
  },
  {
    username: 'gracieharper',
    position: 7,
    scopes: ['sitewide'],
    searchDropdown: false,
    linkOverride: 'https://onlyfans.com/gracieharper/c415',
    clickTable: 'sponsor_clicks_oaussief_gracieharper',
    imageOverride: '/uploads/sponsors/gracieharper/gracie-01.jpg',
    tags: ['Culinary student', 'Big tits', 'Blonde'],
    additionalTagCount: 5,
    galleryImages: [
      '/uploads/sponsors/gracieharper/gracie-02.jpg',
      '/uploads/sponsors/gracieharper/gracie-03.jpg',
      '/uploads/sponsors/gracieharper/gracie-04.jpg',
      '/uploads/sponsors/gracieharper/gracie-05.jpg',
      '/uploads/sponsors/gracieharper/gracie-06.jpg',
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

/** Ordered, deduplicated campaigns that belong in a creator-grid scope.
 *  `includeSitewide: false` keeps only campaigns that name the scope. */
export function getSponsorCampaignsForScope(scope: string, includeSitewide = true): SponsorCampaign[] {
  const seenUsers = new Set<string>();
  const seenPositions = new Set<number>();

  return SPONSOR_CAMPAIGNS
    .filter((campaign) => (includeSitewide && isSitewide(campaign)) || campaign.scopes?.includes(scope as SponsorScope))
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
  const campaigns = SPONSOR_CAMPAIGNS
    .filter((campaign) => campaign.searchDropdown ?? isSitewide(campaign))
    .slice()
    .sort((a, b) => a.position - b.position)
    .filter((campaign) => {
      const username = campaign.username.trim().toLowerCase();
      if (!username || seen.has(username)) return false;
      seen.add(username);
      return true;
    });

  // Reserve explicit dropdown slots without changing the grid or the relative
  // order of existing search sponsors. Slots beyond the list append at the end.
  const pinned = campaigns
    .filter((campaign): campaign is SponsorCampaign & { searchPosition: number } => (
      Number.isInteger(campaign.searchPosition) && (campaign.searchPosition ?? 0) > 0
    ))
    .sort((a, b) => a.searchPosition - b.searchPosition);
  const pinnedUsernames = new Set(pinned.map((campaign) => campaign.username));
  const ordered = campaigns.filter((campaign) => !pinnedUsernames.has(campaign.username));
  for (const campaign of pinned) {
    ordered.splice(Math.min(campaign.searchPosition - 1, ordered.length), 0, campaign);
  }
  return ordered;
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
  // sophiescrts
  heyitsjudyy: 'sophiescrts',
  zoeycollins8x: 'sophiescrts',
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
