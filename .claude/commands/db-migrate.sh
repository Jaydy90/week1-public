#!/bin/bash
# ========================================
# Supabase 데이터베이스 마이그레이션 스크립트
# 사용법: /db-migrate
# ========================================

set -e

echo "🗄️  Supabase 데이터베이스 마이그레이션 시작..."
echo ""

# Supabase CLI 설치 확인
if ! command -v supabase &> /dev/null; then
  echo "❌ Supabase CLI가 설치되지 않았습니다."
  echo ""
  echo "설치 방법:"
  echo "  npm install -g supabase"
  echo "  또는"
  echo "  brew install supabase/tap/supabase  # macOS"
  exit 1
fi

echo "✅ Supabase CLI 확인됨"
echo ""

# 1. 마이그레이션 파일 확인
echo "📂 1/3: 마이그레이션 파일 확인 중..."
if [ ! -d "supabase/migrations" ]; then
  echo "❌ supabase/migrations 디렉토리가 없습니다."
  exit 1
fi

MIGRATION_COUNT=$(ls -1 supabase/migrations/*.sql 2>/dev/null | wc -l)
echo "✅ $MIGRATION_COUNT 개의 마이그레이션 파일 발견"
echo ""

# 2. 프로젝트 연결 확인
echo "🔗 2/3: Supabase 프로젝트 연결 확인 중..."
if [ ! -f ".git/config.toml" ]; then
  echo "⚠️  프로젝트가 연결되지 않았습니다."
  echo ""
  read -p "프로젝트 Reference ID를 입력하세요 (예: djmadubptsajvdvzpdvd): " PROJECT_REF

  if [ -z "$PROJECT_REF" ]; then
    echo "❌ Reference ID가 필요합니다."
    exit 1
  fi

  echo "연결 중..."
  supabase link --project-ref "$PROJECT_REF"
fi

echo "✅ 프로젝트 연결됨"
echo ""

# 3. 마이그레이션 실행
echo "🚀 3/3: 마이그레이션 실행 중..."
supabase db push

echo ""
echo "✅ 마이그레이션 완료!"
echo ""
echo "📊 Supabase Dashboard에서 확인:"
echo "   https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd"
