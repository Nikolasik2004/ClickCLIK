let count = 0;
let clickValue = 1;
let upgradeCost = 10;
let progreTCost = 1000;
let hapnuTCost = 5000;
let chuvstvuETCost = 500;
let Cto_NE_VeriLCost = 322;
let chuvstvuETEnabled = false;
let autoClickers = 0;
let language = 'ru';

const cookie = document.getElementById('cookie');
const names = ["Timba", "Tumba", "Tomba", "Temba", "Tymba"];
const mammothImages = ['css/images/mammothImages/mamont1.png', 'css/images/mammothImages/mamont2.png', 'css/images/mammothImages/mamont3.png', 'css/images/mammothImages/mamont4.png', 'css/images/mammothImages/mamont5.png', 'css/images/mammothImages/mamont6.png', 'css/images/mammothImages/mamont7.png'];
const congratImages = {
    100: 'css/cogratulire/100.png',
    500: 'css/cogratulire/500.png',
    1000: 'css/cogratulire/1000.png',
    5000: 'css/cogratulire/5000.png',
    10000: 'css/cogratulire/10000.png'
};

const translations = {
    ru: {
        upgrade: 'Upgrade (Стоимость: <span id="upgrade-cost">10</span> mamontov)',
        progreT: 'ProgreT (Стоимость: <span id="progreT-cost">1000</span> mamontov)',
        hapnuT: 'HapnuT (Стоимость: <span id="hapnuT-cost">5000</span> mamontov)',
        chuvstvuET: 'ChuvstvuET (Стоимость: <span id="chuvstvuET-cost">500</span> mamontov)',
        Cto_NE_VeriL: 'Cto_NE_VeriL (Стоимость: <span id="Cto_NE_VeriL-cost">322</span> mamontov)',
        chuvstvuETActivated: 'ChuvstvuET активирован!',
        autoClicks: 'Автоклики в секунду: <span id="auto-clicks-per-second">0</span>',
        alert: 'Недостаточно мамонтов!'
    },
    en: {
        upgrade: 'Upgrade (Cost: <span id="upgrade-cost">10</span> mammoths)',
        progreT: 'ProgreT (Cost: <span id="progreT-cost">1000</span> mammoths)',
        hapnuT: 'HapnuT (Cost: <span id="hapnuT-cost">5000</span> mammoths)',
        chuvstvuET: 'ChuvstvuET (Cost: <span id="chuvstvuET-cost">500</span> mammoths)',
        Cto_NE_VeriL: 'Cto_NE_VeriL (Cost: <span id="Cto_NE_VeriL-cost">322</span> mammoths)',
        chuvstvuETActivated: 'ChuvstvuET activated!',
        autoClicks: 'Auto-clicks per second: <span id="auto-clicks-per-second">0</span>',
        alert: 'Not enough mammoths!'
    }
};

const countDisplay = document.getElementById('count');
const upgradeBtn = document.getElementById('upgrade-btn');
const progreTBtn = document.getElementById('progreT-btn');
const hapnuTBtn = document.getElementById('hapnuT-btn');
const chuvstvuETBtn = document.getElementById('chuvstvuET-btn');
const Cto_NE_VeriLBtn = document.getElementById('Cto_NE_VeriL-btn');
const chuvstvuETCostDisplay = document.getElementById('chuvstvuET-cost');
const Cto_NE_VeriLCostDisplay = document.getElementById('Cto_NE_VeriL-cost');
const mammothContainer = document.getElementById('mammoth-container');
const fallingMammothContainer = document.getElementById('falling-mammoth-container');
const congratulationsContainer = document.getElementById('congratulations-container');
const scoreButtons = document.getElementById('score-buttons');
const autoClicksDisplay = document.getElementById('auto-clicks-per-second');
const alertContainer = document.getElementById('alert-container');
const alertBox = document.getElementById('alert-box');
const languageBtn = document.getElementById('language-btn');

cookie.addEventListener('click', () => {
    count += clickValue;
    countDisplay.textContent = count;
    checkForCongratulation();
});

upgradeBtn.addEventListener('click', () => {
    if (count >= upgradeCost) {
        count -= upgradeCost;
        clickValue++;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        countDisplay.textContent = count;
        upgradeBtn.innerHTML = translations[language].upgrade.replace('<span id="upgrade-cost">10</span>', `<span id="upgrade-cost">${upgradeCost}</span>`);
        createSmallMammoth();
    } else {
        showAlert();
    }
});

