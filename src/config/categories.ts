export interface CategoryConfig {
  slug: string;
  label: string;
  terms: string[];
  /** If set, filter by subscription price in addition to (or instead of) terms */
  priceFilter?: 'free' | 'under5' | 'under10';
  emoji?: string;
  popular?: boolean;
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
