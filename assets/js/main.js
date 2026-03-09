// ========================================
// Trust Route - Main JavaScript
// Phase 1: SPA Router + 4-Screen Layout
// Version: 2.1 (Modal fix with global handler)
// ========================================

console.log('Trust Route main.js loaded - Version 2.1');

// 전역 상태
const AppState = {
  currentScreen: 'home',
  currentRestaurant: null,
  userLocation: null, // { lat, lng }
  searchQuery: '', // 검색어
  filters: {
    time: 'all', // 이동 시간: 'all', '10', '15', '30'
    trustTab: 'all',
    status: 'all',
    price: 'all',
    badge: 'all'
  },
  sort: 'distance'
};

// ========================================
// SPA 라우터
// ========================================
const Router = {
  // 화면 전환 함수
  navigateTo(screen, data = {}) {
    console.log(`Navigating to: ${screen}`, data);

    // 현재 화면 상태 저장
    AppState.currentScreen = screen;

    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
      section.classList.remove('is-active');
    });

    // 홈 카테고리 섹션 인라인 스타일 초기화 (다른 페이지에 노출 방지)
    const homeChefs = document.getElementById('culinary-class-heroes');
    const homeMichelin = document.getElementById('michelin-intro');
    const homeCelebrity = document.getElementById('celebrity-intro');
    if (homeChefs) homeChefs.style.display = 'none';
    if (homeMichelin) homeMichelin.style.display = 'none';
    if (homeCelebrity) homeCelebrity.style.display = 'none';

    // 대상 섹션 표시
    const targetSection = document.querySelector(`[data-section="${screen}"]`);
    if (targetSection) {
      targetSection.classList.add('is-active');

      // 화면 전환 시 즉시 맨 위로 스크롤 (강제)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

      // 추가 보장: 약간의 지연 후 다시 스크롤
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }, 50);
    }

    // 네비게이션 버튼 활성화 상태 업데이트
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.target === screen);
    });

    // 해시 업데이트
    history.replaceState(null, '', `#${screen}`);

    // 화면별 초기화 로직 실행
    this.initScreen(screen, data);
  },

  // 화면별 초기화
  initScreen(screen, data) {
    // Update meta tags first for SEO
    this.updateMetaTags(screen, data);

    switch(screen) {
      case 'home':
        HomeScreen.init();
        break;
      case 'list':
        ListScreen.init();
        break;
      case 'detail':
        DetailScreen.init(data.restaurantId, data);
        break;
      case 'mypage':
        MypageScreen.init();
        break;
      case 'news':
        NewsScreen.init();
        break;
      case 'faq':
      case 'partner':
        // 정적 페이지, 별도 초기화 불필요
        break;
    }
  },

  // Dynamic meta tag updates for SEO
  updateMetaTags(screen, data) {
    const metaConfig = {
      home: {
        title: 'Trust Route - 믿을 수 있는 맛집 추천 | 미쉐린, 유명인, 흑백요리사',
        description: '미쉐린 가이드, 유명인 인증, 흑백요리사 출연 셰프의 신뢰할 수 있는 맛집만 엄선. 서울 강남 파인다이닝부터 로컬 맛집까지 신뢰 근거와 함께 추천하고 네이버 지도 길찾기까지 한 번에 연결합니다.',
        url: 'https://kpopeats.cc/#home'
      },
      list: {
        title: '맛집 리스트 - 검증된 85개 레스토랑 | Trust Route',
        description: '미쉐린, 유명인, 흑백요리사 기준으로 검증된 85개 맛집 전체 목록. 필터와 정렬로 원하는 맛집을 빠르게 찾으세요.',
        url: 'https://kpopeats.cc/#list'
      },
      detail: {
        title: data.restaurant ? `${data.restaurant.name} (${data.restaurant.location || data.restaurant.region}) - Trust Route` : 'Trust Route',
        description: data.restaurant ? `대표 메뉴: ${data.restaurant.mainMenu || '정보 없음'}. ${data.restaurant.context || data.restaurant.category || '신뢰할 수 있는 맛집 정보'}` : '신뢰할 수 있는 맛집 추천',
        url: data.restaurant ? `https://kpopeats.cc/#detail?id=${data.restaurant.id}` : 'https://kpopeats.cc/'
      },
      news: {
        title: '맛집 뉴스 - 최신 미쉐린, 흑백요리사, 유명인 추천 | Trust Route',
        description: '최신 맛집 트렌드와 신뢰할 수 있는 정보. 미쉐린 가이드 업데이트, 흑백요리사 셰프 신메뉴, 유명인 인증 맛집 소식.',
        url: 'https://kpopeats.cc/#news'
      },
      faq: {
        title: '자주 묻는 질문 (FAQ) - 신뢰 기준과 정책 | Trust Route',
        description: 'Trust Route의 맛집 선정 기준, 검증 프로세스, 배지 부여 정책에 대한 자주 묻는 질문과 답변.',
        url: 'https://kpopeats.cc/#faq'
      },
      partner: {
        title: '제보 & 제휴 - 맛집 정보 제보 및 B2B 협업 | Trust Route',
        description: '신뢰 근거 기반 맛집 정보 제보, B2B 전환 도구, 콘텐츠 협업 문의. 식당 운영자와 파트너를 위한 협업 패키지.',
        url: 'https://kpopeats.cc/#partner'
      },
      mypage: {
        title: '마이페이지 - 내 맛집 활동 | Trust Route',
        description: '저장한 맛집, 최근 본 맛집, 작성한 후기를 한눈에 확인하세요.',
        url: 'https://kpopeats.cc/#mypage'
      }
    };

    const config = metaConfig[screen] || metaConfig.home;

    // Update document title
    document.title = config.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', config.description);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', config.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', config.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', config.url);

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', config.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', config.description);

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', config.url);
  },

  // 초기 라우팅 (페이지 로드 시)
  init() {
    const hash = window.location.hash.replace('#', '');

    // Handle article routing (e.g., #news/article-id)
    if (hash.startsWith('news/')) {
      const articleId = hash.replace('news/', '');
      this.navigateTo('news');
      // Open article modal after a short delay to ensure page is loaded
      setTimeout(() => {
        if (window.ArticleModalController) {
          ArticleModalController.open(articleId);
        }
      }, 300);
    } else {
      const initialScreen = hash || 'home';
      this.navigateTo(initialScreen);
    }

    // 해시 변경 이벤트 리스너
    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '');

      // Handle article routing
      if (newHash.startsWith('news/')) {
        const articleId = newHash.replace('news/', '');
        // Navigate to news page if not already there
        if (AppState.currentScreen !== 'news') {
          this.navigateTo('news');
        }
        // Open article modal
        setTimeout(() => {
          if (window.ArticleModalController) {
            ArticleModalController.open(articleId);
          }
        }, 100);
      } else if (newHash && newHash !== AppState.currentScreen) {
        this.navigateTo(newHash);
      }
    });
  }
};

