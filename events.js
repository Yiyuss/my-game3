import {
  resetGame, updateGame, spawnEnemy,
  gameInterval, enemyInterval,
  gameRunning, container, player, targetPos
} from './game.js';

import { setPlayerImage } from './player.js';

// 點擊角色選擇即開始遊戲
const characterSelect = document.getElementById('character-select');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('game-container');

document.querySelectorAll('.character-option').forEach(option => {
  option.addEventListener('click', () => {
    const img = option.dataset.img;
    setPlayerImage(img);

    characterSelect.style.display = 'none';
    scoreboard.style.display = 'block';
    gameContainer.style.display = 'block';

    resetGame();
  });
});

// 點擊移動角色
document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

function isVideoPlaying() {
  return document.getElementById('video-overlay').style.display === 'flex';
}
