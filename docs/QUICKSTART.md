# ⚡ KPopEats 빠른 시작 가이드 (5분)

**목표**: 5분 안에 로컬에서 실행하고 기본 기능 확인하기

---

## 1단계: 로컬 서버 실행 (1분)

```bash
# 간단한 HTTP 서버 실행 (방법 1)
python -m http.server 3000

# 또는 npm 서버 사용 (방법 2)
npx serve . -p 3000
```

브라우저에서 http://localhost:3000 열기

✅ **성공**: 홈 화면과 레스토랑 리스트가 보이면 성공!

---

## 2단계: 기능 테스트 (2분)

### 기본 기능 (인증 없이 가능)
- [ ] 홈 화면에서 레스토랑 카드 확인
- [ ] 검색창에 "김밥" 입력 → 엔터
- [ ] 리스트 화면 필터 테스트 (미쉐린, 유명인, 흑백요리사)
- [ ] 레스토랑 카드 클릭 → 상세 정보 확인
- [ ] "바로 길찾기" 버튼 클릭 → 네이버 지도로 이동 확인

### 로그인 필요 기능
- [ ] 우측 상단 "로그인/회원가입" 클릭
- [ ] 이메일로 회원가입 (test@example.com / 123456)
- [ ] 상세 화면에서 후기 작성 테스트

---

## 3단계: Stripe 테스트 (선택사항, 2분)

### 사전 준비
1. `config.js` 열기
2. `STRIPE_CONFIG.publishableKey`를 실제 Stripe 키로 교체
3. `STRIPE_CONFIG.priceId`를 실제 Price ID로 교체

### 테스트
- [ ] 마이페이지 접속 (#mypage)
- [ ] "프리미엄으로 업그레이드" 버튼 클릭
- [ ] Stripe Checkout 로딩 확인

**⚠️ 주의**: Cloudflare Workers Functions (`/api/create-checkout-session`)은 로컬에서 작동하지 않습니다. 프로덕션 배포 후 테스트하세요.

---

## 🔧 빠른 설정 체크리스트

### 최소 설정 (로컬 테스트용)
- [x] Supabase 설정 완료 (config.js에 URL + anon key)
- [ ] Stripe 설정 (config.js에 publishableKey + priceId)

### 프로덕션 배포용
- [ ] Stripe 제품 생성 및 Price ID 발급
- [ ] Supabase 마이그레이션 실행 (`supabase db push`)
- [ ] Cloudflare Pages 배포
- [ ] Cloudflare 환경 변수 설정
- [ ] Stripe 웹훅 등록

---

## 📖 다음 단계

### 로컬 개발 계속하기
👉 [DEVELOPMENT.md](./DEVELOPMENT.md) - 개발 환경 설정 상세 가이드

### 프로덕션 배포하기
👉 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 판매 가능한 서비스로 배포하기

### 기술 문서 읽기
👉 [CLAUDE.md](./CLAUDE.md) - 프로젝트 철학 및 코딩 규칙
👉 [README.md](./README.md) - 프로젝트 개요

---

## ❓ 자주 묻는 질문

**Q: 로컬에서 구독 결제를 테스트할 수 있나요?**
A: 아니요. Cloudflare Workers Functions는 로컬에서 작동하지 않습니다. Cloudflare Pages에 배포한 후 테스트하세요.

**Q: Google 로그인이 안 돼요.**
A: Supabase 프로젝트에서 Google OAuth를 설정해야 합니다. [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 참고.

**Q: 데이터가 없어요.**
A: 현재 `data.js`에 하드코딩된 데이터를 사용합니다. Supabase로 마이그레이션하려면 별도 작업이 필요합니다.

---

**준비 완료! 🚀 이제 KPopEats를 탐험하세요!**
