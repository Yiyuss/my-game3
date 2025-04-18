import { resetGame, gameRunning, gameInterval, enemyInterval, updateGame, spawnEnemy, container, player, targetPos } from './game.js';
import { isVideoPlaying } from './utils.js';

// 控制角色選擇
const characterSelection = document.getElementById('character-selection');
const gameContainer = document.getElementById('game-container');
const playerDiv = document.getElementById('player');

// 角色選擇
document.getElementById('character1').addEventListener('click', () => startGame('character1'));
document.getElementById('character2').addEventListener('click', () => startGame('character2'));

function startGame(characterId) {
  // 選擇角色後隱藏選擇畫面，顯示遊戲畫面
  characterSelection.style.display = 'none';
  gameContainer.style.display = 'block';
  document.getElementById('scoreboard').style.display = 'block';  // 顯示計時器

  // ✅ 在這裡移除 initialized 類別，確保遊戲界面準備好
  gameContainer.classList.remove('initialized');

  // 根據選擇的角色設置背景圖片
  if (characterId === 'character1') {
    playerDiv.style.backgroundImage = 'url("https://i.imgur.com/JFTxfva.png")';
  } else if (characterId === 'character2') {
    playerDiv.style.backgroundImage = 'url("https://i.imgur.com/NPnmEtr.png")';
  }

  // 重置遊戲狀態
  resetGame();
}

document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

// 等待文檔加載完畢
document.addEventListener('DOMContentLoaded', () => {
  const characterImages = document.querySelectorAll('.character');  // 找到所有角色圖片
  const selectSound = document.getElementById('character-select-sound');  // 找到音效檔案

  // 當滑鼠移到角色圖片上時播放音效
  characterImages.forEach(character => {
    character.addEventListener('mouseenter', () => {
      selectSound.play();  // 播放音效
    });
  });
});
