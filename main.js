document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    const themeSwitch = document.getElementById('checkbox');
    const regions = document.querySelectorAll('.region');
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.page-section');
    const titleLink = document.querySelector('.title-link');

    regions.forEach(region => {
        region.addEventListener('click', () => {
            const regionId = region.dataset.id;
            const regionData = foodData[regionId];
            if (regionData) {
                modalTitle.textContent = regionData.name;
                modalBody.innerHTML = createFoodList(regionData.foods);
                modal.style.display = 'block';
            }
        });
    });

    // Create food list HTML
    function createFoodList(foods) {
        if (foods.length === 0) {
            return '<p>맛집 정보가 아직 없습니다.</p>';
        }
        return foods.map(food => `
            <div class="food-card">
                <img src="${food.img}" alt="${food.name}" loading="lazy" decoding="async">
                <div class="food-info">
                    <h3>${food.name}</h3>
                    <p>${food.desc}</p>
                </div>
            </div>
        `).join('');
    }

    // Close modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Theme switch
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    });

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
        titleLink.addEventListener('click', () => setActiveSection('map'));
    }

});
