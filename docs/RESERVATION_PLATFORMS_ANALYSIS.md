# 레스토랑 예약 플랫폼 분석 리포트

## 조사 일자: 2026-02-02

---

## 1. 플랫폼 개요 및 비교

### A. 캐치테이블 (Catch Table) ⭐️⭐️⭐️⭐️⭐️

**특징:**
- 국내 1위 파인다이닝 예약 플랫폼
- 350만+ 유저, 10,000+ 맛집 등록
- **미쉐린 레스토랑 커버리지 가장 높음**
- 2026년 신년 프로젝트: 16개 테마 154개 맛집 큐레이션

**URL 구조:**
```
https://app.catchtable.co.kr/ct/shop/[레스토랑명-영문]

예시:
- 밍글스: https://app.catchtable.co.kr/ct/shop/mingles
- 정식당: https://app.catchtable.co.kr/ct/shop/jungsik (추정)
- 선명: https://app.catchtable.co.kr/ct/shop/seonmyeong
```

**딥링크 지원:**
- 모바일 앱 자동 실행 지원
- 웹→앱 seamless 전환

**Trust Route 연동 추천도: ★★★★★**

**장점:**
- 미쉐린/파인다이닝 레스토랑 대부분 등록
- 사용자 친화적 UX
- 웨이팅 기능도 제공
- 예약 취소/변경 간편

**단점:**
- 일부 소규모 맛집 미등록
- 예약 경쟁 치열 (인기 맛집)

---

### B. 테이블링 (Tabling) ⭐️⭐️⭐️⭐️

**특징:**
- 원격 줄서기(웨이팅) 특화
- 즉시 예약 가능
- 대중적 맛집 커버리지 높음

**URL 구조:**
```
https://www.tabling.co.kr/restaurant/[레스토랑ID-숫자]

예시:
- 브루클린더버거조인트: https://www.tabling.co.kr/restaurant/12790
- 라스트춘선: https://www.tabling.co.kr/restaurant/8519
```

**알림톡 링크:**
```
https://noti.tabling.co.kr/link/point?path=restaurant_details&restaurant_idx=[ID]
```

**Trust Route 연동 추천도: ★★★★☆**

**장점:**
- 웨이팅 기능 강력 (노쇼 방지)
- 대중적 맛집 다수
- 빠른 예약 확정

**단점:**
- 파인다이닝 커버리지 낮음
- 레스토랑 ID 파악 어려움 (크롤링 필요)

---

### C. 네이버 예약 (Naver Booking) ⭐️⭐️⭐️⭐️

**특징:**
- 네이버 지도/플레이스 통합
- 2025년 11월 "예약" 탭 신설
- 일본 타베로그 제휴 (2026년 1월)

**URL 구조:**
```
네이버 플레이스 ID 기반
https://map.naver.com/v5/entry/place/[PLACE_ID]
→ 내부 예약 탭 클릭 필요

또는
https://booking.naver.com/booking/[BOOKING_ID] (추정)
```

**Trust Route 연동 추천도: ★★★☆☆**

**장점:**
- 네이버 생태계 연동 (검색→예약 일원화)
- 사용자 익숙함
- POS 시스템 연동 지원

**단점:**
- 직접 예약 딥링크 어려움 (플레이스 페이지 거쳐야 함)
- URL 구조 복잡
- 비즈니스 ID 파악 수동 작업 필요

---

### D. 카카오톡 채널 예약 ⭐️⭐️⭐️

**특징:**
- 카카오톡 채널 기반
- 테이블매니저 통합 솔루션
- 챗봇 예약 지원

**URL 구조:**
```
https://pf.kakao.com/[채널ID]

예시:
- 테이블링 채널: https://pf.kakao.com/_nxeLxiu
```

**Trust Route 연동 추천도: ★★★☆☆**

**장점:**
- 카카오톡 사용자 접근성 높음
- 알림톡 자동 발송
- 예약금 결제 기능

