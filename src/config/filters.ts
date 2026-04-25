import { states } from './states';

export interface FilterOption {
  label: string;
  terms: string[]; // mapped to about.ilike searches
}

export interface FilterGroup {
  id: string;
  label: string;
  type: 'terms' | 'price' | 'location'; // 'location' renders as state links
  options: FilterOption[];
}

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
    id: 'ethnicity',
    label: 'Ethnicity',
    type: 'terms',
    options: [
      { label: 'Asian', terms: ['asian', 'japanese', 'korean', 'chinese'] },
      { label: 'Latina', terms: ['latina', 'hispanic', 'latinx'] },
      { label: 'Ebony', terms: ['ebony', 'black'] },
      { label: 'Caucasian', terms: ['caucasian', 'white', 'european'] },
      { label: 'Indian', terms: ['indian', 'desi', 'south asian'] },
      { label: 'Middle Eastern', terms: ['arabic', 'middle east', 'persian'] },
      { label: 'Mixed', terms: ['mixed', 'biracial', 'mixed race'] },
      { label: 'Filipina', terms: ['filipina', 'philippine', 'pinay'] },
    ],
  },
  {
    id: 'location',
    label: 'Location',
    type: 'location',
    options: states.map((s) => ({
      label: `${s.abbr} – ${s.label}`,
      terms: s.terms,
    })),
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
      { label: 'Bondage', terms: ['bondage', 'tied', 'restrained'] },
      { label: 'Latex', terms: ['latex', 'rubber', 'pvc'] },
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
