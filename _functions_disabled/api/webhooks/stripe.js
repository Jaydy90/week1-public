/**
 * Stripe Webhook Handler (Cloudflare Pages Function)
 *
 * 역할: Stripe 이벤트를 안전하게 수신하고 처리
 * 중요: 서명 검증 + Idempotency + DB 업데이트
 *
 * 처리 이벤트:
 * - checkout.session.completed: 구독 시작
 * - customer.subscription.created: 구독 생성
 * - customer.subscription.updated: 구독 변경 (갱신/취소 예약 등)
 * - customer.subscription.deleted: 구독 삭제
 * - invoice.payment_succeeded: 결제 성공
 * - invoice.payment_failed: 결제 실패
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Stripe 클라이언트 초기화
const getStripe = (env) => {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY not configured');
  }
  return new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
};

// Supabase 클라이언트 초기화 (service role)
const getSupabase = (env) => {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase configuration missing');
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
};

/**
 * Idempotency 체크: 이미 처리한 이벤트인지 확인
 */
async function isEventProcessed(supabase, eventId) {
  const { data, error } = await supabase
    .from('stripe_events')
    .select('stripe_event_id')
    .eq('stripe_event_id', eventId)
    .single();

  return !!data;
}

/**
 * 이벤트 기록 (idempotency 보장)
 */
async function recordEvent(supabase, eventId, eventType) {
  const { error } = await supabase
    .from('stripe_events')
    .insert({
      stripe_event_id: eventId,
      type: eventType,
      received_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Failed to record event:', error);
    throw error;
  }
}

/**
 * 구독 정보를 DB에 업데이트 (진실의 원천)
 */
async function upsertSubscription(supabase, subscription, userId) {
  const subscriptionData = {
    user_id: userId,
    stripe_customer_id: subscription.customer,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
    price_id: subscription.items.data[0]?.price.id,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id',
    });

  if (error) {
    console.error('Failed to upsert subscription:', error);
    throw error;
  }

  console.log(`✅ Subscription ${subscription.id} updated for user ${userId}`);
}

/**
 * 구독 취소 처리
 */
async function cancelSubscription(supabase, subscriptionId) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscriptionId);

  if (error) {
    console.error('Failed to cancel subscription:', error);
    throw error;
  }

  console.log(`✅ Subscription ${subscriptionId} canceled`);
}

/**
 * 메인 웹훅 핸들러
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 1. 서명 검증 (보안 필수!)
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      console.error('Missing Stripe signature');
      return new Response('Webhook Error: Missing signature', { status: 400 });
    }

    const body = await request.text();
    const stripe = getStripe(env);

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Signature verification failed:', err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log(`📨 Received event: ${event.type} (${event.id})`);

    // 2. Idempotency 체크
    const supabase = getSupabase(env);
    const alreadyProcessed = await isEventProcessed(supabase, event.id);

    if (alreadyProcessed) {
      console.log(`⚠️  Event ${event.id} already processed, skipping`);
      return new Response(JSON.stringify({ received: true, processed: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. 이벤트 타입별 처리
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        // 구독 모드인 경우만 처리 (일회성 결제 제외)
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription;
          const customerId = session.customer;

          // 구독 정보 가져오기
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          // 사용자 ID는 metadata에서 가져옴 (체크아웃 생성 시 설정 필요)
          const userId = session.metadata?.user_id || session.client_reference_id;

          if (!userId) {
            console.error('No user_id found in checkout session metadata');
            break;
          }

          await upsertSubscription(supabase, subscription, userId);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;

        // 구독에 연결된 사용자 찾기 (customer_id로 조회)
        const { data: existingSub } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', subscription.customer)
          .single();

        if (existingSub?.user_id) {
          await upsertSubscription(supabase, subscription, existingSub.user_id);
        } else {
          console.warn(`No user found for customer ${subscription.customer}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await cancelSubscription(supabase, subscription.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        console.log(`✅ Payment succeeded for invoice ${invoice.id}`);

        // 구독 갱신 성공 시 구독 상태 업데이트
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription);

          const { data: existingSub } = await supabase
            .from('subscriptions')
            .select('user_id')
            .eq('stripe_subscription_id', invoice.subscription)
            .single();

          if (existingSub?.user_id) {
            await upsertSubscription(supabase, subscription, existingSub.user_id);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.error(`❌ Payment failed for invoice ${invoice.id}`);

        // 구독 상태를 past_due로 업데이트
        if (invoice.subscription) {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'past_due',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', invoice.subscription);

          if (error) {
            console.error('Failed to update subscription to past_due:', error);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // 4. 이벤트 기록 (중복 처리 방지)
    await recordEvent(supabase, event.id, event.type);

    // 5. 성공 응답
    return new Response(
      JSON.stringify({ received: true, processed: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Webhook handler error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
