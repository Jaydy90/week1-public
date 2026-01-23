# Supabase 설정 가이드

Trust Route 웹앱에 Supabase 인증 및 댓글 시스템을 연동하는 방법입니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `trust-route` (또는 원하는 이름)
   - Database Password: 안전한 비밀번호 생성
   - Region: Northeast Asia (Seoul) 선택 권장
4. "Create new project" 클릭 (1-2분 소요)

## 2. 데이터베이스 스키마 설정

1. Supabase 대시보드에서 **SQL Editor** 메뉴 클릭
2. "New Query" 버튼 클릭
3. `schema.sql` 파일의 내용을 복사해서 붙여넣기
4. "Run" 버튼 클릭하여 실행
5. 성공 메시지 확인: "Success. No rows returned"

## 3. Google OAuth 설정 (구글 로그인)

1. Supabase 대시보드에서 **Authentication > Providers** 메뉴 클릭
2. "Google" 찾아서 클릭
3. "Enable Google Provider" 토글 활성화
4. Google Cloud Console에서 OAuth 2.0 클라이언트 생성:
   - [Google Cloud Console](https://console.cloud.google.com/) 이동
   - 프로젝트 생성 또는 선택
   - "APIs & Services > Credentials" 메뉴
   - "Create Credentials > OAuth 2.0 Client ID" 선택
   - Application type: "Web application"
   - Authorized redirect URIs에 Supabase 제공 URL 추가:
     - `https://<your-project-ref>.supabase.co/auth/v1/callback`
5. Client ID와 Client Secret을 복사해서 Supabase Google Provider 설정에 입력
6. "Save" 클릭

## 4. 환경변수 설정

### 로컬 개발 (테스트용)

1. 프로젝트 루트에 `.env.local` 파일 생성 (커밋하지 말 것!)
2. Supabase 대시보드에서 **Settings > API** 메뉴로 이동
3. 다음 값들을 복사해서 `.env.local`에 입력:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

4. `config.js` 파일 업데이트:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://your-project-ref.supabase.co',
  anonKey: 'your-anon-key-here'
};
```

### 배포 환경 (Cloudflare Pages)

1. Cloudflare Pages 대시보드로 이동
2. 프로젝트 선택 > **Settings > Environment variables** 메뉴
3. 다음 변수들 추가:

| Variable Name | Value | Production/Preview |
|--------------|-------|-------------------|
| `SUPABASE_URL` | `https://your-project-ref.supabase.co` | Both |
| `SUPABASE_ANON_KEY` | `your-anon-key-here` | Both |

4. "Save" 클릭
5. 프로젝트 재배포

> **주의**: Service Role Key는 절대 클라이언트에 노출하지 마세요!
> 현재는 정적 사이트이므로 Anon Key만 사용합니다.

## 5. 테스트

1. 로컬에서 웹사이트 실행 (또는 배포된 사이트 접속)
2. 우측 상단 "로그인" 버튼 클릭
3. 로그인 모달이 열리는지 확인
4. 이메일 회원가입/로그인 테스트
5. 구글 로그인 테스트
6. 상세 페이지에서 댓글 작성/수정/삭제 테스트

## 6. Row Level Security (RLS) 확인

Supabase 대시보드에서 **Authentication > Policies** 메뉴로 이동하여 다음 정책들이 생성되었는지 확인:

- ✅ Anyone can view comments
- ✅ Authenticated users can create comments
- ✅ Users can update their own comments
- ✅ Users can delete their own comments

## 7. 이메일 확인 설정 (선택사항)

기본적으로 Supabase는 이메일 회원가입 시 확인 이메일을 보냅니다.

개발/테스트 중 이메일 확인을 건너뛰려면:
1. **Authentication > Settings** 메뉴
2. "Enable email confirmations" 토글 비활성화

프로덕션에서는 반드시 활성화하세요!

## 8. 사용자 관리

Supabase 대시보드 **Authentication > Users** 메뉴에서:
- 가입한 사용자 목록 확인
- 수동으로 사용자 추가/삭제
- 이메일 확인 상태 관리
- 로그인 이력 확인

## 문제 해결

### "Supabase client not available" 에러
- `config.js`에서 URL과 Anon Key가 올바르게 설정되었는지 확인
- 브라우저 콘솔에서 `window.supabase` 객체가 로드되었는지 확인

### 구글 로그인이 작동하지 않음
- Google OAuth 클라이언트의 Authorized redirect URIs가 올바른지 확인
- Supabase Provider 설정에서 Client ID/Secret이 정확한지 확인

### 댓글이 보이지 않음
- 브라우저 개발자 도구 Console 탭에서 에러 확인
- Supabase 대시보드 **Database > Table Editor**에서 `comments` 테이블 확인
- RLS 정책이 올바르게 설정되었는지 확인

### CORS 에러
- Supabase는 기본적으로 모든 도메인에서 접근 가능
- 특정 도메인만 허용하려면 **Settings > API > CORS** 설정 변경

## 다음 단계

- [ ] 사용자 프로필 테이블 추가
- [ ] 북마크 동기화 (localStorage → Supabase)
- [ ] 신고 기능 데이터베이스 연동
- [ ] 이메일 템플릿 커스터마이징
- [ ] 구독 기능 (Stripe) 연동