**단점:**
- 채널 ID 파악 어려움
- 레스토랑별 개별 설정 필요
- 일부 레스토랑만 지원

---

### E. 다이닝코드 (DiningCode) ⭐️☆☆☆☆

**특징:**
- 빅데이터 기반 맛집 검색
- 리뷰/평점 플랫폼

**URL 구조:**
```
https://www.diningcode.com/profile.php?rid=[레스토랑ID]
```

**Trust Route 연동 추천도: ★☆☆☆☆**

**장점:**
- 맛집 정보 풍부
- 리뷰 신뢰도 높음

**단점:**
- **예약 기능 없음** (정보 제공만)
- 외부 예약 링크로 연결

---

### F. 직접 전화 예약 ⭐️⭐️⭐️⭐️⭐️

**특징:**
- 가장 확실한 방법
- 모든 레스토랑 지원

**Trust Route 연동 추천도: ★★★★★**

**장점:**
- 100% 호환
- 특별 요청 가능 (생일, 알러지 등)
- 예약 확정 즉시 확인

**단점:**
- 사용자 불편 (전화 걸어야 함)
- 영업시간 제한

---

## 2. Trust Route 연동 전략 (우선순위)

### 🥇 1순위: 캐치테이블
**이유:**
- 미쉐린/파인다이닝 맛집 대부분 등록
- 깔끔한 딥링크 구조 (`/shop/[레스토랑명]`)
- Trust Route 타겟 사용자와 일치

**구현 방법:**
```javascript
// data.js 예시
{
  id: "rest-001",
  name: "밍글스",
  // ...
  reservationLinks: {
    primary: "catchtable",
    catchtable: "https://app.catchtable.co.kr/ct/shop/mingles",
    phone: "02-515-7306"
  }
}
```

### 🥈 2순위: 직접 전화번호
**이유:**
- 모든 레스토랑 지원
- 예약 실패 없음
- `tel:` 스킴으로 원클릭 통화

**구현 방법:**
```html
<a href="tel:02-515-7306" class="btn-call">
  📞 전화 예약 (02-515-7306)
</a>
```

### 🥉 3순위: 테이블링 (선택적)
**이유:**
- 대중적 맛집 커버리지 높음
- 웨이팅 기능 유용

**구현 방법:**
- ID 파악 후 개별 추가
- 캐치테이블 미등록 맛집 대상

---

## 3. 데이터 수집 작업 계획

### Phase 1: 캐치테이블 링크 수집 (우선)

**대상 레스토랑 (우선순위):**

#### 미쉐린 맛집 (30개)
1. ✅ 밍글스 → `/mingles`
2. 정식당 → `/jungsik` (확인 필요)
3. 라연 → `/layeon` (확인 필요)
4. 코지마 → `/kojima` (확인 필요)
5. 우래옥 → `/uhraeok` (확인 필요)
6. 권숙수 → `/kwonsooksoo` (확인 필요)
... (계속)

**수집 방법:**
1. 캐치테이블 앱/웹 검색
2. 레스토랑명 → URL 매핑
3. 404 체크 (존재하지 않는 경우 전화번호만)

### Phase 2: 전화번호 수집 (필수)

**출처:**
- 네이버 플레이스
- Google Maps
- 레스토랑 공식 웹사이트

**수집 항목:**
```javascript
{
  phone: "02-515-7306",
  phoneFormatted: "02-515-7306",
  businessHours: "런치 12:00-15:00 / 디너 18:00-22:00",
  closedDays: "일요일"
}
```

### Phase 3: 추가 정보 수집 (부가 가치)

**예약 난이도 분석:**
```javascript
{
  reservationDifficulty: "high", // high/medium/low
  reservationAdvice: "2주 전 예약 필수, 주말은 1개월 전",
  reservationTips: "런치가 디너보다 예약 쉬움"
}
```

