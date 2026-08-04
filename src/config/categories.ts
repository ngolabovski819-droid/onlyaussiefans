export interface CategoryFAQ {
  q: string;
  a: string;
}

export interface CategoryConfig {
  slug: string;
  label: string;
  terms: string[];
  /** If set, filter by subscription price in addition to (or instead of) terms */
  priceFilter?: 'free' | 'under5' | 'under10';
  /** Restrict to identity-verified creators only. */
  verified?: boolean;
  /** Result ordering; defaults to 'popular'. */
  sort?: 'popular' | 'newest';
  emoji?: string;
  /** Surfaces in nav dropdown/chips, homepage "Popular Categories", and
   *  location×category cross-links. Leave unset for attribute-style pages
   *  (see below) whose label is already a full phrase — the generic
   *  "Best {label} OnlyFans Creators in {location}" template would read
   *  wrong once composed with those, so they're linked explicitly instead. */
  popular?: boolean;
  /** Copy overrides for pages whose label is a full phrase (e.g. "Best
   *  Aussie OnlyFans") rather than a modifier (e.g. "MILF") — the generic
   *  templates below would double up ("Best Best Aussie OnlyFans..."). */
  h1?: string;
  metaTitle?: string;
  metaDesc?: string;
  intro?: string;
  faqs?: CategoryFAQ[];
}

