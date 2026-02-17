# ✅ Stripe 재활성화 체크리스트

## ✅ Phase 1: 로컬 설정 (완료!)

- [x] `_functions_disabled` → `functions` 리네임
- [x] `functions/package.json` 생성
- [x] `npm install` 실행
- [x] Stripe Publishable Key 확인 (`assets/js/core/config.js`)

---

## 🔄 Phase 2: Cloudflare Pages 환경변수 설정 (진행 중)

### 1️⃣ Cloudflare Dashboard 접속

**URL**: https://dash.cloudflare.com

**경로**:
```
Cloudflare Dashboard
→ Pages
→ week1-public (프로젝트 선택)
→ Settings
→ Environment variables
```

---

### 2️⃣ 환경변수 추가

아래 4개의 변수를 **Production**과 **Preview** 모두에 추가하세요:

#### 📋 복사해서 사용하세요:

**1. STRIPE_SECRET_KEY** (Stripe Dashboard에서 가져오기)
```
변수명: STRIPE_SECRET_KEY
값: sk_test_... (Stripe Dashboard → Developers → API keys → Secret key)
```

**2. STRIPE_WEBHOOK_SECRET** (나중에 Webhook 생성 후 추가)
```
변수명: STRIPE_WEBHOOK_SECRET
값: whsec_... (Webhook 생성 후 받게 됨)
```

**3. SUPABASE_SERVICE_ROLE_KEY** (Supabase Dashboard에서 가져오기)
```
변수명: SUPABASE_SERVICE_ROLE_KEY
값: eyJhbGc... (Supabase Dashboard → Settings → API → service_role key)
```

**4. SUPABASE_URL**
```
변수명: SUPABASE_URL
값: https://djmadubptsajvdvzpdvd.supabase.co
```

---

### 3️⃣ Stripe Dashboard에서 Secret Key 가져오기

**URL**: https://dashboard.stripe.com/test/apikeys

1. **Developers** 메뉴 클릭
2. **API keys** 클릭
3. **Secret key** 옆의 **Reveal test key** 클릭
4. `sk_test_...` 형식의 키 복사
5. Cloudflare Pages 환경변수에 `STRIPE_SECRET_KEY`로 추가

**⚠️ 주의**:
- Test 모드 키를 먼저 사용하세요 (sk_test_...)
- Production 배포 시에만 Live 키로 변경 (sk_live_...)

---

### 4️⃣ Supabase Dashboard에서 Service Role Key 가져오기

**URL**: https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd/settings/api

1. **Settings** 클릭
2. **API** 클릭
3. **Project API keys** 섹션에서
4. **service_role** 키 복사 (`eyJhbGc...` 형식)
5. Cloudflare Pages 환경변수에 `SUPABASE_SERVICE_ROLE_KEY`로 추가

**⚠️ 주의**:
- service_role 키는 **절대 클라이언트 코드에 노출 금지**
- Functions (서버사이드)에서만 사용

---

## 🚫 Phase 3: Stripe 제품 & 가격 생성 (옵션)

**현재 상태**: 이미 Price ID가 설정되어 있음
- PRO 플랜: `price_1SsEbiGuLgjU9MPRa1eldTcj` (월 9,900원)

**새로운 플랜 추가 시**:

### PREMIUM 플랜 생성 (월 29,900원)

**URL**: https://dashboard.stripe.com/test/products

1. **Products** → **Add product** 클릭
2. 제품 정보 입력:
   ```
   Name: Trust Route PREMIUM
   Description: AI 추천, 독점 콘텐츠, 예약 대행
   ```
3. Pricing 설정:
   ```
   Pricing model: Standard pricing
   Price: 29900 KRW
   Billing period: Monthly
   ```
4. **Save product** 클릭
5. Price ID 복사 (`price_...` 형식)
6. `assets/js/core/config.js`에 추가:
   ```javascript
   const STRIPE_CONFIG = {
     publishableKey: 'pk_test_...',
     priceId: 'price_1SsEbiGuLgjU9MPRa1eldTcj',  // PRO 플랜
     premiumPriceId: 'price_...'                  // PREMIUM 플랜 (새로 생성)
   };
   ```

---

## 🪝 Phase 4: Webhook 설정 (배포 후)

**⚠️ 주의**: Webhook은 배포 후에 설정해야 합니다!

### 1️⃣ 배포 먼저 하기

```bash
git add -A
git commit -m "feat: Re-enable Stripe Functions"
git push origin main
```

