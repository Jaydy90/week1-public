# 🚀 Trust Route → 본격 결제 SaaS 전환 로드맵

**목표**: 정적 웹사이트 → 월 1,000만원 이상 수익 SaaS

**현재 상태**: ⚡ 70% 완성 (기술 기반, UI/UX, 데이터 구조 완료)
**필요 작업**: 비즈니스 모델 + 결제 + 프리미엄 기능 + 운영 체계

---

## 📅 전체 일정 (12주 / 3개월)

```
Week 1-2   │ Stripe 재활성화 + 구독 시스템
Week 3-4   │ PRO 플랜 핵심 기능 (고급 필터, 무제한)
Week 5-6   │ 권한 시스템 + 사용량 추적
Week 7-8   │ PREMIUM AI 추천 개발
Week 9-10  │ 독점 콘텐츠 + 예약 대행
Week 11-12 │ 운영 체계 + 마케팅 준비
```

---

## 📊 Phase 1: 비즈니스 모델 정의 (Week 1)

### 수익화 전략 (Freemium 추천)

| 플랜 | 가격 | 핵심 가치 | 전환 포인트 |
|------|------|----------|------------|
| **FREE** | 무료 | 맛집 발견 (제한적) | 일 10개 조회 후 페이월 |
| **PRO** | 월 9,900원 | 무제한 + 고급 필터 | 저장 5개 초과 시 |
| **PREMIUM** | 월 29,900원 | AI 추천 + 독점 | PRO 사용 1개월 후 |

### 타겟 고객
1. **일반 식도락가** (FREE → PRO 전환 노림)
   - 월 2-3회 맛집 탐색
   - 저장 기능 많이 사용
   - 고급 필터 (예산, 분위기) 필요

2. **헤비 유저** (PRO → PREMIUM 전환)
   - 주 1-2회 외식
   - 새로운 맛집 발굴 욕구 강함
   - AI 추천 + 독점 정보 가치 인정

3. **기업/단체** (장기, B2B)
   - 직원 복지몰 제휴
   - 월 50만원 이상 계약 가능

### 예상 수익 시뮬레이션

**3개월 후 (보수적 추정)**
```
FREE 사용자: 10,000명
PRO 사용자: 500명 (5% 전환)
  → 월 500 × 9,900원 = 495만원

PREMIUM 사용자: 50명 (PRO의 10% 전환)
  → 월 50 × 29,900원 = 149.5만원

월 매출: 644.5만원
연 매출: 7,734만원
```

**6개월 후 (성장 시나리오)**
```
FREE: 30,000명
PRO: 2,000명 (6.7% 전환)
  → 1,980만원

PREMIUM: 300명 (PRO의 15%)
  → 897만원

월 매출: 2,877만원
연 매출: 3억 4,524만원
```

---

## 🛠️ Phase 2: 기술 구현 (Week 2-10)

### Week 2: Stripe 재활성화 ⚡ 우선순위 1

**작업 문서**: `docs/deployment/STRIPE_REACTIVATION_PLAN.md`

#### 체크리스트
- [ ] `_functions_disabled` → `functions` 리네임
- [ ] `functions/package.json` 생성 & `npm install`
- [ ] Cloudflare Pages 환경변수 설정
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Stripe Dashboard에서 제품/가격 생성
  - PRO: 월 9,900원
  - PREMIUM: 월 29,900원
- [ ] Webhook 엔드포인트 설정
- [ ] 배포 & 테스트 (테스트 카드로 결제)

**예상 소요 시간**: 2-3시간

---

### Week 3-4: PRO 플랜 핵심 기능

**작업 문서**: `docs/product/PREMIUM_FEATURES_ROADMAP.md`

#### 1. 고급 필터 시스템
```javascript
✅ 예산 범위 슬라이더
✅ 분위기 필터 (데이트, 비즈니스, 가족, 친구)
✅ 식사 시간 (브런치, 런치, 디너)
✅ 부가 조건 (주차, 룸)
```

**파일**: `assets/js/features/advanced-filters.js`

#### 2. 무제한 저장/조회
```javascript
✅ FREE: 일 10개, 저장 5개
✅ PRO: 무제한
✅ 사용량 추적 (usage_logs 테이블)
```

#### 3. 광고 제거
```javascript
if (tier === 'free') {
  // Google AdSense 표시
} else {
  // 광고 숨김
}
```

#### 4. 주간 알림 이메일
- Resend API 연동
- Cloudflare Cron Trigger (매주 월요일 9시)
- 신규 맛집 요약 발송

**예상 소요 시간**: 2주

---

### Week 5-6: 권한 시스템 구축

**작업 문서**: `docs/architecture/SUBSCRIPTION_TIERS_IMPLEMENTATION.md`

