#!/bin/bash
# Slash command: /db-migrate
# Description: Run Supabase database migrations

set -e

echo "🗄️  Running Supabase migrations..."

# Supabase CLI 설치 확인
if ! command -v supabase &> /dev/null; then
  echo "❌ Supabase CLI not installed"
  echo "📦 Install with: npm install -g supabase"
  exit 1
fi

echo ""
echo "🔗 Connecting to Supabase project..."

# 마이그레이션 파일 확인
if [ -d "supabase/migrations" ]; then
  echo "📁 Found migrations directory"
  migration_count=$(ls -1 supabase/migrations/*.sql 2>/dev/null | wc -l)
  echo "📊 Found $migration_count migration file(s)"
else
  echo "⚠️  No migrations directory found"
  echo "💡 Create migrations with: supabase migration new <name>"
  exit 0
fi

echo ""
read -p "Apply migrations to remote database? (y/N): " confirm

if [[ $confirm != [yY] ]]; then
  echo "❌ Migration cancelled"
  exit 0
fi

echo ""
echo "⚡ Applying migrations..."
supabase db push

echo ""
echo "✅ Migrations applied successfully!"
echo "🔍 Verify in Supabase dashboard: https://supabase.com/dashboard"
