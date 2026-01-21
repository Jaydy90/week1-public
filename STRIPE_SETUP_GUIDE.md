# Stripe + Supabase 프로덕션 설정 가이드

> **목표**: Trust Route에 Stripe 구독 결제 시스템을 추가합니다.
> **소요 시간**: 약 30분 (초기 설정)

---

## 📋 체크리스트 요약

### 필수 설정 (사용자가 직접 수행)

- [ ] 1. Stripe 계정 생성 및 API Keys 발급
- [ ] 2. Stripe 제품/가격 생성 (Price ID 획득)
- [ ] 3. Cloudflare Pages 환경 변수 설정
- [ ] 4. Stripe 웹훅 엔드포인트 등록
- [ ] 5. Stripe Customer Portal 활성화
- [ ] 6. 테스트 결제 실행

---

## 1️⃣ Stripe 계정 생성 및 API Keys 발급

### 1.1 Stripe 계정 생성

1. https://stripe.com 접속
2. **Start now** 클릭하여 회원가입
3. **Test mode**로 시작 (프로덕션 전환은 나중에)

### 1.2 API Keys 가져오기

1. **Stripe Dashboard** 접속: https://dashboard.stripe.com/test/dashboard
2. 우측 상단 **Developers** → **API keys** 이동
3. 다음 2개의 키를 복사:

   **Publishable key** (클라이언트용, 공개 가능)
   ```
   pk_test_51abc...xyz
   ```

   **Secret key** (서버용, 절대 외부 노출 금지)
   ```
   sk_test_51abc...xyz
   ```

4. **메모장에 임시 저장** (다음 단계에서 사용)

---

## 2️⃣ Stripe 제품 및 가격 생성

### 2.1 제품 생성

1. **Stripe Dashboard** → **Products** → **Add product** 클릭
2. 제품 정보 입력:
   - **Name**: `KPopEats Premium`
   - **Description**: `프리미엄 맛집 추천 서비스 - 신뢰 근거 완전 공개`
   - **Image** (선택): 로고 이미지 업로드

### 2.2 가격 설정

1. **Pricing** 섹션에서:
   - **Pricing model**: `Standard pricing`
   - **Price**: `₩9,900` (또는 원하는 금액)
   - **Billing period**: `Monthly` (월 구독)
   - **Currency**: `KRW` (원화)

2. **Advanced options** (선택):
   - **Trial period**: 7 days (7일 무료 체험)

3. **Save product** 클릭

### 2.3 Price ID 복사

제품 생성 완료 후:
1. **Products** 페이지에서 방금 생성한 `KPopEats Premium` 클릭
2. **Pricing** 섹션에서 **Price ID** 복사:
   ```
   price_1abc...xyz
   ```
3. 메모장에 저장

---

## 3️⃣ Cloudflare Pages 환경 변수 설정

### 3.1 Cloudflare Pages Dashboard 접속

1. https://dash.cloudflare.com 로그인
2. **Pages** → `kpopeats.cc` 프로젝트 선택
3. **Settings** → **Environment variables** 이동

### 3.2 환경 변수 추가

**Production** 탭에서 다음 변수들을 추가:

| Variable Name | Value | 설명 |
|---------------|-------|------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (1.2에서 복사한 Secret key) | Stripe API 서버 키 |
| `STRIPE_WEBHOOK_SECRET` | (4단계에서 추가) | 웹훅 시그니처 검증 키 |
| `SUPABASE_URL` | `https://djmadubptsajvdvzpdvd.supabase.co` | Supabase 프로젝트 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | (Supabase에서 복사) | Supabase Service Role Key |

**Preview** 탭에도 동일하게 추가 (테스트용)

### 3.3 Supabase Service Role Key 가져오기

1. **Supabase Dashboard** 접속: https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd
2. **Settings** → **API** 이동
3. **Project API keys** 섹션에서 `service_role` 키 복사
4. Cloudflare Pages 환경 변수에 추가

### 3.4 config.js 파일 수정

