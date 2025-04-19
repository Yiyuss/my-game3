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

// 初始設定
let level = 1;
let exp = 0;
const maxExp = 100;

// 更新經驗條和等級顯示
function updateExpBar() {
    // 計算經驗條的寬度
    const expPercentage = (exp / maxExp) * 100;
    document.getElementById("expBar").style.width = `${expPercentage}%`;

    // 更新等級顯示
    if (exp >= maxExp) {
        level++;
        exp = 0; // 重置經驗
        maxExp += 50; // 提高升級所需經驗
    }
    document.getElementById("levelDisplay").textContent = `Level: ${level}`;
}

// 撿取經驗寶石的邏輯
function pickUpExpGem() {
    exp += 10; // 假設每顆經驗寶石增加 10 經驗
    if (exp >= maxExp) {
        exp = maxExp; // 確保不超過最大經驗
    }
    updateExpBar();
}

// 假設玩家擊敗敵人後會調用這個函數
function onEnemyDefeated() {
    pickUpExpGem();
}

function dropExperience(x, y) {
    let expGem = document.createElement('div');
    expGem.classList.add('exp-gem');
    expGem.style.left = `${x}px`;
    expGem.style.top = `${y}px`;
    document.body.appendChild(expGem);
}
