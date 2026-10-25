-- Six sponsored campaigns for onlyaussiefans.com (2026-10-25).
-- Run manually in the shared Supabase SQL editor before releasing the placements.
-- Safe to re-run; includes all click-integrity and reporting columns.

-- lillyylou
CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_lillyylou (
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

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_lillyylou_clicked_at
ON public.sponsor_clicks_oaussief_lillyylou (clicked_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_lillyylou_ip_hash
ON public.sponsor_clicks_oaussief_lillyylou (ip_hash);

-- aprilcollinsss
CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_aprilcollinsss (
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

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_aprilcollinsss_clicked_at
ON public.sponsor_clicks_oaussief_aprilcollinsss (clicked_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_aprilcollinsss_ip_hash
ON public.sponsor_clicks_oaussief_aprilcollinsss (ip_hash);

-- itsgiastar
CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_itsgiastar (
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

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_itsgiastar_clicked_at
ON public.sponsor_clicks_oaussief_itsgiastar (clicked_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_itsgiastar_ip_hash
ON public.sponsor_clicks_oaussief_itsgiastar (ip_hash);

-- ellaajanee
CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_ellaajanee (
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

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_ellaajanee_clicked_at
ON public.sponsor_clicks_oaussief_ellaajanee (clicked_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_ellaajanee_ip_hash
ON public.sponsor_clicks_oaussief_ellaajanee (ip_hash);

-- emillyybrown
CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_emillyybrown (
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

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_emillyybrown_clicked_at
ON public.sponsor_clicks_oaussief_emillyybrown (clicked_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_emillyybrown_ip_hash
ON public.sponsor_clicks_oaussief_emillyybrown (ip_hash);

-- gracieharper
CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_gracieharper (
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

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_gracieharper_clicked_at
ON public.sponsor_clicks_oaussief_gracieharper (clicked_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_gracieharper_ip_hash
ON public.sponsor_clicks_oaussief_gracieharper (ip_hash);
