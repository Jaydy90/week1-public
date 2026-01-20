// ========================================
// Trust Route - Main JavaScript
// Phase 1: SPA Router + 4-Screen Layout
// ========================================

// 전역 상태
const AppState = {
  currentScreen: 'home',
  currentRestaurant: null,
  filters: {
    timeMinutes: 15,
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

    // 대상 섹션 표시
    const targetSection = document.querySelector(`[data-section="${screen}"]`);
    if (targetSection) {
      targetSection.classList.add('is-active');
      window.scrollTo(0, 0);
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
    switch(screen) {
      case 'home':
        HomeScreen.init();
        break;
      case 'list':
        ListScreen.init();
        break;
      case 'detail':
        DetailScreen.init(data.restaurantId);
        break;
      case 'directions':
        DirectionsScreen.init(data.restaurantId);
        break;
      case 'faq':
      case 'partner':
        // 정적 페이지, 별도 초기화 불필요
        break;
    }
  },

  // 초기 라우팅 (페이지 로드 시)
  init() {
    const hash = window.location.hash.replace('#', '');
    const initialScreen = hash || 'home';
    this.navigateTo(initialScreen);

    // 해시 변경 이벤트 리스너
    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && newHash !== AppState.currentScreen) {
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
    this.renderPreviewList();
    this.setupEventListeners();
  },

  renderPreviewList() {
    const container = document.getElementById('home-preview-list');
    if (!container) return;

    // nearbySpots에서 처음 6개만 표시
    const items = nearbySpots.slice(0, 6);

    container.innerHTML = items.map((item, index) => {
      const badges = item.badges || [];
      const badgeMarkup = badges.map(badge => `<span class="badge-chip">${badge}</span>`).join('');

      return `
        <article class="info-card" style="--delay:${index * 0.08}s" data-restaurant-id="${item.id}">
          <div class="card-meta">
            <span class="status-pill">${item.status || '검증 중'}</span>
            <span>${item.travelTime}</span>
          </div>
          <span class="card-title">${item.name}</span>
          <span class="card-location">${item.location}</span>
          <p class="card-context">${item.context}</p>
          <div class="card-badges">${badgeMarkup}</div>
          <div class="card-footer">
            <span>${item.bestRoute}</span>
            <span>저장 ${item.saves}회</span>
          </div>
        </article>
      `;
    }).join('');

    // 카드 클릭 이벤트
    this.attachCardClickHandlers();
  },

  setupEventListeners() {
    // 신뢰 탭
    const trustTabs = document.querySelectorAll('.trust-tab');
    trustTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        AppState.filters.trustTab = tab.dataset.tab;
        trustTabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
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
        Router.navigateTo('detail', { restaurantId });
      });
    });
  }
};

