-- Click tracking for the cosplaytsumiko campaign on onlyaussiefans.com.
-- Same shared Supabase project as prior click migrations — run once in the
-- Supabase SQL editor. Safe to re-run (IF NOT EXISTS everywhere).
--
-- Includes from day one every column the older sponsor_clicks_* tables gained
-- through migrations 004 (ip_hash, is_datacenter_ip), 005 (link_verified),
-- and 006 (ip_address, country, city).

CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_cosplaytsumiko (
    id BIGSERIAL PRIMARY KEY,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    placement TEXT,
    user_agent TEXT,
    referrer TEXT,
    ip_hash TEXT,
    is_datacenter_ip BOOLEAN,
    link_verified BOOLEAN,
    ip_address TEXT,
    country TEXT,
    city TEXT
);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_cosplaytsumiko_clicked_at
ON public.sponsor_clicks_oaussief_cosplaytsumiko (clicked_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_cosplaytsumiko_ip_hash
ON public.sponsor_clicks_oaussief_cosplaytsumiko (ip_hash);