로컬 파일 `config.js`를 열어 Stripe 설정 업데이트:

```javascript
// Stripe 설정
const STRIPE_CONFIG = {
  // 1.2에서 복사한 Publishable key
  publishableKey: 'pk_test_51abc...xyz',

  // 2.3에서 복사한 Price ID
  priceId: 'price_1abc...xyz'
};
```

**저장 후 Git 커밋**:
```bash
git add config.js
git commit -m "feat: Add Stripe configuration"
git push origin main
```

---

## 4️⃣ Stripe 웹훅 엔드포인트 등록

### 4.1 웹훅 엔드포인트 생성

1. **Stripe Dashboard** → **Developers** → **Webhooks** 이동
2. **Add endpoint** 클릭
3. **Endpoint URL** 입력:
   ```
   https://kpopeats.cc/functions/stripe-webhook
   ```

### 4.2 이벤트 선택

**Select events to listen to** 섹션에서 다음 이벤트 선택:

- ✅ `checkout.session.completed`
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`

### 4.3 Webhook Secret 복사

1. 웹훅 생성 완료 후 **Signing secret** 클릭하여 복사:
   ```
   whsec_abc...xyz
   ```

2. **Cloudflare Pages** → **Environment variables**로 돌아가서:
   - Variable Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_abc...xyz` (방금 복사한 값)
   - **Save** 클릭

3. **재배포 필요**:
   ```bash
   git commit --allow-empty -m "chore: Trigger redeploy for webhook secret"
   git push origin main
   ```

---

## 5️⃣ Stripe Customer Portal 활성화

### 5.1 Customer Portal 설정

1. **Stripe Dashboard** → **Settings** → **Billing** → **Customer portal** 이동
2. **Activate test link** 클릭
3. 설정:
   - **Business name**: `KPopEats`
   - **Privacy policy URL**: `https://kpopeats.cc/privacy.html`
   - **Terms of service URL** (선택): `https://kpopeats.cc/terms.html`

### 5.2 기능 설정

**Features** 섹션에서:
- ✅ **Invoice history**: 결제 내역 조회
- ✅ **Update payment method**: 결제 수단 변경
- ✅ **Cancel subscription**: 구독 취소 (즉시 또는 기간 만료 시)

**Save** 클릭

---

## 6️⃣ 테스트 결제 실행

### 6.1 로컬 테스트

1. 로컬 서버 실행:
   ```bash
   python -m http.server 3000
   ```

2. http://localhost:3000 접속

3. **회원가입/로그인** 후 **마이페이지** 이동

4. **프리미엄 구독하기** 버튼 클릭

5. Stripe Checkout 페이지에서 테스트 카드 입력:
   - Card number: `4242 4242 4242 4242`
   - Expiry: `12/34` (미래 날짜)
   - CVC: `123`
   - ZIP: `12345`

6. **Subscribe** 클릭

7. 성공 시 **마이페이지**로 리디렉션 → "프리미엄 구독 중" 표시 확인

### 6.2 웹훅 이벤트 확인

1. **Stripe Dashboard** → **Developers** → **Webhooks** 이동
2. 방금 생성한 웹훅 클릭
3. **Recent deliveries** 탭에서 이벤트 확인:
   - `checkout.session.completed` → **200 OK**
   - `customer.subscription.created` → **200 OK**

4. 실패 시 **Response** 섹션에서 에러 메시지 확인

### 6.3 Supabase 데이터 확인

1. **Supabase Dashboard** → **Table Editor** → `subscriptions` 테이블 이동
2. 새로운 구독 레코드 확인:
   - `user_id`: 테스트 사용자 UUID
   - `status`: `active` 또는 `trialing`
   - `stripe_subscription_id`: `sub_abc...`

---

## 7️⃣ 프로덕션 전환 (테스트 완료 후)

### 7.1 Stripe 계정 활성화

