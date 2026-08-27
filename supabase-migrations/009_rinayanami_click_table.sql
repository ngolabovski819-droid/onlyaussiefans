-- Click tracking for the rinayanami campaign on onlyaussiefans.com.
-- Same shared Supabase project as prior click migrations — run once in the
-- Supabase SQL editor. Safe to re-run (IF NOT EXISTS everywhere).
--
-- Includes from day one every column the older sponsor_clicks_* tables gained
-- through migrations 004 (ip_hash, is_datacenter_ip), 005 (link_verified),
-- 006 (ip_address, country, city), and 008 (botid_flagged).

CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_rinayanami (
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
    city TEXT,
    botid_flagged BOOLEAN
);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_rinayanami_clicked_at
ON public.sponsor_clicks_oaussief_rinayanami (clicked_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_rinayanami_ip_hash
ON public.sponsor_clicks_oaussief_rinayanami (ip_hash);
