# 구독 티어 구현 가이드

## 데이터베이스 스키마

### profiles 테이블 확장
```sql
-- Supabase SQL Editor에서 실행
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_started_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_ends_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS daily_views_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS daily_views_reset_at TIMESTAMPTZ DEFAULT NOW();

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);

-- RLS 정책 (사용자는 자신의 구독 정보만 볼 수 있음)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### usage_logs 테이블 생성 (사용량 추적)
```sql
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'view_restaurant', 'save_restaurant', 'use_filter'
  resource_id TEXT,     -- restaurant ID
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_usage_logs_user_action ON usage_logs(user_id, action, created_at);

-- RLS: 사용자는 자신의 로그만 볼 수 있음
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own logs"
  ON usage_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs"
  ON usage_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 프론트엔드 권한 체크 모듈

### 파일: `assets/js/core/permissions.js`
```javascript
// ========================================
// Trust Route - Permissions Module
// 구독 티어별 권한 체크
// ========================================

const PermissionsModule = {
  // 티어별 제한 설정
  LIMITS: {
    free: {
      dailyViews: 10,
      savedRestaurants: 5,
      advancedFilters: false,
      notifications: false,
      aiRecommendations: false,
      exclusiveContent: false
    },
    pro: {
      dailyViews: Infinity,
      savedRestaurants: Infinity,
      advancedFilters: true,
      notifications: true,
      aiRecommendations: false,
      exclusiveContent: false
    },
    premium: {
      dailyViews: Infinity,
      savedRestaurants: Infinity,
      advancedFilters: true,
      notifications: true,
      aiRecommendations: true,
      exclusiveContent: true
    }
  },

  // 현재 사용자 티어 가져오기
  getCurrentTier() {
    if (!AuthModule.isAuthenticated()) {
      return 'free';
    }

    const user = AuthModule.currentUser;
    return user?.subscription_plan || 'free';
  },

  // 권한 체크
  can(feature) {
    const tier = this.getCurrentTier();
    return this.LIMITS[tier][feature] === true || this.LIMITS[tier][feature] === Infinity;
  },

  // 일일 조회수 체크
  async checkDailyViews() {
    if (this.getCurrentTier() !== 'free') {
      return { allowed: true };
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('daily_views_count, daily_views_reset_at')
        .eq('id', AuthModule.getUserId())
        .single();

      // 날짜가 바뀌었으면 카운트 리셋
      const resetDate = new Date(profile.daily_views_reset_at);
      const now = new Date();
      if (resetDate.toDateString() !== now.toDateString()) {
        await this.resetDailyViews();
        return { allowed: true, remaining: this.LIMITS.free.dailyViews - 1 };
      }

      // 제한 체크
      if (profile.daily_views_count >= this.LIMITS.free.dailyViews) {
        return {
          allowed: false,
          message: '오늘의 무료 조회 횟수를 모두 사용했습니다. PRO 플랜으로 업그레이드하세요!',
          remaining: 0
        };
      }

      return {
        allowed: true,
        remaining: this.LIMITS.free.dailyViews - profile.daily_views_count - 1
      };
    } catch (err) {
      console.error('Error checking daily views:', err);
      return { allowed: true }; // 에러 시 허용 (UX 우선)
    }
  },

  // 일일 조회수 증가
  async incrementDailyViews() {
    if (this.getCurrentTier() !== 'free') return;

    try {
      await supabase.rpc('increment_daily_views', {
        user_id: AuthModule.getUserId()
      });
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  },

  // 일일 조회수 리셋
  async resetDailyViews() {
    try {
      await supabase
        .from('profiles')
        .update({
          daily_views_count: 0,
          daily_views_reset_at: new Date().toISOString()
        })
        .eq('id', AuthModule.getUserId());
    } catch (err) {
      console.error('Error resetting daily views:', err);
    }
  },

  // 저장 개수 체크
  async checkSavedCount() {
    const tier = this.getCurrentTier();
    const limit = this.LIMITS[tier].savedRestaurants;

    if (limit === Infinity) {
      return { allowed: true };
    }

    try {
      const savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants') || '[]');

      if (savedRestaurants.length >= limit) {
        return {
          allowed: false,
          message: `무료 플랜은 최대 ${limit}개까지 저장할 수 있습니다. PRO 플랜으로 업그레이드하세요!`,
          current: savedRestaurants.length,
          limit: limit
        };
      }

      return {
        allowed: true,
        current: savedRestaurants.length,
        limit: limit
      };
    } catch (err) {
      console.error('Error checking saved count:', err);
      return { allowed: true };
    }
  },

  // 사용량 로깅
  async logUsage(action, resourceId = null) {
    if (!AuthModule.isAuthenticated()) return;

    try {
      await supabase
        .from('usage_logs')
        .insert({
          user_id: AuthModule.getUserId(),
          action: action,
          resource_id: resourceId
        });
    } catch (err) {
      console.error('Error logging usage:', err);
    }
  },

  // 업그레이드 모달 표시
  showUpgradeModal(message) {
    const modal = `
      <div class="upgrade-modal-overlay" id="upgradeModal">
        <div class="upgrade-modal">
          <button class="modal-close" onclick="PermissionsModule.closeUpgradeModal()">×</button>
          <h2>🚀 업그레이드가 필요합니다</h2>
          <p>${message}</p>

          <div class="upgrade-plans">
            <div class="plan-card">
              <h3>PRO 플랜</h3>
              <p class="price">월 9,900원</p>
              <ul>
                <li>✅ 무제한 맛집 열람</li>
                <li>✅ 무제한 저장</li>
                <li>✅ 고급 필터</li>
                <li>✅ 알림 기능</li>
              </ul>
              <button onclick="SubscriptionModule.createCheckoutSession('pro')">
                PRO 시작하기
              </button>
            </div>

            <div class="plan-card featured">
              <div class="badge">인기</div>
              <h3>PREMIUM 플랜</h3>
              <p class="price">월 29,900원</p>
              <ul>
                <li>✅ PRO 기능 전체</li>
                <li>✅ AI 맞춤 추천</li>
                <li>✅ 독점 콘텐츠</li>
                <li>✅ 예약 대행 서비스</li>
              </ul>
              <button class="featured-btn" onclick="SubscriptionModule.createCheckoutSession('premium')">
                PREMIUM 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modal);
  },

  closeUpgradeModal() {
    const modal = document.getElementById('upgradeModal');
    if (modal) modal.remove();
  }
};

