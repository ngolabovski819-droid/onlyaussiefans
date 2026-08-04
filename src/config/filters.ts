export interface FilterOption {
  label: string;
  terms: string[]; // mapped to about.ilike searches
}

export interface FilterGroup {
  id: string;
  label: string;
  type: 'terms' | 'price';
  options: FilterOption[];
}

// Location and Ethnicity were removed: Location duplicated the state/city
// browse pages, and Ethnicity's match counts against the live `about` bio
// text were too thin to be useful. Fetish and Profession got a few extra
// options that were verified against the live database first.
export const filterGroups: FilterGroup[] = [
  {
    id: 'appearance',
    label: 'Appearance',
    type: 'terms',
    options: [
      { label: 'Slim', terms: ['slim', 'slender', 'skinny'] },
      { label: 'Petite', terms: ['petite', 'small', 'tiny'] },
      { label: 'Curvy', terms: ['curvy', 'hourglass', 'voluptuous'] },
      { label: 'BBW', terms: ['bbw', 'plus size', 'chubby', 'thick'] },
      { label: 'Athletic', terms: ['athletic', 'toned', 'fit body'] },
      { label: 'Busty', terms: ['busty', 'big boobs', 'big tits'] },
      { label: 'Thick', terms: ['thick', 'thicc', 'phat'] },
      { label: 'Hourglass', terms: ['hourglass', 'curves'] },
    ],
  },
  {
    id: 'gender',
    label: 'Gender',
    type: 'terms',
    options: [
      { label: 'Female', terms: ['female', 'girl', 'woman'] },
      { label: 'Male', terms: ['male', 'guy', 'man'] },
      { label: 'Trans', terms: ['trans', 'transgender', 'tgirl'] },
      { label: 'Non-binary', terms: ['nonbinary', 'non-binary', 'enby'] },
      { label: 'Couple', terms: ['couple', 'couples', 'duo'] },
    ],
  },
  {
    id: 'orientation',
    label: 'Orientation',
    type: 'terms',
    options: [
      { label: 'Straight', terms: ['straight', 'heterosexual'] },
      { label: 'Lesbian', terms: ['lesbian', 'sapphic', 'wlw'] },
      { label: 'Bisexual', terms: ['bisexual', 'bi', 'pansexual'] },
      { label: 'Gay', terms: ['gay', 'homosexual', 'mlm'] },
    ],
  },
  {
    id: 'content',
    label: 'Content Type',
    type: 'terms',
    options: [
      { label: 'Photos', terms: ['photos', 'pics', 'galleries'] },
      { label: 'Videos', terms: ['videos', 'clips', 'movies'] },
      { label: 'Sexting', terms: ['sexting', 'sext', 'chat'] },
      { label: 'Custom', terms: ['custom', 'custom content', 'requests'] },
      { label: 'Live Shows', terms: ['live', 'live show', 'stream'] },
    ],
  },
  {
    id: 'fetish',
    label: 'Fetish',
    type: 'terms',
    options: [
      { label: 'Feet', terms: ['feet', 'foot fetish', 'toes'] },
      { label: 'BDSM', terms: ['bdsm', 'bondage', 'kink'] },
      { label: 'Cosplay', terms: ['cosplay', 'costume', 'anime'] },
      { label: 'Roleplay', terms: ['roleplay', 'role play'] },
      { label: 'Latex', terms: ['latex', 'rubber', 'pvc'] },
      { label: 'ASMR', terms: ['asmr'] },
      { label: 'Voyeur', terms: ['voyeur', 'exhibitionist'] },
      { label: 'Femdom', terms: ['femdom'] },
      { label: 'Findom', terms: ['findom'] },
    ],
  },
  {
    id: 'relationship',
    label: 'Relationship',
    type: 'terms',
    options: [
      { label: 'GFE', terms: ['gfe', 'girlfriend experience', 'girlfriend'] },
      { label: 'Dominant', terms: ['dominant', 'dom', 'domme', 'mistress'] },
      { label: 'Submissive', terms: ['submissive', 'sub', 'slave', 'obedient'] },
    ],
  },
  {
    id: 'style',
    label: 'Style',
    type: 'terms',
    options: [
      { label: 'Alt / Goth', terms: ['alt', 'goth', 'gothic', 'emo', 'punk'] },
      { label: 'Fitness', terms: ['fitness', 'gym', 'workout', 'athlete'] },
      { label: 'Natural', terms: ['natural', 'all natural', 'au naturel'] },
      { label: 'Glamour', terms: ['glamour', 'glam', 'luxury', 'classy'] },
      { label: 'Tattooed', terms: ['tattoo', 'tattooed', 'ink', 'inked'] },
    ],
  },
  {
    id: 'profession',
    label: 'Profession',
    type: 'terms',
    options: [
      { label: 'Nurse', terms: ['nurse', 'nursing'] },
      { label: 'Teacher', terms: ['teacher', 'professor', 'tutor'] },
      { label: 'Student', terms: ['student', 'college', 'uni', 'university'] },
      { label: 'Model', terms: ['model', 'modelling', 'instagram model'] },
      { label: 'Fitness Instructor', terms: ['trainer', 'pt', 'personal trainer', 'instructor'] },
      { label: 'Dancer', terms: ['dancer', 'stripper'] },
      { label: 'Cosplayer', terms: ['cosplayer'] },
      { label: 'Yoga Instructor', terms: ['yoga'] },
      { label: 'Waitress', terms: ['waitress', 'bartender'] },
      { label: 'Influencer', terms: ['influencer'] },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    type: 'price',
    options: [
      { label: 'Free', terms: ['free'] },
      { label: 'Under A$5', terms: ['under5'] },
      { label: 'Under A$10', terms: ['under10'] },
      { label: 'Any Price', terms: ['any'] },
    ],
  },
];
