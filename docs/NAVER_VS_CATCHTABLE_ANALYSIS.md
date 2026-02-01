# 네이버 예약 vs 캐치테이블 심층 비교 분석

## 조사 일자: 2026-02-02

---

## Executive Summary

**결론**: Trust Route는 **캐치테이블 + 네이버 플레이스 하이브리드 전략**이 최적

- **캐치테이블**: 미쉐린/파인다이닝 (Trust Route 주력)
- **네이버 플레이스**: 대중 맛집 + 정보 보완

---

## 1. 플랫폼 비교표

| 항목 | 네이버 예약 | 캐치테이블 |
|------|-----------|-----------|
| **시장 점유율** | 압도적 (네이버 생태계) | 파인다이닝 1위 |
| **사용자 수** | 수천만 (네이버 이용자) | 350만+ |
| **레스토랑 수** | 수만 개 (추정) | 10,000+ |
| **타겟 고객** | 일반 대중 | 미식가, 파인다이닝 |
| **예약 난이도** | 낮음 | 높음 (인기 맛집) |
| **미쉐린 커버리지** | ❌ 낮음 | ✅ 높음 (독점 다수) |
| **대중 맛집** | ✅ 높음 | △ 중간 |
| **URL 구조** | 복잡 | 단순 |
| **딥링크** | 어려움 | 쉬움 |
| **Trust Route 적합도** | ★★★☆☆ | ★★★★★ |

---

## 2. 네이버 예약 심층 분석

### A. 플랫폼 구조

#### URL 패턴 (3가지)

```
1. 네이버 플레이스 (정보 조회)
https://map.naver.com/v5/entry/place/[PLACE_ID]?c=[좌표,줌레벨]

예시:
- 밍글스: place/159330481?c=14122634.3334544,4516874.2031988,14,0,0,0,dh
  → PLACE_ID는 159330481

2. 네이버 예약 (예약 페이지)
https://booking.naver.com/booking/5/bizes/[BUSINESS_ID]

예시:
- 일반 음식점: /booking/5/bizes/204179
- 특정 메뉴: /booking/5/bizes/[ID]/items/[ITEM_ID]?theme=place&area=plt

3. 모바일 예약 (m.)
https://m.booking.naver.com/booking/[경로]
```

#### 2025년 11월 대규모 업데이트

**네이버 지도 "예약 탭" 신설** (2025.11.10 발표)

- 식당, 카페 예약
- 레저/티켓 예약
- 체험/클래스 예약
- 여행, 항공권 예약
- **통합 검색**: "예약 가능한 맛집" 필터

**주요 기능**:
- 예약 전: 장소 발견 → 예약 가능 여부 확인
- 예약 후: 일정 리마인더 + 주변 추천
- 다국어 지원: 영어, 중국어, 일본어 (외국인 관광객)

### B. 강점 (Strengths)

#### 1. 압도적인 생태계
```
사용자 여정:
검색 (네이버)
  → 정보 (네이버 플레이스)
  → 예약 (네이버 예약)
  → 길찾기 (네이버 지도)
  → 결제 (네이버페이)

= 이탈 없는 완벽한 통합
```

#### 2. 대중적 접근성
- 한국인 90%+ 네이버 사용
- 로그인 불필요 (일부 서비스)
- 익숙한 UI/UX

#### 3. POS 연동 자동화
- 토스포스, 페이히어 등 연동
- 실시간 예약 확정
- 노쇼 방지 (선결제)

#### 4. 다양한 업종 지원
- 음식점, 카페
- 미용실, 병원
- 숙박, 레저
- 공연, 전시

### C. 약점 (Weaknesses)

#### 1. 파인다이닝 커버리지 낮음 ❌

**실제 조사 결과**:
- ❌ 밍글스: 네이버 예약 없음 → 캐치테이블 독점
- ❌ 정식당: 네이버 예약 없음 → 캐치테이블 독점
- ❌ 라연: 네이버 예약 없음 → 캐치테이블 + TableCheck
- ❌ 권숙수: 네이버 예약 없음 → 캐치테이블 독점

**이유**:
- 미쉐린 레스토랑은 캐치테이블과 배타적 계약
- 파인다이닝은 예약 관리 시스템 별도 운영
- 네이버 예약은 대중 음식점 위주