**가격 정보 (구독자 전용):**
```javascript
{
  priceRange: "150,000-200,000원",
  priceCategory: "파인다이닝",
  priceNote: "런치 코스 70,000원부터"
}
```

---

## 4. 실제 구현 예시

### A. 예약 버튼 UI (DetailScreen)

```html
<!-- 구독자 전용 -->
<div class="reservation-section">
  <h3>예약하기</h3>

  <!-- 난이도 배지 -->
  <div class="difficulty-badge high">
    🔥 예약 어려움 - 2주 전 필수
  </div>

  <!-- 예약 옵션 -->
  <div class="reservation-options">
    <!-- 캐치테이블 (우선) -->
    <button
      onclick="ReservationModule.open('rest-001', 'catchtable')"
      class="btn-reservation primary">
      <img src="assets/catchtable-logo.png" width="20">
      캐치테이블에서 예약 (추천)
    </button>

    <!-- 전화 예약 -->
    <a
      href="tel:02-515-7306"
      class="btn-reservation phone">
      📞 전화 예약 (02-515-7306)
    </a>

    <!-- 영업시간 안내 -->
    <p class="small">
      런치 12:00-15:00 / 디너 18:00-22:00 (일요일 휴무)
    </p>
  </div>

  <!-- 예약 팁 -->
  <div class="reservation-tips">
    <h4>💡 예약 팁</h4>
    <ul>
      <li>주말 디너는 1개월 전 예약 권장</li>
      <li>런치 코스가 디너보다 예약 쉬움</li>
      <li>노쇼 시 3개월 예약 제한</li>
    </ul>
  </div>
</div>
```

### B. JavaScript 구현

```javascript
// main.js - ReservationModule
const ReservationModule = {
  open(restaurantId, platform) {
    // 1. 구독자 체크
    if (!AuthModule.isSubscriber()) {
      PaywallModal.show('reservation');
      return;
    }

    // 2. 레스토랑 정보 조회
    const restaurant = window.allRestaurants.find(r => r.id === restaurantId);
    if (!restaurant || !restaurant.reservationLinks) {
      alert('예약 정보를 찾을 수 없습니다.');
      return;
    }

    // 3. 플랫폼별 링크 가져오기
    const link = restaurant.reservationLinks[platform];
    if (!link) {
      alert('해당 예약 방법을 이용할 수 없습니다.');
      return;
    }

    // 4. 추적 (Analytics)
    this.trackReservationClick(restaurantId, platform);

    // 5. 딥링크 열기
    if (platform === 'phone') {
      // 전화는 바로 실행
      window.location.href = link;
    } else {
      // 웹 링크는 새 창
      window.open(link, '_blank');

      // 방문 인증 안내 토스트
      setTimeout(() => {
        showToast('💡 방문 후 인증하면 만족도 낮을 시 환불 가능!');
      }, 1000);
    }
  },

  async trackReservationClick(restaurantId, platform) {
    // Supabase 기록
    try {
      await supabase.from('reservation_clicks').insert({
        user_id: AuthModule.currentUser?.id,
        restaurant_id: restaurantId,
        platform: platform,
        clicked_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('추적 실패:', err);
    }

    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'reservation_click', {
        restaurant_id: restaurantId,
        platform: platform
      });
    }
  }
};
```

---

## 5. 데이터 스키마 업데이트

### data.js 구조 개선

