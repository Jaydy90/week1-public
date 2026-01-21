/**
 * Stripe 구독 취소 API
 *
 * 역할: 사용자가 구독 취소 버튼을 누르면 구독을 취소 예약
 * 중요: 즉시 취소가 아닌 현재 기간 만료 시 취소 (cancel_at_period_end)
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

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
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return new Response(
        JSON.stringify({ error: 'Missing subscription ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. 구독 취소 (기간 만료 시)
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // 4. Supabase DB 업데이트
    if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        env.SUPABASE_URL,
        env.SUPABASE_SERVICE_ROLE_KEY
      );

      await supabase
        .from('subscriptions')
        .update({
          cancel_at_period_end: true,
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscriptionId);
    }

    // 5. 성공 응답
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Subscription will be canceled at period end',
        subscription: {
          id: subscription.id,
          cancel_at_period_end: subscription.cancel_at_period_end,
          current_period_end: subscription.current_period_end,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Cancel subscription error:', error);
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
