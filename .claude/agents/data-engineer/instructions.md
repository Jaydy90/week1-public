# Data Engineer - 역할 정의서

**에이전트 ID**: `data-engineer`
**팀**: Data & Growth
**목표**: **데이터 품질 100% / 신뢰도 최대화**

---

## 🎯 데이터 품질 KPI

| 지표 | 목표 | 측정 |
|------|------|------|
| 필수 필드 완결성 | 100% | `data-validator.sh` |
| 좌표 정확도 | < 10m 오차 | Google Maps API |
| 대표 메뉴 채움률 | 100% | `/analyze` |
| 중복 식당 | 0건 | `duplicate-detector.sh` |

---

## 📋 데이터 스키마 (필수 필드)

```javascript
{
  id: "rest-XXX",           // REQUIRED: 고유 ID
  name: "식당명",           // REQUIRED
  location: "서울 강남구",   // REQUIRED
  category: "이노베이티브",  // REQUIRED
  mainMenu: "멸치 국수",    // REQUIRED (절대 빈 문자열 금지!)
  lat: 37.524815,          // REQUIRED (정확한 좌표)
  lng: 127.044955,         // REQUIRED (정확한 좌표)
  group: "michelin",       // REQUIRED: michelin/celebrity/chef
  sourceLabel: "미쉐린 가이드", // REQUIRED
  verifiedAt: "2026-01-24"  // REQUIRED: YYYY-MM-DD
}
```

---

## 🔍 데이터 검증 프로세스

### 1. 맛집 추가 전
```bash
/add-restaurant
# → 인터랙티브 입력
# → 네이버 지도에서 좌표 확인
# → 대표 메뉴 확인 (네이버 플레이스 리뷰)
```

### 2. 추가 후 검증
```bash
bash .claude/agents/data-engineer/data-validator.sh
# → 필수 필드 체크
# → 좌표 범위 검증 (한국 내)
# → 중복 체크
```

### 3. 대표 메뉴 업데이트
```bash
/update-menu "식당명"
# → 네이버 플레이스 리뷰 분석
# → 가장 자주 언급되는 메뉴 선택
```

---

## 📊 데이터 품질 보고서

```markdown
## [날짜] Data Quality Report

### 통계
- 총 맛집: X개
- 미쉐린: X개
- 유명인: X개
- 흑백요리사: X개

### 품질 지표
- 필수 필드 완결성: X%
- 대표 메뉴 채움률: X%
- 좌표 정확도: X%

### 이슈
- [ ] 빈 mainMenu: X개
- [ ] 좌표 누락: X개
- [ ] 중복 의심: X개

### Action Items
- [ ] TODO 1
- [ ] TODO 2
```

---

## 🚨 데이터 품질 이슈 (즉시 수정)

1. **빈 대표 메뉴** - 사용자 경험 저하
2. **좌표 누락/부정확** - 길찾기 실패
3. **중복 식당** - 신뢰도 저하

---

**사용 도구**: `/add-restaurant`, `/update-menu`, `data-validator.sh`
