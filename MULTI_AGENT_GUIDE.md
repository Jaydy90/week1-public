# 멀티 에이전트 오케스트레이션 가이드

> **목표**: Claude Code의 여러 에이전트를 병렬로 실행하여 개발 속도를 극대화합니다.

---

## 🎯 멀티 에이전트 전략

### 개념

Claude Code는 **단일 대화형 에이전트**지만, **Task tool을 사용한 서브 에이전트** 생성으로 병렬 작업을 구현할 수 있습니다.

```
Main Agent (Claude Code)
├─ Agent 1: 테스트 실행 (Bash agent)
├─ Agent 2: 문서 작성 (general-purpose agent)
├─ Agent 3: 코드베이스 탐색 (Explore agent)
└─ Agent 4: UI 검증 (Chrome DevTools agent via MCP)
```

---

## 🔧 구현 방법

### 1. Task Tool 활용

Claude Code의 `Task` tool을 사용하여 서브 에이전트를 생성합니다.

**예시: 병렬로 3개 작업 실행**

```
User: "테스트 실행, 문서 업데이트, 코드베이스 탐색을 병렬로 실행해줘"

Claude: [Task tool을 3번 호출 - 단일 메시지로]
- Task 1: subagent_type="Bash", prompt="Run npm test"
- Task 2: subagent_type="general-purpose", prompt="Update README.md"
- Task 3: subagent_type="Explore", prompt="Find all API endpoints"
```

### 2. Chrome Extension 통합 (MCP)

Chrome DevTools MCP 서버를 통해 브라우저 자동화를 추가할 수 있습니다.

**MCP 서버 설정** (이미 `.mcp.json`에 구성됨):

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-chrome-devtools"]
    }
  }
}
```

**사용 예시**:

```javascript
// Claude Code에서 Chrome MCP 도구 사용
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
mcp__chrome-devtools__take_snapshot({})
mcp__chrome-devtools__click({ uid: "subscribe-button-123" })
```

---

## 🚀 실전 워크플로우

### 워크플로우 1: 자동화 테스트 + 배포

**목표**: 코드 변경 → 테스트 → 배포를 자동화

```
1. Main Agent: 코드 수정
2. Agent 1 (Bash): npm test 실행
3. Agent 2 (Chrome): UI 자동 검증
4. Agent 3 (Bash): Git commit + push
5. Cloudflare Pages: 자동 배포
```

**구현**:

```bash
# Claude Code에게 요청
"다음 작업들을 병렬로 실행해줘:
1. Playwright 테스트 실행
2. Chrome에서 로컬 서버 접속해서 구독 버튼 클릭 테스트
3. 성공 시 git commit 및 push"
```

### 워크플로우 2: 코드 리뷰 + 리팩토링

**목표**: PR 생성 시 자동 코드 리뷰 및 개선

```
1. Agent 1 (Explore): 변경된 파일 분석
2. Agent 2 (general-purpose): ESLint 실행 및 문제점 추출
3. Agent 3 (general-purpose): 리팩토링 제안 작성
4. Main Agent: PR 코멘트 작성
```

### 워크플로우 3: 구독 플로우 E2E 테스트

**목표**: Stripe 구독 전체 플로우 자동 검증

```
1. Agent 1 (Bash): 로컬 서버 시작
2. Agent 2 (Chrome): 브라우저에서 회원가입
3. Agent 3 (Chrome): 구독하기 버튼 클릭
4. Agent 4 (Chrome): Stripe Checkout 페이지 확인
5. Agent 5 (general-purpose): Supabase에서 구독 데이터 확인
```

---

## 📚 추천 리소스

### 1. Claude Flow (멀티 에이전트 프레임워크)

https://github.com/ruvnet/claude-flow

**특징**:
- 여러 Claude 인스턴스를 오케스트레이션
- 상태 관리 및 메시지 큐
- 병렬 작업 스케줄링

**설치**:
```bash
npm install claude-flow
```

**사용 예시**:
```javascript
const { ClaudeFlow } = require('claude-flow');

const flow = new ClaudeFlow({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// 3개 에이전트 병렬 실행
await flow.parallel([
  { task: 'Run tests', agent: 'test-runner' },
  { task: 'Update docs', agent: 'doc-writer' },
  { task: 'Analyze code', agent: 'code-analyzer' }
]);
```

### 2. Awesome Claude Code Subagents

https://github.com/VoltAgent/awesome-claude-code-subagents

**100+ 전문 에이전트 템플릿**:
- `test-runner`: 자동 테스트 실행
- `doc-writer`: 문서 자동 생성
- `security-auditor`: 보안 취약점 스캔
- `performance-optimizer`: 성능 최적화 제안

### 3. Claude API (직접 호출)

Anthropic API를 직접 호출하여 멀티 에이전트 구현:

```python
import anthropic

client = anthropic.Anthropic(api_key="...")

# Agent 1: 테스트 실행
response1 = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    messages=[{"role": "user", "content": "Run npm test"}]
)

# Agent 2: 문서 작성
response2 = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    messages=[{"role": "user", "content": "Update README"}]
)
```

---

## ⚙️ 실전 설정

### Step 1: MCP 서버 확인

`.mcp.json` 파일에서 사용 가능한 MCP 서버 확인:

```json
{
  "mcpServers": {
    "chrome-devtools": { ... },
    "context7": { ... },
    "ide": { ... }
  }
}
```

### Step 2: 자동화 스크립트 작성

`automation/run-parallel.sh`:

```bash
#!/bin/bash

