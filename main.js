document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.page-section');
    const titleLink = document.querySelector('.title-link');
    const heroButtons = document.querySelectorAll('.hero-actions button');

    const nearbyList = document.getElementById('nearby-list');
    const evidenceList = document.getElementById('evidence-list');
    const nearbyTitle = document.querySelector('[data-section="nearby"] h2');
    const filterPills = document.querySelectorAll('.filter-pill');
    const sortPills = document.querySelectorAll('.sort-pill');
    const michelinList = document.getElementById('michelin-list');
    const celebrityList = document.getElementById('celebrity-list');
    const chefList = document.getElementById('chef-list');
    const chefOnlyList = document.getElementById('chef-only-list');
    const initialMinutes = Number(document.querySelector('.filter-pill.is-active')?.dataset.minutes || 15);
    let activeMinutes = initialMinutes;
    let activeSort = 'distance';

    const setActiveSection = (target) => {
        navButtons.forEach(button => {
            button.classList.toggle('is-active', button.dataset.target === target);
        });
        sections.forEach(section => {
            section.classList.toggle('is-active', section.dataset.section === target);
        });
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => setActiveSection(button.dataset.target));
    });

    if (titleLink) {
        titleLink.addEventListener('click', () => setActiveSection('overview'));
    }

    heroButtons.forEach(button => {
        button.addEventListener('click', () => setActiveSection(button.dataset.target));
    });

    const renderNearbyCards = (items, container) => {
        if (!container) return;
        if (!items || items.length === 0) {
            container.innerHTML = '<div class="info-card">검증 완료된 항목이 준비 중입니다. 제보/제휴 메뉴에서 근거를 공유해 주세요.</div>';
            return;
        }

        container.innerHTML = items.map((item, index) => {
            const badges = item.badges || [];
            const badgeMarkup = badges.map(badge => `<span class="badge-chip">${badge}</span>`).join('');
            const statusLabel = item.status || '검증 중';
            const distanceLabel = item.distanceKm ? `거리 ${item.distanceKm}km` : '';

            return `
                <article class="info-card" style="--delay:${index * 0.08}s">
                    <div class="card-meta">
                        <span class="status-pill">${statusLabel}</span>
                        <span>${item.travelTime}</span>
                        ${distanceLabel ? `<span>${distanceLabel}</span>` : ''}
                    </div>
                    <span class="card-title">${item.name}</span>
                    <span class="card-location">${item.location}</span>
                    <p class="card-context">${item.context}</p>
                    <div class="card-badges">${badgeMarkup}</div>
                    <div class="card-footer">
                        <span>${item.bestRoute}</span>
                        <span>저장 ${item.saves}회</span>
                        <span>업데이트: ${item.updatedAt}</span>
                    </div>
                </article>
            `;
        }).join('');
    };

    const renderEvidenceCards = (items, container) => {
        if (!container) return;
        if (!items || items.length === 0) {
            container.innerHTML = '<div class="evidence-card">신뢰 근거 카드가 준비 중입니다. 제보로 데이터를 채워주세요.</div>';
            return;
        }

        container.innerHTML = items.map(item => {
            return `
                <article class="evidence-card">
                    <div class="evidence-header">
                        <div class="evidence-title">
                            <span class="evidence-icon evidence-icon--${item.icon}">${item.iconLabel}</span>
                            <h4>${item.title}</h4>
                        </div>
                        <span class="evidence-badge">레벨 ${item.level}</span>
                    </div>
                    <p>${item.caption}</p>
                    <div class="evidence-meta">
                        <span>${item.badgeType}</span>
                        <span>${item.verifiedAt}</span>
                    </div>
                    <div class="evidence-meta">
                        <a class="evidence-link" href="${item.sourceUrl}" target="_blank" rel="noopener">${item.sourceLabel}</a>
                        <span>${item.scope}</span>
                    </div>
                </article>
            `;
        }).join('');
    };

    const renderMvpCards = (items, container) => {
        if (!container) return;
        if (!items || items.length === 0) {
            container.innerHTML = '<div class="info-card">데이터 준비 중입니다.</div>';
            return;
        }

        container.innerHTML = items.map((item, index) => {
            const mapQuery = encodeURIComponent(item.mapQuery || `${item.name} ${item.location}`);
            const hasCoords = Number.isFinite(item.lat) && Number.isFinite(item.lng);
            const encodedName = encodeURIComponent(item.name);
            const naverUrl = hasCoords
                ? `nmap://route/public?dlat=${item.lat}&dlng=${item.lng}&dname=${encodedName}&appname=kpopeats.cc`
                : `https://map.naver.com/v5/search/${mapQuery}`;
            const kakaoUrl = hasCoords
                ? `https://map.kakao.com/link/to/${encodedName},${item.lat},${item.lng}`
                : `https://map.kakao.com/?q=${mapQuery}`;
            const routeUrl = hasCoords ? naverUrl : `https://map.naver.com/v5/search/${mapQuery}`;

            return `
                <article class="info-card" style="--delay:${index * 0.06}s">
                    <div class="card-meta">
                        <span class="status-pill">${item.badgeType}</span>
                        <span>${item.category}</span>
                    </div>
                    <span class="card-title">${item.name}</span>
                    <span class="card-location">${item.location}</span>
                    <p class="card-context">대표 메뉴: ${item.mainMenu}</p>
                    ${item.address ? `<p class="card-context">주소: ${item.address}</p>` : ''}
                    <div class="card-footer">
                        <a class="evidence-link" href="${item.sourceUrl}" target="_blank" rel="noopener">${item.sourceLabel}</a>
                        <span>확인일: ${item.verifiedAt}</span>
                    </div>
                    <div class="map-actions">
                        <a class="map-button" href="${routeUrl}" target="_blank" rel="noopener">길찾기(최적)</a>
                        <a class="map-button" href="${naverUrl}" target="_blank" rel="noopener">네이버 길찾기</a>
                        <a class="map-button" href="${kakaoUrl}" target="_blank" rel="noopener">카카오 길찾기</a>
                    </div>
                </article>
            `;
        }).join('');
    };

    const sortNearbyItems = (items) => {
        const sorted = [...items];
        if (activeSort === 'saves') {
            return sorted.sort((a, b) => (b.saves || 0) - (a.saves || 0));
        }
        if (activeSort === 'speed') {
            return sorted.sort((a, b) => (a.travelMinutes || 0) - (b.travelMinutes || 0));
        }
        return sorted.sort((a, b) => {
            const aDistance = a.distanceKm ?? a.travelMinutes ?? 0;
            const bDistance = b.distanceKm ?? b.travelMinutes ?? 0;
            return aDistance - bDistance;
        });
    };

    const updateNearbyView = () => {
        const filtered = nearbySpots.filter(item => item.travelMinutes <= activeMinutes);
        const sorted = sortNearbyItems(filtered);
        renderNearbyCards(sorted, nearbyList);
        if (nearbyTitle) {
            nearbyTitle.textContent = `내 주변 ${activeMinutes}분 후보`;
        }
    };

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            activeMinutes = Number(pill.dataset.minutes);
            filterPills.forEach(btn => btn.classList.toggle('is-active', btn === pill));
            updateNearbyView();
        });
    });

    sortPills.forEach(pill => {
        pill.addEventListener('click', () => {
            activeSort = pill.dataset.sort;
            sortPills.forEach(btn => btn.classList.toggle('is-active', btn === pill));
            updateNearbyView();
        });
    });

    updateNearbyView();
    renderEvidenceCards(trustEvidence, evidenceList);
    renderMvpCards(michelinSpots, michelinList);
    renderMvpCards(celebritySpots, celebrityList);
    renderMvpCards(chefSpots, chefList);
    renderMvpCards(chefSpots, chefOnlyList);
});
