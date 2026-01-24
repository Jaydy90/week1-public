#!/bin/bash
# ========================================
# 대표 메뉴 업데이트 가이드 스크립트
# 사용법: /update-menu [식당명]
# ========================================

set -e

echo "📋 대표 메뉴 업데이트 가이드"
echo "================================"
echo ""

if [ -z "$1" ]; then
  echo "사용법: /update-menu \"식당명\""
  echo ""
  echo "예시: /update-menu \"밍글스\""
  echo ""
  exit 1
fi

RESTAURANT_NAME="$1"

echo "🔍 업데이트할 식당: $RESTAURANT_NAME"
echo ""

# data.js에서 식당 찾기
if grep -q "name: \"$RESTAURANT_NAME\"" data.js; then
  echo "✅ data.js에서 식당을 찾았습니다."
  echo ""

  # 현재 mainMenu 표시
  CURRENT_MENU=$(grep -A 3 "name: \"$RESTAURANT_NAME\"" data.js | grep "mainMenu:" | sed 's/.*mainMenu: "\(.*\)".*/\1/')
  echo "📌 현재 대표 메뉴: $CURRENT_MENU"
  echo ""
else
  echo "❌ data.js에서 '$RESTAURANT_NAME'을 찾을 수 없습니다."
  echo ""
  echo "💡 팁: 식당 이름을 정확히 입력하세요 (따옴표 포함)"
  exit 1
fi

echo "📖 대표 메뉴 조사 가이드"
echo "========================"
echo ""
echo "1️⃣  네이버 플레이스 방문"
echo "   🔗 https://map.naver.com/v5/search/$RESTAURANT_NAME"
echo ""
echo "2️⃣  리뷰 분석"
echo "   - '방문자 리뷰' 탭 확인"
echo "   - '블로그 리뷰' 확인"
echo "   - 사진 리뷰에서 가장 많이 나오는 메뉴 확인"
echo "   - 높은 평점/좋아요를 받은 메뉴 찾기"
echo ""
echo "3️⃣  메뉴 업데이트"
echo "   - 가장 자주 언급된 1-2가지 메뉴 선택"
echo "   - 한글 메뉴명 사용 (예: '멸치 국수', '전복')"
echo "   - 일반 명사 피하기 (예: '코스 요리' ❌)"
echo ""
echo "4️⃣  data.js 편집"
echo "   - 해당 식당의 mainMenu 필드 업데이트"
echo "   - 예: mainMenu: \"새로운 대표 메뉴\""
echo ""

read -p "새로운 대표 메뉴를 입력하세요: " newMenu

if [ -z "$newMenu" ]; then
  echo "❌ 메뉴가 입력되지 않았습니다."
  exit 1
fi

echo ""
echo "✅ 업데이트할 내용:"
echo "   식당: $RESTAURANT_NAME"
echo "   이전: $CURRENT_MENU"
echo "   이후: $newMenu"
echo ""

read -p "data.js를 자동으로 업데이트하시겠습니까? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  # sed를 사용한 자동 업데이트 (macOS/Linux 호환)
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "/name: \"$RESTAURANT_NAME\"/,/mainMenu:/ s/mainMenu: \".*\"/mainMenu: \"$newMenu\"/" data.js
  else
    # Linux/Windows Git Bash
    sed -i "/name: \"$RESTAURANT_NAME\"/,/mainMenu:/ s/mainMenu: \".*\"/mainMenu: \"$newMenu\"/" data.js
  fi

  echo "✅ data.js가 업데이트되었습니다!"
  echo ""
  echo "📋 다음 단계:"
  echo "   1. 브라우저에서 변경사항 확인"
  echo "   2. /commit-push fix \"Update menu for $RESTAURANT_NAME\""
else
  echo "⏭️  수동으로 업데이트해주세요."
fi

echo ""
