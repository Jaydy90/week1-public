/**
 * Subscription Module - Stripe Checkout Integration
 *
 * 클라이언트 사이드 구독 관리 모듈 (vanilla JS)
 */

const SubscriptionModule = (() => {
  let stripe = null;
  let currentUser = null;

  /**
   * 초기화
   */
  function init() {
    // Stripe.js는 index.html에서 CDN으로 로드됨
    if (typeof Stripe === 'undefined') {
      console.error('Stripe.js not loaded');
      return;
    }

    // config.js에서 Stripe Publishable Key 가져오기
    const publishableKey = STRIPE_CONFIG.publishableKey;
    if (!publishableKey) {
      console.error('Stripe publishable key not configured');
      return;
    }

    stripe = Stripe(publishableKey);

    // 현재 사용자 확인
    updateUserState();

    // 인증 상태 변경 감지
    AuthModule.onAuthStateChange(updateUserState);
  }

  /**
   * 사용자 상태 업데이트
   */
  function updateUserState() {
    currentUser = AuthModule.currentUser;

    if (currentUser) {
      loadSubscriptionStatus();
    }
  }

  /**
   * 구독 상태 조회
   */
  async function loadSubscriptionStatus() {
    try {
      const { data: subscription, error } = await supabaseClient
        .from('subscriptions')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = row not found (정상)
        throw error;
      }

      updateSubscriptionUI(subscription);
    } catch (err) {
      console.error('Failed to load subscription:', err);
    }
  }

  /**
   * 구독 UI 업데이트
   */
  function updateSubscriptionUI(subscription) {
    const statusEl = document.getElementById('subscription-status');
    const subscribeBtn = document.getElementById('subscribe-button');
    const manageBtn = document.getElementById('manage-subscription-button');

    if (!statusEl || !subscribeBtn || !manageBtn) return;

    if (!subscription) {
      // 구독 없음
      statusEl.textContent = '무료 플랜';
      statusEl.className = 'subscription-status free';
      subscribeBtn.style.display = 'inline-block';
      manageBtn.style.display = 'none';
    } else if (subscription.status === 'active' || subscription.status === 'trialing') {
      // 활성 구독
      statusEl.textContent = '프리미엄 구독 중';
      statusEl.className = 'subscription-status premium';
      subscribeBtn.style.display = 'none';
      manageBtn.style.display = 'inline-block';

      // 구독 만료일 표시
      const endDate = new Date(subscription.current_period_end);
      const endDateStr = endDate.toLocaleDateString('ko-KR');
      const expiryEl = document.getElementById('subscription-expiry');
      if (expiryEl) {
        expiryEl.textContent = `다음 결제일: ${endDateStr}`;
      }
    } else {
      // 구독 만료/취소
      statusEl.textContent = '구독 만료';
      statusEl.className = 'subscription-status expired';
      subscribeBtn.style.display = 'inline-block';
      manageBtn.style.display = 'none';
    }
  }

  /**
   * Stripe Checkout 세션 생성 및 이동
   */
  async function createCheckoutSession() {
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      ModalController.openLoginModal();
      return;
    }

    try {
      // Stripe Checkout 세션 생성 API 호출
      // Note: Cloudflare Workers에 별도 엔드포인트 구현 필요
      const response = await fetch('/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser.id,
          priceId: STRIPE_CONFIG.priceId,
          successUrl: `${window.location.origin}?checkout=success`,
          cancelUrl: `${window.location.origin}?checkout=cancel`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Stripe Checkout으로 리디렉션
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('결제 페이지로 이동하는 중 오류가 발생했습니다.');
    }
  }

  /**
   * Customer Portal로 이동 (구독 관리)
   */
  async function openCustomerPortal() {
    try {
      // Customer Portal 세션 생성 API 호출
      const response = await fetch('/functions/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser.id,
          returnUrl: window.location.origin
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();

      // Customer Portal로 이동
      window.location.href = url;
    } catch (err) {
      console.error('Portal error:', err);
      alert('구독 관리 페이지로 이동하는 중 오류가 발생했습니다.');
    }
  }

  /**
   * Checkout 결과 처리 (URL 쿼리 파라미터)
   */
  function handleCheckoutResult() {
    const urlParams = new URLSearchParams(window.location.search);
    const checkoutStatus = urlParams.get('checkout');

    if (checkoutStatus === 'success') {
      alert('구독이 시작되었습니다! 프리미엄 기능을 이용하실 수 있습니다.');
      // URL 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);
      loadSubscriptionStatus();
    } else if (checkoutStatus === 'cancel') {
      alert('결제가 취소되었습니다.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // Public API
  return {
    init,
    createCheckoutSession,
    openCustomerPortal,
    handleCheckoutResult,
    loadSubscriptionStatus
  };
})();

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  SubscriptionModule.init();
  SubscriptionModule.handleCheckoutResult();
});
