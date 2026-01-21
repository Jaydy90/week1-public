# Custom Claude Code Commands

This directory contains custom commands for the Trust Route project workflow.

## Available Commands

### `/commit-push`
Automatically commits all changes and pushes to main branch.

**Usage:**
```bash
/commit-push
# Will prompt for commit message

# Or with inline message:
/commit-push feat: Add new feature
```

**What it does:**
- Runs `git add -A`
- Creates commit with co-authorship (Claude Sonnet 4.5)
- Pushes to `origin/main`
- Triggers Cloudflare Pages auto-deploy

---

### `/test-build`
Validates the static site and starts local server for testing.

**Usage:**
```bash
/test-build
```

**What it does:**
- Checks all required files exist (index.html, config.js, etc.)
- Validates JavaScript syntax
- Verifies Supabase configuration
- Starts local server on http://localhost:8000

---

### `/deploy`
Deploys to Cloudflare Pages (via git push).

**Usage:**
```bash
/deploy
```

**What it does:**
- Checks for uncommitted changes
- Verifies you're on main branch
- Pushes to origin/main
- Displays deployment URLs and status

---

### `/db-migrate`
Applies Supabase database migrations.

**Usage:**
```bash
/db-migrate
```

**What it does:**
- Lists available migration files in `supabase/migrations/`
- Displays migration preview
- Copies SQL to clipboard
- Opens Supabase SQL Editor in browser

**Manual steps required:**
1. Select migration from menu
2. SQL is copied to clipboard
3. Paste in Supabase Dashboard > SQL Editor
4. Run query

---

## Setup

### For Git Bash / WSL (Windows)
These scripts work directly. Just run them via Claude Code or in your terminal.

### For Windows Command Prompt
If you need `.bat` versions, let me know and I'll create them.

---

## Workflow Examples

### Daily Development
```bash
# Make changes to code...

# Test locally
/test-build

# Commit and deploy
/commit-push feat: Improved trust evidence UI
```

### Database Changes
```bash
# Edit supabase/migrations/*.sql

# Apply migration
/db-migrate

# Commit schema changes
/commit-push chore: Update database schema
```

### Quick Deploy
```bash
# If changes already committed
/deploy
```

---

## Notes

- All commits automatically include Claude co-authorship
- Cloudflare Pages deploys take 1-2 minutes after push
- Local server runs on port 8000 (configurable in test-build script)
- Database migrations are manual copy-paste (no Supabase CLI needed)