#### 데이터베이스 확장
```sql
-- profiles 테이블 확장
ALTER TABLE profiles ADD COLUMN subscription_status TEXT;
ALTER TABLE profiles ADD COLUMN subscription_plan TEXT;
ALTER TABLE profiles ADD COLUMN daily_views_count INTEGER;

-- usage_logs 테이블 생성
CREATE TABLE usage_logs (
  user_id UUID,
  action TEXT,
  resource_id TEXT,
  created_at TIMESTAMPTZ
);
```

#### PermissionsModule 구현
```javascript
✅ can(feature) - 권한 체크
✅ checkDailyViews() - 일일 조회 제한
✅ checkSavedCount() - 저장 개수 제한
✅ showUpgradeModal() - 업그레이드 유도
✅ logUsage() - 사용량 추적
```

**예상 소요 시간**: 1.5주

---

### Week 7-8: PREMIUM AI 추천 엔진

#### 1. 취향 학습 시스템
```javascript
수집 데이터:
- 조회한 맛집 (카테고리, 가격대)
- 저장한 맛집
- 댓글 작성
- 클릭한 신뢰 그룹
```

#### 2. AI 추천 (OpenAI GPT-4)
```javascript
// functions/api/get-recommendations.js
const recommendations = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{
    role: "system",
    content: "맛집 추천 AI"
  }, {
    role: "user",
    content: `사용자 취향: ${preferences}...`
  }]
});
```

#### 3. 추천 UI
```javascript
<div class="ai-recommendations">
  <h2>✨ AI가 추천하는 맛집</h2>
  ${recommendations.map(rec => `
    <div class="recommendation-card">
      <h3>${rec.name}</h3>
      <p class="ai-reason">추천 이유: ${rec.reason}</p>
    </div>
  `)}
</div>
```

**예상 비용**: GPT-4 API 월 $200 (30만원)

**예상 소요 시간**: 2주

---

### Week 9-10: 독점 콘텐츠 + 예약 대행

#### 1. 셰프 인터뷰 콘텐츠
```javascript
const exclusiveContent = [
  {
    type: 'interview',
    chef: '안성재',
    title: '이탈리안의 정수',
    content: '...',
    premiumOnly: true
  }
];
```

**목표**: 인터뷰 3개 제작 (영상 or 텍스트)

#### 2. 미공개 오픈 예정 맛집
```javascript
{
  status: 'coming_soon',
  openDate: '2026-03-15',
  exclusiveInfo: '미쉐린 3스타 출신 셰프...'
}
```

#### 3. 예약 대행 서비스 (수동)
- PREMIUM 회원 전용
- 월 2회 무료
- 운영팀 수동 예약 → 24시간 내 확정

**예상 소요 시간**: 2주

---

## 💼 Phase 3: 운영 인프라 (Week 11-12)

### 1. 모니터링 & 알림

#### Sentry 이벤트 추가
```javascript
// 결제 오류 추적
Sentry.captureException(error, {
  tags: { type: 'payment_error' },
  user: { id: userId, plan: plan }
});
```

#### Slack Webhook 연동
```javascript
// 신규 구독 알림
await fetch(SLACK_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    text: `🎉 신규 PRO 구독! ${user.email}`
  })
});
```

### 2. 고객 지원 시스템

#### FAQ 자동화
```javascript
// Crisp Chat 연동 or
// Tawk.to (무료)
<script src="https://embed.tawk.to/..."></script>
```

#### 이메일 지원
- hello@kpopeats.cc로 Resend 수신함 설정
- 24시간 내 응답 목표

### 3. 환불 정책 자동화

```javascript
// functions/api/handle-refund.js
export async function onRequest(context) {
  const { subscriptionId, reason } = await context.request.json();

  // Stripe에서 환불 처리
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
    reason: 'requested_by_customer'
  });

  // Supabase 구독 상태 업데이트
  await supabase
    .from('profiles')
    .update({ subscription_status: 'canceled' })
    .eq('stripe_customer_id', customerId);

  return new Response('OK');
}
```

---

## 📜 Phase 4: 법률 & 컴플라이언스

### 1. 이용약관 작성

**필수 포함 항목**:
- [ ] 서비스 정의 및 범위
- [ ] 구독 자동 갱신 안내
- [ ] 환불 정책 (14일 이내 100% 환불)
- [ ] 개인정보 처리 방침 업데이트
- [ ] 지적재산권 (맛집 데이터 출처 명시)
- [ ] 면책 조항 (예약 대행 책임 범위)

