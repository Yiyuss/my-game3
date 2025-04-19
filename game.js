// 🔥 新增：等級與經驗系統變數
export let level = 1;
export let experience = 0;
export const levelEl = document.getElementById('level');

// 1. 定義經驗寶石生成邏輯，接收位置參數
export function spawnExperienceGem(x, y) {
  const gem = {
    x: x,
    y: y,
    element: document.createElement('div'),
  };

  gem.element.classList.add('experience-gem');
  Object.assign(gem.element.style, {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: 'cyan',
    borderRadius: '50%',
    left: gem.x + 'px',
    top: gem.y + 'px',
    zIndex: 5
  });

  container.appendChild(gem.element);

  // 返回經驗寶石對象
  return gem;
}

// 🔥 新增：升級判斷與等級提升
function checkLevelUp() {
  while (experience >= level * 30) {
    experience -= level * 30;
    level++;
    levelEl.textContent = 'Lv. ' + level;
  }
}

// 2. 獲得經驗邏輯
export function gainExperience(amount = 10) {
  experience += amount;
  checkLevelUp();
  updateExpBar(); // 🔥 補上這行
}

// 3. 檢查玩家與經驗寶石碰撞邏輯
export function checkExperienceCollision() {
  document.querySelectorAll('.experience-gem').forEach(gemElement => {
    const gemRect = gemElement.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < gemRect.right &&
      playerRect.right > gemRect.left &&
      playerRect.top < gemRect.bottom &&
      playerRect.bottom > gemRect.top
    ) {
      gainExperience();
      gemElement.remove();
    }
  });
}

// === 原本邏輯 ===

import { movePlayer } from './player.js';
import { moveEnemy, avoidEnemyCollision } from './enemy.js';
import { getRandomPosition, isVideoPlaying } from './utils.js';

export const shootSound = document.getElementById('shoot-sound');
export const explodeSound = document.getElementById('explode-sound');
export let score = 0;
export let time = 0;
export let playerPos = { x: 200, y: 200 };
export let targetPos = { x: 200, y: 200 };
export let enemies = [];
export let bullets = [];
export let enemyInterval;
export let gameInterval;
let bulletInterval;
export let gameRunning = false;

export const scoreEl = document.getElementById('score');
export const timeEl = document.getElementById('time');
export const videoOverlay = document.getElementById('video-overlay');
export const endVideo = document.getElementById('end-video');
export const player = document.getElementById('player');
export const hitSound = document.getElementById('hit-sound');
export const container = document.getElementById('game-container');

// 更新遊戲邏輯
let gemUpdateCallbacks = [];

export function registerGemUpdater(callback) {
  gemUpdateCallbacks.push(callback);
}

export function updateGame() {
  updatePlayer();
  updateEnemies();
  updateBullets();

  // 呼叫所有經驗寶石的更新 callback
  gemUpdateCallbacks.forEach(cb => cb());

  requestAnimationFrame(updateGame);
}

// 播放廣告影片
function showVideo() {
  videoOverlay.style.display = 'block';  // 顯示遮罩層
  endVideo.style.display = 'block';      // 顯示影片
  gameRunning = false;                   // 暫停遊戲

  endVideo.play();                       // 播放影片
  endVideo.onended = function() {        // 當影片播放完畢後，重啟遊戲
    videoOverlay.style.display = 'none'; // 隱藏影片遮罩層
    endVideo.style.display = 'none';     // 隱藏影片
    resetGame();                         // 重啟遊戲
  };
}

// 檢查玩家死亡並播放影片
export function checkPlayerDeath() {
  if (playerHealth <= 0) {
    showVideo();  // 播放影片並暫停遊戲
  }
}

// 重置遊戲邏輯
export function resetGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  clearInterval(bulletInterval);

  enemies.forEach(e => {
    e.element.remove();
    clearInterval(e.moveInterval);
  });
  enemies = [];

  bullets.forEach(b => b.element.remove());
  bullets = [];

  score = 0;
  time = 0;
  experience = 0; // 🔥 新增：經驗歸零
  level = 1;      // 🔥 新增：等級歸 1
  scoreEl.textContent = score;
  timeEl.textContent = time;
  levelEl.textContent = 'Lv. 1'; // 🔥 更新顯示

  playerPos = { x: 200, y: 200 };
  targetPos = { x: 200, y: 200 };
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';

  spawnEnemy();
  spawnExperienceGem(200, 200);
  enemyInterval = setInterval(spawnEnemy, 5000);
  bulletInterval = setInterval(spawnBullet, 500);

  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

export function updateExpBar() {
  const fill = document.getElementById('experience-fill');
  const requiredExp = level * 30;
  const percentage = (experience / requiredExp) * 100;
  fill.style.width = `${Math.min(percentage, 100)}%`;
}

function startGame() {
  if (gameStarted || !selectedCharacter) return;
  gameStarted = true;

  startScreen.style.display = 'none';
  gameContainer.style.display = 'block';
  timerContainer.style.display = 'flex';

  initGame(selectedCharacter);  // 確保初始化遊戲邏輯
  startGameLoop();  // 開始遊戲循環
}
