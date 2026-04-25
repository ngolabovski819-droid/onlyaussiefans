import type { FAQ } from './states';

export interface CityConfig {
  slug: string;
  urlSlug: string; // e.g. 'sydney-onlyfans'
  label: string;
  terms: string[];
  parentState: string; // state slug
  h1: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  faqs: FAQ[];
  relatedCities: string[]; // sibling city slugs
  relatedStates?: string[]; // optional related state slugs
}

export const cities: CityConfig[] = [
  {
    slug: 'sydney',
    urlSlug: 'sydney-onlyfans',
    label: 'Sydney',
    terms: ['sydney', 'nsw', 'bondi', 'parramatta', 'north shore', 'eastern suburbs'],
    parentState: 'new-south-wales',
    h1: 'Best OnlyFans Creators in Sydney',
    metaTitle: 'Best Sydney OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Find the hottest OnlyFans creators from Sydney, Australia. Browse Bondi, Eastern Suburbs and city-based creators. Free and premium content.',
    intro: "Sydney is undisputedly Australia's OnlyFans capital. From Bondi Beach to the leafy North Shore, the city's diverse population, year-round sunshine and cosmopolitan culture have produced Australia's richest creator ecosystem. Sydney's Eastern Suburbs alone — home to some of the country's most photogenic beaches and affluent suburbs — contribute a disproportionate number of top-earning creators. The city also has a thriving LGBTQ+ community centred around Oxford Street and Newtown, making it a standout destination for diverse creator content. Whether you prefer fitness influencers from Pyrmont, beach creators from Cronulla, or alt artists from the Inner West, Sydney delivers an unmatched depth and breadth of OnlyFans talent. Our directory captures it all, updated daily with new profiles across every niche and price point.",
    faqs: [
      { q: 'How many OnlyFans creators are in Sydney?', a: 'Sydney has more OnlyFans creators than any other Australian city. Our directory indexes hundreds of Sydney-based profiles across every category, from free accounts to premium verified creators.' },
      { q: 'Where in Sydney are most OnlyFans creators based?', a: "The Eastern Suburbs (Bondi, Coogee, Randwick) and Inner West suburbs (Newtown, Surry Hills) have the highest creator density. The North Shore and Northern Beaches also contribute many lifestyle and fitness creators." },
      { q: 'Can I find verified Sydney OnlyFans creators?', a: "Yes — toggle the Verified filter to show only Sydney creators who have completed OnlyFans' identity verification process. Verified creators are generally more active and have proven track records." },
      { q: 'Do Sydney creators offer discounts or bundles?', a: "Many do. Sydney's competitive creator market means subscription discounts and bundle deals are common. Check individual profile cards for bundle pricing information." },
    ],
    relatedCities: ['newcastle', 'wollongong', 'melbourne', 'brisbane'],
  },
  {
    slug: 'melbourne',
    urlSlug: 'melbourne-onlyfans',
    label: 'Melbourne',
    terms: ['melbourne', 'vic', 'fitzroy', 'collingwood', 'st kilda', 'southbank'],
    parentState: 'victoria',
    h1: 'Best OnlyFans Creators in Melbourne',
    metaTitle: 'Best Melbourne OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Discover top OnlyFans creators from Melbourne, Australia. Browse free and premium profiles from Fitzroy, Collingwood, St Kilda and beyond.',
    intro: "Melbourne is the creative capital of Australia, and nowhere is that more evident than in its OnlyFans creator community. The city's reputation for arts, culture, fashion and food extends naturally into the digital creator economy. Inner-city suburbs like Fitzroy, Collingwood and Prahran are hotbeds of alt, cosplay and artistic creator content that routinely outperforms the glossier Sydney aesthetic in dedicated fan communities worldwide. St Kilda — Melbourne's beachside bohemian suburb — contributes a distinctive blend of beach lifestyle and artistic creativity. Melbourne's cold winters have also driven creators to invest in indoor production quality, resulting in a higher average production value than you'll find in warmer cities. From the underground music scene of Northcote to the upscale vibe of South Yarra, Melbourne creators cover every aesthetic spectrum.",
    faqs: [
      { q: 'Is Melbourne or Sydney better for OnlyFans creators?', a: "Both are excellent. Sydney has more volume but Melbourne is widely regarded as having higher creative quality and uniqueness. Melbourne creators consistently rank among Australia's top earners in alt, artistic and fetish niches." },
      { q: 'What suburbs have the most Melbourne OnlyFans creators?', a: "Fitzroy, Collingwood, Prahran, St Kilda and South Yarra have the highest creator density. The inner north is particularly known for alternative and artistic content." },
      { q: 'Are there free Melbourne OnlyFans accounts?', a: "Yes — many Melbourne creators use free subscriptions to build their following. Filter by 'Free' in the pricing section to see all $0 Melbourne profiles." },
      { q: 'Do Melbourne creators produce content in specific styles?', a: "Melbourne has strong clusters in alt/goth, cosplay, fetish and artistic nude niches. The city's arts culture means production values are often notably high compared to national averages." },
    ],
    relatedCities: ['geelong', 'sydney', 'brisbane'],
  },
  {
    slug: 'brisbane',
    urlSlug: 'brisbane-onlyfans',
    label: 'Brisbane',
    terms: ['brisbane', 'qld', 'fortitude valley', 'west end', 'south brisbane'],
    parentState: 'queensland',
    h1: 'Best OnlyFans Creators in Brisbane',
    metaTitle: 'Best Brisbane OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: "Find Brisbane's best OnlyFans creators. Browse free and premium profiles from Australia's fastest growing city. Updated daily.",
    intro: "Brisbane is Australia's fastest-growing city and its OnlyFans creator scene is expanding just as rapidly. Once overshadowed by Sydney and Melbourne, Brisbane has developed a confident, distinct creative identity — warm, sunny, relaxed and entrepreneurially minded. The city's subtropical climate means outdoor and beach content features prominently, while the eclectic inner-city suburbs of Fortitude Valley, New Farm and West End have given rise to a strong arts-adjacent creator community with alt, LGBTQ+ and artistic content. Brisbane's relatively young population skews the creator demographic younger, and the city's proximity to both the Gold Coast and Sunshine Coast means many creators commute or shoot content across multiple locations, giving subscribers excellent variety.",
    faqs: [
      { q: "Is Brisbane's OnlyFans scene growing quickly?", a: "Yes — Brisbane is one of Australia's fastest-growing cities and its creator scene is keeping pace. The 2032 Olympics investment is driving population growth that's directly expanding the content creator economy." },
      { q: 'Are Brisbane creators different from Gold Coast creators?', a: "Brisbane creators tend to be more urban and arts-influenced, while Gold Coast creators lean toward beach and glam aesthetics. Many creators operate across both markets given the short distance between the two cities." },
      { q: 'Can I find free OnlyFans accounts from Brisbane?', a: "Yes — multiple Brisbane-based creators offer free subscription accounts. Use the Free pricing filter on this page to find them immediately." },
      { q: 'What categories are Brisbane creators strongest in?', a: "Brisbane has strong representation in fitness, amateur, outdoor/beach and LGBTQ+ niches. The city's young demographic and active outdoor culture heavily influence creator content styles." },
    ],
    relatedCities: ['gold-coast', 'sunshine-coast', 'sydney'],
  },
  {
    slug: 'perth',
    urlSlug: 'perth-onlyfans',
    label: 'Perth',
    terms: ['perth', 'wa', 'fremantle', 'cottesloe', 'subiaco'],
    parentState: 'western-australia',
    h1: 'Best OnlyFans Creators in Perth',
    metaTitle: 'Best Perth OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: "Discover Perth's top OnlyFans creators. Browse WA's best free and premium profiles from Cottesloe, Fremantle and beyond.",
    intro: "Perth is the world's most isolated major city, but its OnlyFans creators have built genuine global audiences precisely because of the unique content their city and climate enable. Perth enjoys more hours of sunshine than any other Australian capital, and creators take full advantage — beach content at Cottesloe and Scarborough, outdoor lifestyle content in Kings Park, and warm-weather content year-round. The city's strong mining and resources economy means subscribers and creators alike tend to have more disposable income than national averages, supporting a premium content market. Fremantle's artistic and bohemian energy adds a creative counterpoint to the mainstream Perth aesthetic. Perth creators are known in the fan community for being highly responsive and collaborative — the small size of the local scene drives stronger creator-to-fan relationships.",
    faqs: [
      { q: 'Why are Perth creators popular internationally?', a: "Perth's time zone (UTC+8) works well for US and European fans looking for creators active during their evening hours. The city's unique climate and landscapes also produce content visually distinct from any other Australian city." },
      { q: 'How do I find free Perth OnlyFans creators?', a: "Use the Pricing filter on this page and select 'Free' to display all Perth creators with zero subscription cost. Several Perth creators run free accounts with premium pay-per-view options." },
      { q: 'Do Perth creators offer bundles?', a: "Yes — Perth's competitive creator market means bundle and promotional pricing is common. Individual creator cards in our directory show bundle pricing where available." },
      { q: 'What content niches are Perth creators known for?', a: "Perth creators are particularly strong in outdoor, beach, fitness and lifestyle content. The city's climate and natural assets — particularly its spectacular beaches — are a constant presence in Perth creator content." },
    ],
    relatedCities: ['adelaide'],
    relatedStates: ['western-australia', 'south-australia'],
  },
  {
    slug: 'gold-coast',
    urlSlug: 'gold-coast-onlyfans',
    label: 'Gold Coast',
    terms: ['gold coast', 'surfers paradise', 'broadbeach', 'burleigh', 'coolangatta'],
    parentState: 'queensland',
    h1: 'Best OnlyFans Creators on the Gold Coast',
    metaTitle: 'Best Gold Coast OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Find the hottest Gold Coast OnlyFans creators from Surfers Paradise, Burleigh and Broadbeach. Updated daily.',
    intro: "The Gold Coast is arguably Australia's OnlyFans content factory. The combination of world-class beaches, year-round sunshine, a highly photogenic environment and a culture that celebrates body confidence and lifestyle flexing has made the Gold Coast a magnet for serious full-time creators. Surfers Paradise, Burleigh Heads and Broadbeach are particularly dense with creators who have invested in professional camera equipment, lighting and post-production. The Gold Coast also benefits from strong tourism infrastructure — photo-ready locations are literally everywhere. International fans describe Gold Coast content as having a distinct premium polish while retaining a genuinely Australian character. The city has a higher proportion of full-time creators (as opposed to part-time side-hustlers) than any other Australian city, which means more consistent posting schedules and faster DM response times.",
    faqs: [
      { q: 'Is the Gold Coast the best place in Australia for OnlyFans content?', a: "The Gold Coast is consistently ranked among Australia's top cities for creator volume and content quality. The climate, beaches and culture create perfect conditions for full-time content creation." },
      { q: 'What are the most popular Gold Coast OnlyFans niches?', a: "Beach, bikini, fitness, glamour and lifestyle are the dominant niches. Gold Coast creators are also among Australia's leaders in professional-quality photography and videography." },
      { q: 'How do I find free Gold Coast OnlyFans accounts?', a: "Apply the Free pricing filter on this page. Even on the Gold Coast where premium content is the norm, many creators use free subscriptions to grow their initial audience." },
      { q: 'Do Gold Coast creators offer bundle deals?', a: "Yes — the competitive Gold Coast market means many creators offer multi-month bundles at discounted rates. Check individual profile cards for current bundle pricing." },
    ],
    relatedCities: ['brisbane', 'sunshine-coast'],
  },
  {
    slug: 'adelaide',
    urlSlug: 'adelaide-onlyfans',
    label: 'Adelaide',
    terms: ['adelaide', 'sa', 'norwood', 'unley', 'glenelg'],
    parentState: 'south-australia',
    h1: 'Best OnlyFans Creators in Adelaide',
    metaTitle: 'Best Adelaide OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Discover OnlyFans creators from Adelaide and South Australia. Browse free and premium SA profiles. Updated daily.',
    intro: "Adelaide is the City of Churches by day and a surprisingly vibrant creator economy by night. The city's affordability compared to Sydney and Melbourne makes it an ideal base for creators looking to reinvest subscription earnings into content quality. Adelaide creators consistently punch above their weight — the city's strong arts and festival culture (WOMADelaide, Adelaide Fringe, the Adelaide Festival) has cultivated a creative class that brings genuine artistry to OnlyFans content. The beachside suburb of Glenelg and the hip streets of Norwood and Unley are particularly well-represented in our Adelaide directory. If you're looking for creators who are accessible, responsive and genuinely passionate about their work rather than just running it as a business, Adelaide has some of Australia's best.",
    faqs: [
      { q: 'How popular is OnlyFans among Adelaide creators?', a: "Adelaide has a growing and enthusiastic creator community. The city's arts culture and university population have driven steady growth in premium content creation over the past few years." },
      { q: 'Can I find alt/goth creators from Adelaide?', a: "Yes — Adelaide has strong representation in alt, goth and cosplay niches thanks to its arts festival culture. Use the Style filter to find these creators specifically." },
      { q: 'Are there free Adelaide OnlyFans accounts?', a: "Multiple Adelaide creators offer free subscriptions. Use the Pricing filter to find them, and look out for promotional pricing during Adelaide's major festival seasons." },
      { q: "What is Adelaide's creator demographic like?", a: "Adelaide creators skew slightly older on average than east coast cities, and tend toward more creative and niche content rather than mainstream glamour. The result is a more varied and interesting creator landscape." },
    ],
    relatedCities: ['sydney', 'melbourne', 'perth'],
  },
  {
    slug: 'sunshine-coast',
    urlSlug: 'sunshine-coast-onlyfans',
    label: 'Sunshine Coast',
    terms: ['sunshine coast', 'noosa', 'maroochydore', 'caloundra', 'buderim'],
    parentState: 'queensland',
    h1: 'Best OnlyFans Creators on the Sunshine Coast',
    metaTitle: 'Best Sunshine Coast OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Find OnlyFans creators from the Sunshine Coast, Noosa and surrounding areas. Browse free and premium QLD profiles.',
    intro: "The Sunshine Coast offers a gentler, more bohemian alternative to the Gold Coast's glam intensity. Stretching from Caloundra in the south to Noosa in the north, the Sunshine Coast attracts creators who value natural beauty, wellness culture and authentic connection with their fans. Noosa in particular — one of Australia's most desirable lifestyle destinations — has become a hub for high-quality creator content with a strong wellness and luxury lifestyle aesthetic. The Sunshine Coast Hinterland adds dramatic rainforest scenery that gives creators a point of visual difference from every other Australian creator market. Subscribers who find Gold Coast content too polished and Sydney content too urban often discover their favourite Australian creators on the Sunshine Coast.",
    faqs: [
      { q: 'How does Sunshine Coast OnlyFans content differ from Gold Coast?', a: "Sunshine Coast content tends to be more natural, wellness-focused and bohemian compared to the Gold Coast's glam-heavy aesthetic. Noosa in particular attracts a luxury lifestyle creator demographic." },
      { q: 'Are there free Sunshine Coast OnlyFans creators?', a: "Yes — use the Free pricing filter to find $0 subscription accounts from the Sunshine Coast. Many creators in this region use free tiers to build organic audiences." },
      { q: 'What areas of the Sunshine Coast have the most creators?', a: "Noosa, Maroochydore and Kawana Waters have the highest creator density. Noosa's premium lifestyle credentials attract full-time creators specifically." },
      { q: 'Can I find couples or duo content from Sunshine Coast creators?', a: "Yes — use the Gender filter and select Couple to filter for couples-created content. The Sunshine Coast has a higher-than-average proportion of couples content creators." },
    ],
    relatedCities: ['brisbane', 'gold-coast'],
  },
  {
    slug: 'newcastle',
    urlSlug: 'newcastle-onlyfans',
    label: 'Newcastle',
    terms: ['newcastle', 'newcastle nsw', 'merewether', 'hunter valley'],
    parentState: 'new-south-wales',
    h1: 'Best OnlyFans Creators in Newcastle, NSW',
    metaTitle: 'Best Newcastle NSW OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Browse OnlyFans creators from Newcastle, NSW. Find local free and premium profiles from the Hunter region.',
    intro: "Newcastle, NSW — not to be confused with its English namesake — is a former industrial city that has reinvented itself as one of Australia's most liveable and creatively vibrant regional centres. Its spectacular beaches (Merewether and Newcastle Beach rank among NSW's best), affordable housing and proximity to Sydney have made it attractive to young creatives including OnlyFans creators who've priced out of the capital. The Hunter Valley wine region nearby adds a sophisticated content backdrop, while the city's surf culture provides the same beach aesthetics as Sydney at a fraction of the competition. Newcastle creators tend to be deeply engaged with their local community while building national and international subscriber bases.",
    faqs: [
      { q: 'Are there many OnlyFans creators in Newcastle NSW?', a: "Newcastle has a growing creator community driven largely by young creatives priced out of Sydney. The city's beach culture and affordability make it an increasingly attractive base for content creation." },
      { q: 'How far is Newcastle from Sydney?', a: "Newcastle is about 160km north of Sydney — a 2-hour drive or 3-hour train journey. This proximity to Australia's largest city influences the city's culture and creator demographics significantly." },
      { q: 'Can I find free Newcastle OnlyFans accounts?', a: "Yes. Use the Pricing filter to display Newcastle creators with free subscriptions. Many emerging Newcastle creators start with free accounts to build their initial audience." },
      { q: 'What is Newcastle creator content like?', a: "Newcastle content often blends surf/beach lifestyle with a grittier urban character that reflects the city's working-class heritage. It's authentic, engaging and less polished than Sydney — which fans often prefer." },
    ],
    relatedCities: ['sydney', 'wollongong'],
  },
  {
    slug: 'wollongong',
    urlSlug: 'wollongong-onlyfans',
    label: 'Wollongong',
    terms: ['wollongong', 'wollongong nsw', 'illawarra', 'wollongong university'],
    parentState: 'new-south-wales',
    h1: 'Best OnlyFans Creators in Wollongong',
    metaTitle: 'Best Wollongong OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Discover OnlyFans creators from Wollongong and the Illawarra region. Browse NSW south coast free and premium profiles.',
    intro: "Wollongong sits between Sydney and the NSW South Coast, offering creators a unique blend of urban accessibility and coastal beauty. The city's large University of Wollongong student population creates a constantly refreshing pool of new creators, while the five-escarpment backdrop to the west and the Pacific Ocean to the east give content a visually striking quality that's hard to replicate. The Sea Cliff Bridge, Nan Tien Temple and numerous pristine beaches provide extraordinary backdrop variety for location-based content shoots. Wollongong creators benefit from being close enough to Sydney for collaboration but affordable enough to keep operational costs manageable — an ideal combination for growing a sustainable creator business.",
    faqs: [
      { q: 'Are there OnlyFans creators from Wollongong?', a: "Yes — Wollongong's university population and coastal lifestyle have produced a solid creator community. The city's affordability compared to Sydney makes it attractive for emerging creators." },
      { q: 'What is special about Wollongong creator content?', a: "Wollongong's dramatic escarpment-meets-ocean geography produces visually distinctive content. Creators frequently use the Sea Cliff Bridge, beachside suburbs and rainforest hinterland as unique backdrops." },
      { q: 'Can I find student creators from Wollongong?', a: "Yes — UOW's large student body contributes meaningfully to the local creator scene. The age and orientation filters can help you find exactly what you're looking for." },
      { q: 'Are there free OnlyFans accounts from Wollongong?', a: "Yes. Apply the Free pricing filter to find no-cost subscriptions from the Wollongong and Illawarra area." },
    ],
    relatedCities: ['sydney', 'newcastle'],
  },
  {
    slug: 'geelong',
    urlSlug: 'geelong-onlyfans',
    label: 'Geelong',
    terms: ['geelong', 'geelong vic', 'surfcoast', 'torquay'],
    parentState: 'victoria',
    h1: 'Best OnlyFans Creators in Geelong',
    metaTitle: 'Best Geelong OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Find OnlyFans creators from Geelong and the VIC Surf Coast. Browse free and premium profiles updated daily.',
    intro: "Geelong — Victoria's second-largest city and gateway to the Surf Coast — has grown rapidly in recent years as a more affordable alternative to Melbourne. The resulting influx of young professionals and creatives has boosted the local OnlyFans scene considerably. The proximity to world-famous surf breaks at Torquay, Bells Beach and Jan Juc gives Geelong creators a beach and surf lifestyle backdrop that competes directly with the Gold Coast in appeal. The city's ongoing urban renewal, particularly around the waterfront, has rebuilt Geelong's creative confidence and this is visible in the diversity and quality of content its creators produce. For subscribers who love the Victorian aesthetic but want creators with a more coastal, outdoor vibe than Melbourne offers, Geelong is the answer.",
    faqs: [
      { q: 'Is Geelong a good place to find OnlyFans creators?', a: "Geelong has a growing creator scene driven by its expanding young population and proximity to Melbourne. The Surf Coast in particular is producing creators with a high-quality beach lifestyle aesthetic." },
      { q: 'Are there surf/beach creators from Geelong?', a: "Yes — creators near Torquay, Jan Juc and Bells Beach frequently feature surf culture and beach lifestyle in their content. Geelong and the Surf Coast have a strong outdoor creator community." },
      { q: 'How far is Geelong from Melbourne?', a: "About 75km south-west of Melbourne — roughly an hour by car or 1 hour by V/Line train. Many Geelong creators collaborate with Melbourne-based creators, expanding their content variety." },
      { q: 'Are there free Geelong OnlyFans accounts?', a: "Several Geelong creators run free subscription accounts. Use the Pricing filter to display them, alongside standard and premium options." },
    ],
    relatedCities: ['melbourne'],
  },
  {
    slug: 'canberra',
    urlSlug: 'canberra-onlyfans',
    label: 'Canberra',
    terms: ['canberra', 'act', 'australian capital territory'],
    parentState: 'australian-capital-territory',
    h1: 'Best OnlyFans Creators in Canberra',
    metaTitle: 'Best Canberra OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: "Browse OnlyFans creators from Canberra, Australia's capital. Find ACT's best free and premium profiles.",
    intro: "Canberra is a city that surprises visitors in every respect — and its OnlyFans community is no exception. Australia's purpose-built capital has shed its 'boring bureaucrat' image, driven by a young, educated professional population and the stimulating presence of both ANU and UC. Canberra's creators tend to be highly intelligent, well-produced and responsive — key traits for building loyal subscriber communities. The city's dramatic four-season climate (rare in Australia) means content variety that other creators can't easily replicate: beautiful autumn foliage in April, crisp winter atmosphere, explosive spring florals and warm summer days all within one creator's portfolio. The National Botanic Gardens, Lake Burley Griffin and the surrounding hills provide spectacular unique backdrops.",
    faqs: [
      { q: 'Does Canberra have a significant OnlyFans creator community?', a: "Canberra's creator community is smaller than major coastal cities but notable for quality. The ACT's high education levels and income create both a sophisticated creator base and a premium subscriber market." },
      { q: 'What makes Canberra OnlyFans content unique?', a: "Canberra's distinct four seasons create content variety other Australian cities lack. Autumn colour, winter atmosphere and spring florals in Capital country produce visually unique content that stands out in international feeds." },
      { q: 'Are Canberra OnlyFans creators anonymous?', a: "Many Canberra creators maintain a higher level of privacy than those in other cities, given the close-knit government/public service community. This doesn't affect content quality — Canberra creators are highly committed to their work." },
      { q: 'Can I find student creators from Canberra?', a: "Yes — ANU and UC contribute to a strong student creator segment in Canberra. The city's universities are world-class institutions that attract students from around Australia and internationally." },
    ],
    relatedCities: ['sydney', 'melbourne'],
  },
  {
    slug: 'hobart',
    urlSlug: 'hobart-onlyfans',
    label: 'Hobart',
    terms: ['hobart', 'tasmania', 'tas', 'hobart tasmania'],
    parentState: 'tasmania',
    h1: 'Best OnlyFans Creators in Hobart',
    metaTitle: 'Best Hobart OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Find OnlyFans creators from Hobart and Tasmania. Browse free and premium profiles from Australia\'s most unique southern state.',
    intro: "Hobart is Australia's most artistically distinctive small city, and its MONA-fuelled creative renaissance has had a direct impact on the local OnlyFans creator scene. Creators here are deeply influenced by the gallery's provocative, boundary-pushing aesthetic — you'll find content that is thoughtful, artistic and often genuinely transgressive in the best way. The city's compact scale means creators know each other, collaborate regularly and share audiences, creating a community feel that fans notice and appreciate. Hobart's cold, dramatic weather — so different from mainland Australia's beach fantasies — sets a visually unique mood that international fans find irresistible. If you want OnlyFans content that's genuinely different from the mainstream, Hobart creators deliver it consistently.",
    faqs: [
      { q: 'Why is Hobart known for artistic OnlyFans content?', a: "MONA (Museum of Old and New Art) and the Dark Mofo festival have cultivated a culture in Hobart that explicitly celebrates transgressive, provocative art. This directly influences local creator content styles and ambitions." },
      { q: 'Are there alt/goth creators in Hobart?', a: "Hobart has a higher percentage of alt and goth creators than its population would suggest. The city's arts culture and cool, dark aesthetic creates the perfect environment for this content style." },
      { q: 'Do Hobart creators post regularly?', a: "Despite the small market, Hobart's serious creators post consistently and prioritise fan engagement. Many consider Tasmania not just their home base but an active part of their brand identity." },
      { q: 'Can I find free OnlyFans accounts from Hobart?', a: "Several Hobart creators offer free subscription accounts. Use the Pricing filter to find them, and follow up with paid PPV content from creators who interest you." },
    ],
    relatedCities: ['melbourne', 'adelaide'],
  },
  {
    slug: 'darwin',
    urlSlug: 'darwin-onlyfans',
    label: 'Darwin',
    terms: ['darwin', 'nt', 'northern territory', 'darwin nt'],
    parentState: 'northern-territory',
    h1: 'Best OnlyFans Creators in Darwin',
    metaTitle: 'Best Darwin OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: "Browse Darwin and NT OnlyFans creators. Find Australia's tropical north's best free and premium profiles.",
    intro: "Darwin is Australia's most tropical capital and its OnlyFans scene carries that energy throughout. The city sits on the Top End — a region of spectacular wetlands, monsoon forests and ancient Indigenous culture — and its creators use this extraordinary backdrop to produce content unlike anything else in Australia. Darwin's barrier-free, adventurous culture, shaped by its frontier location and strong military presence, creates a distinctive creator demographic that values authenticity and spontaneity. The wet season (October–April) brings dramatic lightning storms and lush greenery that create visually compelling content, while the dry season's endless sunny days support beach and outdoor shooting. Darwin's small but tight-knit creator community means exceptional fan-creator rapport — you're not just a subscriber number here.",
    faqs: [
      { q: 'Is Darwin popular for OnlyFans creators?', a: "Darwin's creator community is small but distinctive. The city's tropical environment, frontier culture and multi-cultural population produce content that stands completely apart from the east coast mainstream." },
      { q: "What is Darwin's OnlyFans content like?", a: "Darwin content frequently features tropical landscapes, outdoor adventure and a raw, authentic character that reflects the NT's frontier spirit. It's genuinely unlike any other Australian creator content." },
      { q: 'Are there free OnlyFans accounts from Darwin?', a: "Yes — use the Pricing filter to find Darwin and NT creators offering free subscriptions. Given the small creator pool, these are particularly worth following for unique content." },
      { q: 'Does Darwin have a diverse creator community?', a: "Yes — Darwin is one of Australia's most multicultural cities, with strong Asian, Pacific Islander and Indigenous influences. This diversity is reflected in creator demographics to a higher degree than other Australian capitals." },
    ],
    relatedCities: ['perth', 'brisbane'],
  },
  {
    slug: 'cairns',
    urlSlug: 'cairns-onlyfans',
    label: 'Cairns',
    terms: ['cairns', 'far north queensland', 'trinity beach', 'palm cove'],
    parentState: 'queensland',
    h1: 'Best OnlyFans Creators in Cairns',
    metaTitle: 'Best Cairns OnlyFans Creators (2026) | OnlyAussieFans',
    metaDesc: 'Find OnlyFans creators from Cairns and Far North Queensland. Browse tropical QLD free and premium profiles.',
    intro: "Cairns is Australia's gateway to the Great Barrier Reef and the Daintree Rainforest, and its creators leverage these world-famous natural assets to produce some of the country's most visually remarkable content. The city sits in Far North Queensland where tropical warmth, turquoise ocean and ancient rainforest meet — a backdrop that makes every outdoor shoot extraordinary. Cairns' significant tourism economy has produced a population of confident, outgoing people accustomed to connecting with international visitors, and this translates directly into exceptional fan engagement from OnlyFans creators. The city also has a strong backpacker culture that introduces new creative talent constantly, ensuring the Cairns creator scene stays fresh and dynamic throughout the year.",
    faqs: [
      { q: 'How does Cairns differ from other Queensland creator cities?', a: "Cairns is further north and wilder — think Great Barrier Reef and ancient rainforest rather than Gold Coast high-rises. Creator content reflects this with more tropical, adventure and wilderness aesthetics." },
      { q: 'Are there free OnlyFans accounts from Cairns?', a: "Yes. Use the Pricing filter to find $0 subscription accounts from Cairns and Far North Queensland creators." },
      { q: 'Do Cairns creators produce outdoor content?', a: "Extensively. Cairns creators routinely shoot at Green Island, the Esplanade, Smithfield and across the Tablelands. The outdoor content variety is exceptional." },
      { q: 'How active are the Cairns OnlyFans creators?', a: "Cairns has a strong seasonal creator dynamic — during the dry season (May-October), creator activity increases noticeably as the weather and tourism traffic peak simultaneously." },
    ],
    relatedCities: ['brisbane', 'gold-coast'],
  },
];

export function getCityBySlug(slug: string): CityConfig | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCityByUrlSlug(urlSlug: string): CityConfig | undefined {
  return cities.find((c) => c.urlSlug === urlSlug);
}

export function getCitiesByState(stateSlug: string): CityConfig[] {
  return cities.filter((c) => c.parentState === stateSlug);
}
