-- Creator directory query indexes for the multi-million-row profile table.
-- pg_trgm accelerates both ILIKE and case-insensitive regular-expression
-- searches, including the whole-word `imatch` filters used by the app.
--
-- Run this migration before deploying the matching application code. These
-- statements intentionally use CONCURRENTLY so profile ingestion can continue.
-- PostgreSQL requires each CONCURRENTLY statement to run outside a transaction.

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_of_profiles_location_trgm_v2
  ON public.onlyfans_profiles USING GIN (location gin_trgm_ops)
  WHERE isperformer = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_of_profiles_username_trgm_v2
  ON public.onlyfans_profiles USING GIN (username gin_trgm_ops)
  WHERE isperformer = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_of_profiles_name_trgm_v2
  ON public.onlyfans_profiles USING GIN (name gin_trgm_ops)
  WHERE isperformer = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_of_profiles_about_trgm_v2
  ON public.onlyfans_profiles USING GIN (about gin_trgm_ops)
  WHERE isperformer = true;

-- Stable pagination order. The id tiebreaker prevents duplicated/missing rows
-- when many creators have the same popularity or price values.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_of_profiles_popular_order_v2
  ON public.onlyfans_profiles (favoritedcount DESC, subscribeprice ASC NULLS LAST, id DESC)
  WHERE isperformer = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_of_profiles_newest_order_v2
  ON public.onlyfans_profiles (first_seen_at DESC NULLS LAST, favoritedcount DESC, id DESC)
  WHERE isperformer = true;