// ========================================
// 홈 화면
// ========================================
const HomeScreen = {
  init() {
    console.log('Home screen initialized');

    // 탭 상태 초기화 (홈 재진입 시 항상 '전체' 탭으로 리셋)
    AppState.filters.trustTab = 'all';
    const trustTabs = document.querySelectorAll('#home .trust-tab');
    trustTabs.forEach(t => t.classList.remove('is-active'));
    const allTab = document.querySelector('#home .trust-tab[data-tab="all"]');
    if (allTab) allTab.classList.add('is-active');

    this.initAnnouncementBanner();
    this.updateMapLocation();
    this.toggleCategorySections('all');
    this.renderPreviewList();
    this.setupEventListeners();
  },

  // 공지사항 배너 초기화
  initAnnouncementBanner() {
    const banner = document.getElementById('main-announcement');
    const closeBtn = document.getElementById('announcement-close-btn');

    if (!banner || !closeBtn) return;

    // localStorage에서 닫힘 상태 확인
    const announcementId = 'reservation-feature-update-2024-02';
    const isClosed = localStorage.getItem(`announcement-closed-${announcementId}`);

    if (isClosed === 'true') {
      banner.style.display = 'none';
    } else {
      banner.style.display = 'flex';
    }

    // 닫기 버튼 이벤트 (중복 방지를 위해 버튼 재생성)
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

    newCloseBtn.addEventListener('click', () => {
      banner.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        banner.style.display = 'none';
      }, 300);

      // localStorage에 저장
      localStorage.setItem(`announcement-closed-${announcementId}`, 'true');

      // Google Analytics 이벤트 (있는 경우)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'announcement_close', {
          'event_category': 'UI',
          'event_label': announcementId,
          'value': 1
        });
      }
    });
  },

  // 카테고리별 섹션 표시/숨김
  toggleCategorySections(tabValue) {
    const michelinIntro = document.getElementById('michelin-intro');
    const celebrityIntro = document.getElementById('celebrity-intro');
    const chefsSection = document.getElementById('culinary-class-heroes');

    // 모든 섹션 숨김
    if (michelinIntro) michelinIntro.style.display = 'none';
    if (celebrityIntro) celebrityIntro.style.display = 'none';
    if (chefsSection) chefsSection.style.display = 'none';

    // 선택된 탭에 따라 섹션 표시
    switch(tabValue) {
      case 'michelin':
        if (michelinIntro) michelinIntro.style.display = 'block';
        break;
      case 'celebrity':
        if (celebrityIntro) celebrityIntro.style.display = 'block';
        break;
      case 'chef':
        if (chefsSection) chefsSection.style.display = 'block';
        break;
      case 'bakery':
        // 베이커리 카페: 별도 인트로 섹션 없음
        break;
      case 'all':
      default:
        // 전체 탭: 모든 특수 섹션 숨김 (거리순 맛집만 표시)
        break;
    }
  },

  // 지도 위치 업데이트
  updateMapLocation() {
    const mapIframe = document.getElementById('naver-map-iframe');
    if (!mapIframe) return;

    // 사용자 위치가 있으면 해당 위치로, 없으면 서울 중심으로
    if (AppState.userLocation) {
      const { lat, lng } = AppState.userLocation;
      mapIframe.src = `https://map.naver.com/v5/?c=${lng},${lat},15,0,0,0,dh`;
    } else {
      // 기본: 서울 강남역
      mapIframe.src = 'https://map.naver.com/v5/?c=127.0276,37.4979,13,0,0,0,dh';
    }
  },

  // 위치 가져오기
  getUserLocation() {
    const statusEl = document.getElementById('location-status');
    const locationBtn = document.getElementById('get-location-btn');

    if (!navigator.geolocation) {
      if (statusEl) statusEl.textContent = '위치 서비스를 지원하지 않는 브라우저입니다.';
      return;
    }

    if (locationBtn) locationBtn.disabled = true;
    if (statusEl) statusEl.textContent = '위치를 가져오는 중...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        AppState.userLocation = { lat, lng };

        if (statusEl) statusEl.textContent = `현재 위치: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        if (locationBtn) locationBtn.disabled = false;

        // 지도 업데이트
        this.updateMapLocation();

        console.log('User location:', AppState.userLocation);
      },
      (error) => {
        console.error('Geolocation error:', error);
        if (statusEl) statusEl.textContent = '위치를 가져올 수 없습니다. 위치 권한을 확인하세요.';
        if (locationBtn) locationBtn.disabled = false;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  },

  renderPreviewList() {
    const container = document.getElementById('home-preview-list');
    if (!container) return;

    // ✅ allRestaurants 우선, 없으면 window.nearbySpots 사용
    let allItems = [];

    // 전역 변수 확인
    console.log('[HomeScreen DEBUG] window.allRestaurants:', window.allRestaurants?.length);
    console.log('[HomeScreen DEBUG] window.nearbySpots:', window.nearbySpots?.length);

    // allRestaurants가 로드되었으면 사용
    if (Array.isArray(window.allRestaurants) && window.allRestaurants.length > 0) {
      allItems = window.allRestaurants.map(item => ({
        ...item,
        location: item.location || `${item.region} ${item.area}`,
        travelTime: item.travelTime || '거리 계산 중',
        bestRoute: item.bestRoute || '경로 확인',
        saves: item.saves || 0,
        badges: item.badges || [item.badgeType],
        status: item.status || (item.sourceLabel === '출처 확인 중' ? '검증 중' : '검증 완료')
      }));
    }
    // 폴백: window.nearbySpots 사용
    else if (Array.isArray(window.nearbySpots) && window.nearbySpots.length > 0) {
      console.warn('[HomeScreen] allRestaurants 로드 실패, window.nearbySpots 사용');
      allItems = [...window.nearbySpots];
    }

    // 디버깅: 전체 개수 확인
    console.log('');
    console.log('===== HomeScreen.renderPreviewList() =====');
    console.log(`allItems 전체: ${allItems.length}개`);
    console.log(`- michelin: ${allItems.filter(r => r.group === 'michelin').length}개`);
    console.log(`- celebrity: ${allItems.filter(r => r.group === 'celebrity').length}개`);
    console.log(`- chef: ${allItems.filter(r => r.group === 'chef').length}개`);
    console.log(`- bakery: ${allItems.filter(r => r.group === 'bakery').length}개`);
    console.log(`현재 필터: ${AppState.filters.trustTab}`);

    // trustTab 필터 적용 (검증 중 맛집도 포함)
    let items = allItems;
    if (AppState.filters.trustTab !== 'all') {
      console.log(`필터링 전: ${items.length}개`);
      items = items.filter(item => {
        const match = item.group === AppState.filters.trustTab;
        if (!match && items.length < 10) {
          console.log(`  제외: ${item.name} (group: ${item.group})`);
        }
        return match;
      });
      console.log(`필터링 후 (${AppState.filters.trustTab}): ${items.length}개`);
      if (items.length > 0 && items.length < 10) {
        console.log('필터링된 아이템:');
        items.forEach(item => console.log(`  - ${item.name} (${item.group})`));
      }
    }
    console.log('==========================================');
    console.log('');

    // 전체 표시 (슬라이스 제거하여 모든 맛집 표시)
    const htmlContent = items.map((item, index) => {
      const badges = item.badges || [];
      const badgeMarkup = badges.map(badge => `<span class="badge-chip">${badge}</span>`).join('');

      // 홈 화면용 표시 (window.nearbySpots 형식과 allRestaurants 형식 모두 지원)
      const location = item.location || `${item.region} ${item.area}`;
      const travelTime = item.travelTime || '거리 계산 중';
      const bestRoute = item.bestRoute || '경로 확인';
      const saves = item.saves || 0;

      return `
        <article class="info-card" style="--delay:${Math.min(index * 0.08, 0.5)}s" data-restaurant-id="${item.id}">
          <div class="card-meta">
            <span class="status-pill">${item.group === 'michelin' ? '미쉐린' : item.group === 'celebrity' ? '유명인' : item.group === 'chef' ? '흑백요리사' : '검증 중'}</span>
            <span>${item.category || travelTime}</span>
          </div>
          <span class="card-title">${item.name}</span>
          <span class="card-location">${location}</span>
          <p class="card-context">대표 메뉴: ${item.mainMenu || '정보 없음'}</p>
          <div class="card-badges">${badgeMarkup}</div>
          <div class="card-footer">
            ${item.sourceLabel && item.sourceLabel !== '출처 확인 중' ? `<span>${item.sourceLabel}</span>` : ''}
            <span>확인일: ${item.verifiedAt || '확인 중'}</span>
          </div>
        </article>
      `;
    }).join('');

    container.innerHTML = htmlContent;

    console.log(`✅ container.innerHTML 설정 완료! HTML length: ${htmlContent.length} characters, ${items.length} cards`);
    console.log(`✅ container element:`, container);
    console.log(`✅ container.innerHTML 첫 100자:`, container.innerHTML.substring(0, 100));
    console.log(`✅ container display style:`, window.getComputedStyle(container).display);
    console.log(`✅ #home has is-active class:`, document.getElementById('home')?.classList.contains('is-active'));

    // 카드 클릭 이벤트
    this.attachCardClickHandlers();
  },

  setupEventListeners() {
    if (this._listenersSetup) return;
    this._listenersSetup = true;

    // 지도 토글 버튼
    const toggleMapBtn = document.getElementById('toggle-map-btn');
    const mapSection = document.getElementById('map-section');
    if (toggleMapBtn && mapSection) {
      toggleMapBtn.addEventListener('click', () => {
        const isHidden = mapSection.style.display === 'none';
        mapSection.style.display = isHidden ? 'block' : 'none';
        toggleMapBtn.classList.toggle('is-active', isHidden);
        toggleMapBtn.textContent = isHidden ? '🗺️ 지도 숨기기' : '🗺️ 지도에서 보기';

        // 지도를 열 때 위치 업데이트
        if (isHidden) {
          this.updateMapLocation();
        }
      });
    }

    // 위치 버튼
    const locationBtn = document.getElementById('get-location-btn');
    if (locationBtn) {
      locationBtn.addEventListener('click', () => {
        this.getUserLocation();
      });
    }

    // 신뢰 탭 (홈 화면 전용)
    const trustTabs = document.querySelectorAll('#home .trust-tab');
    trustTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabValue = tab.dataset.tab;
        AppState.filters.trustTab = tabValue;
        trustTabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        // 카테고리별 섹션 표시/숨김
        this.toggleCategorySections(tabValue);

        this.renderPreviewList();
      });
    });

    // 전체 리스트 보기 버튼
    const listBtn = document.querySelector('.home-cta .primary-button');
    if (listBtn) {
      listBtn.addEventListener('click', () => {
        Router.navigateTo('list');
      });
    }
  },

  attachCardClickHandlers() {
    const cards = document.querySelectorAll('#home-preview-list .info-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const restaurantId = card.dataset.restaurantId;
        this.showInlineDetail(restaurantId, card);
      });
    });
  },

  // 인라인 상세 정보 표시 (그리드 밖 컨테이너에)
  showInlineDetail(restaurantId, clickedCard) {
    // 레스토랑 데이터 찾기
    let restaurant = window.nearbySpots.find(r => r.id === restaurantId);
    if (!restaurant && window.allRestaurants) {
      restaurant = window.allRestaurants.find(r => r.id === restaurantId);
    }

    if (!restaurant) {
      console.error('Restaurant not found:', restaurantId);
      return;
    }

    // 상세 정보 컨테이너
    const detailContainer = document.getElementById('inline-detail-container');
    if (!detailContainer) return;

    // 이전에 열린 상세 정보 제거
    const existingDetail = detailContainer.querySelector('.inline-detail');
    if (existingDetail) {
      // 같은 카드를 다시 클릭한 경우 닫기
      if (existingDetail.dataset.restaurantId === restaurantId) {
        existingDetail.remove();
        return;
      }
      existingDetail.remove();
    }

    // 상세 정보 HTML 생성
    const detailHTML = this.createInlineDetailHTML(restaurant);

    // 상세 정보 div 생성
    const detailDiv = document.createElement('div');
    detailDiv.className = 'inline-detail';
    detailDiv.dataset.restaurantId = restaurantId;
    detailDiv.innerHTML = detailHTML;

    // 컨테이너에 삽입
    detailContainer.appendChild(detailDiv);

    // 이벤트 리스너 설정
    this.setupInlineDetailListeners(restaurant, detailDiv);

    // 상세 정보로 스크롤
    setTimeout(() => {
      detailDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  },

  // 인라인 상세 정보 HTML 생성
  createInlineDetailHTML(r) {
    const badgeHTML = r.badgeType ? `<span class="badge-chip">${r.badgeType}</span>` : '';

    // 주소
    const addressHTML = r.address ? `<p class="inline-detail-address">📍 ${r.address}</p>` : '';

    // 출처 링크
    const sourceHTML = (r.sourceUrl && r.sourceLabel)
      ? `<a href="${r.sourceUrl}" target="_blank" rel="noopener" class="evidence-link">🔗 ${r.sourceLabel}</a>`
      : '';

    // 예약 버튼
    let reservationHTML = '';
    if (r.reservation && r.reservation.links) {
      const links = r.reservation.links;
      const contact = r.reservation.contact || {};
      const advice = r.reservation.advice || '';
      const catchtableBtn = links.catchtable
        ? `<a href="${links.catchtable}" target="_blank" rel="noopener" class="inline-reservation-btn inline-reservation-btn--catchtable">🍽️ 캐치테이블 예약</a>`
        : '';
      const naverBtn = links.naverPlace
        ? `<a href="${links.naverPlace}" target="_blank" rel="noopener" class="inline-reservation-btn inline-reservation-btn--naver">🗺️ 네이버 플레이스</a>`
        : '';
      const phoneBtn = contact.phone
        ? `<a href="tel:${contact.phone}" class="inline-reservation-btn inline-reservation-btn--phone">📞 ${contact.phoneFormatted || contact.phone}</a>`
        : '';
      if (catchtableBtn || naverBtn || phoneBtn) {
        reservationHTML = `
          <div class="inline-reservation-section">
            <h3>예약</h3>
            ${advice ? `<p class="inline-reservation-advice">${advice}</p>` : ''}
            <div class="inline-reservation-buttons">
              ${catchtableBtn}${naverBtn}${phoneBtn}
            </div>
          </div>`;
      }
    }

    return `
      <div class="inline-detail-header">
        <div class="inline-detail-title-section">
          <h2 class="inline-detail-title">${r.name}</h2>
          <p class="inline-detail-location">${r.location || `${r.region} ${r.area}`}</p>
          ${addressHTML}
        </div>
        <button class="inline-detail-close" id="inline-detail-close">✕ 닫기</button>
      </div>

      <div class="inline-detail-content">
        <div class="inline-detail-main-info">
          <p class="inline-detail-category">${r.category || r.badgeType || ''} ${badgeHTML}</p>
          <p class="inline-detail-menu"><strong>대표 메뉴:</strong> ${r.mainMenu || '정보 없음'}</p>
        </div>

        <div class="inline-trust-evidence">
          <h3>신뢰 근거</h3>
          <p>${r.context || r.category || '신뢰할 수 있는 출처에서 확인되었습니다.'}</p>
          ${sourceHTML}
        </div>

        ${reservationHTML}

        <div class="inline-detail-actions">
          <button class="inline-action-button" id="inline-save-btn">
            <span>💾</span> 저장
          </button>
          <button class="inline-action-button" id="inline-share-btn">
            <span>🔗</span> 공유
          </button>
          <button class="inline-action-button primary" id="inline-directions-btn">
            <span>🗺️</span> 바로 길찾기
          </button>
        </div>
      </div>
    `;
  },

  // 인라인 상세 정보 이벤트 리스너 설정
  setupInlineDetailListeners(restaurant, detailDiv) {
    // 닫기 버튼
    const closeBtn = detailDiv.querySelector('#inline-detail-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        detailDiv.remove();
      });
    }

    // 저장 버튼
    const saveBtn = detailDiv.querySelector('#inline-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleInlineSave(restaurant);
      });
    }

    // 공유 버튼
    const shareBtn = detailDiv.querySelector('#inline-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleInlineShare(restaurant);
      });
    }

    // 길찾기 버튼 - 바로 네이버 지도로 연결
    const directionsBtn = detailDiv.querySelector('#inline-directions-btn');
    if (directionsBtn) {
      directionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openNaverDirections(restaurant);
      });
    }

  },

  // 인라인 저장 기능
  handleInlineSave(restaurant) {
    let savedList = [];
    try {
      const saved = localStorage.getItem('savedRestaurants');
      savedList = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('저장된 목록을 불러올 수 없습니다:', e);
    }

    const index = savedList.findIndex(item => item.id === restaurant.id);

    if (index !== -1) {
      savedList.splice(index, 1);
      localStorage.setItem('savedRestaurants', JSON.stringify(savedList));
      alert(`${restaurant.name}을(를) 저장 목록에서 제거했습니다.`);
    } else {
      savedList.push({
        id: restaurant.id,
        name: restaurant.name,
        location: restaurant.location || `${restaurant.region} ${restaurant.area}`,
        savedAt: new Date().toISOString()
      });
      localStorage.setItem('savedRestaurants', JSON.stringify(savedList));
      alert(`${restaurant.name}을(를) 저장했습니다.`);
    }
  },

  // 네이버 지도 길찾기 바로 열기 (현재 위치 → 음식점)
  openNaverDirections(restaurant) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const destName = encodeURIComponent(restaurant.name);

    if (restaurant.lat && restaurant.lng) {
      const dLat = restaurant.lat;
      const dLng = restaurant.lng;

      if (isMobile) {
        // 모바일: nmap 앱 스키마로 대중교통 길찾기 (출발지 생략 = 현재 GPS 위치 자동 사용)
        window.location.href = `nmap://route.public?dlat=${dLat}&dlng=${dLng}&dname=${destName}&appname=kpopeats`;
        // 앱 없을 경우 웹으로 폴백
        setTimeout(() => {
          window.open(`https://map.naver.com/p/directions/-/${dLng},${dLat},${destName},-1/-/-/transit`, '_blank');
        }, 1500);
      } else {
        // 데스크톱: 네이버 지도 웹 길찾기 (현재 위치 → 음식점)
        window.open(`https://map.naver.com/p/directions/-/${dLng},${dLat},${destName},-1/-/-/transit`, '_blank');
      }
    } else {
      // 좌표 없는 경우: 음식점 이름으로 검색 폴백
      const encodedQuery = encodeURIComponent(restaurant.mapQuery || `${restaurant.name} ${restaurant.location || restaurant.region || '서울'}`);
      if (isMobile) {
        window.location.href = `nmap://search?query=${encodedQuery}&appname=kpopeats`;
        setTimeout(() => {
          window.open(`https://map.naver.com/p/search/${encodedQuery}`, '_blank');
        }, 1500);
      } else {
        window.open(`https://map.naver.com/p/search/${encodedQuery}`, '_blank');
      }
    }

    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        'event_category': '길찾기',
        'event_label': restaurant.name,
        'value': 1
      });
    }
  },

  // 인라인 공유 기능
  async handleInlineShare(restaurant) {
    const shareData = {
      title: `KPopEats - ${restaurant.name}`,
      text: `${restaurant.name} (${restaurant.location || restaurant.region}) - 신뢰할 수 있는 맛집 정보`,
      url: `${window.location.origin}/#home`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('공유 성공');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('공유 실패:', err);
          this.fallbackShare(shareData);
        }
      }
    } else {
      this.fallbackShare(shareData);
    }
  },

  fallbackShare(shareData) {
    const url = shareData.url;
    navigator.clipboard.writeText(url).then(() => {
      alert('링크가 클립보드에 복사되었습니다.');
    }).catch(() => {
      alert(`링크를 복사해주세요: ${url}`);
    });
  }
};

