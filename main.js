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
// 모달 컨트롤러 (로그인/회원가입)
// ========================================
const ModalController = {
  init() {
    console.log('ModalController.init() called');
    this.setupLoginModal();
    this.setupSignupModal();
    // user-menu는 inline onclick으로 처리
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

  // 사용자 메뉴 클릭 핸들러 (inline onclick에서 호출됨)
  handleUserMenuClick() {
    console.log('handleUserMenuClick called, authenticated:', AuthModule.isAuthenticated());

    if (AuthModule.isAuthenticated()) {
      // 로그인 상태 - 로그아웃
      if (confirm('로그아웃하시겠습니까?')) {
        AuthModule.signOut().then(() => {
          alert('로그아웃되었습니다.');
        }).catch(err => {
          alert('로그아웃에 실패했습니다.');
        });
      }
    } else {
      // 비로그인 상태 - 로그인 모달 열기
      console.log('Opening login modal...');
      this.openLoginModal();
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

// ========================================
// 전역 초기화
// ========================================
// 디버깅용 전역 함수
window.testLoginModal = function() {
  console.log('Testing login modal...');
  ModalController.openLoginModal();
};

window.testSignupModal = function() {
  console.log('Testing signup modal...');
  ModalController.openSignupModal();
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

  // 모달 컨트롤러 초기화 (인증과 무관하게 작동해야 함)
  try {
    console.log('Initializing ModalController...');
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
