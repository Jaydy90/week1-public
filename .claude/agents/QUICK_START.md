# 🚀 Trust Route 멀티 에이전트 시스템 - 빠른 시작

**SaaS급 고퀄리티 자동화 시스템**

---

## 📦 설치 확인

```bash
# 현재 디렉토리 확인
pwd
# → C:\Users\jdy2\Desktop\KEats (Trust Route)

# 오케스트레이터 실행 권한 확인
ls -la .claude/agents/orchestrator.sh
```

---

## 🎯 5분 만에 시작하기

### 1. 에이전트 시스템 소개
```bash
# 도움말 보기
bash .claude/agents/orchestrator.sh --help
```

### 2. 프로젝트 상태 확인
```bash
# 전체 상태 확인
bash .claude/agents/orchestrator.sh status
```

### 3. KPI 대시보드 보기
```bash
# KPI 확인
bash .claude/agents/orchestrator.sh kpi
```

### 4. 단일 에이전트 실행
```bash
# 프론트엔드 아키텍처 분석
bash .claude/agents/orchestrator.sh run frontend-architect

# 성능 분석
bash .claude/agents/orchestrator.sh run performance-engineer

# 보안 스캔
bash .claude/agents/orchestrator.sh run security-engineer

# 데이터 품질 검증
bash .claude/agents/orchestrator.sh run data-engineer
```

---

## 🔥 일반적인 사용 시나리오

### 시나리오 1: 매일 아침 품질 체크 ☀️

```bash
# Daily Workflow 실행 (보안 + 데이터 검증)
bash .claude/agents/orchestrator.sh workflow daily
```

**실행 내용**:
- 보안 스캔 (취약점 체크)
- 데이터 품질 검증 (빈 필드, 좌표 확인)

**소요 시간**: 2-3분

---

### 시나리오 2: 배포 전 품질 게이트 🚀

```bash
# Pre-Deploy Workflow 실행
bash .claude/agents/orchestrator.sh workflow pre-deploy
```

**실행 내용**:
1. 구문 검사 (`/test-build`)
2. 보안 스캔 (`security-engineer`)
3. 성능 분석 (`performance-engineer`)
4. 종합 체크 (`qa-lead`)

**소요 시간**: 5-7분

**통과 조건**:
- ✅ JavaScript 오류 0건
- ✅ Critical 보안 취약점 0건
- ✅ Lighthouse 90+
- ✅ 모든 품질 게이트 통과

---

### 시나리오 3: 주간 품질 리포트 📊

```bash
# Weekly Workflow 실행
bash .claude/agents/orchestrator.sh workflow weekly
```

**실행 내용**:
- SEO 점수 측정
- 성능 메트릭
- 프로젝트 상태

**소요 시간**: 3-5분

---

### 시나리오 4: 전체 품질 감사 🔍

```bash
# Full Audit Workflow 실행
bash .claude/agents/orchestrator.sh workflow full-audit
```

**실행 내용**:
- 모든 에이전트 실행 (6개)
- 종합 리포트 생성

**소요 시간**: 10-15분

---

### 시나리오 5: 병렬 실행 (빠른 체크) ⚡

```bash
# 3개 에이전트 동시 실행
bash .claude/agents/orchestrator.sh parallel \
  performance-engineer \
  security-engineer \
  data-engineer
```

**소요 시간**: 2-3분 (병렬 실행)

---

## 🏆 베스트 프랙티스

### 매일
```bash
# 아침: Daily workflow
bash .claude/agents/orchestrator.sh workflow daily

# 저녁: 상태 확인
bash .claude/agents/orchestrator.sh status
```

### 매주 금요일
```bash
# 주간 리포트
bash .claude/agents/orchestrator.sh workflow weekly

# Full audit
bash .claude/agents/orchestrator.sh workflow full-audit
```

### 배포 전 (필수!)
```bash
# Pre-deploy quality gate
bash .claude/agents/orchestrator.sh workflow pre-deploy

# 통과 시 배포
bash .claude/commands/deploy.sh
```

### 배포 후
```bash
# Post-deploy smoke test
bash .claude/agents/orchestrator.sh workflow post-deploy
```

---

## 📊 각 에이전트 역할

| 에이전트 | 역할 | 주요 작업 | 소요 시간 |
|---------|------|----------|----------|
| **frontend-architect** | 프론트엔드 아키텍처 | 컴포넌트 재사용률, 코드 품질 | 2-3분 |
| **performance-engineer** | 성능 최적화 | Lighthouse, Core Web Vitals | 3-5분 |
| **security-engineer** | 보안 검증 | XSS, 민감정보, 취약점 | 2-3분 |
| **qa-lead** | 품질 게이트 | 배포 전 종합 검증 | 5-7분 |
| **data-engineer** | 데이터 품질 | 필수 필드, 좌표, 중복 | 1-2분 |
| **seo-specialist** | SEO 최적화 | 메타태그, 구조화된 데이터 | 2-3분 |

---

## 🎯 주요 KPI 목표

```
🎨 Frontend Architecture
  └─ Component Reusability: 80%+ ✅
  └─ Code Duplication: < 3% ✅

⚡ Performance
  └─ Lighthouse Score: 95+ ✅
  └─ LCP: < 2.5초 ✅
  └─ Bundle Size: < 200KB ✅

🔒 Security
  └─ Critical Vulnerabilities: 0 ✅
  └─ Security Headers: A+ ✅

📊 Data Quality
  └─ 완결성: 100% ✅
  └─ 대표 메뉴 채움률: 100% ✅

🔍 SEO
  └─ SEO Score: 90%+ ✅
  └─ Search Ranking: Top 10 ✅

✅ Quality Assurance
  └─ Quality Gates: 100% 통과 ✅
  └─ Bug Escape Rate: < 5% ✅
```

---

## 🔧 트러블슈팅

### 문제: "Permission denied"
```bash
# 실행 권한 부여
chmod +x .claude/agents/orchestrator.sh
chmod +x .claude/agents/**/*.sh
```

### 문제: "Agent not found"
```bash
# 사용 가능한 에이전트 확인
bash .claude/agents/orchestrator.sh --help
```

### 문제: 스크립트 실행 느림
```bash
# 병렬 실행 사용
bash .claude/agents/orchestrator.sh parallel agent1 agent2 agent3
```

---

## 📚 상세 문서

- **전체 아키텍처**: `.claude/agents/ARCHITECTURE.md`
- **에이전트별 지침서**: `.claude/agents/[agent-name]/instructions.md`
- **커맨드 가이드**: `.claude/commands/README.md`

---

## 💡 팁

1. **배포 전 필수**: `workflow pre-deploy`
2. **매일 실행**: `workflow daily`
3. **주간 리포트**: `workflow weekly`
4. **빠른 체크**: `parallel` 모드 활용
5. **KPI 추적**: `orchestrator.sh kpi`

---

## 🚀 다음 단계

### 1주차: 기본 익히기
- Daily workflow 매일 실행
- 각 에이전트 개별 실행 경험
- KPI 대시보드 확인

### 2주차: 자동화 구축
- GitHub Actions에 pre-deploy 연동
- Slack 알림 설정
- 주간 리포트 자동 생성

### 3주차: 고급 활용
- 커스텀 워크플로우 생성
- 에이전트 확장 (새 에이전트 추가)
- 메트릭 기반 개선

---

**Version**: 1.0.0
**Last Updated**: 2026-01-24
**Support**: `.claude/agents/README.md` 참조
