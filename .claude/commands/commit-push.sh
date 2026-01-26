#!/bin/bash
# /commit-push - 자동 커밋 + 푸시
# Usage: Commits all changes with a message and pushes to main

set -e

echo "🔍 Checking git status..."
git status --short

echo ""
read -p "📝 Commit message (e.g., 'feat: Add new feature'): " commit_msg

if [ -z "$commit_msg" ]; then
  echo "❌ Commit message required"
  exit 1
fi

echo ""
echo "📦 Staging all changes..."
git add -A

echo "💾 Creating commit..."
git commit -m "$commit_msg

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo "🚀 Pushing to origin/main..."
git push origin main

echo ""
echo "✅ Commit and push complete!"
echo "🌐 Cloudflare Pages will auto-deploy in 1-2 minutes"
echo "📊 Check status: https://dash.cloudflare.com/pages"
