import {
  resetGame, gameRunning, gameInterval, enemyInterval,
  updateGame, spawnEnemy, container, player, targetPos
} from './game.js';
import { isVideoPlaying } from './utils.js';

// 控制 DOM 元素
const characterSelection = document.getElementById('character-selection');
const gameContainer = document.getElementById('game-container');
const playerDiv = document.getElementById('player');

// ✅ 點擊畫面移動角色（與 DOMContentLoaded 無關）
document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

// ✅ 等 DOM 完全載入後再綁定點擊與音效事件
document.addEventListener('DOMContentLoaded', () => {
  // 滑鼠移到角色播放音效
  const characterImages = document.querySelectorAll('.character');
  const selectSound = document.getElementById('character-select-sound');
  characterImages.forEach(character => {
    character.addEventListener('mouseenter', () => {
      selectSound.play();
    });
  });

  // 點擊角色切換畫面並開始遊戲
  document.getElementById('character1').addEventListener('click', () => startGame('character1'));
  document.getElementById('character2').addEventListener('click', () => startGame('character2'));
});

function startGame(characterId) {
  // 隱藏選角畫面，顯示遊戲畫面
  characterSelection.style.display = 'none';
  gameContainer.style.display = 'block';
  document.getElementById('scoreboard').style.display = 'block';
  gameContainer.classList.remove('initialized');

  // 設定角色外觀
  if (characterId === 'character1') {
    playerDiv.style.backgroundImage = 'url("https://i.imgur.com/JFTxfva.png")';
  } else if (characterId === 'character2') {
    playerDiv.style.backgroundImage = 'url("https://i.imgur.com/NPnmEtr.png")';
  }

  resetGame(); // 重設遊戲狀態
}
