# KPopEats (Trust Route)

> 신뢰 기반 맛집 발견 플랫폼 - 검색을 넘어선 "결정 + 이동 완결 UX"

내 위치에서 "신뢰 근거가 명확한 맛집"만 골라, 가장 효율적인 이동 동선으로 즉시 안내하는 신뢰 기반 공간데이터 플랫폼입니다.

## 🎯 핵심 가치

- **신뢰 중심**: 미쉐린/유명인/흑백요리사 등 명확한 신뢰 근거 제공
- **빠른 결정**: 정보 과부하 대신 "갈 곳을 빠르게 정한다"
- **이동 완결**: 결정 후 바로 길찾기로 연결되는 완결형 UX
- **투명성**: 모든 신뢰 근거에 출처 + 확인일 + 링크 필수

## ✨ 주요 기능

### MVP (v1.0)
- 🗺️ **지도 기반 탐색**: 내 위치 기준 10/15/30분 필터
- 🏆 **신뢰 탭**: 미쉐린/유명인/흑백요리사/셰프 분류
- 📍 **상세 화면**: 신뢰 근거 카드 + 메뉴 + 영업시간
- 🚶 **길찾기**: 도보/대중교통/차량 선택 + 네이버/카카오 딥링크
- 💾 **저장/공유**: 북마크 + 최근 본 + 공유 링크
- 🔍 **검색/필터**: 식당명/지역/카테고리 + 거리/소요시간/가격대

### 추후 계획 (v1.5+)
- 🎯 개인화 자동 필터 (구독)
- 🗺️ 코스 자동 생성 (2~3곳 동선)
- 🔔 관심 지역 신규 맛집 알림
- 📊 전환 추적 및 제휴 연동

## 🛠️ 기술 스택

### Frontend
- **Core**: Vanilla HTML5/CSS3/JavaScript (ES6+)
- **Routing**: Hash-based SPA router
- **Maps**: Naver Maps iframe embedding
- **Icons**: Lucide icons

### Backend & Services
- **Auth**: Supabase Auth (Email/Password + Google OAuth)
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe Checkout (구독형)
- **Analytics**: Google Analytics 4
- **Form**: Formspree (오정보 신고)

### Infrastructure
- **Hosting**: Cloudflare Pages
- **Domain**: kpopeats.cc
- **SSL**: Cloudflare SSL
- **CI/CD**: GitHub → Cloudflare Pages auto-deploy

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/your-org/kpopeats.git
cd kpopeats
```

### 2. 환경 변수 설정

`.env.example`을 `.env.local`로 복사 후 실제 값 입력:

```bash
cp .env.example .env.local
```

필수 환경 변수:
- `SUPABASE_URL`: Supabase 프로젝트 URL
- `SUPABASE_ANON_KEY`: Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: 서버용 service role key (보안 주의!)
- `STRIPE_PUBLISHABLE_KEY`: Stripe 공개 키
- `STRIPE_SECRET_KEY`: Stripe 비밀 키
- `STRIPE_WEBHOOK_SECRET`: Stripe 웹훅 서명 키

### 3. 로컬 서버 실행

정적 파일이므로 간단한 HTTP 서버로 실행:

```bash
# Python 3
python -m http.server 3000

# Node.js (http-server)
npx http-server -p 3000

# VS Code Live Server extension 사용
```

브라우저에서 `http://localhost:3000` 접속

## 📁 프로젝트 구조

```
KEats (Trust Route)/
├── .claude/                 # Claude Code 설정
│   └── commands/           # 슬래시 커맨드 스크립트
│       ├── commit-push.sh  # /commit-push
│       ├── test-build.sh   # /test-build
│       ├── deploy.sh       # /deploy
│       └── db-migrate.sh   # /db-migrate
├── supabase/               # Supabase 설정 (예정)
│   └── migrations/         # DB 마이그레이션 SQL
├── index.html              # 메인 HTML (SPA 엔트리)
├── style.css               # 전역 스타일
├── main.js                 # 앱 로직 (라우터, 화면 컨트롤러)
├── data.js                 # 레스토랑 데이터 (임시, DB 이전 예정)
├── config.js               # Supabase/앱 설정
├── .mcp.json               # MCP 서버 설정
├── CLAUDE.md               # 프로젝트 가이드라인 (필독!)
├── README.md               # 이 파일
└── .env.example            # 환경 변수 예시
```

