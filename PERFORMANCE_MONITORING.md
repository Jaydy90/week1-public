# Performance Monitoring Guide

## 🎯 Quick Performance Check (2 minutes)

### Step 1: Run Lighthouse
```
1. Open https://kpopeats.cc in Chrome
2. Press F12 (DevTools)
3. Click "Lighthouse" tab
4. Select "Mobile" device
5. Select "Performance" category only
6. Click "Analyze page load"
7. Wait 30 seconds for results
```

**Target Score**: ✅ **95+**

### Step 2: Check Core Web Vitals
Look for these metrics in Lighthouse report:

| Metric | Target | Description |
|--------|--------|-------------|
| LCP | < 2.5s ✅ | Largest Contentful Paint (main content visible) |
| FID | < 100ms ✅ | First Input Delay (interactive response) |
| CLS | < 0.1 ✅ | Cumulative Layout Shift (no jumping) |
| FCP | < 1.8s ✅ | First Contentful Paint (first element visible) |
| TBT | < 200ms ✅ | Total Blocking Time (main thread busy) |

---

## 📊 Weekly Performance Audit

### Monday: PageSpeed Insights
```
URL: https://pagespeed.web.dev/
Test: https://kpopeats.cc

Check both:
- Mobile Score
- Desktop Score

Export report as PDF for records
```

### Wednesday: WebPageTest
```
URL: https://www.webpagetest.org/

Settings:
- Location: Tokyo, Japan (closest to Korea)
- Browser: Chrome
- Connection: 4G
- Number of Tests: 3 (for median)

Watch for:
- Start Render < 1.5s
- Speed Index < 2.5s
- Time to Interactive < 3.5s
```

### Friday: Real User Monitoring
```
Check Google Analytics:
1. Go to GA4 dashboard
2. Reports → Engagement → Pages and screens
3. Look at "Average engagement time"
4. Compare week-over-week

Check Microsoft Clarity:
1. Go to Clarity dashboard
2. Check "Dead clicks" (should be < 5%)
3. Check "Rage clicks" (should be < 2%)
```

---

## 🚨 Performance Alerts

### Critical Issues (Fix Immediately)
- Lighthouse score drops below 90
- LCP > 3.0s
- CLS > 0.2
- Any console errors on load

### Warning Issues (Fix This Week)
- Lighthouse score 90-94
- LCP 2.5-3.0s
- CLS 0.1-0.2
- Bundle size increases > 10%

### Monitor Issues (Track Trends)
- Lighthouse score 94-96
- LCP 2.0-2.5s
- CLS 0.05-0.1

---

## 🔧 Performance Debugging Tools

### Chrome DevTools

#### Network Panel
```
1. Open DevTools (F12)
2. Click "Network" tab
3. Reload page (Ctrl+R)

Check:
- Total transfer size (target: < 300 KB)
- Number of requests (target: < 30)
- Longest request (target: < 500ms)
- Waterfall chart (look for blocking chains)
```

#### Performance Panel
```
1. Open DevTools (F12)
2. Click "Performance" tab
3. Click "Record" (circle icon)
4. Reload page
5. Stop recording after page load

Look for:
- Long tasks (> 50ms blocks)
- Excessive layout/paint operations
- JavaScript execution time
```

#### Coverage Panel
```
1. Open DevTools (F12)
2. Press Ctrl+Shift+P
3. Type "coverage"
4. Select "Show Coverage"
5. Click "Record"
6. Reload page

Check:
- Unused CSS (target: < 20%)
- Unused JS (target: < 30%)
```

---

## 📈 Performance Trends Dashboard

### Weekly Metrics Table
| Week | Lighthouse | LCP | FID | CLS | Bundle (KB) |
|------|-----------|-----|-----|-----|-------------|
| 2026-01-24 | 95+ | 1.8s | 40ms | 0.03 | 143 |
| 2026-01-31 | ___ | ___ | ___ | ___ | ___ |
| 2026-02-07 | ___ | ___ | ___ | ___ | ___ |

**How to update**:
1. Run Lighthouse every Friday
2. Record scores in this table
3. Look for negative trends (2+ weeks decline)
4. Investigate root cause if score drops > 5 points

---

## 🎯 Performance Budget

### Hard Limits (Never Exceed)
```
Total Page Weight:   < 500 KB
HTML:                < 50 KB
CSS:                 < 100 KB
JavaScript:          < 200 KB
Fonts:               < 100 KB
Images:              < 1 MB total
```

### Request Budget
```
Total Requests:      < 50
Third-party Scripts: < 10
Fonts:               < 4 files
```

### Timing Budget
```
LCP:    < 2.5s
FID:    < 100ms
CLS:    < 0.1
FCP:    < 1.8s
TTI:    < 3.5s
```

---

## 🔍 Real User Monitoring Setup

### Google Analytics 4 - Web Vitals
Already tracking via gtag.js:
- Page load times
- User engagement
- Bounce rate

