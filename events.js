import {
  startGame,
  resetGame,
  gameRunning,
  player,
  container,
  targetPos
} from './game.js';

// 角色選擇處理
window.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character');
  const characterSelect = document.getElementById('character-select');

  characters.forEach(char => {
    char.addEventListener('click', () => {
      const selectedSrc = char.getAttribute('data-src');
      player.style.backgroundImage = `url('${selectedSrc}')`;

      characterSelect.style.display = 'none';

      // 強制等到畫面完成再重設並開始遊戲
      setTimeout(() => {
        resetGame();
        startGame();
      }, 50);
    });
  });
});

// 點擊移動事件
document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

function isVideoPlaying() {
  const overlay = document.getElementById('video-overlay');
  return overlay && overlay.style.display === 'flex';
}
