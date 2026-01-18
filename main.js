document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.page-section');
    const titleLink = document.querySelector('.title-link');
    const heroButtons = document.querySelectorAll('.hero-actions button');

    const idolList = document.getElementById('idol-list');
    const chefList = document.getElementById('chef-list');

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
        titleLink.addEventListener('click', () => setActiveSection('idol'));
    }

    heroButtons.forEach(button => {
        button.addEventListener('click', () => setActiveSection(button.dataset.target));
    });

    const createSourceLink = (item) => {
        if (!item.sourceUrl) {
            return `<span class="card-source muted">${item.sourceLabel}</span>`;
        }
        return `<a class="card-source" href="${item.sourceUrl}" target="_blank" rel="noopener">${item.sourceLabel}</a>`;
    };

    const renderCards = (items, container, type) => {
        if (!container) return;
        if (!items || items.length === 0) {
            container.innerHTML = '<div class="empty-card">검증 완료된 항목이 준비 중입니다. 제보/제휴 메뉴에서 출처를 공유해 주세요.</div>';
            return;
        }

        container.innerHTML = items.map((item, index) => {
            const badgeClass = item.status === '검증 완료' ? 'badge verified' : 'badge pending';
            const badgeLabel = item.status === '검증 완료' ? '검증 완료' : '검증 중';

            if (type === 'idol') {
                return `
                    <article class="info-card" style="--delay:${index * 0.08}s">
                        <div class="card-header">
                            <span class="card-title">${item.name}</span>
                            <span class="${badgeClass}">${badgeLabel}</span>
                        </div>
                        <p class="card-location">${item.location}</p>
                        <div class="card-meta">
                            <span>아이돌: ${item.idol}</span>
                            <span>메뉴: ${item.menu}</span>
                        </div>
                        <p class="card-context">${item.context}</p>
                        <div class="card-footer">
                            ${createSourceLink(item)}
                            <span class="card-date">업데이트: ${item.updatedAt}</span>
                        </div>
                    </article>
                `;
            }

            return `
                <article class="info-card" style="--delay:${index * 0.08}s">
                    <div class="card-header">
                        <span class="card-title">${item.name}</span>
                        <span class="${badgeClass}">${badgeLabel}</span>
                    </div>
                    <p class="card-location">${item.location}</p>
                    <div class="card-meta">
                        <span>셰프: ${item.chef}</span>
                        <span>시그니처: ${item.signature}</span>
                    </div>
                    <p class="card-context">${item.context}</p>
                    <div class="card-footer">
                        ${createSourceLink(item)}
                        <span class="card-date">업데이트: ${item.updatedAt}</span>
                    </div>
                </article>
            `;
        }).join('');
    };

    renderCards(idolEats, idolList, 'idol');
    renderCards(chefSpots, chefList, 'chef');
});
