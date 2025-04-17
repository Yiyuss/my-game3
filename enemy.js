// enemy.js
function moveEnemy(enemyObj, playerPos) {
  const dx = playerPos.x - enemyObj.pos.x;
  const dy = playerPos.y - enemyObj.pos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0) {
    enemyObj.pos.x += (dx / distance) * enemyObj.speed;
    enemyObj.pos.y += (dy / distance) * enemyObj.speed;
    enemyObj.element.style.left = enemyObj.pos.x + 'px';
    enemyObj.element.style.top = enemyObj.pos.y + 'px';
  }
}

function avoidEnemyCollision(currentEnemy, enemies) {
  enemies.forEach(other => {
    if (other !== currentEnemy) {
      const dx = currentEnemy.pos.x - other.pos.x;
      const dy = currentEnemy.pos.y - other.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 50) {
        currentEnemy.pos.x += dx / dist;
        currentEnemy.pos.y += dy / dist;
      }
    }
  });
}

function checkCollision(enemyObj, playerPos, player, hitSound, showVideo) {
  const dx = enemyObj.pos.x - playerPos.x;
  const dy = enemyObj.pos.y - playerPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 40) {
    hitSound.play();
    showVideo();
  }
}

export { moveEnemy, avoidEnemyCollision, checkCollision };
