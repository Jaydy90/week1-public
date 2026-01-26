#!/bin/bash
# /test-build - 로컬 테스트 서버 실행
# Usage: Starts local development server and opens browser

set -e

echo "🧪 Trust Route - Local Test Server"
echo "=================================="
echo ""
echo "📁 Serving from: $(pwd)"
echo "🌐 Opening browser at: http://localhost:8000"
echo ""
echo "⚠️  Note: This is a static site with no build step"
echo "📝 For Supabase auth testing, use local server instead of file:///"
echo ""
echo "Press Ctrl+C to stop server"
echo ""

# Try npx serve first, fallback to python
if command -v npx &> /dev/null; then
  echo "🚀 Starting with npx serve..."
  npx serve . -l 8000
elif command -v python &> /dev/null; then
  echo "🐍 Starting with Python http.server..."
  python -m http.server 8000
else
  echo "❌ Error: Neither npx nor python found"
  echo "Install Node.js (npx) or Python to run local server"
  exit 1
fi
