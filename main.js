document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    const themeSwitch = document.getElementById('checkbox');
    const regions = document.querySelectorAll('.region');
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.page-section');

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

    const tmStartButton = document.getElementById('tm-start');
    const tmStatus = document.getElementById('tm-status');
    const tmWebcamContainer = document.getElementById('tm-webcam');
    const tmLabelContainer = document.getElementById('tm-labels');
    const tmURL = 'https://teachablemachine.withgoogle.com/models/LnWUKS2tE/';
    let tmModel = null;
    let tmWebcam = null;
    let tmMaxPredictions = 0;
    let tmAnimationId = null;
    let tmRunning = false;

    const setActiveSection = (target) => {
        navButtons.forEach(button => {
            button.classList.toggle('is-active', button.dataset.target === target);
        });
        sections.forEach(section => {
            section.classList.toggle('is-active', section.dataset.section === target);
        });
        if (target !== 'teachable') {
            stopTeachable();
        }
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => setActiveSection(button.dataset.target));
    });

    const ensureTeachableModel = async () => {
        if (tmModel) {
            return;
        }
        if (!window.tmImage) {
            throw new Error('tmImage not loaded');
        }
        const modelURL = `${tmURL}model.json`;
        const metadataURL = `${tmURL}metadata.json`;
        tmModel = await tmImage.load(modelURL, metadataURL);
        tmMaxPredictions = tmModel.getTotalClasses();
    };

    const startTeachable = async () => {
        if (tmRunning || !tmStartButton) {
            return;
        }
        tmStartButton.disabled = true;
        tmStatus.textContent = '모델을 불러오는 중입니다.';
        try {
            await ensureTeachableModel();
            tmWebcamContainer.innerHTML = '';
            if (!tmWebcam) {
                tmWebcam = new tmImage.Webcam(240, 240, true);
            }
            await tmWebcam.setup();
            await tmWebcam.play();
            tmWebcamContainer.appendChild(tmWebcam.canvas);
            tmLabelContainer.innerHTML = '';
            for (let i = 0; i < tmMaxPredictions; i++) {
                tmLabelContainer.appendChild(document.createElement('div'));
            }
            tmRunning = true;
            tmStatus.textContent = '웹캠 실행 중입니다.';
            tmAnimationId = window.requestAnimationFrame(loopTeachable);
        } catch (error) {
            tmStatus.textContent = '웹캠을 시작할 수 없습니다. 권한을 확인해 주세요.';
            tmRunning = false;
        } finally {
            tmStartButton.disabled = false;
        }
    };

    const stopTeachable = () => {
        if (!tmRunning) {
            return;
        }
        tmRunning = false;
        if (tmAnimationId) {
            window.cancelAnimationFrame(tmAnimationId);
            tmAnimationId = null;
        }
        if (tmWebcam) {
            tmWebcam.stop();
        }
        if (tmStatus) {
            tmStatus.textContent = '일시 중지되었습니다.';
        }
    };

    const loopTeachable = async () => {
        if (!tmRunning) {
            return;
        }
        tmWebcam.update();
        await predictTeachable();
        tmAnimationId = window.requestAnimationFrame(loopTeachable);
    };

    const predictTeachable = async () => {
        if (!tmModel || !tmWebcam) {
            return;
        }
        const prediction = await tmModel.predict(tmWebcam.canvas);
        for (let i = 0; i < tmMaxPredictions; i++) {
            const classPrediction = `${prediction[i].className}: ${prediction[i].probability.toFixed(2)}`;
            tmLabelContainer.childNodes[i].innerHTML = classPrediction;
        }
    };

    if (tmStartButton) {
        tmStartButton.addEventListener('click', startTeachable);
    }
});
