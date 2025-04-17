// utils.js
function getRandomPosition() {
  const container = document.getElementById('game-container');
  const rect = container.getBoundingClientRect();
  const x = Math.random() * (rect.width - 50);
  const y = Math.random() * (rect.height - 50);
  return { x, y };
}

function isVideoPlaying() {
  const videoOverlay = document.getElementById('video-overlay');
  return videoOverlay.style.display === 'flex';
}

export { getRandomPosition, isVideoPlaying };
