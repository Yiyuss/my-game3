import { resetGame, gameRunning, gameInterval, enemyInterval, updateGame, spawnEnemy, container, player, targetPos } from './game.js';
import { isVideoPlaying } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM 已就緒，開始初始化");

  // 控制角色選擇
  const characterSelection = document.getElementById('character-selection');
  const gameContainer = document.getElementById('game-container');
  const playerDiv = document.getElementById('player');
  const characterImages = document.querySelectorAll('.character');
  const selectSound = document.getElementById('character-select-sound');

  // 角色選擇事件
  document.getElementById('character1').addEventListener('click', () => startGame('character1'));
  document.getElementById('character2').addEventListener('click', () => startGame('character2'));

  function startGame(characterId) {
    characterSelection.style.display = 'none';
    gameContainer.style.display = 'block';
    document.getElementById('scoreboard').style.display = 'block';
    gameContainer.classList.remove('initialized');

    if (characterId === 'character1') {
      playerDiv.style.backgroundImage = 'url("https://i.imgur.com/JFTxfva.png")';
    } else if (characterId === 'character2') {
      playerDiv.style.backgroundImage = 'url("https://i.imgur.com/NPnmEtr.png")';
    }

    resetGame();
  }

  // 滑鼠移上角色播放音效
  characterImages.forEach(character => {
    character.addEventListener('mouseenter', () => {
      selectSound.play();
    });
  });

  // 點擊移動玩家
  document.addEventListener('click', (e) => {
    if (!gameRunning || isVideoPlaying()) return;
    const rect = container.getBoundingClientRect();
    targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
    targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
  });
});
