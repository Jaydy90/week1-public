#!/bin/bash
# ========================================
# 이미지 최적화 스크립트
# 사용법: /image-optimize
# ========================================

set -e

echo "🖼️  이미지 최적화 분석..."
echo "================================"
echo ""

# 이미지 파일 찾기
IMAGE_EXTENSIONS=("*.jpg" "*.jpeg" "*.png" "*.gif" "*.webp" "*.svg")
TOTAL_SIZE=0
TOTAL_COUNT=0

# 1. 이미지 파일 스캔
echo "📂 1/4: 이미지 파일 스캔"
echo "----------------"

for ext in "${IMAGE_EXTENSIONS[@]}"; do
  FILES=$(find . -maxdepth 3 -iname "$ext" -type f 2>/dev/null || true)

  if [ -n "$FILES" ]; then
    while IFS= read -r file; do
      if [ -f "$file" ]; then
        SIZE=$(wc -c < "$file" 2>/dev/null | tr -d ' ' || echo "0")
        SIZE_KB=$((SIZE / 1024))
        TOTAL_SIZE=$((TOTAL_SIZE + SIZE))
        TOTAL_COUNT=$((TOTAL_COUNT + 1))

        # 100KB 이상인 이미지 표시
        if [ $SIZE_KB -gt 100 ]; then
          printf "  ⚠️  %-50s %6d KB\n" "$file" "$SIZE_KB"
        else
          printf "  ✅ %-50s %6d KB\n" "$file" "$SIZE_KB"
        fi
      fi
    done <<< "$FILES"
  fi
done

if [ $TOTAL_COUNT -eq 0 ]; then
  echo "  ℹ️  이미지 파일이 없습니다."
else
  TOTAL_SIZE_KB=$((TOTAL_SIZE / 1024))
  TOTAL_SIZE_MB=$((TOTAL_SIZE / 1024 / 1024))
  echo ""
  echo "  📊 총 $TOTAL_COUNT 개 파일, $TOTAL_SIZE_KB KB ($TOTAL_SIZE_MB MB)"
fi

echo ""

# 2. 최적화 도구 확인
echo "🔧 2/4: 최적화 도구 확인"
echo "----------------"

TOOLS_AVAILABLE=0

if command -v convert &> /dev/null; then
  echo "  ✅ ImageMagick (convert)"
  TOOLS_AVAILABLE=$((TOOLS_AVAILABLE + 1))
else
  echo "  ❌ ImageMagick 미설치"
fi

if command -v cwebp &> /dev/null; then
  echo "  ✅ cwebp (WebP 변환)"
  TOOLS_AVAILABLE=$((TOOLS_AVAILABLE + 1))
else
  echo "  ❌ cwebp 미설치"
fi

if command -v optipng &> /dev/null; then
  echo "  ✅ optipng (PNG 최적화)"
  TOOLS_AVAILABLE=$((TOOLS_AVAILABLE + 1))
else
  echo "  ❌ optipng 미설치"
fi

if command -v jpegoptim &> /dev/null; then
  echo "  ✅ jpegoptim (JPEG 최적화)"
  TOOLS_AVAILABLE=$((TOOLS_AVAILABLE + 1))
else
  echo "  ❌ jpegoptim 미설치"
fi

if [ $TOOLS_AVAILABLE -eq 0 ]; then
  echo ""
  echo "  ⚠️  최적화 도구가 설치되지 않았습니다."
  echo "     온라인 도구를 사용하거나 아래 설치 가이드를 참조하세요."
fi

echo ""

# 3. 최적화 권장 사항
echo "💡 3/4: 최적화 권장 사항"
echo "----------------"

# 큰 이미지 찾기
LARGE_IMAGES=$(find . -maxdepth 3 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -size +100k 2>/dev/null | wc -l)

if [ $LARGE_IMAGES -gt 0 ]; then
  echo "  ⚠️  100KB 이상 이미지: $LARGE_IMAGES 개"
  echo "     → 압축 또는 WebP 변환 권장"
else
  echo "  ✅ 모든 이미지가 100KB 이하입니다."
fi

# WebP 사용 여부
WEBP_COUNT=$(find . -maxdepth 3 -iname "*.webp" -type f 2>/dev/null | wc -l)
PNG_JPG_COUNT=$(find . -maxdepth 3 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) 2>/dev/null | wc -l)

if [ $WEBP_COUNT -gt 0 ]; then
  echo "  ✅ WebP 이미지 사용 중: $WEBP_COUNT 개"
else
  if [ $PNG_JPG_COUNT -gt 0 ]; then
    echo "  💡 WebP 형식 사용 권장 (평균 30% 크기 절감)"
  fi
fi

# SVG 사용 여부
SVG_COUNT=$(find . -maxdepth 3 -iname "*.svg" -type f 2>/dev/null | wc -l)

if [ $SVG_COUNT -gt 0 ]; then
  echo "  ✅ SVG 벡터 이미지 사용 중: $SVG_COUNT 개"
