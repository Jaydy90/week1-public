#!/bin/bash
# ========================================
# 캐시 및 임시 파일 정리 스크립트
# 사용법: /clean
# ========================================

set -e

echo "🧹 프로젝트 정리 시작..."
echo "================================"
echo ""

CLEANED=0

# 1. Node modules (있다면)
echo "📦 1/5: Node modules 확인..."
if [ -d "node_modules" ]; then
  echo "  ⚠️  node_modules 디렉토리 발견"
  read -p "  삭제하시겠습니까? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf node_modules
    echo "  ✅ node_modules 삭제됨"
    CLEANED=$((CLEANED + 1))
  fi
else
  echo "  ✅ node_modules 없음"
fi

echo ""

# 2. 백업 파일
echo "🗑️  2/5: 임시 백업 파일 확인..."
BACKUP_FILES=$(find . -maxdepth 2 -name "*.bak" -o -name "*.tmp" -o -name "*~" 2>/dev/null)

if [ -n "$BACKUP_FILES" ]; then
  echo "  발견된 파일:"
  echo "$BACKUP_FILES"
  echo ""
  read -p "  모두 삭제하시겠습니까? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    find . -maxdepth 2 \( -name "*.bak" -o -name "*.tmp" -o -name "*~" \) -delete
    echo "  ✅ 백업 파일 삭제됨"
    CLEANED=$((CLEANED + 1))
  fi
else
  echo "  ✅ 백업 파일 없음"
fi

echo ""

# 3. Git 캐시
echo "🔄 3/5: Git 캐시 정리..."
git gc --quiet
echo "  ✅ Git 가비지 컬렉션 완료"

echo ""

# 4. 오래된 백업 정리
echo "📁 4/5: 오래된 백업 확인..."
if [ -d "backups" ]; then
  OLD_BACKUPS=$(find backups -type f -mtime +30 2>/dev/null | wc -l)
  if [ "$OLD_BACKUPS" -gt 0 ]; then
    echo "  ⚠️  30일 이상 된 백업: $OLD_BACKUPS 개"
    read -p "  삭제하시겠습니까? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      find backups -type f -mtime +30 -delete
      echo "  ✅ 오래된 백업 삭제됨"
      CLEANED=$((CLEANED + 1))
    fi
  else
    echo "  ✅ 오래된 백업 없음"
  fi
else
  echo "  ✅ 백업 디렉토리 없음"
fi

echo ""

# 5. 브라우저 캐시 안내
echo "🌐 5/5: 브라우저 캐시 안내"
echo "----------------"
echo "  로컬 테스트 시 브라우저 캐시를 지우세요:"
echo "  - Chrome: Ctrl + Shift + Delete"
echo "  - Firefox: Ctrl + Shift + Delete"
echo "  - 강제 새로고침: Ctrl + F5"
echo ""
echo "  Cloudflare 캐시 퍼지:"
echo "  https://dash.cloudflare.com/pages"

echo ""
echo "================================"

if [ "$CLEANED" -gt 0 ]; then
  echo "✅ 정리 완료! $CLEANED 개 항목 정리됨"
else
  echo "✅ 정리할 항목 없음. 프로젝트가 깨끗합니다!"
fi

echo ""
