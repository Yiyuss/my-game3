import { Game } from './game.js';

let game = new Game();
game.start();

function resizeGameContainer() {
    const gameContainer = document.getElementById('gameContainer');
    const gameWidth = 1024;
    const gameHeight = 576;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleX = windowWidth / gameWidth;
    const scaleY = windowHeight / gameHeight;
    const scale = Math.min(scaleX, scaleY);

    gameContainer.style.transform = `scale(${scale})`;
    gameContainer.style.transformOrigin = 'top left';
    gameContainer.style.position = 'absolute';
    gameContainer.style.left = `${(windowWidth - gameWidth * scale) / 2}px`;
    gameContainer.style.top = `${(windowHeight - gameHeight * scale) / 2}px`;
}

window.addEventListener('load', resizeGameContainer);
window.addEventListener('resize', resizeGameContainer);
