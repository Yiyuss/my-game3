// game.js
let score = 0;
let time = 0;
let playerPos = { x: 200, y: 200 };
let enemies = [];  // 用來存儲所有敵人
let gameInterval;
let enemyInterval;
let gameRunning = false;
let targetPos = { x: playerPos.x, y: playerPos.y };

function startGame() {
  resetGame(); // 重置遊戲狀態
  gameRunning = true;

  // 啟動遊戲邏輯
  gameInterval = setInterval(updateGame, 1000 / 60); // 每秒更新60次
  spawnEnemy();  // 初始生成一個敵人
  enemyInterval = setInterval(spawnEnemy, 5000); // 每 5 秒生成一個新的敵人
}

function updateGame() {
  if (!gameRunning || isVideoPlaying()) return; // 如果影片正在播放，不進行更新

  time++;
  timeEl.textContent = time;
  score++;
  scoreEl.textContent = score;

  movePlayer();  // 讓玩家移動
}

function resetGame() {
  // 清除定時器
  clearInterval(gameInterval);
  clearInterval(enemyInterval);

  // 重新初始化遊戲狀態
  score = 0;
  time = 0;
  scoreEl.textContent = score;
  timeEl.textContent = time;

  // 重新設定玩家位置
  playerPos.x = 200;
  playerPos.y = 200;
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';

  // 清除所有敵人
  enemies.forEach(enemyObj => enemyObj.element.remove());
  enemies = []; // 清空敵人陣列

  // 重新生成敵人並啟動敵人移動
  spawnEnemy();

  // 重啟遊戲定時器
  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60); // 更新遊戲狀態
}

function spawnEnemy() {
  const enemyObj = {
    pos: getRandomPosition(),  // 隨機生成敵人位置並檢查是否與其他敵人重疊
    speed: 2,  // 敵人初速度設定為2
    element: document.createElement('div')
  };

  enemyObj.element.classList.add('enemy');  // 為敵人元素添加CSS類
  enemyObj.element.style.position = 'absolute';
  enemyObj.element.style.width = '50px';
  enemyObj.element.style.height = '50px';
  enemyObj.element.style.backgroundImage = 'url("https://i.imgur.com/NPnmEtr.png")';
  enemyObj.element.style.backgroundSize = 'cover';
  enemyObj.element.style.backgroundRepeat = 'no-repeat';
  document.getElementById('game-container').appendChild(enemyObj.element);

  // 設置敵人的位置
  enemyObj.element.style.left = enemyObj.pos.x + 'px';
  enemyObj.element.style.top = enemyObj.pos.y + 'px';

  enemies.push(enemyObj);  // 添加到敵人陣列

  // 開始移動敵人
  setInterval(() => moveEnemy(enemyObj), 30); // 每30ms更新一次
}