Cloudflare Pages에서 자동 빌드 (1-2분 소요)

### 2️⃣ Webhook 엔드포인트 생성

**URL**: https://dashboard.stripe.com/test/webhooks

1. **Developers** → **Webhooks** 클릭
2. **Add endpoint** 클릭
3. Endpoint URL 입력:
   ```
   https://kpopeats.cc/api/webhooks/stripe
   ```
4. **Select events** 클릭하여 다음 이벤트 선택:
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`

5. **Add endpoint** 클릭
6. **Signing secret** 복사 (`whsec_...` 형식)
7. Cloudflare Pages 환경변수에 `STRIPE_WEBHOOK_SECRET` 추가

---

## 🧪 Phase 5: 테스트

### 1️⃣ 로컬 테스트 (선택사항)

```bash
# 로컬 서버 실행
npx wrangler pages dev . --port 8788

# 브라우저에서 http://localhost:8788 접속
```

### 2️⃣ Production 테스트

1. https://kpopeats.cc 접속
2. 로그인 또는 회원가입
3. "PRO 플랜 시작하기" 버튼 클릭
4. Stripe Checkout 페이지 열리는지 확인

### 3️⃣ 테스트 카드로 결제

**테스트 카드 번호**: `4242 4242 4242 4242`
- 만료일: 미래 날짜 (예: 12/34)
- CVC: 아무 3자리 숫자 (예: 123)
- 우편번호: 아무 5자리 숫자 (예: 12345)

### 4️⃣ 결제 성공 확인

- [ ] Checkout 완료 후 Mypage로 리다이렉트
- [ ] 사용자 프로필에 "PRO" 뱃지 표시
- [ ] Stripe Dashboard → Customers에서 고객 생성 확인
- [ ] Stripe Dashboard → Subscriptions에서 구독 활성화 확인

### 5️⃣ Webhook 동작 확인

**URL**: https://dashboard.stripe.com/test/webhooks

- Webhook 엔드포인트 클릭
- **Recent deliveries** 섹션에서 이벤트 전송 확인
- 모든 이벤트가 `200 OK` 응답인지 확인

---

## 📊 체크리스트 요약

### 완료된 항목
- [x] Functions 폴더 활성화
- [x] package.json 생성
- [x] npm install
- [x] Stripe Publishable Key 설정

### 진행 중 (당신이 할 일)
- [ ] Cloudflare Pages 환경변수 설정
  - [ ] STRIPE_SECRET_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
  - [ ] SUPABASE_URL
  - [ ] STRIPE_WEBHOOK_SECRET (배포 후)
- [ ] Stripe Dashboard에서 Webhook 생성 (배포 후)
- [ ] 배포 & 테스트

---

## 🆘 트러블슈팅

### Functions 빌드 실패 시

**증상**: Cloudflare Pages 배포 로그에 에러
**해결**:
```bash
cd functions
npm install
git add package-lock.json
git commit -m "fix: Add package-lock.json"
git push
```

### Webhook 이벤트 수신 안될 때

**증상**: Stripe에서 이벤트 발생했지만 DB 업데이트 안됨
**해결**:
1. Cloudflare Functions 로그 확인 (Dashboard → Functions → Logs)
2. Webhook Secret이 올바른지 확인
3. Stripe CLI로 로컬 테스트:
   ```bash
   stripe listen --forward-to https://kpopeats.cc/api/webhooks/stripe
   stripe trigger customer.subscription.created
   ```

### 결제 완료 후 Mypage 리다이렉트 안될 때

**증상**: Checkout 완료 후 빈 페이지
**해결**:
1. `subscription.js`에서 `successUrl` 확인
2. Browser Console에서 에러 확인
3. Stripe Dashboard → Payments → 결제 내역에서 Metadata 확인

---

## 📞 다음 단계

**지금 바로**:
1. Cloudflare Pages Dashboard에서 환경변수 설정
2. Stripe Dashboard에서 Secret Key 복사
3. Supabase Dashboard에서 Service Role Key 복사

**설정 완료 후**:
```bash
git add -A
git commit -m "feat: Enable Stripe Functions with environment variables"
git push origin main
```

**배포 성공 후**:
1. Webhook 설정
2. 테스트 결제
3. 나에게 "테스트 성공했어!" 라고 말해주세요 🎉

---

**Updated**: 2026-02-18
**Status**: Phase 2 진행 중 (환경변수 설정 필요)
