import { startGame } from './game.js'; // 引入遊戲邏輯
import { setupPlayer } from './player.js'; // 引入玩家設置

document.addEventListener('DOMContentLoaded', () => {
  const characterSelect = document.getElementById('character-select');
  const gameContainer = document.getElementById('game-container');
  const characterImages = document.querySelectorAll('.character');

  // 顯示選擇角色畫面
  characterSelect.style.display = 'flex';
  gameContainer.style.display = 'none'; // 隱藏遊戲視窗，直到選擇角色後才顯示

  // 監聽角色選擇點擊事件
  characterImages.forEach((image) => {
    image.addEventListener('click', (e) => {
      const selectedCharacter = e.target.dataset.character;

      // 記錄選擇的角色
      console.log("選擇的角色: ", selectedCharacter);

      // 隱藏角色選擇畫面
      characterSelect.style.display = 'none';
      // 顯示遊戲畫面
      gameContainer.style.display = 'block';

      // 設置玩家角色圖片
      setupPlayer(selectedCharacter);
      
      // 啟動遊戲
      startGame();
    });
  });
});
