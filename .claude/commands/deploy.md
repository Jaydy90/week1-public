# Deploy to Cloudflare Pages

Deploy the site to production by pushing to main branch.

## Instructions

1. Check current git status
2. Ensure all changes are committed:
   - If uncommitted changes exist, run /commit-push first
   - If clean, verify latest commit is what should be deployed

3. Push to main branch:
   ```bash
   git push origin main
   ```

4. Provide deployment info:
   - Production URL: https://kpopeats.cc
   - Dev URL: https://week1-public.pages.dev
   - Deployment time: 1-2 minutes
   - GitHub repo: https://github.com/Jaydy90/week1-public

5. Suggest next steps:
   - Wait 1-2 minutes for deployment
   - Check Cloudflare Pages dashboard for build status
   - Test site at production URL
   - Monitor for any console errors

## Notes

- Cloudflare Pages auto-deploys from main branch
- No manual build command needed
- Build settings in Cloudflare:
  - Build command: (none)
  - Build output directory: /
  - Root directory: /
