import Link from 'next/link';
import { states } from '@/config/states';
import { cities } from '@/config/cities';
import { popularCategories } from '@/config/categories';

interface Props {
  mode: 'state-to-cities' | 'city-to-siblings' | 'state-chips' | 'category-in-states';
  stateSlug?: string;
  citySlug?: string;
  categorySlug?: string;
  stateLabel?: string;
  categoryLabel?: string;
  currentSlug?: string;
  parentStateLabel?: string;
  parentStateUrlSlug?: string;
}

export default function RelatedLocations({ mode, stateSlug, citySlug, categorySlug }: Props) {
  if (mode === 'state-chips') {
    return (
      <div className="related-chips-wrap">
        <h2 className="related-chips-heading">Browse by State</h2>
        <div className="chips-row">
          {states.map((s) => (
            <Link key={s.slug} href={`/${s.urlSlug}/`} className="location-chip">
              {s.abbr} — {s.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'state-to-cities' && stateSlug) {
    const stateCities = cities.filter((c) => c.parentState === stateSlug);
    if (!stateCities.length) return null;
    return (
      <div className="related-chips-wrap">
        <h2 className="related-chips-heading">Browse Cities in This State</h2>
        <div className="chips-row">
          {stateCities.map((c) => (
            <Link key={c.slug} href={`/${c.urlSlug}/`} className="location-chip">
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'city-to-siblings' && citySlug) {
    const city = cities.find((c) => c.slug === citySlug);
    if (!city) return null;
    const parent = states.find((s) => s.slug === city.parentState);
    const siblings = city.relatedCities
      .map((s) => cities.find((c) => c.slug === s))
      .filter(Boolean) as typeof cities;

    return (
      <div className="related-chips-wrap">
        {parent && (
          <>
            <h2 className="related-chips-heading">Browse {parent.label}</h2>
            <div className="chips-row" style={{ marginBottom: '0.75rem' }}>
              <Link href={`/${parent.urlSlug}/`} className="location-chip location-chip--state">
                All {parent.label} ({parent.abbr})
              </Link>
            </div>
          </>
        )}
        {siblings.length > 0 && (
          <>
            <h3 className="related-chips-subheading">Related Cities</h3>
            <div className="chips-row">
              {siblings.map((c) => (
                <Link key={c.slug} href={`/${c.urlSlug}/`} className="location-chip">
                  {c.label}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  if (mode === 'category-in-states' && categorySlug) {
    return (
      <div className="related-chips-wrap">
        <h2 className="related-chips-heading">Browse by State</h2>
        <p className="related-chips-desc">Find {categorySlug.replace(/-/g, ' ')} creators in your state:</p>
        <div className="chips-row">
          {states.map((s) => (
            <Link key={s.slug} href={`/${s.urlSlug}/${categorySlug}/`} className="location-chip">
              {s.abbr} {categorySlug}
            </Link>
          ))}
        </div>
        <div className="chips-row" style={{ marginTop: '0.75rem' }}>
          <h3 className="related-chips-subheading">Other Categories</h3>
          {popularCategories
            .filter((c) => c.slug !== categorySlug)
            .slice(0, 8)
            .map((c) => (
              <Link key={c.slug} href={`/categories/${c.slug}/`} className="category-chip">
                {c.label}
              </Link>
            ))}
        </div>
      </div>
    );
  }

  return null;
}
