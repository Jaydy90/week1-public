-- ========================================
-- Reservation Clicks Tracking Table
-- ========================================
--
-- Purpose: Track user clicks on reservation links
-- Used for: Analytics, freemium conversion tracking
--
-- Manual Migration Steps:
-- 1. Copy this entire SQL
-- 2. Go to Supabase Dashboard > SQL Editor
-- 3. Paste and run
-- 4. Verify table creation in Table Editor
--
-- ========================================

-- Create reservation_clicks table
CREATE TABLE IF NOT EXISTS public.reservation_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurant_id TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('catchtable', 'naverPlace', 'phone')),
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  -- Metadata (optional for future analytics)
  user_agent TEXT,
  referrer TEXT,

  -- Tracking (for A/B testing, campaign tracking, etc.)
  session_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- ========================================
-- Row Level Security (RLS)
-- ========================================

-- Enable RLS
ALTER TABLE public.reservation_clicks ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (anonymous users can also track clicks)
-- Note: user_id can be NULL for non-authenticated users
CREATE POLICY "Anyone can insert reservation clicks"
  ON public.reservation_clicks
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Users can view their own clicks
CREATE POLICY "Users can view their own clicks"
  ON public.reservation_clicks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Service role can view all (for analytics dashboard)
-- This policy is automatically available for service_role key
-- No explicit policy needed

-- ========================================
-- Indexes for Performance
-- ========================================

-- Index on user_id for fast user-specific queries
CREATE INDEX IF NOT EXISTS idx_reservation_clicks_user_id
  ON public.reservation_clicks(user_id);

-- Index on restaurant_id for restaurant-specific analytics
CREATE INDEX IF NOT EXISTS idx_reservation_clicks_restaurant_id
  ON public.reservation_clicks(restaurant_id);

-- Index on platform for platform-specific analytics
CREATE INDEX IF NOT EXISTS idx_reservation_clicks_platform
  ON public.reservation_clicks(platform);

-- Index on clicked_at for time-based queries (most recent clicks, date ranges)
CREATE INDEX IF NOT EXISTS idx_reservation_clicks_clicked_at
  ON public.reservation_clicks(clicked_at DESC);

-- Composite index for common queries (restaurant + platform)
CREATE INDEX IF NOT EXISTS idx_reservation_clicks_restaurant_platform
  ON public.reservation_clicks(restaurant_id, platform);

-- ========================================
-- Helpful Analytics Queries
-- ========================================

-- 1. Get total clicks per restaurant
-- SELECT restaurant_id, COUNT(*) as click_count
-- FROM reservation_clicks
-- GROUP BY restaurant_id
-- ORDER BY click_count DESC;

-- 2. Get clicks per platform
-- SELECT platform, COUNT(*) as click_count
-- FROM reservation_clicks
-- GROUP BY platform
-- ORDER BY click_count DESC;

-- 3. Get clicks per day
-- SELECT DATE(clicked_at) as date, COUNT(*) as click_count
-- FROM reservation_clicks
-- GROUP BY DATE(clicked_at)
-- ORDER BY date DESC;

-- 4. Get top restaurants by platform
-- SELECT restaurant_id, platform, COUNT(*) as click_count
-- FROM reservation_clicks
-- GROUP BY restaurant_id, platform
-- ORDER BY click_count DESC
-- LIMIT 20;

-- 5. Get conversion rate (clicks vs unique users)
-- SELECT
--   COUNT(*) as total_clicks,
--   COUNT(DISTINCT user_id) as unique_users,
--   ROUND(COUNT(*)::numeric / NULLIF(COUNT(DISTINCT user_id), 0), 2) as clicks_per_user
-- FROM reservation_clicks
-- WHERE user_id IS NOT NULL;

-- ========================================
-- Verification
-- ========================================

-- Check table exists
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name = 'reservation_clicks';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'reservation_clicks';

-- Check policies exist
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'reservation_clicks';

-- Check indexes exist
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename = 'reservation_clicks';
