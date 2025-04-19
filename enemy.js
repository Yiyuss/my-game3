import { playerPos, player, container, showVideo, hitSound, enemies } from './game.js';

// 移動敵人
export function moveEnemy(enemyObj) {
  const dx = playerPos.x - enemyObj.pos.x;
  const dy = playerPos.y - enemyObj.pos.y;
  const angle = Math.atan2(dy, dx);

  const vx = Math.cos(angle) * enemyObj.speed;
  const vy = Math.sin(angle) * enemyObj.speed;

  enemyObj.pos.x += vx;
  enemyObj.pos.y += vy;

  // 確保敵人不會移動到遊戲區域之外
  const maxX = container.clientWidth - 50;
  const maxY = container.clientHeight - 50;
  enemyObj.pos.x = Math.max(0, Math.min(enemyObj.pos.x, maxX));
  enemyObj.pos.y = Math.max(0, Math.min(enemyObj.pos.y, maxY));

  // 更新敵人位置
  enemyObj.element.style.left = enemyObj.pos.x + 'px';
  enemyObj.element.style.top = enemyObj.pos.y + 'px';
}

// 檢查敵人是否碰到玩家
export function checkCollision(enemyObj) {
  const rect1 = player.getBoundingClientRect();
  const rect2 = enemyObj.element.getBoundingClientRect();

  // 判斷是否發生碰撞
  const isColliding = !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );

  // 播放碰撞音效並顯示視頻
  if (isColliding) {
    hitSound.play();
    showVideo();
  }
}

// 避免敵人之間的碰撞
export function avoidEnemyCollision(current) {
  enemies.forEach(other => {
    if (other === current) return;  // 跳過自身

    const dx = other.pos.x - current.pos.x;
    const dy = other.pos.y - current.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const minDistance = 50;  // 最小碰撞距離

    // 當敵人之間的距離小於最小距離時，避免重疊
    if (distance < minDistance && distance > 0) {
      const angle = Math.atan2(dy, dx);
      const overlap = minDistance - distance;

      current.pos.x -= Math.cos(angle) * overlap;
      current.pos.y -= Math.sin(angle) * overlap;

      // 更新位置
      current.element.style.left = current.pos.x + 'px';
      current.element.style.top = current.pos.y + 'px';
    }
  });
}

enemy.hp = 3; // 每隻敵人初始 3 滴血

enemy.takeDamage = function (amount) {
  this.hp -= amount;

  if (this.hp <= 0) {
    this.element.remove(); // 移除敵人
    enemies = enemies.filter(e => e !== this); // 從陣列中移除
  }
};
