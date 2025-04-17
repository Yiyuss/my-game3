import { resetGame, player } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  // 角色選擇區塊
  const characterSelect = document.getElementById('character-select');
  const character1 = document.getElementById('character1');
  const character2 = document.getElementById('character2');
  
  // 設定鼠標滑過的效果
  character1.addEventListener('mouseenter', () => {
    character1.style.filter = 'brightness(110%)';
  });
  character1.addEventListener('mouseleave', () => {
    character1.style.filter = 'brightness(60%)';
  });

  character2.addEventListener('mouseenter', () => {
    character2.style.filter = 'brightness(110%)';
  });
  character2.addEventListener('mouseleave', () => {
    character2.style.filter = 'brightness(60%)';
  });

  // 點擊角色後進入遊戲
  character1.addEventListener('click', () => startGame('https://i.imgur.com/JFTxfva.png'));
  character2.addEventListener('click', () => startGame('https://i.imgur.com/NPnmEtr.png'));
  
  // 開始遊戲的邏輯
  function startGame(selectedCharacter) {
    // 隱藏角色選擇畫面
    characterSelect.style.display = 'none';

    // 顯示遊戲畫面
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'block';

    // 設定玩家角色圖像
    player.style.backgroundImage = `url(${selectedCharacter})`;

    // 開始遊戲
    resetGame();
  }
});
