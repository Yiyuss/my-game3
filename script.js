const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const videoOverlay = document.getElementById('video-overlay');
const endVideo = document.getElementById('end-video');
const player = document.getElementById('player');
const hitSound = document.getElementById('hit-sound');
const container = document.getElementById('game-container');

let score = 0;
let time = 0;
let playerPos = { x: 200, y: 200 };
let enemies = [];
let gameInterval;
let enemyInterval;
let gameRunning = false;
let targetPos = { x: playerPos.x, y: playerPos.y };

// 開始遊戲
startBtn.addEventListener('click', () => {
  resetGame();
  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
  spawnEnemy();
  enemyInterval = setInterval(spawnEnemy, 5000);
});

// 點擊移動
document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

// 移動玩家（含邊界限制）
function movePlayer() {
  let dx = targetPos.x - playerPos.x;
  let dy = targetPos.y - playerPos.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  let speed = 4;

  if (dist > speed) {
    playerPos.x += (dx / dist) * speed;
    playerPos.y += (dy / dist) * speed;

    const maxX = container.clientWidth - player.offsetWidth;
    const maxY = container.clientHeight - player.offsetHeight;

    playerPos.x = Math.max(0, Math.min(playerPos.x, maxX));
    playerPos.y = Math.max(0, Math.min(playerPos.y, maxY));

    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';
  }
}

// 生成敵人
function spawnEnemy() {
  const enemyObj = {
    pos: getRandomPosition(),
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
  setInterval(() => moveEnemy(enemyObj), 30);
}

// 生成不重疊的隨機位置（含邊界）
function getRandomPosition() {
  const minDist = 60;
  const width = container.clientWidth;
  const height = container.clientHeight;

  let newPos, overlap = true;
  while (overlap) {
    overlap = false;
    newPos = {
      x: Math.random() * (width - 50),
      y: Math.random() * (height - 50)
    };

    for (let i = 0; i < enemies.length; i++) {
      let dist = Math.sqrt(
        Math.pow(newPos.x - enemies[i].pos.x, 2) + Math.pow(newPos.y - enemies[i].pos.y, 2)
      );
      if (dist < minDist) {
        overlap = true;
        break;
      }
    }
  }

  return newPos;
}

// 敵人移動（含邊界）
function moveEnemy(enemyObj) {
  if (!gameRunning || isVideoPlaying()) return;

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

  avoidEnemyCollision(enemyObj);
  checkCollision(enemyObj);
}

// 避免敵人重疊
function avoidEnemyCollision(enemyObj) {
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

// 碰撞檢查
function checkCollision(enemyObj) {
  if (!gameRunning || isVideoPlaying()) return;

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

// 遊戲更新
function updateGame() {
  if (!gameRunning || isVideoPlaying()) return;

  time++;
  timeEl.textContent = time;
  score++;
  scoreEl.textContent = score;

  movePlayer();
}

// 播放影片
function showVideo() {
  endVideo.src = 'https://www.youtube.com/embed/Qybud8_paik?autoplay=1';
  videoOverlay.style.display = 'flex';
  gameRunning = false;

  setTimeout(() => {
    videoOverlay.style.display = 'none';
    resetGame();
  }, 9000);
}

// 重設遊戲
function resetGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);

  score = 0;
  time = 0;
  scoreEl.textContent = score;
  timeEl.textContent = time;

  playerPos = { x: 200, y: 200 };
  targetPos = { x: playerPos.x, y: playerPos.y };
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';

  enemies.forEach(e => e.element.remove());
  enemies = [];

  spawnEnemy();
  enemyInterval = setInterval(spawnEnemy, 5000);

  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

// 是否在播放影片
function isVideoPlaying() {
  return videoOverlay.style.display === 'flex';
}