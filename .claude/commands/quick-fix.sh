#!/bin/bash
# ========================================
# 빠른 버그 수정 + 배포 스크립트
# 사용법: /quick-fix "수정 내용"
# ========================================

set -e

if [ -z "$1" ]; then
  echo "❌ 오류: 수정 내용 설명이 필요합니다."
  echo ""
  echo "사용법: /quick-fix \"수정 내용\""
  echo "예시: /quick-fix \"Fix login button alignment\""
  exit 1
fi

FIX_DESCRIPTION="$1"

echo "🔧 빠른 수정 모드"
echo "================================"
echo ""
echo "수정 내용: $FIX_DESCRIPTION"
echo ""

# 1. Git 상태 확인
echo "📋 1/5: 변경사항 확인..."
if [ -z "$(git status --porcelain)" ]; then
  echo "❌ 변경사항이 없습니다."
  exit 1
fi

git status --short
echo ""

# 2. 간단한 테스트 (JavaScript 구문만)
echo "🧪 2/5: JavaScript 구문 검사..."
HAS_ERROR=false
for jsfile in *.js; do
  if [ -f "$jsfile" ]; then
    if ! node --check "$jsfile" 2>/dev/null; then
      echo "❌ $jsfile - 구문 오류"
      HAS_ERROR=true
    fi
  fi
done

if [ "$HAS_ERROR" = true ]; then
  echo ""
  echo "❌ JavaScript 구문 오류가 있습니다. 수정 후 다시 시도하세요."
  exit 1
fi

echo "✅ 구문 검사 통과"
echo ""

# 3. 스테이징 및 커밋
echo "💬 3/5: 커밋 생성..."
git add -A
git commit -m "fix: $FIX_DESCRIPTION

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo ""

# 4. 푸시
echo "🚀 4/5: 배포 중..."
git push origin main

echo ""

# 5. 배포 상태 안내
echo "⏳ 5/5: 배포 대기 중..."
echo ""
echo "✅ 변경사항이 푸시되었습니다!"
echo ""
echo "📊 배포 상태 확인:"
echo "   https://dash.cloudflare.com/pages"
echo ""
echo "🌐 배포 완료 예상 시간: 1-2분"
echo "   https://kpopeats.cc"
echo ""
echo "💡 배포 완료 후 브라우저에서 Ctrl+F5 (강제 새로고침)"
echo ""
