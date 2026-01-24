#!/bin/bash
# ========================================
# 커맨드 도움말 스크립트
# 사용법: /help
# ========================================

echo "🛠️  Trust Route 커맨드 가이드"
echo "================================"
echo ""

cat << 'EOF'
📦 Git & 배포
----------------
  /commit-push [타입] "메시지"    커밋 + 푸시 (타입: feat, fix, chore 등)
  /deploy                         테스트 + 배포
  /quick-fix "수정내용"           빠른 수정 + 즉시 배포

🧪 테스트 & 검증
----------------
  /test-build                     빌드 검증 (JS 구문, 파일 체크)
  /preview                        배포 전 프리뷰 체크리스트
  /analyze                        코드 품질 분석 (보안, 중복 등)
  /seo-check                      SEO 메타태그 검증
  /image-optimize                 이미지 최적화 분석
  /performance                    성능 측정 및 분석
  /security-scan                  보안 취약점 스캔

🍽️  맛집 데이터 관리
----------------
  /add-restaurant                 새 맛집 추가 (인터랙티브)
  /update-menu "식당명"           대표 메뉴 업데이트

🗄️  데이터베이스
----------------
  /db-migrate                     Supabase 마이그레이션 실행
  /backup                         데이터 백업

🌐 로컬 개발
----------------
  /local-server [포트]            로컬 개발 서버 실행 (기본: 8000)
  /clean                          캐시 및 임시 파일 정리

📊 프로젝트 관리
----------------
  /status                         프로젝트 전체 상태 확인
  /help                           이 도움말 표시

EOF

echo ""
echo "💡 사용 예시"
echo "================================"
echo ""

cat << 'EOF'
1. 새 기능 개발 후 배포:
   $ /preview                       # 배포 전 체크
   $ /commit-push feat "Add filter" # 커밋 + 푸시
   $ /deploy                        # 배포

2. 버그 빠른 수정:
   $ /quick-fix "Fix button style"  # 수정 + 즉시 배포

3. 맛집 추가:
   $ /add-restaurant                # 인터랙티브 입력
   $ /test-build                    # 검증
   $ /commit-push feat "Add new restaurant"

4. 대표 메뉴 업데이트:
   $ /update-menu "밍글스"
   $ /commit-push fix "Update menu for Mingles"

5. 로컬 테스트:
   $ /local-server 8000             # 서버 시작
   $ (브라우저에서 http://localhost:8000)

EOF

echo ""
echo "🔗 유용한 링크"
echo "================================"
echo ""
echo "  프로덕션:  https://kpopeats.cc"
echo "  개발 환경:  https://week1-public.pages.dev"
echo "  Cloudflare: https://dash.cloudflare.com/pages"
echo "  Supabase:   https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd"
echo ""
echo "📖 자세한 문서: CLAUDE.md 파일 참조"
echo ""
