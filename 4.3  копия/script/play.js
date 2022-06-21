function newGame() {
    sek = 0;
    min = 0;
    const centerPlay = document.querySelector('.center');
    const headerPlay = document.querySelector('.header_play');

    headerPlay.classList.remove('header_none');

    const againButton = document.createElement('button');
    againButton.classList.add('start-button');
    againButton.classList.add('again-button');
    againButton.textContent = 'Начать заново';
    headerPlay.appendChild(againButton);

    if (window.level === 'simply') {
        let playCart = '';
        for (let i = 1; i <= 3; i++) {
            let rund = Math.floor(Math.random() * Object.keys(cart).length) + 1;
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
            let rund = Math.floor(Math.random() * Object.keys(cart).length) + 1;
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
            let rund = Math.floor(Math.random() * Object.keys(cart).length) + 1;
            playCart += cart[rund];
        }

        renderBlock(centerPlay, playCart);
        intervalID = setInterval(timer, 1000);
        povCard();
        setTimeout(showCard, 5000);
    }
    againGame();
}

function againGame() {
    const againButton = document.querySelector('.again-button');

    againButton.addEventListener('click', function () {
        clearInterval(intervalID);
        sek = 0;
        min = 0;
        renderBlock(main, mainScreen);
        window.level = '';
        variantLevel();
        const startButton = document.querySelector('.start-button');

        startButton.addEventListener('click', function () {
            const numberLevel = document.querySelectorAll('.number-level');

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