#### 2. URL 구조 복잡 ❌

**PLACE_ID와 BUSINESS_ID 불일치**:
```
네이버 플레이스 ID: 159330481 (지도에서 보이는 ID)
≠
네이버 예약 BUSINESS_ID: ????????? (예약 시스템 내부 ID)

문제:
- 플레이스에서 예약 링크로 직접 이동 불가
- BUSINESS_ID 파악 어려움 (크롤링 필요)
- 딥링크 생성 복잡
```

#### 3. 딥링크 어려움 ❌

```javascript
// 캐치테이블 (쉬움)
const url = `https://app.catchtable.co.kr/ct/shop/${restaurantName}`;
window.open(url);

// 네이버 예약 (어려움)
const placeId = "159330481"; // 어떻게 얻지?
const businessId = "???????"; // 이건 또 어떻게 얻지?
const url = `https://booking.naver.com/booking/5/bizes/${businessId}`;
// 게다가 예약 가능 여부도 별도 확인 필요
```

#### 4. 레스토랑 주도권 없음

- 레스토랑이 직접 등록해야 함
- Trust Route에서 제어 불가
- 예약 가능 여부 실시간 확인 API 없음

---

## 3. 캐치테이블 심층 분석

### A. 플랫폼 구조

#### URL 패턴 (단순!)

```
https://app.catchtable.co.kr/ct/shop/[영문명]

예시:
- 밍글스: /ct/shop/mingles
- 정식당: /ct/shop/jungsik
- 라연: /ct/shop/layeon.shilla (호텔 레스토랑)
- 권숙수: catchtable.co.kr/kwonsooksoo (구 도메인)

→ 레스토랑명만 알면 OK!
```

#### 최근 동향 (2026년 1월)

**신년 프로젝트**: 16개 테마 154개 맛집 큐레이션
- 미쉐린 스타
- 호텔 다이닝
- 일식 오마카세
- 한우 오마카세
- 라멘, 베이커리, 이자카야, 한식 등

### B. 강점 (Strengths)

#### 1. 미쉐린/파인다이닝 독점 ✅

**Trust Route 주요 맛집 100% 커버**:
- ✅ 밍글스 (미쉐린 3스타)
- ✅ 정식당 (미쉐린 2스타)
- ✅ 라연 (미쉐린 2스타)
- ✅ 권숙수 (미쉐린 2스타)
- ✅ 트리드 (흑백요리사)
- ✅ 비아 톨레도 (흑백요리사)

**배타적 계약**:
- 매월 1일 오전 11시 예약 오픈
- 캐치테이블에서만 예약 가능
- 전화 예약도 제한적

#### 2. 단순한 딥링크 ✅

```javascript
// 즉시 구현 가능!
const reservation = {
  mingles: "https://app.catchtable.co.kr/ct/shop/mingles",
  jungsik: "https://app.catchtable.co.kr/ct/shop/jungsik",
  // ...
};

function openReservation(restaurantId) {
  window.open(reservation[restaurantId], '_blank');
}
```

#### 3. 미식가 타겟팅 ✅

- Trust Route 사용자 = 캐치테이블 사용자
- 높은 결제 의향
- 예약 노쇼율 낮음

#### 4. 웨이팅 + 예약 통합 ✅

- 실시간 웨이팅 기능
- 예약금 결제 시스템
- 취소 페널티 (노쇼 방지)

### C. 약점 (Weaknesses)

#### 1. 대중 맛집 커버리지 낮음 ❌

- 일반 음식점 등록 적음
- 가성비 맛집 부족
- 동네 맛집 미등록

#### 2. 사용자 진입장벽 ❌

- 앱 설치 필요 (일부 사용자)
- 네이버만큼 친숙하지 않음
- 예약 경쟁 치열 (스트레스)

---

## 4. Trust Route 최적 전략

### A. 하이브리드 모델 (양쪽 모두 활용)

```javascript
// data.js 구조
{
  id: "rest-001",
  name: "밍글스",

  reservation: {
    // 우선순위: 캐치테이블 > 네이버 플레이스 > 전화
    primary: "catchtable",

    links: {
      catchtable: "https://app.catchtable.co.kr/ct/shop/mingles",
      naverPlace: "https://map.naver.com/v5/entry/place/159330481",
      naverBooking: null, // 미지원
      phone: "tel:02-515-7306"
    },

    // 각 플랫폼 상태
    availability: {
      catchtable: true,
      naverBooking: false,
      phone: true
    }
  }
}
```

### B. 레스토랑 유형별 전략

#### Type 1: 미쉐린/파인다이닝 (Trust Route 주력)
```
1순위: 캐치테이블 (독점)
2순위: 전화
3순위: 네이버 플레이스 (정보만)

