import { after, NextRequest, NextResponse } from 'next/server';
import { getSponsorCampaign, isSponsorScope } from '@/config/sponsors';

export const runtime = 'nodejs';

const BOT_USER_AGENT = /bot|crawl|spider|slurp|curl|wget|python-requests|headless|facebookexternalhit|bingpreview/iu;
const OWN_HOSTS = new Set([
  'onlyaussiefans.com',
  'www.onlyaussiefans.com',
  'localhost',
  '127.0.0.1',
]);

function derivePlacement(referrer: string | null): string | null {
  if (!referrer) return null;

  try {
    const url = new URL(referrer);
    if (!OWN_HOSTS.has(url.hostname)) return `external:${url.hostname}`.slice(0, 120);

    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return 'home';
    if (parts[0] === 'search') return 'search';
    if (parts[0] === 'onlyfans-search') return 'directory';
    if (parts[0] === 'categories' && parts[1]) return `category:${parts[1]}`;
    if (parts.length >= 2) return `location-category:${parts[0]}:${parts[1]}`;
    return `location:${parts[0]}`;
  } catch {
    return null;
  }
}

function explicitPlacement(value: string | null): string | null {
  if (!value) return null;
  return value === 'search-dropdown' || isSponsorScope(value) ? value : null;
}

interface ClickData {
  userAgent: string | null;
  referrer: string | null;
  placement: string | null;
}

async function logSponsorClick(table: string, data: ClickData) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseKey = process.env.SUPABASE_KEY;
  if (!supabaseUrl || !supabaseKey || !/^sponsor_clicks_[a-z0-9_]+$/u.test(table)) return;

  try {
    await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify([{
        user_agent: data.userAgent,
        referrer: data.referrer,
        placement: data.placement,
      }]),
      cache: 'no-store',
    });
  } catch {
    // Tracking must never delay or break the advertiser redirect.
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  let decodedUsername = username;
  try { decodedUsername = decodeURIComponent(username); } catch {}
  const campaign = getSponsorCampaign(decodedUsername);
  const destination = campaign?.linkOverride
    ?? `https://onlyfans.com/${encodeURIComponent(decodedUsername)}`;
  const userAgent = request.headers.get('user-agent');
  const referrer = request.headers.get('referer');

  if (campaign?.clickTable && !BOT_USER_AGENT.test(userAgent ?? '')) {
    const placement = explicitPlacement(request.nextUrl.searchParams.get('placement'))
      ?? derivePlacement(referrer);
    after(() => logSponsorClick(campaign.clickTable!, { userAgent, referrer, placement }));
  }

  return NextResponse.redirect(destination, { status: 302 });
}
