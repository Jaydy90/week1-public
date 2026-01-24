#!/bin/bash
# ========================================
# Trust Route 멀티 에이전트 오케스트레이터
# 메인 실행 스크립트
# ========================================

set -e

VERSION="1.0.0"
AGENTS_DIR=".claude/agents"

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로고 출력
print_logo() {
  echo "╔════════════════════════════════════════════════╗"
  echo "║   Trust Route 멀티 에이전트 오케스트레이터   ║"
  echo "║              Version $VERSION                  ║"
  echo "╚════════════════════════════════════════════════╝"
  echo ""
}

# 도움말
print_help() {
  echo "사용법: ./orchestrator.sh [COMMAND] [OPTIONS]"
  echo ""
  echo "Commands:"
  echo "  run <agent>          단일 에이전트 실행"
  echo "  team <team>          팀 단위 실행"
  echo "  parallel <agents>    병렬 실행"
  echo "  workflow <type>      워크플로우 실행"
  echo "  status               에이전트 상태 확인"
  echo "  kpi                  KPI 대시보드"
  echo ""
  echo "Agents:"
  echo "  frontend-architect   프론트엔드 아키텍트"
  echo "  performance-engineer 성능 엔지니어"
  echo "  security-engineer    보안 엔지니어"
  echo "  qa-lead              QA 리드"
  echo "  data-engineer        데이터 엔지니어"
  echo ""
  echo "Teams:"
  echo "  product-engineering  제품 엔지니어링 (4명)"
  echo "  data-growth          데이터/성장 (3명)"
  echo "  security-infra       보안/인프라 (3명)"
  echo "  quality-assurance    품질 보증 (3명)"
  echo ""
  echo "Workflows:"
  echo "  daily                매일 실행 (보안, 데이터 검증)"
  echo "  weekly               매주 실행 (SEO, 성능 리포트)"
  echo "  pre-deploy           배포 전 품질 게이트"
  echo "  post-deploy          배포 후 스모크 테스트"
  echo "  full-audit           전체 감사 (모든 에이전트)"
  echo ""
  echo "Examples:"
  echo "  ./orchestrator.sh run frontend-architect"
  echo "  ./orchestrator.sh team product-engineering"
  echo "  ./orchestrator.sh workflow pre-deploy"
  echo "  ./orchestrator.sh parallel performance-engineer security-engineer"
  echo ""
}

# 단일 에이전트 실행
run_agent() {
  local agent=$1
  local task=$2

  echo -e "${BLUE}🤖 Agent: $agent${NC}"
  echo "================================"
  echo ""

  case $agent in
    frontend-architect)
      echo "🎨 Frontend Architect 실행 중..."
      bash "$AGENTS_DIR/frontend-architect/component-audit.sh"
      bash .claude/commands/analyze.sh
      ;;

    performance-engineer)
      echo "⚡ Performance Engineer 실행 중..."
      bash .claude/commands/performance.sh
      bash .claude/commands/image-optimize.sh
      ;;

    security-engineer)
      echo "🔒 Security Engineer 실행 중..."
      bash .claude/commands/security-scan.sh
      ;;

    qa-lead)
      echo "✅ QA Lead 실행 중..."
      bash .claude/commands/preview.sh
      ;;

    data-engineer)
      echo "📊 Data Engineer 실행 중..."
      bash "$AGENTS_DIR/data-engineer/data-validator.sh" 2>/dev/null || echo "⚠️  data-validator.sh not yet created"
      ;;

    seo-specialist)
      echo "🔍 SEO Specialist 실행 중..."
      bash .claude/commands/seo-check.sh
      ;;

    *)
      echo -e "${RED}❌ Unknown agent: $agent${NC}"
      echo "사용 가능한 에이전트 목록은 --help 참조"
      exit 1
      ;;
  esac

  echo ""
  echo -e "${GREEN}✅ $agent 완료${NC}"
  echo ""
}

# 팀 단위 실행
run_team() {
  local team=$1

  echo -e "${BLUE}👥 Team: $team${NC}"
  echo "================================"
  echo ""

  case $team in
    product-engineering)
      echo "🏗️  Product Engineering Team 실행..."
      run_agent frontend-architect
      run_agent performance-engineer
      ;;

    data-growth)
      echo "📈 Data & Growth Team 실행..."
      run_agent data-engineer
      run_agent seo-specialist
      ;;

    security-infra)
      echo "🔒 Security & Infrastructure Team 실행..."
      run_agent security-engineer
      ;;

    quality-assurance)
      echo "✅ Quality Assurance Team 실행..."
      run_agent qa-lead
      ;;

    *)
      echo -e "${RED}❌ Unknown team: $team${NC}"
      exit 1
      ;;
  esac

  echo -e "${GREEN}✅ Team $team 완료${NC}"
}

