let gameInterval;
let gameRunning = false;
let enemyInterval;
let time = 0;
let score = 0;
let targetPos = { x: 0, y: 0 };
let player;
let container = document.getElementById('game-container');
let videoOverlay = document.getElementById('video-overlay');
let gameVideo = document.getElementById('game-video');
let scoreEl = document.getElementById('score');
let timeEl = document.getElementById('time');

export function startGame() {
  resetGame();
  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

export function updateGame() {
  if (!gameRunning) return;

  time++;
  scoreEl.textContent = `Score: ${score}`;
  timeEl.textContent = `Time: ${time}`;
  // 更新遊戲邏輯
}

export function resetGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  time = 0;
  score = 0;
  player = document.getElementById('player');
  // 重置遊戲狀態
}

export function spawnEnemy() {
  // 創建敵人並加入到遊戲中
}
