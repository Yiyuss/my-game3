import { playerPos, player, enemies, hitSound, showVideo } from './game.js';

export function moveEnemy(enemy) {
  const dx = playerPos.x - enemy.pos.x;
  const dy = playerPos.y - enemy.pos.y;
  const dist = Math.hypot(dx, dy);
  if (dist > 0) {
    enemy.pos.x += (dx / dist) * enemy.speed;
    enemy.pos.y += (dy / dist) * enemy.speed;
    enemy.element.style.left = enemy.pos.x + 'px';
    enemy.element.style.top = enemy.pos.y + 'px';
  }
}

export function avoidEnemyCollision(currentEnemy) {
  enemies.forEach(other => {
    if (other === currentEnemy) return;
    const dx = currentEnemy.pos.x - other.pos.x;
    const dy = currentEnemy.pos.y - other.pos.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 50 && dist > 0) {
      currentEnemy.pos.x += (dx / dist) * 2;
      currentEnemy.pos.y += (dy / dist) * 2;
    }
  });
}

export function checkCollision(enemy) {
  const dx = playerPos.x - enemy.pos.x;
  const dy = playerPos.y - enemy.pos.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 40) {
    hitSound.play();
    showVideo();
  }
}
