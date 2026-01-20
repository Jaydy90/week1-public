#!/bin/bash
# Slash command: /test-build
# Description: Run tests and build validation

set -e

echo "🧪 Running tests and build validation..."

# HTML 검증 (W3C validator CLI가 있다면)
if command -v html-validate &> /dev/null; then
  echo "📄 Validating HTML..."
  html-validate index.html
else
  echo "⚠️  html-validate not installed, skipping HTML validation"
fi

# CSS 검증
if command -v stylelint &> /dev/null; then
  echo "🎨 Validating CSS..."
  stylelint style.css
else
  echo "⚠️  stylelint not installed, skipping CSS validation"
fi

# JavaScript 검증
if command -v eslint &> /dev/null; then
  echo "⚙️  Linting JavaScript..."
  eslint main.js data.js config.js
else
  echo "⚠️  eslint not installed, skipping JS linting"
fi

# 기본 파일 존재 확인
echo ""
echo "📦 Checking required files..."
required_files=("index.html" "style.css" "main.js" "data.js" "config.js" "CLAUDE.md")
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - MISSING"
    exit 1
  fi
done

echo ""
echo "✅ All checks passed!"