export const categories: CategoryConfig[] = [
  { slug: 'milf', label: 'MILF', terms: ['milf', 'mom', 'cougar', 'mature mom'], emoji: '🔥', popular: true },
  { slug: 'bbw', label: 'BBW', terms: ['bbw', 'plus size', 'curvy', 'thick', 'chubby'], emoji: '💕', popular: true },
  { slug: 'teen', label: 'Teen (18+)', terms: ['teen', 'young', 'student', 'college', 'uni'], popular: true },
  { slug: 'latina', label: 'Latina', terms: ['latina', 'latinas', 'hispanic', 'mexican'], popular: true },
  { slug: 'asian', label: 'Asian', terms: ['asian', 'japanese', 'korean', 'chinese', 'filipina', 'thai'], popular: true },
  { slug: 'ebony', label: 'Ebony', terms: ['ebony', 'black', 'african'], popular: true },
  { slug: 'blonde', label: 'Blonde', terms: ['blonde', 'blond'], popular: true },
  { slug: 'trans', label: 'Trans', terms: ['trans', 'transgender', 'transwoman', 'tgirl'], popular: true },
  { slug: 'lesbian', label: 'Lesbian', terms: ['lesbian', 'sapphic', 'wlw'], popular: true },
  { slug: 'free', label: 'Free', terms: [], priceFilter: 'free', emoji: '🆓', popular: true },
  {
    slug: 'best-aussie-onlyfans',
    label: 'Best Aussie OnlyFans',
    terms: [],
    sort: 'popular',
    emoji: '🏆',
    h1: '🏆 Best Aussie OnlyFans Creators',
    metaTitle: 'Best Aussie OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'The best Aussie OnlyFans creators, ranked by popularity. Browse 20,000+ verified Australian OnlyFans profiles, updated daily.',
    intro: "Looking for the best Aussie OnlyFans has to offer? This page ranks Australian creators by popularity so you can skip the scrolling and find top-tier talent fast. Every profile here is Australian-based and refreshed daily.",
    faqs: [
      { q: 'How is "best" determined on this page?', a: 'Creators are ranked by popularity signals such as subscriber engagement and activity. It updates as creator profiles change, so the ranking reflects current standing, not a fixed list.' },
      { q: 'How many Aussie OnlyFans creators are ranked here?', a: 'We rank creators from our full pool of 20,000+ Australian OnlyFans profiles, refreshed daily as new creators join and existing ones update.' },
      { q: 'Can I filter the best Aussie creators by state or price?', a: 'Yes — use the search filters to narrow the best Aussie OnlyFans creators by location, category, verification status or subscription price.' },
    ],
  },
  {
    slug: 'verified-aussie-onlyfans',
    label: 'Verified Aussie OnlyFans',
    terms: [],
    verified: true,
    emoji: '✅',
    h1: '✅ Verified Aussie OnlyFans Creators',
    metaTitle: 'Verified Aussie OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Browse only identity-verified Australian OnlyFans creators. 20,000+ verified Aussie profiles, filterable by state, city and category.',
    intro: "Every creator on this page has completed OnlyFans' identity verification — a quality signal that means an active, authentic profile behind the photos. Browse verified Australian OnlyFans creators only, drawn from our directory of 20,000+ Aussie profiles.",
    faqs: [
      { q: 'What does "verified" mean on OnlyAussieFans?', a: "It means the creator has completed OnlyFans' own identity verification process — a signal of an authentic, active account rather than a guarantee of any specific content." },
      { q: 'How many verified Aussie OnlyFans creators are listed?', a: 'Around 20,000 of the creators in our Australian directory are verified. That figure changes daily as profiles update.' },
      { q: 'Can I combine the verified filter with a category or city?', a: 'Yes — use the search page to combine the Verified filter with any state, city, category or price range.' },
    ],
  },
  {
    slug: 'new-australian-onlyfans-creators',
    label: 'New Australian OnlyFans Creators',
    terms: [],
    sort: 'newest',
    emoji: '🆕',
    h1: '🆕 New Australian OnlyFans Creators',
    metaTitle: 'New Australian OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Discover the newest Australian OnlyFans creators added to our directory. Fresh Aussie profiles, updated daily.',
    intro: "Be first to discover Australia's newest OnlyFans creators. This page surfaces the most recently added Aussie profiles in our directory, refreshed daily as new creators join.",
    faqs: [
      { q: 'How often is this page updated?', a: 'Daily. As new Australian creators are added to our directory, they appear here first, sorted by when they joined.' },
      { q: 'Are new creators verified?', a: 'Not all of them — new creators may not have completed OnlyFans verification yet. Combine this page with the Verified filter to see only verified new creators.' },
    ],
  },
  {
    slug: 'under-10-aussie-onlyfans',
    label: 'Under $10 Aussie OnlyFans',
    terms: [],
    priceFilter: 'under10',
    sort: 'popular',
    emoji: '💸',
    h1: '💸 Aussie OnlyFans Under $10',
    metaTitle: 'Aussie OnlyFans Under $10 (2026) | OnlyAussieFans',
    metaDesc: "Budget-friendly Australian OnlyFans creators — every profile here subscribes for $10 AUD a month or less. Updated daily.",
    intro: "Great content doesn't have to break the bank. Every Australian creator on this page subscribes for $10 AUD a month or less, so you can explore more Aussie OnlyFans talent without stretching your budget.",
    faqs: [
      { q: 'Is $10 the subscription price or a discounted bundle price?', a: "It's the standard monthly subscription price. Many creators also offer further bundle discounts for 3- or 6-month subscriptions — check each profile for details." },
      { q: 'Are there free Aussie OnlyFans creators too?', a: 'Yes — see our dedicated Free Australian OnlyFans page for creators with a $0 subscription price.' },
    ],
  },
  { slug: 'fitness', label: 'Fitness', terms: ['fitness', 'gym', 'workout', 'athletes', 'sport'], popular: true },
  { slug: 'petite', label: 'Petite', terms: ['petite', 'small', 'tiny'], popular: true },
  { slug: 'busty', label: 'Busty', terms: ['busty', 'big boobs', 'big tits', 'large breasts', 'huge boobs'] },
  { slug: 'redhead', label: 'Redhead', terms: ['redhead', 'ginger', 'red hair'] },
  { slug: 'brunette', label: 'Brunette', terms: ['brunette', 'brown hair', 'dark hair'] },
  { slug: 'mature', label: 'Mature', terms: ['mature', 'milf', 'cougar', 'mommy', 'experienced'] },
  { slug: 'goth', label: 'Goth / Alt', terms: ['goth', 'gothic', 'alt', 'alternative', 'emo', 'punk'], emoji: '🖤' },
  { slug: 'cosplay', label: 'Cosplay', terms: ['cosplay', 'costume', 'anime', 'nerd', 'geek'] },
  { slug: 'feet', label: 'Feet', terms: ['feet', 'foot', 'toes', 'soles'] },
  { slug: 'squirt', label: 'Squirt', terms: ['squirt', 'squirting'] },
  { slug: 'amateur', label: 'Amateur', terms: ['amateur', 'homemade', 'real', 'authentic'] },
  { slug: 'bdsm', label: 'BDSM', terms: ['bdsm', 'bondage', 'domme', 'sub', 'dominant', 'submissive', 'kink'] },
  { slug: 'couples', label: 'Couples', terms: ['couple', 'couples', 'husband', 'wife', 'boyfriend', 'girlfriend'] },
  { slug: 'model', label: 'Model', terms: ['model', 'modelling', 'photoshoot', 'swimsuit'] },
  { slug: 'nurse', label: 'Nurse', terms: ['nurse', 'nursing', 'hospital', 'medical'] },
  { slug: 'teacher', label: 'Teacher', terms: ['teacher', 'professor', 'tutor', 'school'] },
  { slug: 'gfe', label: 'GFE', terms: ['gfe', 'girlfriend experience', 'girlfriend'] },
  { slug: 'tattoo', label: 'Tattooed', terms: ['tattoo', 'tattooed', 'ink', 'inked'] },
  { slug: 'athletic', label: 'Athletic', terms: ['athletic', 'toned', 'fit body', 'sporty'] },
  { slug: 'curvy', label: 'Curvy', terms: ['curvy', 'hourglass', 'thick', 'voluptuous'] },
  { slug: 'femboy', label: 'Femboy', terms: ['femboy', 'femboi', 'crossdress', 'trap'] },
  { slug: 'joi', label: 'JOI', terms: ['joi', 'jerk off instruction'] },
  { slug: 'pov', label: 'POV', terms: ['pov', 'point of view'] },
  { slug: 'asmr', label: 'ASMR', terms: ['asmr', 'whisper', 'tingles'] },
  { slug: 'natural', label: 'Natural', terms: ['natural', 'all natural', 'au naturel', 'no surgery'] },
  { slug: 'indian', label: 'Indian', terms: ['indian', 'desi', 'south asian', 'hindi'] },
  { slug: 'milf-free', label: 'Free MILF', terms: ['milf', 'cougar', 'mature mom'], priceFilter: 'free' },
];

export const popularCategories = categories.filter((c) => c.popular);

/** Grouped by section for homepage browse grid */
export const categoryGroups: { label: string; items: CategoryConfig[] }[] = [
  {
    label: 'Gender & Identity',
    items: categories.filter((c) => ['trans', 'lesbian', 'femboy', 'couples'].includes(c.slug)),
  },
  {
    label: 'Age',
    items: categories.filter((c) => ['teen', 'milf', 'mature'].includes(c.slug)),
  },
  {
    label: 'Ethnicity',
    items: categories.filter((c) => ['latina', 'asian', 'ebony', 'indian'].includes(c.slug)),
  },
  {
    label: 'Appearance',
    items: categories.filter((c) => ['petite', 'busty', 'bbw', 'curvy', 'athletic', 'natural', 'tattoo'].includes(c.slug)),
  },
  {
    label: 'Style & Niche',
    items: categories.filter((c) => ['goth', 'cosplay', 'fitness', 'amateur', 'model', 'feet', 'bdsm', 'gfe'].includes(c.slug)),
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categories.find((c) => c.slug === slug);
}
