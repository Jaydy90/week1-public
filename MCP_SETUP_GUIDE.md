# MCP 서버 설정 가이드 (새 노트북용)

이 가이드는 새 노트북에서 동일한 개발 환경을 구축하기 위한 단계별 설명입니다.

## 1. Claude Code 설치

```bash
npm install -g @anthropic/claude-code
claude setup-token  # Claude 구독 계정 로그인
```

## 2. 프로젝트 Clone

```bash
git clone https://github.com/Jaydy90/week1-public.git
cd week1-public
```

## 3. 프로젝트별 MCP 서버 설정

```bash
# 템플릿 파일을 실제 설정 파일로 복사
cp .mcp.json.template .mcp.json

# 또는 수동으로 .mcp.json 생성
# (내용은 .mcp.json.template 참고)
```

**중요**: `.mcp.json`의 `filesystem` 경로는 자동으로 현재 디렉토리(`.`)로 설정되어 있어 수정 불필요합니다.

## 4. 전역 MCP 서버 설정 (선택사항)

프로젝트에 필수는 아니지만, 유용한 전역 MCP 서버들:

### Context7 (문서 검색)
```bash
claude mcp add context7 --command "npx -y @upstash/context7-mcp"
```

### Chrome DevTools (브라우저 자동화)
```bash
claude mcp add chrome-devtools --command "npx -y chrome-devtools-mcp@latest"
```

### Stripe (결제 시스템 - 필요시)
```bash
# Stripe 대시보드에서 API 키 발급 후
claude mcp add stripe --url "https://mcp.stripe.com/"
```

## 5. 설정 확인

```bash
# MCP 서버 연결 상태 확인
claude mcp list

# 프로젝트 디렉토리에서 Claude Code 실행
claude
```

## 6. Supabase 연결 확인

`config.js` 파일에 이미 Supabase URL과 공개 anon key가 포함되어 있습니다.
`.mcp.json`에는 Postgres 연결 문자열도 포함되어 있어 데이터베이스 직접 접근 가능합니다.

## 트러블슈팅

### MCP 서버 연결 실패 시
```bash
# 특정 서버 제거 후 재추가
claude mcp remove postgres
claude mcp add postgres --command "npx -y @modelcontextprotocol/server-postgres"
```

### Postgres 연결 오류 시
- Supabase 대시보드에서 연결 문자열 확인
- `.mcp.json`의 `POSTGRES_CONNECTION_STRING` 업데이트

## 파일 구조

```
week1-public/
├── .mcp.json               ← 이 파일은 .gitignore에 의해 제외됨
├── .mcp.json.template      ← GitHub에 커밋된 템플릿
├── config.js               ← Supabase 공개 설정
├── index.html
├── main.js
├── data.js
└── ...
```

## 참고

- `.mcp.json`은 비밀 정보(DB 연결 문자열)를 포함하므로 GitHub에 커밋하지 마세요
- `.mcp.json.template`은 안전한 템플릿이므로 GitHub에 커밋되어 있습니다
