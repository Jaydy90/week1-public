// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Trust Route E2E 테스트
 *
 * 전체 사용자 플로우 검증:
 * 1. 홈페이지 로드
 * 2. 레스토랑 검색
 * 3. 상세 페이지 확인
 * 4. 길찾기 딥링크 확인
 * 5. 북마크 저장/삭제
 */

test.describe('Trust Route 핵심 플로우', () => {
  test('홈페이지 로드 및 기본 요소 확인', async ({ page }) => {
    await page.goto('/');

    // 타이틀 확인
    await expect(page).toHaveTitle(/KPopEats/);

    // 헤더 요소 확인
    await expect(page.locator('.site-header')).toBeVisible();
    await expect(page.locator('button:has-text("KPopEats")')).toBeVisible();

    // 네비게이션 확인
    await expect(page.locator('a:has-text("홈")')).toBeVisible();
    await expect(page.locator('a:has-text("리스트")')).toBeVisible();
    await expect(page.locator('a:has-text("FAQ")')).toBeVisible();

    // 검색바 확인
    await expect(page.locator('#search-input')).toBeVisible();
  });

  test('레스토랑 리스트 표시', async ({ page }) => {
    await page.goto('/#list');

    // 리스트 페이지 로드 확인
    await expect(page.locator('[data-section="list"]')).toBeVisible();

    // 레스토랑 카드 확인 (최소 1개)
    const restaurantCards = page.locator('.restaurant-card');
    await expect(restaurantCards.first()).toBeVisible();

    // 카드 요소 확인
    await expect(restaurantCards.first().locator('.restaurant-name')).toBeVisible();
    await expect(restaurantCards.first().locator('.restaurant-category')).toBeVisible();
  });

  test('레스토랑 검색 기능', async ({ page }) => {
    await page.goto('/#list');

    // 검색어 입력
    await page.fill('#search-input', '강남');

    // 검색 결과 확인 (필터링됨)
    const searchResults = page.locator('.restaurant-card:visible');
    const count = await searchResults.count();

    expect(count).toBeGreaterThan(0);

    // 첫 번째 결과에 "강남" 포함 확인
    const firstResult = searchResults.first();
    const text = await firstResult.innerText();
    expect(text.toLowerCase()).toContain('강남');
  });

  test('레스토랑 상세 페이지 확인', async ({ page }) => {
    await page.goto('/#list');

    // 첫 번째 레스토랑 클릭
    await page.click('.restaurant-card:first-child');

    // 상세 페이지 로드 확인
    await expect(page.locator('[data-section="detail"]')).toBeVisible();

    // 상세 정보 확인
    await expect(page.locator('.restaurant-detail-name')).toBeVisible();
    await expect(page.locator('.restaurant-detail-address')).toBeVisible();

    // 신뢰 근거 카드 확인
    await expect(page.locator('.trust-evidence-card')).toBeVisible();

    // 길찾기 버튼 확인
    await expect(page.locator('button:has-text("길찾기")')).toBeVisible();
  });

  test('길찾기 딥링크 확인', async ({ page }) => {
    await page.goto('/#list');
    await page.click('.restaurant-card:first-child');

    // 길찾기 버튼 클릭
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('button:has-text("길찾기")')
    ]);

    // Naver Maps 딥링크 확인
    const url = popup.url();
    expect(url).toMatch(/naver\.com|map\.kakao\.com|google\.com\/maps/);
  });

  test('북마크 저장 (로그인 필요)', async ({ page }) => {
    await page.goto('/');

    // 로그인 (테스트 사용자)
    await page.click('button:has-text("로그인/회원가입")');

    // 회원가입 또는 기존 사용자 로그인
    const testEmail = 'test-bookmark@example.com';
    const testPassword = 'TestPassword123!';

    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);

    // 로그인 버튼 클릭 (회원가입 실패 시 자동으로 로그인 시도)
    await page.click('button:has-text("로그인")');
    await page.waitForTimeout(2000);

    // 레스토랑 상세 페이지 이동
    await page.goto('/#list');
    await page.click('.restaurant-card:first-child');

    // 북마크 버튼 클릭
    await page.click('button:has-text("저장")');

    // 북마크 성공 확인
    await expect(page.locator('button:has-text("저장됨")')).toBeVisible();
  });

  test('FAQ 페이지 확인', async ({ page }) => {
    await page.goto('/#faq');

    // FAQ 페이지 로드 확인
    await expect(page.locator('[data-section="faq"]')).toBeVisible();

    // FAQ 항목 확인
    await expect(page.locator('.faq-item')).toHaveCount(4); // CLAUDE.md에 4개 정의됨
  });

  test('제보/제휴 폼 확인', async ({ page }) => {
    await page.goto('/#partner');

    // 제보/제휴 페이지 로드 확인
    await expect(page.locator('[data-section="partner"]')).toBeVisible();

    // 폼 요소 확인
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button:has-text("보내기")')).toBeVisible();
  });
});

test.describe('반응형 디자인 (모바일)', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE 크기

  test('모바일 네비게이션 확인', async ({ page }) => {
    await page.goto('/');

    // 햄버거 메뉴 확인
    await expect(page.locator('.hamburger-menu')).toBeVisible();

    // 햄버거 메뉴 클릭
    await page.click('.hamburger-menu');

    // 모바일 메뉴 열림 확인
    // (실제 구현에 따라 셀렉터 수정 필요)
  });

  test('모바일 레스토랑 카드 표시', async ({ page }) => {
    await page.goto('/#list');

    // 모바일에서도 카드 정상 표시
    const cards = page.locator('.restaurant-card');
    await expect(cards.first()).toBeVisible();

    // 카드 너비 확인 (화면 너비에 맞게 조정됨)
    const cardWidth = await cards.first().evaluate(el => el.offsetWidth);
    expect(cardWidth).toBeLessThan(375); // 모바일 화면 너비보다 작아야 함
  });
});

test.describe('성능 테스트', () => {
  test('페이지 로드 시간 확인', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - start;

    // 3초 이내 로드
    expect(loadTime).toBeLessThan(3000);
  });

  test('검색 응답 시간 확인', async ({ page }) => {
    await page.goto('/#list');

    const start = Date.now();
    await page.fill('#search-input', '강남');
    const searchTime = Date.now() - start;

    // 500ms 이내 검색 결과 표시
    expect(searchTime).toBeLessThan(500);
  });
});
