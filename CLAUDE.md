# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# Trust Route — Static Web App with Supabase Auth

**Stack**: Vanilla JS (Static SPA) / Supabase (Auth + Postgres) / Cloudflare Pages
**Domains**: kpopeats.cc (production), week1-public.pages.dev (dev)
**Repository**: https://github.com/Jaydy90/week1-public

## Architecture Overview

This is a **static single-page application (SPA)** without a build step. All JavaScript runs client-side.

### Core Files Structure

```
index.html          # Single HTML file with all 6 screens (sections)
├─ config.js        # Supabase connection config (URL + anon key)
├─ auth.js          # Authentication module (email/password + Google OAuth)
├─ comments.js      # Comments CRUD module
├─ data.js          # Restaurant data (nearbySpots, allRestaurants arrays)
├─ main.js          # SPA router, screen controllers, modals
└─ style.css        # All styles (no preprocessor)
```

### SPA Router Pattern

**Hash-based routing** (`#home`, `#list`, `#detail`, `#directions`, `#faq`, `#partner`)

```javascript
Router.navigateTo(screen, data = {})
  → Hides all .page-section elements
  → Shows section with [data-section="screen"]
  → Calls initScreen(screen, data)
  → Updates hash and nav button states
```

**Screen Controllers**:
- `HomeScreen` - Preview cards, trust tabs
- `ListScreen` - Full restaurant list with filters
- `DetailScreen` - Restaurant details, trust evidence cards, comments
- `DirectionsScreen` - Naver Maps deeplink
- `ModalController` - Login/signup modals

### Authentication Flow

**Supabase Auth** via CDN (`@supabase/supabase-js@2`):

1. User clicks "로그인/회원가입" → Opens modal
2. Email/password or Google OAuth
3. `AuthModule.signIn()` or `AuthModule.signInWithGoogle()`
4. `onAuthStateChange()` updates UI (shows user name, enables comment form)
5. `AuthModule.currentUser` stores session

**Key principle**: Check `AuthModule.isAuthenticated()` before auth-required actions.

### Database Schema (Supabase)

**Current tables**:
- `comments` - Restaurant reviews
  - RLS policies: Anyone read, authenticated users create, users edit/delete own
  - Triggers: `updated_at` auto-update

**Data flow**:
- Restaurant data: Static arrays in `data.js` (no DB yet)
- Comments: Supabase Postgres with RLS
- User auth: Supabase Auth (`auth.users` table)

### Key Technical Constraints

1. **No build step** - Pure HTML/CSS/JS, no bundler
2. **Client-side only** - No server-side rendering
3. **Supabase anon key** - Safe to expose in client code (RLS protects data)
4. **Event listener memory leaks** - Use button cloning technique:
   ```javascript
   const newBtn = oldBtn.cloneNode(true);
   oldBtn.parentNode.replaceChild(newBtn, oldBtn);
   newBtn.addEventListener('click', handler);
   ```

## Development Commands

### Deploy
```bash
git add -A
git commit -m "feat: description"
git push origin main
# Cloudflare Pages auto-deploys from main branch (1-2 min)
```

### Test Locally
```bash
# Open index.html in browser (no local server needed for basic testing)
# For testing Supabase auth redirects, use a local server:
npx serve .
# or
python -m http.server 8000
```

### Supabase Management
```bash
# Apply schema changes:
# 1. Edit schema.sql
# 2. Copy SQL to Supabase Dashboard > SQL Editor
# 3. Run query
```

**Supabase Dashboard**: https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd

## Product Principles (Critical Context)

### North Star
"결정 + 이동 완결 UX" - Complete decision and navigation in one flow, not just search.

### Trust Policy (Non-negotiable)
- **Never sell badges** - No pay-to-rank, trust integrity is brand survival
- **Always show evidence** - sourceUrl, verifiedAt, sourceLabel required
- **Transparent corrections** - Fast response to 오정보 신고

### Decision UX Priority
- Trust evidence cards must be immediately visible (not buried)
- "바로 길찾기" CTA always prominent
- Minimize exploration time (not maximize engagement time)

### Metrics That Matter
- Deeplink click rate (길찾기 전환율)
- Saves per user
- Shares per user
- Average decision time (shorter = better)

## Authentication & Security

### Supabase Configuration

**config.js** contains:
- `SUPABASE_CONFIG.url` - Project URL
- `SUPABASE_CONFIG.anonKey` - Public anon key (safe for client)

**Never commit**:
- Service role key (server-only, not used in this static app)
- User credentials

### Google OAuth Setup

See `SUPABASE_SETUP.md` for step-by-step guide.

**Required settings**:
1. Google Cloud Console OAuth client
2. Authorized redirect URI: `https://djmadubptsajvdvzpdvd.supabase.co/auth/v1/callback`
3. Supabase Provider config with Client ID/Secret

