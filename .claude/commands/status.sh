#!/bin/bash
# ========================================
# 프로젝트 전체 상태 확인 스크립트
# 사용법: /status
# ========================================

set -e

echo "📊 Trust Route 프로젝트 상태"
echo "================================"
echo ""

# 1. Git 상태
echo "🔀 1/5: Git 상태"
echo "----------------"
CURRENT_BRANCH=$(git branch --show-current)
LAST_COMMIT=$(git log -1 --oneline)
UNCOMMITTED=$(git status --porcelain | wc -l)

echo "  브랜치: $CURRENT_BRANCH"
echo "  최근 커밋: $LAST_COMMIT"
if [ "$UNCOMMITTED" -gt 0 ]; then
  echo "  ⚠️  커밋되지 않은 변경: $UNCOMMITTED 개 파일"
else
  echo "  ✅ 작업 디렉토리 깨끗함"
fi

echo ""

# 2. 파일 상태
echo "📁 2/5: 핵심 파일 상태"
echo "----------------"
CORE_FILES=(
  "index.html"
  "config.js"
  "auth.js"
  "main.js"
  "data.js"
  "comments.js"
  "style.css"
  "schema.sql"
  "CLAUDE.md"
)

for file in "${CORE_FILES[@]}"; do
  if [ -f "$file" ]; then
    MODIFIED=$(git log -1 --format="%cd" --date=short -- "$file" 2>/dev/null || echo "N/A")
    printf "  ✅ %-20s (수정: %s)\n" "$file" "$MODIFIED"
  else
    printf "  ❌ %-20s (없음)\n" "$file"
  fi
done

echo ""

# 3. 맛집 데이터 통계
echo "🍽️  3/5: 맛집 데이터 통계"
echo "----------------"

if [ -f "data.js" ]; then
  NEARBY_COUNT=$(grep -c "id: \"rest-" data.js 2>/dev/null || echo "0")
  NEARBY_COUNT=$(echo "$NEARBY_COUNT" | tr -d '\n\r' | head -1)

  MICHELIN_COUNT=$(grep -c 'group: "michelin"' data.js 2>/dev/null || echo "0")
  MICHELIN_COUNT=$(echo "$MICHELIN_COUNT" | tr -d '\n\r' | head -1)

  CELEBRITY_COUNT=$(grep -c 'group: "celebrity"' data.js 2>/dev/null || echo "0")
  CELEBRITY_COUNT=$(echo "$CELEBRITY_COUNT" | tr -d '\n\r' | head -1)

  CHEF_COUNT=$(grep -c 'group: "chef"' data.js 2>/dev/null || echo "0")
  CHEF_COUNT=$(echo "$CHEF_COUNT" | tr -d '\n\r' | head -1)

  echo "  총 맛집: $NEARBY_COUNT 개"
  echo "  - 미쉐린: $MICHELIN_COUNT 개"
  echo "  - 유명인: $CELEBRITY_COUNT 개"
  echo "  - 흑백요리사: $CHEF_COUNT 개"

  # 빈 mainMenu 확인
  EMPTY_MENU=$(grep -c 'mainMenu: ""' data.js 2>/dev/null || echo "0")
  EMPTY_MENU=$(echo "$EMPTY_MENU" | tr -d '\n\r' | head -1)

  if [ "$EMPTY_MENU" -gt 0 ] 2>/dev/null; then
    echo "  ⚠️  빈 대표 메뉴: $EMPTY_MENU 개 (업데이트 필요)"
  fi
else
  echo "  ❌ data.js 파일 없음"
fi

echo ""

# 4. 배포 환경
echo "🌐 4/5: 배포 환경"
echo "----------------"
echo "  프로덕션: https://kpopeats.cc"
echo "  개발: https://week1-public.pages.dev"
echo "  대시보드: https://dash.cloudflare.com/pages"
echo ""
echo "  Supabase: https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd"

echo ""

# 5. 커맨드 도구
echo "🛠️  5/5: 사용 가능한 커맨드"
echo "----------------"

if [ -d ".claude/commands" ]; then
  COMMAND_COUNT=$(ls -1 .claude/commands/*.sh 2>/dev/null | wc -l)
  echo "  총 $COMMAND_COUNT 개 커맨드 사용 가능:"
  echo ""

  for cmd in .claude/commands/*.sh; do
    if [ -f "$cmd" ]; then
      CMD_NAME=$(basename "$cmd" .sh)
      # 사용법 주석에서 설명 추출 (첫 번째 "사용법:" 라인)
      DESCRIPTION=$(grep "사용법:" "$cmd" 2>/dev/null | head -1 | sed 's/.*사용법: *//' || echo "")
      if [ -z "$DESCRIPTION" ]; then
        DESCRIPTION="설명 없음"
      fi
      printf "    %-20s %s\n" "/$CMD_NAME" "$DESCRIPTION"
    fi
  done
else
  echo "  ❌ 커맨드 디렉토리 없음"
fi

echo ""
echo "================================"
echo "✅ 상태 확인 완료!"
echo ""
