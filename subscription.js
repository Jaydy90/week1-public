// ========================================
// Trust Route - Subscription Module
// Stripe 구독 관리 기능
// Last updated: 2026-01-22
// ========================================

const SubscriptionModule = {
  stripe: null,

  // Stripe 초기화
  init() {
    if (!window.Stripe) {
      console.error('Stripe.js not loaded');
      return;
    }

    if (!STRIPE_CONFIG.publishableKey || STRIPE_CONFIG.publishableKey.includes('YOUR')) {
      console.warn('Stripe publishable key not configured');
      return;
    }

    this.stripe = Stripe(STRIPE_CONFIG.publishableKey);
    console.log('Stripe initialized');
  },

  // Checkout Session 생성 및 리다이렉트
  async createCheckoutSession() {
    try {
      // 로그인 확인
      if (!AuthModule.isAuthenticated()) {
        alert('로그인이 필요합니다.');
        return false;
      }

      // Stripe 초기화 확인
      if (!this.stripe) {
        alert('결제 시스템을 초기화할 수 없습니다.');
        return false;
      }

      // Price ID 확인
      if (!STRIPE_CONFIG.priceId || STRIPE_CONFIG.priceId.includes('YOUR')) {
        alert('구독 상품이 설정되지 않았습니다.');
        console.error('STRIPE_CONFIG.priceId not configured');
        return false;
      }

      const userId = AuthModule.getUserId();
      const successUrl = `${APP_CONFIG.url}/#mypage?session=success`;
      const cancelUrl = `${APP_CONFIG.url}/#mypage?session=cancel`;

      console.log('Creating checkout session...', {
        userId,
        priceId: STRIPE_CONFIG.priceId,
        successUrl,
        cancelUrl
      });

      // Cloudflare Workers API 호출
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          priceId: STRIPE_CONFIG.priceId,
          userId: userId,
          successUrl: successUrl,
          cancelUrl: cancelUrl
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();

      console.log('Checkout session created:', sessionId);

      // Stripe Checkout으로 리다이렉트
      if (url) {
        window.location.href = url;
      } else {
        const { error } = await this.stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw new Error(error.message);
        }
      }

      return true;

    } catch (error) {
      console.error('Checkout error:', error);
      alert(`구독 시작 중 오류가 발생했습니다: ${error.message}`);
      return false;
    }
  },

  // 현재 사용자의 구독 정보 가져오기
  async getSubscriptionStatus() {
    try {
      if (!AuthModule.isAuthenticated()) {
        return null;
      }

      const supabase = getSupabaseClient();
      const userId = AuthModule.getUserId();

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        // 구독이 없는 경우 (정상)
        if (error.code === 'PGRST116') {
          return null;
        }
        throw error;
      }

      return data;

    } catch (error) {
      console.error('Failed to get subscription status:', error);
      return null;
    }
  },

  // 구독 취소 (즉시 취소가 아닌 기간 만료 시 취소)
  async cancelSubscription() {
    try {
      if (!AuthModule.isAuthenticated()) {
        alert('로그인이 필요합니다.');
        return false;
      }

      const subscription = await this.getSubscriptionStatus();

      if (!subscription || !subscription.stripe_subscription_id) {
        alert('활성 구독이 없습니다.');
        return false;
      }

      if (!confirm('구독을 취소하시겠습니까? 현재 결제 기간이 끝나면 자동으로 종료됩니다.')) {
        return false;
      }

      // Cloudflare Workers API 호출
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripe_subscription_id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel subscription');
      }

      alert('구독이 취소되었습니다. 현재 결제 기간까지 서비스를 이용할 수 있습니다.');

      // 구독 상태 새로고침
      if (window.MypageScreen) {
        MypageScreen.loadSubscriptionStatus();
      }

      return true;

    } catch (error) {
      console.error('Cancel subscription error:', error);
      alert(`구독 취소 중 오류가 발생했습니다: ${error.message}`);
      return false;
    }
  },

  // Customer Portal 열기
  async openCustomerPortal() {
    try {
      if (!AuthModule.isAuthenticated()) {
        alert('로그인이 필요합니다.');
        return false;
      }

      const userId = AuthModule.getUserId();
      const returnUrl = `${APP_CONFIG.url}/#mypage`;

      // Cloudflare Workers API 호출
      const response = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          returnUrl: returnUrl
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create portal session');
      }

      const { url } = await response.json();

      // Customer Portal로 리다이렉트
      window.location.href = url;

      return true;

    } catch (error) {
      console.error('Customer portal error:', error);
      alert(`구독 관리 페이지를 열 수 없습니다: ${error.message}`);
      return false;
    }
  },

  // 구독 상태 확인 (활성/만료 등)
  isSubscriptionActive(subscription) {
    if (!subscription) return false;
    
    const activeStatuses = ['active', 'trialing'];
    const isStatusActive = activeStatuses.includes(subscription.status);
    
    // 기간 확인
    const currentPeriodEnd = new Date(subscription.current_period_end);
    const isPeriodValid = currentPeriodEnd > new Date();
    
    return isStatusActive && isPeriodValid;
  },

  // 구독 상태를 한글로 변환
  getStatusLabel(status) {
    const statusMap = {
      'active': '활성',
      'trialing': '체험 중',
      'past_due': '결제 실패',
      'canceled': '취소됨',
      'unpaid': '미결제',
      'incomplete': '미완료',
      'incomplete_expired': '만료됨'
    };
    return statusMap[status] || status;
  }
};
