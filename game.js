// game.js
import { movePlayer } from './player.js';
import { moveEnemy, avoidEnemyCollision, checkCollision } from './enemy.js';
import { getRandomPosition, isVideoPlaying } from './utils.js';

let score = 0;
let time = 0;
let playerPos = { x: 200, y: 200 };
let targetPos = { x: 200, y: 200 };
let enemies = [];
let gameInterval;
let enemyInterval;
let gameRunning = false;

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const videoOverlay = document.getElementById('video-overlay');
const endVideo = document.getElementById('end-video');
const player = document.getElementById('player');
const hitSound = document.getElementById('hit-sound');
const container = document.getElementById('game-container');

function updateGame() {
  if (!gameRunning || isVideoPlaying()) return;
  time++;
  score++;
  timeEl.textContent = time;
  scoreEl.textContent = score;
  movePlayer(playerPos, targetPos, player);
}

function resetGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);

  score = 0;
  time = 0;
  scoreEl.textContent = score;
  timeEl.textContent = time;

  playerPos = { x: 200, y: 200 };
  targetPos = { x: 200, y: 200 };
  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';

  enemies.forEach(e => e.element.remove());
  enemies = [];

  spawnEnemy();
  enemyInterval = setInterval(spawnEnemy, 5000);

  gameRunning = true;
  gameInterval = setInterval(updateGame, 1000 / 60);
}

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
  setInterval(() => {
    if (!gameRunning) return;
    moveEnemy(enemyObj, playerPos);
    avoidEnemyCollision(enemyObj, enemies);
    checkCollision(enemyObj, playerPos, player, hitSound, showVideo);
  }, 30);
}

function showVideo() {
  endVideo.src = 'https://www.youtube.com/embed/Qybud8_paik?autoplay=1';
  videoOverlay.style.display = 'flex';
  gameRunning = false;

  setTimeout(() => {
    videoOverlay.style.display = 'none';
    resetGame();
  }, 9000);
}

export {
  resetGame,
  spawnEnemy,
  updateGame,
  player,
  container,
  playerPos,
  targetPos,
  gameRunning,
  gameInterval,
  enemyInterval,
  scoreEl,
  timeEl,
  hitSound,
  videoOverlay,
  endVideo
};