예: 밍글스, 정식당, 권숙수
```

#### Type 2: 흑백요리사 셰프 레스토랑
```
1순위: 캐치테이블
2순위: 전화
3순위: 네이버 플레이스

예: 트리드, 비아 톨레도, 리북방
```

#### Type 3: 유명인 방문 대중 맛집
```
1순위: 네이버 예약 (있으면)
2순위: 캐치테이블 (있으면)
3순위: 전화
4순위: 네이버 플레이스 (정보만)

예: 을지로보석, 금돼지식당, 잭슨피자
```

#### Type 4: 빕 구르망 (대중적 맛집)
```
1순위: 네이버 예약 (있으면)
2순위: 전화
3순위: 네이버 플레이스

예: 옥동식, 고향칼국수, 명동교자
```

### C. UI 구현 예시

```html
<!-- DetailScreen 예약 섹션 -->
<div class="reservation-section">
  <h3>예약하기</h3>

  <!-- 난이도 배지 -->
  <div class="difficulty-badge high">
    🔥 예약 어려움 - 2주 전 필수
  </div>

  <!-- 예약 옵션 -->
  <div class="reservation-options">

    <!-- 캐치테이블 (우선) -->
    <button class="btn-reservation primary" data-platform="catchtable">
      <img src="assets/catchtable-icon.png" width="20">
      <div class="btn-content">
        <strong>캐치테이블에서 예약</strong>
        <span class="label recommended">추천</span>
      </div>
    </button>

    <!-- 네이버 플레이스 (정보) -->
    <button class="btn-reservation secondary" data-platform="naver">
      <img src="assets/naver-icon.png" width="20">
      <div class="btn-content">
        <strong>네이버에서 정보 보기</strong>
        <span class="label info">리뷰 · 사진</span>
      </div>
    </button>

    <!-- 전화 예약 -->
    <a href="tel:02-515-7306" class="btn-reservation phone">
      📞 전화 예약 (02-515-7306)
    </a>
  </div>

  <!-- 예약 팁 -->
  <div class="reservation-tips">
    <h4>💡 예약 팁</h4>
    <ul>
      <li>캐치테이블 독점 예약 (매월 1일 오전 11시 오픈)</li>
      <li>주말 디너는 1개월 전 예약 권장</li>
      <li>런치 코스가 디너보다 예약 쉬움</li>
    </ul>
  </div>
</div>
```

---

## 5. 데이터 수집 전략

### A. 캐치테이블 링크 (100% 자동화 가능)

```javascript
// 패턴 기반 생성
const restaurantName = "밍글스";
const slug = restaurantName
  .toLowerCase()
  .replace(/\s+/g, '')
  .replace(/[^a-z0-9-]/g, '');
// "밍글스" → "mingles"

const catchtableUrl = `https://app.catchtable.co.kr/ct/shop/${slug}`;

// 404 체크
fetch(catchtableUrl, { method: 'HEAD' })
  .then(res => res.ok ? catchtableUrl : null);
```

**작업 계획**:
1. 전체 100개 맛집 영문명 매핑
2. URL 생성 스크립트 실행
3. 404 체크 (존재하지 않으면 null)
4. data.js 자동 업데이트

### B. 네이버 플레이스 ID (수동 작업 필요)

**방법 1: 네이버 검색**
```
1. 네이버에서 "밍글스 레스토랑" 검색
2. 플레이스 카드 클릭
3. URL에서 PLACE_ID 추출
   https://map.naver.com/v5/entry/place/159330481
   → 159330481
