# 🤖 Auto Agent Dispatcher

요청 타입을 자동으로 분석하여 적절한 전문 에이전트에게 위임하는 시스템

---

## 🎯 동작 방식

```
사용자 요청
    ↓
요청 분석 (키워드, 파일 타입, 작업 타입)
    ↓
에이전트 매칭 (단일 또는 병렬)
    ↓
Task tool로 에이전트 실행
    ↓
결과 통합 및 사용자에게 리포트
```

---

## 📋 요청 타입 분류

### Type 1: Feature Implementation (기능 구현)
**키워드**: "추가", "만들어", "구현", "기능", "버튼", "페이지"

**실행 에이전트** (병렬):
```javascript
[
  Task(subagent_type: "Plan", "아키텍처 설계"),
  Task(subagent_type: "general-purpose", "보안 검증"),
  Task(subagent_type: "Explore", "기존 패턴 탐색")
]
```

**출력 형식**:
```markdown
## 🏗️ Feature Implementation Plan

### 📐 Architecture (Plan Agent)
- 컴포넌트 구조: ...
- 데이터 플로우: ...

### 🔒 Security Review (General-purpose Agent)
- 취약점: 없음
- RLS 정책: 적용됨

### 🔍 Pattern Analysis (Explore Agent)
- 기존 패턴: Button component 재사용
- 권장 구조: ...
```

---

### Type 2: Data Operations (데이터 작업)
**키워드**: "데이터", "추가", "수정", "업데이트", "레스토랑", "메뉴"

**실행 에이전트** (순차):
```javascript
[
  Task(subagent_type: "Explore", "data.js 구조 분석"),
  Task(subagent_type: "general-purpose", "데이터 검증 및 수정")
]
```

**자동 실행**:
```bash
# 수정 후 자동으로
bash .claude/agents/data-engineer/data-validator.sh
```

---

### Type 3: Bug Fix (버그 수정)
**키워드**: "버그", "에러", "오류", "안 돼", "작동 안 함"

**실행 에이전트** (순차):
```javascript
[
  Task(subagent_type: "Explore", "버그 재현 및 원인 분석"),
  Task(subagent_type: "general-purpose", "수정 및 테스트"),
  Task(subagent_type: "Bash", "테스트 실행")
]
```

---

### Type 4: Performance Optimization (성능 최적화)
**키워드**: "느려", "성능", "최적화", "빠르게"

**실행 에이전트** (병렬):
```javascript
[
  Task(subagent_type: "Explore", "성능 병목 분석"),
  Task(subagent_type: "general-purpose", "번들 분석 및 최적화")
]
```

**자동 실행**:
```bash
bash .claude/commands/performance.sh
```

---

### Type 5: Security Audit (보안 감사)
**키워드**: "보안", "취약점", "XSS", "SQL", "인증"

**실행 에이전트**:
```javascript
Task(subagent_type: "general-purpose", "보안 감사 전체")
```

**자동 실행**:
```bash
bash .claude/commands/security-check.sh
```

---

### Type 6: Code Review (코드 리뷰)
**키워드**: "리뷰", "검토", "확인", "문제 있어?"

**실행 에이전트** (병렬):
```javascript
[
  Task(subagent_type: "Explore", "코드베이스 탐색"),
  Task(subagent_type: "general-purpose", "품질 분석")
]
```

---

### Type 7: Deployment (배포)
**키워드**: "배포", "deploy", "푸시", "릴리즈"

**실행 워크플로우** (순차):
```javascript
[
  Task(subagent_type: "general-purpose", "Pre-deploy 체크"),
  // Bash: orchestrator.sh workflow pre-deploy
  // Bash: git push
  Task(subagent_type: "general-purpose", "Post-deploy 검증")
]
```

---

## 🎨 에이전트별 역할 매핑

### Plan Agent
- 용도: 복잡한 기능의 구현 계획 수립
- 언제: 3개 이상 파일 수정, 아키텍처 결정 필요
- 출력: 단계별 구현 계획

### Explore Agent
- 용도: 코드베이스 탐색, 패턴 분석
- 언제: 기존 코드 이해 필요, 버그 원인 분석
- 속도: 빠름 (검색 특화)

### General-purpose Agent
- 용도: 일반적인 코딩 작업, 검증, 수정
- 언제: 단순 구현, 버그 수정, 데이터 수정
- 범위: 가장 넓음

### Bash Agent
- 용도: 명령어 실행, 스크립트 실행
- 언제: 테스트, 빌드, 배포, 검증 스크립트
- 속도: 가장 빠름

---

## 🔄 자동 디스패칭 로직

```javascript
// 유사 코드
function dispatchAgents(userRequest) {
  const keywords = extractKeywords(userRequest);
  const requestType = classifyRequest(keywords);

  switch(requestType) {
    case 'FEATURE':
      return [
        { agent: 'Plan', task: '아키텍처 설계', parallel: true },
        { agent: 'Explore', task: '패턴 분석', parallel: true },
        { agent: 'General', task: '구현' }
      ];

    case 'DATA':
      return [
        { agent: 'Explore', task: 'data.js 분석' },
        { agent: 'General', task: '데이터 수정' },
        { agent: 'Bash', task: 'data-validator 실행' }
      ];

    case 'BUG':
      return [
        { agent: 'Explore', task: '버그 재현' },
        { agent: 'General', task: '수정' },
        { agent: 'Bash', task: '테스트 실행' }
      ];

    // ... 나머지
  }
}
```

---

## 📊 실행 결과 포맷

```markdown
# 🤖 Multi-Agent Execution Report

## 📋 Request Analysis
- Type: Feature Implementation
- Complexity: High (3+ files)
- Estimated Time: 15 minutes

## 🚀 Agents Dispatched
1. ✅ Plan Agent (완료 - 3분)
2. ✅ Explore Agent (완료 - 2분)
3. ⏳ General-purpose Agent (진행 중)

## 📝 Consolidated Results

### 🏗️ Architecture Plan
[Plan Agent 결과]

### 🔍 Pattern Analysis
[Explore Agent 결과]

### 💻 Implementation
[General Agent 결과]

## ✅ Quality Checks
- Security: ✅ Pass
- Performance: ✅ Pass (+2KB)
- Accessibility: ✅ Pass
- Data Integrity: ✅ Pass

## 🎯 Overall Score: 98/100
```

---

## 🎓 학습 시스템

매 실행마다 학습:
- 어떤 에이전트 조합이 효과적이었나?
- 예상 시간 vs 실제 시간
- 사용자 만족도 (암묵적)

결과를 `AUTO_AGENT_LEARNING.json`에 저장하여 점진적 개선

---

## 🚨 에러 처리

에이전트 실패 시:
1. 재시도 (1회)
2. 대체 에이전트로 전환
3. 사용자에게 수동 개입 요청

```
⚠️ Plan Agent timeout (30s 초과)
→ Fallback: General-purpose Agent로 간단한 계획 수립
```

---

## 💡 확장 가능성

향후 추가 가능한 에이전트:
- **Test Agent**: E2E 테스트 자동 작성
- **Documentation Agent**: 자동 문서화
- **Refactor Agent**: 코드 리팩토링 전문
- **UI/UX Agent**: 디자인 시스템 준수 검증

---

## 🎯 목표

**1주차**: 자동 디스패칭 100% 달성
**2주차**: 에이전트 조합 최적화
**3주차**: 학습 시스템 가동
**4주차**: 사용자 만족도 95%+
