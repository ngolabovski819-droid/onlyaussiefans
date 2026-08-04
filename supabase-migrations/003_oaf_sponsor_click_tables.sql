-- OnlyAussieFans sponsor click tracking.
-- These tables are deliberately separate from Fanspedia so reporting remains
-- attributable to the site that delivered each click.

CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_rocketreynaxo (
    id BIGSERIAL PRIMARY KEY,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    placement TEXT,
    user_agent TEXT,
    referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_rocketreynaxo_clicked_at
ON public.sponsor_clicks_oaussief_rocketreynaxo (clicked_at);

CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_hannazuki (
    id BIGSERIAL PRIMARY KEY,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    placement TEXT,
    user_agent TEXT,
    referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_hannazuki_clicked_at
ON public.sponsor_clicks_oaussief_hannazuki (clicked_at);

CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaussief_emilylopz (
    id BIGSERIAL PRIMARY KEY,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    placement TEXT,
    user_agent TEXT,
    referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaussief_emilylopz_clicked_at
ON public.sponsor_clicks_oaussief_emilylopz (clicked_at);
