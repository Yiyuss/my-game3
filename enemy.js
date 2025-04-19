import { container, player, enemies, explodeSound, spawnExperienceGem } from './game.js';

export function spawnEnemy() {
  const enemy = document.createElement('div');
  enemy.className = 'enemy';
  enemy.style.position = 'absolute';
  enemy.style.width = '30px';
  enemy.style.height = '30px';
  enemy.style.backgroundColor = 'red';
  enemy.style.left = Math.random() * 800 + 'px';
  enemy.style.top = Math.random() * 500 + 'px';
  container.appendChild(enemy);

  enemies.push({ element: enemy, hp: 30, x: 0, y: 0 });
}

export function moveEnemy(enemy) {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = enemy.element.getBoundingClientRect();
  const dx = playerRect.left - enemyRect.left;
  const dy = playerRect.top - enemyRect.top;
  const dist = Math.hypot(dx, dy);
  const speed = 1;

  // 防止除以 0
  if (dist > 0) {
    enemy.x += (dx / dist) * speed;
    enemy.y += (dy / dist) * speed;
  }

  enemy.element.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
}

export function avoidEnemyCollision(enemy) {
  // 預留處理碰撞（可忽略）
}

export function checkEnemyDeathAndDropGem(enemy) {
  if (enemy.hp <= 0) {
    explodeSound.play();

    const rect = enemy.element.getBoundingClientRect();
    spawnExperienceGem(rect.left, rect.top);

    enemy.element.remove();
    const index = enemies.indexOf(enemy);
    if (index !== -1) enemies.splice(index, 1);
  }
}
