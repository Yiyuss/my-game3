import { createEnemy, removeAllEnemies } from './enemy.js';
import { getRandomInt, isColliding } from './utils.js';

export const container = document.getElementById('game-container');
export const player = document.getElementById('player');
export const videoOverlay = document.getElementById('video-overlay');
export const endVideo = document.getElementById('end-video');

export const targetPos = { x: 100, y: 100 };
export const gameInterval = { value: null };
export const enemyInterval = { value: null };
export const gameRunning = { value: false };

let score = 0;
let timeElapsed = 0;

export function resetGame() {
  score = 0;
  timeElapsed = 0;
  updateScore();
  updateTime();
  player.style.left = '100px';
  player.style.top = '100px';
  targetPos.x = 100;
  targetPos.y = 100;
  removeAllEnemies();
}

export function updateGame() {
  movePlayer();
  updateTime();

  const enemies = document.querySelectorAll('.enemy');
  enemies.forEach(enemy => {
    if (isColliding(player, enemy)) {
      showVideo();
    }
  });
}

function movePlayer() {
  const speed = 5;
  const px = parseInt(player.style.left || 0);
  const py = parseInt(player.style.top || 0);

  const dx = targetPos.x - px;
  const dy = targetPos.y - py;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > speed) {
    const nx = px + (dx / distance) * speed;
    const ny = py + (dy / distance) * speed;
    player.style.left = `${nx}px`;
    player.style.top = `${ny}px`;
  }
}

function updateScore() {
  document.getElementById('score').textContent = score;
}

function updateTime() {
  timeElapsed += 1 / 60;
  document.getElementById('time').textContent = Math.floor(timeElapsed);
}

export function spawnEnemy() {
  const enemy = createEnemy();
  container.appendChild(enemy);
}

function showVideo() {
  gameRunning.value = false;
  clearInterval(gameInterval.value);
  clearInterval(enemyInterval.value);

  endVideo.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
  videoOverlay.style.display = 'flex';

  setTimeout(() => {
    videoOverlay.style.display = 'none';
    endVideo.src = '';
    resetGame();
    gameRunning.value = true;
    gameInterval.value = setInterval(updateGame, 1000 / 60);
    enemyInterval.value = setInterval(spawnEnemy, 5000);
  }, 10000);
}
