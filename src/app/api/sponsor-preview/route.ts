import { NextResponse } from 'next/server';
import { getSearchSponsorCampaigns } from '@/config/sponsors';
import { fetchCreatorsByUsernames } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET() {
  const campaigns = getSearchSponsorCampaigns();
  const headers = {
    'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
  };

  if (campaigns.length === 0) return NextResponse.json([], { headers });

  const creators = await fetchCreatorsByUsernames(campaigns.map((campaign) => campaign.username));
  const byUsername = new Map(
    creators.map((creator) => [creator.username.toLowerCase(), { ...creator, sponsored: true }]),
  );
  const ordered = campaigns
    .map((campaign) => byUsername.get(campaign.username.toLowerCase()))
    .filter((creator) => creator !== undefined);

  return NextResponse.json(ordered, { headers });
}

