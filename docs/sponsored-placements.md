# Sponsored placement onboarding

`src/config/sponsors.ts` is the source of truth for placement positions,
tracking links, card labels, search placements, and galleries.

1. Check each username in the shared Supabase `onlyfans_profiles` table,
   including a case-insensitive lookup for missing exact matches. Missing
   profiles are omitted from the grid. Use the existing `onlyfans-scraper`
   workflow to fetch and import them; do not invent prices or profile details.
   Run a small scrape in its own working directory so its `temp.csv` and
   `progress_urls.json` cannot overwrite the main scraper's progress.
2. Inspect the supplied photo batch and confirm ambiguous ordering. Sort
   numbered filenames numerically (1, 2, ..., 10), hash files to remove exact
   duplicates, and retain the first occurrence. Use Sharp with
   `.rotate().resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })`
   and `.jpeg({ quality: 82, mozjpeg: true })`. Store sequentially named files
   in `public/uploads/sponsors/<username>/`.
3. Add a campaign with the exact tracking URL in `linkOverride` and a unique,
   one-based grid `position`. Use `imageOverride` for the first supplied photo
   and `galleryImages` for the remaining photos. Labels such as "a, b +4"
   become `tags: ['A', 'B']` and `additionalTagCount: 4`.
4. Use `scopes: ['sitewide']` for the established home, search, category,
   state/city, and location/category coverage. Existing category exceptions
   still apply: `hideSitewideSponsors` excludes these campaigns on the men's
   category. Organic creators fill unreserved positions. Leave existing
   campaign positions unchanged unless a reshuffle is requested.
5. Set `searchDropdown` explicitly. When search inclusion is requested at a
   different position, use `searchPosition` for its one-based dropdown slot.
   This inserts the campaign without changing its grid position or the
   relative order of the other search sponsors. An out-of-range search slot
   appends at the end; use unique, positive integer search slots.
6. Set `clickTable` to `sponsor_clicks_oaussief_<username>` and prepare the next
   SQL migration. Copy the full schema from a recent migration, including
   `ip_hash`, `is_datacenter_ip`, `link_verified`, `ip_address`, `country`,
   `city`, and `botid_flagged`, plus timestamp and IP-hash indexes.
   Nick runs this migration manually in the shared Supabase SQL editor before
   release. Do not assume redirect success proves click storage is working.
7. Keep the initial grid count and its `CreatorGrid` `pageSize` equal. The
   homepage uses 24 for both. `fetchSponsoredPage` preserves global placement
   positions across Load More and excludes sponsors from the organic stream.
8. Verify locally: all requested positions and labels, image order and
   carousel wraparound, search-dropdown order, exact redirect destinations,
   and Load More without duplicate or skipped organic creators. Use a bot
   user agent for redirect checks to avoid recording test clicks. Run lint,
   TypeScript, and a production build. Open localhost for review and wait for
   explicit release approval before committing/pushing/deploying.

The homepage starts each gallery at its supplied cover. Other grid scopes
deliberately rotate to another gallery image using `getScopeImageOffset` in
`CreatorCard.tsx`; the search dropdown always shows the cover. Increment the
preview URL version in `src/lib/sponsorPreview.ts` when search placements change.

## Batch prepared on 2026-10-25

| Username | Grid position | Search-dropdown position | Photos |
| --- | ---: | ---: | ---: |
| emillyybrown | 13 | — | 11 |
| lillyylou | 18 | — | 7 |
| itsgiastar | 19 | 2 | 12 |
| aprilcollinsss | 20 | — | 4 |
| ellaajanee | 22 | — | 4 |
| gracieharper | 24 | — | 6 |

All six missing profiles were fetched and imported into the shared profile
table. Photo order follows natural filenames, with Emily's file ending
`at 1.jpeg` first, as confirmed by Nick. No exact duplicate photos were found.
The six click tables are defined in
`supabase-migrations/018_six_sponsor_click_tables.sql`. All six tables and their
required reporting columns were verified present in Supabase on 2026-10-25,
after Nick approved the production release.

Local validation for this batch:

- Confirmed 24 initial cards and all six requested positions on the homepage,
  a state page, a city page, a category, a state/category page, and search.
- Confirmed all 44 supplied images load in gallery order and wrap correctly;
  Gia is second in the search dropdown on desktop and mobile.
- Confirmed homepage Load More requests 24 and reaches 48 distinct creators,
  preserving the organic sequence; the men's-category exclusion still works.
- Confirmed all six `/go/` routes return the supplied tracking URLs. Bot user
  agents prevented these checks from recording test clicks. Table/schema
  readiness was verified before release; these checks do not test click writes.
- TypeScript and lint for changed source files pass. The production build
  passes with `npm run build -- --webpack`. The default Turbopack build fails
  resolving the existing Syne Google font; full-repository lint reports five
  existing `AgeGate.tsx` errors. These files were not changed in this batch.
- A browser console warning shows the existing `SponsoredLinkTokenizer`
  setting `data-token-applied` on links before their React hydration completes.
  No browser runtime exceptions were observed during the placement checks.
