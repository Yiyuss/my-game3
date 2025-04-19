import { movePlayer, updatePlayer } from './player.js';
import { moveEnemy, avoidEnemyCollision, spawnEnemy, checkEnemyDeathAndDropGem } from './enemy.js';
import { startFiring, stopFiring } from './bullet.js';

export const container = document.getElementById('game-container');
export const player = document.getElementById('player');
export const shootSound = document.getElementById('shoot-sound');
export const explodeSound = document.getElementById('explode-sound');
export const scoreEl = document.getElementById('score');
export const timeEl = document.getElementById('time');
export const levelEl = document.getElementById('level');

export let score = 0;
export let time = 0;
export let level = 1;
export let experience = 0;
export let playerPos = { x: 200, y: 200 };
export let targetPos = { x: 200, y: 200 };
export let enemies = [];
export let bullets = [];
export let gameRunning = false;
let bulletInterval;
let enemyInterval;
let gameInterval;

function updateGame() {
  updatePlayer();
  enemies.forEach(enemy => {
    moveEnemy(enemy);
    checkEnemyDeathAndDropGem(enemy);
    avoidEnemyCollision(enemy);
  });
  checkExperienceCollision();
  requestAnimationFrame(updateGame);
}

export function spawnExperienceGem(x, y) {
  const gem = {
    x,
    y,
    element: document.createElement('div'),
  };

  gem.element.className = 'experience-gem';
  Object.assign(gem.element.style, {
    position: 'absolute',
    width: '16px',
    height: '16px',
    backgroundColor: 'cyan',
    borderRadius: '50%',
    left: `${x}px`,
    top: `${y}px`,
    zIndex: 5,
  });

  container.appendChild(gem.element);
}

function gainExperience(amount = 10) {
  experience += amount;
  const requiredExp = level * 30;
  if (experience >= requiredExp) {
    experience -= requiredExp;
    level++;
    levelEl.textContent = 'Lv. ' + level;
  }
  updateExpBar();
}

function checkExperienceCollision() {
  const gems = document.querySelectorAll('.experience-gem');
  gems.forEach(gem => {
    const gemRect = gem.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    if (
      playerRect.left < gemRect.right &&
      playerRect.right > gemRect.left &&
      playerRect.top < gemRect.bottom &&
      playerRect.bottom > gemRect.top
    ) {
      gainExperience();
      gem.remove();
    }
  });
}

function updateExpBar() {
  const fill = document.getElementById('experience-fill');
  const requiredExp = level * 30;
  const percentage = (experience / requiredExp) * 100;
  fill.style.width = `${Math.min(percentage, 100)}%`;
}

export function initGame() {
  levelEl.textContent = 'Lv. 1';
  gameRunning = true;
  spawnEnemy();
  startFiring();
  gameInterval = setInterval(() => {
    time++;
    timeEl.textContent = time;
  }, 1000);
  enemyInterval = setInterval(spawnEnemy, 5000);
  requestAnimationFrame(updateGame);
}
