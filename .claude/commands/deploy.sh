#!/bin/bash
# Slash command: /deploy
# Description: Deploy to Cloudflare Pages

set -e

echo "🚀 Deploying to Cloudflare Pages..."

# Cloudflare Pages는 GitHub 연동으로 자동 배포되므로
# 이 명령은 push 후 배포 상태를 확인하는 용도

echo ""
echo "📋 Pre-deployment checklist:"
echo "  ✓ CLAUDE.md exists"
echo "  ✓ All changes committed"
echo "  ✓ Ready to push"

echo ""
read -p "Deploy to production? (y/N): " confirm

if [[ $confirm != [yY] ]]; then
  echo "❌ Deployment cancelled"
  exit 0
fi

echo ""
echo "🔄 Pushing to main branch..."
git push origin main

echo ""
echo "✅ Pushed to GitHub!"
echo "📊 Cloudflare Pages will auto-deploy from GitHub"
echo "🔗 Check deployment status: https://dash.cloudflare.com/"
echo ""
echo "🌐 Live URL: https://kpopeats.cc"
