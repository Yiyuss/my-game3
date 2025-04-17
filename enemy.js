import { getRandomPosition } from './utils.js';
import { isVideoPlaying } from './events.js';

export function spawnEnemy(container, enemies, playerPos, player, hitSound, showVideo) {
  const enemyObj = {
    pos: getRandomPosition(container, enemies),
    speed: 2,
    element: document.createElement('div')
  };

  enemyObj.element.classList.add('enemy');
  enemyObj.element.style.position = 'absolute';
  enemyObj.element.style.width = '50px';
  enemyObj.element.style.height = '50px';
  enemyObj.element.style.backgroundImage = 'url("https://i.imgur.com/NPnmEtr.png")';
  enemyObj.element.style.backgroundSize = 'cover';
  enemyObj.element.style.backgroundRepeat = 'no-repeat';

  container.appendChild(enemyObj.element);
  enemyObj.element.style.left = enemyObj.pos.x + 'px';
  enemyObj.element.style.top = enemyObj.pos.y + 'px';

  enemies.push(enemyObj);
  setInterval(() => moveEnemy(enemyObj, container, playerPos, player, hitSound, showVideo, enemies), 30);
}

function moveEnemy(enemyObj, container, playerPos, player, hitSound, showVideo, enemies) {
  if (isVideoPlaying()) return;

  let dx = playerPos.x - enemyObj.pos.x;
  let dy = playerPos.y - enemyObj.pos.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  let speed = enemyObj.speed;

  if (dist > speed) {
    enemyObj.pos.x += (dx / dist) * speed;
    enemyObj.pos.y += (dy / dist) * speed;

    const maxX = container.clientWidth - 50;
    const maxY = container.clientHeight - 50;

    enemyObj.pos.x = Math.max(0, Math.min(enemyObj.pos.x, maxX));
    enemyObj.pos.y = Math.max(0, Math.min(enemyObj.pos.y, maxY));

    enemyObj.element.style.left = enemyObj.pos.x + 'px';
    enemyObj.element.style.top = enemyObj.pos.y + 'px';
  }

  avoidEnemyCollision(enemyObj, enemies, container);
  checkCollision(enemyObj, player, hitSound, showVideo);
}

function avoidEnemyCollision(enemyObj, enemies, container) {
  const minDist = 60;
  enemies.forEach(other => {
    if (enemyObj === other) return;

    let dx = enemyObj.pos.x - other.pos.x;
    let dy = enemyObj.pos.y - other.pos.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < minDist) {
      let angle = Math.atan2(dy, dx);
      let offsetX = Math.cos(angle) * (minDist - dist);
      let offsetY = Math.sin(angle) * (minDist - dist);

      enemyObj.pos.x += offsetX;
      enemyObj.pos.y += offsetY;

      const maxX = container.clientWidth - 50;
      const maxY = container.clientHeight - 50;

      enemyObj.pos.x = Math.max(0, Math.min(enemyObj.pos.x, maxX));
      enemyObj.pos.y = Math.max(0, Math.min(enemyObj.pos.y, maxY));

      enemyObj.element.style.left = enemyObj.pos.x + 'px';
      enemyObj.element.style.top = enemyObj.pos.y + 'px';
    }
  });
}

function checkCollision(enemyObj, player, hitSound, showVideo) {
  let playerRect = player.getBoundingClientRect();
  let enemyRect = enemyObj.element.getBoundingClientRect();

  if (
    playerRect.right > enemyRect.left &&
    playerRect.left < enemyRect.right &&
    playerRect.bottom > enemyRect.top &&
    playerRect.top < enemyRect.bottom
  ) {
    hitSound.play();
    showVideo();
  }
}
