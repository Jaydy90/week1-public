# Performance Optimization Verification Instructions

## ✅ Deployment Completed Successfully
**Commit**: 51c37f8
**Deployed to**: https://kpopeats.cc (via Cloudflare Pages)
**Time**: 2026-01-24
**Status**: Waiting for Cloudflare Pages build (2-3 minutes)

---

## 🔍 Step-by-Step Verification Process

### Step 1: Wait for Deployment (2-3 minutes)
1. Go to Cloudflare Pages Dashboard
2. Check deployment status for `week1-public`
3. Wait for "Success" status
4. Note: Auto-redirects from week1-public.pages.dev to kpopeats.cc

**Dashboard URL**: https://dash.cloudflare.com/

---

### Step 2: Run Lighthouse Audit (Mobile)

#### Open Chrome in Incognito Mode
```
1. Open Chrome browser
2. Press Ctrl+Shift+N (Windows) or Cmd+Shift+N (Mac)
3. Navigate to: https://kpopeats.cc
4. Wait for page to fully load
```

#### Run Lighthouse
```
1. Press F12 to open DevTools
2. Click "Lighthouse" tab
3. Select device: "Mobile"
4. Select categories: "Performance" only (uncheck others for speed)
5. Click "Analyze page load"
6. Wait 30-60 seconds for results
```

#### Success Criteria
```
✅ Performance Score: ≥ 95
✅ First Contentful Paint (FCP): < 1.8s
✅ Largest Contentful Paint (LCP): < 2.5s
✅ Total Blocking Time (TBT): < 200ms
✅ Cumulative Layout Shift (CLS): < 0.1
✅ Speed Index: < 3.0s
```

**Screenshot**: Save Lighthouse report for documentation

---

### Step 3: Run Lighthouse Audit (Desktop)

#### Repeat Process for Desktop
```
1. Stay in same incognito window
2. Reload page: Ctrl+R
3. In Lighthouse tab, select device: "Desktop"
4. Click "Analyze page load"
5. Wait for results
```

#### Success Criteria (Desktop)
```
✅ Performance Score: ≥ 97 (desktop typically scores higher)
✅ FCP: < 1.0s
✅ LCP: < 1.5s
✅ TBT: < 150ms
✅ CLS: < 0.1
```

---

### Step 4: Verify Network Optimizations

#### Check Resource Loading
```
1. Open DevTools (F12)
2. Go to "Network" tab
3. Reload page (Ctrl+R)
4. Wait for all resources to load
```

#### Verify These Items
- [ ] Total transfer size: < 100 KB (with compression)
- [ ] Number of requests: < 30
- [ ] All JS files have "defer" in waterfall
- [ ] Fonts load from fonts.googleapis.com
- [ ] DNS prefetch working (check timing for external domains)

#### Check Response Headers
```
1. In Network tab, click on "index.html"
2. Go to "Headers" tab
3. Look at "Response Headers"
```

**Should see**:
```
cache-control: no-cache, must-revalidate
content-encoding: br (Brotli compression)
x-frame-options: DENY
x-content-type-options: nosniff
```

```
4. Click on "main.js"
5. Look at "Response Headers"
```

**Should see**:
```
cache-control: public, max-age=31536000, immutable
content-type: application/javascript; charset=utf-8
content-encoding: br
```

---

### Step 5: Test Functionality (Smoke Test)

#### Home Screen
- [ ] Page loads without errors
- [ ] Trust tabs (전체, 미쉐린, 유명인, 흑백요리사) clickable
- [ ] Restaurant cards display correctly
- [ ] "바로 길찾기" button works

#### List Screen
- [ ] Navigate to "리스트" page
- [ ] Restaurant list displays
- [ ] Filters work (category, badge, etc.)
- [ ] Inline detail opens on card click

#### Detail Screen
- [ ] Click restaurant card → inline detail opens
- [ ] Trust evidence cards display
- [ ] Comments section loads
- [ ] "바로 길찾기" opens Naver Map in new tab

#### Authentication
- [ ] Click "로그인/회원가입" button
- [ ] Modal opens correctly
- [ ] No console errors

#### News Section
- [ ] Navigate to "소식" tab
- [ ] News articles display
- [ ] Article modal opens on click
- [ ] Modal closes correctly

---

### Step 6: Check Console for Errors

#### Open Browser Console
```
1. Press F12
2. Click "Console" tab
3. Reload page
4. Look for errors (red text)
```

**Expected**:
- ✅ No errors (except external analytics scripts)
- ✅ "Trust Route main.js loaded" message
- ⚠️ Warnings are OK if they're from third-party scripts

**Common False Positives** (safe to ignore):
- Google Analytics warnings
- Sentry initialization messages
- Stripe.js warnings in development

---

### Step 7: PageSpeed Insights Verification

#### Run Online Test
```
1. Go to: https://pagespeed.web.dev/
2. Enter URL: https://kpopeats.cc
3. Click "Analyze"
4. Wait 60 seconds for results
```

#### Check Scores
- [ ] Mobile Performance: ≥ 90 (target 95+)
- [ ] Desktop Performance: ≥ 95 (target 98+)
- [ ] Core Web Vitals: All green

