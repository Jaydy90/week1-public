# Trust Route - Custom Commands

Custom workflow commands for Claude Code and local development.

## Available Commands

### `/commit-push`
자동 커밋 + 푸시 to main branch

**Usage:**
```bash
bash .claude/commands/commit-push.sh
```

**What it does:**
- Shows git status
- Prompts for commit message
- Stages all changes (`git add -A`)
- Creates commit with Claude co-author tag
- Pushes to `origin/main`
- Triggers Cloudflare Pages auto-deploy

---

### `/test-build`
로컬 테스트 서버 실행

**Usage:**
```bash
bash .claude/commands/test-build.sh
```

**What it does:**
- Starts local development server on port 8000
- Uses `npx serve` or Python `http.server`
- Required for testing Supabase auth redirects
- No build step needed (static site)

**Access at:** http://localhost:8000

---

### `/deploy`
Cloudflare Pages 배포

**Usage:**
```bash
bash .claude/commands/deploy.sh
```

**What it does:**
- Checks for uncommitted changes
- Prompts to commit if needed
- Pushes to main branch
- Shows deployment URLs and dashboard link
- Cloudflare auto-deploys in 1-2 minutes

**Deployment targets:**
- Production: https://kpopeats.cc
- Dev: https://week1-public.pages.dev

---

### `/db-migrate`
Supabase 마이그레이션 가이드

**Usage:**
```bash
bash .claude/commands/db-migrate.sh
```

**What it does:**
- Shows schema.sql preview
- Displays step-by-step migration instructions
- Opens Supabase SQL Editor in browser
- Links to project dashboard

**Manual process:**
1. Edit `schema.sql`
2. Copy SQL content
3. Paste in Supabase SQL Editor
4. Run query
5. Verify in Table Editor

---

## Making Scripts Executable (Optional)

On Unix-like systems (macOS, Linux):
```bash
chmod +x .claude/commands/*.sh
```

Then run directly:
```bash
./.claude/commands/commit-push.sh
```

On Windows (Git Bash or WSL):
```bash
bash .claude/commands/commit-push.sh
```

---

## Integration with Claude Code

These commands are designed to work with Claude Code's workflow.

When Claude asks "Would you like me to commit these changes?", you can reference:
- "Use `/commit-push` to commit and deploy"
- "Run `/test-build` to test locally first"

---

## Notes

- All scripts use `set -e` to exit on error
- Scripts are safe to run multiple times
- No destructive operations without confirmation
- Co-author tag added automatically to commits

---

## Troubleshooting

**Script not found:**
```bash
# Run from project root
cd "C:\Users\jdy2\Desktop\KEats (Trust Route)"
bash .claude/commands/commit-push.sh
```

**Permission denied (Unix):**
```bash
chmod +x .claude/commands/*.sh
```

**Python/npx not found:**
Install Node.js or Python for local server.