// ========================================
// 리스트 화면
// ========================================
const ListScreen = {
  init() {
    console.log('List screen initialized');
    this.renderList();
    this.setupEventListeners();
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

    // 렌더링
    container.innerHTML = items.map((item, index) => {
      return `
        <article class="info-card" style="--delay:${index * 0.05}s" data-restaurant-id="${item.id}">
          <div class="card-meta">
            <span class="status-pill">${item.badgeType}</span>
            <span>${item.category}</span>
          </div>
          <span class="card-title">${item.name}</span>
          <span class="card-location">${item.region} ${item.area}</span>
          <p class="card-context">대표 메뉴: ${item.mainMenu}</p>
          <div class="card-footer">
            <span>${item.sourceLabel}</span>
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

    // 배지 필터
    if (AppState.filters.badge !== 'all') {
      items = items.filter(item => item.group === AppState.filters.badge);
    }

    return items;
  },

  sortRestaurants(items) {
    // 현재는 기본 정렬만 구현
    return items;
  },

  setupEventListeners() {
    // 필터 버튼
    const filterButtons = document.querySelectorAll('#list .filter-button');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterType = btn.dataset.filter;
        const filterValue = btn.dataset.value;
        AppState.filters[filterType] = filterValue;

        // 같은 그룹의 버튼들 비활성화
        filterButtons.forEach(b => {
          if (b.dataset.filter === filterType) {
            b.classList.toggle('is-active', b === btn);
          }
        });

        this.renderList();
      });
    });

    // 정렬 버튼
    const sortPills = document.querySelectorAll('#list .sort-pill');
    sortPills.forEach(pill => {
      pill.addEventListener('click', () => {
        AppState.sort = pill.dataset.sort;
        sortPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        this.renderList();
      });
    });
  },

  attachCardClickHandlers() {
    const cards = document.querySelectorAll('#list-grid .info-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const restaurantId = card.dataset.restaurantId;
        Router.navigateTo('detail', { restaurantId });
      });
    });
  }
};

// ========================================
// 상세 화면
// ========================================
const DetailScreen = {
  currentRestaurant: null,

  init(restaurantId) {
    console.log('Detail screen initialized for:', restaurantId);

    // 레스토랑 데이터 찾기
    this.currentRestaurant = this.findRestaurant(restaurantId);

    if (!this.currentRestaurant) {
      console.error('Restaurant not found:', restaurantId);
      Router.navigateTo('home');
      return;
    }

    this.render();
    this.setupEventListeners();
  },

  findRestaurant(id) {
    // nearbySpots에서 먼저 찾기
    let restaurant = nearbySpots.find(r => r.id === id);

    // allRestaurants에서 찾기
    if (!restaurant && window.allRestaurants) {
      restaurant = window.allRestaurants.find(r => r.id === id);
    }

    return restaurant;
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

  setupEventListeners() {
    // 뒤로 버튼
    document.getElementById('detail-back-btn').addEventListener('click', () => {
      Router.navigateTo('list');
    });

    // 길찾기 버튼
    document.getElementById('detail-directions-btn').addEventListener('click', () => {
      Router.navigateTo('directions', { restaurantId: this.currentRestaurant.id });
    });

    // 저장 버튼 (Phase 6에서 구현)
    document.getElementById('detail-save-btn').addEventListener('click', () => {
      alert('저장 기능은 곧 제공됩니다.');
    });

    // 공유 버튼 (Phase 6에서 구현)
    document.getElementById('detail-share-btn').addEventListener('click', () => {
      alert('공유 기능은 곧 제공됩니다.');
    });

    // 오정보 신고 버튼
    document.getElementById('detail-report-btn').addEventListener('click', () => {
      Router.navigateTo('partner');
      setTimeout(() => {
        document.getElementById('contact-form-container')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });

    // 댓글 시스템 (기본 UI, 로그인은 Phase 6에서 Supabase Auth로 구현)
    this.setupComments();
  },

  // 댓글 시스템 초기화
  setupComments() {
    const loginBtn = document.getElementById('login-btn');
    const submitCommentBtn = document.getElementById('submit-comment-btn');
    const cancelCommentBtn = document.getElementById('cancel-comment-btn');

    // 로그인 버튼 (임시)
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        alert('로그인 기능은 곧 제공됩니다. (Supabase Auth 연동 예정)');
      });
    }

    // 댓글 작성 버튼
    if (submitCommentBtn) {
      submitCommentBtn.addEventListener('click', () => {
        const commentInput = document.getElementById('comment-input');
        const content = commentInput?.value.trim();

        if (!content) {
          alert('후기 내용을 입력해주세요.');
          return;
        }

        // TODO: Supabase에 댓글 저장
        alert('댓글 저장 기능은 곧 제공됩니다.');
        commentInput.value = '';
      });
    }

    // 취소 버튼
    if (cancelCommentBtn) {
      cancelCommentBtn.addEventListener('click', () => {
        const commentInput = document.getElementById('comment-input');
        if (commentInput) commentInput.value = '';
      });
    }

    // 댓글 목록 로드 (임시 - 나중에 Supabase에서 가져오기)
    this.loadComments();
  },

  // 댓글 로드 (임시 데이터)
  loadComments() {
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) return;

    // TODO: Supabase에서 댓글 데이터 가져오기
    // 현재는 빈 상태 표시
    commentsList.innerHTML = '<p class="empty-comments">아직 작성된 후기가 없습니다. 첫 번째 후기를 남겨보세요!</p>';
  }
};

// ========================================
// 길찾기 화면
// ========================================
const DirectionsScreen = {
  currentRestaurant: null,
  currentTransport: 'walk',

  init(restaurantId) {
    console.log('Directions screen initialized for:', restaurantId);

    // 레스토랑 데이터 찾기
    this.currentRestaurant = DetailScreen.findRestaurant(restaurantId);

    if (!this.currentRestaurant) {
      console.error('Restaurant not found:', restaurantId);
      Router.navigateTo('home');
      return;
    }

    this.render();
    this.setupEventListeners();
  },

  render() {
    const r = this.currentRestaurant;

    // 제목과 위치
    document.getElementById('directions-title').textContent = r.name;
    document.getElementById('directions-location').textContent = r.location || `${r.region} ${r.area}`;

    // 경로 정보
    this.updateRouteInfo();

    // 딥링크 생성
    this.setupDeeplinks();
  },

  updateRouteInfo() {
    const r = this.currentRestaurant;
    const routeDesc = document.getElementById('route-description');

    if (r.travelTime) {
      routeDesc.textContent = `${r.travelTime} 소요 예상`;
    } else {
      routeDesc.textContent = '경로를 계산할 수 없습니다.';
    }
  },

  setupDeeplinks() {
    const r = this.currentRestaurant;

    // 좌표 또는 주소 기반 URL 생성
    const hasCoords = r.lat && r.lng;
    const encodedName = encodeURIComponent(r.name);
    const mapQuery = encodeURIComponent(r.mapQuery || `${r.name} ${r.location || r.region}`);

    // 네이버 지도 딥링크 (카카오맵 제거, 네이버만 사용)
    const naverLink = document.getElementById('naver-deeplink');
    if (naverLink) {
      if (hasCoords) {
        naverLink.href = `https://map.naver.com/v5/directions/-/${r.lng},${r.lat},${encodedName},,/-/car`;
      } else {
        naverLink.href = `https://map.naver.com/v5/search/${mapQuery}`;
      }
    }
  },

  setupEventListeners() {
    // 뒤로 버튼
    document.getElementById('directions-back-btn').addEventListener('click', () => {
      Router.navigateTo('detail', { restaurantId: this.currentRestaurant.id });
    });

    // 이동수단 탭
    const transportTabs = document.querySelectorAll('.transport-tab');
    transportTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentTransport = tab.dataset.transport;
        transportTabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        this.updateRouteInfo();
      });
    });
  }
};

// ========================================
// 전역 초기화
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Trust Route App Initialized');
  document.body.classList.add('js-enabled');

  // 라우터 초기화
  Router.init();

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
});
