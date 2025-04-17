// events.js
import {
  resetGame,
  spawnEnemy,
  updateGame,
  gameRunning,
  gameInterval,
  enemyInterval,
  player,
  container,
  targetPos,
  playerPos
} from './game.js';
import { isVideoPlaying } from './utils.js';

document.getElementById('start-btn').addEventListener('click', () => {
  resetGame();
});

document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});