```javascript
const nearbySpots = [
  {
    id: "rest-001",
    name: "밍글스",
    location: "서울 강남구",
    category: "이노베이티브",
    mainMenu: "멸치 국수와 전복",

    // ... 기존 필드

    // ✨ 새로 추가: 예약 정보
    reservation: {
      // 예약 링크
      links: {
        primary: "catchtable",  // 우선 추천
        catchtable: "https://app.catchtable.co.kr/ct/shop/mingles",
        phone: "tel:02-515-7306"
      },

      // 예약 난이도
      difficulty: "high",  // high/medium/low
      advice: "2주 전 예약 필수, 주말은 1개월 전",
      tips: [
        "주말 디너는 1개월 전 예약 권장",
        "런치 코스가 디너보다 예약 쉬움",
        "노쇼 시 3개월 예약 제한"
      ],

      // 연락처 정보
      contact: {
        phone: "02-515-7306",
        phoneFormatted: "02-515-7306",
        hours: "런치 12:00-15:00 / 디너 18:00-22:00",
        closedDays: ["일요일"]
      }
    },

    // ✨ 새로 추가: 가격 정보 (구독자 전용)
    pricing: {
      range: "150,000-200,000원",
      category: "파인다이닝",
      lunchFrom: 70000,
      dinnerFrom: 150000,
      note: "1인 기준, 주류 별도"
    },

    // ✨ 새로 추가: 추천 메뉴 (구독자 전용)
    recommendedDishes: [
      {
        name: "멸치 국수와 전복",
        type: "시그니처",
        price: null,  // 코스에 포함
        description: "밍글스의 대표 요리"
      },
      {
        name: "한우 등심",
        type: "메인",
        price: null,
        description: ""
      }
    ]
  }
];
```

---

## 6. 추적 데이터베이스 스키마

### reservation_clicks 테이블

```sql
CREATE TABLE reservation_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  restaurant_id TEXT NOT NULL,
  platform TEXT NOT NULL,  -- 'catchtable', 'phone', 'tabling', etc.
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT
);

-- 인덱스
CREATE INDEX idx_reservation_clicks_user ON reservation_clicks(user_id);
CREATE INDEX idx_reservation_clicks_restaurant ON reservation_clicks(restaurant_id);
CREATE INDEX idx_reservation_clicks_date ON reservation_clicks(clicked_at);

-- RLS 정책
ALTER TABLE reservation_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert clicks"
  ON reservation_clicks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own clicks"
  ON reservation_clicks FOR SELECT
  USING (auth.uid() = user_id);
```

---

## 7. 다음 단계 액션 아이템

### Week 1: 데이터 수집
- [ ] 캐치테이블 링크 수집 (미쉐린 30개 우선)
- [ ] 전화번호 수집 (전체 100개)
- [ ] 영업시간 수집
- [ ] 예약 난이도 분석

### Week 2: 코드 구현
- [ ] data.js 스키마 업데이트
- [ ] ReservationModule 구현
- [ ] DetailScreen UI 추가
- [ ] reservation_clicks 테이블 생성

### Week 3: 테스트
- [ ] 딥링크 동작 확인 (모바일/데스크탑)
- [ ] 추적 데이터 수집 확인
- [ ] 구독자/비구독자 분기 테스트

### Week 4: 데이터 보강
- [ ] 가격 정보 수집 (구독자 전용)
- [ ] 추천 메뉴 선정
- [ ] 예약 팁 작성

---

## 8. 예상 효과

### 사용자 가치
- ✅ 원클릭 예약 (3초 이내)
- ✅ 최적의 예약 방법 안내
- ✅ 예약 실패 확률 감소
- ✅ 시간 절약 (5-10분/회)

### 비즈니스 가치
- ✅ 구독 전환율 증가 (예약 = Killer Feature)
- ✅ 사용자 행동 데이터 수집
- ✅ 파트너십 기회 (캐치테이블 제휴 가능)
- ✅ 차별화 포인트 강화

---

## Sources

- [캐치테이블](https://app.catchtable.co.kr/)
- [테이블링](https://www.tabling.co.kr/)
- [네이버 예약 - 나무위키](https://namu.wiki/w/%EB%84%A4%EC%9D%B4%EB%B2%84%20%EC%98%88%EC%95%BD)
- [카카오톡 예약하기 가이드](https://kakaobusiness.gitbook.io/main/tool/booking)
- [다이닝코드](https://www.diningcode.com/)
- [미쉐린 가이드 서울 2025](https://guide.michelin.com/kr/ko)
