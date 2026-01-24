#!/bin/bash
# ========================================
# 자동 커밋 및 푸시 스크립트
# 사용법: /commit-push [타입] "커밋 메시지"
# ========================================

set -e

# 인자 파싱
if [ -z "$1" ]; then
  echo "❌ 오류: 커밋 메시지가 필요합니다."
  echo ""
  echo "사용법:"
  echo "  /commit-push \"커밋 메시지\"              # 자동 타입 감지"
  echo "  /commit-push feat \"새 기능 추가\"        # 타입 지정"
  echo "  /commit-push fix \"버그 수정\"            # 타입 지정"
  echo ""
  echo "커밋 타입: feat, fix, chore, docs, style, refactor"
  exit 1
fi

# 타입이 지정되었는지 확인
VALID_TYPES=("feat" "fix" "chore" "docs" "style" "refactor" "test" "perf")
if [[ " ${VALID_TYPES[@]} " =~ " $1 " ]]; then
  COMMIT_TYPE="$1"
  COMMIT_MSG="$2"

  if [ -z "$COMMIT_MSG" ]; then
    echo "❌ 오류: 커밋 메시지가 필요합니다."
    exit 1
  fi
else
  # 타입 자동 감지 (메시지 첫 단어가 타입이면 그대로, 아니면 feat으로)
  COMMIT_TYPE="feat"
  COMMIT_MSG="$1"
fi

FULL_COMMIT_MSG="$COMMIT_TYPE: $COMMIT_MSG"

echo "🔍 Git 상태 확인 중..."
git status

echo ""
echo "📦 변경사항 스테이징 중..."
git add -A

echo ""
echo "💬 커밋 생성 중..."
echo "   메시지: $FULL_COMMIT_MSG"
git commit -m "$FULL_COMMIT_MSG

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo ""
echo "🚀 원격 저장소에 푸시 중..."
git push origin main

echo ""
echo "✅ 완료! 변경사항이 성공적으로 푸시되었습니다."
echo "🌐 배포 확인: https://kpopeats.cc (1-2분 소요)"