// ========================================
// 리스트 화면
// ========================================
const ListScreen = {
  init() {
    console.log('List screen initialized');

    // 탭 상태 초기화 (리스트 재진입 시 항상 '전체' 탭으로 리셋)
    AppState.filters.badge = 'all';
    const trustTabs = document.querySelectorAll('#list .trust-tab');
    trustTabs.forEach(t => t.classList.remove('is-active'));
    const allTab = document.querySelector('#list .trust-tab[data-tab="all"]');
    if (allTab) allTab.classList.add('is-active');

    this.toggleCategorySections('all');
    this.renderList();
    this.setupEventListeners();
  },

  // 카테고리별 섹션 표시/숨김 (리스트 전용 ID 사용)
  toggleCategorySections(tabValue) {
    console.log(`[ListScreen] toggleCategorySections: ${tabValue}`);
    const michelinIntro = document.getElementById('list-michelin-intro');
    const celebrityIntro = document.getElementById('list-celebrity-intro');
    const chefsSection = document.getElementById('list-culinary-class-heroes');

    // 모든 섹션 숨김
    if (michelinIntro) michelinIntro.style.display = 'none';
    if (celebrityIntro) celebrityIntro.style.display = 'none';
    if (chefsSection) chefsSection.style.display = 'none';

    // 선택된 탭에 따라 섹션 표시
    switch(tabValue) {
      case 'michelin':
        if (michelinIntro) michelinIntro.style.display = 'block';
        break;
      case 'celebrity':
        if (celebrityIntro) celebrityIntro.style.display = 'block';
        break;
      case 'chef':
        if (chefsSection) {
          chefsSection.style.display = 'block';
          console.log('[ListScreen] ✅ Top8 표시');
        } else {
          console.error('[ListScreen] ❌ list-culinary-class-heroes를 찾을 수 없음!');
        }
        break;
      case 'bakery':
        // 베이커리 카페: 별도 인트로 섹션 없음
        break;
      case 'all':
      default:
        break;
    }
  },

  renderList() {
    const container = document.getElementById('list-grid');
    if (!container) return;

    // allRestaurants에서 필터링된 데이터 가져오기
    let items = this.getFilteredRestaurants();

    // 정렬
    items = this.sortRestaurants(items);

    // 카운트 업데이트
    const countText = document.getElementById('list-count-text');
    if (countText) {
      countText.textContent = `전체 ${items.length}개`;
    }

    // 빈 상태 처리
    if (items.length === 0) {
      container.innerHTML = '<p class="empty-state">필터 조건에 맞는 맛집이 없습니다.</p>';
      return;
    }

    // 렌더링
    container.innerHTML = items.map((item, index) => {
      // 배지 생성
      const badgeHTML = item.badgeType ? `<span class="badge-chip">${item.badgeType}</span>` : '';

      return `
        <article class="info-card" style="--delay:${index * 0.05}s" data-restaurant-id="${item.id}">
          <div class="card-meta">
            <span class="status-pill">${item.group === 'michelin' ? '미쉐린' : item.group === 'celebrity' ? '유명인' : '흑백요리사'}</span>
            <span>${item.category}</span>
          </div>
          <span class="card-title">${item.name}</span>
          <span class="card-location">${item.region} ${item.area}</span>
          <p class="card-context">대표 메뉴: ${item.mainMenu}</p>
          <div class="card-badges">${badgeHTML}</div>
          <div class="card-footer">
            ${item.sourceLabel && item.sourceLabel !== '출처 확인 중' ? `<span>${item.sourceLabel}</span>` : ''}
            <span>확인일: ${item.verifiedAt}</span>
          </div>
        </article>
      `;
    }).join('');

    // 카드 클릭 이벤트
    this.attachCardClickHandlers();
  },

  getFilteredRestaurants() {
    let items = Array.isArray(window.allRestaurants) ? window.allRestaurants : [];

    // 검색어 필터
    if (AppState.searchQuery) {
      const query = AppState.searchQuery.toLowerCase();
      items = items.filter(item => {
        const name = (item.name || '').toLowerCase();
        const location = (item.location || '').toLowerCase();
        const category = (item.category || '').toLowerCase();
        const menu = (item.mainMenu || '').toLowerCase();

        return name.includes(query) ||
               location.includes(query) ||
               category.includes(query) ||
               menu.includes(query);
      });
    }

    // 이동 시간 필터
    if (AppState.filters.time !== 'all') {
      const maxTime = parseInt(AppState.filters.time);
      items = items.filter(item => {
        // travelMinutes 필드가 있는 경우에만 필터링
        if (item.travelMinutes) {
          return item.travelMinutes <= maxTime;
        }
        // travelMinutes가 없으면 포함 (window.nearbySpots에만 있을 수 있음)
        return true;
      });
    }

    // 배지 필터 (검증 중 맛집도 포함)
    if (AppState.filters.badge !== 'all') {
      items = items.filter(item => {
        // group이 일치하면 status와 상관없이 표시
        return item.group === AppState.filters.badge;
      });
    }

    // 영업 상태 필터
    if (AppState.filters.status !== 'all') {
      items = items.filter(item => item.status === 'open');
    }

    // 가격대 필터
    if (AppState.filters.price !== 'all') {
      items = items.filter(item => item.priceRange === AppState.filters.price);
    }

    return items;
  },

  sortRestaurants(items) {
    const sorted = [...items];

    switch (AppState.sort) {
      case 'distance':
        // 거리순 정렬 (사용자 위치가 있으면)
        if (AppState.userLocation) {
          sorted.sort((a, b) => {
            const distA = this.calculateDistance(AppState.userLocation, { lat: a.lat, lng: a.lng });
            const distB = this.calculateDistance(AppState.userLocation, { lat: b.lat, lng: b.lng });
            return distA - distB;
          });
        }
        break;

      case 'speed':
        // 빠른 순 (예상 이동 시간)
        sorted.sort((a, b) => {
          const timeA = parseInt(a.travelTime) || 999;
          const timeB = parseInt(b.travelTime) || 999;
          return timeA - timeB;
        });
        break;

      case 'saves':
        // 저장 순
        sorted.sort((a, b) => {
          const savesA = a.saves || 0;
          const savesB = b.saves || 0;
          return savesB - savesA;
        });
        break;

      default:
        // 기본: 최신순 (verifiedAt 기준)
        sorted.sort((a, b) => {
          const dateA = new Date(a.verifiedAt || 0);
          const dateB = new Date(b.verifiedAt || 0);
          return dateB - dateA;
        });
    }

    return sorted;
  },

  // 거리 계산 (Haversine formula)
  calculateDistance(loc1, loc2) {
    if (!loc1 || !loc2 || !loc1.lat || !loc1.lng || !loc2.lat || !loc2.lng) {
      return 999999;
    }

    const R = 6371; // 지구 반지름 (km)
    const dLat = this.deg2rad(loc2.lat - loc1.lat);
    const dLon = this.deg2rad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(loc1.lat)) * Math.cos(this.deg2rad(loc2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // km
    return distance;
  },

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  },

  setupEventListeners() {
    if (this._listenersSetup) return;
    this._listenersSetup = true;

    // 신뢰 탭 (리스트 화면)
    const trustTabs = document.querySelectorAll('#list .trust-tab');
    trustTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabValue = tab.dataset.tab;

        // 토글 기능: 같은 탭을 다시 클릭하면 'all'로 변경
        if (AppState.filters.badge === tabValue && tabValue !== 'all') {
          AppState.filters.badge = 'all';
          trustTabs.forEach(t => t.classList.remove('is-active'));
          document.querySelector('#list .trust-tab[data-tab="all"]')?.classList.add('is-active');
          this.toggleCategorySections('all'); // 카테고리 섹션 숨김
        } else {
          AppState.filters.badge = tabValue;
          trustTabs.forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');
          this.toggleCategorySections(tabValue); // 카테고리 섹션 표시
        }

        this.renderList();
      });
    });

    // 설정 토글 버튼
    const settingsToggleBtn = document.getElementById('settings-toggle-btn');
    const advancedFilters = document.getElementById('advanced-filters');
    if (settingsToggleBtn && advancedFilters) {
      settingsToggleBtn.addEventListener('click', () => {
        const isHidden = advancedFilters.classList.contains('hidden');

        if (isHidden) {
          // 열기
          advancedFilters.classList.remove('hidden');
          advancedFilters.style.display = 'block';
          settingsToggleBtn.classList.add('is-active');

          // 애니메이션을 위해 약간의 지연
          requestAnimationFrame(() => {
            advancedFilters.style.opacity = '1';
            advancedFilters.style.transform = 'scaleY(1)';
          });
        } else {
          // 닫기
          advancedFilters.style.opacity = '0';
          advancedFilters.style.transform = 'scaleY(0.8)';
          settingsToggleBtn.classList.remove('is-active');

          // 애니메이션 후 숨김
          setTimeout(() => {
            advancedFilters.style.display = 'none';
            advancedFilters.classList.add('hidden');
          }, 300);
        }
      });
    }

    // 필터 버튼
    const filterButtons = document.querySelectorAll('#list .filter-button');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterType = btn.dataset.filter;
        const filterValue = btn.dataset.value;

        // 토글 기능: 같은 필터를 다시 클릭하면 'all'로 변경
        if (AppState.filters[filterType] === filterValue && filterValue !== 'all') {
          AppState.filters[filterType] = 'all';
          filterButtons.forEach(b => {
            if (b.dataset.filter === filterType) {
              b.classList.toggle('is-active', b.dataset.value === 'all');
            }
          });
        } else {
          AppState.filters[filterType] = filterValue;
          // 같은 그룹의 버튼들 비활성화
          filterButtons.forEach(b => {
            if (b.dataset.filter === filterType) {
              b.classList.toggle('is-active', b === btn);
            }
          });
        }

        this.renderList();
      });
    });

    // 정렬 버튼
    const sortPills = document.querySelectorAll('#list .sort-pill');
    sortPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const sortValue = pill.dataset.sort;

        // 토글 기능: 같은 정렬을 다시 클릭하면 'distance'로 변경
        if (AppState.sort === sortValue && sortValue !== 'distance') {
          AppState.sort = 'distance';
          sortPills.forEach(p => p.classList.remove('is-active'));
          document.querySelector('#list .sort-pill[data-sort="distance"]')?.classList.add('is-active');
        } else {
          AppState.sort = sortValue;
          sortPills.forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
        }

        this.renderList();
      });
    });
  },

  attachCardClickHandlers() {
    const cards = document.querySelectorAll('#list-grid .info-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const restaurantId = card.dataset.restaurantId;
        this.showInlineDetail(restaurantId, card);
      });
    });
  },

  // 인라인 상세 정보 표시
  showInlineDetail(restaurantId, clickedCard) {
    // HomeScreen의 메서드 재사용
    let restaurant = window.allRestaurants ? window.allRestaurants.find(r => r.id === restaurantId) : null;
    if (!restaurant) {
      restaurant = window.nearbySpots.find(r => r.id === restaurantId);
    }

    if (!restaurant) {
      console.error('Restaurant not found:', restaurantId);
      return;
    }

    // 상세 정보 컨테이너
    const detailContainer = document.getElementById('list-inline-detail-container');
    if (!detailContainer) return;

    // 이전에 열린 상세 정보 제거
    const existingDetail = detailContainer.querySelector('.inline-detail');
    if (existingDetail) {
      if (existingDetail.dataset.restaurantId === restaurantId) {
        existingDetail.remove();
        return;
      }
      existingDetail.remove();
    }

    // 상세 정보 HTML 생성
    const detailHTML = HomeScreen.createInlineDetailHTML(restaurant);

    // 상세 정보 div 생성
    const detailDiv = document.createElement('div');
    detailDiv.className = 'inline-detail';
    detailDiv.dataset.restaurantId = restaurantId;
    detailDiv.innerHTML = detailHTML;

    // 컨테이너에 삽입
    detailContainer.appendChild(detailDiv);

    // 이벤트 리스너 설정
    HomeScreen.setupInlineDetailListeners(restaurant, detailDiv);

    // 상세 정보로 스크롤
    setTimeout(() => {
      detailDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }
};

// ========================================
// 상세 화면
// ========================================
const DetailScreen = {
  currentRestaurant: null,

  init(restaurantId, options = {}) {
    console.log('Detail screen initialized for:', restaurantId, options);

    // 레스토랑 데이터 찾기
    this.currentRestaurant = this.findRestaurant(restaurantId);

    if (!this.currentRestaurant) {
      console.error('Restaurant not found:', restaurantId);
      Router.navigateTo('home');
      return;
    }

    // 최근 본 목록에 추가
    this.addToRecentViewed(this.currentRestaurant);

    // Update meta tags with restaurant data
    Router.updateMetaTags('detail', { restaurant: this.currentRestaurant });

    // Add Restaurant JSON-LD schema
    this.addRestaurantSchema(this.currentRestaurant);

    this.render();
    this.setupEventListeners();

    // 셰프 카드에서 왔으면 길찾기 버튼으로 스크롤
    if (options.scrollToDirections) {
      setTimeout(() => {
        const directionsBtn = document.getElementById('detail-directions-btn');
        if (directionsBtn) {
          console.log('Auto-scrolling to directions button');
          directionsBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 700);
    }
  },

  // 최근 본 목록에 추가
  addToRecentViewed(restaurant) {
    try {
      let recentList = [];
      const recent = localStorage.getItem('recentRestaurants');
      recentList = recent ? JSON.parse(recent) : [];

      // 이미 있으면 제거 (최신으로 다시 추가하기 위해)
      recentList = recentList.filter(item => item.id !== restaurant.id);

      // 맨 앞에 추가
      recentList.unshift({
        id: restaurant.id,
        name: restaurant.name,
        location: restaurant.location || `${restaurant.region} ${restaurant.area}`,
        viewedAt: new Date().toISOString()
      });

      // 최대 20개까지만 유지
      recentList = recentList.slice(0, 20);

      localStorage.setItem('recentRestaurants', JSON.stringify(recentList));
    } catch (e) {
      console.error('최근 본 목록 추가 실패:', e);
    }
  },

  findRestaurant(id) {
    // window.nearbySpots에서 먼저 찾기
    let restaurant = window.nearbySpots.find(r => r.id === id);

    // allRestaurants에서 찾기
    if (!restaurant && window.allRestaurants) {
      restaurant = window.allRestaurants.find(r => r.id === id);
    }

    return restaurant;
  },

  // Add Restaurant JSON-LD schema for SEO
  addRestaurantSchema(restaurant) {
    // Remove existing restaurant schema if any
    const existingSchema = document.querySelector('script[data-schema="restaurant"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Create Restaurant schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": `https://kpopeats.cc/#restaurant/${restaurant.id}`,
      "name": restaurant.name,
      "url": `https://kpopeats.cc/#detail?id=${restaurant.id}`,
      "servesCuisine": restaurant.category || "한식",
      "description": restaurant.context || `${restaurant.mainMenu} 맛집 ${restaurant.name}`
    };

    // Add address if available
    if (restaurant.region || restaurant.area || restaurant.location) {
      schema.address = {
        "@type": "PostalAddress",
        "addressLocality": restaurant.area || restaurant.location || "",
        "addressRegion": restaurant.region || "서울",
        "addressCountry": "KR"
      };
    }

    // Add geo coordinates if available
    if (restaurant.lat && restaurant.lng) {
      schema.geo = {
        "@type": "GeoCoordinates",
        "latitude": restaurant.lat,
        "longitude": restaurant.lng
      };
    }

    // Add menu if available
    if (restaurant.mainMenu) {
      schema.menu = restaurant.mainMenu;
    }

    // Add aggregate rating if saves data available
    if (restaurant.saves) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "reviewCount": restaurant.saves
      };
    }

    // Create script tag and inject into head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'restaurant');
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

    console.log('Restaurant schema added for:', restaurant.name);
  },

  render() {
    const r = this.currentRestaurant;

    // 제목과 위치
    document.getElementById('detail-title').textContent = r.name;
    document.getElementById('detail-location').textContent = r.location || `${r.region} ${r.area}`;

    // 카테고리와 메뉴
    document.getElementById('detail-category').textContent = r.category || r.badgeType || '';
    document.getElementById('detail-menu').innerHTML = `<strong>대표 메뉴:</strong> ${r.mainMenu || '정보 없음'}`;

    // 주소
    const addressEl = document.getElementById('detail-address');
    if (r.address) {
      addressEl.textContent = `주소: ${r.address}`;
      addressEl.style.display = 'block';
    } else {
      addressEl.style.display = 'none';
    }

    // 신뢰 근거 카드 렌더링
    this.renderTrustCards();

    // 예약 정보 렌더링
    this.renderReservationSection();

    // 이동 시간
    const travelTimeEl = document.getElementById('detail-travel-time');
    if (r.travelTime) {
      travelTimeEl.textContent = r.travelTime;
    } else {
      travelTimeEl.textContent = '정보 없음';
    }
  },

  renderTrustCards() {
    const container = document.getElementById('detail-trust-cards');
    if (!container) return;

    const r = this.currentRestaurant;

    // 신뢰 근거 카드 생성 (sourceUrl과 sourceLabel 기반)
    if (r.sourceUrl && r.sourceLabel) {
      container.innerHTML = `
        <article class="evidence-card">
          <div class="evidence-header">
            <div class="evidence-title">
              <span class="evidence-icon evidence-icon--michelin">TR</span>
              <h4>${r.badgeType || '신뢰 근거'}</h4>
            </div>
            <span class="evidence-badge">검증 완료</span>
          </div>
          <p>${r.context || r.category || '신뢰할 수 있는 출처에서 확인되었습니다.'}</p>
          <div class="evidence-meta">
            <span>확인일: ${r.verifiedAt || r.updatedAt || '2026-01-19'}</span>
          </div>
          <div class="evidence-meta">
            <a class="evidence-link" href="${r.sourceUrl}" target="_blank" rel="noopener">${r.sourceLabel}</a>
          </div>
        </article>
      `;
    } else {
      container.innerHTML = `
        <article class="evidence-card">
          <p>신뢰 근거를 확인 중입니다.</p>
        </article>
      `;
    }
  },

  renderReservationSection() {
    const r = this.currentRestaurant;

    // 예약 정보가 없으면 섹션 숨김
    if (!r.reservation || !r.reservation.links) {
      const section = document.getElementById('detail-reservation-section');
      if (section) section.style.display = 'none';
      return;
    }

    // 섹션 표시
    const section = document.getElementById('detail-reservation-section');
    if (section) section.style.display = 'block';

    const links = r.reservation.links;
    const contact = r.reservation.contact || {};
    const tips = r.reservation.tips || [];
    const difficulty = r.reservation.difficulty || 'medium';
    const advice = r.reservation.advice || '예약이 필요합니다.';

    // 난이도 배지 표시
    const difficultyBadge = document.getElementById('difficulty-badge');
    const difficultyAdvice = document.getElementById('difficulty-advice');

    const difficultyText = {
      'high': '높음',
      'medium': '보통',
      'low': '낮음'
    };

    const difficultyColor = {
      'high': '#ef4444',
      'medium': '#f59e0b',
      'low': '#10b981'
    };

    if (difficultyBadge) {
      difficultyBadge.textContent = `예약 난이도: ${difficultyText[difficulty] || '보통'}`;
      difficultyBadge.style.backgroundColor = difficultyColor[difficulty] || '#f59e0b';
    }

    if (difficultyAdvice) {
      difficultyAdvice.textContent = advice;
    }

    // 캐치테이블 버튼
    const catchtableBtn = document.getElementById('reservation-catchtable-btn');
    if (catchtableBtn) {
      if (links.catchtable) {
        catchtableBtn.style.display = 'flex';
      } else {
        catchtableBtn.style.display = 'none';
      }
    }

    // 네이버 플레이스 버튼
    const naverBtn = document.getElementById('reservation-naver-btn');
    if (naverBtn) {
      if (links.naverPlace) {
        naverBtn.style.display = 'flex';
      } else {
        naverBtn.style.display = 'none';
      }
    }

    // 전화 버튼
    const phoneBtn = document.getElementById('reservation-phone-btn');
    const phoneNumber = document.getElementById('reservation-phone-number');
    if (phoneBtn && phoneNumber) {
      if (contact.phone) {
        phoneBtn.style.display = 'flex';
        phoneNumber.textContent = contact.phoneFormatted || contact.phone;
      } else {
        phoneBtn.style.display = 'none';
      }
    }

    // 예약 팁 표시
    const tipsSection = document.getElementById('reservation-tips');
    const tipsList = document.getElementById('reservation-tips-list');
    if (tipsSection && tipsList) {
      if (tips.length > 0) {
        tipsSection.style.display = 'block';
        tipsList.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
      } else {
        tipsSection.style.display = 'none';
      }
    }

    // 연락처 정보 표시
    const contactSection = document.getElementById('reservation-contact');
    if (contactSection) {
      const hasContactInfo = contact.phone || contact.hours || contact.breakTime || contact.closedDays;

      if (hasContactInfo) {
        contactSection.style.display = 'block';

        const phoneEl = document.getElementById('contact-phone');
        const hoursEl = document.getElementById('contact-hours');
        const breakEl = document.getElementById('contact-break');
        const closedEl = document.getElementById('contact-closed');

        if (phoneEl) {
          phoneEl.textContent = contact.phone ? `전화: ${contact.phone}` : '';
          phoneEl.style.display = contact.phone ? 'block' : 'none';
        }

        if (hoursEl) {
          hoursEl.textContent = contact.hours ? `영업시간: ${contact.hours}` : '';
          hoursEl.style.display = contact.hours ? 'block' : 'none';
        }

        if (breakEl) {
          breakEl.textContent = contact.breakTime ? `브레이크 타임: ${contact.breakTime}` : '';
          breakEl.style.display = contact.breakTime ? 'block' : 'none';
        }

        if (closedEl) {
          const closedText = Array.isArray(contact.closedDays)
            ? contact.closedDays.join(', ')
            : contact.closedDays;
          closedEl.textContent = closedText ? `휴무일: ${closedText}` : '';
          closedEl.style.display = closedText ? 'block' : 'none';
        }
      } else {
        contactSection.style.display = 'none';
      }
    }
  },

  setupEventListeners() {
    // 이벤트 리스너 중복 방지를 위해 버튼을 복제해서 교체
    const replaceButton = (id, handler) => {
      const oldBtn = document.getElementById(id);
      if (!oldBtn) return;
      const newBtn = oldBtn.cloneNode(true);
      oldBtn.parentNode.replaceChild(newBtn, oldBtn);
      newBtn.addEventListener('click', handler);
    };

    // 뒤로 버튼
    replaceButton('detail-back-btn', () => {
      Router.navigateTo('list');
    });

    // 길찾기 버튼 - 바로 네이버 지도로 연결
    replaceButton('detail-directions-btn', () => {
      this.openNaverDirections(this.currentRestaurant);
    });

    // 저장 버튼
    replaceButton('detail-save-btn', () => {
      this.handleSave();
    });

    // 공유 버튼
    replaceButton('detail-share-btn', () => {
      this.handleShare();
    });

    // 오정보 신고 버튼
    replaceButton('detail-report-btn', () => {
      Router.navigateTo('partner');
      setTimeout(() => {
        document.getElementById('contact-form-container')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });

    // 예약 버튼들
    replaceButton('reservation-catchtable-btn', () => {
      if (window.ReservationModule) {
        ReservationModule.open(this.currentRestaurant.id, 'catchtable');
      }
    });

    replaceButton('reservation-naver-btn', () => {
      if (window.ReservationModule) {
        ReservationModule.open(this.currentRestaurant.id, 'naverPlace');
      }
    });

    replaceButton('reservation-phone-btn', () => {
      if (window.ReservationModule) {
        ReservationModule.open(this.currentRestaurant.id, 'phone');
      }
    });

    // 댓글 시스템
    this.setupComments();
  },

  // 저장 기능 (localStorage 사용)
  handleSave() {
    const r = this.currentRestaurant;
    if (!r) return;

    // localStorage에서 저장된 목록 가져오기
    let savedList = [];
    try {
      const saved = localStorage.getItem('savedRestaurants');
      savedList = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('저장된 목록을 불러올 수 없습니다:', e);
    }

    // 이미 저장되어 있는지 확인
    const index = savedList.findIndex(item => item.id === r.id);

    if (index !== -1) {
      // 이미 저장됨 - 제거
      savedList.splice(index, 1);
      localStorage.setItem('savedRestaurants', JSON.stringify(savedList));
      alert(`${r.name}을(를) 저장 목록에서 제거했습니다.`);

      // 버튼 텍스트 변경
      const saveBtn = document.getElementById('detail-save-btn');
      if (saveBtn) {
        saveBtn.innerHTML = '<span class="icon">💾</span> 저장';
      }
    } else {
      // 저장
      savedList.push({
        id: r.id,
        name: r.name,
        location: r.location || `${r.region} ${r.area}`,
        savedAt: new Date().toISOString()
      });
      localStorage.setItem('savedRestaurants', JSON.stringify(savedList));
      alert(`${r.name}을(를) 저장했습니다.`);

      // 버튼 텍스트 변경
      const saveBtn = document.getElementById('detail-save-btn');
      if (saveBtn) {
        saveBtn.innerHTML = '<span class="icon">✓</span> 저장됨';
      }
    }
  },

  // 공유 기능 (Web Share API)
  async handleShare() {
    const r = this.currentRestaurant;
    if (!r) return;

    const shareData = {
      title: `Trust Route - ${r.name}`,
      text: `${r.name} (${r.location || r.region}) - 신뢰할 수 있는 맛집 정보`,
      url: `${window.location.origin}/#detail?id=${r.id}`
    };

    // Web Share API 지원 확인
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('공유 성공');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('공유 실패:', err);
          this.fallbackShare(shareData);
        }
      }
    } else {
      // 폴백: 클립보드에 복사
      this.fallbackShare(shareData);
    }
  },

  // 공유 폴백 (클립보드)
  fallbackShare(shareData) {
    const url = shareData.url;
    navigator.clipboard.writeText(url).then(() => {
      alert('링크가 클립보드에 복사되었습니다.');
    }).catch(() => {
      alert(`링크를 복사해주세요: ${url}`);
    });
  },

  // 네이버 지도 길찾기 바로 열기 (현재 위치 → 음식점)
  openNaverDirections(restaurant) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const destName = encodeURIComponent(restaurant.name);

    if (restaurant.lat && restaurant.lng) {
      const dLat = restaurant.lat;
      const dLng = restaurant.lng;

      if (isMobile) {
        // 모바일: nmap 앱 스키마로 대중교통 길찾기 (출발지 생략 = 현재 GPS 위치 자동 사용)
        window.location.href = `nmap://route.public?dlat=${dLat}&dlng=${dLng}&dname=${destName}&appname=kpopeats`;
        // 앱 없을 경우 웹으로 폴백
        setTimeout(() => {
          window.open(`https://map.naver.com/p/directions/-/${dLng},${dLat},${destName},-1/-/-/transit`, '_blank');
        }, 1500);
      } else {
        // 데스크톱: 네이버 지도 웹 길찾기 (현재 위치 → 음식점)
        window.open(`https://map.naver.com/p/directions/-/${dLng},${dLat},${destName},-1/-/-/transit`, '_blank');
      }
    } else {
      // 좌표 없는 경우: 음식점 이름으로 검색 폴백
      const encodedQuery = encodeURIComponent(restaurant.mapQuery || `${restaurant.name} ${restaurant.location || restaurant.region || '서울'}`);
      if (isMobile) {
        window.location.href = `nmap://search?query=${encodedQuery}&appname=kpopeats`;
        setTimeout(() => {
          window.open(`https://map.naver.com/p/search/${encodedQuery}`, '_blank');
        }, 1500);
      } else {
        window.open(`https://map.naver.com/p/search/${encodedQuery}`, '_blank');
      }
    }

    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        'event_category': '길찾기',
        'event_label': restaurant.name,
        'value': 1
      });
    }
  },

  // 댓글 시스템 초기화
  setupComments() {
    const loginBtn = document.getElementById('login-btn');
    const submitCommentBtn = document.getElementById('submit-comment-btn');
    const cancelCommentBtn = document.getElementById('cancel-comment-btn');
    const loginPrompt = document.getElementById('login-prompt');
    const commentForm = document.getElementById('comment-form');

    // 초기 상태 설정 (로그인 여부에 따라)
    if (AuthModule.isAuthenticated()) {
      if (loginPrompt) loginPrompt.style.display = 'none';
      if (commentForm) commentForm.style.display = 'block';
    } else {
      if (loginPrompt) loginPrompt.style.display = 'block';
      if (commentForm) commentForm.style.display = 'none';
    }

    // 로그인 버튼 - 모달 열기
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        ModalController.openLoginModal();
      });
    }

    // 댓글 작성 버튼
    if (submitCommentBtn) {
      submitCommentBtn.addEventListener('click', async () => {
        const commentInput = document.getElementById('comment-input');
        const content = commentInput?.value.trim();

        if (!content) {
          alert('후기 내용을 입력해주세요.');
          return;
        }

        try {
          await CommentsModule.createComment(this.currentRestaurant.id, content);
          commentInput.value = '';
          this.loadComments(); // 새로고침
          alert('후기가 등록되었습니다!');
        } catch (err) {
          alert(err.message || '후기 등록에 실패했습니다.');
        }
      });
    }

    // 취소 버튼
    if (cancelCommentBtn) {
      cancelCommentBtn.addEventListener('click', () => {
        const commentInput = document.getElementById('comment-input');
        if (commentInput) commentInput.value = '';
      });
    }

    // 댓글 목록 로드
    this.loadComments();
  },

  // 댓글 로드
  async loadComments() {
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) return;

    try {
      const comments = await CommentsModule.getComments(this.currentRestaurant.id);

      if (comments.length === 0) {
        commentsList.innerHTML = '<p class="empty-comments">아직 작성된 후기가 없습니다. 첫 번째 후기를 남겨보세요!</p>';
      } else {
        commentsList.innerHTML = comments.map(comment =>
          CommentsModule.renderCommentHTML(comment)
        ).join('');

        // 수정/삭제 버튼 이벤트 핸들러
        this.attachCommentActionHandlers();
      }
    } catch (err) {
      console.error('Failed to load comments:', err);
      commentsList.innerHTML = '<p class="empty-comments">후기를 불러올 수 없습니다.</p>';
    }
  },

  // 댓글 수정/삭제 핸들러
  attachCommentActionHandlers() {
    // 수정 버튼
    document.querySelectorAll('.comment-edit-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const commentId = e.target.dataset.commentId;
        const commentItem = e.target.closest('.comment-item');
        const currentContent = commentItem.querySelector('.comment-content').textContent;

        const newContent = prompt('수정할 내용을 입력하세요:', currentContent);
        if (newContent && newContent.trim() !== currentContent) {
          try {
            await CommentsModule.updateComment(commentId, newContent);
            this.loadComments();
            alert('후기가 수정되었습니다.');
          } catch (err) {
            alert(err.message || '수정에 실패했습니다.');
          }
        }
      });
    });

    // 삭제 버튼
    document.querySelectorAll('.comment-delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const commentId = e.target.dataset.commentId;

        if (confirm('정말 삭제하시겠습니까?')) {
          try {
            await CommentsModule.deleteComment(commentId);
            this.loadComments();
            alert('후기가 삭제되었습니다.');
          } catch (err) {
            alert(err.message || '삭제에 실패했습니다.');
          }
        }
      });
    });
  }
};

