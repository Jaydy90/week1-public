# CLAUDE.md — Trust Route (Web SaaS)
# Stack: Next.js + TypeScript / Supabase(Auth+Postgres) / Stripe(Subcription via Checkout) / Deploy: GitHub→Cloudflare Pages→Domain

## 0) Product North Star (read first)
- **본질**: 검색을 넘어선 "결정 + 이동 완결 UX"
- **한 문장**: 내 위치에서 "신뢰 근거가 명확한 맛집"만 골라, 가장 효율적인 이동 동선으로 즉시 안내하는 신뢰 기반 공간데이터 플랫폼
- **차별화 자산**: 신뢰 기준(미쉐린/유명인/흑백요리사 등) + 근거 카드(출처/확인일/근거유형) 시각화
- **우선순위**: 정보량 경쟁 X → 결정 시간 단축 + 길찾기 전환 극대화 O

## 1) MVP scope (0~30일: 출시 가능한 최소 단위)
- **화면 4종**: 홈 / 리스트 / 상세 / 길찾기
- **홈**: 지도 중심 + 내 위치 기반 "내 주변 10/15/30분" + 신뢰 탭(미쉐린/유명인/흑백요리사)
- **리스트**: 거리/소요시간/영업중/가격대 필터 + 정렬(가까움/빠름/저장순)
- **상세**: 신뢰 근거 카드(출처/확인일/캡션/링크) + 대표메뉴 + 예상 이동시간 + "바로 길찾기"
- **길찾기**: 도보/대중교통/차량 3탭 + 최적 기본값 + 지도앱 딥링크(네이버/카카오)
- **저장**: 북마크 + 최근 본 + 공유 링크(코스 공유는 V1.5 이후)
- **피드백**: 오정보 신고/정정 최소 기능

## 2) Metrics (build instrumentation around these)
- **가치 지표(핵심)**:
  - 길찾기 앱 전환율(딥링크 클릭률)
  - 사용자당 저장 횟수
  - 사용자당 공유 횟수
  - 1인당 평균 탐색 시간(짧을수록 "결정 UX" 성공)
- **리텐션**: 7일/30일 재방문률, 저장 컬렉션 재사용률
- **수익**: 제휴 전환율, B2B 파일럿 유료 전환율, 구독 전환율(후순위)

## 3) Trust policy (브랜드 생명줄: 반드시 지킨다)
- **배지 판매 금지**: 돈 내면 상단/배지 부여 같은 신뢰 훼손 행위 금지
- **근거 카드 필수 필드**: 출처 링크 + 확인일 + 근거 유형 + 캡션
- **갱신 원칙**: 월 단위 갱신 정책(또는 정책 확정 전까지 "확인일 기준 노출")
- **정정/삭제 프로세스**: 신고 → 검수 → 반영(속도와 투명성이 신뢰를 지킨다)
- **저작권/약관 리스크 방어**: 원문 복제보다 "출처 링크 + 메타데이터 + UX" 중심

## 4) Business model constraints (초기 과욕 금지)
- **1단계**: 제휴 전환 수수료(예약/웨이팅/주문/배달 등)로 빠른 검증
- **2단계**: B2B는 "노출 판매"가 아니라 "전환 도구" 판매(프로필 고도화/전환 랜딩/공지 등)
- **3단계**: 개인 구독은 "시간 절약 + 실패 회피(결정 자동화)"로만 설득
- **구독 출시 시점**: 재방문·저장·공유가 충분히 형성된 뒤(지표 기반)

## 5) SaaS rules (Auth + Subscription)
- **로그인**: 이메일/비밀번호 + Google OAuth
- **구독 모델**: 개인 단일 구독(유저 1명 = 활성 구독 최대 1개)
- **클라이언트 신뢰 금지**: 구독 상태/권한을 클라이언트 콜백만으로 반영하지 않는다
- **진실의 원천**: Stripe Webhook → DB 기록 → 앱은 DB 상태로 권한/기능 제어

## 6) Stripe subscription flow (Checkout standard)
- **Start subscription**: Stripe Checkout(Subscription mode)로 시작한다
- **Post-checkout**: 성공 리다이렉트는 "UX용"일 뿐, 권한 부여는 웹훅/DB 기준
- **Webhooks (must implement safely)**:
  - 서명 검증(Stripe signature)
  - idempotency(이벤트 중복 처리 방지: `stripe_event_id` 저장 후 재처리 금지)
  - canonical 상태 업데이트(구독/고객/플랜/기간/상태)
- **Recommended webhook events** (최소):
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

## 7) Supabase (Auth + Postgres) rules
- 클라이언트는 **anon key만** 사용
- 서버/웹훅은 **service role key** 사용(절대 클라이언트로 노출 금지)
- RLS 기본 ON 가정(정책은 "내 데이터만" 원칙)
- 스키마/마이그레이션은 추적 가능해야 함(임의 변경 금지)

## 8) Data model (minimum recommended tables)
> Exact schema can evolve, but these concepts must exist.

