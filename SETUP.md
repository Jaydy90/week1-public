# KPopEats (Trust Route) - Setup Guide

이 문서는 프로젝트를 로컬 환경에서 실행하고 프로덕션에 배포하는 방법을 설명합니다.

## 📋 사전 요구사항

- Node.js 18 이상
- Git
- Supabase 계정
- Stripe 계정
- Cloudflare 계정
- GitHub 계정

## 🚀 로컬 개발 환경 설정

### 1. 저장소 클론

```bash
git clone https://github.com/your-org/kpopeats.git
cd kpopeats
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.example`을 `.env.local`로 복사:

```bash
cp .env.example .env.local
```

`.env.local` 파일을 편집하여 실제 값 입력:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (나중에 설정)

# App
APP_URL=http://localhost:3000
```

### 4. Supabase 설정

#### 4.1 Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속
2. 새 프로젝트 생성
3. Database password 설정 및 저장

#### 4.2 데이터베이스 마이그레이션 실행

```bash
# Supabase CLI 설치 (한 번만)
npm install -g supabase

# Supabase 프로젝트 연결
supabase link --project-ref your-project-ref

# 마이그레이션 실행
supabase db push
```

마이그레이션 파일:
- `supabase/migrations/20260121000001_initial_schema.sql` - 테이블 생성
- `supabase/migrations/20260121000002_rls_policies.sql` - RLS 정책 설정

#### 4.3 Google OAuth 설정

1. Supabase 대시보드 → Authentication → Providers
2. Google 활성화
3. Google Cloud Console에서 OAuth 2.0 클라이언트 ID 생성
   - Authorized redirect URIs: `https://your-project.supabase.co/auth/v1/callback`
4. Client ID와 Client Secret을 Supabase에 입력

### 5. Stripe 설정

#### 5.1 Stripe 제품 및 가격 생성