// ========================================
// 뉴스/블로그 화면
// ========================================
const NewsScreen = {
  currentCategory: 'all',
  currentSort: 'latest',
  currentSearch: '',
  displayedCount: 6,
  articlesPerLoad: 6,

  init() {
    console.log('News screen initialized');
    this.renderFeaturedArticles();
    this.renderArticles();
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Category Filter
    const categoryBtns = document.querySelectorAll('.category-filter-btn');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        categoryBtns.forEach(b => b.classList.remove('is-active'));
        e.target.classList.add('is-active');
        this.currentCategory = e.target.dataset.category;
        this.displayedCount = this.articlesPerLoad;
        this.renderArticles();
      });
    });

    // Search
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentSearch = e.target.value.toLowerCase();
        this.displayedCount = this.articlesPerLoad;
        this.renderArticles();
      });
    }

    // Sort
    const sortSelect = document.getElementById('blog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderArticles();
      });
    }

    // Load More
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.displayedCount += this.articlesPerLoad;
        this.renderArticles();
      });
    }
  },

  renderFeaturedArticles() {
    const container = document.getElementById('featured-articles');
    if (!container || !window.newsArticles) return;

    const featured = window.newsArticles
      .filter(article => article.featured)
      .slice(0, 2);

    if (featured.length === 0) {
      container.innerHTML = '';
      return;
    }

    const html = `
      <div class="featured-grid">
        ${featured.map(article => `
          <article class="featured-article" data-article-id="${article.id}">
            <img src="${article.coverImage}" alt="${article.title}" class="featured-article-image" loading="lazy">
            <div class="featured-article-overlay">
              <span class="featured-badge">Featured</span>
              <div class="featured-article-content">
                <span class="featured-article-category">${article.category}</span>
                <h2 class="featured-article-title">${article.title}</h2>
                <p class="featured-article-excerpt">${article.excerpt}</p>
                <div class="featured-article-meta">
                  <span class="featured-views">${article.views?.toLocaleString() || '0'} views</span>
                  <span>${article.readTime}</span>
                  <span>${article.date}</span>
                </div>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `;

    container.innerHTML = html;

    // Add click handlers
    container.querySelectorAll('.featured-article').forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.dataset.articleId;
        if (window.ArticleModalController) {
          ArticleModalController.open(articleId);
        }
      });
    });
  },

  renderArticles() {
    const container = document.getElementById('articles-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!container || !window.newsArticles) return;

    // Filter articles
    let filtered = window.newsArticles.filter(article => {
      // Category filter
      if (this.currentCategory !== 'all' && article.category !== this.currentCategory) {
        return false;
      }

      // Search filter
      if (this.currentSearch) {
        const searchableText = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase();
        if (!searchableText.includes(this.currentSearch)) {
          return false;
        }
      }

      return true;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (this.currentSort) {
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'reading-time':
          const aTime = parseInt(a.readTime) || 0;
          const bTime = parseInt(b.readTime) || 0;
          return aTime - bTime;
        case 'latest':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    // Remove featured articles from regular grid
    filtered = filtered.filter(article => !article.featured);

    const displayArticles = filtered.slice(0, this.displayedCount);
    const hasMore = filtered.length > this.displayedCount;

    const html = displayArticles.map(article => `
      <article class="article-card" data-article-id="${article.id}">
        <div class="article-card-image-wrapper">
          <img src="${article.coverImage}" alt="${article.title}" class="article-card-image" loading="lazy">
        </div>
        <div class="article-card-content">
          <span class="article-card-category">${article.category}</span>
          <h3 class="article-card-title">${article.title}</h3>
          <p class="article-card-excerpt">${article.excerpt}</p>
          <div class="article-card-footer">
            <span class="article-card-date">${article.date}</span>
            <span class="article-card-readtime">${article.readTime}</span>
          </div>
        </div>
      </article>
    `).join('');

    container.innerHTML = html;

    // Update Load More button
    if (loadMoreBtn) {
      if (hasMore) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.disabled = false;
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }

    // Add click handlers
    container.querySelectorAll('.article-card').forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.dataset.articleId;
        if (window.ArticleModalController) {
          ArticleModalController.open(articleId);
        }
      });
    });
  }
};

// ========================================
// 마이페이지 화면
// ========================================
const MypageScreen = {
  init() {
    console.log('Mypage screen initialized');

    // 로그인 확인
    if (!AuthModule.isAuthenticated()) {
      alert('로그인이 필요합니다.');
      Router.navigateTo('home');
      return;
    }

    this.render();
    this.setupEventListeners();
  },

  render() {
    // 프로필 정보 렌더링
    this.renderProfile();
    // 저장한 맛집 렌더링
    this.renderSavedRestaurants();
    // 최근 본 맛집 렌더링
    this.renderRecentRestaurants();
    // 내 후기 렌더링
    this.renderMyComments();
    // 통계 렌더링
    this.renderStats();
  },

  async renderProfile() {
    const user = AuthModule.currentUser;
    if (!user) return;

    const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
    const email = user.email;

    document.getElementById('profile-name').textContent = displayName;
    document.getElementById('profile-email').textContent = email;

    // 구독 상태 표시
    await this.renderSubscriptionStatus();
  },

  async renderSubscriptionStatus() {
    const container = document.getElementById('subscription-status');
    if (!container) {
      console.warn('subscription-status 요소를 찾을 수 없습니다. index.html에 추가 필요.');
      return;
    }

    // 로딩 상태
    container.innerHTML = '<p class="loading">구독 정보 확인 중...</p>';

    try {
      const subscription = await SubscriptionModule.getSubscriptionStatus();

      if (!subscription || !SubscriptionModule.isSubscriptionActive(subscription)) {
        // 비구독 상태
        container.innerHTML = `
          <div class="subscription-card free">
            <h3>🆓 무료 플랜</h3>
            <p class="subscription-description">기본 기능을 무료로 이용 중입니다.</p>
            <button class="primary-button" id="start-subscription-btn">
              프리미엄으로 업그레이드 ✨ (₩9,900/월)
            </button>
            <p class="subscription-benefits">
              프리미엄 혜택:<br>
              ✓ 개인화 자동 필터<br>
              ✓ 코스 자동 생성<br>
              ✓ 신규 맛집 알림<br>
              ✓ 무제한 저장 컬렉션
            </p>
          </div>
        `;

        // 구독 시작 버튼 이벤트
        const startBtn = document.getElementById('start-subscription-btn');
        if (startBtn) {
          startBtn.addEventListener('click', async () => {
            startBtn.disabled = true;
            startBtn.textContent = '처리 중...';
            await SubscriptionModule.createCheckoutSession();
            startBtn.disabled = false;
            startBtn.textContent = '프리미엄으로 업그레이드 ✨ (₩9,900/월)';
          });
        }
      } else {
        // 구독 중
        const endDate = new Date(subscription.current_period_end).toLocaleDateString('ko-KR');
        const statusLabel = SubscriptionModule.getStatusLabel(subscription.status);

        container.innerHTML = `
          <div class="subscription-card premium">
            <h3>⭐ 프리미엄 플랜</h3>
            <p class="subscription-status">상태: <strong>${statusLabel}</strong></p>
            <p class="subscription-period">다음 결제일: ${endDate}</p>
            ${subscription.cancel_at_period_end ? `<p class="subscription-cancel-notice">⚠️ 구독이 ${endDate}에 종료됩니다.</p>` : ''}
            <div class="subscription-actions">
              <button class="secondary-button" id="manage-subscription-btn">결제 수단 및 구독 관리</button>
              ${subscription.cancel_at_period_end ? '' : '<button class="secondary-button cancel-btn" id="cancel-subscription-btn">구독 취소</button>'}
            </div>
          </div>
        `;

        // 구독 관리 버튼 (Customer Portal)
        const manageBtn = document.getElementById('manage-subscription-btn');
        if (manageBtn) {
          manageBtn.addEventListener('click', async () => {
            manageBtn.disabled = true;
            manageBtn.textContent = '처리 중...';
            await SubscriptionModule.openCustomerPortal();
            manageBtn.disabled = false;
            manageBtn.textContent = '결제 수단 및 구독 관리';
          });
        }

        // 구독 취소 버튼 이벤트
        const cancelBtn = document.getElementById('cancel-subscription-btn');
        if (cancelBtn) {
          cancelBtn.addEventListener('click', async () => {
            const success = await SubscriptionModule.cancelSubscription();
            if (success) {
              // 구독 상태 새로고침
              await this.renderSubscriptionStatus();
            }
          });
        }
      }
    } catch (err) {
      console.error('구독 상태 렌더링 오류:', err);
      container.innerHTML = '<p class="error">구독 정보를 불러올 수 없습니다.</p>';
    }
  },

  renderSavedRestaurants() {
    const container = document.getElementById('saved-restaurants-list');
    const countEl = document.getElementById('saved-count');

    // localStorage에서 저장 목록 가져오기
    let savedList = [];
    try {
      const saved = localStorage.getItem('savedRestaurants');
      savedList = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('저장 목록을 불러올 수 없습니다:', e);
    }

    countEl.textContent = `${savedList.length}개`;

    if (savedList.length === 0) {
      container.innerHTML = '<p class="empty-state">저장한 맛집이 없습니다.</p>';
      return;
    }

    container.innerHTML = savedList.map(item => `
      <div class="saved-item" data-restaurant-id="${item.id}">
        <div class="saved-item-info">
          <p class="saved-item-name">${item.name}</p>
          <p class="saved-item-location">${item.location}</p>
        </div>
        <div class="saved-item-meta">
          <span class="saved-item-date">${this.formatDate(item.savedAt)}</span>
          <button class="remove-saved-btn" data-restaurant-id="${item.id}">삭제</button>
        </div>
      </div>
    `).join('');

    // 저장 아이템 클릭 이벤트
    container.querySelectorAll('.saved-item').forEach(item => {
      item.addEventListener('click', (e) => {
        // 삭제 버튼 클릭 시에는 이동하지 않음
        if (e.target.classList.contains('remove-saved-btn')) return;

        const restaurantId = item.dataset.restaurantId;
        Router.navigateTo('detail', { restaurantId });
      });
    });

    // 삭제 버튼 이벤트
    container.querySelectorAll('.remove-saved-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const restaurantId = btn.dataset.restaurantId;
        this.removeSaved(restaurantId);
      });
    });
  },

  renderRecentRestaurants() {
    const container = document.getElementById('recent-restaurants-list');
    const countEl = document.getElementById('recent-count');

    // localStorage에서 최근 본 목록 가져오기
    let recentList = [];
    try {
      const recent = localStorage.getItem('recentRestaurants');
      recentList = recent ? JSON.parse(recent) : [];
    } catch (e) {
      console.error('최근 본 목록을 불러올 수 없습니다:', e);
    }

    // 최신순으로 최대 10개만 표시
    recentList = recentList.slice(0, 10);
    countEl.textContent = `${recentList.length}개`;

    if (recentList.length === 0) {
      container.innerHTML = '<p class="empty-state">최근 본 맛집이 없습니다.</p>';
      return;
    }

    container.innerHTML = recentList.map(item => `
      <div class="recent-item" data-restaurant-id="${item.id}">
        <div class="recent-item-info">
          <p class="recent-item-name">${item.name}</p>
          <p class="recent-item-location">${item.location}</p>
        </div>
        <span class="recent-item-date">${this.formatDate(item.viewedAt)}</span>
      </div>
    `).join('');

    // 최근 아이템 클릭 이벤트
    container.querySelectorAll('.recent-item').forEach(item => {
      item.addEventListener('click', () => {
        const restaurantId = item.dataset.restaurantId;
        Router.navigateTo('detail', { restaurantId });
      });
    });
  },

  async renderMyComments() {
    const container = document.getElementById('my-comments-list');
    const countEl = document.getElementById('comments-count');

    try {
      const userId = AuthModule.getUserId();
      if (!userId) {
        container.innerHTML = '<p class="empty-state">로그인이 필요합니다.</p>';
        return;
      }

      const comments = await CommentsModule.getUserComments(userId);
      countEl.textContent = `${comments.length}개`;

      if (comments.length === 0) {
        container.innerHTML = '<p class="empty-state">작성한 후기가 없습니다.</p>';
        return;
      }

      container.innerHTML = comments.map(comment => `
        <div class="my-comment-item">
          <p class="my-comment-restaurant">${comment.restaurant_name || '식당 정보 없음'}</p>
          <p class="my-comment-content">${comment.content}</p>
          <div class="my-comment-meta">
            <span class="my-comment-date">${this.formatDate(comment.created_at)}</span>
            <div class="my-comment-actions">
              <button class="comment-edit-btn" data-comment-id="${comment.id}">수정</button>
              <button class="comment-delete-btn" data-comment-id="${comment.id}">삭제</button>
            </div>
          </div>
        </div>
      `).join('');

      // 수정/삭제 버튼 핸들러
      this.attachCommentHandlers();
    } catch (err) {
      console.error('후기 목록을 불러올 수 없습니다:', err);
      container.innerHTML = '<p class="empty-state">후기를 불러올 수 없습니다.</p>';
    }
  },

  renderStats() {
    // 저장한 맛집 수
    let savedCount = 0;
    try {
      const saved = localStorage.getItem('savedRestaurants');
      savedCount = saved ? JSON.parse(saved).length : 0;
    } catch (e) {}

    document.getElementById('stat-saved').textContent = savedCount;

    // 작성한 후기 수는 비동기로 업데이트
    CommentsModule.getUserComments(AuthModule.getUserId()).then(comments => {
      document.getElementById('stat-comments').textContent = comments.length;
    }).catch(() => {
      document.getElementById('stat-comments').textContent = '0';
    });

    // 방문한 맛집은 최근 본 목록 기준
    let visitCount = 0;
    try {
      const recent = localStorage.getItem('recentRestaurants');
      visitCount = recent ? JSON.parse(recent).length : 0;
    } catch (e) {}

    document.getElementById('stat-visits').textContent = visitCount;
  },

  setupEventListeners() {
    // 로그아웃 버튼 (이벤트 리스너 중복 방지를 위해 버튼 복제)
    const oldBtn = document.getElementById('logout-button');
    if (oldBtn) {
      const newBtn = oldBtn.cloneNode(true);
      oldBtn.parentNode.replaceChild(newBtn, oldBtn);

      newBtn.addEventListener('click', async () => {
        if (confirm('로그아웃하시겠습니까?')) {
          try {
            await AuthModule.signOut();
            alert('로그아웃되었습니다.');
            Router.navigateTo('home');
          } catch (err) {
            alert('로그아웃에 실패했습니다.');
          }
        }
      }, { once: true });
    }
  },

  attachCommentHandlers() {
    // 수정 버튼
    document.querySelectorAll('#my-comments-list .comment-edit-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const commentId = e.target.dataset.commentId;
        const commentItem = e.target.closest('.my-comment-item');
        const currentContent = commentItem.querySelector('.my-comment-content').textContent;

        const newContent = prompt('수정할 내용을 입력하세요:', currentContent);
        if (newContent && newContent.trim() !== currentContent) {
          try {
            await CommentsModule.updateComment(commentId, newContent);
            this.renderMyComments();
            alert('후기가 수정되었습니다.');
          } catch (err) {
            alert(err.message || '수정에 실패했습니다.');
          }
        }
      });
    });

    // 삭제 버튼
    document.querySelectorAll('#my-comments-list .comment-delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const commentId = e.target.dataset.commentId;

        if (confirm('정말 삭제하시겠습니까?')) {
          try {
            await CommentsModule.deleteComment(commentId);
            this.renderMyComments();
            this.renderStats(); // 통계 업데이트
            alert('후기가 삭제되었습니다.');
          } catch (err) {
            alert(err.message || '삭제에 실패했습니다.');
          }
        }
      });
    });
  },

  removeSaved(restaurantId) {
    try {
      let savedList = [];
      const saved = localStorage.getItem('savedRestaurants');
      savedList = saved ? JSON.parse(saved) : [];

      savedList = savedList.filter(item => item.id !== restaurantId);
      localStorage.setItem('savedRestaurants', JSON.stringify(savedList));

      // 다시 렌더링
      this.renderSavedRestaurants();
      this.renderStats();
    } catch (e) {
      console.error('저장 목록 삭제 실패:', e);
      alert('삭제에 실패했습니다.');
    }
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    } else if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return '방금 전';
    }
  }
};

// ========================================
// 모달 컨트롤러 (로그인/회원가입)
// ========================================
const ModalController = {
  initialized: false,

  init() {
    if (this.initialized) return; // 중복 초기화 방지
    console.log('ModalController.init() called');
    this.setupLoginModal();
    this.setupSignupModal();
    this.initialized = true;
    console.log('ModalController initialized successfully');
  },

  // 로그인 모달 설정
  setupLoginModal() {
    const modal = document.getElementById('login-modal');
    const closeBtn = document.getElementById('login-modal-close');
    const form = document.getElementById('email-login-form');
    const googleBtn = document.getElementById('google-login-btn');
    const showSignupBtn = document.getElementById('show-signup-btn');

    // 닫기 버튼
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    // 오버레이 클릭 시 닫기
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

    // 이메일 로그인 폼
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
          await AuthModule.signIn(email, password);
          modal.style.display = 'none';
          form.reset();
          alert('로그인되었습니다!');
        } catch (err) {
          alert(err.message || '로그인에 실패했습니다.');
        }
      });
    }

    // 구글 로그인
    if (googleBtn) {
      googleBtn.addEventListener('click', async () => {
        try {
          console.log('Google login button clicked');
          await AuthModule.signInWithGoogle();
          // OAuth는 리다이렉트되므로 여기까지 오지 않음
        } catch (err) {
          console.error('Google login error:', err);
          alert('구글 로그인 오류: ' + (err.message || '알 수 없는 오류가 발생했습니다.'));
        }
      });
    }

    // 회원가입 모달로 전환
    if (showSignupBtn) {
      showSignupBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        this.openSignupModal();
      });
    }
  },

  // 회원가입 모달 설정
  setupSignupModal() {
    const modal = document.getElementById('signup-modal');
    const closeBtn = document.getElementById('signup-modal-close');
    const form = document.getElementById('email-signup-form');
    const googleBtn = document.getElementById('google-signup-btn');
    const showLoginBtn = document.getElementById('show-login-btn');

    // 닫기 버튼
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    // 오버레이 클릭 시 닫기
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

    // 이메일 회원가입 폼
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
          await AuthModule.signUp(email, password);
          modal.style.display = 'none';
          form.reset();
          alert('가입이 완료되었습니다! 이메일을 확인해주세요.');
        } catch (err) {
          alert(err.message || '회원가입에 실패했습니다.');
        }
      });
    }

    // 구글 회원가입 (로그인과 동일)
    if (googleBtn) {
      googleBtn.addEventListener('click', async () => {
        try {
          console.log('Google signup button clicked');
          await AuthModule.signInWithGoogle();
          // OAuth는 리다이렉트되므로 여기까지 오지 않음
        } catch (err) {
          console.error('Google signup error:', err);
          alert('구글 가입 오류: ' + (err.message || '알 수 없는 오류가 발생했습니다.'));
        }
      });
    }

    // 로그인 모달로 전환
    if (showLoginBtn) {
      showLoginBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        this.openLoginModal();
      });
    }
  },

  // 로그인 모달 열기
  openLoginModal() {
    console.log('openLoginModal called');
    const modal = document.getElementById('login-modal');
    console.log('Login modal element:', modal);

    if (modal) {
      modal.style.display = 'flex';
      console.log('Login modal display set to flex');
    } else {
      console.error('login-modal element not found!');
    }
  },

  // 회원가입 모달 열기
  openSignupModal() {
    console.log('openSignupModal called');
    const modal = document.getElementById('signup-modal');
    console.log('Signup modal element:', modal);

    if (modal) {
      modal.style.display = 'flex';
      console.log('Signup modal display set to flex');
    } else {
      console.error('signup-modal element not found!');
    }
  }
};

// ModalController를 즉시 전역으로 노출
// 이렇게 하면 DOMContentLoaded를 기다리지 않고도 사용 가능
window.ModalController = ModalController;
console.log('ModalController exposed globally (before DOMContentLoaded)');

// ========================================
// Article Modal Controller
// ========================================

const ArticleModalController = {
  modal: null,
  overlay: null,
  content: null,
  closeBtn: null,

  init() {
    console.log('ArticleModalController.init() called');
    this.modal = document.getElementById('article-modal');
    this.overlay = this.modal?.querySelector('.article-modal-overlay');
    this.content = this.modal?.querySelector('.article-modal-content');
    this.closeBtn = this.modal?.querySelector('.article-close-btn');

    if (!this.modal) {
      console.error('Article modal element not found!');
      return;
    }

    // Close button event
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Overlay click to close
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display !== 'none') {
        this.close();
      }
    });

    console.log('ArticleModalController initialized successfully');
  },

  open(articleId) {
    console.log('Opening article:', articleId);

    if (!window.newsArticles) {
      console.error('newsArticles not loaded!');
      alert('기사 데이터를 불러올 수 없습니다.');
      return;
    }

    const article = window.newsArticles.find(a => a.id === articleId);
    if (!article) {
      console.error('Article not found:', articleId);
      alert('기사를 찾을 수 없습니다.');
      return;
    }

    this.renderArticle(article);
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent body scroll

    // Update URL hash for SEO
    window.location.hash = `news/${articleId}`;

    // Google Analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'view_article', {
        'event_category': '맛집 뉴스',
        'event_label': article.title,
        'value': 1
      });
    }
  },

  close() {
    console.log('Closing article modal');
    this.modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore body scroll

    // Return to news section hash
    if (window.location.hash.startsWith('#news/')) {
      window.location.hash = 'news';
    }
  },

  renderArticle(article) {
    // Update meta information
    const categoryEl = this.modal.querySelector('.article-category');
    const titleEl = this.modal.querySelector('.article-title');
    const dateEl = this.modal.querySelector('.article-date');
    const authorEl = this.modal.querySelector('.article-author');
    const readTimeEl = this.modal.querySelector('.article-readtime');
    const bodyEl = this.modal.querySelector('.article-body');

    if (categoryEl) categoryEl.textContent = article.category;
    if (titleEl) titleEl.textContent = article.title;
    if (dateEl) {
      dateEl.textContent = article.date;
      dateEl.setAttribute('datetime', article.date);
    }
    if (authorEl) authorEl.textContent = article.author;
    if (readTimeEl) readTimeEl.textContent = article.readTime;
    if (bodyEl) bodyEl.innerHTML = article.content;

    // Setup share button
    const shareBtn = this.modal.querySelector('.share-btn');
    if (shareBtn) {
      const newShareBtn = shareBtn.cloneNode(true);
      shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);
      newShareBtn.addEventListener('click', () => this.shareArticle(article));
    }

    // Render related restaurants
    this.renderRelatedRestaurants(article.relatedRestaurants);

    // Setup internal restaurant links
    const restaurantLinks = bodyEl.querySelectorAll('a[data-restaurant]');
    restaurantLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const restaurantId = link.getAttribute('data-restaurant');
        this.close();
        // Navigate to list screen with restaurant detail
        Router.navigateTo('list', { highlightId: restaurantId });
        // Find and open restaurant detail
        setTimeout(() => {
          const restaurant = window.allRestaurants?.find(r => r.id === restaurantId);
          if (restaurant) {
            DetailScreen.render(restaurant);
            Router.navigateTo('detail', restaurant);
          }
        }, 300);
      });
    });
  },

  renderRelatedRestaurants(restaurantIds) {
    const container = document.getElementById('article-related-restaurants');
    if (!container || !restaurantIds || restaurantIds.length === 0) {
      if (container) container.innerHTML = '';
      return;
    }

    const restaurants = restaurantIds
      .map(id => window.allRestaurants?.find(r => r.id === id))
      .filter(r => r); // Remove undefined

    if (restaurants.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <h3>관련 맛집</h3>
      ${restaurants.map(r => `
        <div class="related-restaurant-card" data-restaurant-id="${r.id}">
          <div class="related-restaurant-name">${r.name}</div>
          <div class="related-restaurant-info">${r.location || r.region} · ${r.category}</div>
        </div>
      `).join('')}
    `;

    // Add click handlers to related restaurant cards
    const cards = container.querySelectorAll('.related-restaurant-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const restaurantId = card.getAttribute('data-restaurant-id');
        const restaurant = restaurants.find(r => r.id === restaurantId);
        if (restaurant) {
          this.close();
          DetailScreen.render(restaurant);
          Router.navigateTo('detail', restaurant);
        }
      });
    });
  },

  shareArticle(article) {
    const url = `https://kpopeats.cc/#news/${article.id}`;
    const text = `${article.title} - KPopEats`;

    if (navigator.share) {
      // Use native share API on mobile
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: url
      }).then(() => {
        console.log('Article shared successfully');
      }).catch((error) => {
        console.error('Error sharing article:', error);
        this.fallbackShare(url);
      });
    } else {
      // Fallback: copy to clipboard
      this.fallbackShare(url);
    }
  },

  fallbackShare(url) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      }).catch(() => {
        this.showUrlPrompt(url);
      });
    } else {
      this.showUrlPrompt(url);
    }
  },

  showUrlPrompt(url) {
    prompt('이 링크를 복사하세요:', url);
  }
};

