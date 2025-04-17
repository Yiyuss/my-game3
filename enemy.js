import { increaseScore, resetGame } from './game.js';
import { showVideo } from './events.js';

let enemies = [];

export function spawnEnemy() {
  const enemy = document.createElement('div');
  enemy.className = 'enemy';
  enemy.style.position = 'absolute';
  enemy.style.width = '60px';
  enemy.style.height = '60px';
  enemy.style.background = 'red';
  enemy.style.left = `${Math.random() * 964}px`;
  enemy.style.top = `${Math.random() * 516}px`;
  document.getElementById('game-container').appendChild(enemy);
  enemies.push(enemy);

  enemy.addEventListener('click', () => {
    showVideo(() => {
      increaseScore();
      enemy.remove();
      enemies = enemies.filter(e => e !== enemy);
    });
  });
}

export function updateEnemies() {
  // 敵人邏輯擴展處
}

export function clearEnemies() {
  enemies.forEach(e => e.remove());
  enemies = [];
}
