# 프리미엄 기능 개발 로드맵

## 목표
Free → PRO → PREMIUM 티어별 명확한 가치 차별화

---

## 🆓 FREE 플랜 (현재 기능)

### 핵심 기능
- ✅ 맛집 리스트 열람 (일 10개 제한)
- ✅ 기본 필터 (지역, 카테고리, 신뢰 그룹)
- ✅ 신뢰 근거 확인
- ✅ 네이버 지도 길찾기
- ✅ 댓글 읽기

### 제한사항
- ❌ 저장: 최대 5개
- ❌ 고급 필터 없음
- ❌ 알림 없음
- ❌ 광고 표시

---

## 💎 PRO 플랜 (월 9,900원)

### Phase 1: 기본 PRO 기능 (2주)

#### 1. 무제한 열람 & 저장
```javascript
// 이미 permissions.js에 구현됨
✅ 일일 조회 제한 해제
✅ 저장 개수 제한 해제
```

#### 2. 고급 필터 시스템
**파일: `assets/js/features/advanced-filters.js`**

```javascript
const AdvancedFilters = {
  filters: {
    budget: { min: 0, max: 500000 }, // 예산 범위
    atmosphere: [],                  // 분위기: 데이트, 비즈니스, 가족, 친구
    mealTime: [],                    // 식사 시간: 브런치, 런치, 디너
    parking: null,                   // 주차 가능 여부
    reservation: null,               // 예약 필수 여부
    privateRoom: null                // 룸 있음
  },

  // 필터 UI 렌더링
  render() {
    if (!PermissionsModule.can('advancedFilters')) {
      return this.renderLockedUI();
    }

    return `
      <div class="advanced-filters">
        <h3>고급 필터 (PRO)</h3>

        <!-- 예산 필터 -->
        <div class="filter-group">
          <label>예산 (1인 기준)</label>
          <div class="budget-slider">
            <input type="range" min="0" max="500000" step="10000"
                   id="budgetMin" value="${this.filters.budget.min}">
            <input type="range" min="0" max="500000" step="10000"
                   id="budgetMax" value="${this.filters.budget.max}">
            <span class="budget-display">
              ${this.formatPrice(this.filters.budget.min)} ~
              ${this.formatPrice(this.filters.budget.max)}
            </span>
          </div>
        </div>

        <!-- 분위기 필터 -->
        <div class="filter-group">
          <label>분위기</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="date"> 💕 데이트</label>
            <label><input type="checkbox" value="business"> 💼 비즈니스</label>
            <label><input type="checkbox" value="family"> 👨‍👩‍👧 가족</label>
            <label><input type="checkbox" value="friends"> 🎉 친구</label>
          </div>
        </div>

        <!-- 식사 시간 -->
        <div class="filter-group">
          <label>식사 시간</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="brunch"> 🥞 브런치</label>
            <label><input type="checkbox" value="lunch"> 🍱 런치</label>
            <label><input type="checkbox" value="dinner"> 🍽️ 디너</label>
          </div>
        </div>

        <!-- 부가 조건 -->
        <div class="filter-group">
          <label>부가 조건</label>
          <div class="checkbox-group">
            <label><input type="checkbox" id="parking"> 🅿️ 주차 가능</label>
            <label><input type="checkbox" id="privateRoom"> 🚪 룸 있음</label>
          </div>
        </div>

        <button onclick="AdvancedFilters.applyFilters()">
          필터 적용
        </button>
      </div>
    `;
  },

  renderLockedUI() {
    return `
      <div class="advanced-filters locked">
        <div class="lock-overlay">
          <div class="lock-icon">🔒</div>
          <h3>고급 필터는 PRO 플랜부터!</h3>
          <p>예산, 분위기, 식사 시간 등으로<br>원하는 맛집을 정확하게 찾아보세요</p>
          <button onclick="PermissionsModule.showUpgradeModal('고급 필터 기능은 PRO 플랜부터 이용할 수 있습니다.')">
            PRO 플랜 시작하기
          </button>
        </div>
      </div>
    `;
  },

  formatPrice(price) {
    if (price >= 1000000) return '제한 없음';
    return price.toLocaleString() + '원';
  },

  applyFilters() {
    // data.js의 allRestaurants를 필터링
    const filtered = window.allRestaurants.filter(r => {
      // 예산 체크
      if (r.avgPrice < this.filters.budget.min ||
          r.avgPrice > this.filters.budget.max) {
        return false;
      }

      // 분위기 체크
      if (this.filters.atmosphere.length > 0) {
        const hasMatch = this.filters.atmosphere.some(a =>
          r.atmosphere?.includes(a)
        );
        if (!hasMatch) return false;
      }

      // 기타 필터들...
      return true;
    });

    // 결과 표시
    ListScreen.renderRestaurants(filtered);
  }
};
```

