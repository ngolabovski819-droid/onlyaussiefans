import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search', '/api/'],
      },
    ],
    sitemap: [`${base}/sitemap/0`, `${base}/sitemap/1`, `${base}/sitemap/2`],
  };
}
