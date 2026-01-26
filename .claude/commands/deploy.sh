#!/bin/bash
# /deploy - Cloudflare Pages 배포 상태 확인
# Usage: Quick deploy (git push) and status check

set -e

echo "🚀 Trust Route - Deploy to Cloudflare Pages"
echo "==========================================="
echo ""

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  Warning: You have uncommitted changes"
  echo ""
  git status --short
  echo ""
  read -p "Do you want to commit and push? (y/n): " answer

  if [ "$answer" = "y" ]; then
    read -p "📝 Commit message: " commit_msg
    git add -A
    git commit -m "$commit_msg

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
    git push origin main
    echo ""
    echo "✅ Pushed to main branch"
  else
    echo "❌ Deploy cancelled"
    exit 0
  fi
else
  echo "📦 No local changes - pushing latest commit"
  git push origin main
fi

echo ""
echo "🌐 Deployment Info:"
echo "  Production: https://kpopeats.cc"
echo "  Dev: https://week1-public.pages.dev"
echo "  Dashboard: https://dash.cloudflare.com/pages"
echo ""
echo "⏱️  Auto-deploy will complete in 1-2 minutes"
echo "📊 Monitor build logs in Cloudflare Dashboard"
