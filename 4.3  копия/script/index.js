

const numberLevel = document.querySelectorAll('.number-level');
const startButton = document.querySelector('.start-button');
const centerPlay = document.querySelector('.center');
const headerPlay = document.querySelector('.header_play');
const main = document.querySelector('.main');
const cards = document.querySelectorAll('.memory-card');
const backFace = document.querySelectorAll('.back-face');
const errorBlock = document.querySelectorAll('.error_block');
const timerTime = document.querySelector('.timer_time');
const timeStatus = document.querySelector('.time_status');
const mainScreen =
    '<header class="header_play header_none"><div class="timer timer_block"><h2 class="text text_play">У вас есть 5 секунд, чтобы запомнить карточки!</h2><div class="timer_name timer"><p class="timer timer_name">min</p><p class="timer timer_name">sek</p></div><p class="timer_time">00.00</p></div></header><div class="error_block"></div><section class="center play"><div class="screen"><h1 class="screen-title">Выбери сложность</h1><div class="level"><div class="number-level" data-level="simply"><p class="level-text">1</p></div><div class="number-level" data-level="middle"><p class="level-text">2</p></div><div class="number-level" data-level="hard"><p class="level-text">3</p></div></div><p class="text">*Вы сможете допустить 3 ошибки</p><p class="text">*У вас будет 5 секунд на запоминание карточек</p><button class="start-button">Старт</button></div></section>';
const winScreen =
    '<section class="center play"><div class="screen"><img class="img_status" src="./img/win.svg" alt="победа"><h1 class="screen-title status_title">Вы выиграли!</h1><p class="time_status">Затраченное время:</p><p class="time_status time"></p><button class="start-button again-button">Играть снова</button></div></section>';
const lossScreen =
    '<section class="center play"><div class="screen"><img class="img_status" src="./img/loss.svg" alt="проигрыш"><h1 class="screen-title status_title">Вы проиграли!</h1><p class="time_status">Затраченное время:</p><p class="time_status time"></p><button class="start-button again-button">Играть снова</button></div></section>';

function renderBlock(blockName, container) {
    blockName.innerHTML = container;
}

function variantLevel() {
    const numberLevel = document.querySelectorAll('.number-level');
    for (let i = 0; i < numberLevel.length; i++) {
        let levelButton = numberLevel[i];

        levelButton.addEventListener('click', function () {
            const level = this.getAttribute('data-level');
            numberLevel[i].style.border = '2px solid #ffff';
            window.level = level;
        });
    }
}
variantLevel();

startButton.addEventListener('click', function () {
    
    function startGame() {
        if (window.level === undefined) {
            for (let i = 0; i < numberLevel.length; i++) {
                numberLevel[i].style.border = '2px solid #CD5C5C';
            }
        }

        if (window.level !== undefined) {
            headerPlay.classList.remove('header_none');

            const againButton = document.createElement('button');
            againButton.classList.add('start-button');
            againButton.classList.add('again-button');
            againButton.textContent = 'Начать заново';
            headerPlay.appendChild(againButton);

            if (window.level === 'simply') {
                let playCart = '';
                for (let i = 1; i <= 3; i++) {
                    let rund =
                        Math.floor(Math.random() * Object.keys(cart).length) +
                        1;
                    playCart += cart[rund];
                }

                renderBlock(centerPlay, playCart);
                intervalID = setInterval(timer, 1000);
                povCard();
                setTimeout(showCard, 5000);
            }

            if (window.level === 'middle') {
                let playCart = '';
                for (let i = 1; i <= 6; i++) {
                    let rund =
                        Math.floor(Math.random() * Object.keys(cart).length) +
                        1;
                    playCart += cart[rund];
                }
                renderBlock(centerPlay, playCart);
                intervalID = setInterval(timer, 1000);
                povCard();
                setTimeout(showCard, 5000);
            }

            if (window.level === 'hard') {
                let playCart = '';
                for (let i = 1; i <= 9; i++) {
                    let rund =
                        Math.floor(Math.random() * Object.keys(cart).length) +
                        1;
                    playCart += cart[rund];
                }

                renderBlock(centerPlay, playCart);
                intervalID = setInterval(timer, 1000);
                povCard();
                setTimeout(showCard, 5000);
            }

            againButton.addEventListener('click', function () {
                
                clearInterval(intervalID);
                renderBlock(main, mainScreen);
                window.level = '';
                variantLevel();
                const startButton = document.querySelector('.start-button');

                startButton.addEventListener('click', function () {
                    const numberLevel =
                        document.querySelectorAll('.number-level');

                    if (window.level === '') {
                        for (let i = 0; i < numberLevel.length; i++) {
                            numberLevel[i].style.border = '2px solid #CD5C5C';
                        }
                    }
                    if (window.level !== '') {
                        newGame();
                    }
                });
            });
        }
    }
    startGame();
});

function povCard() {
    const cards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        hasFlippedCard = false;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch =
            firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    let win = 0;
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        win++;
        if (win === 3 && window.level === 'simply') {
            renderBlock(main, winScreen);
            const timeStatus = document.querySelector('.time_status');
            timeStatus.innerHTML = window.timeGame;
            clearInterval(intervalID);
            againGame();
        }
        if (win === 6 && window.level === 'middle') {
            renderBlock(main, winScreen);
            const timeStatus = document.querySelector('.time_status');
            timeStatus.innerHTML = window.timeGame;
            clearInterval(intervalID);
            againGame();
        }
        if (win === 9 && window.level === 'hard') {
            renderBlock(main, winScreen);
            const timeStatus = document.querySelector('.time_status');
            timeStatus.innerHTML = window.timeGame;
            clearInterval(intervalID);
            againGame();
        }
    }

    let counter = 0;
    function unflipCards() {
        counter += 1;

        if (counter === 3) {
            renderBlock(main, lossScreen);
            clearInterval(intervalID);
            const timeStatus = document.querySelector('.time_status');
            timeStatus.innerHTML = window.timeGame;
            againGame();
        }
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            lockBoard = false;
        }, 500);
    }
    (function shuffle() {
        cards.forEach((card) => {
            let ramdomPos = Math.floor(Math.random() * 18);
            card.style.order = ramdomPos;
        });
    })();

    cards.forEach((card) => card.addEventListener('click', flipCard));
}

function showCard() {
    const front = document.querySelectorAll('.front-face');
    for (let f = 0; f < front.length; f++) {
        front[f].classList.remove('front-face');
        front[f].classList.add('new-front-face');
    }
    const back = document.querySelectorAll('.back-face');
    for (let b = 0; b < back.length; b++) {
        back[b].classList.remove('back-face');
        back[b].classList.add('new-back-face');
    }
}

let sek = 0;
let min = 0;
function timer() {
    sek += 1;
    if (sek === 60) {
        sek = 0;
        min += 1;
    }
    let timeGame = `0${min}.${sek}`;
    timerTime.innerHTML = timeGame;
    window.timeGame = timeGame;
}
//почему значения таймера не выводятся на экран игры после начала новой игры
