import { resetGame, gameRunning, gameInterval, enemyInterval, updateGame, spawnEnemy, container, player, targetPos } from './game.js';
import { isVideoPlaying } from './utils.js';

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  resetGame();
});

document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});
const characterSelect = document.getElementById('character-select');
const characters = document.querySelectorAll('.character');

characters.forEach(char => {
  char.addEventListener('click', () => {
    const selectedImage = char.getAttribute('src');
    document.getElementById('player').style.backgroundImage = `url(${selectedImage})`;
    characterSelect.style.display = 'none';
    document.getElementById('start-btn').style.display = 'inline-block';
  });
});
