#!/bin/bash
# ========================================
# 배포 전 프리뷰 스크립트
# 사용법: /preview
# ========================================

set -e

echo "👀 배포 전 프리뷰 체크리스트"
echo "================================"
echo ""

CHECKS_PASSED=0
CHECKS_TOTAL=7

# 1. Git 상태
echo "📋 1/7: Git 상태 확인"
echo "----------------"
if [ -z "$(git status --porcelain)" ]; then
  echo "  ✅ 작업 디렉토리 깨끗함"
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
  echo "  ⚠️  커밋되지 않은 변경사항 있음"
  git status --short
fi

echo ""

# 2. JavaScript 구문
echo "🔍 2/7: JavaScript 구문 검사"
echo "----------------"
HAS_JS_ERROR=false
for jsfile in *.js; do
  if [ -f "$jsfile" ]; then
    if node --check "$jsfile" 2>/dev/null; then
      echo "  ✅ $jsfile"
    else
      echo "  ❌ $jsfile - 구문 오류"
      HAS_JS_ERROR=true
    fi
  fi
done

if [ "$HAS_JS_ERROR" = false ]; then
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

echo ""

# 3. 필수 파일
echo "📂 3/7: 필수 파일 존재"
echo "----------------"
REQUIRED_FILES=("index.html" "config.js" "auth.js" "main.js" "data.js" "comments.js" "style.css")
ALL_PRESENT=true

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (없음)"
    ALL_PRESENT=false
  fi
done

if [ "$ALL_PRESENT" = true ]; then
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

echo ""

# 4. 데이터 품질
echo "📊 4/7: 맛집 데이터 품질"
echo "----------------"

EMPTY_MENU=$(grep -c 'mainMenu: ""' data.js 2>/dev/null || echo "0")
MISSING_COORDS=$(grep -c 'lat: 0' data.js 2>/dev/null || echo "0")

DATA_QUALITY=true

if [ "$EMPTY_MENU" -gt 0 ]; then
  echo "  ⚠️  빈 대표 메뉴: $EMPTY_MENU 개"
  DATA_QUALITY=false
else
  echo "  ✅ 모든 식당에 대표 메뉴 있음"
fi

if [ "$MISSING_COORDS" -gt 0 ]; then
  echo "  ⚠️  좌표 누락: $MISSING_COORDS 개"
  DATA_QUALITY=false
else
  echo "  ✅ 모든 식당에 좌표 있음"
fi

if [ "$DATA_QUALITY" = true ]; then
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

echo ""

# 5. 보안 체크
echo "🔒 5/7: 보안 체크"
echo "----------------"

SECURITY_OK=true

if grep -rn "service_role" --include="*.js" . 2>/dev/null; then
  echo "  ❌ Service Role Key 노출 위험"
  SECURITY_OK=false
else
  echo "  ✅ Service Role Key 노출 없음"
fi

if grep -rn "eval(" --include="*.js" . 2>/dev/null; then
  echo "  ❌ eval() 사용 발견"
  SECURITY_OK=false
else
  echo "  ✅ eval() 없음"
fi

if [ "$SECURITY_OK" = true ]; then
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

echo ""

# 6. Console.log 확인
echo "🐛 6/7: 프로덕션 준비"
echo "----------------"

CONSOLE_COUNT=$(grep -rn "console.log" --include="*.js" . 2>/dev/null | wc -l)
if [ "$CONSOLE_COUNT" -gt 0 ]; then
  echo "  ⚠️  console.log: $CONSOLE_COUNT 개 (제거 권장)"
else
  echo "  ✅ console.log 없음"
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi

echo ""

# 7. Supabase 연결 확인
echo "🔗 7/7: Supabase 설정"
echo "----------------"

if grep -q "SUPABASE_CONFIG" config.js; then
  echo "  ✅ Supabase 설정 파일 존재"
  CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
  echo "  ❌ Supabase 설정 없음"
fi

echo ""
echo "================================"
echo ""

# 결과 요약
PERCENTAGE=$((CHECKS_PASSED * 100 / CHECKS_TOTAL))

echo "📊 프리뷰 결과: $CHECKS_PASSED / $CHECKS_TOTAL 통과 ($PERCENTAGE%)"
echo ""

if [ "$CHECKS_PASSED" -eq "$CHECKS_TOTAL" ]; then
  echo "🎉 모든 체크 통과! 배포 준비 완료"
  echo ""
  echo "다음 명령어로 배포하세요:"
  echo "  /deploy"
  exit 0
elif [ "$CHECKS_PASSED" -ge 5 ]; then
  echo "✅ 대부분 준비됨. 경고 사항 확인 후 배포 가능"
  echo ""
  echo "배포하려면:"
  echo "  /deploy"
  exit 0
else
  echo "⚠️  치명적인 문제가 있습니다. 배포 전 수정 필요"
  exit 1
fi
