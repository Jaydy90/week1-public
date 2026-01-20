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
  // 프로덕션 URL을 명시적으로 설정 (localhost 방지)
  url: window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://kpopeats.cc',
  name: 'KPopEats'
};

// Stripe 설정
const STRIPE_CONFIG = {
  // TODO: 실제 Stripe publishable key로 교체 필요
  // 테스트: pk_test_... / 프로덕션: pk_live_...
  publishableKey: 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY',

  // TODO: Stripe Dashboard에서 생성한 Price ID로 교체
  // 예: price_1234567890abcdef (KPopEats Premium - ₩9,900/월)
  priceId: 'price_YOUR_PRICE_ID'
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
