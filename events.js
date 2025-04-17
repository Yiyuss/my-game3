import { spawnEnemy, resetGame, gameRunning, score, time, updateGame } from './game.js';
import { movePlayer } from './player.js';
import { isVideoPlaying } from './utils.js';

const container = document.getElementById('game-container');
const player = document.getElementById('player');
const targetPos = { x: 0, y: 0 };

// 監聽滑鼠點擊事件，控制玩家移動
document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

// 監聽重置按鈕事件
document.getElementById('reset-btn').addEventListener('click', resetGame);

// 定期更新遊戲狀態，每秒 60 次
setInterval(() => {
  if (gameRunning && !isVideoPlaying()) {
    updateGame();
    movePlayer();
  }
}, 1000 / 60);

// 定期生成敵人，每 5 秒一次
setInterval(() => {
  if (gameRunning && !isVideoPlaying()) {
    spawnEnemy();
  }
}, 5000);
