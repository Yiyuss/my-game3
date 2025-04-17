import { playerPos, hitSound, showVideo, player } from './game.js';

export function moveEnemy(enemy) {
  const dx = playerPos.x - enemy.pos.x;
  const dy = playerPos.y - enemy.pos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0) {
    enemy.pos.x += dx / distance * enemy.speed;
    enemy.pos.y += dy / distance * enemy.speed;
  }

  enemy.element.style.left = enemy.pos.x + 'px';
  enemy.element.style.top = enemy.pos.y + 'px';
}

export function avoidEnemyCollision(enemy) {
  // 可加入敵人彼此避開的邏輯
}

export function checkCollision(enemy) {
  const rect1 = enemy.element.getBoundingClientRect();
  const rect2 = player.getBoundingClientRect();

  if (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  ) {
    hitSound.play();
    showVideo();
  }
}
