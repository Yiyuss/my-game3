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

  // 當敵人與玩家碰撞時，減少敵人血量
  if (isColliding) {
    enemyObj.health -= 1;  // 每次碰撞減少1血量

    // 檢查敵人是否死亡
    if (enemyObj.health <= 0) {
      // 觸發敵人死亡邏輯
      handleEnemyDeath(enemyObj);
    }
  }
}

// 處理敵人死亡
function handleEnemyDeath(enemyObj) {
  // 移除敵人
  enemyObj.element.remove();
  
  // 播放死亡動畫或效果
  showDeathEffect(enemyObj);

  // 給玩家加經驗（假設每個敵人掉 10 經驗）
  addExp(10);
}

// 增加經驗的函式
function addExp(expAmount) {
  // 假設你已經在 `exp.js` 有這個函式，可以直接使用
  currentExp += expAmount;  // 增加經驗

  // 更新經驗顯示
  updateExpDisplay();
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
