# Stripe 재활성화 계획

## 현재 상태
- ✅ Stripe 코드 작성 완료 (`assets/js/features/subscription.js`)
- ✅ Cloudflare Functions 준비됨 (`_functions_disabled/`)
- ❌ 비활성화 상태 (빌드 실패 방지)

## 재활성화 단계

### Step 1: Functions 재활성화 (5분)
```bash
# 1. 폴더 이름 변경
mv _functions_disabled functions

# 2. package.json 생성
cat > functions/package.json << 'EOF'
{
  "name": "trust-route-functions",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "stripe": "^14.11.0",
    "@supabase/supabase-js": "^2.39.3"
  }
}
EOF

# 3. 의존성 설치
cd functions && npm install
```

### Step 2: Cloudflare Pages 환경변수 설정 (10분)
**Dashboard: https://dash.cloudflare.com**

```
Production 변수:
├─ STRIPE_SECRET_KEY=sk_live_...
├─ STRIPE_WEBHOOK_SECRET=whsec_...
├─ SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
└─ SUPABASE_URL=https://djmadubptsajvdvzpdvd.supabase.co

Preview 변수:
├─ STRIPE_SECRET_KEY=sk_test_...
├─ STRIPE_WEBHOOK_SECRET=whsec_test_...
├─ SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
└─ SUPABASE_URL=https://djmadubptsajvdvzpdvd.supabase.co
```

### Step 3: Stripe 제품/가격 생성 (15분)
**Dashboard: https://dashboard.stripe.com/test/products**

```javascript
// Test 모드에서 생성
Product 1: Trust Route PRO
├─ Price ID: price_test_xxx (월 9,900원)
└─ Recurring: Monthly

Product 2: Trust Route PREMIUM
├─ Price ID: price_test_xxx (월 29,900원)
└─ Recurring: Monthly
```

### Step 4: 코드에서 Price ID 설정
**파일: `assets/js/features/subscription.js`**
```javascript
const STRIPE_CONFIG = {
  publishableKey: 'pk_test_...', // Stripe Dashboard에서 복사
  priceId: 'price_test_xxx',     // PRO 플랜 Price ID
  premiumPriceId: 'price_test_xxx' // PREMIUM 플랜 Price ID
};
```

### Step 5: Webhook 설정 (10분)
**Stripe Dashboard → Developers → Webhooks**

```
Endpoint URL: https://kpopeats.cc/api/webhooks/stripe
Events to send:
├─ customer.subscription.created
├─ customer.subscription.updated
├─ customer.subscription.deleted
└─ invoice.payment_succeeded
```

### Step 6: 배포 및 테스트 (30분)
```bash
git add -A
git commit -m "feat: Re-enable Stripe subscription"
git push origin main

# Cloudflare Pages에서 자동 빌드 확인
# Functions 탭에서 배포 성공 확인
```

## 테스트 시나리오

### 1. 결제 흐름 테스트
- [ ] PRO 플랜 구독 버튼 클릭
- [ ] Stripe Checkout 페이지 열림
- [ ] 테스트 카드 입력 (4242 4242 4242 4242)
- [ ] 결제 성공 후 mypage로 리다이렉트
- [ ] 구독 상태 "PRO" 표시

### 2. Webhook 테스트
- [ ] Stripe Dashboard → Webhooks → 이벤트 전송 확인
- [ ] Cloudflare Functions 로그 확인
- [ ] Supabase `profiles` 테이블에 `subscription_status` 업데이트 확인

### 3. 구독 관리 테스트
- [ ] Customer Portal 열기
- [ ] 플랜 변경 (PRO → PREMIUM)
- [ ] 결제 수단 변경
- [ ] 구독 취소

## 예상 소요 시간
- **개발자 작업**: 1-2시간
- **Stripe/Cloudflare 설정**: 30분
- **테스트**: 30분
- **총**: 2-3시간

## 트러블슈팅

### Functions 빌드 실패 시
```bash
# package.json이 올바른지 확인
cd functions && npm install

# Cloudflare Pages 로그 확인
# Dashboard → Deployments → View build log
```

### Webhook 이벤트 수신 안될 때
```bash
# Stripe CLI로 로컬 테스트
stripe listen --forward-to localhost:8788/api/webhooks/stripe
stripe trigger customer.subscription.created
```

### 구독 상태 동기화 안될 때
```sql
-- Supabase SQL Editor에서 확인
SELECT id, email, subscription_status, subscription_plan
FROM profiles
WHERE email = 'test@example.com';
```

## Production 전환 계획

### 1. Stripe Test → Live 모드 전환
- [ ] Live API Keys 발급
- [ ] Live Webhook Secret 생성
- [ ] 실제 가격 제품 생성 (9,900원, 29,900원)

### 2. 법률 준비
- [ ] 전자상거래법 준수 (구독 약관)
- [ ] 환불 정책 명시
- [ ] 이용약관 업데이트

### 3. 모니터링 설정
- [ ] Sentry에 결제 오류 알림 추가
- [ ] Slack Webhook으로 신규 구독 알림
- [ ] Google Analytics - 결제 전환 이벤트

## 참고 문서
- [Stripe 공식 문서](https://stripe.com/docs)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Supabase RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
