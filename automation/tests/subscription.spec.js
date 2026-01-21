// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Stripe 구독 플로우 자동화 테스트
 *
 * 시나리오:
 * 1. 회원가입/로그인
 * 2. 마이페이지 이동
 * 3. 프리미엄 구독하기 클릭
 * 4. Stripe Checkout으로 이동 확인
 * 5. 테스트 카드로 결제
 * 6. 구독 성공 확인
 */

test.describe('Stripe 구독 플로우', () => {
  test.beforeEach(async ({ page }) => {
    // 홈페이지 로드
    await page.goto('/');
    await expect(page).toHaveTitle(/KPopEats/);
  });

  test('회원가입 및 로그인', async ({ page }) => {
    // 로그인 버튼 클릭
    await page.click('button:has-text("로그인/회원가입")');

    // 회원가입 모달 확인
    await expect(page.locator('.modal')).toBeVisible();

    // 이메일/비밀번호 입력
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';

    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);

    // 회원가입 버튼 클릭
    await page.click('button:has-text("회원가입")');

    // 로그인 성공 확인 (사용자 이름 표시)
    await expect(page.locator('#user-name')).not.toHaveText('로그인/회원가입');
  });

  test('구독 상태 확인 (무료 플랜)', async ({ page }) => {
    // 로그인 (이전 테스트에서 이미 회원가입됨)
    // TODO: 실제로는 Supabase에서 테스트 사용자 생성 필요

    // 마이페이지 이동 (구독 정보 섹션 있다고 가정)
    // await page.click('a:has-text("마이페이지")');

    // 구독 상태 확인
    // await expect(page.locator('#subscription-status')).toHaveText('무료 플랜');

    // 구독하기 버튼 표시 확인
    // await expect(page.locator('#subscribe-button')).toBeVisible();
  });

  test('Stripe Checkout 페이지 이동', async ({ page }) => {
    // 로그인 필요 (beforeEach에서 처리되지 않으므로 수동 로그인)
    // TODO: 테스트 사용자로 자동 로그인 헬퍼 함수 필요

    // 구독하기 버튼 클릭
    // await page.click('#subscribe-button');

    // Stripe Checkout으로 리디렉션 확인
    // await page.waitForURL(/checkout\.stripe\.com/);

    // Stripe Checkout 페이지 로드 확인
    // await expect(page.locator('input[name="cardnumber"]')).toBeVisible();
  });

  test.skip('테스트 결제 실행 (Stripe 테스트 모드)', async ({ page }) => {
    // ⚠️ 주의: 실제 Stripe API 호출
    // 이 테스트는 Stripe 테스트 모드에서만 실행

    // Stripe Checkout 페이지로 이동 (이전 테스트에서 진행)
    // await page.goto('https://checkout.stripe.com/c/pay/...');

    // 테스트 카드 정보 입력
    // await page.fill('input[name="cardnumber"]', '4242424242424242');
    // await page.fill('input[name="exp-date"]', '1234');
    // await page.fill('input[name="cvc"]', '123');
    // await page.fill('input[name="billingPostalCode"]', '12345');

    // 결제 버튼 클릭
    // await page.click('button:has-text("Subscribe")');

    // 성공 리디렉션 확인
    // await page.waitForURL(/\?checkout=success/);
    // await expect(page.locator('text=구독이 시작되었습니다')).toBeVisible();
  });

  test.skip('구독 상태 확인 (프리미엄)', async ({ page }) => {
    // 결제 완료 후 구독 상태 확인

    // 마이페이지 이동
    // await page.click('a:has-text("마이페이지")');

    // 프리미엄 구독 표시 확인
    // await expect(page.locator('#subscription-status')).toHaveText('프리미엄 구독 중');

    // 구독 관리 버튼 표시 확인
    // await expect(page.locator('#manage-subscription-button')).toBeVisible();
  });
});

test.describe('Stripe Customer Portal', () => {
  test.skip('구독 관리 페이지 이동', async ({ page }) => {
    // 로그인 및 활성 구독 필요

    // 마이페이지 이동
    // await page.click('a:has-text("마이페이지")');

    // 구독 관리 버튼 클릭
    // await page.click('#manage-subscription-button');

    // Customer Portal로 리디렉션 확인
    // await page.waitForURL(/billing\.stripe\.com/);

    // Customer Portal 페이지 로드 확인
    // await expect(page.locator('text=Manage your subscription')).toBeVisible();
  });

  test.skip('구독 취소 (테스트 모드)', async ({ page }) => {
    // ⚠️ 주의: 실제 Stripe API 호출

    // Customer Portal에서 구독 취소
    // await page.click('button:has-text("Cancel subscription")');
    // await page.click('button:has-text("Cancel plan")'); // 확인

    // 취소 완료 확인
    // await expect(page.locator('text=subscription has been canceled')).toBeVisible();
  });
});

/**
 * 헬퍼 함수: 테스트 사용자 로그인
 */
async function loginTestUser(page, email, password) {
  await page.click('button:has-text("로그인/회원가입")');
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button:has-text("로그인")');
  await page.waitForTimeout(2000); // 로그인 완료 대기
}

/**
 * 헬퍼 함수: 테스트 사용자 회원가입
 */
async function signupTestUser(page) {
  const email = `test-${Date.now()}@example.com`;
  const password = 'TestPassword123!';

  await page.click('button:has-text("로그인/회원가입")');
  await page.click('button:has-text("회원가입")'); // 회원가입 탭 전환
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button:has-text("회원가입")');
  await page.waitForTimeout(2000);

  return { email, password };
}
