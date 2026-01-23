# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added (2026-01-21) - Production Infrastructure Setup

#### 프로젝트 가이드라인 및 문서화
- **CLAUDE.md**: 프로젝트 철학, 정책, 코딩 규칙 등 종합 가이드라인 파일 생성
  - Product North Star 및 차별화 전략
  - MVP 스코프 및 핵심 지표
  - 신뢰 정책 (배지 판매 금지, 근거 카드 필수)
  - SaaS 규칙 (Auth + Subscription)
  - Stripe 구독 플로우 및 웹훅 요구사항
  - Supabase RLS 규칙
  - 데이터 모델 명세 (8개 핵심 테이블)
  - UI/UX 규칙 및 성능 가이드라인
  - 엔지니어링 프로세스 (테스트, 코드 스타일, Git 규칙)
  - Definition of Done

- **README.md**: 프로젝트 개요 및 빠른 시작 가이드
  - 핵심 가치 및 주요 기능
  - 기술 스택 전체 정리
  - 프로젝트 구조 설명
  - 개발 워크플로우 및 Git 컨벤션
  - 배포 가이드 및 핵심 지표

- **SETUP.md**: 상세한 설정 및 배포 가이드
  - 로컬 개발 환경 설정 단계별 가이드
  - Supabase 설정 및 마이그레이션 실행 방법
  - Stripe 설정 및 웹훅 구성 방법
  - Cloudflare Pages 배포 전체 프로세스
  - 문제 해결 가이드
  - 완전한 체크리스트

- **CHANGELOG.md**: 프로젝트 변경 이력 추적

#### MCP (Model Context Protocol) 설정
- **.mcp.json**: MCP 서버 설정 파일 생성
  - GitHub MCP 통합
  - Stripe MCP 통합
  - PostgreSQL/Supabase MCP 통합
  - Sentry, PostHog 통합 준비 (선택사항)

#### 슬래시 커맨드 (Workflow Automation)
- `.claude/commands/commit-push.sh`: Git 커밋 & 푸시 자동화
- `.claude/commands/test-build.sh`: 테스트 & 빌드 검증 자동화
- `.claude/commands/deploy.sh`: Cloudflare Pages 배포 자동화
- `.claude/commands/db-migrate.sh`: Supabase 마이그레이션 실행 자동화

#### Stripe 웹훅 구현 (CRITICAL)
- **functions/api/webhooks/stripe.js**: Cloudflare Pages Function으로 웹훅 핸들러 구현
  - 서명 검증 (Stripe signature)
  - Idempotency 보장 (`stripe_events` 테이블 활용)
  - 핵심 이벤트 처리:
    - `checkout.session.completed`: 구독 시작
    - `customer.subscription.created`: 구독 생성
    - `customer.subscription.updated`: 구독 변경
    - `customer.subscription.deleted`: 구독 취소
    - `invoice.payment_succeeded`: 결제 성공
    - `invoice.payment_failed`: 결제 실패
  - Supabase DB 동기화 (진실의 원천)

#### Supabase 데이터베이스 마이그레이션
- **supabase/migrations/20260121000001_initial_schema.sql**: 초기 스키마 생성
  - `profiles`: 사용자 프로필
  - `restaurants`: 레스토랑 정보 (위치, 메뉴, 통계)
  - `trust_evidence`: 신뢰 근거 카드 (미쉐린/유명인/TV/셰프)
  - `bookmarks`: 사용자 북마크
  - `reports`: 오정보 신고
  - `subscriptions`: Stripe 구독 상태 (canonical state)
  - `stripe_events`: 웹훅 이벤트 기록 (idempotency)
  - Triggers: `updated_at` 자동 갱신

- **supabase/migrations/20260121000002_rls_policies.sql**: RLS (Row Level Security) 정책
  - 모든 테이블에 RLS 활성화
  - Profiles: 본인 프로필만 CRUD 가능
  - Restaurants: 모든 사용자가 조회 가능 (공개 데이터)
  - Trust Evidence: 모든 사용자가 조회 가능
  - Bookmarks: 본인 북마크만 CRUD 가능
  - Reports: 본인 신고만 조회/수정 가능
  - Subscriptions: 본인 구독만 조회, 변경은 웹훅만 가능
  - Helper Functions:
    - `has_active_subscription()`: 활성 구독 확인
    - `current_user_has_active_subscription()`: 현재 사용자 구독 확인
  - Triggers: 북마크 카운트 자동 업데이트

