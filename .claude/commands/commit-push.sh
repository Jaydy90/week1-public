#!/bin/bash
# Slash command: /commit-push
# Description: Stage changes, commit with message, and push to remote

set -e

echo "🔍 Checking git status..."
git status

echo ""
echo "📝 Staging all changes..."
git add .

echo ""
echo "💬 Please provide commit message:"
read -p "Message: " commit_msg

if [ -z "$commit_msg" ]; then
  echo "❌ Commit message cannot be empty"
  exit 1
fi

echo ""
echo "📦 Creating commit..."
git commit -m "$commit_msg

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo ""
echo "🚀 Pushing to remote..."
git push

echo ""
echo "✅ Successfully committed and pushed!"
