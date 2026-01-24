#!/bin/bash
# ========================================
# 보안 스캔 스크립트
# 사용법: /security-scan
# ========================================

set -e

echo "🔒 보안 스캔 시작..."
echo "================================"
echo ""

VULNERABILITIES=0
WARNINGS=0

# 1. 민감 정보 노출 확인
echo "🔑 1/6: 민감 정보 노출 확인"
echo "----------------"

# API Keys, Secrets 패턴
PATTERNS=(
  "service_role"
  "secret_key"
  "private_key"
  "api_key"
  "password.*=.*['\"]"
  "token.*=.*['\"]"
)

for pattern in "${PATTERNS[@]}"; do
  MATCHES=$(grep -rni "$pattern" --include="*.js" --include="*.html" . 2>/dev/null | grep -v "node_modules" | wc -l || echo "0")

  if [ "$MATCHES" -gt 0 ]; then
    echo "  ❌ '$pattern' 패턴 발견: $MATCHES 개"
    grep -rni "$pattern" --include="*.js" --include="*.html" . 2>/dev/null | grep -v "node_modules" | head -3
    VULNERABILITIES=$((VULNERABILITIES + 1))
    echo ""
  fi
done

# 하드코딩된 URL 확인
HARDCODED_URLS=$(grep -rn 'http://' --include="*.js" . 2>/dev/null | grep -v "localhost" | wc -l || echo "0")

if [ "$HARDCODED_URLS" -gt 0 ]; then
  echo "  ⚠️  HTTP URL (비암호화): $HARDCODED_URLS 개"
  echo "     → HTTPS 사용 권장"
  WARNINGS=$((WARNINGS + 1))
else
  echo "  ✅ HTTP URL 없음 (HTTPS 사용 중)"
fi

# .env 파일 확인
if [ -f ".env" ]; then
  echo "  ⚠️  .env 파일 발견"
  echo "     → .gitignore에 추가되었는지 확인 필요"
  WARNINGS=$((WARNINGS + 1))
fi

