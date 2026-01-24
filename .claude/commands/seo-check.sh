#!/bin/bash
# ========================================
# SEO 메타태그 검증 스크립트
# 사용법: /seo-check
# ========================================

set -e

echo "🔍 SEO 메타태그 검증 시작..."
echo "================================"
echo ""

SCORE=0
MAX_SCORE=12

# 1. 기본 메타태그 확인
echo "📋 1/5: 기본 메타태그"
echo "----------------"

if grep -q "<title>" index.html; then
  TITLE=$(grep "<title>" index.html | sed 's/.*<title>\(.*\)<\/title>.*/\1/')
  TITLE_LENGTH=${#TITLE}

  if [ $TITLE_LENGTH -ge 30 ] && [ $TITLE_LENGTH -le 60 ]; then
    echo "  ✅ Title: $TITLE (${TITLE_LENGTH}자)"
    SCORE=$((SCORE + 1))
  else
    echo "  ⚠️  Title: $TITLE (${TITLE_LENGTH}자) - 권장: 30-60자"
  fi
else
  echo "  ❌ Title 태그 없음"
fi

if grep -q '<meta name="description"' index.html; then
  DESC=$(grep '<meta name="description"' index.html | sed 's/.*content="\([^"]*\)".*/\1/')
  DESC_LENGTH=${#DESC}

  if [ $DESC_LENGTH -ge 120 ] && [ $DESC_LENGTH -le 160 ]; then
    echo "  ✅ Description: ${DESC_LENGTH}자"
    SCORE=$((SCORE + 1))
  else
    echo "  ⚠️  Description: ${DESC_LENGTH}자 - 권장: 120-160자"
  fi
else
  echo "  ❌ Description 메타태그 없음"
fi

if grep -q '<meta name="keywords"' index.html; then
  echo "  ✅ Keywords 태그 존재"
  SCORE=$((SCORE + 1))
else
  echo "  ⚠️  Keywords 태그 없음 (선택사항)"
fi

echo ""

# 2. Open Graph 태그
echo "🌐 2/5: Open Graph (소셜 미디어)"
echo "----------------"

OG_TAGS=("og:title" "og:description" "og:image" "og:url" "og:type")
OG_COUNT=0

for tag in "${OG_TAGS[@]}"; do
  if grep -q "property=\"$tag\"" index.html; then
    echo "  ✅ $tag"
    OG_COUNT=$((OG_COUNT + 1))
  else
    echo "  ❌ $tag (없음)"
  fi
done

if [ $OG_COUNT -ge 4 ]; then
  SCORE=$((SCORE + 2))
  echo ""
  echo "  ✅ Open Graph: $OG_COUNT/5 태그 ($((OG_COUNT * 20))%)"
else
  echo ""
  echo "  ⚠️  Open Graph: $OG_COUNT/5 태그 (80% 이상 권장)"
fi

echo ""

# 3. Twitter Cards
echo "🐦 3/5: Twitter Cards"
echo "----------------"

TWITTER_TAGS=("twitter:card" "twitter:title" "twitter:description" "twitter:image")
TWITTER_COUNT=0

for tag in "${TWITTER_TAGS[@]}"; do
  if grep -q "name=\"$tag\"" index.html; then
    echo "  ✅ $tag"
    TWITTER_COUNT=$((TWITTER_COUNT + 1))
  else
    echo "  ❌ $tag (없음)"
  fi
done

if [ $TWITTER_COUNT -ge 3 ]; then
  SCORE=$((SCORE + 2))
  echo ""
  echo "  ✅ Twitter Cards: $TWITTER_COUNT/4 태그"
else
  echo ""
  echo "  ⚠️  Twitter Cards: $TWITTER_COUNT/4 태그 (개선 권장)"
fi

echo ""

# 4. 구조화된 데이터 (JSON-LD)
echo "📊 4/5: 구조화된 데이터"
echo "----------------"

if grep -q 'type="application/ld+json"' index.html; then
  echo "  ✅ JSON-LD 스크립트 존재"
  SCORE=$((SCORE + 2))

  # Schema.org 타입 확인
  if grep -q '"@type"' index.html; then
    SCHEMA_TYPE=$(grep -o '"@type": *"[^"]*"' index.html | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
    echo "  ✅ Schema.org Type: $SCHEMA_TYPE"
  fi
else
  echo "  ❌ JSON-LD 구조화된 데이터 없음"
  echo "     권장: Restaurant, LocalBusiness 스키마 추가"
fi

echo ""

# 5. 추가 SEO 요소
echo "🔧 5/5: 추가 SEO 요소"
echo "----------------"

# Canonical URL
if grep -q '<link rel="canonical"' index.html; then
  CANONICAL=$(grep '<link rel="canonical"' index.html | sed 's/.*href="\([^"]*\)".*/\1/')
  echo "  ✅ Canonical URL: $CANONICAL"
  SCORE=$((SCORE + 1))
else
  echo "  ⚠️  Canonical URL 없음"
fi

# Favicon
if grep -q '<link rel="icon"' index.html || grep -q '<link rel="shortcut icon"' index.html; then
  echo "  ✅ Favicon 존재"
  SCORE=$((SCORE + 1))
else
  echo "  ⚠️  Favicon 없음"
fi

# Viewport
if grep -q '<meta name="viewport"' index.html; then
  echo "  ✅ Viewport 메타태그 (모바일 최적화)"
  SCORE=$((SCORE + 1))
else
  echo "  ❌ Viewport 메타태그 없음 (모바일 필수)"
fi

# robots.txt
if [ -f "robots.txt" ]; then
  echo "  ✅ robots.txt 존재"
  SCORE=$((SCORE + 1))
else
  echo "  ⚠️  robots.txt 없음 (선택사항)"
fi

# Sitemap
if grep -q "sitemap" index.html || [ -f "sitemap.xml" ]; then
  echo "  ✅ Sitemap 참조 또는 파일 존재"
else
  echo "  ⚠️  Sitemap 없음 (권장)"
fi

echo ""
echo "================================"
echo ""

# 결과 요약
PERCENTAGE=$((SCORE * 100 / MAX_SCORE))

echo "📊 SEO 점수: $SCORE / $MAX_SCORE ($PERCENTAGE%)"
echo ""

if [ $PERCENTAGE -ge 90 ]; then
  echo "🎉 우수! SEO 최적화가 잘 되어있습니다."
elif [ $PERCENTAGE -ge 70 ]; then
  echo "✅ 양호! 일부 개선 사항이 있습니다."
elif [ $PERCENTAGE -ge 50 ]; then
  echo "⚠️  보통. SEO 개선이 필요합니다."
else
  echo "❌ 미흡. 즉시 SEO 개선이 필요합니다."
fi

echo ""
echo "💡 권장 사항:"

if [ $SCORE -lt $MAX_SCORE ]; then
  echo ""

  if ! grep -q '"@type"' index.html; then
    echo "  1. JSON-LD 구조화된 데이터 추가"
    echo "     예: Restaurant, LocalBusiness 스키마"
  fi

  if ! grep -q "property=\"og:image\"" index.html; then
    echo "  2. Open Graph 이미지 추가 (1200x630px 권장)"
  fi

  if ! grep -q '<link rel="canonical"' index.html; then
    echo "  3. Canonical URL 추가 (중복 콘텐츠 방지)"
  fi

  if [ ! -f "robots.txt" ]; then
    echo "  4. robots.txt 파일 생성"
  fi

  if [ ! -f "sitemap.xml" ]; then
    echo "  5. sitemap.xml 생성 (검색 엔진 크롤링 최적화)"
  fi
else
  echo "  모든 필수 SEO 요소가 갖춰졌습니다! 🎉"
fi

echo ""
echo "🔗 SEO 테스트 도구:"
echo "  - Google Rich Results Test: https://search.google.com/test/rich-results"
echo "  - Meta Tags: https://metatags.io/"
echo "  - Open Graph Check: https://www.opengraph.xyz/"
echo ""
