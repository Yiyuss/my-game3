import {
  startGame,
  resetGame,
  updateGame,
  gameRunning,
  spawnEnemy,
  enemyInterval,
  gameInterval,
  player,
  container,
  targetPos,
  playerPos,
  time,
  score,
  hitSound,
  videoOverlay,
  endVideo,
  scoreEl,
  timeEl
} from './game.js';

const characters = document.querySelectorAll('.character');
const characterSelect = document.getElementById('character-select');

characters.forEach(char => {
  char.addEventListener('click', () => {
    const selectedSrc = char.getAttribute('data-src');
    player.style.backgroundImage = `url('${selectedSrc}')`;

    characterSelect.style.display = 'none';
    resetGame();
    startGame();
  });
});

document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

function isVideoPlaying() {
  return videoOverlay.style.display === 'flex';
}
