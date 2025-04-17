import { setupPlayer, updatePlayer } from './player.js';
import { spawnEnemy, updateEnemies, clearEnemies } from './enemy.js';
import { showVideo, hideVideo } from './events.js';

let gameInterval = null;
let enemyInterval = null;
let score = 0;

export function initGame() {
  setupPlayer();
  clearEnemies();

  score = 0;
  document.getElementById('scoreboard').textContent = `分數: ${score}`;

  if (gameInterval) clearInterval(gameInterval);
  if (enemyInterval) clearInterval(enemyInterval);

  gameInterval = setInterval(() => {
    updatePlayer();
    updateEnemies();
  }, 1000 / 60);

  enemyInterval = setInterval(() => {
    spawnEnemy();
  }, 2000);
}

export function increaseScore() {
  score += 1;
  document.getElementById('scoreboard').textContent = `分數: ${score}`;
}

export function resetGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  clearEnemies();
  hideVideo();
  initGame();
}
