#!/bin/bash
# ========================================
# 코드 품질 분석 스크립트
# 사용법: /analyze
# ========================================

set -e

echo "🔍 코드 품질 분석 시작..."
echo "================================"
echo ""

# 1. 파일 크기 분석
echo "📊 1/6: 파일 크기 분석"
echo "----------------"
echo ""

JS_FILES=$(find . -maxdepth 1 -name "*.js" -type f)
for file in $JS_FILES; do
  size=$(wc -c < "$file" | tr -d ' ')
  lines=$(wc -l < "$file" | tr -d ' ')
  printf "  %-20s %8s bytes, %5s lines\n" "$file" "$size" "$lines"
done

HTML_SIZE=$(wc -c < "index.html" | tr -d ' ')
CSS_SIZE=$(wc -c < "style.css" | tr -d ' ')
printf "  %-20s %8s bytes\n" "index.html" "$HTML_SIZE"
printf "  %-20s %8s bytes\n" "style.css" "$CSS_SIZE"

echo ""

# 2. TODO/FIXME 태그 검색
echo "📝 2/6: TODO/FIXME 태그 검색"
echo "----------------"
TODO_COUNT=$(grep -rnw . --include="*.js" --include="*.html" --include="*.css" -e "TODO" -e "FIXME" 2>/dev/null | wc -l)
if [ "$TODO_COUNT" -gt 0 ]; then
  echo "  발견됨: $TODO_COUNT 개"
  grep -rnw . --include="*.js" --include="*.html" --include="*.css" -e "TODO" -e "FIXME" 2>/dev/null | head -10
else
  echo "  ✅ TODO/FIXME 없음"
fi

echo ""

# 3. console.log 검색
echo "🐛 3/6: console.log 검색"
echo "----------------"
CONSOLE_COUNT=$(grep -rnw . --include="*.js" -e "console.log" 2>/dev/null | wc -l)
if [ "$CONSOLE_COUNT" -gt 0 ]; then
  echo "  ⚠️  발견됨: $CONSOLE_COUNT 개"
  echo "  프로덕션 배포 전에 제거를 고려하세요"
else
  echo "  ✅ console.log 없음"
fi

echo ""

# 4. 중복 코드 패턴 검색
echo "🔄 4/6: 중복 이벤트 리스너 패턴"
echo "----------------"
DUPLICATE_LISTENERS=$(grep -rn "addEventListener" --include="*.js" . 2>/dev/null | wc -l)
echo "  addEventListener 호출: $DUPLICATE_LISTENERS 개"
echo "  💡 버튼 클론 패턴을 사용하고 있는지 확인하세요"

echo ""

# 5. 보안 패턴 검사
echo "🔒 5/6: 보안 패턴 검사"
echo "----------------"

# innerHTML 사용
INNER_HTML=$(grep -rn "innerHTML" --include="*.js" . 2>/dev/null | wc -l)
if [ "$INNER_HTML" -gt 0 ]; then
  echo "  ⚠️  innerHTML 사용: $INNER_HTML 개 (XSS 주의)"
else
  echo "  ✅ innerHTML 사용 없음"
fi

# eval 사용
EVAL_COUNT=$(grep -rn "eval(" --include="*.js" . 2>/dev/null | wc -l)
if [ "$EVAL_COUNT" -gt 0 ]; then
  echo "  ❌ eval() 발견: $EVAL_COUNT 개 (보안 위험)"
else
  echo "  ✅ eval() 없음"
fi

# Service Role Key 노출 확인
if grep -rn "service_role" --include="*.js" --include="*.md" . 2>/dev/null; then
  echo "  ❌ Service Role Key 노출 가능성 (즉시 확인 필요)"
else
  echo "  ✅ Service Role Key 노출 없음"
fi

echo ""

# 6. 데이터 품질 검사
echo "📋 6/6: 데이터 품질 검사"
echo "----------------"

# mainMenu 필드 검증
if grep -q "mainMenu: \"\"" data.js || grep -q 'mainMenu: ""' data.js; then
  echo "  ⚠️  빈 mainMenu 필드 발견 (업데이트 필요)"
else
  echo "  ✅ 모든 식당에 mainMenu 있음"
fi

# lat, lng 필드 검증
MISSING_COORDS=$(grep -c "lat: 0" data.js 2>/dev/null || echo "0")
if [ "$MISSING_COORDS" -gt 0 ]; then
  echo "  ⚠️  좌표 누락: $MISSING_COORDS 개 식당"
else
  echo "  ✅ 모든 식당에 좌표 있음"
fi

echo ""
echo "================================"
echo "✅ 분석 완료!"
echo ""
echo "💡 권장 사항:"
echo "   1. 프로덕션 배포 전 console.log 제거"
echo "   2. innerHTML 사용 시 XSS 방지 처리"
echo "   3. TODO/FIXME 태그 확인 및 처리"
echo "   4. 빈 mainMenu 필드 업데이트"
echo ""