#### 3. 신규 맛집 알림 (주 1회)
**구현 방법: Cloudflare Cron Trigger + Resend Email API**

```javascript
// functions/api/send-weekly-digest.js
export async function onRequest(context) {
  const { RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = context.env;

  // PRO/PREMIUM 사용자 가져오기
  const { data: users } = await supabase
    .from('profiles')
    .select('email, subscription_plan')
    .in('subscription_plan', ['pro', 'premium']);

  // 최근 7일간 추가된 맛집
  const newRestaurants = getRecentlyAddedRestaurants(7);

  // 이메일 발송
  for (const user of users) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Trust Route <hello@kpopeats.cc>',
        to: user.email,
        subject: '🍽️ 이번 주 새로 추가된 맛집을 확인하세요!',
        html: generateEmailHTML(newRestaurants)
      })
    });
  }

  return new Response('OK', { status: 200 });
}
```

**Cloudflare Pages → Settings → Functions → Cron Triggers**
```
Schedule: 0 9 * * 1  (매주 월요일 오전 9시)
Path: /api/send-weekly-digest
```

#### 4. 광고 제거
```javascript
// index.html에서
<script>
if (PermissionsModule.getCurrentTier() === 'free') {
  // Google AdSense 표시
  (adsbygoogle = window.adsbygoogle || []).push({});
} else {
  // PRO/PREMIUM은 광고 숨김
  document.querySelectorAll('.ad-banner').forEach(el => el.remove());
}
</script>
```

---

## 👑 PREMIUM 플랜 (월 29,900원)

### Phase 2: AI 맞춤 추천 (3-4주)

#### 1. 사용자 취향 학습
**수집 데이터:**
- 조회한 맛집 (카테고리, 가격대, 지역)
- 저장한 맛집
- 댓글 작성한 맛집
- 클릭한 신뢰 그룹 (미쉐린, 유명인, 흑백요리사)

```sql
-- 취향 프로필 테이블
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  favorite_categories TEXT[],     -- ['이탈리안', '프렌치']
  preferred_price_range INT[],    -- [30000, 100000]
  preferred_locations TEXT[],     -- ['강남', '이태원']
  trust_group_weights JSONB,      -- {"michelin": 0.5, "celebrity": 0.3, "chef": 0.2}
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. AI 추천 엔진
**Option A: OpenAI GPT-4 (빠른 구현)**

```javascript
// functions/api/get-recommendations.js
import OpenAI from 'openai';

