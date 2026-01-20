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

    // 현재 세션 확인
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      this.currentUser = session.user;
      this.onAuthStateChange(session.user);
    } else {
      // 세션이 없으면 로그아웃 상태 UI 표시
      this.onAuthStateChange(null);
    }

    // 인증 상태 변경 리스너
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      this.currentUser = session?.user || null;
      this.onAuthStateChange(this.currentUser);
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
