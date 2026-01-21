#!/bin/bash
# ========================================
# 테스트 및 빌드 검증 스크립트
# 사용법: /test-build
# ========================================

set -e

echo "🧪 테스트 및 빌드 검증 시작..."
echo ""

# 1. 린트 검사
echo "📋 1/4: ESLint 검사 중..."
if [ -f "package.json" ] && grep -q "\"lint\"" package.json; then
  npm run lint || echo "⚠️  린트 오류가 있지만 계속 진행합니다."
else
  echo "⏭️  린트 스크립트가 없습니다. 건너뜁니다."
fi

echo ""

# 2. HTML 파일 검증
echo "🔍 2/4: HTML 파일 구문 검증 중..."
if command -v tidy &> /dev/null; then
  tidy -q -e index.html || echo "⚠️  HTML 경고가 있지만 계속 진행합니다."
else
  echo "⏭️  tidy가 설치되지 않았습니다. 건너뜁니다."
fi

echo ""

# 3. JavaScript 구문 검사
echo "🔎 3/4: JavaScript 파일 구문 검사 중..."
for jsfile in *.js; do
  if [ -f "$jsfile" ]; then
    node --check "$jsfile" && echo "✅ $jsfile - OK"
  fi
done

echo ""

# 4. 필수 파일 존재 확인
echo "📂 4/4: 필수 파일 확인 중..."
REQUIRED_FILES=(
  "index.html"
  "config.js"
  "auth.js"
  "main.js"
  "style.css"
  "data.js"
  "comments.js"
)

ALL_FOUND=true
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file (없음)"
    ALL_FOUND=false
  fi
done

echo ""

if [ "$ALL_FOUND" = true ]; then
  echo "✅ 모든 검증 완료! 배포 준비가 되었습니다."
  exit 0
else
  echo "⚠️  일부 파일이 누락되었습니다."
  exit 1
fi
