let playerElement = null;
let playerSpeed = 5;
let playerX = 100;
let playerY = 100;
let selectedImage = '';

export function setPlayerImage(imageUrl) {
  selectedImage = imageUrl;
  if (playerElement) {
    playerElement.src = selectedImage;
  }
}

export function setupPlayer() {
  playerElement = document.getElementById('player');
  if (!playerElement) return;

  playerElement.src = selectedImage;
  playerElement.style.position = 'absolute';
  playerElement.style.width = '80px';
  playerElement.style.height = '80px';
  playerElement.style.left = playerX + 'px';
  playerElement.style.top = playerY + 'px';

  // 綁定鍵盤移動事件
  document.addEventListener('keydown', handleMovement);
}

function handleMovement(e) {
  const container = document.getElementById('game-container');
  const containerRect = container.getBoundingClientRect();
  const playerWidth = playerElement.offsetWidth;
  const playerHeight = playerElement.offsetHeight;

  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      if (playerY - playerSpeed >= 0) playerY -= playerSpeed;
      break;
    case 'ArrowDown':
    case 's':
      if (playerY + playerSpeed + playerHeight <= container.offsetHeight) playerY += playerSpeed;
      break;
    case 'ArrowLeft':
    case 'a':
      if (playerX - playerSpeed >= 0) playerX -= playerSpeed;
      break;
    case 'ArrowRight':
    case 'd':
      if (playerX + playerSpeed + playerWidth <= container.offsetWidth) playerX += playerSpeed;
      break;
  }

  playerElement.style.left = playerX + 'px';
  playerElement.style.top = playerY + 'px';
}