export async function onRequest(context) {
  const { OPENAI_API_KEY } = context.env;
  const { userId } = await context.request.json();

  // 사용자 취향 가져오기
  const preferences = await getUserPreferences(userId);
  const history = await getUserHistory(userId);

  // GPT-4에게 추천 요청
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: "당신은 Trust Route의 맛집 추천 AI입니다. 사용자의 취향을 분석하여 최적의 맛집을 추천하세요."
    }, {
      role: "user",
      content: `
사용자 취향:
- 선호 카테고리: ${preferences.favorite_categories.join(', ')}
- 선호 가격대: ${preferences.preferred_price_range[0]}~${preferences.preferred_price_range[1]}원
- 선호 지역: ${preferences.preferred_locations.join(', ')}

최근 방문/저장한 맛집:
${history.map(r => `- ${r.name} (${r.category}, ${r.location})`).join('\n')}

Trust Route의 전체 맛집 리스트에서 이 사용자에게 가장 적합한 5곳을 추천하고, 각각 이유를 설명해주세요.
      `
    }],
    temperature: 0.7
  });

  return new Response(JSON.stringify({
    recommendations: parseGPTResponse(completion.choices[0].message.content)
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

**Option B: Vector DB (정확도 높음, 복잡)**
- Pinecone/Weaviate로 맛집 임베딩 저장
- 사용자 행동 벡터화
- 코사인 유사도로 추천

#### 3. 추천 UI
```javascript
// assets/js/features/ai-recommendations.js
const AIRecommendations = {
  async load() {
    if (!PermissionsModule.can('aiRecommendations')) {
      return this.renderLockedUI();
    }

    const loading = document.getElementById('ai-recommendations');
    loading.innerHTML = '<div class="loading">AI가 당신의 취향을 분석 중...</div>';

    const res = await fetch('/api/get-recommendations', {
      method: 'POST',
      body: JSON.stringify({ userId: AuthModule.getUserId() })
    });
    const { recommendations } = await res.json();

    this.render(recommendations);
  },

  render(recommendations) {
    return `
      <div class="ai-recommendations">
        <h2>✨ AI가 추천하는 맛집</h2>
        <p class="subtitle">당신의 취향을 분석한 맞춤 추천입니다</p>

        ${recommendations.map(rec => `
          <div class="recommendation-card">
            <div class="restaurant-info">
              <h3>${rec.name}</h3>
              <span class="category">${rec.category}</span>
              <span class="location">${rec.location}</span>
            </div>
            <div class="ai-reason">
              <strong>추천 이유:</strong>
              <p>${rec.reason}</p>
            </div>
            <button onclick="Router.navigateTo('detail', {restaurantId: '${rec.id}'})">
              자세히 보기
            </button>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderLockedUI() {
    return `
      <div class="ai-recommendations locked">
        <div class="lock-overlay">
          <div class="ai-badge">✨ AI</div>
          <h2>AI 맞춤 추천</h2>
          <p>당신의 취향을 학습하여<br>딱 맞는 맛집을 추천해드립니다</p>
          <ul class="features">
            <li>📊 취향 분석 기반 추천</li>
            <li>🎯 정확도 95% 이상</li>
            <li>🔄 매일 업데이트</li>
          </ul>
          <button onclick="PermissionsModule.showUpgradeModal('AI 추천은 PREMIUM 플랜 전용입니다.')">
            PREMIUM 플랜 시작하기
          </button>
        </div>
      </div>
    `;
  }
};
```

### Phase 3: 독점 콘텐츠 (2-3주)

#### 1. 셰프 인터뷰
```javascript
// assets/js/data/exclusive-content.js
const exclusiveContent = [
  {
    id: 'interview-001',
    type: 'interview',
    chef: '안성재',
    restaurant: '몰토',
    title: '안성재 셰프가 말하는 이탈리안의 정수',
    thumbnail: 'assets/images/exclusive/interview-001.jpg',
    content: `
      <article>
        <h2>20년 경력의 안성재 셰프가 직접 공개하는 파스타의 비밀</h2>
        <p>...</p>
      </article>
    `,
    publishedAt: '2026-02-01',
    premiumOnly: true
  },
  // ...
];
```

#### 2. 미공개 오픈 예정 맛집
```javascript
// 데이터베이스에 coming_soon 플래그 추가
{
  id: 'rest-999',
  name: '[독점] 3월 오픈 예정 - ★★★ 셰프의 신작',
  status: 'coming_soon',
  openDate: '2026-03-15',
  premiumOnly: true,
  exclusiveInfo: '미쉐린 3스타 출신 셰프가 서울에 처음 오픈하는 프렌치 레스토랑...'
}
```

#### 3. 숨은 명소 (Insider Tips)
```javascript
// Premium 회원만 볼 수 있는 추가 정보
{
  restaurantId: 'rest-001',
  insiderTips: [
    '💡 화요일 런치는 디너의 70% 가격으로 같은 메뉴 가능',
    '💡 카운터석에 앉으면 셰프와 대화하며 식사 가능',
    '💡 트러플 시즌 (11-2월)에 방문하면 특별 메뉴 제공'
  ]
}
```

### Phase 4: 예약 대행 서비스 (2-3주)

#### 구현 방법
**Option A: 수동 예약 대행 (초기)**
- PREMIUM 회원이 예약 요청 폼 작성
- 운영팀이 수동으로 전화 예약
- 월 2회 무료 제공

**Option B: 자동화 (장기)**
- Catchtable/TableManager API 연동
- 자동 예약 & 확정 알림

```javascript
// 예약 요청 폼
const ReservationRequest = {
  render() {
    return `
      <form id="reservation-request-form">
        <h3>예약 대행 서비스 (PREMIUM 전용)</h3>
        <p class="subtitle">월 2회 무료 이용 가능</p>

        <label>맛집 선택</label>
        <select name="restaurant_id" required>
          ${allRestaurants.map(r => `
            <option value="${r.id}">${r.name}</option>
          `).join('')}
        </select>

        <label>예약 날짜</label>
        <input type="date" name="date" required>

        <label>예약 시간</label>
        <select name="time">
          <option>12:00</option>
          <option>13:00</option>
          <option>18:00</option>
          <option>19:00</option>
          <option>20:00</option>
        </select>

        <label>인원</label>
        <input type="number" name="guests" min="1" max="10" required>

        <label>요청사항</label>
        <textarea name="notes" placeholder="특별한 요청사항이 있으시면 적어주세요"></textarea>

        <button type="submit">예약 신청</button>
      </form>
    `;
  },

  async submit(formData) {
    const res = await fetch('/api/reservation-request', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('예약 신청이 완료되었습니다! 24시간 이내에 확정 결과를 알려드립니다.');
    }
  }
};
```

---

## 개발 우선순위

### Week 1-2: PRO 플랜 핵심
1. ✅ 고급 필터 시스템
2. ✅ 무제한 저장/조회
3. ✅ 광고 제거

### Week 3-4: PRO 플랜 완성
4. ✅ 주간 알림 이메일
5. ✅ 사용량 대시보드

### Week 5-7: PREMIUM 플랜 AI
6. ✅ 취향 학습 시스템
7. ✅ AI 추천 엔진 (GPT-4)
8. ✅ 추천 UI

### Week 8-10: PREMIUM 플랜 콘텐츠
9. ✅ 독점 콘텐츠 (셰프 인터뷰 3개)
10. ✅ 미공개 맛집 정보 (5개)
11. ✅ 예약 대행 서비스 (수동)

---

## 예상 비용

### AI 추천 (OpenAI GPT-4)
- GPT-4 API: 추천 1회당 약 $0.05
- 월 1,000명 PREMIUM 사용자 × 주 1회 추천 = 약 $200/월 (30만원)

### 이메일 발송 (Resend)
- PRO 사용자 5,000명 × 주 1회 = 월 20,000건
- Resend 무료 플랜: 월 3,000건 → Pro 플랜 $20/월 필요

### 예약 대행 인력
- 초기: 운영팀 1명 (시간당 3-5건 처리 가능)
- 수익화 시: 자동화 API 도입 검토

---

## 성공 지표 (KPI)

### PRO 플랜
- 전환율: Free → PRO 5% 이상
- 평균 체류 시간: +50%
- 고급 필터 사용률: 80% 이상

### PREMIUM 플랜
- 전환율: PRO → PREMIUM 15% 이상
- AI 추천 클릭률: 60% 이상
- 예약 대행 만족도: 4.5/5 이상
- 독점 콘텐츠 열람률: 70% 이상

---

## 다음 단계

1. **PRO 플랜 먼저 완성** (2주 내)
   - 고급 필터만 잘 만들어도 전환율 확보 가능

2. **100명 유료 사용자 확보 후 PREMIUM 개발**
   - 초기 검증 완료 후 고급 기능 투자

3. **사용자 피드백 기반 반복 개선**
   - 어떤 필터를 가장 많이 쓰는지 분석
   - AI 추천 정확도 개선
