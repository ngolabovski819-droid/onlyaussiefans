import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';

export const metadata: Metadata = {
  title: 'Blog — Australian OnlyFans Tips & Guides',
  description: 'Tips, guides and news about Australian OnlyFans creators. Find advice on subscribing, discovering creators, and making the most of your experience.',
  alternates: { canonical: `${SITE_URL}/blog/` },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="page-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
        Blog
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
        Guides, tips and news about Australian OnlyFans creators.
      </p>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>Blog posts coming soon — check back shortly.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="blog-card" style={{ textDecoration: 'none' }}>
              <div className="blog-card-body">
                <p className="blog-card-date">{new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
