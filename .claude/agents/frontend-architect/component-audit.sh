#!/bin/bash
# ========================================
# 컴포넌트 재사용률 분석 스크립트
# Frontend Architect Agent
# ========================================

set -e

echo "🔍 컴포넌트 재사용률 분석..."
echo "================================"
echo ""

# 1. 함수 정의 분석
echo "📋 1/4: JavaScript 함수 분석"
echo "----------------"

TOTAL_FUNCTIONS=0
REUSED_FUNCTIONS=0
SINGLE_USE_FUNCTIONS=0

# 함수명 추출
FUNCTIONS=$(grep -rho "function\s\+\w\+" --include="*.js" . 2>/dev/null | sed 's/function\s\+//' | sort | uniq -c | sort -rn)

if [ -n "$FUNCTIONS" ]; then
  while IFS= read -r line; do
    COUNT=$(echo "$line" | awk '{print $1}')
    FUNC_NAME=$(echo "$line" | awk '{print $2}')

    TOTAL_FUNCTIONS=$((TOTAL_FUNCTIONS + 1))

    if [ "$COUNT" -gt 1 ]; then
      REUSED_FUNCTIONS=$((REUSED_FUNCTIONS + 1))
      printf "  ✅ %-30s (사용: %d회)\n" "$FUNC_NAME" "$COUNT"
    else
      SINGLE_USE_FUNCTIONS=$((SINGLE_USE_FUNCTIONS + 1))
      printf "  ⚠️  %-30s (사용: %d회)\n" "$FUNC_NAME" "$COUNT"
    fi
  done <<< "$FUNCTIONS"

  if [ $TOTAL_FUNCTIONS -gt 0 ]; then
    REUSE_RATE=$((REUSED_FUNCTIONS * 100 / TOTAL_FUNCTIONS))
    echo ""
    echo "  📊 재사용 함수: $REUSED_FUNCTIONS / $TOTAL_FUNCTIONS (${REUSE_RATE}%)"
  fi
else
  echo "  ℹ️  함수 정의 없음"
fi

echo ""

# 2. CSS 클래스 재사용 분석
echo "🎨 2/4: CSS 클래스 재사용률"
echo "----------------"

if [ -f "style.css" ]; then
  TOTAL_CLASSES=$(grep -o '\.[a-zA-Z0-9_-]\+' style.css 2>/dev/null | sort | uniq | wc -l)

  # HTML에서 실제 사용되는 클래스
  USED_CLASSES=0

  if [ -f "index.html" ]; then
    while IFS= read -r class; do
      class_name=$(echo "$class" | sed 's/\.//')
      if grep -q "class=\"[^\"]*$class_name" index.html 2>/dev/null || grep -q "class='[^']*$class_name" index.html 2>/dev/null; then
        USED_CLASSES=$((USED_CLASSES + 1))
      fi
    done < <(grep -o '\.[a-zA-Z0-9_-]\+' style.css 2>/dev/null | sort | uniq)

    if [ $TOTAL_CLASSES -gt 0 ]; then
      USE_RATE=$((USED_CLASSES * 100 / TOTAL_CLASSES))
      echo "  📊 정의된 클래스: $TOTAL_CLASSES 개"
      echo "  ✅ 사용 중인 클래스: $USED_CLASSES 개 (${USE_RATE}%)"

      UNUSED=$((TOTAL_CLASSES - USED_CLASSES))
      if [ $UNUSED -gt 0 ]; then
        echo "  ⚠️  사용하지 않는 클래스: $UNUSED 개"
      fi
    fi
  fi
else
  echo "  ❌ style.css 파일 없음"
fi

echo ""

# 3. 중복 코드 블록 탐지
echo "🔄 3/4: 중복 코드 블록 탐지"
echo "----------------"

# 유사한 innerHTML 패턴
INNER_HTML_PATTERNS=$(grep -rn "innerHTML\s*=" --include="*.js" . 2>/dev/null | wc -l)

if [ "$INNER_HTML_PATTERNS" -gt 0 ]; then
  echo "  ⚠️  innerHTML 사용: $INNER_HTML_PATTERNS 회"
  echo "     → Template 함수로 추출 권장"
