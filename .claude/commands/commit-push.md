# Commit and Push

Automatically commit all changes and push to GitHub to trigger Cloudflare Pages deployment.

## Instructions

1. Check git status to see what files have changed
2. Stage all changes: `git add -A`
3. Create a descriptive commit message following conventional commit format:
   - feat: New feature
   - fix: Bug fix
   - chore: Maintenance
   - docs: Documentation
4. Commit with co-author tag:
   ```
   git commit -m "$(cat <<'EOF'
   [type]: [description]

   [detailed description if needed]

   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   EOF
   )"
   ```
5. Push to main: `git push origin main`
6. Confirm push was successful
7. Remind user that Cloudflare Pages will auto-deploy (1-2 minutes)

## Notes

- Always include Co-Authored-By tag
- Cloudflare Pages auto-deploys from main branch
- Production: kpopeats.cc
- Dev: week1-public.pages.dev
