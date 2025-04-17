// utils.js
function checkCollision(enemyObj) {
  if (!gameRunning || isVideoPlaying()) return; // 影片播放中不處理碰撞檢查

  let playerRect = player.getBoundingClientRect();
  let enemyRect = enemyObj.element.getBoundingClientRect();

  if (
    playerRect.right > enemyRect.left &&
    playerRect.left < enemyRect.right &&
    playerRect.bottom > enemyRect.top &&
    playerRect.top < enemyRect.bottom
  ) {
    hitSound.play();
    showVideo(); // 播放影片
  }
}

function showVideo() {
  endVideo.src = 'https://www.youtube.com/embed/Qybud8_paik?autoplay=1';
  videoOverlay.style.display = 'flex';
  gameRunning = false; // 暫停遊戲

  // 影片播放 9 秒後關閉
  setTimeout(() => {
    videoOverlay.style.display = 'none'; // 隱藏影片
    resetGame(); // 重置遊戲狀態
  }, 9000); // 9秒後重啟遊戲
}

function isVideoPlaying() {
  return videoOverlay.style.display === 'flex';
}