### Row Level Security (RLS)

All Supabase tables must have RLS enabled. Current policies:

**comments table**:
- SELECT: `true` (anyone can read)
- INSERT: `auth.uid() = user_id` (authenticated only)
- UPDATE: `auth.uid() = user_id` (own comments only)
- DELETE: `auth.uid() = user_id` (own comments only)

## Data Management

### Restaurant Data

**Current**: Static arrays in `data.js`
- `nearbySpots[]` - Featured restaurants for home screen
- `allRestaurants[]` - Full list parsed from CSV-like format

**Each restaurant must have**:
- `id` - Unique identifier (e.g., "rest-001")
- `name`, `location`, `category`
- `sourceUrl`, `sourceLabel` - Trust evidence
- `verifiedAt` - Confirmation date

### Adding New Restaurants

1. Edit `data.js`
2. Add to `nearbySpots` (featured) or `allRestaurantsRaw` (full list)
3. Ensure unique ID
4. Include trust evidence fields

### Comments CRUD

**Module**: `comments.js` (`CommentsModule`)

```javascript
// Read
await CommentsModule.getComments(restaurantId)

// Create
await CommentsModule.createComment(restaurantId, content)

// Update
await CommentsModule.updateComment(commentId, newContent)

// Delete
await CommentsModule.deleteComment(commentId)
```

**Security**: All mutations check `AuthModule.isAuthenticated()` and user_id ownership.

## UI/UX Implementation Rules

### ⚠️ ABSOLUTE RULE: Page Content Isolation (CRITICAL)

**FAQ, 제보/제휴(Partner), 마이페이지에서는 홈 화면 요소가 절대 표시되어서는 안 됩니다.**

**금지 요소**:
- "지금 갈 맛집, 빠르게 결정하세요" (`.hero-compact`)
- 신뢰 탭 (`.trust-tabs`)
- 맛집 카드 리스트 (`.card-grid`)
- "전체 리스트 보기" 버튼 (`.home-cta`)
- 검색 관련 UI

**Implementation**:
```css
/* style.css (Lines 152-174) */
#home .hero-compact,
#home .trust-tabs,
#home .card-grid,
#home .home-cta,
#home #inline-detail-container {
  display: none !important;
}

#home.is-active .hero-compact,
#home.is-active .trust-tabs,
#home.is-active .home-cta,
#home.is-active #inline-detail-container {
  display: block !important;
}

#home.is-active .card-grid {
  display: grid !important;
}
```

**Verification**:
1. Navigate to FAQ page → Should show ONLY FAQ content
2. Navigate to Partner page → Should show ONLY partnership content
3. Navigate to Mypage → Should show ONLY user profile/data
4. NO restaurant cards, NO trust tabs, NO "지금 갈 맛집" text

**Why this matters**: Users reported confusion when restaurant content appeared on non-restaurant pages. This breaks the single-responsibility principle of each page and violates user expectations.

### State Management
Each screen must handle:
- **Loading state** - Show during async operations
- **Empty state** - No data available
- **Error state** - Operation failed

### Modal Management

**ModalController** handles login/signup modals:
```javascript
ModalController.openLoginModal()
ModalController.openSignupModal()
```

**Close conditions**:
- Close button click
- Overlay click (outside modal)
- ESC key (TODO: not implemented yet)

### Comments Section

**Display logic**:
- If authenticated: Show comment form + comments list
- If not authenticated: Show login prompt + comments list (read-only)

**Update after mutations**:
```javascript
await CommentsModule.createComment(...)
DetailScreen.loadComments() // Refresh list
```

## Deployment & Environment

### Cloudflare Pages

**Auto-deploy**: Push to `main` branch triggers build

**Build settings**:
- Build command: (none - static site)
- Build output directory: `/`
- Root directory: `/`

**Environment variables**: Not needed (Supabase keys in code are public anon keys)

### Domain Configuration

**Primary**: kpopeats.cc
**Dev**: week1-public.pages.dev

**Redirect logic** (in `index.html`):
```javascript
if (window.location.hostname === 'week1-public.pages.dev') {
  window.location.replace('https://kpopeats.cc' + ...)
}
```

### Analytics

**Enabled**:
- Google Analytics (GA4): G-NT8PV02XX4
- Microsoft Clarity: v30gcak7fj

**Track key events**:
- 길찾기 버튼 클릭
- 저장 버튼 클릭
- 공유 버튼 클릭

## Common Patterns & Anti-Patterns

### ✅ DO

**Event listeners**: Clone button to prevent duplicates
```javascript
const replaceButton = (id, handler) => {
  const oldBtn = document.getElementById(id);
  const newBtn = oldBtn.cloneNode(true);
  oldBtn.parentNode.replaceChild(newBtn, oldBtn);
  newBtn.addEventListener('click', handler);
};
```

