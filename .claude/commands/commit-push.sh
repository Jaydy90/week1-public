#!/bin/bash
# ========================================
# 자동 커밋 및 푸시 스크립트
# 사용법: /commit-push "커밋 메시지"
# ========================================

set -e

# 커밋 메시지 확인
if [ -z "$1" ]; then
  echo "❌ 오류: 커밋 메시지가 필요합니다."
  echo "사용법: /commit-push \"커밋 메시지\""
  exit 1
fi

COMMIT_MSG="$1"

echo "🔍 Git 상태 확인 중..."
git status

echo ""
echo "📦 변경사항 스테이징 중..."
git add -A

echo ""
echo "💬 커밋 생성 중..."
git commit -m "$COMMIT_MSG

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo ""
echo "🚀 원격 저장소에 푸시 중..."
git push origin main

echo ""
echo "✅ 완료! 변경사항이 성공적으로 푸시되었습니다."
