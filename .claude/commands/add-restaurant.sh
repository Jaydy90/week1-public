#!/bin/bash
# ========================================
# 맛집 추가 인터랙티브 스크립트
# 사용법: /add-restaurant
# ========================================

set -e

echo "🍽️  새 맛집 추가하기"
echo "================================"
echo ""

# 1. 기본 정보 입력
echo "📝 1/5: 기본 정보"
echo "----------------"
read -p "식당 이름: " name
read -p "지역 (예: 서울 강남구): " location
read -p "카테고리 (예: 이노베이티브, 한식, 중식): " category
read -p "대표 메뉴 (예: 멸치 국수와 전복): " mainMenu

echo ""

# 2. 위치 정보
echo "🗺️  2/5: 위치 정보"
echo "----------------"
echo "💡 네이버 지도에서 식당을 검색하고 URL을 복사하세요"
echo "   예: https://map.naver.com/p/..."
read -p "네이버 지도 URL: " naverUrl

# URL에서 좌표 추출 시도 (간단한 패턴 매칭)
if [[ $naverUrl =~ /place/([0-9]+) ]]; then
  placeId="${BASH_REMATCH[1]}"
  echo "✅ Place ID 추출됨: $placeId"
  echo "⚠️  좌표는 수동으로 확인해주세요"
fi

read -p "위도 (Latitude, 예: 37.524815): " lat
read -p "경도 (Longitude, 예: 127.044955): " lng

echo ""

# 3. 신뢰 정보
echo "🏅 3/5: 신뢰 배지 정보"
echo "----------------"
echo "그룹 선택:"
echo "  1) michelin - 미쉐린 가이드"
echo "  2) celebrity - 유명인 추천"
echo "  3) chef - 흑백요리사"
read -p "선택 (1-3): " groupChoice

case $groupChoice in
  1) group="michelin" ;;
  2) group="celebrity" ;;
  3) group="chef" ;;
  *) group="michelin" ;;
esac

read -p "배지 라벨 (예: 미쉐린 2스타): " badgeLabel
read -p "출처 라벨 (예: 미쉐린 가이드 2024): " sourceLabel
read -p "출처 URL: " sourceUrl
read -p "검증일 (YYYY-MM-DD, 예: 2026-01-24): " verifiedAt

echo ""

# 4. 추가 정보
echo "ℹ️  4/5: 추가 정보 (선택사항)"
echo "----------------"
read -p "도보 시간 (분, 예: 12): " travelMinutes
read -p "거리 (km, 예: 1.1): " distanceKm
read -p "신뢰 맥락 설명 (한 줄): " context

echo ""

# 5. ID 생성
RANDOM_ID=$(date +%s | tail -c 4)
restaurantId="rest-$RANDOM_ID"

echo "🔑 5/5: 생성된 ID"
echo "----------------"
echo "ID: $restaurantId"
echo ""

# JSON 형식으로 출력
echo "✅ 생성된 데이터:"
echo "================================"
cat << EOF
{
  id: "$restaurantId",
  name: "$name",
  location: "$location",
  category: "$category",
  mainMenu: "$mainMenu",
  travelMinutes: ${travelMinutes:-15},
  travelTime: "도보 ${travelMinutes:-15}분(예상)",
  distanceKm: ${distanceKm:-1.5},
  saves: 0,
  bestRoute: "가장 효율적: 도보",
  badges: ["$badgeLabel", "검증 완료"],
  context: "$context",
  status: "검증 완료",
  updatedAt: "$verifiedAt",
  group: "$group",
  lat: $lat,
  lng: $lng,
  mapQuery: "$name $location"
}
EOF

echo "================================"
echo ""
echo "📋 다음 단계:"
echo "1. 위 데이터를 data.js의 nearbySpots 배열에 추가하세요"
echo "2. allRestaurantsRaw 문자열에도 추가하세요 (형식 확인 필요)"
echo "3. /test-build 로 검증하세요"
echo "4. /commit-push feat \"Add restaurant: $name\""
echo ""
