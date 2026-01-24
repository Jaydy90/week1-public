#!/bin/bash
# ========================================
# 데이터 백업 스크립트
# 사용법: /backup
# ========================================

set -e

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_$TIMESTAMP"

echo "💾 데이터 백업 시작..."
echo "================================"
echo ""

# 백업 디렉토리 생성
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

echo "📂 백업 디렉토리: $BACKUP_DIR/$BACKUP_NAME"
echo ""

# 1. 주요 파일 백업
echo "📋 1/4: 주요 파일 백업 중..."
FILES_TO_BACKUP=(
  "data.js"
  "config.js"
  "schema.sql"
  "CLAUDE.md"
  "SUPABASE_SETUP.md"
  "index.html"
)

for file in "${FILES_TO_BACKUP[@]}"; do
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$BACKUP_NAME/"
    echo "  ✅ $file"
  else
    echo "  ⚠️  $file (없음)"
  fi
done

echo ""

# 2. Supabase 데이터 백업 (댓글)
echo "🗄️  2/4: Supabase 데이터 백업 안내"
echo ""
echo "  댓글 데이터는 Supabase 대시보드에서 수동으로 백업하세요:"
echo "  1. https://supabase.com/dashboard/project/djmadubptsajvdvzpdvd"
echo "  2. Table Editor > comments 테이블"
echo "  3. Export as CSV"
echo ""

# 3. Git 상태 저장
echo "📊 3/4: Git 상태 저장 중..."
git status > "$BACKUP_DIR/$BACKUP_NAME/git_status.txt"
git log --oneline -n 20 > "$BACKUP_DIR/$BACKUP_NAME/git_log.txt"
echo "  ✅ Git 상태 저장됨"
echo ""

# 4. 환경 정보 저장
echo "⚙️  4/4: 환경 정보 저장 중..."
cat > "$BACKUP_DIR/$BACKUP_NAME/backup_info.txt" << EOF
백업 정보
=====================================
백업 일시: $(date)
Git 브랜치: $(git branch --show-current)
최근 커밋: $(git log -1 --oneline)
Node 버전: $(node --version 2>/dev/null || echo "미설치")
npm 버전: $(npm --version 2>/dev/null || echo "미설치")

백업된 파일:
$(ls -lh "$BACKUP_DIR/$BACKUP_NAME")
EOF

echo "  ✅ 환경 정보 저장됨"
echo ""

# 압축 (선택사항)
echo "🗜️  백업 압축 중..."
if command -v zip &> /dev/null; then
  cd "$BACKUP_DIR"
  zip -r "$BACKUP_NAME.zip" "$BACKUP_NAME" > /dev/null
  cd ..
  echo "  ✅ 압축 완료: $BACKUP_DIR/$BACKUP_NAME.zip"

  # 원본 디렉토리 삭제 여부
  read -p "  원본 디렉토리를 삭제하시겠습니까? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$BACKUP_DIR/$BACKUP_NAME"
    echo "  ✅ 원본 디렉토리 삭제됨"
  fi
else
  echo "  ⚠️  zip 명령어가 없습니다. 압축하지 않고 디렉토리로 보관됩니다."
fi

echo ""
echo "✅ 백업 완료!"
echo ""
echo "📁 백업 위치:"
if [ -f "$BACKUP_DIR/$BACKUP_NAME.zip" ]; then
  echo "   $BACKUP_DIR/$BACKUP_NAME.zip"
else
  echo "   $BACKUP_DIR/$BACKUP_NAME/"
fi
echo ""
echo "💡 복원 방법:"
echo "   백업 파일을 프로젝트 루트에 복사하세요"
echo ""
