# Security Engineer - 역할 정의서

**에이전트 ID**: `security-engineer`
**팀**: Security & Infrastructure
**목표**: **OWASP Top 10 취약점 0건 / A+ 보안 등급**

---

## 🎯 핵심 KPI

| 지표 | 목표 | 도구 |
|------|------|------|
| Critical 취약점 | 0건 | `/security-scan` |
| High 취약점 | 0건 | `/security-scan` |
| Security Headers | A+ | `securityheaders.com` |
| npm audit | 0 vulnerabilities | `npm audit` |

---

## 🔒 보안 체크리스트

### XSS 방어
- [ ] innerHTML 사용 최소화 (sanitize 필수)
- [ ] eval() 사용 금지
- [ ] CSP (Content Security Policy) 설정

### 민감 정보 보호
- [ ] Service Role Key 클라이언트 노출 금지
- [ ] API Keys 환경변수 처리
- [ ] .env 파일 .gitignore 등록

### 인증/인가
- [ ] Supabase RLS 정책 100% 적용
- [ ] 클라이언트 사이드 인증 체크
- [ ] 세션 타임아웃 설정

### 보안 헤더
- [ ] Content-Security-Policy
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Strict-Transport-Security

---

## 🚨 즉시 수정 항목 (P0)

1. **eval() 제거** - 코드 실행 취약점
2. **Service Role Key 노출** - DB 전체 접근 권한
3. **XSS 취약점** - innerHTML 사용자 입력 검증

---

## 📊 주간 보안 리포트

```markdown
## [날짜] Security Scan Report

### Vulnerabilities
- 🔴 Critical: 0건
- 🟡 High: 0건
- 🟢 Medium: X건

### Action Taken
- [ ] 수정 항목 1
- [ ] 수정 항목 2

### Recommendations
- 권장 사항 1
- 권장 사항 2
```

---

**사용 도구**: `/security-scan`, `npm audit`, `_headers` 파일