```

**방법 2: 네이버 지도 직접 검색**
```
1. map.naver.com 접속
2. 레스토랑명 검색
3. URL 복사
```

**작업 계획**:
1. 주요 맛집 50개 우선 작업
2. PLACE_ID 스프레드시트 정리
3. data.js 수동 입력

### C. 네이버 예약 BUSINESS_ID (포기 권장)

**이유**:
- 파악 방법 복잡 (크롤링 + 역공학)
- 미쉐린 레스토랑 대부분 미지원
- ROI 낮음

**대안**:
- 네이버 플레이스 링크만 제공 (정보 조회용)
- 예약은 캐치테이블 or 전화로 유도

---

## 6. 구현 우선순위 (4주 계획)

### Week 1: 캐치테이블 통합 ✅
- [x] 캐치테이블 링크 수집 (미쉐린 30개)
- [ ] data.js 스키마 업데이트
- [ ] ReservationModule 구현
- [ ] DetailScreen UI 추가

### Week 2: 네이버 플레이스 보강 ⭐️ (NEW)
- [ ] PLACE_ID 수집 (주요 50개)
- [ ] "네이버에서 보기" 버튼 추가
- [ ] 리뷰/사진 연동 안내

### Week 3: Freemium 구현
- [ ] 구독자 전용 예약 링크
- [ ] 비구독자 페이월
- [ ] reservation_clicks 추적

### Week 4: 데이터 완성
- [ ] 전화번호 수집 (전체 100개)
- [ ] 영업시간 수집
- [ ] 예약 팁 작성

---

## 7. 최종 권장 사항

### ✅ DO (반드시 해야 할 것)

1. **캐치테이블 우선**
   - 미쉐린/파인다이닝 = Trust Route 핵심
   - URL 구조 단순 = 빠른 구현
   - 사용자 기대 부합

2. **네이버 플레이스 보조**
   - 정보 조회 용도 (리뷰, 사진, 영업시간)
   - "네이버에서 보기" 버튼으로 추가 정보 제공
   - PLACE_ID만 수집 (BUSINESS_ID 불필요)

3. **전화번호 필수**
   - 100% 호환성
   - `tel:` 스킴 원클릭 통화
   - 예약 실패 방지

### ❌ DON'T (하지 말아야 할 것)

1. **네이버 예약 딥링크 구현 시도**
   - BUSINESS_ID 파악 어려움
   - 파인다이닝 미지원
   - ROI 낮음

2. **플랫폼 간 우선순위 혼동**
   - 네이버 ≠ 만능 해결책
   - 캐치테이블이 Trust Route에 더 적합

3. **모든 맛집에 네이버 예약 추가 시도**
   - 대부분 미지원
   - 시간 낭비

---

## 8. 결론: 승자는?

### 🏆 Trust Route 입장에서

| 평가 항목 | 네이버 예약 | 캐치테이블 |
|----------|-----------|-----------|
| 미쉐린 커버리지 | ❌ 2/10 | ✅ 10/10 |
| 딥링크 난이도 | ❌ 8/10 (어려움) | ✅ 2/10 (쉬움) |
| 구현 속도 | ❌ 느림 | ✅ 빠름 |
| 사용자 기대 | △ 중간 | ✅ 높음 |
| Trust Route 적합도 | ★★★☆☆ | ★★★★★ |

### 최종 결론

```
캐치테이블 = 주 무기 (예약 기능)
네이버 플레이스 = 보조 무기 (정보 제공)
전화번호 = 최후의 보루 (100% 호환)
```

**추천 전략**:
1. 캐치테이블 링크 먼저 완성 (Week 1-2)
2. 네이버 플레이스 정보 보강 (Week 2-3)
3. 전화번호 전체 수집 (Week 3-4)

---

## Sources

- [네이버 지도 예약 탭 도입 (2025.11.10)](https://www.etnews.com/20251110000062)
- [네이버 예약 - 나무위키](https://namu.wiki/w/%EB%84%A4%EC%9D%B4%EB%B2%84%20%EC%98%88%EC%95%BD)
- [캐치테이블 - 밍글스](https://app.catchtable.co.kr/ct/shop/mingles)
- [캐치테이블 2026 신년 프로젝트](https://www.viva100.com/article/20260114501236)
- [네이버 예약 연동 가이드](https://help-center.payhere.in/a2b3d8a6-11eb-4f16-8f96-14c038596576)
