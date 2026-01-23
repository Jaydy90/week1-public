# 🎯 다음 단계 - KPopEats 프로덕션 준비

## ✅ 방금 완료된 작업 (2026-01-21)

프로덕션급 SaaS를 위한 필수 인프라를 모두 설정했습니다:

### 1. 프로젝트 가이드라인 및 문서화
- ✅ **CLAUDE.md**: 전체 프로젝트 철학, 정책, 코딩 규칙
- ✅ **README.md**: 프로젝트 개요 및 빠른 시작
- ✅ **SETUP.md**: 상세한 설정 및 배포 가이드
- ✅ **CHANGELOG.md**: 변경 이력 추적

### 2. 개발 환경 자동화
- ✅ **MCP 설정** (.mcp.json): GitHub, Stripe, PostgreSQL 통합
- ✅ **슬래시 커맨드**: commit-push, test-build, deploy, db-migrate

### 3. Stripe 결제 인프라 (CRITICAL)
- ✅ **웹훅 핸들러** (functions/api/webhooks/stripe.js)
  - 서명 검증
  - Idempotency 보장
  - 6개 핵심 이벤트 처리
  - Supabase DB 동기화

### 4. Supabase 데이터베이스
- ✅ **스키마 마이그레이션** (20260121000001_initial_schema.sql)
  - 7개 핵심 테이블 생성
  - Triggers 및 Helper Functions
- ✅ **RLS 정책** (20260121000002_rls_policies.sql)
  - 모든 테이블 보안 정책 설정
  - 구독 권한 확인 함수

### 5. 프로젝트 구조 개선
- ✅ package.json, .env.example, .gitignore

---

## 🚀 지금 바로 해야 할 일 (우선순위 순)

### 1단계: 로컬 환경 설정 (30분)

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 파일 생성
cp .env.example .env.local

# 3. .env.local 파일 편집 (VS Code 등에서)
# - SUPABASE_URL, SUPABASE_ANON_KEY 입력
# - STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY 입력
```

### 2단계: Supabase 설정 (20분)

```bash
# 1. Supabase CLI 설치
npm install -g supabase

# 2. Supabase 프로젝트 연결
supabase link --project-ref your-project-ref

# 3. 마이그레이션 실행 (테이블 생성 + RLS 정책)
supabase db push
```

**확인 방법**:
- Supabase Dashboard → Table Editor에서 7개 테이블 확인
- SQL Editor에서 `SELECT * FROM profiles;` 실행

### 3단계: Stripe 설정 (15분)

#### 3.1 제품 및 가격 생성
1. Stripe Dashboard → Products → Add product
2. 이름: "KPopEats Premium"
3. 가격: ₩9,900/월 (또는 원하는 가격)
4. **Price ID 복사** (예: `price_1234567890`)

#### 3.2 웹훅 로컬 테스트 (선택사항)
```bash
# Stripe CLI 설치
brew install stripe/stripe-cli/stripe  # macOS
# 또는 https://stripe.com/docs/stripe-cli

# 로그인
stripe login

# 웹훅 포워딩
stripe listen --forward-to localhost:8787/api/webhooks/stripe
```

출력된 `whsec_...`를 `.env.local`의 `STRIPE_WEBHOOK_SECRET`에 추가.

### 4단계: 로컬 서버 실행 및 테스트 (10분)

```bash
# 프론트엔드 (터미널 1)
python -m http.server 3000

# 또는 Cloudflare Pages Functions 포함 (터미널 1)
npx wrangler pages dev . --port 8787
```

**테스트 시나리오**:
1. `http://localhost:3000` 접속
2. 회원가입/로그인 테스트
3. 레스토랑 리스트 확인
4. 상세 화면 열기
5. 길찾기 딥링크 테스트

### 5단계: 구독 플로우 클라이언트 코드 추가 (1시간)

**중요**: 현재 웹훅은 준비되었지만, 클라이언트에서 Stripe Checkout을 시작하는 코드가 아직 없습니다.

#### main.js에 추가할 함수:

