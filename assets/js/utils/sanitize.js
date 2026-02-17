// ========================================
// Trust Route - HTML Sanitization Utilities
// ========================================

/**
 * XSS 방어: HTML 안전하게 렌더링
 * DOMPurify를 사용하여 사용자 입력 및 동적 HTML을 정화
 */

const SanitizeUtils = {
  /**
   * HTML을 정화하여 안전하게 렌더링
   * @param {string} html - 정화할 HTML 문자열
   * @param {Object} config - DOMPurify 설정 (선택)
   * @returns {string} 정화된 HTML
   */
  sanitizeHTML(html, config = {}) {
    // DOMPurify가 로드되었는지 확인
    if (typeof DOMPurify === 'undefined') {
      console.error('DOMPurify not loaded! Using fallback sanitization.');
      return this.fallbackSanitize(html);
    }

    // 기본 설정: 안전한 태그만 허용
    const defaultConfig = {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'span', 'div', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      ALLOWED_ATTR: ['class', 'id', 'href', 'target', 'rel', 'data-restaurant-id', 'data-comment-id', 'style'],
      ALLOW_DATA_ATTR: true,
      KEEP_CONTENT: true,
      RETURN_TRUSTED_TYPE: false
    };

    return DOMPurify.sanitize(html, { ...defaultConfig, ...config });
  },

  /**
   * 사용자 텍스트를 안전하게 HTML로 변환 (줄바꿈만 허용)
   * @param {string} text - 사용자 입력 텍스트
   * @returns {string} 안전한 HTML
   */
  sanitizeUserText(text) {
    if (!text) return '';

    // 1. HTML 태그 이스케이프
    const escaped = this.escapeHTML(text);

    // 2. 줄바꿈을 <br>로 변환
    return escaped.replace(/\n/g, '<br>');
  },

  /**
   * HTML 특수문자 이스케이프
   * @param {string} text - 이스케이프할 텍스트
   * @returns {string} 이스케이프된 텍스트
   */
  escapeHTML(text) {
    if (!text) return '';

    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * DOMPurify 없을 때 폴백 정화
   * 기본적인 XSS 패턴 제거
   */
  fallbackSanitize(html) {
    if (!html) return '';

    // 1. script 태그 제거
    let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // 2. on* 이벤트 핸들러 제거
    sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');

    // 3. javascript: 프로토콜 제거
    sanitized = sanitized.replace(/javascript:/gi, '');

    // 4. data: URL 제거 (이미지 제외)
    sanitized = sanitized.replace(/data:(?!image)/gi, '');

    return sanitized;
  },

  /**
   * innerHTML 대신 안전하게 HTML 설정
   * @param {HTMLElement} element - 대상 요소
   * @param {string} html - 설정할 HTML
   * @param {Object} config - DOMPurify 설정
   */
  setInnerHTML(element, html, config = {}) {
    if (!element) {
      console.error('Element is null or undefined');
      return;
    }

    const sanitized = this.sanitizeHTML(html, config);
    element.innerHTML = sanitized;
  },

  /**
   * 레스토랑 카드용 안전한 HTML 생성
   * 이미 검증된 데이터 소스(data.js)에서 온 것이므로 제한적 정화
   */
  sanitizeRestaurantCard(data) {
    return {
      name: this.escapeHTML(data.name || ''),
      location: this.escapeHTML(data.location || ''),
      mainMenu: this.escapeHTML(data.mainMenu || '정보 없음'),
      context: this.escapeHTML(data.context || ''),
      status: this.escapeHTML(data.status || '검증 중'),
      badges: (data.badges || []).map(badge => this.escapeHTML(badge))
    };
  },

  /**
   * 댓글용 안전한 HTML 생성
   * 사용자 입력이므로 엄격한 정화
   */
  sanitizeComment(comment) {
    return {
      id: comment.id, // UUID는 안전
      user_id: comment.user_id, // UUID는 안전
      content: this.sanitizeUserText(comment.content || ''),
      created_at: comment.created_at, // ISO date는 안전
      updated_at: comment.updated_at,
      user_email: this.escapeHTML(comment.user_email || '익명')
    };
  }
};

// 전역 사용 가능하도록 export
if (typeof window !== 'undefined') {
  window.SanitizeUtils = SanitizeUtils;
}
