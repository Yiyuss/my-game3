import { setupPlayer, setPlayerImage } from './player.js';
import { createEnemy, removeAllEnemies } from './enemy.js';

let gameInterval = null;
let gameStarted = false;
let time = 0;

export function initGame() {
  const container = document.getElementById('game-container');

  // 確保背景與遊戲區域存在
  if (!document.getElementById('background')) {
    const bg = document.createElement('div');
    bg.id = 'background';
    container.appendChild(bg);
  }

  if (!document.getElementById('player')) {
    const player = document.createElement('img');
    player.id = 'player';
    container.appendChild(player);
  }

  document.getElementById('scoreboard').style.display = 'none';
}

export function startGame(selectedCharacter) {
  if (gameStarted) return;
  gameStarted = true;

  time = 0;
  document.getElementById('time').textContent = time;
  document.getElementById('scoreboard').style.display = 'block';

  setPlayerImage(selectedCharacter);
  setupPlayer();
  removeAllEnemies();

  gameInterval = setInterval(() => {
    time++;
    document.getElementById('time').textContent = time;

    // 每 2 秒新增一隻敵人
    if (time % 2 === 0) {
      createEnemy();
    }
  }, 1000);
}

export function resetGame() {
  clearInterval(gameInterval);
  gameInterval = null;
  gameStarted = false;
  time = 0;
  document.getElementById('time').textContent = '0';
  document.getElementById('scoreboard').style.display = 'none';

  removeAllEnemies();
}