```javascript
// Stripe Checkout Session 생성
async function createCheckoutSession(priceId) {
  const user = await getSupabaseClient().auth.getUser();
  if (!user.data.user) {
    alert('로그인이 필요합니다.');
    return;
  }

  const stripe = Stripe(STRIPE_CONFIG.publishableKey);

  // Checkout Session 생성 (API 필요 - Cloudflare Function 추가 필요)
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priceId: priceId,
      userId: user.data.user.id,
      successUrl: `${window.location.origin}/#profile?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/#profile`,
    }),
  });

  const { sessionId } = await response.json();
  await stripe.redirectToCheckout({ sessionId });
}
```

#### functions/api/create-checkout-session.js 생성:

```javascript
// Cloudflare Pages Function
import Stripe from 'stripe';

export async function onRequestPost(context) {
  const { request, env } = context;
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);

  const { priceId, userId, successUrl, cancelUrl } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: { user_id: userId },
  });

  return new Response(JSON.stringify({ sessionId: session.id }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

### 6단계: 프로덕션 배포 (30분)

```bash
# 1. GitHub에 푸시
git add .
git commit -m "feat: 프로덕션 인프라 설정 완료

- Stripe 웹훅 구현
- Supabase RLS 정책
- MCP 및 슬래시 커맨드 설정
- 전체 문서화

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push origin main
```

#### Cloudflare Pages 설정:
1. Cloudflare Dashboard → Pages → Create project
2. GitHub 저장소 연결
3. 환경 변수 설정 (SETUP.md 참고)
4. 배포 완료 후 `kpopeats.cc` 도메인 연결

#### Stripe 프로덕션 웹훅 등록:
1. Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://kpopeats.cc/api/webhooks/stripe`
3. 이벤트 선택: checkout.session.completed, customer.subscription.* 등
4. Signing secret을 Cloudflare 환경 변수에 추가

---

## 📋 완전한 체크리스트

### 로컬 개발
- [ ] `npm install` 실행
- [ ] `.env.local` 파일 생성 및 설정
- [ ] Supabase 마이그레이션 실행 (`supabase db push`)
- [ ] Stripe 제품 및 가격 생성
- [ ] 로컬 서버 실행 및 기본 기능 테스트
- [ ] 구독 플로우 클라이언트 코드 추가
- [ ] Stripe Checkout 로컬 테스트

### 프로덕션 배포
- [ ] GitHub에 코드 푸시
- [ ] Cloudflare Pages 프로젝트 생성
- [ ] Cloudflare Pages 환경 변수 설정
- [ ] 커스텀 도메인 연결
- [ ] Stripe 프로덕션 웹훅 등록
- [ ] 웹사이트 접속 및 기능 테스트
- [ ] 회원가입/로그인 테스트
- [ ] 구독 플로우 E2E 테스트

### 데이터 마이그레이션
- [ ] data.js의 레스토랑 데이터를 Supabase restaurants 테이블로 이동
- [ ] 신뢰 근거 데이터를 trust_evidence 테이블로 이동
- [ ] 클라이언트 코드에서 Supabase API로 데이터 가져오기 전환

### 기능 완성도
- [ ] 검색 기능 구현
- [ ] 필터/정렬 UI 완성
- [ ] 저장/공유 기능 완성
- [ ] Google Analytics 이벤트 트래킹
- [ ] 에러 핸들링 및 로딩 상태 UI
- [ ] 반응형 디자인 최종 점검

---

## 🎓 중요 문서 읽기

배포 전 **반드시** 읽어야 할 문서:

1. **CLAUDE.md** - 프로젝트 철학 및 정책
   - 신뢰 정책 (배지 판매 금지!)
   - 구독 플로우 규칙
   - 코딩 규칙

2. **SETUP.md** - 설정 및 배포 가이드
   - 단계별 설정 방법
   - 문제 해결 가이드

3. **README.md** - 프로젝트 개요
   - 기술 스택
   - 개발 워크플로우

---

## 💡 도움이 필요하면

- **문제 해결**: SETUP.md의 "문제 해결" 섹션 참고
- **Supabase 관련**: [Supabase Docs](https://supabase.com/docs)
- **Stripe 관련**: [Stripe Docs](https://stripe.com/docs)
- **Cloudflare Pages**: [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)

---

**🚀 지금 시작하세요! 위의 1~6단계를 순서대로 진행하면 프로덕션 배포까지 약 2~3시간 소요됩니다.**
