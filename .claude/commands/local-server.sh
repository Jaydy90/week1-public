#!/bin/bash
# ========================================
# 로컬 개발 서버 실행 스크립트
# 사용법: /local-server [포트]
# ========================================

set -e

PORT="${1:-8000}"

echo "🚀 로컬 개발 서버 시작..."
echo "================================"
echo ""

# Python 서버 확인
if command -v python3 &> /dev/null; then
  PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
  PYTHON_CMD="python"
else
  PYTHON_CMD=""
fi

# Node.js 서버 확인
NODE_SERVE=false
if command -v npx &> /dev/null; then
  NODE_SERVE=true
fi

if [ -z "$PYTHON_CMD" ] && [ "$NODE_SERVE" = false ]; then
  echo "❌ Python 또는 Node.js가 필요합니다."
  echo ""
  echo "설치 방법:"
  echo "  - Python: https://www.python.org/downloads/"
  echo "  - Node.js: https://nodejs.org/"
  exit 1
fi

echo "📋 서버 옵션:"
echo ""
echo "  1) Python HTTP Server (권장)"
echo "  2) npx serve (Node.js)"
echo ""

read -p "선택 (1-2, 기본값: 1): " choice
choice=${choice:-1}

echo ""
echo "🌐 서버 시작 중..."
echo ""

case $choice in
  1)
    if [ -n "$PYTHON_CMD" ]; then
      echo "✅ Python HTTP Server"
      echo "   주소: http://localhost:$PORT"
      echo ""
      echo "💡 종료하려면 Ctrl+C를 누르세요"
      echo ""
      $PYTHON_CMD -m http.server $PORT
    else
      echo "❌ Python이 설치되지 않았습니다."
      exit 1
    fi
    ;;
  2)
    if [ "$NODE_SERVE" = true ]; then
      echo "✅ npx serve"
      echo "   주소: http://localhost:$PORT"
      echo ""
      echo "💡 종료하려면 Ctrl+C를 누르세요"
      echo ""
      npx serve . -p $PORT
    else
      echo "❌ Node.js가 설치되지 않았습니다."
      exit 1
    fi
    ;;
  *)
    echo "❌ 잘못된 선택입니다."
    exit 1
    ;;
esac
