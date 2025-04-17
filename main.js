import { setupEventHandlers } from './events.js';
import { initGame, startGame } from './game.js';

let selectedCharacter = null;

window.addEventListener('DOMContentLoaded', () => {
  const characterSelect = document.getElementById('character-select');
  const characterImages = document.querySelectorAll('.character');

  // 點選角色圖片進入遊戲
  characterImages.forEach(img => {
    img.addEventListener('click', () => {
      selectedCharacter = img.getAttribute('data-character');
      characterSelect.style.display = 'none';
      startGame(selectedCharacter); // 根據角色開始遊戲
    });
  });

  initGame(); // 初始化遊戲畫面與邏輯
});
