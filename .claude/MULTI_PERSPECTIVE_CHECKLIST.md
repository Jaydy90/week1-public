# 🎯 Multi-Perspective Checklist

Claude가 모든 요청에 자동으로 적용하는 품질 체크리스트

---

## 📋 요청 타입별 자동 체크 매트릭스

### 1. 기능 추가/수정 요청

```
✅ Frontend Architect 관점
  - 컴포넌트 재사용성 확인
  - 기존 패턴과의 일관성
  - CSS 중복 제거
  - 반응형 디자인 고려

✅ Performance Engineer 관점
  - 번들 사이즈 영향 (<5KB 증가)
  - 불필요한 리렌더링 방지
  - 이미지 최적화 (WebP, lazy load)
  - 네트워크 요청 최소화

✅ Security Engineer 관점
  - XSS 방어 (사용자 입력 sanitize)
  - CSRF 토큰 확인
  - API 키 노출 방지
  - RLS 정책 검증 (Supabase)

✅ Accessibility Engineer 관점
  - ARIA 레이블 추가
  - 키보드 네비게이션 지원
  - 색상 대비 4.5:1 이상
  - 스크린 리더 호환

✅ Data Engineer 관점
  - 데이터 스키마 일관성
  - NULL 처리
  - 중복 데이터 방지
  - 타입 안정성
```

---

### 2. 데이터 수정/추가 요청

```
✅ Data Engineer 관점
  - 필수 필드 누락 없는지
  - 좌표 범위 검증 (한국 내)
  - 중복 식당명 체크
  - 대표 메뉴 100% 채워짐

✅ SEO Specialist 관점
  - 메타 태그 업데이트
  - JSON-LD 스키마 추가
  - sitemap.xml 반영

✅ QA Lead 관점
  - 기존 데이터 영향도 분석
  - 엣지 케이스 테스트
```

---

### 3. 스타일/UI 수정 요청

```
✅ Frontend Architect 관점
  - CSS 변수 활용 (--primary, --bg 등)
  - 기존 클래스 재사용
  - 반응형 breakpoint 준수

✅ Accessibility Engineer 관점
  - 색상 대비 검증
  - 포커스 스타일 유지
  - 터치 타겟 크기 (44px)

✅ Performance Engineer 관점
  - CSS 파일 사이즈 증가 확인
  - 불필요한 애니메이션 제거
```

---

### 4. 데이터베이스/API 수정 요청

```
✅ Database Architect 관점
  - 인덱스 최적화
  - RLS 정책 검증
  - 외래 키 무결성

✅ Security Engineer 관점
  - SQL Injection 방어
  - 인증/권한 체크
  - Rate limiting

✅ Performance Engineer 관점
  - 쿼리 성능 (EXPLAIN ANALYZE)
  - N+1 쿼리 방지
  - 페이지네이션 추가
```

---

### 5. 배포 전 (자동 실행)

```
✅ QA Lead 관점
  - 모든 페이지 로드 테스트
  - 주요 기능 smoke test
  - 콘솔 에러 0건

✅ Security Engineer 관점
  - 환경 변수 체크
  - API 키 노출 확인
  - HTTPS 강제 확인

✅ Performance Engineer 관점
  - Lighthouse 점수 95+ 확인
  - Bundle size 체크
  - 이미지 최적화 확인

✅ SEO Specialist 관점
  - robots.txt 확인
  - sitemap.xml 생성
  - 메타 태그 완결성
```

---

## 🤖 자동 적용 규칙

### 규칙 1: 모든 코드 작성 시
- 작성 전: 해당 관점 체크리스트 확인
- 작성 후: 명시적으로 체크 결과 표시

### 규칙 2: 명시적 언급
```markdown
## 🔍 Multi-Perspective Review

✅ **Frontend Architect**
- 컴포넌트 재사용: Button 재사용
- CSS 중복: 없음

✅ **Security Engineer**
- XSS 방어: textContent 사용
- RLS: authenticated 정책 적용

✅ **Performance Engineer**
- 번들 증가: +2KB (허용 범위)
- 리렌더링: useMemo 적용
```

### 규칙 3: 자동 경고
```
⚠️ 발견된 이슈:
- [Security] API 키가 코드에 노출됨
- [Performance] 이미지 크기 1MB 초과
- [A11y] 버튼에 aria-label 누락

🔧 자동 수정 적용...
```

---

## 📊 품질 점수 자동 계산

모든 작업 완료 후:

```
🎯 품질 점수: 95/100

✅ Security: 100/100
✅ Performance: 95/100
✅ Accessibility: 90/100
⚠️ Data Quality: 85/100 (대표 메뉴 5개 누락)
```

---

## 🚨 Block 조건 (배포 차단)

다음 조건 발견 시 **자동으로 배포 중단**:

```
❌ Critical Security: API 키 노출
❌ Critical Performance: Lighthouse < 80
❌ Critical A11y: WCAG Level A 미달
❌ Critical Data: 필수 필드 누락 > 10%
```

---

## 💡 사용 예시

### Before (기존)
```
사용자: "예약 버튼 추가해줘"
Claude: "예약 버튼 추가했습니다. (끝)"
```

### After (지금부터)
```
사용자: "예약 버튼 추가해줘"

Claude:
"## 🔍 Multi-Perspective Analysis

✅ Frontend Architect
- 기존 .primary-button 클래스 재사용
- 반응형: mobile에서 full-width

✅ Security Engineer
- onClick 핸들러에 인증 체크 추가
- ReservationModule.open() RLS 정책 검증

✅ Performance Engineer
- 번들 증가: +1.2KB (양호)
- 이벤트 리스너 중복 방지

✅ Accessibility Engineer
- aria-label 추가: '예약하기'
- 키보드: Enter, Space 지원

✅ QA Lead
- Test case: 비로그인 시 로그인 모달 표시
- Edge case: 예약 링크 없을 때 처리

📊 품질 점수: 98/100
✅ 배포 가능"
```

---

## 🎓 지속적 개선

매주 금요일 자동 실행:
```bash
bash .claude/agents/orchestrator.sh workflow weekly
```

결과를 이 체크리스트에 반영하여 점진적 개선
