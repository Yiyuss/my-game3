import { spawnEnemy, resetGame, updateGame, isGameRunning } from './game.js';
import { movePlayer } from './player.js';
import { isVideoPlaying } from './utils.js';

const container = document.getElementById('game-container');
const player = document.getElementById('player');
const targetPos = { x: 0, y: 0 };

document.addEventListener('click', (e) => {
  if (!isGameRunning() || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

// 控制遊戲重置
document.getElementById('reset-btn').addEventListener('click', resetGame);

// 定時更新遊戲狀態
setInterval(() => {
  if (isGameRunning() && !isVideoPlaying()) {
    updateGame();
    movePlayer();
  }
}, 1000 / 60);

// 產生敵人
setInterval(() => {
  if (isGameRunning() && !isVideoPlaying()) {
    spawnEnemy();
  }
}, 5000);
