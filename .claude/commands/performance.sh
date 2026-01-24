#!/bin/bash
# ========================================
# 성능 측정 및 분석 스크립트
# 사용법: /performance
# ========================================

set -e

echo "⚡ 성능 분석 시작..."
echo "================================"
echo ""

# 1. 파일 크기 분석
echo "📦 1/5: 파일 크기 분석"
echo "----------------"

if [ -f "index.html" ]; then
  HTML_SIZE=$(wc -c < "index.html" | tr -d ' ')
  HTML_SIZE_KB=$((HTML_SIZE / 1024))
  printf "  %-20s %6d KB" "index.html" "$HTML_SIZE_KB"

  if [ $HTML_SIZE_KB -gt 100 ]; then
    echo "  ⚠️  (큼 - 압축 권장)"
  else
    echo "  ✅"
  fi
fi

if [ -f "style.css" ]; then
  CSS_SIZE=$(wc -c < "style.css" | tr -d ' ')
  CSS_SIZE_KB=$((CSS_SIZE / 1024))
  printf "  %-20s %6d KB" "style.css" "$CSS_SIZE_KB"

  if [ $CSS_SIZE_KB -gt 50 ]; then
    echo "  ⚠️  (큼 - 압축 권장)"
  else
    echo "  ✅"
  fi
fi

TOTAL_JS_SIZE=0
JS_FILE_COUNT=0

for jsfile in *.js; do
  if [ -f "$jsfile" ]; then
    JS_SIZE=$(wc -c < "$jsfile" | tr -d ' ')
    JS_SIZE_KB=$((JS_SIZE / 1024))
    TOTAL_JS_SIZE=$((TOTAL_JS_SIZE + JS_SIZE))
    JS_FILE_COUNT=$((JS_FILE_COUNT + 1))

    printf "  %-20s %6d KB" "$jsfile" "$JS_SIZE_KB"

    if [ $JS_SIZE_KB -gt 50 ]; then
      echo "  ⚠️  (큼 - 압축 권장)"
    else
      echo "  ✅"
    fi
  fi
done

if [ $JS_FILE_COUNT -gt 0 ]; then
  TOTAL_JS_SIZE_KB=$((TOTAL_JS_SIZE / 1024))
  echo ""
  printf "  %-20s %6d KB" "총 JavaScript" "$TOTAL_JS_SIZE_KB"

  if [ $TOTAL_JS_SIZE_KB -gt 200 ]; then
    echo "  ⚠️  (큼)"
  else
    echo "  ✅"
  fi
fi

echo ""

# 2. 로딩 성능 분석
echo "🚀 2/5: 로딩 성능 요소"
echo "----------------"

PERF_SCORE=0
PERF_MAX=10

# Defer/Async 스크립트
if grep -q 'defer' index.html || grep -q 'async' index.html; then
  DEFER_COUNT=$(grep -c 'defer\|async' index.html 2>/dev/null || echo "0")
  echo "  ✅ defer/async 스크립트: $DEFER_COUNT 개"
  PERF_SCORE=$((PERF_SCORE + 2))
else
  echo "  ⚠️  defer/async 스크립트 없음"
  echo "     → JavaScript 로딩 지연 권장"
fi

# 인라인 스크립트 크기
INLINE_SCRIPT_SIZE=$(grep -o '<script[^>]*>[^<]*</script>' index.html 2>/dev/null | wc -c || echo "0")
INLINE_SCRIPT_KB=$((INLINE_SCRIPT_SIZE / 1024))

if [ $INLINE_SCRIPT_KB -lt 10 ]; then
  echo "  ✅ 인라인 스크립트: ${INLINE_SCRIPT_KB} KB"
  PERF_SCORE=$((PERF_SCORE + 1))
else
  echo "  ⚠️  인라인 스크립트: ${INLINE_SCRIPT_KB} KB (큼)"
fi

# CSS 최적화
if grep -q '<link rel="preload"' index.html; then
  echo "  ✅ CSS preload 사용"
  PERF_SCORE=$((PERF_SCORE + 1))
else
  echo "  💡 CSS preload 권장"
fi

