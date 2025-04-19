// === 引入模組與工具 ===
import { movePlayer, updatePlayer } from './player.js';
import { moveEnemy, avoidEnemyCollision, spawnEnemy, checkEnemyDeathAndDropGem, createEnemy } from './enemy.js';
import { getRandomPosition, isVideoPlaying } from './utils.js';
import { startFiring, stopFiring } from './bullet.js';
import { addExp } from './level.js'; // 引入addExp函數
import { showVideo } from './main.js'; // ✅ 呼叫 main 中的影片顯示函數

// === DOM 元素 ===
export const container = document.getElementById('game-container');
export const player = document.getElementById('player');
export const hitSound = document.getElementById('hit-sound');
export const shootSound = document.getElementById('shoot-sound');
export const explodeSound = document.getElementById('explode-sound');
export const scoreEl = document.getElementById('score');
export const timeEl = document.getElementById('time');
export const levelEl = document.getElementById('level');
export const videoOverlay = document.getElementById('video-overlay');
export const endVideo = document.getElementById('end-video');

// === 狀態變數 ===
export let score = 0;
export let time = 0;
export let level = 1;
export let experience = 0;
export let playerPos = { x: 200, y: 200 };
export let targetPos = { x: 200, y: 200 };
export let enemies = [];
export let bullets = [];
export let gameRunning = false;
let gameStarted = false;
let bulletInterval;
export let enemyInterval;
export let gameInterval;

// === 核心更新邏輯 ===
export function updateGame() {
  updatePlayer();
  enemies.forEach(enemy => {
    moveEnemy(enemy);
    checkCollisionWithPlayer(enemy);
    avoidEnemyCollision(enemy);
    checkEnemyDeathAndDropGem(enemy);
  });
  updateBullets();
  gemUpdateCallbacks.forEach(cb => cb());
  requestAnimationFrame(updateGame);
}

// === 經驗寶石系統 ===
let gemUpdateCallbacks = [];

export function registerGemUpdater(callback) {
  gemUpdateCallbacks.push(callback);
}

export function spawnExperienceGem(x, y) {
  const gem = {
    x,
    y,
    element: document.createElement('div'),
  };

  gem.element.className = 'experience-gem';
  Object.assign(gem.element.style, {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: 'cyan',
    borderRadius: '50%',
    left: `${x}px`,
    top: `${y}px`,
    zIndex: 5
  });

  container.appendChild(gem.element);
  return gem;
}

function checkLevelUp() {
  while (experience >= level * 30) {
    experience -= level * 30;
    level++;
    levelEl.textContent = 'Lv. ' + level;
  }
}

export function gainExperience(amount = 10) {
  experience += amount;
  checkLevelUp();
  updateExpBar();
  addExp(amount); // 新增這行，將經驗值加到角色的經驗系統中
}

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

export function updateExpBar() {
  const fill = document.getElementById('experience-fill');
  const requiredExp = level * 30;
  const percentage = (experience / requiredExp) * 100;
  fill.style.width = `${Math.min(percentage, 100)}%`;
}

// === 玩家死亡/影片廣告 ===
export function checkPlayerDeath() {
  if (playerHealth <= 0) {
    showVideo(); // ✅ 改為呼叫 main 的
  }
}

function showVideo() {
  videoOverlay.style.display = 'block';
  endVideo.style.display = 'block';
  gameRunning = false;

  endVideo.play();
  endVideo.onended = function () {
    videoOverlay.style.display = 'none';
    endVideo.style.display = 'none';
    resetGameState();
  };
}

// === 遊戲重置邏輯 ===
export function resetGameState() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  stopFiring();
  registerGemUpdater(checkExperienceCollision);

  enemies.forEach(e => {
    e.element.remove();
    clearInterval(e.moveInterval);
  });
  enemies = [];

  bullets.forEach(b => b.element.remove());
  bullets = [];

  score = 0;
  time = 0;
  level = 1;
  experience = 0;

  scoreEl.textContent = score;
  timeEl.textContent = time;
  levelEl.textContent = 'Lv. 1';

  playerPos = { x: 200, y: 200 };
  targetPos = { x: 200, y: 200 };
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';

  spawnEnemy();
  spawnExperienceGem(200, 200);
  enemyInterval = setInterval(spawnEnemy, 5000);
  startFiring();

  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

// 確保 initGame 函數已正確定義並導出
export function initGame(selectedCharacter) {
  console.log("初始化遊戲，角色：", selectedCharacter);
  // 根據 selectedCharacter 做初始化處理
  // 這裡是初始化遊戲邏輯的其他代碼...
}
