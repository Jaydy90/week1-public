// ========================================
// Trust Route - Authentication Module
// ========================================

const AuthModule = {
  currentUser: null,

  // 초기화
  async init() {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn('Supabase client not available');
      // Supabase가 없어도 초기 UI 상태는 설정
      this.onAuthStateChange(null);
      return;
    }

    console.log('AuthModule initializing...');
    console.log('Current URL:', window.location.href);
    console.log('Hash fragment:', window.location.hash);

    // OAuth 리다이렉트 후 hash에서 토큰 확인
    if (window.location.hash && window.location.hash.includes('access_token')) {
      console.log('OAuth callback detected, processing tokens...');

      // Supabase가 자동으로 hash를 처리할 시간을 줌
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 현재 세션 확인
    const { data: { session }, error } = await supabase.auth.getSession();

    console.log('Session check:', {
      hasSession: !!session,
      error: error,
      user: session?.user?.email
    });

    if (session) {
      this.currentUser = session.user;
      this.onAuthStateChange(session.user);

      // hash fragment 제거 (깨끗한 URL로 만들기)
      if (window.location.hash.includes('access_token')) {
        console.log('Cleaning up URL hash...');
        window.history.replaceState(null, '', window.location.pathname + '#home');
      }
    } else {
      // 세션이 없으면 로그아웃 상태 UI 표시
      this.onAuthStateChange(null);
    }

    // 인증 상태 변경 리스너
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, 'User:', session?.user?.email);
      this.currentUser = session?.user || null;
      this.onAuthStateChange(this.currentUser);

      // 로그인 성공 시 hash 정리
      if (event === 'SIGNED_IN' && window.location.hash.includes('access_token')) {
        console.log('Sign in successful, cleaning URL...');
        window.history.replaceState(null, '', window.location.pathname + '#home');
      }
    });
  },

  // 인증 상태 변경 시 UI 업데이트
  onAuthStateChange(user) {
    if (user) {
      this.showLoggedInUI(user);
    } else {
      this.showLoggedOutUI();
    }
  },

  // 로그인 상태 UI
  showLoggedInUI(user) {
    // 로그인 버튼 숨기고 사용자 정보 표시
    const loginPrompt = document.getElementById('login-prompt');
    const commentForm = document.getElementById('comment-form');

    if (loginPrompt) loginPrompt.style.display = 'none';
    if (commentForm) commentForm.style.display = 'block';

    // 헤더에 사용자 정보 표시 (선택사항)
    this.updateUserDisplay(user);
  },

  // 로그아웃 상태 UI
  showLoggedOutUI() {
    const loginPrompt = document.getElementById('login-prompt');
    const commentForm = document.getElementById('comment-form');

    if (loginPrompt) loginPrompt.style.display = 'block';
    if (commentForm) commentForm.style.display = 'none';

    this.updateUserDisplay(null);
  },

  // 헤더 사용자 표시 업데이트
  updateUserDisplay(user) {
    const userNameEl = document.getElementById('user-name');
    if (userNameEl) {
      if (user) {
        const displayName = user.email.split('@')[0];
        userNameEl.textContent = displayName;
      } else {
        userNameEl.textContent = '로그인/회원가입';
      }
    }
    console.log('User display updated:', user?.email || 'Guest');
  },

  // 이메일/비밀번호 회원가입
  async signUp(email, password) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not initialized');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${APP_CONFIG.url}/#home`
      }
    });

    if (error) throw error;
    return data;
  },

  // 이메일/비밀번호 로그인
  async signIn(email, password) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not initialized');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  // 구글 로그인
  async signInWithGoogle() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not initialized');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${APP_CONFIG.url}/#home`
      }
    });

    if (error) throw error;
    return data;
  },

  // 로그아웃
  async signOut() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not initialized');

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 현재 사용자 확인
  isAuthenticated() {
    return !!this.currentUser;
  },

  // 사용자 ID 가져오기
  getUserId() {
    return this.currentUser?.id || null;
  },

  // 사용자 이메일 가져오기
  getUserEmail() {
    return this.currentUser?.email || null;
  }
};