1. **Stripe Dashboard** 우측 상단 토글을 **Test mode** → **Live mode**로 전환
2. **Activate your account** 클릭
3. 사업자 정보 입력 (개인 또는 사업자)

### 7.2 Live API Keys 발급

1. **Developers** → **API keys** (Live mode)
2. Publishable key (`pk_live_...`) 및 Secret key (`sk_live_...`) 복사

### 7.3 환경 변수 업데이트

**Cloudflare Pages** → **Environment variables** → **Production** 탭:
- `STRIPE_SECRET_KEY` → `sk_live_...` (Live mode 키로 교체)

**config.js** 업데이트:
```javascript
const STRIPE_CONFIG = {
  publishableKey: 'pk_live_...', // Live mode 키로 교체
  priceId: 'price_...' // Live mode Price ID
};
```

### 7.4 Live Webhook 등록

1. **Stripe Dashboard** (Live mode) → **Webhooks** → **Add endpoint**
2. URL: `https://kpopeats.cc/functions/stripe-webhook`
3. 동일한 이벤트 선택
4. Signing secret 복사 후 환경 변수 업데이트:
   - `STRIPE_WEBHOOK_SECRET` → `whsec_...` (Live mode 시크릿)

---

## 🔒 보안 체크리스트

### ✅ 반드시 지켜야 할 사항

- [ ] **Secret keys는 절대 클라이언트 코드에 포함하지 않음**
  - ❌ `config.js`에 `sk_test_...` 추가 금지
  - ✅ Cloudflare Workers 환경 변수에만 저장

- [ ] **Webhook signature 검증 활성화**
  - `functions/stripe-webhook.js`에서 `stripe.webhooks.constructEvent()` 사용 중

- [ ] **RLS 정책 활성화 확인**
  - Supabase `subscriptions` 테이블: 사용자는 조회만 가능

- [ ] **HTTPS 사용**
  - Cloudflare Pages는 자동으로 HTTPS 적용

---

## 🚨 문제 해결

### 문제 1: 웹훅 이벤트가 실패 (400/500 에러)

**원인**: 환경 변수 미설정 또는 시그니처 검증 실패

**해결**:
1. Cloudflare Pages 환경 변수 확인:
   - `STRIPE_WEBHOOK_SECRET` 값이 정확한지 확인
2. Stripe Dashboard → Webhooks → Recent deliveries에서 에러 메시지 확인
3. 재배포:
   ```bash
   git commit --allow-empty -m "chore: Trigger redeploy"
   git push origin main
   ```

### 문제 2: 구독 정보가 Supabase에 저장되지 않음

**원인**: Service Role Key 미설정 또는 RLS 정책 문제

**해결**:
1. Cloudflare Pages 환경 변수에 `SUPABASE_SERVICE_ROLE_KEY` 추가 확인
2. Supabase SQL Editor에서 RLS 마이그레이션 실행 확인:
   ```bash
   /db-migrate
   ```
3. `supabase/migrations/20260121000002_rls_policies.sql` 실행

### 문제 3: Stripe Checkout 페이지로 이동하지 않음

**원인**: `config.js`의 Stripe 설정 오류

**해결**:
1. `config.js` 파일 확인:
   ```javascript
   publishableKey: 'pk_test_...' // TODO가 아닌 실제 키 확인
   priceId: 'price_...' // 실제 Price ID 확인
   ```
2. 브라우저 개발자 도구 → Console에서 에러 메시지 확인

---

## 📚 참고 문서

- [Stripe Checkout 공식 문서](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks 가이드](https://stripe.com/docs/webhooks)
- [Supabase RLS 정책](https://supabase.com/docs/guides/auth/row-level-security)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)

---

## ✅ 완료!

설정이 모두 완료되면:
1. **프로덕션 URL** (https://kpopeats.cc)에서 테스트 결제 실행
2. 웹훅 이벤트 정상 수신 확인
3. Supabase 구독 데이터 확인
4. Customer Portal 접근 테스트

**다음 단계**: 자동화 테스트 루프 구축 (`automation/`)