**Note**: PageSpeed Insights uses throttled connection, so scores may be slightly lower than Lighthouse on local Chrome.

---

### Step 8: Real Device Testing (Optional but Recommended)

#### Test on Mobile Phone
```
1. Open browser on your phone
2. Navigate to: https://kpopeats.cc
3. Clear cache first (Settings → Clear browsing data)
4. Test 4G connection (disable WiFi)
```

**Check**:
- [ ] Page loads in < 3 seconds
- [ ] No layout shift when scrolling
- [ ] All interactive elements respond quickly
- [ ] Fonts load properly (no flash of unstyled text)

---

## 📊 Expected Results Summary

### Before Optimization
```
Lighthouse Mobile:     40-50
LCP:                   3.5s
FID:                   150ms
CLS:                   0.15
Total Size:            496 KB
```

### After Optimization (Target)
```
Lighthouse Mobile:     95+      ✅
LCP:                   1.8s     ✅ (-48%)
FID:                   40ms     ✅ (-73%)
CLS:                   0.03     ✅ (-80%)
Total Size:            75 KB    ✅ (-85% with compression)
```

---

## 🚨 Troubleshooting

### If Lighthouse Score < 95

#### Check #1: Scripts Still Blocking?
```
Open DevTools → Network → Reload
Look at waterfall chart
Ensure all <script> tags are deferred (not blocking render)
```

#### Check #2: Font Loading Issues?
```
Check Network tab
Ensure fonts.googleapis.com connects early
Look for "preconnect" in Timing breakdown
```

#### Check #3: Third-Party Scripts Slow?
```
Identify slow scripts:
- Google Analytics
- Microsoft Clarity
- Sentry
These should be async/deferred
```

#### Check #4: Cache Headers Not Applied?
```
Check Response Headers
If Cloudflare isn't serving cached version:
- Clear Cloudflare cache manually
- Wait 5 minutes and retry
```

### If Functionality Broken

#### Defer Script Issues
If JavaScript errors occur, scripts may be loading out of order.

**Quick Fix**: Change `defer` to `async` for problematic scripts
```html
<!-- If this causes issues -->
<script defer src="config.js"></script>

<!-- Try this -->
<script async src="config.js"></script>
```

**Note**: This shouldn't be needed, but defer requires scripts to maintain execution order.

### Rollback Plan
```bash
git revert HEAD
git push origin main

# Wait 2-3 minutes for redeployment
```

---

## 📈 Post-Verification Actions

### If All Tests Pass ✅
1. Update this file with actual Lighthouse scores
2. Archive screenshot of Lighthouse report
3. Share results with team
4. Schedule weekly performance monitoring

### If Tests Fail ❌
1. Document specific failing metrics
2. Check troubleshooting steps above
3. Review commit changes for errors
4. Consider rollback if critical
5. File issue for follow-up investigation

---

## 📝 Verification Report Template

```
==============================================
Performance Optimization Verification Report
==============================================

Date: _______________
Verified By: _______________

Lighthouse Mobile:
  Performance Score: _____/100
  FCP: _____s
  LCP: _____s
  TBT: _____ms
  CLS: _____
  Speed Index: _____s

Lighthouse Desktop:
  Performance Score: _____/100
  FCP: _____s
  LCP: _____s
  TBT: _____ms
  CLS: _____

PageSpeed Insights:
  Mobile: _____/100
  Desktop: _____/100

Network Analysis:
  Total Transfer Size: _____ KB
  Total Requests: _____
  Brotli Compression: [ ] Yes [ ] No
  Cache Headers: [ ] Correct [ ] Incorrect

Functionality Tests:
  [ ] Home screen loads
  [ ] List screen works
  [ ] Detail screen works
  [ ] Login modal works
  [ ] Comments load
  [ ] Navigation works
  [ ] News section works

Console Errors:
  [ ] None [ ] Minor [ ] Critical
  Details: _______________

Overall Status: [ ] PASS [ ] FAIL

Notes:
_______________________________________________
_______________________________________________
_______________________________________________

==============================================
```

---

## 🎯 Success Metrics

**Primary Goal**: Lighthouse Performance ≥ 95
**Secondary Goals**:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- PageSpeed Insights ≥ 90

**Deployment considered successful if**:
- Primary goal met ✅
- All functionality works ✅
- No critical console errors ✅

---

## 📞 Next Steps

1. **Immediate** (Today):
   - Run all verification steps above
   - Fill out verification report template
   - Document any issues

2. **This Week**:
   - Monitor real user metrics in GA4
   - Check Microsoft Clarity for issues
   - Gather user feedback on perceived speed

3. **Next Week**:
   - Review performance trends
   - Compare week-over-week metrics
   - Plan additional optimizations if needed

4. **Monthly**:
   - Full performance audit
   - Competitor benchmarking
   - Update performance documentation

---

**Status**: ⏳ **AWAITING VERIFICATION**

**Deployment Time**: 2026-01-24
**Cloudflare Build**: In progress (check dashboard)
**Estimated Live**: 2-3 minutes after push

**Verification Due**: Within 1 hour of deployment
