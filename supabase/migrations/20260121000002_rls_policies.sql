-- ========================================
-- KPopEats (Trust Route) - RLS Policies
-- Migration: 20260121000002
-- Description: Row Level Security 정책 설정
-- ========================================

-- ========================================
-- RLS 활성화
-- ========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 1. Profiles (프로필)
-- ========================================

-- 자기 프로필 조회 (누구나)
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- 자기 프로필 생성 (회원가입 시)
CREATE POLICY "Users can create own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 자기 프로필 수정 (본인만)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 프로필 삭제 (본인만)
CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

-- ========================================
-- 2. Restaurants (레스토랑)
-- ========================================

-- 모든 사용자가 레스토랑 조회 가능 (공개 데이터)
CREATE POLICY "Anyone can view restaurants"
  ON restaurants FOR SELECT
  TO authenticated, anon
  USING (true);

-- 레스토랑 추가/수정/삭제는 서비스 관리자만 (service role)
-- RLS는 service role에는 적용되지 않으므로 별도 정책 불필요

-- ========================================
-- 3. Trust Evidence (신뢰 근거)
-- ========================================

-- 모든 사용자가 신뢰 근거 조회 가능 (공개 데이터)
CREATE POLICY "Anyone can view trust evidence"
  ON trust_evidence FOR SELECT
  TO authenticated, anon
  USING (true);

-- 신뢰 근거 추가/수정/삭제는 서비스 관리자만

-- ========================================
-- 4. Bookmarks (북마크)
-- ========================================

-- 본인 북마크만 조회
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

-- 본인 북마크 추가
CREATE POLICY "Users can create own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 본인 북마크 삭제
CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- 5. Reports (신고)
-- ========================================

-- 본인이 작성한 신고만 조회
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  USING (auth.uid() = user_id);

-- 누구나 신고 제출 가능
CREATE POLICY "Authenticated users can create reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 본인 신고만 수정/삭제 (pending 상태만)
CREATE POLICY "Users can update own pending reports"
  ON reports FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Users can delete own pending reports"
  ON reports FOR DELETE
  USING (auth.uid() = user_id AND status = 'pending');

-- ========================================
-- 6. Subscriptions (구독)
-- ========================================

-- 본인 구독만 조회
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- 구독 생성/수정/삭제는 웹훅(service role)에서만 처리
-- 사용자가 직접 구독 정보를 변경할 수 없도록 INSERT/UPDATE/DELETE 정책 없음

-- ========================================
-- 7. Stripe Events (웹훅 이벤트)
-- ========================================

-- Stripe 이벤트는 서비스 관리자만 접근 (service role)
-- RLS는 service role에는 적용되지 않으므로 정책 불필요

-- 일반 사용자는 접근 불가 (기본 정책 없음)

-- ========================================
-- 함수: 구독 상태 확인 (권한 제어용)
-- ========================================

-- 사용자의 활성 구독 여부 확인
CREATE OR REPLACE FUNCTION has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM subscriptions
    WHERE user_id = user_uuid
      AND status IN ('active', 'trialing')
      AND current_period_end > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 현재 사용자의 활성 구독 여부
CREATE OR REPLACE FUNCTION current_user_has_active_subscription()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN has_active_subscription(auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 북마크 카운트 자동 업데이트 트리거
-- ========================================

-- 북마크 추가 시 카운트 증가
CREATE OR REPLACE FUNCTION increment_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE restaurants
  SET bookmark_count = bookmark_count + 1
  WHERE id = NEW.restaurant_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_bookmark_created
  AFTER INSERT ON bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION increment_bookmark_count();

-- 북마크 삭제 시 카운트 감소
CREATE OR REPLACE FUNCTION decrement_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE restaurants
  SET bookmark_count = GREATEST(0, bookmark_count - 1)
  WHERE id = OLD.restaurant_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_bookmark_deleted
  AFTER DELETE ON bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION decrement_bookmark_count();

-- ========================================
-- 완료
-- ========================================
COMMENT ON FUNCTION has_active_subscription IS '특정 사용자의 활성 구독 여부 확인';
COMMENT ON FUNCTION current_user_has_active_subscription IS '현재 사용자의 활성 구독 여부 확인';