// Supabase Function: 일일 조회수 증가
// SQL Editor에서 실행:
/*
CREATE OR REPLACE FUNCTION increment_daily_views(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET daily_views_count = daily_views_count + 1
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
*/
```

## UI 구현 예시

### DetailScreen에 권한 체크 추가
```javascript
// assets/js/main.js의 DetailScreen 수정
const DetailScreen = {
  async init(data) {
    const { restaurantId } = data;

    // 권한 체크
    const viewCheck = await PermissionsModule.checkDailyViews();
    if (!viewCheck.allowed) {
      PermissionsModule.showUpgradeModal(viewCheck.message);
      Router.navigateTo('home');
      return;
    }

    // 조회수 증가
    await PermissionsModule.incrementDailyViews();
    await PermissionsModule.logUsage('view_restaurant', restaurantId);

    // 남은 조회수 표시 (Free 플랜만)
    if (PermissionsModule.getCurrentTier() === 'free') {
      this.showRemainingViews(viewCheck.remaining);
    }

    // 기존 로직 계속...
    const restaurant = this.getRestaurantById(restaurantId);
    this.render(restaurant);
  },

  showRemainingViews(remaining) {
    const notice = document.createElement('div');
    notice.className = 'remaining-views-notice';
    notice.textContent = `오늘 ${remaining}개의 무료 조회가 남았습니다`;
    document.querySelector('#detail').prepend(notice);
  }
};
```

### 저장 버튼에 권한 체크 추가
```javascript
async function handleSaveRestaurant(restaurantId) {
  // 권한 체크
  const saveCheck = await PermissionsModule.checkSavedCount();
  if (!saveCheck.allowed) {
    PermissionsModule.showUpgradeModal(saveCheck.message);
    return;
  }

  // 저장 로직
  const saved = JSON.parse(localStorage.getItem('savedRestaurants') || '[]');
  saved.push(restaurantId);
  localStorage.setItem('savedRestaurants', JSON.stringify(saved));

  // 사용량 로깅
  await PermissionsModule.logUsage('save_restaurant', restaurantId);

  alert('저장되었습니다!');
}
```

### 고급 필터 체크
```javascript
function showAdvancedFilters() {
  if (!PermissionsModule.can('advancedFilters')) {
    PermissionsModule.showUpgradeModal(
      '고급 필터는 PRO 플랜부터 사용할 수 있습니다.'
    );
    return;
  }

  // 필터 UI 표시
  document.getElementById('advanced-filters').style.display = 'block';
}
```

## CSS 스타일 추가

### 파일: `assets/css/subscription.css`
```css
/* 업그레이드 모달 */
.upgrade-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s;
}

.upgrade-modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #666;
}

.upgrade-plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.plan-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: transform 0.2s;
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.plan-card.featured {
  border-color: #e45a2b;
  position: relative;
}

.plan-card .badge {
  position: absolute;
  top: -12px;
  right: 24px;
  background: #e45a2b;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.plan-card h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

.plan-card .price {
  font-size: 32px;
  font-weight: bold;
  color: #e45a2b;
  margin: 16px 0;
}

.plan-card ul {
  list-style: none;
  padding: 0;
  margin: 24px 0;
  text-align: left;
}

.plan-card li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.plan-card button {
  width: 100%;
  padding: 16px;
  background: #333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.plan-card button:hover {
  background: #e45a2b;
}

.plan-card.featured button {
  background: #e45a2b;
}

.plan-card.featured button:hover {
  background: #c74a1b;
}

/* 남은 조회수 알림 */
.remaining-views-notice {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 16px;
  animation: slideDown 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

## 배포 체크리스트

- [ ] SQL 스키마 실행 (`profiles` 테이블 확장)
- [ ] `usage_logs` 테이블 생성
- [ ] `increment_daily_views()` 함수 생성
- [ ] `permissions.js` 파일 생성
- [ ] `subscription.css` 추가
- [ ] `index.html`에 스크립트/스타일 추가
- [ ] 권한 체크 로직을 모든 화면에 적용
- [ ] 테스트: Free 플랜 제한 동작 확인
- [ ] 테스트: PRO/PREMIUM 플랜 제한 없음 확인
