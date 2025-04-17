import { startGame, resetGame, updateGame, gameRunning, spawnEnemy, enemyInterval, gameInterval, player, container, targetPos, playerPos, time, score, hitSound, videoOverlay, endVideo, scoreEl, timeEl } from './game.js';

// 點擊開始遊戲按鈕
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  resetGame();
  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
  spawnEnemy();
  enemyInterval = setInterval(spawnEnemy, 5000);
});

// 點擊移動玩家
document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

// 播放影片
function isVideoPlaying() {
  return videoOverlay.style.display === 'flex';
}
