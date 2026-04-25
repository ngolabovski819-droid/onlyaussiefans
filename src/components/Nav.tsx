'use client';

import { useState } from 'react';
import Link from 'next/link';
import { states } from '@/config/states';
import { popularCategories } from '@/config/categories';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Search', href: '/search' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);

  return (
    <header className="nav-wrapper">
      {/* Row 1 — logo + main links */}
      <div className="nav-row1">
        <Link href="/" className="nav-logo">
          OnlyAussieFans
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}

          {/* States dropdown */}
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setStatesOpen(true)}
            onMouseLeave={() => setStatesOpen(false)}
          >
            <button className="nav-link nav-dropdown-btn">
              States ▾
            </button>
            {statesOpen && (
              <div className="nav-dropdown">
                {states.map((s) => (
                  <Link key={s.slug} href={`/${s.urlSlug}/`} className="nav-dropdown-item">
                    <span className="nav-dropdown-abbr">{s.abbr}</span>
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Categories dropdown */}
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setCatsOpen(true)}
            onMouseLeave={() => setCatsOpen(false)}
          >
            <button className="nav-link nav-dropdown-btn">
              Categories ▾
            </button>
            {catsOpen && (
              <div className="nav-dropdown nav-dropdown--wide">
                {popularCategories.map((c) => (
                  <Link key={c.slug} href={`/categories/${c.slug}/`} className="nav-dropdown-item">
                    {c.emoji && <span>{c.emoji} </span>}
                    {c.label}
                  </Link>
                ))}
                <Link href="/categories/" className="nav-dropdown-item nav-dropdown-item--all">
                  View All Categories →
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="nav-link">Blog</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Row 2 — sticky category chips */}
      <div className="nav-chips-row">
        <div className="nav-chips-scroll">
          {popularCategories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}/`} className="nav-chip">
              {c.emoji && <span>{c.emoji}</span>}
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav-mobile">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="nav-mobile-section">States</div>
          {states.map((s) => (
            <Link key={s.slug} href={`/${s.urlSlug}/`} className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
              {s.abbr} — {s.label}
            </Link>
          ))}
          <div className="nav-mobile-section">Categories</div>
          {popularCategories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}/`} className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
              {c.emoji} {c.label}
            </Link>
          ))}
          <Link href="/blog" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>Blog</Link>
        </div>
      )}
    </header>
  );
}