progreTBtn.addEventListener('click', () => {
    if (count >= progreTCost) {
        count -= progreTCost;
        clickValue *= 2;
        progreTCost += 1000;
        countDisplay.textContent = count;
        progreTBtn.innerHTML = translations[language].progreT.replace('<span id="progreT-cost">1000</span>', `<span id="progreT-cost">${progreTCost}</span>`);
        createSmallMammoth();
    } else {
        showAlert();
    }
});

hapnuTBtn.addEventListener('click', () => {
    if (count >= hapnuTCost) {
        count -= hapnuTCost;
        autoClickers += 89;
        hapnuTCost += 5000;
        countDisplay.textContent = count;
        hapnuTBtn.innerHTML = translations[language].hapnuT.replace('<span id="hapnuT-cost">5000</span>', `<span id="hapnuT-cost">${hapnuTCost}</span>`);
        updateAutoClicksDisplay();
        createSmallMammoth();
    } else {
        showAlert();
    }
});

chuvstvuETBtn.addEventListener('click', () => {
    if (!chuvstvuETEnabled && count >= chuvstvuETCost) {
        count -= chuvstvuETCost;
        chuvstvuETEnabled = true;
        countDisplay.textContent = count;
        chuvstvuETBtn.disabled = true;
        chuvstvuETBtn.textContent = translations[language].chuvstvuETActivated;
        startFallingMammoths();
    } else if (!chuvstvuETEnabled) {
        showAlert();
    }
});

Cto_NE_VeriLBtn.addEventListener('click', () => {
    if (count >= Cto_NE_VeriLCost) {
        count -= Cto_NE_VeriLCost;
        autoClickers += 2;
        Cto_NE_VeriLCost += 100;
        countDisplay.textContent = count;
        Cto_NE_VeriLBtn.innerHTML = translations[language].Cto_NE_VeriL.replace('<span id="Cto_NE_VeriL-cost">322</span>', `<span id="Cto_NE_VeriL-cost">${Cto_NE_VeriLCost}</span>`);
        createMammoth();
        createSmallMammoth();
        updateAutoClicksDisplay();
    } else {
        showAlert();
    }
});

scoreButtons.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const newScore = parseInt(event.target.getAttribute('data-score'));
        if (!isNaN(newScore)) {
            count = newScore;
            countDisplay.textContent = count;
            checkForCongratulation();
        }
    }
});

function createMammoth() {
    const mammoth = document.createElement('div');
    mammoth.className = 'mammoth';
    mammoth.style.left = Math.random() * 100 + 'vw';
    mammoth.style.animationDuration = Math.random() * 5 + 5 + 's';

    const mammothImg = document.createElement('img');
    mammothImg.src = mammothImages[Math.floor(Math.random() * mammothImages.length)];
    mammoth.appendChild(mammothImg);

    const mammothName = document.createElement('p');
    mammothName.textContent = names[Math.floor(Math.random() * names.length)];
    mammoth.appendChild(mammothName);

    mammothContainer.appendChild(mammoth);

    mammoth.addEventListener('click', () => {
        mammoth.style.animation = 'jump 1s ease, flip 1s';
        setTimeout(() => {
            mammoth.style.animation = 'jump 2s ease infinite, move 5s ease-in-out infinite';
        }, 1000);
    });

    setTimeout(() => {
        mammoth.style.animation = 'jump 2s ease infinite, move 5s ease-in-out infinite';
    }, Math.random() * 2000);

    autoClickers++;
    updateAutoClicksDisplay();
}

function createSmallMammoth() {
    const smallMammoth = document.createElement('div');
    smallMammoth.className = 'small-mammoth';
    smallMammoth.style.left = Math.random() * 100 + 'vw';
    smallMammoth.style.animationDuration = Math.random() * 5 + 5 + 's';

    const mammothImg = document.createElement('img');
    mammothImg.src = mammothImages[Math.floor(Math.random() * mammothImages.length)];
    smallMammoth.appendChild(mammothImg);

    const mammothName = document.createElement('p');
    mammothName.textContent = names[Math.floor(Math.random() * names.length)];
    smallMammoth.appendChild(mammothName);

    mammothContainer.appendChild(smallMammoth);

    smallMammoth.addEventListener('click', () => {
        smallMammoth.style.animation = 'jump 1s ease, flip 1s';
        setTimeout(() => {
            smallMammoth.style.animation = 'jump 3s ease-in-out infinite, move 5s linear infinite';
        }, 1000);
    });

    setTimeout(() => {
        smallMammoth.style.animation = 'jump 3s ease-in-out infinite, move 5s linear infinite';
    }, Math.random() * 2000);
}

