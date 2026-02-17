# Trust Route - Project Structure

**Last updated**: 2026-02-18

## 📁 Folder Organization

This project follows industry-standard separation of concerns:

```
KEats (Trust Route)/
├── 📁 assets/                      # All static assets (CSS, JS, Images)
│   ├── css/                        # Stylesheets
│   │   ├── style.css              # Main styles
│   │   └── chefs-section.css      # Chef-specific styles
│   ├── js/                        # JavaScript modules
│   │   ├── core/                  # Core functionality
│   │   │   ├── auth.js           # Authentication module
│   │   │   └── config.js         # Supabase configuration
│   │   ├── features/              # Feature modules
│   │   │   ├── comments.js       # Comments CRUD
│   │   │   └── subscription.js   # Stripe subscription
│   │   ├── data/                  # Data sources
│   │   │   ├── restaurants.js    # Restaurant data (formerly data.js)
│   │   │   └── news.js           # News data
│   │   ├── utils/                 # Utility functions
│   │   │   └── sanitize.js       # XSS protection
│   │   └── main.js                # SPA router & screen controllers
│   └── images/                    # Image assets
│       ├── chefs/                 # Chef profile images
│       ├── restaurants/           # Restaurant images
│       ├── logos/                 # Brand logos
│       ├── badges/                # Badge icons
│       └── social/                # Social media preview images
│
├── 📁 docs/                        # All documentation
│   ├── architecture/              # Architecture & design docs
│   │   ├── CLAUDE.md             # Claude Code instructions
│   │   ├── frontend-architecture-audit.md
│   │   └── AUTO_FIX_REPORT.md
│   ├── deployment/                # Deployment guides
│   │   ├── DEPLOYMENT_SUMMARY.md
│   │   ├── MCP_SETUP_GUIDE.md
│   │   ├── PRODUCTION_SMOKE_TEST.md
│   │   └── VERIFICATION_INSTRUCTIONS.md
│   ├── security/                  # Security documentation
│   │   ├── SECURITY.md
│   │   ├── security-audit-report.md
│   │   └── SECURITY_DEPLOYMENT_CHECKLIST.md
│   ├── performance/               # Performance docs
│   │   ├── PERFORMANCE_MONITORING.md
│   │   ├── performance-improvement-report.md
│   │   └── IMAGE_OPTIMIZATION_GUIDE.md
│   ├── quality/                   # Quality assurance docs
│   │   ├── QUALITY_GATE_REPORT.md
│   │   ├── data-quality-report.md
│   │   ├── seo-audit-report.md
│   │   └── QUALITY_IMPROVEMENT_SUMMARY.md
│   ├── FINAL_PROJECT_SUMMARY.md
│   ├── FULL_AUDIT_SUMMARY.md
│   └── TODO_COORDINATES.md
│
├── 📁 .claude/                     # Claude Code configurations
│   ├── commands/                  # Custom CLI commands
│   └── agents/                    # Multi-agent system
│
├── 📁 _functions_disabled/        # Cloudflare Functions (disabled)
├── 📁 supabase/                    # Supabase migrations
├── 📁 scripts/                     # Build & deployment scripts
│
├── 📄 index.html                   # Main SPA entry point
├── 📄 privacy.html                 # Privacy policy page
├── 📄 robots.txt                   # SEO crawler instructions
├── 📄 sitemap.xml                  # Site map for SEO
├── 📄 _headers                     # Cloudflare headers config
├── 📄 _redirects                   # Cloudflare redirects
├── 📄 _worker.js                   # Cloudflare Worker
├── 📄 README.md                    # Project overview
├── 📄 .gitignore                   # Git ignore rules
└── 📄 package.json                 # Node dependencies (minimal)
```

## 🎯 Design Principles Applied

### 1. **Public vs Private Separation**
- **Public** (root): Only files served to users
- **Private** (assets/): Source code organized by type/purpose

### 2. **Separation of Concerns**
- **By feature**: `/features/comments.js`, `/features/subscription.js`
- **By layer**: `/core/`, `/data/`, `/utils/`
- **By type**: `/css/`, `/js/`, `/images/`

### 3. **Documentation Isolation**
- All docs moved to `/docs`
- Organized by category (architecture, deployment, security, etc.)
- Only `README.md` remains in root

### 4. **Clean Git History**
- No `*.backup` files committed
- Temporary files in `.gitignore`
- All moves done with `git mv` to preserve history

## 📝 File Naming Conventions

### JavaScript
- **Core modules**: `auth.js`, `config.js` (lowercase, descriptive)
- **Feature modules**: `comments.js`, `subscription.js` (singular noun)
- **Data files**: `restaurants.js`, `news.js` (plural noun)

### CSS
- **Main stylesheet**: `style.css`
- **Component styles**: `chefs-section.css` (kebab-case)

### Documentation
- **Guides**: `UPPERCASE_WITH_UNDERSCORES.md`
- **Reports**: `lowercase-with-dashes.md`

## 🚀 Why This Structure?

### Before (Problems)
- ❌ 70+ files in root directory
- ❌ JS/CSS/docs all mixed together
- ❌ Hard to find files
- ❌ Unclear what's public vs internal
- ❌ Backup files committed to git

### After (Benefits)
- ✅ Root directory clean (only 10 essential files)
- ✅ Clear separation of concerns
- ✅ Easy to navigate (`assets/js/features/` for feature code)
- ✅ Scalable for future growth
- ✅ Follows SaaS industry standards

## 🔄 Migration Impact

### Files Updated
- `index.html` - All `<script>` and `<link>` paths updated
- `privacy.html` - CSS path updated
- `.gitignore` - Added rules for temp files

### Files Renamed
- `data.js` → `assets/js/data/restaurants.js` (more descriptive)
- `news-data.js` → `assets/js/data/news.js` (consistent naming)

### Files Removed
- `data.js.backup` (deleted)
- `geocode.html` (temporary test file, deleted)
- `Trust-Route-*.png` (screenshot, deleted)

## 📚 Key Documentation Locations

- **Project overview**: `README.md` (root)
- **Development guide**: `docs/architecture/CLAUDE.md`
- **Deployment**: `docs/deployment/DEPLOYMENT_SUMMARY.md`
- **Security**: `docs/security/SECURITY.md`
- **This file**: `PROJECT_STRUCTURE.md`

---

**Note**: This structure was reorganized on 2026-02-18 to align with industry standards while maintaining the "no build step" constraint of the static SPA architecture.