# 폰트 최적화
if grep -q 'font-display' style.css; then
  echo "  ✅ font-display 속성 사용"
  PERF_SCORE=$((PERF_SCORE + 1))
else
  echo "  💡 font-display: swap 권장"
fi

# 이미지 lazy loading
if grep -q 'loading="lazy"' index.html; then
  LAZY_COUNT=$(grep -c 'loading="lazy"' index.html 2>/dev/null || echo "0")
  echo "  ✅ 이미지 lazy loading: $LAZY_COUNT 개"
  PERF_SCORE=$((PERF_SCORE + 2))
else
  echo "  💡 이미지 lazy loading 권장"
fi

# DNS prefetch
if grep -q 'dns-prefetch\|preconnect' index.html; then
  echo "  ✅ DNS prefetch/preconnect 사용"
  PERF_SCORE=$((PERF_SCORE + 1))
else
  echo "  💡 외부 도메인에 dns-prefetch 권장"
fi

# 서비스 워커
if [ -f "sw.js" ] || [ -f "service-worker.js" ]; then
  echo "  ✅ Service Worker 존재"
  PERF_SCORE=$((PERF_SCORE + 2))
else
  echo "  💡 Service Worker 추가 권장 (오프라인 지원)"
fi

echo ""
echo "  📊 성능 점수: $PERF_SCORE / $PERF_MAX"

echo ""

# 3. 렌더링 성능
echo "🎨 3/5: 렌더링 성능"
echo "----------------"

# CSS 선택자 복잡도
COMPLEX_SELECTORS=$(grep -c '>[^{]*>[^{]*>' style.css 2>/dev/null || echo "0")

if [ "$COMPLEX_SELECTORS" -lt 10 ]; then
  echo "  ✅ 복잡한 CSS 선택자: $COMPLEX_SELECTORS 개"
else
  echo "  ⚠️  복잡한 CSS 선택자: $COMPLEX_SELECTORS 개"
  echo "     → 선택자 단순화 권장"
fi

# !important 사용
IMPORTANT_COUNT=$(grep -c '!important' style.css 2>/dev/null || echo "0")

if [ "$IMPORTANT_COUNT" -lt 5 ]; then
  echo "  ✅ !important 사용: $IMPORTANT_COUNT 개"
else
  echo "  ⚠️  !important 과다 사용: $IMPORTANT_COUNT 개"
  echo "     → CSS 구조 개선 권장"
fi

# DOM 크기 (대략적)
if [ -f "index.html" ]; then
  ELEMENT_COUNT=$(grep -o '<[a-zA-Z][^>]*>' index.html 2>/dev/null | wc -l || echo "0")

  if [ "$ELEMENT_COUNT" -lt 800 ]; then
    echo "  ✅ HTML 요소: 약 $ELEMENT_COUNT 개"
  elif [ "$ELEMENT_COUNT" -lt 1500 ]; then
    echo "  💡 HTML 요소: 약 $ELEMENT_COUNT 개 (보통)"
  else
    echo "  ⚠️  HTML 요소: 약 $ELEMENT_COUNT 개 (많음)"
    echo "     → DOM 크기 줄이기 권장"
  fi
fi

echo ""

# 4. 네트워크 최적화
echo "🌐 4/5: 네트워크 최적화"
echo "----------------"

# 외부 리소스 분석
if [ -f "index.html" ]; then
  EXTERNAL_SCRIPTS=$(grep -c 'src="http' index.html 2>/dev/null || echo "0")
  EXTERNAL_STYLES=$(grep -c 'href="http' index.html 2>/dev/null || echo "0")

  echo "  📊 외부 스크립트: $EXTERNAL_SCRIPTS 개"
  echo "  📊 외부 스타일시트: $EXTERNAL_STYLES 개"

  if [ $EXTERNAL_SCRIPTS -gt 5 ]; then
    echo "  ⚠️  외부 스크립트가 많습니다 (5개 이하 권장)"
  fi

  # CDN 사용
  if grep -q 'cdn' index.html; then
    echo "  ✅ CDN 사용 중"
  else
    echo "  💡 CDN 사용 권장 (Supabase, Google Analytics 등)"
  fi
fi

