import type { Metadata } from 'next';
import Link from 'next/link';
import StatsBar from '@/components/StatsBar';
import FAQ from '@/components/FAQ';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onlyaussiefans.com';
const FORM_URL = 'https://tally.so/r/kd16Xe';

export const metadata: Metadata = {
  title: 'Promote Your OnlyFans in Australia — Get Real Aussie Subscribers',
  description:
    'Feature your OnlyFans profile on OnlyAussieFans and reach Aussie fans actively searching Google. High-intent Australian SEO traffic that converts. Go live in 24 hours.',
  alternates: { canonical: `${SITE_URL}/promote/` },
  openGraph: {
    title: 'Promote Your OnlyFans on OnlyAussieFans',
    description:
      'Get your profile in front of Australian fans searching Google right now. Real traffic, real subscribers, no password required.',
    url: `${SITE_URL}/promote/`,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

const STEPS = [
  {
    n: '1',
    title: 'Submit Your Profile',
    body: 'Send us your OnlyFans username plus the states, cities and categories you want to be featured in. Every submission is reviewed before it goes live.',
  },
  {
    n: '2',
    title: 'We Optimise Your Listing',
    body: 'Our team places your profile for maximum visibility — the right categories, the right Aussie search terms, and the pages already ranking on page one of Google Australia.',
  },
  {
    n: '3',
    title: 'Go Live in 24 Hours',
    body: 'Your profile is live on OnlyAussieFans within 24 hours. You start appearing in front of Australian fans searching for creators like you straight away.',
  },
  {
    n: '4',
    title: 'Watch Your Subs Grow',
    body: 'Fans find your profile through Google, click through, and subscribe. Track it all in your own OnlyFans analytics — no extra tools, no dashboards to learn.',
  },
];

const WHY_CARDS = [
  {
    icon: '🎯',
    title: 'High-Intent Aussie Fans',
    body: 'Someone typing "Melbourne OnlyFans" or "best Aussie OnlyFans" into Google is not casually scrolling a feed. They are looking for a local creator to subscribe to right now.',
  },
  {
    icon: '📈',
    title: 'Traffic That Does Not Die',
    body: 'A viral post spikes then disappears. Search traffic is steady month after month — your listing keeps delivering new Australian fans without any ongoing effort from you.',
  },
  {
    icon: '🛡️',
    title: '100% Safe & Compliant',
    body: 'We never touch your OnlyFans account. We feature your public profile on our directory pages, the same way any editorial recommendation site would. No ToS risk, no bots.',
  },
  {
    icon: '💳',
    title: 'Fans Who Actually Pay',
    body: 'Australian subscribers spend more per month, renew at higher rates and engage more in DMs than cheap international traffic. Quality over vanity numbers.',
  },
  {
    icon: '📍',
    title: 'State, City & Niche Targeting',
    body: 'We organise by state, city and category — NSW, QLD, VIC, Sydney, Melbourne, Brisbane, Perth and every niche in between. Your profile reaches exactly the right audience.',
  },
  {
    icon: '⏰',
    title: 'Zero Ongoing Work',
    body: 'Keep posting to OnlyFans as normal. We handle the promotion. Your listing runs 24/7 without you needing to grind social media every single day.',
  },
];

const CAMPAIGNS = [
  { fans: 300, maxFans: 300, subs: 47, chats: 156, revenue: 10591, gain: 21,  spend: 450, added: 300, arpu: '$35.30', romi: '1,946%', ago: '5m 27s' },
  { fans: 300, maxFans: 300, subs: 47, chats: 134, revenue: 10477, gain: 0,   spend: 405, added: 300, arpu: '$34.92', romi: '2,111%', ago: '17m 54s' },
  { fans: 200, maxFans: 200, subs: 14, chats: 51,  revenue: 3042,  gain: 0,   spend: 300, added: 200, arpu: '$15.21', romi: '805%',   ago: '23m 53s' },
  { fans: 100, maxFans: 100, subs: 5,  chats: 22,  revenue: 1515,  gain: 0,   spend: 150, added: 100, arpu: '$15.15', romi: '763%',   ago: '39m 53s' },
  { fans: 300, maxFans: 300, subs: 24, chats: 190, revenue: 2706,  gain: 240, spend: 450, added: 300, arpu: '$9.02',  romi: '423%',   ago: '1h 6m' },
  { fans: 201, maxFans: 200, subs: 19, chats: 88,  revenue: 1484,  gain: 0,   spend: 300, added: 200, arpu: '$7.38',  romi: '312%',   ago: '17m 57s' },
];

const FAQS = [
  {
    q: 'Is it safe? Will this breach the OnlyFans Terms of Service?',
    a: 'Completely safe. OnlyAussieFans is an independent directory. We feature your public OnlyFans profile on our pages, the same way any editorial recommendation site or magazine would. We never access your account, never touch your login details, and never use bots. Fans discover you through our site, then choose to subscribe on their own.',
  },
  {
    q: 'Do I need to give you my OnlyFans password?',
    a: 'Never. All we need is your public OnlyFans username. Your account credentials stay entirely private and under your control at all times.',
  },
  {
    q: 'Do I have to be based in Australia?',
    a: 'OnlyAussieFans is an Australian directory, so our audience is overwhelmingly Australian and New Zealand fans searching for local creators. You do not need to physically live in Australia, but Aussie and NZ creators — or creators with a strong Australian angle — get the best results here, because that is what our visitors are searching for.',
  },
  {
    q: 'How quickly will I go live?',
    a: 'Most profiles are live within 24 hours of payment and a quick onboarding chat. We verify your profile, choose the best states, cities and categories to target, and publish your listing.',
  },
  {
    q: 'How is this different from buying fake followers?',
    a: 'Completely different. Fake follower services deliver bot accounts that never spend a cent. OnlyAussieFans drives real people from Google search to your OnlyFans page. These are genuine Australian fans with intent to subscribe, not inflated numbers.',
  },
  {
    q: 'Can agencies promote multiple creators?',
    a: 'Yes. Many of our partners are agencies managing multiple creator accounts. We offer bulk pricing, a dedicated account manager and unified reporting. Get in touch through the form for a custom quote.',
  },
  {
    q: 'Which locations and categories does OnlyAussieFans cover?',
    a: 'We cover every Australian state and territory, all major cities including Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Hobart, Darwin and the Gold Coast, plus hundreds of categories from fitness and cosplay to MILF and free OnlyFans. Whatever your niche, we have pages already ranking for it.',
  },
  {
    q: 'What results can I expect?',
    a: 'Results vary based on your niche, content quality, pricing and how you engage. Creators with a well-optimised profile and a solid content library see the fastest growth. We recommend having at least 20 posts live before your listing goes up.',
  },
];

export default function PromotePage() {
  return (
    <>
      <div className="promo-crumb-wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Promote Your Page</span>
        </nav>
      </div>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="promo-hero">
        <div className="promo-hero-inner">
          <div className="hero-eyebrow">For Creators &amp; Agencies</div>
          <h1 className="promo-hero-title">
            Promote Your OnlyFans and Get{' '}
            <span className="hero-title-gradient">Real Aussie Fans</span> from Google
          </h1>
          <p className="promo-hero-sub">
            OnlyAussieFans is where Australian fans go looking for local creators. Get your profile
            featured in front of a high-intent audience that is already searching — and ready to
            subscribe.
          </p>
          <div className="promo-cta-wrap">
            <div className="promo-urgency">
              <span className="promo-dot" /> 3 spots left this week — filling fast
            </div>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="promo-cta">
              🚀 Claim Your Spot — Go Live in 24h
            </a>
            <p className="promo-hero-note">
              No password required &nbsp;·&nbsp; Free to apply &nbsp;·&nbsp; Real Australian traffic
            </p>
          </div>
        </div>
      </section>

      <StatsBar
        stats={[
          { value: '20,000+', label: 'Aussie Creators' },
          { value: '100%', label: 'Australian Traffic' },
          { value: 'Top 3', label: 'Google AU Rankings' },
          { value: '24h', label: 'To Go Live' },
        ]}
      />

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section className="promo-section">
        <div className="promo-inner">
          <div className="promo-eyebrow-sm">Simple Process</div>
          <h2 className="promo-section-title">How Promoting on OnlyAussieFans Works</h2>
          <p className="promo-section-lead">
            Getting your profile in front of motivated Aussie fans takes less than 24 hours. No
            technical setup, no passwords — just results.
          </p>
          <div className="promo-steps-grid">
            {STEPS.map((s) => (
              <div key={s.n} className="promo-step-card">
                <div className="promo-step-num">{s.n}</div>
                <div className="promo-step-title">{s.title}</div>
                <div className="promo-step-body">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS ─────────────────────────── */}
      <section className="promo-section promo-section-alt">
        <div className="promo-inner">
          <div className="promo-eyebrow-sm">Why It Works</div>
          <h2 className="promo-section-title">Why Search Traffic Beats Social Media</h2>
          <p className="promo-section-lead">
            Not all traffic is equal. Fans who find you through Google are actively hunting for a
            creator to subscribe to — they already have their wallet out.
          </p>
          <div className="promo-why-grid">
            {WHY_CARDS.map((w) => (
              <div key={w.title} className="promo-why-card">
                <div className="promo-why-icon" aria-hidden="true">{w.icon}</div>
                <div>
                  <div className="promo-why-title">{w.title}</div>
                  <div className="promo-why-body">{w.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────── */}
      <section className="promo-section">
        <div className="promo-inner">
          <div className="promo-eyebrow-sm">Traffic Comparison</div>
          <h2 className="promo-section-title">OnlyAussieFans vs Other Promo Channels</h2>
          <p className="promo-section-lead">
            How Australian search traffic stacks up against the channels most creators default to.
          </p>
          <div className="promo-table-wrap">
            <table className="promo-table">
              <thead>
                <tr>
                  <th>Channel</th>
                  <th>Subscriber Conversion</th>
                  <th>Fan Spend Quality</th>
                  <th>Consistency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="promo-table-hl">
                  <td><strong>OnlyAussieFans SEO</strong></td>
                  <td><span className="promo-tag-good">25–35%</span></td>
                  <td><span className="promo-tag-good">High — long retention</span></td>
                  <td><span className="promo-tag-good">Consistent monthly</span></td>
                </tr>
                <tr>
                  <td>Reddit Promotion</td>
                  <td><span className="promo-tag-mid">5–15%</span></td>
                  <td><span className="promo-tag-mid">Mixed, often freebie hunters</span></td>
                  <td><span className="promo-tag-mid">Spiky, short-lived</span></td>
                </tr>
                <tr>
                  <td>Twitter / X Drops</td>
                  <td><span className="promo-tag-bad">3–10%</span></td>
                  <td><span className="promo-tag-bad">Low spend, high churn</span></td>
                  <td><span className="promo-tag-bad">Days to weeks</span></td>
                </tr>
                <tr>
                  <td>Instagram Shoutouts</td>
                  <td><span className="promo-tag-mid">5–12%</span></td>
                  <td><span className="promo-tag-mid">Moderate spend</span></td>
                  <td><span className="promo-tag-mid">Weeks only</span></td>
                </tr>
                <tr>
                  <td>Bought Followers</td>
                  <td><span className="promo-tag-bad">0%</span></td>
                  <td><span className="promo-tag-bad">Bots — zero spend</span></td>
                  <td><span className="promo-tag-bad">Negative ROI</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── LIVE CAMPAIGN FEED ───────────────────── */}
      <section className="promo-section promo-section-alt">
        <div className="promo-inner">
          <div className="promo-eyebrow-sm">Proof It Works</div>
          <h2 className="promo-section-title">Live Campaign Feed</h2>
          <p className="promo-section-lead">
            Updated in real time — exactly what our partners are seeing: fans gained, revenue and
            ROMI. All figures in AUD.
          </p>
          <div className="promo-feed">
            {CAMPAIGNS.map((c, i) => {
              const pct = Math.min(Math.round((c.fans / c.maxFans) * 100), 100);
              return (
                <div key={i} className="promo-feed-card">
                  <div className="promo-feed-bar-wrap">
                    <div className="promo-feed-bar-fill" style={{ width: `${pct}%` }} />
                    <div className="promo-feed-bar-lbl">{c.fans} / {c.maxFans} fans</div>
                  </div>
                  <div className="promo-feed-stats">
                    <span className="promo-pill">👥 {c.fans}</span>
                    <span className="promo-pill promo-pill-accent">✅ {c.subs} 💬 {c.chats}</span>
                    <span className="promo-pill">
                      ✉️ ${c.revenue.toLocaleString()}
                      {c.gain > 0 && <span className="promo-gain"> +${c.gain}</span>}
                    </span>
                    <span className="promo-pill promo-pill-green">💵 ${c.spend.toFixed(2)}</span>
                    <span className="promo-pill">⬆️ +{c.added}</span>
                  </div>
                  <div className="promo-feed-metrics">
                    <div>
                      <div className="promo-mlabel">ARPU</div>
                      <div className="promo-mval">{c.arpu}</div>
                    </div>
                    <div>
                      <div className="promo-mlabel">ROMI</div>
                      <div className="promo-mromi">{c.romi}</div>
                    </div>
                    <div className="promo-mago">🔄 {c.ago} ago</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="promo-mid-cta">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="promo-cta">
              🚀 Start Your Campaign
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className="promo-section">
        <div className="promo-inner promo-faq-wrap">
          <div className="promo-eyebrow-sm">FAQ</div>
          <FAQ faqs={FAQS} />
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────── */}
      <section className="promo-bottom-cta">
        <div className="promo-bottom-inner">
          <h2>Ready to Grow Your OnlyFans?</h2>
          <p>
            Join the Aussie creators already getting discovered by high-intent fans on
            OnlyAussieFans every single day.
          </p>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="promo-bottom-btn">
            🚀 Get Featured Today
          </a>
        </div>
      </section>

      <style>{`
        .promo-crumb-wrap{max-width:1100px;margin:0 auto;padding:1rem 1.5rem 0}

        /* HERO */
        .promo-hero{position:relative;overflow:hidden;padding:4.5rem 1.5rem 4rem;text-align:center;border-bottom:1px solid var(--border-subtle)}
        .promo-hero::before{content:'';position:absolute;top:-45%;left:50%;transform:translateX(-50%);width:min(1100px,140%);height:140%;background:radial-gradient(circle at 35% 40%,rgba(124,58,237,0.30),transparent 62%),radial-gradient(circle at 68% 55%,rgba(236,72,153,0.22),transparent 60%);pointer-events:none}
        .promo-hero-inner{position:relative;max-width:820px;margin:0 auto}
        .promo-hero-title{font-size:clamp(2rem,5vw,3.4rem);line-height:1.1;margin-bottom:1.1rem}
        .promo-hero-sub{font-size:clamp(1rem,2vw,1.15rem);color:var(--text-muted);max-width:660px;margin:0 auto 2.25rem;line-height:1.7}
        .promo-cta-wrap{display:flex;flex-direction:column;align-items:center;gap:0.85rem}
        .promo-urgency{display:inline-flex;align-items:center;gap:0.45rem;background:var(--surface-raised);border:1px solid var(--border);border-radius:50px;padding:0.35rem 0.9rem;font-size:0.75rem;font-weight:700;letter-spacing:0.04em;color:var(--text)}
        .promo-dot{width:8px;height:8px;border-radius:50%;background:var(--accent-pink);box-shadow:0 0 8px var(--accent-pink);flex-shrink:0;animation:promoBlink 1.8s ease-in-out infinite}
        @keyframes promoBlink{0%,100%{opacity:1}50%{opacity:0.35}}
        @keyframes promoPulse{0%,100%{box-shadow:0 10px 34px var(--accent-glow),0 0 0 0 rgba(236,72,153,0.45)}60%{box-shadow:0 10px 34px var(--accent-glow),0 0 0 16px rgba(236,72,153,0)}}
        .promo-cta{display:inline-flex;align-items:center;gap:0.6rem;background:var(--accent-gradient);color:#fff;border-radius:50px;padding:1rem 2.4rem;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;letter-spacing:0.01em;box-shadow:0 10px 34px var(--accent-glow);animation:promoPulse 2.4s infinite;transition:transform 0.2s,box-shadow 0.2s}
        .promo-cta:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 16px 46px var(--accent-glow);animation:none}
        .promo-hero-note{font-size:0.8rem;color:var(--text-muted)}

        /* SECTIONS */
        .promo-section{padding:4.5rem 1.5rem}
        .promo-section-alt{background:var(--surface);border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle)}
        .promo-inner{max-width:1100px;margin:0 auto}
        .promo-eyebrow-sm{font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent-light);margin-bottom:0.6rem}
        .promo-section-title{font-size:clamp(1.5rem,3.5vw,2.35rem);margin-bottom:0.85rem}
        .promo-section-lead{font-size:1rem;color:var(--text-muted);line-height:1.75;max-width:680px;margin-bottom:2.75rem}

        /* STEPS */
        .promo-steps-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1.5rem}
        .promo-step-card{background:var(--surface);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:1.75rem 1.5rem;transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s}
        .promo-section-alt .promo-step-card{background:var(--surface-raised)}
        .promo-step-card:hover{transform:translateY(-4px);border-color:var(--border);box-shadow:0 10px 34px var(--accent-glow)}
        .promo-step-num{width:42px;height:42px;border-radius:var(--radius);background:var(--accent-gradient);color:#fff;font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:1.1rem}
        .promo-step-title{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-bottom:0.55rem}
        .promo-step-body{font-size:0.875rem;color:var(--text-muted);line-height:1.7}

        /* WHY CARDS */
        .promo-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:1.25rem}
        .promo-why-card{background:var(--surface-raised);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:1.6rem 1.4rem;display:flex;gap:1.1rem;align-items:flex-start;transition:border-color 0.2s,box-shadow 0.2s}
        .promo-why-card:hover{border-color:var(--border);box-shadow:0 8px 28px var(--accent-glow)}
        .promo-why-icon{width:46px;height:46px;border-radius:var(--radius);background:var(--accent-gradient);font-size:1.25rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px var(--accent-glow)}
        .promo-why-title{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;margin-bottom:0.4rem}
        .promo-why-body{font-size:0.875rem;color:var(--text-muted);line-height:1.65}

        /* TABLE */
        .promo-table-wrap{overflow-x:auto;border:1px solid var(--border-subtle);border-radius:var(--radius-lg)}
        .promo-table{width:100%;border-collapse:collapse;min-width:640px}
        .promo-table th{background:var(--accent-gradient);color:#fff;padding:0.95rem 1.25rem;font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:800;text-align:left;white-space:nowrap}
        .promo-table th:first-child{width:34%}
        .promo-table td{padding:0.85rem 1.25rem;font-size:0.875rem;color:var(--text);border-bottom:1px solid var(--border-subtle)}
        .promo-table tr:last-child td{border-bottom:none}
        .promo-table tbody tr:nth-child(even) td{background:rgba(255,255,255,0.02)}
        .promo-table-hl td{background:var(--accent-glow) !important;color:var(--text)}
        .promo-tag-good,.promo-tag-mid,.promo-tag-bad{display:inline-block;border-radius:6px;padding:0.15rem 0.6rem;font-size:0.75rem;font-weight:700;white-space:nowrap}
        .promo-tag-good{background:rgba(34,197,94,0.15);color:#4ade80}
        .promo-tag-mid{background:rgba(250,204,21,0.15);color:#facc15}
        .promo-tag-bad{background:rgba(239,68,68,0.15);color:#f87171}

        /* CAMPAIGN FEED */
        .promo-feed{display:flex;flex-direction:column;gap:0.85rem}
        .promo-feed-card{background:var(--bg);border:1px solid var(--border-subtle);border-radius:var(--radius);overflow:hidden}
        .promo-feed-bar-wrap{position:relative;height:28px;background:var(--surface-hover);overflow:hidden}
        .promo-feed-bar-fill{height:100%;background:var(--accent-gradient)}
        .promo-feed-bar-lbl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fff;letter-spacing:0.03em}
        .promo-feed-stats{display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 1rem 0.25rem}
        .promo-pill{display:inline-flex;align-items:center;gap:0.25rem;background:var(--surface);border:1px solid var(--border-subtle);border-radius:20px;padding:0.15rem 0.65rem;font-size:0.8rem;font-weight:600}
        .promo-pill-accent{background:rgba(124,58,237,0.14);border-color:var(--border);color:var(--accent-light)}
        .promo-pill-green{background:rgba(34,197,94,0.12);border-color:rgba(34,197,94,0.28);color:#4ade80}
        .promo-gain{color:var(--success)}
        .promo-feed-metrics{display:flex;align-items:center;gap:1.25rem;padding:0.35rem 1rem 0.75rem}
        .promo-mlabel{font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em}
        .promo-mval{font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:800}
        .promo-mromi{font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:800;color:var(--success)}
        .promo-mago{margin-left:auto;font-size:0.7rem;color:var(--text-muted)}
        .promo-mid-cta{text-align:center;margin-top:2rem}

        /* FAQ — reuses the site-wide .faq-* styles */
        .promo-faq-wrap .faq-section{padding:0}
        .promo-faq-wrap .faq-heading{font-size:clamp(1.5rem,3.5vw,2.35rem);margin-bottom:1.75rem}
        .promo-faq-wrap .faq-list{max-width:100%}

        /* BOTTOM CTA */
        .promo-bottom-cta{background:var(--accent-gradient);padding:4.5rem 1.5rem;text-align:center}
        .promo-bottom-inner{max-width:620px;margin:0 auto}
        .promo-bottom-cta h2{font-size:clamp(1.6rem,4vw,2.6rem);color:#fff;margin-bottom:0.9rem}
        .promo-bottom-cta p{font-size:1.05rem;color:rgba(255,255,255,0.9);line-height:1.7;margin-bottom:2rem}
        .promo-bottom-btn{display:inline-flex;align-items:center;gap:0.55rem;background:#fff;color:var(--accent);border-radius:50px;padding:0.95rem 2.2rem;font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;box-shadow:0 10px 32px rgba(0,0,0,0.3);transition:transform 0.2s,box-shadow 0.2s}
        .promo-bottom-btn:hover{transform:translateY(-3px);box-shadow:0 16px 42px rgba(0,0,0,0.38)}

        @media (max-width:768px){
          .promo-hero{padding:3rem 1.25rem 2.75rem}
          .promo-section{padding:3rem 1.25rem}
          .promo-bottom-cta{padding:3.25rem 1.25rem}
          .promo-cta{padding:0.9rem 1.7rem;font-size:0.95rem}
          .promo-feed-metrics{gap:1rem}
        }
        @media (prefers-reduced-motion:reduce){
          .promo-cta,.promo-dot{animation:none}
        }
      `}</style>
    </>
  );
}
