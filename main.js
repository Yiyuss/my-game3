import { resetGame, gameRunning, gameInterval, enemyInterval, updateGame, spawnEnemy, container, player, targetPos } from './game.js';
import { isVideoPlaying } from './utils.js';

// 控制角色選擇
const characterSelection = document.getElementById('character-selection');
const gameContainer = document.getElementById('game-container');
const startBtn = document.getElementById('start-btn');
const playerDiv = document.getElementById('player');

// 角色選擇
document.getElementById('character1').addEventListener('click', () => startGame('character1'));
document.getElementById('character2').addEventListener('click', () => startGame('character2'));

function startGame(characterId) {
  // 選擇角色後隱藏選擇畫面，顯示遊戲畫面
  characterSelection.style.display = 'none';
  gameContainer.style.display = 'block';
  
  if (characterId === 'character1') {
    playerDiv.style.backgroundImage = 'url("https://i.imgur.com/JFTxfva.png")';
  } else if (characterId === 'character2') {
    playerDiv.style.backgroundImage = 'url("https://i.imgur.com/NPnmEtr.png")';
  }
  
  resetGame();
}

startBtn.addEventListener('click', () => {
  resetGame();
});

document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});
