# 🚀 KPopEats 프로덕션 배포 가이드

당장 판매 가능한 서비스로 완성하기 위한 단계별 가이드입니다.

---

## 📋 사전 준비 체크리스트

### 1. Stripe 설정 (결제 시스템)

#### 1.1 Stripe 계정 생성
1. https://dashboard.stripe.com/register 에서 계정 생성
2. 비즈니스 정보 입력

#### 1.2 제품 및 가격 생성
1. Stripe Dashboard → **Products** → **Add product**
2. 제품 정보 입력:
   - Name: `KPopEats Premium`
   - Description: `프리미엄 맛집 정보 및 개인화 기능`
   - Pricing: **Recurring** (정기 결제)
   - Price: `₩9,900/월` (또는 원하는 가격)
   - Billing period: `Monthly`
3. 생성 후 **Price ID** 복사 (예: `price_1234567890abcdef`)

#### 1.3 API 키 확인
1. Stripe Dashboard → **Developers** → **API keys**
2. 다음 키 복사:
   - **Publishable key** (pk_test_... 또는 pk_live_...)
   - **Secret key** (sk_test_... 또는 sk_live_...)

#### 1.4 config.js 업데이트
```javascript
// config.js
const STRIPE_CONFIG = {
  publishableKey: 'pk_test_YOUR_KEY', // ⚠️ 여기에 복사한 Publishable key 입력
  priceId: 'price_YOUR_PRICE_ID'      // ⚠️ 여기에 복사한 Price ID 입력
};
```

---

### 2. Supabase 데이터베이스 설정

#### 2.1 마이그레이션 실행
```bash
# Supabase CLI 설치 (처음 1회만)
npm install -g supabase

# 프로젝트 연결
supabase link --project-ref djmadubptsajvdvzpdvd

# 마이그레이션 실행 (테이블 생성)
supabase db push
```

#### 2.2 확인
- Supabase Dashboard → **Table Editor**에서 7개 테이블 확인:
  - profiles
  - restaurants
  - trust_evidence
  - bookmarks
  - reports
  - subscriptions
  - stripe_events

---

### 3. Cloudflare Pages 배포

#### 3.1 GitHub에 코드 푸시
```bash
# 변경사항 확인
git status

# 자동 커밋 및 푸시 (자동화 스크립트 사용)
bash .claude/commands/commit-push.sh "feat: 프로덕션 배포 준비 완료"
```

#### 3.2 Cloudflare Pages 설정
1. https://dash.cloudflare.com → **Pages** → **Create a project**
2. GitHub 저장소 연결 (`Jaydy90/week1-public`)
3. 빌드 설정:
   - **Build command**: (비워둠)
   - **Build output directory**: `/`
   - **Root directory**: `/`

#### 3.3 환경 변수 설정
Cloudflare Pages → **Settings** → **Environment variables**에 다음 변수 추가:

**Production 환경**:
```
SUPABASE_URL=https://djmadubptsajvdvzpdvd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[Supabase Service Role Key]
STRIPE_SECRET_KEY=[Stripe Secret Key - sk_live_...]
STRIPE_WEBHOOK_SECRET=[나중에 추가]
APP_URL=https://kpopeats.cc
```

#### 3.4 커스텀 도메인 연결
1. Cloudflare Pages → **Custom domains** → **Set up a custom domain**
2. `kpopeats.cc` 입력
3. DNS 레코드 확인 (Cloudflare DNS에서 자동 설정됨)

---

### 4. Stripe 웹훅 설정 (중요!)

#### 4.1 웹훅 엔드포인트 등록
1. Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://kpopeats.cc/api/webhooks/stripe`
3. 이벤트 선택:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. **Add endpoint** 클릭

#### 4.2 Signing secret 복사
1. 생성된 웹훅 클릭
2. **Signing secret** 복사 (whsec_...)
3. Cloudflare Pages 환경 변수에 추가:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
   ```

---

## ✅ 배포 후 테스트

### 1. 기본 기능 테스트
- [ ] https://kpopeats.cc 접속 확인
- [ ] 회원가입/로그인 테스트
- [ ] 레스토랑 리스트 확인
- [ ] 검색 기능 테스트
- [ ] 필터/정렬 기능 테스트

### 2. 구독 플로우 테스트
- [ ] 마이페이지 접속
- [ ] "프리미엄으로 업그레이드" 버튼 클릭
- [ ] Stripe Checkout 페이지 로딩 확인
- [ ] 테스트 카드로 결제 (4242 4242 4242 4242, 만료일: 미래 날짜, CVC: 아무거나)
- [ ] 결제 완료 후 마이페이지로 리다이렉트 확인
- [ ] 구독 상태가 "활성"으로 표시되는지 확인

### 3. 데이터베이스 확인
- [ ] Supabase Dashboard → **subscriptions** 테이블에 구독 정보 저장 확인
- [ ] **stripe_events** 테이블에 웹훅 이벤트 기록 확인

---

## 🔧 문제 해결

### Stripe Checkout이 열리지 않음
- `config.js`의 `publishableKey`가 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인
- Stripe.js가 로드되었는지 확인 (`window.Stripe`가 존재하는지)

### 구독 정보가 DB에 저장되지 않음
- Cloudflare Pages 환경 변수 확인 (`STRIPE_WEBHOOK_SECRET`)
- Stripe Dashboard → Webhooks → 이벤트 로그 확인
- Cloudflare Pages → Functions 로그 확인

### 로그인이 안 됨
- Supabase 프로젝트가 활성화되어 있는지 확인
- Google OAuth 설정 확인 (SUPABASE_SETUP.md 참고)
- 브라우저 콘솔에서 에러 메시지 확인

---

## 📚 추가 리소스

- **Stripe 문서**: https://stripe.com/docs
- **Supabase 문서**: https://supabase.com/docs
- **Cloudflare Pages 문서**: https://developers.cloudflare.com/pages

---

## 🎯 다음 단계

### 즉시 가능한 개선
1. **데이터 마이그레이션**: `data.js`의 레스토랑 데이터를 Supabase로 이동
2. **이미지 추가**: 레스토랑 사진 업로드
3. **프로필 커스터마이징**: 사용자 프로필 편집 기능 추가

### 중기 계획
1. **알림 시스템**: 신규 맛집 알림 (이메일/푸시)
2. **코스 생성**: AI 기반 맛집 코스 추천
3. **소셜 기능**: 친구 팔로우, 공유 컬렉션

### 장기 비전
1. **Next.js 마이그레이션**: SSR/ISR로 SEO 개선
2. **모바일 앱**: React Native 앱 개발
3. **B2B 기능**: 식당 제휴 관리 대시보드

---

**축하합니다! 🎉 이제 KPopEats는 판매 가능한 서비스입니다!**
