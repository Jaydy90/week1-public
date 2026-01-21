-- ========================================
-- KPopEats (Trust Route) - Initial Schema
-- Migration: 20260121000001
-- Description: 핵심 테이블 생성
-- ========================================

-- Extension 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. Profiles (사용자 프로필)
-- ========================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  display_name TEXT,
  home_area TEXT,
  preferences JSONB DEFAULT '{}'::JSONB,

  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 프로필 인덱스
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON profiles(created_at DESC);

-- ========================================
-- 2. Restaurants (레스토랑 정보)
-- ========================================
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 기본 정보
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  category TEXT,

  -- 위치 정보 (PostGIS 대신 단순 lat/lng)
  lat NUMERIC(10, 7) NOT NULL,
  lng NUMERIC(10, 7) NOT NULL,

  -- 영업 정보
  hours JSONB DEFAULT '{}'::JSONB,
  price_range TEXT CHECK (price_range IN ('budget', 'moderate', 'expensive', 'fine_dining')),

  -- 메뉴 정보
  menus JSONB DEFAULT '[]'::JSONB,

  -- 이미지
  images JSONB DEFAULT '[]'::JSONB,

  -- 통계
  bookmark_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0
);

-- 레스토랑 인덱스
CREATE INDEX IF NOT EXISTS restaurants_name_idx ON restaurants USING GIN (to_tsvector('korean', name));
CREATE INDEX IF NOT EXISTS restaurants_location_idx ON restaurants(lat, lng);
CREATE INDEX IF NOT EXISTS restaurants_category_idx ON restaurants(category);

-- ========================================
-- 3. Trust Evidence (신뢰 근거 카드)
-- ========================================
CREATE TABLE IF NOT EXISTS trust_evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,

  -- 신뢰 근거 정보
  source_type TEXT NOT NULL CHECK (source_type IN ('michelin', 'celebrity', 'tv_show', 'chef', 'influencer', 'other')),
  source_url TEXT NOT NULL,
  caption TEXT,
  verified_at DATE NOT NULL,
  trust_level INTEGER CHECK (trust_level BETWEEN 1 AND 5),

  -- 추가 메타데이터
  metadata JSONB DEFAULT '{}'::JSONB
);

-- 신뢰 근거 인덱스
CREATE INDEX IF NOT EXISTS trust_evidence_restaurant_idx ON trust_evidence(restaurant_id);
CREATE INDEX IF NOT EXISTS trust_evidence_source_type_idx ON trust_evidence(source_type);
CREATE INDEX IF NOT EXISTS trust_evidence_verified_at_idx ON trust_evidence(verified_at DESC);

-- ========================================
-- 4. Bookmarks (북마크)
-- ========================================
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,

  -- 북마크 메타
  notes TEXT,

  -- 중복 방지
  UNIQUE(user_id, restaurant_id)
);

-- 북마크 인덱스
CREATE INDEX IF NOT EXISTS bookmarks_user_idx ON bookmarks(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS bookmarks_restaurant_idx ON bookmarks(restaurant_id);

-- ========================================
-- 5. Reports (오정보 신고)
-- ========================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,

  -- 신고 내용
  type TEXT NOT NULL CHECK (type IN ('wrong_info', 'closed', 'incorrect_location', 'inappropriate', 'other')),
  message TEXT NOT NULL,

  -- 처리 상태
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'rejected')),

  -- 처리 정보
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  resolution_note TEXT
);

-- 신고 인덱스
CREATE INDEX IF NOT EXISTS reports_status_idx ON reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS reports_restaurant_idx ON reports(restaurant_id);

-- ========================================
-- 6. Subscriptions (구독 정보 - Stripe canonical state)
-- ========================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Stripe 정보 (진실의 원천)
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL UNIQUE,

  -- 구독 상태
  status TEXT NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired')),

  -- 구독 기간
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,

  -- 플랜 정보
  price_id TEXT NOT NULL,

  -- 사용자당 최대 1개 활성 구독
  UNIQUE(user_id)
);

-- 구독 인덱스
CREATE INDEX IF NOT EXISTS subscriptions_user_idx ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_stripe_customer_idx ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON subscriptions(status);

-- ========================================
-- 7. Stripe Events (Idempotency)
-- ========================================
CREATE TABLE IF NOT EXISTS stripe_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  stripe_event_id TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL
);

-- Stripe 이벤트 인덱스
CREATE INDEX IF NOT EXISTS stripe_events_event_id_idx ON stripe_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS stripe_events_received_at_idx ON stripe_events(received_at DESC);

-- ========================================
-- 트리거: updated_at 자동 갱신
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 각 테이블에 트리거 적용
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trust_evidence_updated_at BEFORE UPDATE ON trust_evidence
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 완료
-- ========================================
COMMENT ON TABLE profiles IS '사용자 프로필 정보';
COMMENT ON TABLE restaurants IS '레스토랑 기본 정보';
COMMENT ON TABLE trust_evidence IS '신뢰 근거 카드 (미쉐린/유명인/TV 등)';
COMMENT ON TABLE bookmarks IS '사용자 북마크';
COMMENT ON TABLE reports IS '오정보 신고';
COMMENT ON TABLE subscriptions IS 'Stripe 구독 상태 (진실의 원천)';
COMMENT ON TABLE stripe_events IS 'Stripe 웹훅 이벤트 기록 (idempotency)';
