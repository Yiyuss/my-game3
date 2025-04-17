import { resetGame, updateGame, spawnEnemy, enemyInterval, gameInterval, player, container, targetPos, playerPos } from './game.js';

let selectedCharacter = null;

document.querySelectorAll('.character').forEach(img => {
  img.addEventListener('click', () => {
    selectedCharacter = img.getAttribute('data-character');
    startGameWithCharacter(selectedCharacter);
  });
});

function startGameWithCharacter(characterUrl) {
  const characterSelect = document.getElementById('character-select');
  characterSelect.style.display = 'none';
  player.style.backgroundImage = `url('${characterUrl}')`;

  resetGame();
  gameInterval = setInterval(updateGame, 1000 / 60);
  spawnEnemy();
  enemyInterval = setInterval(spawnEnemy, 5000);
}

document.addEventListener('click', (e) => {
  if (!window.gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

function isVideoPlaying() {
  return document.getElementById('video-overlay').style.display === 'flex';
}
