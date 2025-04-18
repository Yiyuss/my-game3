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

  // 播放射擊音效
  if (shootSound) {
    shootSound.currentTime = 0; // 從頭開始播放
    shootSound.play();
  }

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
        // 播放敵人爆炸音效
        if (explodeSound) {
          explodeSound.currentTime = 0;
          explodeSound.play();
        }

        enemy.element.remove();
        clearInterval(enemy.moveInterval);
        enemies.splice(i, 1);

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
