document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.page-section');
    const titleLink = document.querySelector('.title-link');
    const heroButtons = document.querySelectorAll('.hero-actions button');

    const nearbyList = document.getElementById('nearby-list');
    const evidenceList = document.getElementById('evidence-list');

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

            return `
                <article class="info-card" style="--delay:${index * 0.08}s">
                    <div class="card-meta">
                        <span class="status-pill">${statusLabel}</span>
                        <span>${item.travelTime}</span>
                    </div>
                    <span class="card-title">${item.name}</span>
                    <span class="card-location">${item.location}</span>
                    <p class="card-context">${item.context}</p>
                    <div class="card-badges">${badgeMarkup}</div>
                    <div class="card-footer">
                        <span>${item.bestRoute}</span>
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
                    <h4>${item.title}</h4>
                    <p>${item.caption}</p>
                    <div class="card-footer">
                        <span>${item.sourceLabel}</span>
                        <span>확인일: ${item.verifiedAt}</span>
                    </div>
                </article>
            `;
        }).join('');
    };

    renderNearbyCards(nearbySpots, nearbyList);
    renderEvidenceCards(trustEvidence, evidenceList);
});
