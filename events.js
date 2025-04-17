import {
  resetGame, gameRunning, container,
  player, targetPos
} from './game.js';

import { setPlayerImage } from './player.js';

const characterSelect = document.getElementById('character-select');
const scoreboard = document.getElementById('scoreboard');
const gameContainer = document.getElementById('game-container');

// 處理角色選擇
document.querySelectorAll('.character').forEach(option => {
  option.addEventListener('click', () => {
    const img = option.dataset.img;
    setPlayerImage(img);  // 設定角色圖片

    characterSelect.style.display = 'none';
    scoreboard.style.display = 'block';
    gameContainer.style.display = 'block';

    resetGame(); // 開始遊戲
  });
});

// 點擊遊戲畫面讓角色移動
document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

// 判斷是否正在播放影片
function isVideoPlaying() {
  return document.getElementById('video-overlay').style.display === 'flex';
}
