-- Migration: Add search_text generated column + GIN trigram index
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Takes ~2-5 minutes on large tables, runs in background without locking reads.

-- 1. Add the generated column that combines all 4 searchable fields
ALTER TABLE onlyfans_profiles
ADD COLUMN IF NOT EXISTS search_text text GENERATED ALWAYS AS (
  lower(coalesce(username, '')) || ' ' ||
  lower(coalesce(name, '')) || ' ' ||
  lower(coalesce(about, '')) || ' ' ||
  lower(coalesce(location, ''))
) STORED;

-- 2. Build the GIN trigram index (requires pg_trgm, already enabled in Supabase)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_search_text_trgm
  ON onlyfans_profiles
  USING GIN (search_text gin_trgm_ops);
