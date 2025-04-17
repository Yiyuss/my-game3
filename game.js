export let score = 0;
export let time = 0;
export let playerPos = { x: 200, y: 200 };
export let targetPos = { x: 200, y: 200 };
export let enemies = [];
export let gameInterval;
export let enemyInterval;
export let gameRunning = false;

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const videoOverlay = document.getElementById('video-overlay');
const endVideo = document.getElementById('end-video');
export const player = document.getElementById('player'); // 玩家元素
const hitSound = document.getElementById('hit-sound');
const container = document.getElementById('game-container');

// 重置遊戲
export function resetGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);

  score = 0;
  time = 0;
  scoreEl.textContent = score;
  timeEl.textContent = time;

  playerPos = { x: 200, y: 200 };
  targetPos = { x: 200, y: 200 };
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';

  enemies.forEach(e => e.element.remove());
  enemies = [];

  spawnEnemy();
  enemyInterval = setInterval(spawnEnemy, 5000);

  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

export function spawnEnemy() {
  // 這裡保留敵人生成邏輯
}

export function updateGame() {
  if (!gameRunning) return;
  time++;
  score++;
  timeEl.textContent = time;
  scoreEl.textContent = score;
  movePlayer();
}

export function movePlayer() {
  // 玩家移動邏輯
}

export function showVideo() {
  endVideo.src = 'https://www.youtube.com/embed/Qybud8_paik?autoplay=1';
  videoOverlay.style.display = 'flex';
  gameRunning = false;

  setTimeout(() => {
    videoOverlay.style.display = 'none';
    resetGame();
  }, 9000);
}

export { playerPos, targetPos, player, container, gameRunning, hitSound };
