import { setDirection, stopDirection } from './player.js';
import { startGame } from './game.js';

export function initEvents() {
  // 鍵盤事件 - 角色控制
  document.addEventListener('keydown', (e) => {
    const dir = keyToDirection(e.key);
    if (dir) setDirection(dir);
  });

  document.addEventListener('keyup', (e) => {
    const dir = keyToDirection(e.key);
    if (dir) stopDirection(dir);
  });

  // 選擇角色圖片點擊事件
  document.querySelectorAll('.character-image').forEach(img => {
    img.addEventListener('click', () => {
      const character = img.dataset.character;
      const player = document.getElementById('player');
      if (character && player) {
        // 套用圖片
        player.style.backgroundImage = `url('${character}')`;
        // 隱藏角色選擇畫面
        document.getElementById('character-selection').style.display = 'none';
        // 開始遊戲
        startGame();
      }
    });
  });
}

// 鍵盤對應方向轉換
function keyToDirection(key) {
  switch (key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      return 'up';
    case 'arrowdown':
    case 's':
      return 'down';
    case 'arrowleft':
    case 'a':
      return 'left';
    case 'arrowright':
    case 'd':
      return 'right';
    default:
      return null;
  }
}