### Microsoft Clarity
Already tracking via clarity.js:
- Session recordings
- Heatmaps
- User frustration signals

### Custom Performance Tracking
Add to `main.js` for detailed metrics:

```javascript
// Track page load performance
window.addEventListener('load', () => {
  if (performance.getEntriesByType) {
    const perfData = performance.getEntriesByType('navigation')[0];

    // Log to analytics
    gtag('event', 'performance', {
      dns_time: perfData.domainLookupEnd - perfData.domainLookupStart,
      connect_time: perfData.connectEnd - perfData.connectStart,
      request_time: perfData.responseEnd - perfData.requestStart,
      dom_ready: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      load_time: perfData.loadEventEnd - perfData.navigationStart
    });
  }
});

// Track Core Web Vitals
import {getCLS, getFID, getLCP} from 'web-vitals';

getCLS(metric => gtag('event', 'CLS', {value: metric.value}));
getFID(metric => gtag('event', 'FID', {value: metric.value}));
getLCP(metric => gtag('event', 'LCP', {value: metric.value}));
```

---

## 📋 Monthly Performance Checklist

### First Week of Month
- [ ] Run full Lighthouse audit (Mobile + Desktop)
- [ ] Check PageSpeed Insights score
- [ ] Review GA4 performance metrics
- [ ] Check Clarity for UX issues

### Second Week of Month
- [ ] Analyze bundle size trends
- [ ] Review third-party script performance
- [ ] Check for new console errors/warnings
- [ ] Update performance trends table

### Third Week of Month
- [ ] Compare performance vs competitors (Naver Place, Kakao Map)
- [ ] Review user feedback on speed
- [ ] Check mobile vs desktop performance gap
- [ ] Test on slow 3G connection

### Fourth Week of Month
- [ ] Update performance documentation
- [ ] Share metrics with team
- [ ] Plan optimizations for next month
- [ ] Archive performance reports

---

## 🚀 Quick Fixes for Common Issues

### Issue: LCP > 2.5s
**Diagnosis**: Largest element loading slowly

**Fixes**:
1. Preload LCP image: `<link rel="preload" as="image" href="hero.webp">`
2. Optimize image format (WebP)
3. Use CDN for images
4. Remove render-blocking resources

### Issue: High CLS
**Diagnosis**: Layout jumping during load

**Fixes**:
1. Add width/height to all images
2. Reserve space for dynamic content
3. Avoid inserting content above existing content
4. Use CSS transforms instead of layout properties

### Issue: Large JavaScript Bundle
**Diagnosis**: main.js > 100KB

**Fixes**:
1. Code splitting by route
2. Remove unused dependencies
3. Minify with Terser
4. Use dynamic imports

### Issue: Slow Time to Interactive
**Diagnosis**: Main thread blocked

**Fixes**:
1. Defer non-critical JavaScript
2. Remove long tasks (> 50ms)
3. Use web workers for heavy computation
4. Optimize JavaScript execution

---

## 🎓 Performance Best Practices

### Loading Strategy
```
Critical CSS:       Inline (< 2KB)
Non-critical CSS:   Async load
Critical JS:        Inline or high-priority
Non-critical JS:    Defer
Third-party JS:     Async
Fonts:              Preconnect + font-display: swap
Images:             Lazy load (except LCP)
```

### Caching Strategy
```
HTML:        no-cache (always fresh)
CSS/JS:      max-age=31536000 (versioned)
Images:      max-age=31536000 (versioned)
Fonts:       max-age=31536000 (immutable)
```

### Compression Strategy
```
Text files:  Brotli (via Cloudflare)
Images:      WebP (manual conversion)
Fonts:       WOFF2 (from Google Fonts)
```

---

## 📞 Escalation Process

### If Performance Drops Below 90
1. Check recent deployments (last 7 days)
2. Review git commits for large file additions
3. Run Chrome DevTools Performance profiling
4. Check third-party script status (Sentry, GA, Clarity)
5. Roll back if needed

### If Performance Drops Below 80
**CRITICAL**: Immediate action required
1. Alert team immediately
2. Block new deployments
3. Investigate root cause
4. Prepare rollback plan
5. Deploy hotfix within 2 hours

---

## 📚 Resources

### Tools
- Lighthouse: Built into Chrome DevTools
- PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/
- GTmetrix: https://gtmetrix.com/

### Documentation
- Web Vitals: https://web.dev/vitals/
- Performance Budgets: https://web.dev/performance-budgets-101/
- Lighthouse Scoring: https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/

### Competitive Benchmarks
- Vercel: Lighthouse 100, LCP 0.8s
- Stripe: Lighthouse 99, LCP 1.1s
- Linear: Lighthouse 98, LCP 1.2s
- **Trust Route Target**: Lighthouse 95+, LCP < 2.0s

---

**Last Updated**: 2026-01-24
**Owner**: Performance Engineering Team
**Review Frequency**: Monthly
