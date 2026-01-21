// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright 자동화 테스트 설정
 *
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  // 최대 실행 시간 (1분)
  timeout: 60 * 1000,

  // 테스트 실패 시 재시도 (사용자 요구사항: 자동 재시도)
  retries: 3,

  // 병렬 실행 (워커 수)
  workers: 1,

  // 리포터 설정
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],

  use: {
    // 베이스 URL (로컬 테스트)
    baseURL: 'http://localhost:3000',

    // 스크린샷 (실패 시)
    screenshot: 'only-on-failure',

    // 비디오 녹화 (실패 시)
    video: 'retain-on-failure',

    // 트레이스 수집 (디버깅용)
    trace: 'on-first-retry',
  },

  // 테스트 프로젝트 (브라우저별)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // 모바일 테스트
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // 로컬 개발 서버 자동 시작
  webServer: {
    command: 'python -m http.server 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
