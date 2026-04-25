import { NextResponse } from 'next/server';
import { states } from '@/config/states';
import { cities } from '@/config/cities';
import { categories } from '@/config/categories';
import { getAllPosts } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

function url(path: string, priority = 0.7, freq = 'weekly'): string {
  return `<url><loc>${SITE_URL}${path}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`;
}

function buildSitemap(urls: string[]): Response {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
}

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  /** Sitemap 0: static + locations (states + cities) */
  if (id === '0') {
    const staticUrls = [
      url('/', 1.0, 'daily'),
      url('/onlyfans-search/', 0.9, 'daily'),
      url('/blog/', 0.8, 'weekly'),
      url('/about/', 0.5, 'monthly'),
      url('/privacy/', 0.3, 'monthly'),
      url('/terms/', 0.3, 'monthly'),
      url('/dmca/', 0.3, 'monthly'),
    ];
    const stateUrls = states.map(s => url(`/${s.urlSlug}/`, 0.9, 'daily'));
    const cityUrls  = cities.map(c => url(`/${c.urlSlug}/`, 0.8, 'daily'));
    return buildSitemap([...staticUrls, ...stateUrls, ...cityUrls]);
  }

  /** Sitemap 1: categories + combo pages */
  if (id === '1') {
    const catUrls = categories.map(c => url(`/categories/${c.slug}/`, 0.85, 'daily'));
    // State × popular category combos
    const popularCatSlugs = categories.filter(c => c.popular).map(c => c.slug);
    const comboUrls: string[] = [];
    for (const s of states) {
      for (const cs of popularCatSlugs) {
        comboUrls.push(url(`/${s.urlSlug}/${cs}/`, 0.7, 'weekly'));
      }
    }
    for (const c of cities) {
      for (const cs of popularCatSlugs) {
        comboUrls.push(url(`/${c.urlSlug}/${cs}/`, 0.6, 'weekly'));
      }
    }
    return buildSitemap([...catUrls, ...comboUrls]);
  }

  /** Sitemap 2: blog posts */
  if (id === '2') {
    const posts = getAllPosts();
    const blogUrls = posts.map(p => url(`/blog/${p.slug}/`, 0.7, 'weekly'));
    return buildSitemap(blogUrls.length ? blogUrls : [url('/blog/', 0.7, 'weekly')]);
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
