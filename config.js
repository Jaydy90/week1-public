// ========================================
// Trust Route - Configuration
// ========================================

// Supabase 설정
// 실제 배포 시에는 환경변수로 관리하거나 Cloudflare Pages 환경변수 사용
const SUPABASE_CONFIG = {
  url: 'https://your-project.supabase.co', // TODO: 실제 Supabase URL로 교체
  anonKey: 'your-anon-key-here' // TODO: 실제 Supabase Anon Key로 교체
};

// 앱 설정
const APP_CONFIG = {
  url: window.location.origin,
  name: 'Trust Route'
};

// Supabase 클라이언트 초기화
let supabaseClient = null;

// Supabase 클라이언트 가져오기 (지연 초기화)
function getSupabaseClient() {
  if (!supabaseClient && window.supabase) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_CONFIG.url,
      SUPABASE_CONFIG.anonKey
    );
  }
  return supabaseClient;
}
