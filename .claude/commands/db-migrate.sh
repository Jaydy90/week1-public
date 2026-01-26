#!/bin/bash
# /db-migrate - Supabase 스키마 마이그레이션 가이드
# Usage: Shows migration steps and opens Supabase SQL Editor

set -e

echo "🗄️  Supabase Schema Migration"
echo "============================="
echo ""
echo "📝 Current schema file: schema.sql"
echo ""

# Check if schema.sql exists
if [ ! -f "schema.sql" ]; then
  echo "❌ Error: schema.sql not found"
  echo "Create schema.sql in project root first"
  exit 1
fi

echo "📋 Schema file contents:"
echo "------------------------"
head -20 schema.sql
echo "..."
echo ""

echo "🔧 Migration Steps:"
echo "1. ✏️  Edit schema.sql with your changes"
echo "2. 📋 Copy SQL from schema.sql"
echo "3. 🌐 Open Supabase SQL Editor:"
echo "   https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd/sql"
echo "4. 📝 Paste and run the query"
echo "5. ✅ Verify changes in Table Editor"
echo ""

read -p "Open Supabase SQL Editor in browser? (y/n): " answer

if [ "$answer" = "y" ]; then
  echo "🌐 Opening Supabase Dashboard..."

  # Try to open browser based on OS
  if command -v xdg-open &> /dev/null; then
    xdg-open "https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd/sql"
  elif command -v open &> /dev/null; then
    open "https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd/sql"
  elif command -v start &> /dev/null; then
    start "https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd/sql"
  else
    echo "📋 Copy this URL:"
    echo "https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd/sql"
  fi
fi

echo ""
echo "💡 Tip: Test migrations on dev environment first!"
echo "📚 Docs: SUPABASE_SETUP.md"
