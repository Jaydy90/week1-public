# Reservation Clicks Tracking Table

## Overview

The `reservation_clicks` table tracks every click on reservation links (Catchtable, Naver Place, Phone) to enable:
- Analytics on which platforms are most used
- Freemium conversion tracking (which restaurants drive subscriptions)
- A/B testing and campaign tracking
- Restaurant popularity metrics

## Schema

```sql
CREATE TABLE public.reservation_clicks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),  -- NULL for anonymous users
  restaurant_id TEXT NOT NULL,
  platform TEXT NOT NULL,  -- 'catchtable' | 'naverPlace' | 'phone'
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Optional metadata
  user_agent TEXT,
  referrer TEXT,
  session_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);
```

## RLS Policies

1. **Insert**: Anyone can insert (including anonymous users)
   - Enables tracking before login
   - Critical for funnel analysis (anonymous → signup → subscriber)

2. **Select**: Users can only see their own clicks
   - Privacy-first approach
   - Authenticated users only

3. **Service Role**: Full access for analytics dashboard
   - Used for admin analytics
   - Requires service_role key (never exposed to client)

## Indexes

- `user_id` - Fast user-specific queries
- `restaurant_id` - Restaurant analytics
- `platform` - Platform comparison
- `clicked_at DESC` - Time-based queries
- `(restaurant_id, platform)` - Composite for common queries

## Integration

### Frontend (main.js)

```javascript
// In ReservationModule.trackClick()
const { data, error } = await supabase
  .from('reservation_clicks')
  .insert({
    user_id: AuthModule.currentUser?.id || null,
    restaurant_id: restaurantId,
    platform: platform,
    clicked_at: new Date().toISOString()
  });
```

### Analytics Queries

#### 1. Top Restaurants by Clicks
```sql
SELECT restaurant_id, COUNT(*) as click_count
FROM reservation_clicks
GROUP BY restaurant_id
ORDER BY click_count DESC
LIMIT 10;
```

#### 2. Platform Comparison
```sql
SELECT platform, COUNT(*) as click_count
FROM reservation_clicks
GROUP BY platform
ORDER BY click_count DESC;
```

#### 3. Conversion Funnel
```sql
-- Anonymous clicks → Signups → Subscribers
WITH anonymous_clicks AS (
  SELECT COUNT(*) as anon_count
  FROM reservation_clicks
  WHERE user_id IS NULL
),
authenticated_clicks AS (
  SELECT COUNT(*) as auth_count
  FROM reservation_clicks
  WHERE user_id IS NOT NULL
)
SELECT
  anon_count,
  auth_count,
  ROUND(100.0 * auth_count / (anon_count + auth_count), 2) as login_rate
FROM anonymous_clicks, authenticated_clicks;
```

#### 4. Restaurant Performance by Platform
```sql
SELECT
  restaurant_id,
  SUM(CASE WHEN platform = 'catchtable' THEN 1 ELSE 0 END) as catchtable_clicks,
  SUM(CASE WHEN platform = 'naverPlace' THEN 1 ELSE 0 END) as naver_clicks,
  SUM(CASE WHEN platform = 'phone' THEN 1 ELSE 0 END) as phone_clicks,
  COUNT(*) as total_clicks
FROM reservation_clicks
GROUP BY restaurant_id
ORDER BY total_clicks DESC
LIMIT 20;
```

#### 5. Daily Click Trends
```sql
SELECT
  DATE(clicked_at) as date,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT user_id) as unique_users,
  ROUND(COUNT(*)::numeric / NULLIF(COUNT(DISTINCT user_id), 0), 2) as clicks_per_user
FROM reservation_clicks
GROUP BY DATE(clicked_at)
ORDER BY date DESC
LIMIT 30;
```

## Migration Steps

1. **Copy SQL**
   ```bash
   cat schema-reservation-clicks.sql
   ```

2. **Run in Supabase Dashboard**
   - Go to https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd/sql/new
   - Paste the SQL
   - Click "Run"

3. **Verify**
   ```sql
   SELECT COUNT(*) FROM reservation_clicks; -- Should return 0
   SELECT * FROM pg_policies WHERE tablename = 'reservation_clicks';
   SELECT * FROM pg_indexes WHERE tablename = 'reservation_clicks';
   ```

4. **Test Insert**
   ```sql
   INSERT INTO reservation_clicks (restaurant_id, platform)
   VALUES ('rest-001', 'catchtable');

   SELECT * FROM reservation_clicks; -- Should show 1 row
   ```

5. **Clean Up Test Data**
   ```sql
   DELETE FROM reservation_clicks WHERE restaurant_id = 'rest-001';
   ```

## Privacy & GDPR Compliance

- User ID is nullable (anonymous tracking allowed)
- Users can only see their own data (RLS)
- No PII stored (only user_id reference)
- Easy to delete user data (CASCADE on user deletion)

## Future Enhancements

1. **Retention Analysis**
   - Add `conversion_event` table (click → signup → subscribe)
   - Track time between events

2. **A/B Testing**
   - Add `experiment_id` and `variant` columns
   - Track conversion rates per variant

3. **Revenue Attribution**
   - Join with Stripe subscriptions table
   - Calculate revenue per restaurant/platform

4. **Real-time Dashboard**
   - Use Supabase Realtime subscriptions
   - Live click counter on admin dashboard

## Related Files

- `schema-reservation-clicks.sql` - Migration SQL
- `main.js` - ReservationModule.trackClick() implementation
- `data.js` - Restaurant reservation schema
- `docs/RESERVATION_PLATFORMS_ANALYSIS.md` - Platform research
