import {
  startGame,
  resetGame,
  updateGame,
  spawnEnemy,
  container,
  player,
  targetPos,
  gameRunning,
  videoOverlay,
  gameInterval,
  enemyInterval
} from './game.js';

let selectedCharacter = null;

document.addEventListener('DOMContentLoaded', () => {
  const characterSelect = document.getElementById('character-select');
  const characterImages = document.querySelectorAll('.character');

  characterImages.forEach(img => {
    img.addEventListener('click', () => {
      selectedCharacter = img.dataset.character;
      player.style.backgroundImage = `url('${selectedCharacter}')`;
      characterSelect.style.display = 'none';

      resetGame();
      gameInterval.value = setInterval(updateGame, 1000 / 60);
      spawnEnemy();
      enemyInterval.value = setInterval(spawnEnemy, 5000);
      gameRunning.value = true;
    });
  });

  document.addEventListener('click', (e) => {
    if (!gameRunning.value || isVideoPlaying()) return;

    const rect = container.getBoundingClientRect();
    targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
    targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
  });
});

function isVideoPlaying() {
  return videoOverlay.style.display === 'flex';
}