# 병렬 실행
run_parallel() {
  local agents=("$@")

  echo -e "${BLUE}⚡ 병렬 실행: ${agents[*]}${NC}"
  echo "================================"
  echo ""

  for agent in "${agents[@]}"; do
    run_agent "$agent" &
  done

  wait

  echo -e "${GREEN}✅ 병렬 실행 완료${NC}"
}

# 워크플로우 실행
run_workflow() {
  local workflow=$1

  echo -e "${BLUE}🔄 Workflow: $workflow${NC}"
  echo "================================"
  echo ""

  case $workflow in
    daily)
      echo "📅 Daily Workflow..."
      run_agent security-engineer
      run_agent data-engineer
      ;;

    weekly)
      echo "📅 Weekly Workflow..."
      run_agent seo-specialist
      run_agent performance-engineer
      bash .claude/commands/status.sh
      ;;

    pre-deploy)
      echo "🚀 Pre-Deploy Quality Gate..."
      bash .claude/commands/test-build.sh
      run_agent security-engineer
      run_agent performance-engineer
      run_agent qa-lead
      ;;

    post-deploy)
      echo "🏁 Post-Deploy Smoke Test..."
      echo "Checking https://kpopeats.cc..."
      curl -I https://kpopeats.cc || echo "⚠️  Site check failed"
      ;;

    full-audit)
      echo "🔍 Full Audit (모든 에이전트)..."
      run_agent frontend-architect
      run_agent performance-engineer
      run_agent security-engineer
      run_agent data-engineer
      run_agent seo-specialist
      run_agent qa-lead
      ;;

    *)
      echo -e "${RED}❌ Unknown workflow: $workflow${NC}"
      exit 1
      ;;
  esac

  echo -e "${GREEN}✅ Workflow $workflow 완료${NC}"
}

# 에이전트 상태 확인
check_status() {
  echo "📊 에이전트 상태 확인"
  echo "================================"
  echo ""

  bash .claude/commands/status.sh
}

# KPI 대시보드
show_kpi() {
  echo "📊 KPI Dashboard"
  echo "================================"
  echo ""

  cat << 'EOF'
┌─────────────────────────────────────────────┐
│           Trust Route KPI Dashboard         │
└─────────────────────────────────────────────┘

🎨 Frontend Architecture
  Component Reusability: --% (목표: 80%)
  Code Duplication: --% (목표: <3%)

⚡ Performance
  Lighthouse Score: -- (목표: 95+)
  LCP: --s (목표: <2.5s)
  Bundle Size: 143KB (목표: <200KB)

🔒 Security
  Critical Vulnerabilities: -- (목표: 0)
  Security Headers: -- (목표: A+)

📊 Data Quality
  완결성: --% (목표: 100%)
  대표 메뉴: --% (목표: 100%)

🔍 SEO
  SEO Score: --% (목표: 90%)
  Search Ranking: -- (목표: Top 10)

✅ Quality
  Quality Gates Pass: --% (목표: 100%)
  Bug Escape Rate: --% (목표: <5%)

EOF

  echo "💡 상세 지표는 각 에이전트를 실행하세요:"
  echo "   ./orchestrator.sh run performance-engineer"
  echo ""
}

# 메인 로직
main() {
  print_logo

  if [ $# -eq 0 ]; then
    print_help
    exit 0
  fi

  case $1 in
    run)
      if [ -z "$2" ]; then
        echo -e "${RED}❌ Agent name required${NC}"
        exit 1
      fi
      run_agent "$2" "${@:3}"
      ;;

    team)
      if [ -z "$2" ]; then
        echo -e "${RED}❌ Team name required${NC}"
        exit 1
      fi
      run_team "$2"
      ;;

    parallel)
      if [ -z "$2" ]; then
        echo -e "${RED}❌ At least one agent required${NC}"
        exit 1
      fi
      run_parallel "${@:2}"
      ;;

    workflow)
      if [ -z "$2" ]; then
        echo -e "${RED}❌ Workflow type required${NC}"
        exit 1
      fi
      run_workflow "$2"
      ;;

    status)
      check_status
      ;;

    kpi)
      show_kpi
      ;;

    --help|-h)
      print_help
      ;;

    *)
      echo -e "${RED}❌ Unknown command: $1${NC}"
      print_help
      exit 1
      ;;
  esac
}

# 스크립트 실행
main "$@"
