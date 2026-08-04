-- OnlyAussieFans sponsor click tracking.
-- These tables are deliberately separate from Fanspedia so reporting remains
-- attributable to the site that delivered each click.

CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaf_rocketreynaxo (
    id BIGSERIAL PRIMARY KEY,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    placement TEXT,
    user_agent TEXT,
    referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaf_rocketreynaxo_clicked_at
ON public.sponsor_clicks_oaf_rocketreynaxo (clicked_at);

CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaf_hannazuki (
    id BIGSERIAL PRIMARY KEY,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    placement TEXT,
    user_agent TEXT,
    referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaf_hannazuki_clicked_at
ON public.sponsor_clicks_oaf_hannazuki (clicked_at);

CREATE TABLE IF NOT EXISTS public.sponsor_clicks_oaf_emilylopz (
    id BIGSERIAL PRIMARY KEY,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    placement TEXT,
    user_agent TEXT,
    referrer TEXT
);

CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_oaf_emilylopz_clicked_at
ON public.sponsor_clicks_oaf_emilylopz (clicked_at);
