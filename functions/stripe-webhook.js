/**
 * Cloudflare Workers - Stripe Webhook Handler
 *
 * 이 파일은 Stripe 웹훅 이벤트를 처리하고 Supabase에 구독 상태를 동기화합니다.
 *
 * 배포: Cloudflare Pages Functions (/functions 디렉토리)
 * URL: https://kpopeats.cc/functions/stripe-webhook
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// 처리할 Stripe 이벤트 타입
const RELEVANT_EVENTS = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed'
]);

/**
 * Idempotency 체크 - 중복 이벤트 처리 방지
 */
async function checkIdempotency(supabase, eventId) {
  const { data } = await supabase
    .from('stripe_events')
    .select('stripe_event_id')
    .eq('stripe_event_id', eventId)
    .single();

  return data !== null; // 이미 처리된 이벤트면 true
}

/**
 * Idempotency 레코드 생성
 */
async function recordEvent(supabase, eventId, eventType) {
  await supabase
    .from('stripe_events')
    .insert({
      stripe_event_id: eventId,
      type: eventType
    });
}

/**
 * 구독 상태 업데이트/생성
 */
async function upsertSubscription(supabase, subscription) {
  const subscriptionData = {
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString()
  };

  // user_id는 checkout.session.completed에서 metadata로 받음
  // 또는 customer의 metadata에서 추출
  const { error } = await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id'
    });

  if (error) {
    throw new Error(`Subscription upsert failed: ${error.message}`);
  }
}

/**
 * Checkout Session 완료 처리
 */
async function handleCheckoutCompleted(supabase, session) {
  const userId = session.client_reference_id; // 클라이언트에서 전달한 user_id

  if (!userId) {
    throw new Error('No user_id in checkout session');
  }

  // 구독 ID 가져오기
  const subscriptionId = session.subscription;

  if (!subscriptionId) {
    throw new Error('No subscription in checkout session');
  }

  // Subscription 객체는 별도로 가져와야 함 (또는 customer.subscription.created 이벤트 대기)
  // 여기서는 간단히 customer_id만 저장
  await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      stripe_customer_id: session.customer,
      stripe_subscription_id: subscriptionId,
      status: 'active', // 임시, subscription.created에서 정확한 상태 업데이트
      price_id: session.metadata?.price_id || '',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 임시
    });
}

/**
 * Cloudflare Workers 진입점
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 환경 변수 확인
    const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;
    const STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ error: 'Missing environment variables' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Stripe 초기화
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia'
    });

    // Supabase 초기화
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 웹훅 시그니처 검증
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'Missing stripe-signature header' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 관련 이벤트만 처리
    if (!RELEVANT_EVENTS.has(event.type)) {
      return new Response(
        JSON.stringify({ received: true, message: 'Event type not relevant' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Idempotency 체크
    const alreadyProcessed = await checkIdempotency(supabase, event.id);
    if (alreadyProcessed) {
      console.log(`ℹ️ Event ${event.id} already processed, skipping`);
      return new Response(
        JSON.stringify({ received: true, message: 'Event already processed' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 이벤트 타입별 처리
    console.log(`✅ Processing event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(supabase, event.data.object);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await upsertSubscription(supabase, event.data.object);
        break;

      case 'customer.subscription.deleted':
        // 구독 취소 처리
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled', updated_at: new Date().toISOString() })
          .eq('stripe_subscription_id', event.data.object.id);
        break;

      case 'invoice.payment_succeeded':
        // 결제 성공 - 구독 상태 활성화 확인
        const invoice = event.data.object;
        if (invoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({ status: 'active', updated_at: new Date().toISOString() })
            .eq('stripe_subscription_id', invoice.subscription);
        }
        break;

      case 'invoice.payment_failed':
        // 결제 실패 - 구독 상태 past_due로 변경
        const failedInvoice = event.data.object;
        if (failedInvoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due', updated_at: new Date().toISOString() })
            .eq('stripe_subscription_id', failedInvoice.subscription);
        }
        break;

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    // Idempotency 레코드 생성
    await recordEvent(supabase, event.id, event.type);

    console.log(`✅ Event ${event.id} processed successfully`);
    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('❌ Webhook handler error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
