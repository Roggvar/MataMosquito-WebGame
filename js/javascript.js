// Usada na function adjustableSize
let width = 0;
let height = 0;

// Controllers
let lifes = 1;
let timer = 10;

document.getElementById('timer').innerHTML = timer; // Mostra o primeiro seg do timer ao inves do timer - 1

// Tempo de Jogo
let chronometer = setInterval(
    function () {

        timer -= 1;
        if (timer < 0) {
            clearInterval(chronometer); // Interrompe o cronometro
            clearInterval(behavior); // Interrompe o spawn das imgs

            window.location.href = 'victory.html';
        } else {
            document.getElementById('timer').innerHTML = timer;
        }
    },
    1000
)

adjustableSize();

// Responsavel por spawnar as imgs
let behavior = setInterval(
    function () {
        flyBehavior();
    },
    2000
);

// Tamanho da tela
function adjustableSize() {

    width = window.innerWidth;
    height = window.innerHeight;
}

// Randomiza a posiçao da img
function flyBehavior() {

    // Remove a img anterio caso exista
    if (document.getElementById('fly')) {
        document.getElementById('fly').remove();

        if (lifes > 3) {

            window.location.href = 'gameover.html';

        } else {
            document.getElementById('life' + lifes).src = "../img/coracao_vazio.png";
            lifes++;
        }
    }

    // -90 para evitar a barra de scroll
    let posX = Math.floor(Math.random() * width) - 90;
    let posY = Math.floor(Math.random() * height) - 90;

    // Impede que sai da tela caso a posiçao for < 0
    if (posX < 0) { posX = 0; }
    if (posY < 0) { posY = 0; }

    console.log(posX, posY);

    // Cria o elemento html e o configura
    let flyImg = document.createElement('img');
    flyImg.src = 'img/mosca.png';
    flyImg.className = randomFlySize() + ' ' + randomFlySide(); // Precisa do space pras strings nao juntar

    // Aplica a posiçao da img
    flyImg.style.left = posX + 'px';
    flyImg.style.top = posY + 'px';
    flyImg.style.position = 'absolute';

    flyImg.id = 'fly';

    // Remove a img quando clicado
    flyImg.onclick = function () {
        this.remove();
    }

    document.body.appendChild(flyImg);
}

// Randomiza a classe de tamanho do css da img
// Usada na function randomPosition
function randomFlySize() {

    let flySize = Math.floor(Math.random() * 3);

    switch (flySize) {
        case 0:
            return 'fly1';
        case 1:
            return 'fly2';
        case 2:
            return 'fly3'
    }
}

// Randomiza a classe de lado do css da img
// Usada na function randomPosition
function randomFlySide() {

    let flySide = Math.floor(Math.random() * 2);

    switch (flySide) {
        case 0:
            return 'sideA';
        case 1:
            return 'sideB';
    }
}