1. [Stripe Dashboard](https://dashboard.stripe.com) 접속
2. Products → Add product
3. 구독 제품 생성 (예: "KPopEats Premium")
4. 가격 설정 (예: ₩9,900/월)
5. Price ID 복사 (예: `price_1234567890`)

#### 5.2 Stripe 웹훅 설정 (로컬 테스트)

로컬 개발 시 Stripe CLI 사용:

```bash
# Stripe CLI 설치 (한 번만)
brew install stripe/stripe-cli/stripe  # macOS
# 또는 https://stripe.com/docs/stripe-cli 참고

# Stripe 로그인
stripe login

# 웹훅 이벤트를 로컬로 포워딩
stripe listen --forward-to localhost:8787/api/webhooks/stripe
```

출력된 `whsec_...` 값을 `.env.local`의 `STRIPE_WEBHOOK_SECRET`에 추가.

### 6. 로컬 서버 실행

#### 6.1 정적 파일 서버 (프론트엔드)

```bash
# Python 3
python -m http.server 3000

# 또는 Node.js http-server
npx http-server -p 3000
```

브라우저에서 `http://localhost:3000` 접속.

#### 6.2 Cloudflare Pages Functions (웹훅)

로컬에서 Cloudflare Functions 테스트:

```bash
# Wrangler 설치 (한 번만)
npm install -g wrangler

# 로컬 개발 서버 실행
wrangler pages dev . --port 8787
```

이제 `http://localhost:8787`에서 전체 앱을 테스트할 수 있습니다.

## 🌐 프로덕션 배포

### 1. GitHub 저장소 설정

```bash
# 원격 저장소 추가 (아직 안 했다면)
git remote add origin https://github.com/your-org/kpopeats.git

# main 브랜치로 푸시
git push -u origin main
```

### 2. Cloudflare Pages 설정

#### 2.1 프로젝트 생성

1. [Cloudflare Dashboard](https://dash.cloudflare.com) 접속
2. Pages → Create a project
3. Connect to Git → GitHub 선택
4. 저장소 선택: `your-org/kpopeats`
5. 빌드 설정:
   - Framework preset: None
   - Build command: (비워두기)
   - Build output directory: `/`
6. Create project 클릭

#### 2.2 환경 변수 설정

Cloudflare Pages 프로젝트 → Settings → Environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (Encrypt!)
SUPABASE_URL=https://your-project.supabase.co
STRIPE_SECRET_KEY=sk_live_... (Encrypt!)
STRIPE_WEBHOOK_SECRET=whsec_... (나중에 설정)
APP_URL=https://kpopeats.cc
```

**중요**: Secret key들은 반드시 "Encrypt" 체크!

#### 2.3 커스텀 도메인 연결

1. Cloudflare Pages 프로젝트 → Custom domains
2. `kpopeats.cc` 추가
3. DNS 레코드 자동 생성 확인

### 3. Stripe 웹훅 설정 (프로덕션)

#### 3.1 웹훅 엔드포인트 등록

1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint
3. Endpoint URL: `https://kpopeats.cc/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Add endpoint

#### 3.2 웹훅 서명 키 설정

1. 웹훅 엔드포인트 클릭
2. Signing secret 복사 (`whsec_...`)
3. Cloudflare Pages 환경 변수에 `STRIPE_WEBHOOK_SECRET` 추가
4. 배포 다시 트리거 (Settings → Deployments → Redeploy)

### 4. 배포 확인

#### 4.1 웹사이트 접속

`https://kpopeats.cc` 접속하여 정상 작동 확인:
- [ ] 페이지 로드
- [ ] 로그인/회원가입
- [ ] 레스토랑 리스트 표시
- [ ] 상세 화면 열기
- [ ] 길찾기 딥링크 작동

#### 4.2 웹훅 테스트

Stripe Dashboard → Webhooks → 엔드포인트 → Send test webhook:
- `checkout.session.completed` 이벤트 전송
- Cloudflare Pages Functions 로그 확인 (Logs 탭)
- Supabase 데이터베이스에서 `stripe_events` 테이블 확인

## 🔧 개발 워크플로우

### 슬래시 커맨드 사용

```bash
# 코드 커밋 & 푸시
./.claude/commands/commit-push.sh

# 테스트 & 빌드 검증
./.claude/commands/test-build.sh

# 프로덕션 배포
./.claude/commands/deploy.sh

# DB 마이그레이션
./.claude/commands/db-migrate.sh
```

### Git 워크플로우

```bash
# 새 기능 브랜치 생성
git checkout -b feat/new-feature

# 작업 후 커밋
git add .
git commit -m "feat: 새 기능 추가

상세 설명...

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# main에 머지
git checkout main
git merge feat/new-feature
git push origin main
```

Cloudflare Pages가 자동으로 배포합니다.

## 🐛 문제 해결

### 웹훅이 작동하지 않을 때

1. Stripe Dashboard에서 웹훅 로그 확인
2. Cloudflare Pages Functions 로그 확인
3. 환경 변수 `STRIPE_WEBHOOK_SECRET` 확인
4. 서명 검증 실패 시: 웹훅 재생성 후 새 secret 사용

### RLS 정책 오류

```sql
-- Supabase SQL Editor에서 실행
SELECT * FROM auth.users; -- 사용자 목록
SELECT * FROM profiles; -- 프로필 확인
SELECT * FROM subscriptions; -- 구독 상태 확인

-- RLS 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'subscriptions';
```

### 로컬 개발 시 CORS 오류

Supabase 대시보드 → Authentication → URL Configuration:
- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/**`

## 📚 추가 리소스

- [CLAUDE.md](./CLAUDE.md) - 프로젝트 가이드라인 및 정책
- [README.md](./README.md) - 프로젝트 개요
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)

## ✅ 체크리스트

### 로컬 개발 환경

- [ ] Node.js 18+ 설치
- [ ] 저장소 클론
- [ ] 의존성 설치 (`npm install`)
- [ ] `.env.local` 파일 생성 및 설정
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 마이그레이션 실행
- [ ] Google OAuth 설정
- [ ] Stripe 제품/가격 생성
- [ ] Stripe CLI로 웹훅 테스트
- [ ] 로컬 서버 실행 (`python -m http.server 3000`)

### 프로덕션 배포

- [ ] GitHub 저장소 생성 및 푸시
- [ ] Cloudflare Pages 프로젝트 생성
- [ ] Cloudflare Pages 환경 변수 설정 (모든 키 포함)
- [ ] 커스텀 도메인 연결 (`kpopeats.cc`)
- [ ] Stripe 웹훅 엔드포인트 등록
- [ ] Stripe 웹훅 서명 키를 환경 변수에 추가
- [ ] 배포 확인 (웹사이트 접속)
- [ ] 웹훅 테스트 (Stripe Dashboard)
- [ ] 회원가입/로그인 테스트
- [ ] 구독 플로우 테스트

---

**문제가 발생하면 CLAUDE.md를 먼저 확인하세요!**