- `profiles`
  - `id (uuid, = auth.users.id)`
  - `created_at`
  - `display_name`
  - (optional) `home_area`, `preferences`
- `restaurants`
  - `id`, `name`, `address`, `lat`, `lng`, `category`, `price_range`, `hours`, `phone`, `menus(...)`
- `trust_evidence` (근거 카드)
  - `id`, `restaurant_id`
  - `source_type` (michelin/celebrity/tv/chef/etc)
  - `source_url`, `caption`
  - `verified_at` (확인일)
  - `trust_level` (1~5)
- `bookmarks`
  - `user_id`, `restaurant_id`, `created_at`
- `reports` (오정보 신고)
  - `user_id`, `restaurant_id`, `type`, `message`, `status`, `created_at`
- `subscriptions` (Stripe canonical)
  - `user_id`
  - `stripe_customer_id`
  - `stripe_subscription_id`
  - `status` (active/trialing/past_due/canceled/unpaid/etc)
  - `current_period_end`
  - `cancel_at_period_end`
  - `price_id` (or plan identifier)
  - `updated_at`
- `stripe_events` (idempotency)
  - `stripe_event_id`, `type`, `received_at`

## 9) Access control (feature gating)
- Free(기본): 탐색(리스트/상세/길찾기 기본)
- Paid(프리미엄: "결정 자동화"):
  - 내 기준 자동 필터(개인화)
  - 코스 자동 생성(2~3곳 동선)
  - 관심 지역 신규 맛집 알림
  - 저장 컬렉션 무제한 / 고급 정렬
- Gating rule: UI 숨김만 하지 말고 **서버/API에서 강제**한다

## 10) UI/UX rules (STRICT)
- 모든 화면: Loading / Empty / Error 상태 필수
- 접근성 기본: label, keyboard nav, focus 관리, 접근 가능한 에러 메시지
- "결정 UX" 우선:
  - 신뢰 근거 카드가 결정을 빠르게 끝내도록 구성(출처/확인일이 즉시 보이게)
  - "바로 길찾기"는 최상단 CTA로 유지

## 11) Performance rules
- 큰 리스트는 서버/쿼리 기준으로 페이지네이션/필터 우선
- 무거운 화면/컴포넌트 lazy-load
- 이미지 최적화(사이즈/포맷/로딩)

## 12) Cloudflare Pages + GitHub contract
- GitHub `main`은 항상 배포 가능 상태 유지(위험 작업은 브랜치)
- 런타임 제약이 있을 수 있으니 Node 전용 API는 신중히(호환 확인 후 사용)
- 환경변수:
  - 로컬: `.env.local` (커밋 금지)
  - 배포: Cloudflare Pages 프로젝트 설정
  - 저장소: `.env.example` (가짜 값만)

## 13) Env vars (standard names)
- Supabase (public)
  - `NEXT_PUBLIC_SUPABASE_URL=...`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- Supabase (server only)
  - `SUPABASE_SERVICE_ROLE_KEY=...`
- Stripe (public)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...`
- Stripe (server only)
  - `STRIPE_SECRET_KEY=...`
  - `STRIPE_WEBHOOK_SECRET=...`
- App
  - `APP_URL=https://your-domain.com`

## 14) Engineering process (STRICT)
### Testing
- 기능/버그 수정 = 테스트 1개 이상 필수(unit/integration/e2e 중 택1)
- auth/billing/webhook/권한 경계는 integration/e2e 우선
- 예외 시: 사유 + 수동 체크리스트 필수

### UI evidence
- UI 변경 시 Before/After 스크린샷(또는 영상) + UX 의도 1~2줄 필수

### Size limits
- 함수 <= 60줄 / 컴포넌트 <= 200줄 / 파일 <= 400줄 (예외는 이유 코멘트)

### Comments (language)
- 코드 주석: 한국어, Why/주의점/트레이드오프 중심
- TODO: `TODO(이니셜|YYYY-MM-DD): 내용`

### Dependencies
- 새 의존성은 보수적으로
- 추가 시 "왜 필요한지 + 대안 1개"를 기록

## 15) Git conventions
- Branch: `feat/...`, `fix/...`, `chore/...`
- Commit: `feat: ...`, `fix: ...`, `chore: ...`
- Merge 전 체크: build OK / tests OK / lint OK

## 16) Definition of done
- 대표 시나리오가 완결된다:
  - "내 주변 15분" → 신뢰 배지 식당 → 선택 → 길찾기 실행
  - "흑백요리사 탭" → 지역 → 출연자별 매장 → 저장/공유
  - "미쉐린 탭" → 필터 → 오늘 갈 곳 확정 → 길찾기
- 핵심 지표 측정이 된다(길찾기 클릭/저장/공유)
- 신뢰 정책을 위반하지 않는다(배지 판매 금지/출처+확인일)
- 구독 플로우는 Stripe Checkout + 웹훅 기반으로 안전하게 동작한다
- 배포가 Cloudflare Pages에서 재현 가능하다
