import { movePlayer } from './player.js';
import { moveEnemy, avoidEnemyCollision, checkCollision } from './enemy.js';
import { getRandomPosition, isVideoPlaying } from './utils.js';

let gameRunning = false;

export let score = 0;
export let time = 0;
export let playerPos = { x: 200, y: 200 };
export let targetPos = { x: 200, y: 200 };
export let enemies = [];
export let enemyInterval;
export let gameInterval;

export function isGameRunning() {
  return gameRunning;
}

export const scoreEl = document.getElementById('score');
export const timeEl = document.getElementById('time');
export const videoOverlay = document.getElementById('video-overlay');
export const endVideo = document.getElementById('end-video');
export const player = document.getElementById('player');
export const hitSound = document.getElementById('hit-sound');
export const container = document.getElementById('game-container');

// 處理玩家圖片顯示
const selectedSrc = 'your-player-image-url'; // 請替換成實際的圖片URL

// 加載玩家圖片並檢查
const playerImage = new Image();
playerImage.onload = () => {
  console.log('Player image loaded successfully');
  player.style.backgroundImage = `url("${selectedSrc}")`;
};
playerImage.onerror = (err) => {
  console.error('Error loading player image:', err);
};
playerImage.src = selectedSrc;

// 處理背景圖片顯示
const backgroundImage = 'your-background-image-url'; // 請替換成實際的背景圖片URL
container.style.backgroundImage = `url("${backgroundImage}")`;
container.style.backgroundSize = 'cover';
container.style.backgroundPosition = 'center center';

export function updateGame() {
  if (!gameRunning || isVideoPlaying()) return;
  time++;
  score++;
  timeEl.textContent = time;
  scoreEl.textContent = score;
  movePlayer();
}

export function resetGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  enemies.forEach(e => {
    e.element.remove();
    clearInterval(e.moveInterval);
  });
  enemies = [];

  score = 0;
  time = 0;
  scoreEl.textContent = score;
  timeEl.textContent = time;

  playerPos = { x: 200, y: 200 };
  targetPos = { x: 200, y: 200 };
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';

  spawnEnemy();
  enemyInterval = setInterval(spawnEnemy, 5000);
  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

export function spawnEnemy() {
  const enemyObj = {
    pos: getRandomPosition(),
    speed: 2,
    element: document.createElement('div'),
    moveInterval: null,
  };

  enemyObj.element.classList.add('enemy');
  Object.assign(enemyObj.element.style, {
    position: 'absolute',
    width: '50px',
    height: '50px',
    backgroundImage: 'url("https://i.imgur.com/NPnmEtr.png")', // 替換為你的敵人圖片URL
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  });
  container.appendChild(enemyObj.element);
  enemyObj.element.style.left = enemyObj.pos.x + 'px';
  enemyObj.element.style.top = enemyObj.pos.y + 'px';

  enemyObj.moveInterval = setInterval(() => {
    if (!gameRunning || isVideoPlaying()) return;
    moveEnemy(enemyObj);
    avoidEnemyCollision(enemyObj);
    checkCollision(enemyObj);
  }, 30);

  enemies.push(enemyObj);
}

export function showVideo() {
  gameRunning = false;
  endVideo.src = 'https://www.youtube.com/embed/Qybud8_paik?autoplay=1';
  videoOverlay.style.display = 'flex';

  enemies.forEach(e => clearInterval(e.moveInterval));

  setTimeout(() => {
    endVideo.src = '';
    videoOverlay.style.display = 'none';
    resetGame();
  }, 9000);
}
