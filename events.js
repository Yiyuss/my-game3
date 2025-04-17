// events.js
import { player } from './player.js'; // 引用 player.js 的角色對象
import { targetPos } from './game.js'; // 引用 game.js 的目標位置

export function movePlayer() {
  if (!player || !targetPos) return;

  const dx = targetPos.x - player.offsetLeft;
  const dy = targetPos.y - player.offsetTop;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1) return; // 如果角色已經接近目標位置，就不再更新

  const speed = 5; // 角色移動的速度
  const moveX = (dx / distance) * speed;
  const moveY = (dy / distance) * speed;

  player.style.left = player.offsetLeft + moveX + 'px';
  player.style.top = player.offsetTop + moveY + 'px';
}

// 顯示角色選擇畫面時的處理邏輯
export function showCharacterSelectScreen() {
  const characterSelectScreen = document.getElementById('character-select-screen');
  characterSelectScreen.style.display = 'block';
  
  const characterImages = document.querySelectorAll('.character-image');
  characterImages.forEach(image => {
    image.addEventListener('click', (event) => {
      selectCharacter(event.target);
    });
  });
}

export function selectCharacter(selectedImage) {
  const characterSelectScreen = document.getElementById('character-select-screen');
  characterSelectScreen.style.display = 'none';

  // 更新角色圖片
  const playerImage = document.getElementById('player');
  playerImage.src = selectedImage.src; // 假設角色圖片的選擇基於點擊的圖片

  // 開始遊戲
  startGame();
}

export function startGame() {
  // 開始遊戲的初始化邏輯
  console.log('遊戲開始!');
}
