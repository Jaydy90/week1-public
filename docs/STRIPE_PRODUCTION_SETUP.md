# Stripe + Supabase 프로덕션 환경 설정 가이드

이 가이드는 KPopEats의 Stripe 구독 시스템을 프로덕션 환경에서 설정하는 단계별 절차를 제공합니다.

## 목차

1. [Stripe 설정](#1-stripe-설정)
2. [Supabase 데이터베이스 마이그레이션](#2-supabase-데이터베이스-마이그레이션)
3. [Supabase Edge Functions 배포](#3-supabase-edge-functions-배포)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [Stripe 웹훅 설정](#5-stripe-웹훅-설정)
6. [Customer Portal 설정](#6-customer-portal-설정)
7. [테스트 및 검증](#7-테스트-및-검증)
8. [프로덕션 체크리스트](#8-프로덕션-체크리스트)

---

## 1. Stripe 설정

### 1.1 Stripe 계정 생성 및 활성화

1. [Stripe Dashboard](https://dashboard.stripe.com/register) 에서 계정 생성
2. 이메일 인증 완료
3. 사업자 정보 입력 (회사명, 주소, 사업자등록번호)
4. 은행 계좌 연결 (정산 받을 계좌)

### 1.2 제품 및 가격 생성

1. Stripe Dashboard > **Products** > **Add product** 클릭
2. 제품 정보 입력:
   - **Name**: `KPopEats Premium`
   - **Description**: `프리미엄 맛집 추천 서비스 - 개인화 필터, 코스 생성, 신규 맛집 알림`
   - **Pricing model**: `Recurring` 선택
   - **Price**: `9900` (KRW)
   - **Billing period**: `Monthly`
3. **Save product** 클릭
4. **Price ID** 복사 (예: `price_1234567890abcdef`)

### 1.3 API 키 확인

1. Stripe Dashboard > **Developers** > **API keys** 이동
2. **Publishable key** 복사 (예: `pk_live_...`)
3. **Secret key** 복사 (예: `sk_live_...`)
   - ⚠️ **절대로 클라이언트 코드에 노출하지 마세요!**

---

## 2. Supabase 데이터베이스 마이그레이션

### 2.1 스키마 적용

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 > **SQL Editor** 클릭
3. `schema.sql` 파일 내용 전체 복사
4. SQL Editor에 붙여넣기
5. **Run** 클릭하여 실행

### 2.2 테이블 확인

**Table Editor**에서 다음 테이블이 생성되었는지 확인:

- ✅ `comments`
- ✅ `profiles`
- ✅ `customers`
- ✅ `subscriptions`
- ✅ `stripe_events`
- ✅ `bookmarks`
- ✅ `reports`

### 2.3 RLS 정책 확인

**Authentication** > **Policies**에서 각 테이블의 RLS 정책이 활성화되었는지 확인.

---

## 3. Supabase Edge Functions 배포

### 3.1 Supabase CLI 설치

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows (scoop 사용)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### 3.2 로그인 및 프로젝트 링크

```bash
# Supabase 로그인
supabase login

# 프로젝트 링크
supabase link --project-ref <YOUR_PROJECT_REF>
# PROJECT_REF는 Supabase Dashboard URL에서 확인: https://supabase.com/dashboard/project/<PROJECT_REF>
```

### 3.3 Edge Functions 배포

```bash
# 웹훅 함수 배포
supabase functions deploy stripe-webhook

# Checkout Session 생성 함수 배포
supabase functions deploy create-checkout-session

# 구독 취소 함수 배포
supabase functions deploy cancel-subscription

# Customer Portal 함수 배포
supabase functions deploy customer-portal
```

### 3.4 배포 확인

Supabase Dashboard > **Edge Functions**에서 배포된 함수 확인:

- ✅ `stripe-webhook`
- ✅ `create-checkout-session`
- ✅ `cancel-subscription`
- ✅ `customer-portal`

---

## 4. 환경 변수 설정

### 4.1 Supabase Secrets 설정

```bash
# Stripe Secret Key 설정
supabase secrets set STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY

# Stripe Webhook Secret 설정 (다음 섹션에서 생성)
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

### 4.2 클라이언트 설정 (config.js)

`config.js` 파일 업데이트:

```javascript
const STRIPE_CONFIG = {
  publishableKey: 'pk_live_YOUR_PUBLISHABLE_KEY', // Stripe Publishable Key
  priceId: 'price_YOUR_PRICE_ID' // 1.2에서 생성한 Price ID
};
```

⚠️ **중요**: `config.js`는 클라이언트에 노출되므로 **Publishable Key**만 입력하세요!

---

## 5. Stripe 웹훅 설정

### 5.1 웹훅 엔드포인트 추가

1. Stripe Dashboard > **Developers** > **Webhooks** 이동
2. **Add endpoint** 클릭
3. **Endpoint URL** 입력:
   ```
   https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co/functions/v1/stripe-webhook
   ```
   - `<YOUR_SUPABASE_PROJECT_REF>`는 Supabase 프로젝트 REF로 교체
4. **Select events to listen to** 클릭
5. 다음 이벤트 선택:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
6. **Add endpoint** 클릭

### 5.2 Webhook Signing Secret 확인

1. 생성된 엔드포인트 클릭
2. **Signing secret** 섹션에서 `whsec_...` 값 복사
3. Supabase Secrets에 추가:
   ```bash
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
   ```

### 5.3 로컬 테스트 (선택사항)

```bash
# Stripe CLI 설치
brew install stripe/stripe-cli/stripe

# Stripe 로그인
stripe login

# 로컬 웹훅 포워딩
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook

# 테스트 이벤트 전송
stripe trigger checkout.session.completed
```

---

## 6. Customer Portal 설정

### 6.1 포털 활성화

1. Stripe Dashboard > **Settings** > **Customer portal** 이동
2. **Activate test link** 또는 **Activate live link** 클릭

### 6.2 포털 설정

**Features** 탭:

- ✅ **Invoice history** 활성화
- ✅ **Update payment method** 활성화
- ✅ **Cancel subscription** 활성화 (선택사항)

**Business information** 탭:

- 회사명, 로고, 지원 이메일 입력

**Link** 탭:

- **Return URL**: `https://kpopeats.cc/#mypage` 입력

---

## 7. 테스트 및 검증

### 7.1 테스트 모드 검증

Stripe Dashboard를 **Test mode**로 전환 후:

1. **구독 생성 테스트**:
   - 테스트 카드 번호: `4242 4242 4242 4242`
   - 만료일: 미래 날짜 (예: `12/34`)
   - CVC: 아무 3자리 숫자 (예: `123`)
2. **웹훅 수신 확인**:
   - Stripe Dashboard > **Developers** > **Webhooks** > 엔드포인트 클릭
   - **Event logs** 탭에서 이벤트 수신 확인
3. **데이터베이스 확인**:
   - Supabase Table Editor에서 `subscriptions` 테이블에 레코드 생성 확인

### 7.2 프로덕션 모드 전환

테스트 완료 후:

1. Stripe Dashboard를 **Live mode**로 전환
2. `config.js`의 `publishableKey`를 **Live Publishable Key**로 교체
3. Supabase Secrets의 `STRIPE_SECRET_KEY`를 **Live Secret Key**로 교체
4. 웹훅 엔드포인트를 **Live mode**로 다시 생성

---

## 8. 프로덕션 체크리스트

### 8.1 Stripe 설정

- [ ] Stripe 계정 활성화 완료
- [ ] 사업자 정보 및 은행 계좌 등록 완료
- [ ] 제품 및 가격 생성 (`KPopEats Premium`, ₩9,900/월)
- [ ] Live Publishable Key 확인
- [ ] Live Secret Key 확인

### 8.2 Supabase 설정

- [ ] 데이터베이스 스키마 적용 완료
- [ ] RLS 정책 활성화 확인
- [ ] Edge Functions 배포 완료 (4개 함수)
- [ ] Secrets 설정 완료 (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`)

### 8.3 웹훅 설정

- [ ] Stripe 웹훅 엔드포인트 생성 (Live mode)
- [ ] 필수 이벤트 6개 선택 완료
- [ ] Webhook Signing Secret 설정 완료

### 8.4 클라이언트 설정

- [ ] `config.js`에 Live Publishable Key 입력
- [ ] `config.js`에 Price ID 입력
- [ ] Git에 Secret Key가 포함되지 않았는지 확인

### 8.5 Customer Portal 설정

- [ ] Customer Portal 활성화
- [ ] Return URL 설정 (`https://kpopeats.cc/#mypage`)
- [ ] 회사 정보 및 로고 입력

### 8.6 테스트

- [ ] Test mode에서 구독 생성 테스트 성공
- [ ] 웹훅 이벤트 수신 확인
- [ ] 데이터베이스에 구독 정보 저장 확인
- [ ] Customer Portal 접근 확인
- [ ] 구독 취소 테스트 성공

### 8.7 보안

- [ ] Secret Key가 클라이언트 코드에 노출되지 않음
- [ ] RLS 정책이 모든 테이블에 활성화됨
- [ ] 웹훅 서명 검증 활성화됨
- [ ] HTTPS 사용 확인 (`https://kpopeats.cc`)

---

## 9. 트러블슈팅

### 9.1 웹훅 이벤트가 수신되지 않음

**원인**:
- 웹훅 URL이 잘못됨
- Supabase Edge Function이 배포되지 않음
- Webhook Secret이 잘못됨

**해결**:
1. Stripe Dashboard > Webhooks > 엔드포인트 URL 확인
2. Supabase Dashboard > Edge Functions에서 `stripe-webhook` 배포 확인
3. `supabase secrets list`로 `STRIPE_WEBHOOK_SECRET` 확인

### 9.2 구독 정보가 데이터베이스에 저장되지 않음

**원인**:
- RLS 정책으로 인한 권한 오류
- Supabase Service Role Key가 설정되지 않음

**해결**:
1. Supabase Dashboard > Settings > API에서 `service_role` key 확인
2. Edge Functions에서 `SUPABASE_SERVICE_ROLE_KEY` 환경 변수 자동 주입 확인
3. Supabase 로그 확인:
   ```bash
   supabase functions logs stripe-webhook
   ```

### 9.3 Checkout 페이지가 열리지 않음

**원인**:
- `config.js`의 Price ID가 잘못됨
- Publishable Key가 잘못됨

**해결**:
1. Stripe Dashboard > Products에서 Price ID 재확인
2. 브라우저 콘솔에서 에러 메시지 확인
3. `config.js` 파일에서 `publishableKey`와 `priceId` 재확인

---

## 10. 참고 자료

- [Stripe 공식 문서](https://stripe.com/docs)
- [Supabase Edge Functions 가이드](https://supabase.com/docs/guides/functions)
- [Stripe Webhooks 가이드](https://stripe.com/docs/webhooks)
- [Stripe Customer Portal 가이드](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal)

---

## 11. 지원

문제가 발생하면:

1. [GitHub Issues](https://github.com/Jaydy90/week1-public/issues) 에 이슈 등록
2. Supabase 로그 확인: `supabase functions logs <function-name>`
3. Stripe Dashboard > Developers > Events에서 이벤트 상세 확인

---

**마지막 업데이트**: 2026-01-22
**작성자**: Claude Code + Jaydy90
