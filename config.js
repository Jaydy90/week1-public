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
  // Stripe Publishable Key (Test mode)
  publishableKey: 'pk_test_51SrtnKGuLgjU9MPRtWD0TRoyDwc5ZdScIa1Q6IX9R2C5ER39Ltm7i4rtmS0Qqe7Vz44b5Ctqf2eaAlhAciql4vMB00namwSzzP',

  // ⚠️ TODO: Price ID로 교체 필요!
  // Product ID를 받았는데 Price ID가 필요합니다.
  // Stripe Dashboard > Products > prod_TpZk4wrWujzY38 클릭 > Pricing 섹션에서 price_xxx 복사
  priceId: 'prod_TpZk4wrWujzY38' // ← Price ID로 교체 필요 (price_xxx 형식)
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
