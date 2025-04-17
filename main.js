import { initGame } from './game.js';

window.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character-select img');
  const selection = document.getElementById('character-selection');
  const player = document.getElementById('player');

  characters.forEach(img => {
    img.addEventListener('click', () => {
      const selectedSrc = img.getAttribute('src');
      player.src = selectedSrc;
      player.style.display = 'block';

      // 隱藏選角畫面
      selection.style.display = 'none';

      // ✅ 啟動遊戲
      initGame();
    });
  });
});
