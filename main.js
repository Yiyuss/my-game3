import { resetGame } from './game.js';

document.querySelectorAll('.character-option').forEach(img => {
  img.addEventListener('click', () => {
    const player = document.getElementById('player');
    player.style.backgroundImage = `url("${img.src}")`;

    document.getElementById('character-selection').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    resetGame();
  });
});
