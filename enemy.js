import { playerPos, player, container, hitSound, enemies } from './game.js';
import { addExp } from './level.js'; // 引入addExp函數

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
export function checkCollisionWithPlayer(enemyObj) {
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
    showVideo(); // 顯示廣告影片並暫停遊戲
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

// 檢查敵人死亡並掉落經驗寶石
export function checkEnemyDeathAndDropGem(enemy) {
  const rect1 = player.getBoundingClientRect();
  const rect2 = enemy.element.getBoundingClientRect();

  if (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  ) {
    // 觸發敵人死亡
    enemy.element.remove();
    clearInterval(enemy.moveInterval);
    enemies = enemies.filter(e => e !== enemy);

    addExp(50); // 增加玩家經驗
    dropExperienceGem(enemy.pos); // 掉落經驗寶石
  }
}

// 掉落經驗寶石
function dropExperienceGem(enemyPos) {
  const gem = document.createElement('div');
  gem.classList.add('experience-gem');
  gem.style.position = 'absolute';
  gem.style.width = '20px';
  gem.style.height = '20px';
  gem.style.backgroundColor = 'purple';
  gem.style.borderRadius = '50%';
  gem.style.left = `${enemyPos.x}px`;
  gem.style.top = `${enemyPos.y}px`;

  container.appendChild(gem);

  gem.addEventListener('click', () => {
    gem.remove(); // 撿起後移除寶石
    addExp(50); // 撿取後增加經驗
  });
}

// 假設你的敵人是以 `div` 來表示的
export function spawnEnemy() {
  // 創建敵人元素
  const enemy = document.createElement('div');
  enemy.classList.add('enemy'); // 假設有 .enemy 的 CSS 樣式來設定敵人的外觀

  // 初始化敵人位置，這裡可以設定隨機位置或固定位置
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  enemy.style.position = 'absolute';
  enemy.style.left = `${x}px`;
  enemy.style.top = `${y}px`;

  // 假設敵人有一個速度
  const speed = 1 + Math.random() * 3; // 隨機速度
  const enemyObj = {
    element: enemy,
    pos: { x, y },
    speed: speed
  };

  // 把敵人元素加入到遊戲容器中
  document.getElementById('game-container').appendChild(enemy);

  // 儲存敵人的資訊
  enemies.push(enemyObj);

  // 返回創建的敵人對象（若需要）
  return enemyObj;
}
