/**
 * Cloudflare Workers - Stripe Checkout Session 생성 API
 *
 * POST /functions/create-checkout-session
 * Body: { userId, priceId, successUrl, cancelUrl }
 */

import Stripe from 'stripe';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 환경 변수 확인
    const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;

    if (!STRIPE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: 'Stripe not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { userId, priceId, successUrl, cancelUrl } = body;

    if (!userId || !priceId || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Stripe 초기화
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia'
    });

    // Checkout Session 생성
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId, // 웹훅에서 user_id 추출용
      metadata: {
        user_id: userId,
        price_id: priceId
      },
      // 고객 이메일 미리 채우기 (Supabase에서 가져올 수 있음)
      // customer_email: userEmail
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Create checkout session error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
