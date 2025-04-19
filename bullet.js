// bullet.js
import { container, player, enemies } from './game.js';

const bullets = [];
const BULLET_SPEED = 8;
const BULLET_INTERVAL = 300; // 發射間隔（毫秒）

let bulletIntervalId = null;

// 建立一顆子彈
function createBullet() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');

  const playerRect = player.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  bullet.style.left = `${player.offsetLeft + player.offsetWidth / 2 - 5}px`;
  bullet.style.top = `${player.offsetTop - 10}px`;

  container.appendChild(bullet);
  bullets.push(bullet);
}

// 移動與處理子彈邏輯
function updateBullets() {
  bullets.forEach((bullet, index) => {
    const currentTop = parseFloat(bullet.style.top);
    bullet.style.top = `${currentTop - BULLET_SPEED}px`;

    // 子彈飛出畫面則刪除
    if (currentTop < -20) {
      bullet.remove();
      bullets.splice(index, 1);
      return;
    }

    // 碰撞檢查
    enemies.forEach(enemy => {
      if (isColliding(bullet, enemy.element)) {
        enemy.takeDamage?.(1);  // 扣1滴血
        bullet.remove();
        bullets.splice(index, 1);
      }
    });
  });
}

// 播放循環
function startFiring() {
  if (bulletIntervalId) return;
  bulletIntervalId = setInterval(() => {
    createBullet();
  }, BULLET_INTERVAL);
  requestAnimationFrame(gameLoop);
}

function stopFiring() {
  clearInterval(bulletIntervalId);
  bulletIntervalId = null;
}

function gameLoop() {
  updateBullets();
  requestAnimationFrame(gameLoop);
}

// 簡單碰撞判定
function isColliding(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return (
    aRect.left < bRect.right &&
    aRect.right > bRect.left &&
    aRect.top < bRect.bottom &&
    aRect.bottom > bRect.top
  );
}

export { startFiring, stopFiring };