function createFallingMammoth() {
    const mammoth = document.createElement('div');
    mammoth.className = 'falling-mammoth';
    mammoth.style.left = Math.random() * 100 + 'vw';
    mammoth.style.animationDuration = Math.random() * 5 + 5 + 's';

    const mammothImg = document.createElement('img');
    mammothImg.src = mammothImages[Math.floor(Math.random() * mammothImages.length)];
    mammoth.appendChild(mammothImg);

    const mammothName = document.createElement('p');
    mammothName.textContent = names[Math.floor(Math.random() * names.length)];
    mammoth.appendChild(mammothName);

    fallingMammothContainer.appendChild(mammoth);

    mammoth.addEventListener('click', () => {
        count += 228;
        countDisplay.textContent = count;
        mammoth.remove();
    });

    setTimeout(() => {
        mammoth.remove();
    }, 15000);
}

function startFallingMammoths() {
    setInterval(() => {
        if (chuvstvuETEnabled) {
            createFallingMammoth();
        }
    }, 15000);
}

function autoClick() {
    count += autoClickers;
    countDisplay.textContent = count;
    checkForCongratulation();
}

function checkForCongratulation() {
    const congratImageSrc = congratImages[count];
    if (congratImageSrc) {
        showCongratulation(congratImageSrc);
    }
}

function showCongratulation(imageSrc) {
    const congratImage = document.createElement('img');
    congratImage.src = imageSrc;
    congratImage.onload = () => {
        congratulationsContainer.innerHTML = '';
        congratulationsContainer.appendChild(congratImage);
        congratulationsContainer.style.display = 'block';

        setTimeout(() => {
            congratulationsContainer.style.display = 'none';
        }, 5000);
    };
    congratImage.onerror = () => {
        console.error(`Failed to load congratulation image: ${imageSrc}`);
    };
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomButtonBorders() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.borderColor = getRandomColor();
    });
}

function updateAutoClicksDisplay() {
    autoClicksDisplay.textContent = autoClickers;
}

function showAlert() {
    alertBox.textContent = translations[language].alert;
    alertContainer.style.display = 'flex';
    setTimeout(() => {
        alertContainer.style.display = 'none';
    }, 3000);
}

function translatePage() {
    upgradeBtn.innerHTML = translations[language].upgrade.replace('<span id="upgrade-cost">10</span>', `<span id="upgrade-cost">${upgradeCost}</span>`);
    progreTBtn.innerHTML = translations[language].progreT.replace('<span id="progreT-cost">1000</span>', `<span id="progreT-cost">${progreTCost}</span>`);
    hapnuTBtn.innerHTML = translations[language].hapnuT.replace('<span id="hapnuT-cost">5000</span>', `<span id="hapnuT-cost">${hapnuTCost}</span>`);
    chuvstvuETBtn.innerHTML = translations[language].chuvstvuET.replace('<span id="chuvstvuET-cost">500</span>', `<span id="chuvstvuET-cost">${chuvstvuETCost}</span>`);
    if (chuvstvuETEnabled) {
        chuvstvuETBtn.textContent = translations[language].chuvstvuETActivated;
    }
    Cto_NE_VeriLBtn.innerHTML = translations[language].Cto_NE_VeriL.replace('<span id="Cto_NE_VeriL-cost">322</span>', `<span id="Cto_NE_VeriL-cost">${Cto_NE_VeriLCost}</span>`);
    autoClicksDisplay.innerHTML = translations[language].autoClicks.replace('<span id="auto-clicks-per-second">0</span>', `<span id="auto-clicks-per-second">${autoClickers}</span>`);
}

languageBtn.addEventListener('click', () => {
    language = language === 'ru' ? 'en' : 'ru';
    languageBtn.textContent = language === 'ru' ? 'English' : 'Русский';
    translatePage();
});

setInterval(autoClick, 1000);
setRandomButtonBorders();

for (let i = 0; i < 5; i++) {
    createSmallMammoth();
}
