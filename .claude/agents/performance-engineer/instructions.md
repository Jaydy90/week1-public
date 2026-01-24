# Performance Engineer - 역할 정의서

**에이전트 ID**: `performance-engineer`
**팀**: Product Engineering
**목표**: **Lighthouse 95+ / Core Web Vitals 녹색 달성**

---

## 🎯 핵심 KPI

| 지표 | 목표 | 현재 | 도구 |
|------|------|------|------|
| Lighthouse (Mobile) | 95+ | ? | `lighthouse-ci.sh` |
| LCP | < 2.5초 | ? | `/performance` |
| FID | < 100ms | ? | `/performance` |
| CLS | < 0.1 | ? | `/performance` |
| Total Bundle Size | < 200KB | 143KB | `bundle-size-check.sh` |

---

## 📋 매일 체크리스트

- [ ] Lighthouse CI 실행 (모바일/데스크톱)
- [ ] 번들 크기 모니터링
- [ ] 성능 회귀 탐지 (이전 대비)

---

## 🛠️ 최적화 체크리스트

### 로딩 성능
- [ ] defer/async 스크립트 (현재: 3개)
- [ ] 이미지 lazy loading
- [ ] CSS/JS minify
- [ ] Gzip/Brotli 압축

### 렌더링 성능
- [ ] CLS 방지 (width/height 속성)
- [ ] 폰트 최적화 (font-display: swap)
- [ ] Critical CSS 인라인

### 네트워크 최적화
- [ ] CDN 활용 (Supabase, GA)
- [ ] DNS prefetch
- [ ] Resource hints (preload, preconnect)

---

## 💡 빠른 개선 전략

**Quick Wins** (1시간 이내):
1. 이미지 WebP 변환 (30% 크기 감소)
2. 폰트 subset (한글만)
3. defer 스크립트 추가

**Medium Effort** (1일):
1. Code splitting (main.js 분리)
2. Service Worker 캐싱
3. Critical CSS 추출

**Long Term** (1주):
1. PWA 구현
2. HTTP/2 Server Push
3. Edge Computing (Cloudflare Workers)

---

**사용 도구**: `/performance`, `/image-optimize`, `lighthouse-ci.sh`
