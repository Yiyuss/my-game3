import { movePlayer } from './player.js';
import { moveEnemy, avoidEnemyCollision, checkCollision } from './enemy.js';
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

export function updateGame() {
  if (!gameRunning || isVideoPlaying()) return;
  time++;
  score++;
  timeEl.textContent = time;
  scoreEl.textContent = score;
  movePlayer();
}

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
  scoreEl.textContent = score;
  timeEl.textContent = time;

  playerPos = { x: 200, y: 200 };
  targetPos = { x: 200, y: 200 };
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';

  spawnEnemy();
  enemyInterval = setInterval(spawnEnemy, 5000);
  bulletInterval = setInterval(spawnBullet, 500);

  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

export function spawnEnemy() {
  const enemyObj = {
    pos: getRandomPosition(),
    speed: 2,
    health: 3, // 設定敵人的血量為 3
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

  shootSound.play(); // 播放射擊音效

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
        // 碰撞，扣血
        enemy.health -= 1;

        if (enemy.health <= 0) {
          enemy.element.remove();
          clearInterval(enemy.moveInterval);
          enemies.splice(i, 1);
          explodeSound.play(); // 播放爆炸音效
        }

        bullet.element.remove();
        bullets = bullets.filter(b => b !== bullet);
      }
    });

    // 如果子彈飛出畫面，移除子彈
    if (bullet.x > container.clientWidth) {
      bullet.element.remove();
      bullets = bullets.filter(b => b !== bullet);
    } else {
      requestAnimationFrame(move);
    }
  };

  requestAnimationFrame(move);
}

function showUpgradeMenu() {
    const upgradeMenu = document.createElement('div');
    upgradeMenu.classList.add('upgrade-menu');
    upgradeMenu.innerHTML = `
        <h2>選擇升級選項</h2>
        <button onclick="chooseUpgrade('health')">提升生命</button>
        <button onclick="chooseUpgrade('damage')">提升傷害</button>
        <button onclick="chooseUpgrade('speed')">提升移動速度</button>
    `;
    document.body.appendChild(upgradeMenu);
}

// 玩家選擇升級
function chooseUpgrade(type) {
    if (type === 'health') {
        playerHealth += 20;
    } else if (type === 'damage') {
        playerDamage += 10;
    } else if (type === 'speed') {
        playerSpeed += 5;
    }
    document.querySelector('.upgrade-menu').remove(); // 關閉升級選單
}

let playerLevel = 1;  // 玩家等級
let playerExperience = 0;  // 玩家經驗
const levelUpThreshold = 100; // 升級所需經驗值
let experienceBar = document.createElement('div');
experienceBar.classList.add('experience-bar');
document.body.appendChild(experienceBar);

// 顯示玩家等級與經驗條
function updateExperienceBar() {
    const experiencePercentage = (playerExperience / levelUpThreshold) * 100;
    experienceBar.style.width = `${experiencePercentage}%`;
    const levelDisplay = document.querySelector('.level-display');
    levelDisplay.innerHTML = `Level: ${playerLevel}`;
}

// 當玩家升級
function playerLevelUp() {
    playerLevel++;
    playerExperience = 0; // 重置經驗
    updateExperienceBar();
    showUpgradeMenu(); // 顯示升級選單
}

function collectExperience(gem) {
    playerExperience += 10; // 每顆經驗寶石給10點經驗
    gem.remove();
    updateExperienceBar(); // 更新經驗條

    if (playerExperience >= levelUpThreshold) {
        playerLevelUp();
    }
}