// Expose globally
window.ArticleModalController = ArticleModalController;
console.log('ArticleModalController exposed globally');

// ========================================
// ReservationModule - 예약 링크 관리
// ========================================
const ReservationModule = {
  /**
   * 예약 링크 열기
   * @param {string} restaurantId - 레스토랑 ID (rest-001 등)
   * @param {string} platform - 'catchtable', 'naver', 'phone'
   */
  async open(restaurantId, platform = 'catchtable') {
    console.log(`Opening reservation: ${restaurantId} on ${platform}`);

    // 1. 구독자 체크 (현재 비활성화 - 모든 플랫폼 무료)
    // 유료화 시 주석 해제:
    // if (!this.checkSubscription()) {
    //   return;
    // }

    // 2. 레스토랑 정보 조회
    const restaurant = this.getRestaurant(restaurantId);
    if (!restaurant) {
      alert('레스토랑 정보를 찾을 수 없습니다.');
      return;
    }

    // 3. 예약 링크 가져오기
    const link = this.getReservationLink(restaurant, platform);
    if (!link) {
      alert('예약 링크를 사용할 수 없습니다. 전화 예약을 이용해주세요.');
      return;
    }

    // 4. 추적 (Analytics)
    await this.trackClick(restaurantId, platform);

    // 5. 딥링크 열기
    this.openLink(link, platform, restaurant);
  },

  /**
   * 구독자 체크 (현재 비활성화)
   *
   * 전략: 먼저 트래픽을 모으고, 나중에 유료화
   * TODO: 나중에 유료화 시 이 함수를 다시 활성화
   */
  checkSubscription() {
    // ⚠️ 현재 모든 사용자에게 무료 제공
    // 트래픽 확보 후 유료화 예정
    return true;

    /* 유료화 시 아래 코드 활성화:

    // AuthModule이 로드되었는지 확인
    if (typeof AuthModule === 'undefined') {
      console.error('AuthModule not loaded');
      alert('인증 시스템을 초기화하는 중입니다. 잠시 후 다시 시도해주세요.');
      return false;
    }

    // 구독자 체크
    const isSubscriber = AuthModule.isSubscriber && AuthModule.isSubscriber();

    if (!isSubscriber) {
      // 페이월 모달 표시
      this.showPaywall('reservation');
      return false;
    }

    return true;
    */
  },

  /**
   * 레스토랑 정보 조회
   */
  getRestaurant(restaurantId) {
    // nearbySpots에서 찾기
    if (window.nearbySpots) {
      const found = window.nearbySpots.find(r => r.id === restaurantId);
      if (found) return found;
    }

    // allRestaurants에서 찾기
    if (window.allRestaurants) {
      const found = window.allRestaurants.find(r => r.id === restaurantId);
      if (found) return found;
    }

    return null;
  },

  /**
   * 예약 링크 가져오기
   */
  getReservationLink(restaurant, platform) {
    // reservation 객체가 있는 경우 (새 스키마)
    if (restaurant.reservation && restaurant.reservation.links) {
      return restaurant.reservation.links[platform] || null;
    }

    // 레거시: 개별 필드로 저장된 경우
    switch (platform) {
      case 'catchtable':
        return restaurant.catchtableUrl || null;
      case 'naver':
        return restaurant.naverPlaceUrl || null;
      case 'phone':
        return restaurant.phone ? `tel:${restaurant.phone}` : null;
      default:
        return null;
    }
  },

  /**
   * 딥링크 열기
   */
  openLink(link, platform, restaurant) {
    if (platform === 'phone') {
      // 전화는 바로 실행
      window.location.href = link;
    } else {
      // 웹 링크는 새 창
      window.open(link, '_blank', 'noopener,noreferrer');

      // 방문 인증 안내 토스트 (1초 후)
      setTimeout(() => {
        this.showToast('💡 방문 후 인증하면 만족도 낮을 시 환불 가능!');
      }, 1000);
    }
  },

  /**
   * 클릭 추적 (Supabase + Google Analytics)
   */
  async trackClick(restaurantId, platform) {
    // Supabase 추적
    try {
      if (typeof supabase !== 'undefined' && AuthModule.currentUser) {
        await supabase.from('reservation_clicks').insert({
          user_id: AuthModule.currentUser.id,
          restaurant_id: restaurantId,
          platform: platform,
          clicked_at: new Date().toISOString()
        });
        console.log('Reservation click tracked in Supabase');
      }
    } catch (err) {
      console.error('Failed to track in Supabase:', err);
      // 실패해도 계속 진행
    }

    // Google Analytics 추적
    if (typeof gtag !== 'undefined') {
      gtag('event', 'reservation_click', {
        'event_category': '예약',
        'event_label': restaurantId,
        'platform': platform,
        'value': 1
      });
      console.log('Reservation click tracked in GA');
    }
  },

  /**
   * 페이월 모달 표시
   */
  showPaywall(context = 'reservation') {
    const messages = {
      reservation: '예약 링크를 보려면 구독이 필요합니다.',
      full_list: '전체 100+ 맛집을 보려면 구독하세요.',
      price: '가격 정보는 구독자만 볼 수 있습니다.',
      menu: '추천 메뉴는 구독자 전용입니다.'
    };

    const message = messages[context] || messages.reservation;

    // 간단한 confirm 대화상자 (추후 모달로 개선)
    const subscribe = confirm(
      `${message}\n\n월 9,900원 · 7일 무료 체험\n\n지금 구독하시겠습니까?`
    );

    if (subscribe) {
      // 구독 페이지로 이동 또는 모달 열기
      if (typeof SubscriptionModule !== 'undefined' && SubscriptionModule.startCheckout) {
        SubscriptionModule.startCheckout();
      } else {
        Router.navigateTo('mypage');
      }
    }
  },

  /**
   * 토스트 메시지 표시
   */
  showToast(message, duration = 3000) {
    // 토스트 엘리먼트가 없으면 생성
    let toast = document.getElementById('reservation-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'reservation-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 12px 24px;
        border-radius: 24px;
        font-size: 14px;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
        max-width: 90%;
        text-align: center;
      `;
      document.body.appendChild(toast);
    }

    // 메시지 표시
    toast.textContent = message;
    toast.style.opacity = '1';

    // 지정된 시간 후 숨김
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }
};

// Expose globally
window.ReservationModule = ReservationModule;
console.log('ReservationModule exposed globally');

// ========================================
// 전역 초기화
// ========================================

// ========================================
// SubscriptionModule은 subscription.js에 정의되어 있습니다.
// ========================================

// 디버깅용 전역 함수
window.testLoginModal = function() {
  console.log('Testing login modal...');
  if (window.ModalController) {
    window.ModalController.openLoginModal();
  } else {
    alert('ModalController not ready yet');
  }
};

window.testSignupModal = function() {
  console.log('Testing signup modal...');
  if (window.ModalController) {
    window.ModalController.openSignupModal();
  } else {
    alert('ModalController not ready yet');
  }
};

// 버튼 클릭 핸들러 (전역 함수)
window.handleUserMenuClick = function() {
  console.log('Global handleUserMenuClick called');
  if (!window.ModalController) {
    console.error('ModalController not loaded yet!');
    alert('잠시 후 다시 시도해주세요.');
    return;
  }

  // AuthModule이 로드되지 않았을 경우 대비
  const isAuth = (typeof AuthModule !== 'undefined' && AuthModule.isAuthenticated && AuthModule.isAuthenticated()) || false;

  console.log('Authenticated:', isAuth);

  if (isAuth) {
    // 로그인 상태 - 마이페이지로 이동
    console.log('Navigating to mypage...');
    Router.navigateTo('mypage');
  } else {
    // 비로그인 상태 - 로그인 모달 열기
    console.log('Opening login modal...');
    window.ModalController.openLoginModal();
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Trust Route App Initialized');
  document.body.classList.add('js-enabled');

  // 인증 시스템 초기화 (백그라운드에서 실행 - UI를 블록하지 않음)
  AuthModule.init().catch(err => {
    console.error('AuthModule initialization failed:', err);
  });

  // 모달 컨트롤러 초기화 (이벤트 리스너 설정)
  // ModalController는 이미 전역으로 노출되어 있음
  try {
    console.log('Initializing ModalController event listeners...');
    ModalController.init();
    console.log('ModalController initialized');
  } catch (err) {
    console.error('ModalController initialization failed:', err);
  }

  // Article Modal Controller 초기화
  try {
    console.log('Initializing ArticleModalController...');
    ArticleModalController.init();
    console.log('ArticleModalController initialized');
  } catch (err) {
    console.error('ArticleModalController initialization failed:', err);
  }

  // News article "자세히 보기" buttons
  try {
    const newsReadBtns = document.querySelectorAll('.news-read-btn');
    console.log(`Found ${newsReadBtns.length} news read buttons`);

    newsReadBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Article IDs in order: michelin-2026-02, culinary-wars-2026-01, celebrity-picks-2026-01, hotplace-2026-02
        const articleIds = [
          'michelin-2026-02',
          'culinary-wars-2026-01',
          'celebrity-picks-2026-01',
          'hotplace-2026-02'
        ];
        const articleId = articleIds[index];
        if (articleId) {
          ArticleModalController.open(articleId);
        } else {
          console.error('Unknown article index:', index);
        }
      });
    });
  } catch (err) {
    console.error('News buttons setup failed:', err);
  }

  // 흑백요리사 셰프 카드 클릭 이벤트
  try {
    const chefCards = document.querySelectorAll('.chef-card');
    console.log(`Found ${chefCards.length} chef cards`);

    chefCards.forEach(card => {
      card.addEventListener('click', () => {
        const restaurantId = card.dataset.restaurantId;
        const restaurantName = card.dataset.restaurantName;

        if (restaurantId) {
          // ID가 있으면 직접 상세 페이지로 이동
          Router.navigateTo('detail', { restaurantId, scrollToDirections: true });
        } else if (restaurantName) {
          // 이름으로 검색해서 찾기
          const restaurant = window.allRestaurants?.find(r =>
            r.name.includes(restaurantName) || r.badgeType?.includes(restaurantName)
          );
          if (restaurant) {
            Router.navigateTo('detail', { restaurantId: restaurant.id, scrollToDirections: true });
          } else {
            // 음식점을 찾을 수 없으면 리스트 화면으로 이동 (흑백요리사 필터 적용)
            Router.navigateTo('list');
            setTimeout(() => {
              // 흑백요리사 탭 클릭
              const chefTab = document.querySelector('.trust-tab[data-tab="chef"]');
              if (chefTab) {
                chefTab.click();
              }
            }, 100);
          }
        }
      });
    });
  } catch (err) {
    console.error('Chef cards setup failed:', err);
  }

  // Stripe 구독 모듈 초기화
  try {
    console.log('Initializing SubscriptionModule...');
    SubscriptionModule.init();
    console.log('SubscriptionModule initialized');
  } catch (err) {
    console.error('SubscriptionModule initialization failed:', err);
  }

  // 라우터 초기화
  try {
    console.log('Initializing Router...');
    Router.init();
    console.log('Router initialized');
  } catch (err) {
    console.error('Router initialization failed:', err);
  }

  // 브랜드 로고 클릭
  const titleLink = document.querySelector('.title-link');
  if (titleLink) {
    titleLink.addEventListener('click', () => {
      Router.navigateTo('home');
    });
  }

  // 네비게이션 버튼
  const navButtons = document.querySelectorAll('.nav-button');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.target;
      Router.navigateTo(target);
    });
  });

  // 햄버거 메뉴 (모바일)
  const hamburger = document.querySelector('.hamburger-menu');
  const topNav = document.querySelector('.top-nav');
  if (hamburger && topNav) {
    hamburger.addEventListener('click', () => {
      topNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
    });
  }

  // 검색 기능
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    // 디바운스 타이머
    let searchTimeout = null;

    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim().toLowerCase();

      searchTimeout = setTimeout(() => {
        AppState.searchQuery = query;

        // 현재 리스트 화면이면 즉시 필터링
        if (AppState.currentScreen === 'list') {
          ListScreen.renderList();
        }
      }, 300); // 300ms 디바운스
    });

    // 엔터 키로 검색
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = e.target.value.trim().toLowerCase();
        AppState.searchQuery = query;

        // 리스트 화면으로 이동
        Router.navigateTo('list');
      }
    });
  }
});