**참고 템플릿**:
- [크몽 이용약관](https://kmong.com/terms)
- [배달의민족 이용약관](https://www.baemin.com/terms)

### 2. 전자상거래법 준수

**사업자 정보 표기** (index.html 하단):
```html
<footer>
  <div class="business-info">
    <p>상호: KPopEats | 대표: [이름]</p>
    <p>사업자등록번호: [번호] | 통신판매업신고: [번호]</p>
    <p>주소: [주소] | 이메일: hello@kpopeats.cc</p>
    <p>고객센터: [전화번호] | 운영시간: 평일 10:00-18:00</p>
  </div>
</footer>
```

### 3. PG사 계약

**Stripe는 이미 사용 중**이므로 별도 PG사 불필요.
단, 한국 카드사 수수료 체크:
- 국내 카드: 3.6% + 65원
- 해외 카드: 4.3% + 65원

---

## 📈 Phase 5: 마케팅 & 그로스

### Week 11-12: 런칭 준비

#### 1. 랜딩 페이지 최적화

**현재 홈 화면 개선**:
```html
<!-- Before -->
<h1>지금 갈 맛집, 빠르게 결정하세요</h1>

<!-- After (전환율 최적화) -->
<h1>미쉐린·유명인 인증 맛집만 모았습니다</h1>
<p class="subtitle">월 9,900원으로 고급 필터와 무제한 저장</p>
<button class="cta-button">지금 시작하기 →</button>

<div class="social-proof">
  <span>✅ 이미 <strong>1,234명</strong>이 사용 중</span>
  <span>⭐ 평균 평점 <strong>4.8/5</strong></span>
</div>
```

#### 2. 무료 체험 전략

**14일 무료 체험 → PRO 플랜**
```javascript
const STRIPE_CONFIG = {
  priceId: 'price_xxx',
  trialPeriodDays: 14  // 14일 무료 체험
};
```

**심리적 장벽 낮추기**:
- 신용카드 등록 없이 FREE 플랜 시작
- 5개 저장 후 "PRO로 업그레이드하면 14일 무료" 안내
- 무료 체험 종료 3일 전 이메일 알림

#### 3. 바이럴 루프

**친구 초대 프로그램**:
```
초대한 친구가 PRO 구독 시:
├─ 초대자: 1개월 무료 연장
└─ 친구: 첫 달 30% 할인
```

**소셜 공유 인센티브**:
```javascript
// 맛집 공유 시
<button onclick="shareRestaurant()">
  📤 친구에게 공유 (공유 1회당 조회권 +1)
</button>
```

#### 4. SEO & 콘텐츠 마케팅

**블로그 글 작성 (주 2회)**:
- "강남 미쉐린 맛집 TOP 10"
- "데이트 하기 좋은 파인다이닝 BEST 5"
- "흑백요리사 셰프 맛집 완전 정복"

**네이버 블로그/인스타그램 연동**:
- Trust Route 공식 계정 운영
- 맛집 사진 + 신뢰 근거 공유
- "자세한 정보는 kpopeats.cc에서" CTA

#### 5. 파트너십

**제휴 제안**:
- 예약 플랫폼 (Catchtable, TableManager)
- 카드사 (현대카드, 신한카드 다이닝 혜택)
- 기업 복지몰 (LG U+, KT, 삼성전자 등)

---

## 💰 예상 비용 & 손익분기점

### 초기 투자 비용 (1회성)
- 사업자 등록: 0원 (간이과세자)
- 통신판매업 신고: 15,000원
- 이용약관 작성 (법무사): 300,000원
- **총**: 315,000원

### 월간 운영 비용
| 항목 | 비용 |
|------|------|
| Cloudflare Pages | 무료 (Functions 월 10만 req까지) |
| Supabase | 무료 (DB 500MB까지) |
| Stripe | 매출의 3.6% + 건당 65원 |
| OpenAI GPT-4 | 월 300,000원 (PREMIUM 1,000명 기준) |
| Resend Email | 월 $20 (PRO 5,000명 기준) |
| 도메인 (kpopeats.cc) | 월 2,000원 |
| **총 고정 비용** | **약 350,000원/월** |

### 손익분기점 계산
```
월 매출 = PRO 구독자 수 × 9,900원 + PREMIUM × 29,900원
월 비용 = 350,000원 + (매출 × 3.6%)

손익분기점:
PRO 50명 = 495,000원 매출
  → 비용: 350,000 + 17,820 = 367,820원
  → 순이익: 127,180원 (흑자 전환)

PRO 200명 = 1,980,000원 매출
  → 비용: 350,000 + 71,280 = 421,280원
  → 순이익: 1,558,720원
```

**결론**: PRO 구독자 50명만 확보하면 손익분기점 달성!

---

## 🎯 마일스톤 & KPI

### Month 1 (Week 1-4): 기술 기반 완성
- [ ] Stripe 결제 시스템 재활성화
- [ ] PRO 플랜 핵심 기능 구현
- [ ] 권한 시스템 구축
- **KPI**: 테스트 결제 10회 성공

### Month 2 (Week 5-8): 프리미엄 기능 개발
- [ ] PREMIUM AI 추천 엔진
- [ ] 독점 콘텐츠 3개 제작
- [ ] 운영 모니터링 체계
- **KPI**: Beta 유료 사용자 20명

### Month 3 (Week 9-12): 런칭 & 마케팅
- [ ] 법률 컴플라이언스 완료
- [ ] 랜딩 페이지 최적화
- [ ] 콘텐츠 마케팅 시작
- **KPI**: PRO 50명 (손익분기점), PREMIUM 5명

### Month 6: 성장 목표
- **KPI**: PRO 500명, PREMIUM 50명
- **매출**: 월 644만원
- **MRR 성장률**: +20% MoM

### Month 12: Scale-up
- **KPI**: PRO 2,000명, PREMIUM 300명
- **매출**: 월 2,877만원
- **연 매출**: 3억 4,524만원

---

## 🚨 리스크 & 대응 전략

### Risk 1: 초기 전환율 저조
**원인**: 가치 제안 부족, 가격 저항
**대응**:
- 14일 무료 체험 제공
- FREE 플랜 제한 강화 (일 10개 → 5개)
- 레퍼런스 고객 리뷰 수집

### Risk 2: AI 추천 정확도 낮음
**원인**: 데이터 부족, 모델 튜닝 미흡
**대응**:
- 초기엔 규칙 기반 추천 사용
- 사용자 피드백 수집 ("이 추천이 도움되었나요?")
- GPT-4 → GPT-4-turbo (비용 절감)

### Risk 3: 예약 대행 부담 증가
**원인**: PREMIUM 사용자 급증, 수동 처리 한계
**대응**:
- 초기: 월 2회 제한 유지
- 중기: 외주 인력 투입 (건당 3,000원)
- 장기: Catchtable API 연동 자동화

### Risk 4: 경쟁사 등장
**원인**: 진입장벽 낮음, 모방 쉬움
**대응**:
- 신뢰 근거 품질 차별화 (직접 검증)
- 커뮤니티 구축 (댓글, 리뷰)
- 브랜드 강화 (Trust Route = 신뢰)

---

## 📋 즉시 실행 체크리스트

### This Week (Week 1)
- [ ] `STRIPE_REACTIVATION_PLAN.md` 읽기
- [ ] Stripe Dashboard에서 제품/가격 생성
- [ ] Cloudflare Pages 환경변수 설정
- [ ] `_functions_disabled` 재활성화
- [ ] 테스트 결제 성공 확인

### Next Week (Week 2)
- [ ] 고급 필터 UI 디자인 (Figma or 손그림)
- [ ] `advanced-filters.js` 파일 생성
- [ ] `permissions.js` 파일 생성
- [ ] Supabase 스키마 확장 (profiles 테이블)

### This Month (Week 3-4)
- [ ] PRO 플랜 전체 기능 완성
- [ ] 베타 테스터 10명 모집 (지인, 커뮤니티)
- [ ] 피드백 수집 및 개선
- [ ] 이용약관/환불정책 초안 작성

---

## 🎓 학습 리소스

### Stripe 결제 시스템
- [Stripe 공식 문서](https://stripe.com/docs)
- [Stripe Checkout 가이드](https://stripe.com/docs/payments/checkout)
- [Webhook 이벤트 처리](https://stripe.com/docs/webhooks)

### SaaS 비즈니스 모델
- [SaaS Metrics 2.0](https://www.forentrepreneurs.com/saas-metrics-2/)
- [Price Intelligently](https://www.priceintelligently.com/)
- [Traction Book](https://tractionbook.com/) - 19가지 고객 획득 채널

### 프리미엄 기능 사례 연구
- [Notion Pricing](https://www.notion.so/pricing)
- [Superhuman Pricing](https://superhuman.com/pricing)
- [Linear Pricing](https://linear.app/pricing)

---

## 📞 다음 단계

**지금 당장 시작하기**:

```bash
# 1. Stripe 재활성화
mv _functions_disabled functions
cd functions && npm install

# 2. Cloudflare에서 환경변수 설정
# Dashboard → Settings → Environment variables

# 3. 배포
git add -A
git commit -m "feat: Re-enable Stripe subscription system"
git push origin main

# 4. 테스트
# https://kpopeats.cc에서 PRO 플랜 구독 테스트
```

**질문이나 막히는 부분이 있으면 언제든 물어보세요!** 🚀

---

**Updated**: 2026-02-18
**Author**: Claude Sonnet 4.5 with Trust Route Team
**Status**: Ready for Implementation
