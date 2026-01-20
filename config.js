// ========================================
// Trust Route - Configuration
// ========================================

// Supabase 설정
const SUPABASE_CONFIG = {
  url: 'https://djmadubptsajvdvzpdvd.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqbWFkdWJwdHNhanZkdnpwZHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTU5NjAsImV4cCI6MjA4NDQ3MTk2MH0.vdYR60_4woWbTHZIL2K9idfhfQ0BOr6ZWr5iQvth2cQ'
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
