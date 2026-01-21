#!/bin/bash
# ========================================
# Cloudflare Pages 배포 스크립트
# 사용법: /deploy
# ========================================

set -e

echo "🚀 Cloudflare Pages 배포 시작..."
echo ""

# 1. 테스트 실행
echo "📋 1/3: 빌드 검증 중..."
bash .claude/commands/test-build.sh

echo ""

# 2. Git 상태 확인
echo "🔍 2/3: Git 상태 확인 중..."
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  커밋되지 않은 변경사항이 있습니다."
  echo ""
  git status
  echo ""
  read -p "계속 진행하시겠습니까? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 배포 취소됨"
    exit 1
  fi
else
  echo "✅ 작업 디렉토리가 깨끗합니다."
fi

echo ""

# 3. 푸시 및 자동 배포
echo "🚢 3/3: 배포 트리거 중..."
git push origin main

echo ""
echo "✅ 배포가 시작되었습니다!"
echo ""
echo "📊 배포 상태 확인:"
echo "   https://dash.cloudflare.com/pages"
echo ""
echo "🌐 배포 완료 후 확인:"
echo "   https://kpopeats.cc"