fi

# 유사한 fetch 패턴
FETCH_PATTERNS=$(grep -rn "fetch(" --include="*.js" . 2>/dev/null | wc -l)

if [ "$FETCH_PATTERNS" -gt 0 ]; then
  echo "  📊 fetch 호출: $FETCH_PATTERNS 회"
  if [ "$FETCH_PATTERNS" -gt 5 ]; then
    echo "     → API utility로 추상화 권장"
  fi
fi

# 유사한 addEventListener 패턴
EVENT_LISTENERS=$(grep -rn "addEventListener" --include="*.js" . 2>/dev/null | wc -l)

if [ "$EVENT_LISTENERS" -gt 0 ]; then
  echo "  📊 이벤트 리스너: $EVENT_LISTENERS 개"
  if [ "$EVENT_LISTENERS" -gt 30 ]; then
    echo "     → 이벤트 위임 패턴 고려"
  fi
fi

echo ""

# 4. 모듈화 분석
echo "📦 4/4: 모듈화 분석"
echo "----------------"

JS_FILES=$(find . -maxdepth 1 -name "*.js" -type f | wc -l)
echo "  📊 JavaScript 파일: $JS_FILES 개"

# 파일 크기 분석
LARGE_FILES=0

for jsfile in *.js; do
  if [ -f "$jsfile" ]; then
    SIZE=$(wc -c < "$jsfile" | tr -d ' ')
    SIZE_KB=$((SIZE / 1024))
    LINES=$(wc -l < "$jsfile" | tr -d ' ')

    if [ $LINES -gt 500 ]; then
      LARGE_FILES=$((LARGE_FILES + 1))
      printf "  ⚠️  %-20s %4d lines (%3d KB) - 분리 권장\n" "$jsfile" "$LINES" "$SIZE_KB"
    else
      printf "  ✅ %-20s %4d lines (%3d KB)\n" "$jsfile" "$LINES" "$SIZE_KB"
    fi
  fi
done

if [ $LARGE_FILES -gt 0 ]; then
  echo ""
  echo "  💡 500줄 초과 파일: $LARGE_FILES 개 → 모듈 분리 권장"
fi

echo ""
echo "================================"
echo ""

# 종합 평가
echo "📊 컴포넌트 재사용률 종합"
echo "----------------"

if [ $TOTAL_FUNCTIONS -gt 0 ]; then
  echo "  함수 재사용률: ${REUSE_RATE}%"

  if [ $REUSE_RATE -ge 80 ]; then
    echo "  🎉 우수! 재사용률이 매우 높습니다."
  elif [ $REUSE_RATE -ge 60 ]; then
    echo "  ✅ 양호. 더 개선 가능합니다."
  else
    echo "  ⚠️  개선 필요. 공통 함수 추출을 고려하세요."
  fi
fi

echo ""
echo "💡 개선 권장 사항:"
echo ""

if [ $SINGLE_USE_FUNCTIONS -gt $((TOTAL_FUNCTIONS / 2)) ]; then
  echo "  1. 단일 사용 함수 검토 ($SINGLE_USE_FUNCTIONS 개)"
  echo "     → 유사한 로직을 공통 함수로 추출"
fi

if [ $UNUSED -gt 5 ]; then
  echo "  2. 사용하지 않는 CSS 클래스 제거 ($UNUSED 개)"
  echo "     → 파일 크기 및 유지보수성 개선"
fi

if [ $LARGE_FILES -gt 0 ]; then
  echo "  3. 큰 파일 분리 ($LARGE_FILES 개)"
  echo "     → 모듈별로 파일 분리 (기능, 유틸리티 등)"
fi

if [ "$INNER_HTML_PATTERNS" -gt 10 ]; then
  echo "  4. Template 함수 생성"
  echo "     → 반복되는 HTML 패턴을 재사용 가능한 함수로"
fi

echo ""
echo "📖 참고 자료:"
echo "  - DRY 원칙: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself"
echo "  - Component Pattern: https://www.patterns.dev/posts/component-pattern/"
echo ""
