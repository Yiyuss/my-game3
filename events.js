// enemy.js
console.log('startBtn:', startBtn);
function moveEnemy(enemyObj) {
  if (!gameRunning || isVideoPlaying()) return; // 影片播放中不處理敵人移動

  let dx = playerPos.x - enemyObj.pos.x;
  let dy = playerPos.y - enemyObj.pos.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  let speed = enemyObj.speed;  // 每個敵人的移動速度

  if (dist > speed) {
    enemyObj.pos.x += (dx / dist) * speed;
    enemyObj.pos.y += (dy / dist) * speed;
    enemyObj.element.style.left = enemyObj.pos.x + 'px';
    enemyObj.element.style.top = enemyObj.pos.y + 'px';
  }

  // 檢查敵人間的碰撞
  avoidEnemyCollision(enemyObj);

  checkCollision(enemyObj); // 檢查是否碰撞
}

function avoidEnemyCollision(enemyObj) {
  const minDist = 60; // 設定敵人之間的最小距離

  enemies.forEach(otherEnemy => {
    if (enemyObj === otherEnemy) return; // 跳過自己

    let dx = enemyObj.pos.x - otherEnemy.pos.x;
    let dy = enemyObj.pos.y - otherEnemy.pos.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // 如果兩個敵人太近，就避開
    if (dist < minDist) {
      // 計算避免重疊的方向
      let angle = Math.atan2(dy, dx);
      let offsetX = Math.cos(angle) * (minDist - dist);
      let offsetY = Math.sin(angle) * (minDist - dist);

      // 調整敵人的位置
      enemyObj.pos.x += offsetX;
      enemyObj.pos.y += offsetY;
      enemyObj.element.style.left = enemyObj.pos.x + 'px';
      enemyObj.element.style.top = enemyObj.pos.y + 'px';
    }
  });
}
