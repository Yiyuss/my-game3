import { playerPos, hitSound, showVideo, player, enemies } from './game.js';

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

export function avoidEnemyCollision(currentEnemy) {
  for (const other of enemies) {
    if (other === currentEnemy) continue;

    const dx = currentEnemy.pos.x - other.pos.x;
    const dy = currentEnemy.pos.y - other.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const minDist = 50; // 每個敵人大小是 50px

    if (dist > 0 && dist < minDist) {
      // 排斥力：推開彼此
      const overlap = (minDist - dist) / 2;
      const offsetX = (dx / dist) * overlap;
      const offsetY = (dy / dist) * overlap;

      currentEnemy.pos.x += offsetX;
      currentEnemy.pos.y += offsetY;
      other.pos.x -= offsetX;
      other.pos.y -= offsetY;

      currentEnemy.element.style.left = currentEnemy.pos.x + 'px';
      currentEnemy.element.style.top = currentEnemy.pos.y + 'px';
      other.element.style.left = other.pos.x + 'px';
      other.element.style.top = other.pos.y + 'px';
    }
  }
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