## 🔧 개발 워크플로우

### CLAUDE.md 필독
모든 개발 전 반드시 `CLAUDE.md` 읽기:
- 프로덕트 철학 및 우선순위
- 신뢰 정책 (배지 판매 금지 등)
- 코딩 규칙 및 제약사항
- 역사적 실수 기록

### 슬래시 커맨드 사용

```bash
# 코드 커밋 & 푸시
./.claude/commands/commit-push.sh

# 테스트 & 빌드 검증
./.claude/commands/test-build.sh

# 프로덕션 배포
./.claude/commands/deploy.sh

# DB 마이그레이션 실행
./.claude/commands/db-migrate.sh
```

### Git 컨벤션

**브랜치 네이밍**:
- `feat/기능명` - 새 기능
- `fix/버그명` - 버그 수정
- `chore/작업명` - 설정/문서 등

**커밋 메시지**:
```
feat: 길찾기 화면에 대중교통 탭 추가

네이버/카카오 지도 딥링크 연동 완료

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### 코드 스타일
- **주석**: 한국어, Why/주의점 중심
- **함수**: ≤60줄
- **컴포넌트**: ≤200줄
- **파일**: ≤400줄
- **TODO**: `TODO(이니셜|날짜): 내용`

## 🚢 배포

### Cloudflare Pages 자동 배포

1. GitHub `main` 브랜치에 push
2. Cloudflare Pages가 자동으로 빌드 & 배포
3. `https://kpopeats.cc`에 즉시 반영

### 배포 전 체크리스트

- [ ] 모든 테스트 통과
- [ ] `CLAUDE.md` 위반 사항 없음
- [ ] 환경 변수 Cloudflare에 설정 완료
- [ ] Stripe 웹훅 URL 등록 (`https://kpopeats.cc/api/webhooks/stripe`)
- [ ] Supabase RLS 정책 활성화

## 📊 핵심 지표

### 가치 지표
- 길찾기 앱 전환율 (딥링크 클릭률)
- 사용자당 저장 횟수
- 사용자당 공유 횟수
- 1인당 평균 탐색 시간 (짧을수록 성공)

### 리텐션
- 7일/30일 재방문률
- 저장 컬렉션 재사용률

## 🔐 보안 정책

### 절대 금지 사항
- ❌ Supabase service role key를 클라이언트에 노출
- ❌ Stripe secret key를 클라이언트에 노출
- ❌ 웹훅 서명 검증 생략
- ❌ 구독 상태를 클라이언트 콜백만으로 판단
- ❌ RLS 비활성화 상태로 프로덕션 배포

### 권장 사항
- ✅ 모든 API 요청에 CORS 설정
- ✅ Stripe 웹훅 idempotency 구현
- ✅ Supabase RLS 정책 세밀하게 설정
- ✅ 환경 변수는 Cloudflare Pages 설정에서만 관리

## 🧪 테스트

현재 상태: 수동 테스트 (자동화 예정)

### 수동 테스트 체크리스트
- [ ] 회원가입 (이메일/비밀번호)
- [ ] 로그인 (Google OAuth)
- [ ] 맛집 리스트 필터링
- [ ] 상세 화면 표시
- [ ] 길찾기 딥링크 작동
- [ ] 저장/공유 기능
- [ ] 반응형 디자인 (320px ~ 1440px)

## 📝 라이선스

Proprietary - All rights reserved

## 🤝 기여

내부 팀원만 기여 가능. 외부 기여는 받지 않습니다.

## 📞 문의

- 웹사이트: https://kpopeats.cc
- 오정보 신고: 웹사이트 내 "오정보 신고" 폼 사용

---

**Made with ❤️ by KPopEats Team**
