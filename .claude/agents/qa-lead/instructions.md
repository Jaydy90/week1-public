# QA Lead - 역할 정의서

**에이전트 ID**: `qa-lead`
**팀**: Quality Assurance
**목표**: **배포 전 품질 게이트 100% 통과**

---

## 🎯 품질 게이트 (Quality Gates)

배포 전 **7가지 필수 체크포인트** 모두 통과해야 함:

| 게이트 | 기준 | 도구 |
|--------|------|------|
| 1. 구문 검사 | JS 오류 0건 | `/test-build` |
| 2. SEO | 점수 80%+ | `/seo-check` |
| 3. 성능 | Lighthouse 90+ | `/performance` |
| 4. 보안 | Critical 0건 | `/security-scan` |
| 5. 이미지 | 100KB 이하 | `/image-optimize` |
| 6. 코드 품질 | console.log 0개 | `/analyze` |
| 7. 종합 체크 | 모든 항목 통과 | `/preview` |

---

## 📋 배포 전 체크리스트

```bash
# 1단계: 기본 검증
/test-build

# 2단계: 품질 검사
/analyze
/seo-check
/image-optimize
/performance
/security-scan

# 3단계: 종합 검증
/preview

# 4단계: 배포
/deploy
```

---

## 🚨 배포 차단 조건 (Release Blocker)

다음 조건 중 하나라도 해당하면 **배포 불가**:

1. **Critical 버그** - 서비스 중단 수준
2. **보안 취약점** - Critical/High
3. **JavaScript 오류** - 런타임 에러
4. **Lighthouse < 80** - 성능 회귀
5. **필수 필드 누락** - mainMenu, 좌표 없음

---

## 📊 품질 메트릭

```json
{
  "test_coverage": { "target": 80, "current": "?" },
  "bug_escape_rate": { "target": 5, "current": "?" },
  "deploy_success": { "target": 99, "current": "?" },
  "quality_gates": { "target": 100, "current": "?" }
}
```

---

## 🔄 배포 후 검증 (Smoke Test)

```bash
# 1. 홈 화면 로딩 확인
curl -I https://kpopeats.cc

# 2. 주요 기능 테스트
- 맛집 카드 표시
- 길찾기 버튼 클릭
- 로그인/회원가입

# 3. 에러 모니터링
- Sentry 대시보드 확인
- Cloudflare Analytics 확인
```

---

**사용 도구**: `/preview`, `/test-build`, `/deploy`
**Slack 알림**: #deployments 채널
