import { startGame } from './game.js'; // 引入遊戲初始化函數
import { setupPlayer } from './player.js'; // 引入玩家初始化函數

// 當用戶選擇角色時，初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
  const characterSelect = document.getElementById('character-select');
  const gameContainer = document.getElementById('game-container');
  const characterImages = document.querySelectorAll('.character');
  
  // 監聽角色選擇事件
  characterImages.forEach((image) => {
    image.addEventListener('click', (e) => {
      const selectedCharacter = e.target.dataset.character;

      // 確認選擇了角色
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
