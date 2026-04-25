import Link from 'next/link';
import { states } from '@/config/states';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-code">404</div>
      <h1>Page Not Found</h1>
      <p>This creator or page doesn&apos;t exist. Try browsing by state:</p>
      <div className="not-found-states">
        {states.map(s => (
          <Link key={s.slug} href={`/${s.urlSlug}/`} className="location-chip location-chip--state">
            {s.label}
          </Link>
        ))}
      </div>
      <Link href="/" className="btn btn--primary">Back to Home</Link>
    </div>
  );
}
