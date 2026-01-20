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
      case 'mypage':
        MypageScreen.init();
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

    // 최근 본 목록에 추가
    this.addToRecentViewed(this.currentRestaurant);

    this.render();
    this.setupEventListeners();
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

    // 길찾기 버튼
    replaceButton('detail-directions-btn', () => {
      Router.navigateTo('directions', { restaurantId: this.currentRestaurant.id });
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

  renderProfile() {
    const user = AuthModule.currentUser;
    if (!user) return;

    const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
    const email = user.email;

    document.getElementById('profile-name').textContent = displayName;
    document.getElementById('profile-email').textContent = email;
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
    // 로그아웃 버튼
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        if (confirm('로그아웃하시겠습니까?')) {
          try {
            await AuthModule.signOut();
            alert('로그아웃되었습니다.');
            Router.navigateTo('home');
          } catch (err) {
            alert('로그아웃에 실패했습니다.');
          }
        }
      });
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
          await AuthModule.signInWithGoogle();
        } catch (err) {
          alert(err.message || '구글 로그인에 실패했습니다.');
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
          await AuthModule.signInWithGoogle();
        } catch (err) {
          alert(err.message || '구글 가입에 실패했습니다.');
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
// 전역 초기화
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

  // 인증 시스템 초기화 (에러가 나도 계속 진행)
  try {
    console.log('Initializing AuthModule...');
    await AuthModule.init();
    console.log('AuthModule initialized');
  } catch (err) {
    console.error('AuthModule initialization failed:', err);
    console.log('Continuing without auth...');
  }

  // 모달 컨트롤러 초기화 (이벤트 리스너 설정)
  // ModalController는 이미 전역으로 노출되어 있음
  try {
    console.log('Initializing ModalController event listeners...');
    ModalController.init();
    console.log('ModalController initialized');
  } catch (err) {
    console.error('ModalController initialization failed:', err);
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
});