**Auth checks**: Always verify before protected actions
```javascript
if (!AuthModule.isAuthenticated()) {
  ModalController.openLoginModal();
  return;
}
```

**Error handling**: Try-catch with user-friendly messages
```javascript
try {
  await CommentsModule.createComment(...);
  alert('후기가 등록되었습니다!');
} catch (err) {
  alert(err.message || '후기 등록에 실패했습니다.');
}
```

### ❌ DON'T

**Don't add event listeners without cleanup**:
```javascript
// BAD: Creates duplicate listeners on screen navigation
btn.addEventListener('click', handler);

// GOOD: Use replaceButton() pattern
```

**Don't trust client-side auth alone**:
```javascript
// BAD: Only checking UI state
if (commentForm.style.display === 'block') { ... }

// GOOD: Check actual auth state
if (AuthModule.isAuthenticated()) { ... }
```

**Don't expose service role key**:
```javascript
// NEVER in config.js or any client code
const key = 'service_role_key_xxx' // ❌
```

## Git Workflow

### Commit Convention
```
feat: Add Google OAuth login
fix: Prevent comment form duplicate submissions
chore: Update Supabase schema documentation
```

### Commit Process
All commits should be:
1. Pushed to `origin/main` (no feature branches currently)
2. Co-authored with Claude:
   ```
   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   ```

### Before Committing
- Test in browser (especially auth flows)
- Check console for errors
- Verify no sensitive data in code

## Future Architecture Notes

### Planned Tables (Not Yet Implemented)
- `profiles` - User display names, preferences
- `restaurants` - Move from static arrays to DB
- `trust_evidence` - Separate trust evidence from restaurants
- `bookmarks` - User-saved restaurants (currently localStorage)
- `reports` - 오정보 신고 tracking

### Planned Features
- Stripe subscription (payments)
- Server-side API (Edge Functions or Cloudflare Workers)
- Real-time updates (Supabase Realtime)
- Image uploads for user-generated content

### Migration Path
When moving to Next.js:
1. Keep existing URL structure (hash-based routing can map to Next.js routes)
2. Move `data.js` arrays to Postgres
3. Add API routes for server-side logic
4. Implement Stripe webhooks in Edge Functions

## Troubleshooting

### "Supabase client not available"
- Check `config.js` has correct URL and anon key
- Verify Supabase CDN script loaded (`window.supabase` exists)
- Check browser console for script loading errors

### Google Login redirects to error page
- Verify redirect URI in Google Cloud Console matches Supabase
- Check Supabase Provider has correct Client ID/Secret
- Ensure user is in "Test users" list (if app in testing mode)

### Comments not saving
- Check browser console for RLS policy errors
- Verify user is authenticated (`AuthModule.currentUser` not null)
- Check Supabase Dashboard > Authentication > Users for logged-in user
- Verify `comments` table exists and RLS is enabled

### Event handlers firing multiple times
- Use button cloning pattern (see ✅ DO section above)
- Check if screen init is being called multiple times

## Reference Documents

- `SUPABASE_SETUP.md` - Complete Supabase setup guide
- `schema.sql` - Database schema with RLS policies
- `.env.example` - Environment variable template (currently unused)

## Definition of Done

A feature is complete when:
1. User flow works end-to-end (e.g., home → detail → 길찾기 → deeplink)
2. Authenticated and unauthenticated states both handled
3. Loading/empty/error states implemented
4. No console errors
5. Tested on mobile viewport (responsive)
6. Committed with clear message and pushed to main

## TODO: Pending Tasks

### Re-enable Stripe Subscription Features (DISABLED: 2026-01-22)

**Why disabled**: Cloudflare Pages Functions build failed due to missing dependencies

**Current state**:
- Functions directory renamed to `_functions_disabled`
- Basic features (restaurant cards, login, navigation) working perfectly
- Subscription buttons exist but API calls will fail

**To re-enable**:
1. Rename `_functions_disabled` back to `functions`
2. Create `functions/package.json`:
   ```json
   {
     "name": "kpopeats-functions",
     "version": "1.0.0",
     "type": "module",
     "dependencies": {
       "stripe": "^14.11.0",
       "@supabase/supabase-js": "^2.39.3"
     }
   }
   ```
3. Add environment variables in Cloudflare Pages Dashboard:
   - `STRIPE_SECRET_KEY` - Get from https://dashboard.stripe.com/test/apikeys
   - `SUPABASE_SERVICE_ROLE_KEY` - Get from Supabase Dashboard > Settings > API
   - `SUPABASE_URL` - Same as in config.js
4. Test deployment in Cloudflare Pages logs
5. Test subscription flow end-to-end

**Files affected**:
- `_functions_disabled/api/create-checkout-session.js`
- `_functions_disabled/api/customer-portal.js`
- `_functions_disabled/api/cancel-subscription.js`
- `_functions_disabled/api/webhooks/stripe.js`
