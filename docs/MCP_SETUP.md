# MCP 서버 설정 가이드

> Claude Code의 MCP(Model Context Protocol) 서버를 활성화하여 GitHub, Stripe, Supabase 등을 직접 제어할 수 있습니다.

---

## ✅ 설치 완료된 MCP 서버

1. ✅ **GitHub MCP** - 이슈/PR 자동화
2. ✅ **Stripe MCP** - 결제/구독 관리
3. ✅ **PostgreSQL MCP** - Supabase DB 쿼리
4. ✅ **Sentry MCP** - 에러 트래킹
5. ✅ **PostHog MCP** - 분석/피처 플래그
6. ✅ **Context7 MCP** - 최신 라이브러리 문서

---

## 🔐 환경 변수 설정 (필수)

### Step 1: `.env.mcp` 파일 편집

이미 `.env.mcp` 파일이 생성되어 있습니다. 이 파일을 열어서 실제 값을 입력하세요.

---

## 1️⃣ GitHub Personal Access Token

### 발급 방법:

1. **GitHub 설정**: https://github.com/settings/tokens
2. **"Generate new token (classic)"** 클릭
3. **Note**: `Claude Code MCP`
4. **권한 선택**:
   - ✅ `repo` (전체)
   - ✅ `workflow`
   - ✅ `admin:org` → `read:org`
5. **"Generate token"** 클릭
6. 토큰 복사 (한 번만 표시됨!)

### `.env.mcp` 파일에 추가:

```bash
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_actual_token_here
```

---

## 2️⃣ Stripe Secret Key

### 발급 방법:

1. **Stripe Dashboard**: https://dashboard.stripe.com/test/apikeys
2. **Secret key** 옆의 **"Reveal test key"** 클릭
3. `sk_test_51...` 형태의 키 복사

### `.env.mcp` 파일에 추가:

```bash
STRIPE_SECRET_KEY=sk_test_51abc...xyz
```

---

## 3️⃣ Supabase Connection String

### 발급 방법:

1. **Supabase Dashboard**: https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd/settings/database
2. **Connection string** 섹션
3. **URI** 탭 클릭
4. 비밀번호 입력: `[YOUR-PASSWORD]` 부분을 실제 비밀번호로 교체
5. 전체 URI 복사

### `.env.mcp` 파일에 추가:

```bash
SUPABASE_DB_URL=postgresql://postgres:your_actual_password@db.djmadubptsajvdvzpdvd.supabase.co:5432/postgres
```

---

## 4️⃣ Sentry DSN (선택)

Sentry를 사용하지 않으면 건너뛰어도 됩니다.

### 발급 방법:

1. **Sentry 프로젝트 생성**: https://sentry.io
2. **Settings** → **Projects** → 프로젝트 선택
3. **Client Keys (DSN)** 복사

### `.env.mcp` 파일에 추가:

```bash
SENTRY_DSN=https://your_key@o123456.ingest.sentry.io/123456
```

---

## 5️⃣ PostHog API Key (선택)

PostHog를 사용하지 않으면 건너뛰어도 됩니다.

### 발급 방법:

1. **PostHog 프로젝트 생성**: https://app.posthog.com
2. **Project Settings** → **Project API Key** 복사

### `.env.mcp` 파일에 추가:

```bash
POSTHOG_API_KEY=phc_your_actual_key_here
```

---

## 🚀 MCP 서버 활성화

### Step 2: Claude Code 재시작

환경 변수를 설정한 후:

1. **Cursor 완전히 종료**
2. **Cursor 다시 열기**
3. Claude Code가 자동으로 MCP 서버 연결

---

## 🔍 확인 방법

Claude Code 터미널에서:

```bash
claude --mcp-status
```

**출력 예시**:
```
✅ GitHub MCP - Connected
✅ Stripe MCP - Connected
✅ PostgreSQL MCP - Connected
✅ Sentry MCP - Connected
✅ PostHog MCP - Connected
✅ Context7 MCP - Connected
```

---

## 🎯 사용 예시

### GitHub 이슈 생성

```
User: "GitHub에 새 이슈 생성: 제목은 '구독 버튼 추가', 본문은 'Stripe 구독 버튼을 마이페이지에 추가'"

Claude: [GitHub MCP 사용]
→ 이슈 #123 생성 완료
→ https://github.com/Jaydy90/week1-public/issues/123
```

### Stripe 고객 조회

```
User: "Stripe에서 최근 구독한 고객 3명 조회"

Claude: [Stripe MCP 사용]
→ 1. cus_abc123 - test@example.com - Active
→ 2. cus_def456 - user@test.com - Trialing
→ 3. cus_ghi789 - demo@mail.com - Past Due
```

### Supabase DB 쿼리

```
User: "subscriptions 테이블에서 활성 구독 수 조회"

Claude: [PostgreSQL MCP 사용]
→ SELECT COUNT(*) FROM subscriptions WHERE status = 'active';
→ Result: 15개
```

---

## 🔒 보안 주의사항

### ⚠️ 절대 Git에 커밋하지 마세요!

- ✅ `.env.mcp` 파일은 `.gitignore`에 이미 추가됨
- ✅ `.mcp.json`도 `.gitignore`에 추가됨
- ❌ 토큰/키를 코드에 직접 입력 금지

### 토큰 권한 최소화

- GitHub Token: 필요한 권한만 선택
- Stripe: Test key 사용 (프로덕션 아님)
- Supabase: 읽기 전용 계정 권장 (선택)

---

## 🆘 문제 해결

### "MCP server failed to start"

**원인**: 환경 변수가 설정되지 않음

**해결**:
1. `.env.mcp` 파일 확인
2. 값이 `your_*_here` 형태로 남아있는지 확인
3. 실제 토큰/키로 교체

### "GitHub API rate limit exceeded"

**원인**: Personal Access Token이 없음

**해결**:
1. GitHub Token 재발급
2. `.env.mcp`에 추가
3. Cursor 재시작

### PostgreSQL 연결 실패

**원인**: Connection string이 잘못됨

**해결**:
1. Supabase Dashboard에서 Connection String 재확인
2. 비밀번호 부분 정확히 입력
3. 특수문자가 있으면 URL 인코딩 필요

---

## 📚 추가 리소스

- [Claude MCP 공식 문서](https://modelcontextprotocol.io)
- [GitHub MCP 서버](https://github.com/modelcontextprotocol/servers)
- [Stripe MCP 서버](https://stripe.com/docs/mcp)

---

## ✅ 설정 완료 체크리스트

- [ ] `.env.mcp` 파일 열기
- [ ] GitHub Personal Access Token 입력
- [ ] Stripe Secret Key 입력
- [ ] Supabase Connection String 입력
- [ ] (선택) Sentry DSN 입력
- [ ] (선택) PostHog API Key 입력
- [ ] Cursor 재시작
- [ ] `claude --mcp-status` 실행하여 확인

---

**설정 완료 후 Claude Code가 GitHub, Stripe, Supabase를 직접 제어할 수 있습니다!** 🚀
