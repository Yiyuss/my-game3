let enemies = [];
let enemyInterval = null;
const enemySize = 80;
const enemySpeed = 1.5;

export function createEnemy(id, container, playerElement) {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.style.width = enemySize + 'px';
  enemy.style.height = enemySize + 'px';

  const containerRect = container.getBoundingClientRect();

  enemy.style.position = 'absolute';
  enemy.style.left = Math.random() * (container.clientWidth - enemySize) + 'px';
  enemy.style.top = Math.random() * (container.clientHeight - enemySize) + 'px';
  enemy.dataset.id = id;

  container.appendChild(enemy);
  enemies.push({
    element: enemy,
    dx: Math.random() < 0.5 ? -1 : 1,
    dy: Math.random() < 0.5 ? -1 : 1,
  });
}

export function startEnemyMovement(container, playerElement, onCollision) {
  if (enemyInterval) clearInterval(enemyInterval);
  enemyInterval = setInterval(() => {
    enemies.forEach((enemy, i) => {
      const rect = enemy.element.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      const px = enemy.element.offsetLeft;
      const py = enemy.element.offsetTop;

      // 移動
      let newX = px + enemy.dx * enemySpeed;
      let newY = py + enemy.dy * enemySpeed;

      // 邊界反彈
      if (newX <= 0 || newX + enemySize >= container.clientWidth) {
        enemy.dx *= -1;
        newX = px + enemy.dx * enemySpeed;
      }
      if (newY <= 0 || newY + enemySize >= container.clientHeight) {
        enemy.dy *= -1;
        newY = py + enemy.dy * enemySpeed;
      }

      // 與其他敵人排斥
      for (let j = 0; j < enemies.length; j++) {
        if (i === j) continue;
        const other = enemies[j];
        if (isOverlap(enemy.element, other.element)) {
          enemy.dx *= -1;
          enemy.dy *= -1;
          break;
        }
      }

      // 更新位置
      enemy.element.style.left = newX + 'px';
      enemy.element.style.top = newY + 'px';

      // 檢查與玩家碰撞
      if (isOverlap(enemy.element, playerElement)) {
        onCollision();
      }
    });
  }, 16);
}

export function resetEnemies() {
  enemies.forEach(enemy => enemy.element.remove());
  enemies = [];
  if (enemyInterval) {
    clearInterval(enemyInterval);
    enemyInterval = null;
  }
}

function isOverlap(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.right < bRect.left ||
    aRect.left > bRect.right ||
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom
  );
}