# 3개 작업 병렬 실행
npm test &
PID1=$!

claude code "Update documentation" &
PID2=$!

claude code "Analyze codebase for security issues" &
PID3=$!

# 모든 작업 완료 대기
wait $PID1 $PID2 $PID3

echo "All agents completed!"
```

### Step 3: GitHub Actions 통합

`.github/workflows/multi-agent.yml`:

```yaml
name: Multi-Agent CI

on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Agent 1: 테스트
      - name: Run Tests
        run: npm test

      # Agent 2: Lint
      - name: Run Linter
        run: npm run lint

      # Agent 3: Build
      - name: Build
        run: npm run build

  # 병렬 실행
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: ./deploy.sh
```

---

## 🎨 Best Practices

### 1. 에이전트 역할 분리

각 에이전트에게 **명확한 단일 책임**을 부여:

```
❌ Bad: "코드 작성하고 테스트하고 배포해줘"
✅ Good:
  - Agent 1: "코드 작성"
  - Agent 2: "테스트 실행"
  - Agent 3: "배포"
```

### 2. 의존성 관리

순차 실행이 필요한 작업은 **체이닝**:

```javascript
// 1단계: 코드 작성
await agent1.writeCode();

// 2단계: 코드 작성 완료 후 테스트 (의존성 있음)
await agent2.runTests();

// 3단계: 테스트 통과 후 배포
await agent3.deploy();
```

병렬 가능한 작업은 **동시 실행**:

```javascript
// 독립적인 작업들
await Promise.all([
  agent1.runTests(),
  agent2.lintCode(),
  agent3.updateDocs()
]);
```

### 3. 에러 핸들링

각 에이전트의 실패를 개별적으로 처리:

```javascript
try {
  await agent1.task();
} catch (err) {
  console.error('Agent 1 failed:', err);
  // 재시도 또는 대체 전략
  await agent1Fallback.task();
}
```

### 4. 모니터링

에이전트 실행 로그를 중앙 집중화:

```javascript
const logger = new AgentLogger();

logger.log('Agent 1 started');
await agent1.task();
logger.log('Agent 1 completed');
```

---

## 🔄 자동 재시도 전략

### Playwright 재시도 (이미 구현됨)

`automation/playwright.config.js`:

```javascript
module.exports = defineConfig({
  retries: 3, // 실패 시 최대 3번 재시도
  timeout: 60 * 1000
});
```

### GitHub Actions 재시도

`.github/workflows/test.yml`:

```yaml
- name: Run Tests
  uses: nick-invision/retry@v2
  with:
    timeout_minutes: 10
    max_attempts: 3
    command: npm test
```

### 커스텀 재시도 로직

```javascript
async function retryTask(taskFn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await taskFn();
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      console.log(`Retry ${i + 1}/${maxRetries}`);
      await sleep(1000 * (i + 1)); // Exponential backoff
    }
  }
}

// 사용
await retryTask(() => agent.runTests(), 5);
```

---

## 📊 성능 최적화

### 병렬 실행 권장 사항

| 작업 타입 | 병렬화 가능? | 예시 |
|----------|------------|------|
| 독립적인 테스트 | ✅ Yes | Unit tests, E2E tests |
| 문서 생성 | ✅ Yes | README, API docs |
| Lint + Format | ✅ Yes | ESLint, Prettier |
| 빌드 | ❌ No (순차) | Webpack, TypeScript |
| 배포 | ❌ No (빌드 후) | Cloudflare Pages |

---

## 🎯 Trust Route 적용 예시

### 시나리오: 새 기능 배포

```
1. [Main Agent] 코드 작성: subscription.js 수정
2. [병렬 실행]
   - Agent 1 (Bash): npm run lint
   - Agent 2 (Bash): npm test
   - Agent 3 (Chrome): UI 자동 검증
3. [순차 실행]
   - Agent 4 (Bash): git commit
   - Agent 5 (Bash): git push
4. [Cloudflare] 자동 배포
5. [Agent 6 (general-purpose)] 배포 성공 알림
```

**실행 명령**:

```bash
# Claude Code에게 요청
"subscription.js를 수정한 후,
 lint, test, UI 검증을 병렬로 실행하고,
 모두 성공하면 git commit & push 해줘"
```

---

## 📝 요약

### 핵심 포인트

1. **Task tool 활용**: Claude Code의 서브 에이전트 생성
2. **병렬 실행**: 독립적인 작업은 동시에
3. **재시도 전략**: Playwright + GitHub Actions 자동 재시도
4. **MCP 통합**: Chrome DevTools로 UI 자동화
5. **모니터링**: 로그 + GitHub Actions artifacts

### 다음 단계

- [ ] `automation/` 디렉토리에서 `npm install` 실행
- [ ] Playwright 테스트 실행: `npm test`
- [ ] GitHub Actions 워크플로우 확인
- [ ] MCP 서버 활성화 확인 (`claude --mcp-status`)
- [ ] 첫 번째 멀티 에이전트 워크플로우 실행

**준비 완료!** 🚀