# HTTP/2 Server Push 힌트
if grep -q '<link rel="preload"' index.html; then
  PRELOAD_COUNT=$(grep -c '<link rel="preload"' index.html 2>/dev/null || echo "0")
  echo "  ✅ 리소스 preload: $PRELOAD_COUNT 개"
else
  echo "  💡 중요 리소스에 preload 추가 권장"
fi

echo ""

# 5. JavaScript 성능
echo "⚙️  5/5: JavaScript 성능"
echo "----------------"

# 이벤트 리스너
LISTENER_COUNT=$(grep -c 'addEventListener' *.js 2>/dev/null || echo "0")

if [ "$LISTENER_COUNT" -lt 20 ]; then
  echo "  ✅ addEventListener: $LISTENER_COUNT 개"
else
  echo "  ⚠️  addEventListener: $LISTENER_COUNT 개 (많음)"
  echo "     → 이벤트 위임 패턴 고려"
fi

# setInterval/setTimeout
TIMER_COUNT=$(grep -c 'setInterval\|setTimeout' *.js 2>/dev/null || echo "0")

if [ "$TIMER_COUNT" -lt 5 ]; then
  echo "  ✅ 타이머 함수: $TIMER_COUNT 개"
else
  echo "  ⚠️  타이머 함수: $TIMER_COUNT 개"
  echo "     → 메모리 누수 확인 필요"
fi

# Fetch/AJAX 호출
FETCH_COUNT=$(grep -c 'fetch(\|\.get(\|\.post(' *.js 2>/dev/null || echo "0")
echo "  📊 네트워크 호출: $FETCH_COUNT 개 패턴"

# 무거운 연산
if grep -q 'for.*for\|while.*while' *.js; then
  echo "  ⚠️  중첩 반복문 발견"
  echo "     → 성능 프로파일링 권장"
fi

echo ""
echo "================================"
echo ""

# 종합 평가
TOTAL_SIZE=$((HTML_SIZE + CSS_SIZE + TOTAL_JS_SIZE))
TOTAL_SIZE_KB=$((TOTAL_SIZE / 1024))

echo "📊 종합 평가"
echo "----------------"
echo "  총 파일 크기: $TOTAL_SIZE_KB KB"
echo "  성능 점수: $PERF_SCORE / $PERF_MAX"
echo ""

if [ $TOTAL_SIZE_KB -lt 300 ] && [ $PERF_SCORE -ge 7 ]; then
  echo "🎉 우수! 성능이 매우 좋습니다."
elif [ $TOTAL_SIZE_KB -lt 500 ] && [ $PERF_SCORE -ge 5 ]; then
  echo "✅ 양호. 일부 개선 가능합니다."
else
  echo "⚠️  개선 필요. 성능 최적화를 고려하세요."
fi

echo ""
echo "💡 우선순위 최적화 작업:"
echo ""

if [ $PERF_SCORE -lt 5 ]; then
  echo "  1. defer/async 스크립트 추가"
  echo "  2. 이미지 lazy loading 적용"
  echo "  3. CSS/JS 파일 압축 (minify)"
fi

if [ $TOTAL_SIZE_KB -gt 500 ]; then
  echo "  4. 파일 크기 줄이기 (현재 ${TOTAL_SIZE_KB} KB)"
fi

if [ "$ELEMENT_COUNT" -gt 1500 ]; then
  echo "  5. DOM 크기 줄이기 (현재 약 $ELEMENT_COUNT 개 요소)"
fi

echo ""
echo "🔧 성능 측정 도구:"
echo "  - Lighthouse (Chrome DevTools): F12 > Lighthouse 탭"
echo "  - WebPageTest: https://www.webpagetest.org/"
echo "  - PageSpeed Insights: https://pagespeed.web.dev/"
echo "  - GTmetrix: https://gtmetrix.com/"
echo ""

echo "📖 권장 기준:"
echo "  - First Contentful Paint (FCP): < 1.8초"
echo "  - Largest Contentful Paint (LCP): < 2.5초"
echo "  - Total Blocking Time (TBT): < 200ms"
echo "  - Cumulative Layout Shift (CLS): < 0.1"
echo ""