if [ $VULNERABILITIES -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo "  ✅ 민감 정보 노출 없음"
fi

echo ""

# 2. XSS 취약점 확인
echo "⚠️  2/6: XSS (Cross-Site Scripting) 취약점"
echo "----------------"

# innerHTML 사용
INNER_HTML_COUNT=$(grep -rn "innerHTML" --include="*.js" . 2>/dev/null | wc -l || echo "0")

if [ "$INNER_HTML_COUNT" -gt 0 ]; then
  echo "  ⚠️  innerHTML 사용: $INNER_HTML_COUNT 개"
  echo "     → 사용자 입력 sanitize 필수"
  grep -rn "innerHTML" --include="*.js" . 2>/dev/null | head -3
  WARNINGS=$((WARNINGS + 1))
  echo ""
else
  echo "  ✅ innerHTML 사용 없음"
fi

# eval() 사용
EVAL_COUNT=$(grep -rn "eval(" --include="*.js" . 2>/dev/null | wc -l || echo "0")

if [ "$EVAL_COUNT" -gt 0 ]; then
  echo "  ❌ eval() 사용 발견: $EVAL_COUNT 개"
  echo "     → 즉시 제거 필요 (심각한 보안 위험)"
  VULNERABILITIES=$((VULNERABILITIES + 1))
else
  echo "  ✅ eval() 없음"
fi

# document.write 사용
DOC_WRITE=$(grep -rn "document.write" --include="*.js" . 2>/dev/null | wc -l || echo "0")

if [ "$DOC_WRITE" -gt 0 ]; then
  echo "  ⚠️  document.write 사용: $DOC_WRITE 개"
  echo "     → XSS 위험, 대안 사용 권장"
  WARNINGS=$((WARNINGS + 1))
fi

echo ""

# 3. 인증/인가 보안
echo "🔐 3/6: 인증/인가 보안"
echo "----------------"

if [ -f "auth.js" ]; then
  # 클라이언트 사이드 인증 체크
  if grep -q "isAuthenticated" auth.js; then
    echo "  ✅ 인증 상태 체크 함수 존재"
  else
    echo "  ⚠️  인증 상태 체크 함수 없음"
  fi

  # localStorage/sessionStorage 사용
  if grep -q "localStorage\|sessionStorage" auth.js; then
    echo "  💡 localStorage/sessionStorage 사용 중"
    echo "     → 민감한 토큰은 httpOnly 쿠키 권장"
  fi

  # 비밀번호 검증
  if grep -q "password" auth.js; then
    if grep -q "length.*[0-9]" auth.js; then
      echo "  ✅ 비밀번호 길이 검증 있음"
    else
      echo "  ⚠️  비밀번호 강도 검증 추가 권장"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
else
  echo "  ℹ️  auth.js 파일 없음"
fi

echo ""

# 4. SQL Injection (Supabase 사용이지만 체크)
echo "💉 4/6: Injection 공격 확인"
echo "----------------"

# 동적 쿼리 생성 패턴
DYNAMIC_QUERY=$(grep -rn "query.*+" --include="*.js" . 2>/dev/null | grep -c "WHERE\|SELECT\|INSERT" || echo "0")

if [ "$DYNAMIC_QUERY" -gt 0 ]; then
  echo "  ⚠️  동적 쿼리 생성 패턴: $DYNAMIC_QUERY 개"
  echo "     → Prepared Statements 사용 권장"
  WARNINGS=$((WARNINGS + 1))
else
  echo "  ✅ 동적 쿼리 생성 없음"
fi

# 사용자 입력 처리
if grep -rq "prompt(\|confirm(" --include="*.js" .; then
  echo "  💡 사용자 입력(prompt) 사용 중"
  echo "     → 입력 검증 필수"
fi

echo ""

# 5. CORS 및 보안 헤더
echo "🛡️  5/6: 보안 헤더 및 CORS"
echo "----------------"

if [ -f "_headers" ] || [ -f "headers.json" ]; then
  echo "  ✅ 보안 헤더 설정 파일 존재"

  # CSP 확인
  if grep -q "Content-Security-Policy" _headers 2>/dev/null || grep -q "Content-Security-Policy" headers.json 2>/dev/null; then
    echo "  ✅ Content-Security-Policy 설정됨"
  else
    echo "  ⚠️  CSP 헤더 없음"
    echo "     → XSS 방어를 위해 CSP 추가 권장"
    WARNINGS=$((WARNINGS + 1))
  fi
else
  echo "  ⚠️  보안 헤더 설정 파일 없음"
  echo "     → _headers 파일 생성 권장"
  WARNINGS=$((WARNINGS + 1))
fi

# HTTPS 리다이렉트
if grep -q "location.protocol.*http:" index.html 2>/dev/null; then
  echo "  ✅ HTTPS 리다이렉트 코드 존재"
else
  echo "  💡 HTTPS 강제 리다이렉트 추가 권장"
fi

echo ""

# 6. 의존성 보안
echo "📦 6/6: 의존성 보안"
echo "----------------"

if [ -f "package.json" ]; then
  echo "  📄 package.json 발견"

  if command -v npm &> /dev/null; then
    echo "  🔍 npm audit 실행 중..."
    npm audit --production 2>/dev/null || echo "  ⚠️  npm audit 실행 실패"
  else
    echo "  ⚠️  npm이 설치되지 않음 (의존성 스캔 불가)"
  fi
else
  echo "  ✅ package.json 없음 (정적 사이트)"
fi

# CDN 스크립트 무결성 체크
if grep -q "<script.*src=\"http" index.html; then
  EXTERNAL_SCRIPTS=$(grep -c "<script.*src=\"http" index.html 2>/dev/null || echo "0")
  SCRIPTS_WITH_INTEGRITY=$(grep -c "integrity=" index.html 2>/dev/null || echo "0")

  echo "  📊 외부 스크립트: $EXTERNAL_SCRIPTS 개"
  echo "  📊 무결성 검증(SRI): $SCRIPTS_WITH_INTEGRITY 개"

  if [ "$SCRIPTS_WITH_INTEGRITY" -lt "$EXTERNAL_SCRIPTS" ]; then
    MISSING=$((EXTERNAL_SCRIPTS - SCRIPTS_WITH_INTEGRITY))
    echo "  ⚠️  SRI 속성 없는 스크립트: $MISSING 개"
    echo "     → integrity/crossorigin 속성 추가 권장"
    WARNINGS=$((WARNINGS + 1))
  fi
fi

echo ""
echo "================================"
echo ""

# 결과 요약
echo "📊 보안 스캔 결과"
echo "----------------"
echo "  🔴 심각한 취약점: $VULNERABILITIES 개"
echo "  🟡 경고: $WARNINGS 개"
echo ""

if [ $VULNERABILITIES -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo "🎉 우수! 심각한 보안 문제가 없습니다."
elif [ $VULNERABILITIES -eq 0 ] && [ $WARNINGS -le 3 ]; then
  echo "✅ 양호. 일부 경고 사항을 확인하세요."
elif [ $VULNERABILITIES -eq 0 ]; then
  echo "⚠️  경고가 많습니다. 보안 개선을 권장합니다."
else
  echo "❌ 즉시 수정 필요! 심각한 취약점이 발견되었습니다."
fi

echo ""
echo "🔧 보안 개선 권장 사항:"
echo ""

if [ $VULNERABILITIES -gt 0 ]; then
  echo "  🔴 즉시 수정 필요:"
  if grep -rq "eval(" --include="*.js" .; then
    echo "    1. eval() 사용 제거"
  fi
  if grep -rq "service_role" --include="*.js" .; then
    echo "    2. Service Role Key 노출 제거"
  fi
  echo ""
fi

if [ $WARNINGS -gt 0 ]; then
  echo "  🟡 개선 권장:"

  if ! grep -q "Content-Security-Policy" _headers 2>/dev/null; then
    echo "    1. Content-Security-Policy 헤더 추가"
  fi

  if [ "$INNER_HTML_COUNT" -gt 0 ]; then
    echo "    2. innerHTML 사용 시 입력 sanitize"
  fi

  if [ "$SCRIPTS_WITH_INTEGRITY" -lt "$EXTERNAL_SCRIPTS" ]; then
    echo "    3. 외부 스크립트에 SRI 속성 추가"
  fi
fi

echo ""
echo "📖 보안 체크리스트:"
echo "  ✅ HTTPS 사용"
echo "  ✅ 민감 정보 환경변수 처리"
echo "  ✅ 사용자 입력 검증"
echo "  ✅ XSS 방어 (CSP, sanitize)"
echo "  ✅ 인증 토큰 안전하게 저장"
echo "  ✅ CORS 적절히 설정"
echo "  ✅ 외부 스크립트 무결성 검증"
echo ""

echo "🔗 보안 도구:"
echo "  - OWASP ZAP: https://www.zaproxy.org/"
echo "  - Snyk: https://snyk.io/"
echo "  - npm audit: npm audit --production"
echo "  - SSL Labs: https://www.ssllabs.com/ssltest/"
echo ""

echo "💡 Supabase 보안 가이드:"
echo "  - RLS (Row Level Security) 활성화 확인"
echo "  - Anon key만 클라이언트 노출"
echo "  - Service Role Key는 서버 사이드만 사용"
echo ""
