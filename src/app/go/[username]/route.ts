import { NextRequest, NextResponse } from 'next/server';
import { getSponsorCampaign, isSponsorScope } from '@/config/sponsors';
import { isBotUserAgent } from '@/lib/botDetection';
import { extractClientIp, hashIp, isDatacenterIp, isRateLimited, extractGeo } from '@/lib/clickIntegrity';
import { verifyClickToken } from '@/lib/clickToken';

export const runtime = 'nodejs';
const CLICK_IP_SALT = process.env.CLICK_IP_SALT;
const CLICK_TOKEN_SECRET = process.env.CLICK_TOKEN_SECRET;
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
  username: string;
  userAgent: string | null;
  referrer: string | null;
  placement: string | null;
  clientIp: string | null;
  linkToken: string | null;
  country: string | null;
  city: string | null;
}

async function logSponsorClick(table: string, data: ClickData) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const supabaseKey = process.env.SUPABASE_KEY;
  if (!supabaseUrl || !supabaseKey || !/^sponsor_clicks_[a-z0-9_]+$/u.test(table)) return;

  try {
    // Tracking must never delay or break the advertiser redirect — but this whole function IS
    // now awaited by the caller rather than deferred via after(): a deferred write meant the
    // redirect could return before the row (and the rate-limit check below) landed, so a
    // rapid-fire script could get several requests' worth of "no prior clicks yet" checks in
    // before any of them had actually written a row (verified directly: 7 rapid hits from the
    // same IP all got logged instead of being capped at 5). Rate limiting only means anything if
    // "how many clicks already happened" is accurate at check time.
    const ipHash = data.clientIp && CLICK_IP_SALT ? hashIp(data.clientIp, CLICK_IP_SALT) : null;
    const linkVerified = CLICK_TOKEN_SECRET
      ? verifyClickToken(data.linkToken, data.username, CLICK_TOKEN_SECRET)
      : false;

    // Same IP hammering this exact link is a script, whatever UA it claims — checked before
    // logging so a rate-limited hit still gets its redirect but never counts as a click.
    if (ipHash) {
      const rateLimited = await isRateLimited({
        supabaseUrl,
        supabaseKey,
        table,
        timestampColumn: 'clicked_at',
        ipHash,
      });
      if (rateLimited) return;
    }

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
        ip_hash: ipHash,
        is_datacenter_ip: isDatacenterIp(data.clientIp),
        link_verified: linkVerified,
        ip_address: data.clientIp,
        country: data.country,
        city: data.city,
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

  if (campaign?.clickTable && !isBotUserAgent(userAgent)) {
    const placement = explicitPlacement(request.nextUrl.searchParams.get('placement'))
      ?? derivePlacement(referrer);
    const clientIp = extractClientIp(request.headers.get('x-forwarded-for'));
    const linkToken = request.nextUrl.searchParams.get('t');
    const geo = extractGeo(request.headers);
    await logSponsorClick(campaign.clickTable, {
      username: decodedUsername,
      userAgent,
      referrer,
      placement,
      clientIp,
      linkToken,
      country: geo.country,
      city: geo.city,
    });
  }

  return NextResponse.redirect(destination, { status: 302 });
}