fi

echo ""

# 4. HTML 이미지 태그 분석
echo "🔍 4/4: HTML 이미지 태그 분석"
echo "----------------"

if [ -f "index.html" ]; then
  IMG_COUNT=$(grep -c "<img" index.html 2>/dev/null || echo "0")
  IMG_COUNT=$(echo "$IMG_COUNT" | tr -d '\n\r' | head -1)
  echo "  📊 <img> 태그: $IMG_COUNT 개"

  # alt 속성 확인
  IMG_WITHOUT_ALT=$(grep "<img" index.html 2>/dev/null | grep -cv 'alt=' || echo "0")
  IMG_WITHOUT_ALT=$(echo "$IMG_WITHOUT_ALT" | tr -d '\n\r' | head -1)

  if [ "$IMG_WITHOUT_ALT" -gt 0 ] 2>/dev/null; then
    echo "  ⚠️  alt 속성 없는 이미지: $IMG_WITHOUT_ALT 개"
    echo "     → 접근성 및 SEO를 위해 alt 속성 추가 필요"
  else
    echo "  ✅ 모든 이미지에 alt 속성 있음"
  fi

  # loading="lazy" 확인
  IMG_WITH_LAZY=$(grep "<img" index.html 2>/dev/null | grep -c 'loading="lazy"' || echo "0")
  IMG_WITH_LAZY=$(echo "$IMG_WITH_LAZY" | tr -d '\n\r' | head -1)

  if [ "$IMG_WITH_LAZY" -gt 0 ] 2>/dev/null; then
    echo "  ✅ Lazy loading 사용: $IMG_WITH_LAZY 개"
  else
    if [ "$IMG_COUNT" -gt 0 ] 2>/dev/null; then
      echo "  💡 loading=\"lazy\" 속성 추가 권장 (성능 개선)"
    fi
  fi

  # width/height 속성 확인
  IMG_WITH_DIMENSIONS=$(grep "<img" index.html 2>/dev/null | grep -c 'width=' || echo "0")
  IMG_WITH_DIMENSIONS=$(echo "$IMG_WITH_DIMENSIONS" | tr -d '\n\r' | head -1)

  if [ "$IMG_WITH_DIMENSIONS" -gt 0 ] 2>/dev/null; then
    echo "  ✅ width/height 속성 사용: $IMG_WITH_DIMENSIONS 개"
  else
    if [ "$IMG_COUNT" -gt 0 ] 2>/dev/null; then
      echo "  💡 width/height 속성 추가 권장 (CLS 방지)"
    fi
  fi
else
  echo "  ❌ index.html 파일 없음"
fi

echo ""
echo "================================"
echo ""

# 결과 요약
if [ $TOTAL_COUNT -eq 0 ]; then
  echo "✅ 이미지 파일이 없습니다."
  echo ""
  echo "💡 프로젝트에 이미지를 추가할 때:"
  echo "  1. WebP 형식 우선 사용"
  echo "  2. 100KB 이하로 압축"
  echo "  3. alt, width, height 속성 필수"
  echo "  4. loading=\"lazy\" 추가"
else
  echo "📋 최적화 액션 아이템:"
  echo ""

  if [ $LARGE_IMAGES -gt 0 ]; then
    echo "  1. 큰 이미지 압축 ($LARGE_IMAGES 개)"
    echo "     방법: 온라인 도구 (tinypng.com, squoosh.app)"
  fi

  if [ $WEBP_COUNT -eq 0 ] && [ $PNG_JPG_COUNT -gt 0 ]; then
    echo "  2. WebP 형식으로 변환"
    echo "     방법: squoosh.app 또는 cwebp 명령어"
  fi

  if [ "$IMG_WITHOUT_ALT" -gt 0 ]; then
    echo "  3. alt 속성 추가 ($IMG_WITHOUT_ALT 개 이미지)"
  fi

  if [ "$IMG_WITH_LAZY" -eq 0 ] && [ "$IMG_COUNT" -gt 0 ]; then
    echo "  4. loading=\"lazy\" 속성 추가"
  fi

  if [ $TOOLS_AVAILABLE -eq 0 ]; then
    echo "  5. 최적화 도구 설치 (선택사항)"
  fi
fi

echo ""
echo "🔧 이미지 최적화 도구:"
echo "  - Squoosh (온라인): https://squoosh.app/"
echo "  - TinyPNG (온라인): https://tinypng.com/"
echo "  - ImageMagick (CLI): brew install imagemagick"
echo "  - cwebp (CLI): brew install webp"
echo ""

echo "📖 최적화 가이드:"
echo "  - 웹 이미지 권장 크기: 100KB 이하"
echo "  - 썸네일: 50KB 이하"
echo "  - Hero 이미지: 200KB 이하"
echo "  - 형식 우선순위: WebP > JPEG > PNG"
echo ""