#### 프로젝트 구조 개선
- **package.json**: 프로젝트 의존성 및 스크립트 정의
  - Stripe SDK
  - Supabase JS SDK
  - ESLint, Prettier

- **.env.example**: 환경 변수 템플릿 확장
  - Supabase 설정 (public + service role)
  - Stripe 설정 (public + secret)
  - 앱 설정
  - 선택적 통합 (Sentry, PostHog, GitHub)

- **.gitignore**: 민감한 파일 제외 규칙 강화
  - 환경 변수 파일 (.env.local 등)
  - node_modules
  - 빌드 아티팩트
  - OS 파일
  - 에디터 설정

### 이전 세션 구현 사항 (요약)

#### 브랜딩 및 서비스 설명
- KPopEats 브랜딩 변경
- Trust Route 서비스 섹션 추가

#### 맛집 리스트 화면
- 데이터 통합 (nearbySpots + allRestaurants)
- 인라인 상세 화면 (accordion 스타일)
- 그라디언트 디자인 시스템
- Ripple effect 버튼 애니메이션

#### 인증 시스템
- Supabase Auth 통합
- Google OAuth 로그인
- 이메일/비밀번호 로그인
- 프로필 화면

#### 지도 및 내비게이션
- 네이버 지도 iframe 임베딩
- Geolocation API 위치 인식
- 시간 필터 (10/15/30분)
- 길찾기 화면 (네이버 지도 딥링크)

#### 개인정보 처리방침
- 완전한 개인정보 처리방침 페이지

## [0.1.0] - Initial Development

### Added
- 기본 HTML/CSS/JS SPA 구조
- 해시 기반 라우터
- 레스토랑 데이터 (data.js)
- 기본 화면: Home, List, Profile
- Formspree 오정보 신고 통합

---

## 다음 단계 (To-Do)

### 즉시 필요한 작업
1. **의존성 설치**: `npm install`
2. **Supabase 마이그레이션 실행**: `supabase db push`
3. **환경 변수 설정**: `.env.local` 파일 생성 및 실제 키 입력
4. **Stripe 제품 생성**: Stripe Dashboard에서 구독 제품 및 가격 생성
5. **Stripe Checkout 통합**: 클라이언트에서 Checkout Session 생성 코드 추가
6. **웹훅 테스트**: Stripe CLI로 로컬 웹훅 테스트
7. **프로덕션 배포**: Cloudflare Pages에 배포 및 환경 변수 설정
8. **프로덕션 웹훅 등록**: Stripe Dashboard에서 프로덕션 엔드포인트 등록

### 기능 완성도 개선
- [ ] 검색 기능 구현
- [ ] 필터/정렬 로직 강화
- [ ] 저장/공유 기능 완성
- [ ] 실제 레스토랑 데이터 DB 마이그레이션 (data.js → Supabase)
- [ ] Google Analytics 4 이벤트 트래킹
- [ ] 에러 핸들링 개선
- [ ] 로딩 상태 UI
- [ ] 반응형 디자인 최적화

### 구독 플로우 구현
- [ ] 클라이언트: Stripe Checkout Session 생성 로직
- [ ] 클라이언트: 구독 상태 확인 및 UI 분기
- [ ] 클라이언트: 구독 취소 UI
- [ ] 서버: 구독 권한 검증 로직

### 테스트 자동화
- [ ] 단위 테스트 (Jest)
- [ ] 통합 테스트 (Auth, Billing, Webhooks)
- [ ] E2E 테스트 (Playwright)

### 모니터링
- [ ] Sentry 통합 (에러 추적)
- [ ] PostHog 통합 (제품 분석)
- [ ] Uptime 모니터링

---

**See [SETUP.md](./SETUP.md) for deployment instructions.**
