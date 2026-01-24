#!/bin/bash
# ========================================
# 데이터 품질 검증 스크립트
# Data Engineer Agent
# ========================================

set -e

echo "📊 맛집 데이터 품질 검증..."
echo "================================"
echo ""

if [ ! -f "data.js" ]; then
  echo "❌ data.js 파일이 없습니다."
  exit 1
fi

TOTAL_RESTAURANTS=0
ISSUES=0

# 1. 필수 필드 검증
echo "✅ 1/4: 필수 필드 검증"
echo "----------------"

# mainMenu 빈 문자열 체크
EMPTY_MENU=$(grep -c 'mainMenu: ""' data.js 2>/dev/null || echo "0")

if [ "$EMPTY_MENU" -gt 0 ]; then
  echo "  ❌ 빈 대표 메뉴: $EMPTY_MENU 개"
  echo "     → /update-menu 로 업데이트 필요"
  ISSUES=$((ISSUES + EMPTY_MENU))
else
  echo "  ✅ 모든 맛집에 대표 메뉴 있음"
fi

# 좌표 누락 체크
MISSING_COORDS=$(grep -c 'lat: 0' data.js 2>/dev/null || echo "0")

if [ "$MISSING_COORDS" -gt 0 ]; then
  echo "  ❌ 좌표 누락: $MISSING_COORDS 개"
  echo "     → 네이버 지도에서 정확한 좌표 확인 필요"
  ISSUES=$((ISSUES + MISSING_COORDS))
else
  echo "  ✅ 모든 맛집에 좌표 있음"
fi

echo ""

# 2. 좌표 범위 검증 (한국 내)
echo "🗺️  2/4: 좌표 범위 검증"
echo "----------------"

# 한국 좌표 범위:
# 위도: 33 ~ 38
# 경도: 124 ~ 132

INVALID_LAT=$(grep -oP 'lat: \K[0-9.]+' data.js 2>/dev/null | awk '$1 < 33 || $1 > 38' | wc -l || echo "0")
INVALID_LNG=$(grep -oP 'lng: \K[0-9.]+' data.js 2>/dev/null | awk '$1 < 124 || $1 > 132' | wc -l || echo "0")

if [ "$INVALID_LAT" -gt 0 ] || [ "$INVALID_LNG" -gt 0 ]; then
  echo "  ⚠️  범위 밖 좌표: $((INVALID_LAT + INVALID_LNG)) 개"
  echo "     → 좌표 확인 필요 (한국 내 범위 벗어남)"
  ISSUES=$((ISSUES + INVALID_LAT + INVALID_LNG))
else
  echo "  ✅ 모든 좌표가 한국 범위 내"
fi

echo ""

# 3. 중복 검사
echo "🔍 3/4: 중복 맛집 검사"
echo "----------------"

RESTAURANT_NAMES=$(grep -oP 'name: "\K[^"]+' data.js 2>/dev/null | sort)

DUPLICATES=$(echo "$RESTAURANT_NAMES" | uniq -d | wc -l)

if [ "$DUPLICATES" -gt 0 ]; then
  echo "  ⚠️  중복 가능성: $DUPLICATES 개 식당명"
  echo "$RESTAURANT_NAMES" | uniq -d | sed 's/^/     - /'
  ISSUES=$((ISSUES + DUPLICATES))
else
  echo "  ✅ 중복 없음"
fi

echo ""

# 4. 신선도 검증 (verifiedAt)
echo "📅 4/4: 데이터 신선도 검증"
echo "----------------"

# 30일 이상 오래된 데이터 찾기
CURRENT_DATE=$(date +%s)
THIRTY_DAYS_AGO=$((CURRENT_DATE - 30*24*60*60))

OLD_DATA=0

while IFS= read -r date; do
  VERIFIED_TS=$(date -d "$date" +%s 2>/dev/null || echo "0")

  if [ "$VERIFIED_TS" -lt "$THIRTY_DAYS_AGO" ] && [ "$VERIFIED_TS" -gt 0 ]; then
    OLD_DATA=$((OLD_DATA + 1))
  fi
done < <(grep -oP 'verifiedAt: "\K[^"]+' data.js 2>/dev/null)

if [ "$OLD_DATA" -gt 0 ]; then
  echo "  ⚠️  30일 이상 오래된 데이터: $OLD_DATA 개"
  echo "     → 정보 업데이트 권장"
else
  echo "  ✅ 모든 데이터 30일 이내"
fi

echo ""
echo "================================"
echo ""

# 종합 평가
TOTAL_RESTAURANTS=$(echo "$RESTAURANT_NAMES" | wc -l)

echo "📊 데이터 품질 종합"
echo "----------------"
echo "  총 맛집: $TOTAL_RESTAURANTS 개"
echo "  발견된 이슈: $ISSUES 개"
echo ""

if [ $ISSUES -eq 0 ]; then
  echo "🎉 우수! 데이터 품질이 완벽합니다."
  exit 0
elif [ $ISSUES -le 3 ]; then
  echo "✅ 양호. 일부 개선이 필요합니다."
  exit 0
else
  echo "⚠️  개선 필요. 즉시 수정하세요."
  echo ""
  echo "💡 수정 방법:"
  echo "  1. 빈 대표 메뉴: /update-menu \"식당명\""
  echo "  2. 좌표 누락: 네이버 지도에서 좌표 확인"
  echo "  3. 중복 식당: data.js에서 수동 제거"
  echo ""
  exit 1
fi
