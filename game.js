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

// 4. 檢查玩家與敵人碰撞邏輯
export function checkPlayerEnemyCollision() {
  enemies.forEach((enemy, i) => {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();

    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {
      showVideo();
      enemy.element.remove();
      clearInterval(enemy.moveInterval);
      enemies.splice(i, 1);
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
// 在 updateGame 上方加入這段
let gemUpdateCallbacks = [];

export function registerGemUpdater(callback) {
  gemUpdateCallbacks.push(callback);
}

// 主循環
export function updateGame() {
  updatePlayer();
  updateEnemies();
  updateBullets();

  // 呼叫所有經驗寶石的更新 callback
  gemUpdateCallbacks.forEach(cb => cb());

  requestAnimationFrame(updateGame);
}

export function updateExpBar() {
  const fill = document.getElementById('experience-fill');
  const requiredExp = level * 30;
  const percentage = (experience / requiredExp) * 100;
  fill.style.width = `${Math.min(percentage, 100)}%`;
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

export function spawnEnemy() {
  const enemyObj = {
    pos: getRandomPosition(),
    speed: 2,
    health: 3,
    element: document.createElement('div'),
    moveInterval: null,
  };

  enemyObj.element.classList.add('enemy');
  Object.assign(enemyObj.element.style, {
    position: 'absolute',
    width: '50px',
    height: '50px',
    backgroundImage: 'url("https://i.imgur.com/NPnmEtr.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  });
  container.appendChild(enemyObj.element);
  enemyObj.element.style.left = enemyObj.pos.x + 'px';
  enemyObj.element.style.top = enemyObj.pos.y + 'px';

  enemyObj.moveInterval = setInterval(() => {
    if (!gameRunning || isVideoPlaying()) return;
    moveEnemy(enemyObj);
    avoidEnemyCollision(enemyObj);
    checkCollision(enemyObj);
  }, 30);

  enemies.push(enemyObj);
}

export function showVideo() {
  gameRunning = false;
  endVideo.src = 'https://www.youtube.com/embed/Qybud8_paik?autoplay=1';
  videoOverlay.style.display = 'flex';

  enemies.forEach(e => clearInterval(e.moveInterval));

  setTimeout(() => {
    endVideo.src = '';
    videoOverlay.style.display = 'none';
    resetGame();
  }, 9000);
}

function spawnBullet() {
  if (!gameRunning || isVideoPlaying()) return;

  const bullet = {
    x: playerPos.x + 25 - 5,
    y: playerPos.y,
    speed: 8,
    element: document.createElement('div'),
  };

  bullet.element.classList.add('bullet');
  Object.assign(bullet.element.style, {
    position: 'absolute',
    width: '10px',
    height: '20px',
    backgroundColor: 'yellow',
    borderRadius: '5px',
    left: bullet.x + 'px',
    top: bullet.y + 'px',
    zIndex: 10
  });

  container.appendChild(bullet.element);
  bullets.push(bullet);

  shootSound.play();

  const move = () => {
    if (!gameRunning) return;

    bullet.x += bullet.speed;
    bullet.element.style.left = bullet.x + 'px';

    enemies.forEach((enemy, i) => {
      const rect1 = bullet.element.getBoundingClientRect();
      const rect2 = enemy.element.getBoundingClientRect();
      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {
        enemy.health -= 1;

        if (enemy.health <= 0) {
          enemy.element.remove();
          clearInterval(enemy.moveInterval);
          enemies.splice(i, 1);
          explodeSound.play();

          spawnExperienceGem(enemy.pos.x, enemy.pos.y);
        }

        bullet.element.remove();
        bullets = bullets.filter(b => b !== bullet);
      }
    });

    if (bullet.x > container.clientWidth) {
      bullet.element.remove();
      bullets = bullets.filter(b => b !== bullet);
    } else {
      requestAnimationFrame(move);
    }
  };

  requestAnimationFrame(move);
}
