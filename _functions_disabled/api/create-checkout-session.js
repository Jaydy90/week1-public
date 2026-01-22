/**
 * Stripe Checkout Session 생성 API
 *
 * 역할: 사용자가 구독 시작 버튼을 누르면 Stripe Checkout으로 리다이렉트
 * 중요: userId를 metadata에 저장하여 웹훅에서 사용
 */

import Stripe from 'stripe';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 1. Stripe 클라이언트 초기화
    if (!env.STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: 'Stripe not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    // 2. 요청 바디 파싱
    const { priceId, userId, successUrl, cancelUrl } = await request.json();

    if (!priceId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Checkout Session 생성
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${env.APP_URL}/#profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${env.APP_URL}/#profile`,

      // 중요: 사용자 ID를 metadata에 저장 (웹훅에서 사용)
      client_reference_id: userId,
      metadata: {
        user_id: userId,
      },

      // 구독 옵션
      subscription_data: {
        metadata: {
          user_id: userId,
        },
      },

      // 자동으로 세금 계산 (선택사항)
      automatic_tax: {
        enabled: false, // 필요시 true로 변경
      },

      // 고객 이메일 자동 입력 (선택사항)
      // customer_email: 'user@example.com',
    });

    // 4. Session ID 반환
    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Checkout session creation error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
