import { updateGame, resetGame } from './game.js';

document.addEventListener('click', (e) => {
  if (!gameRunning || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});

function isVideoPlaying() {
  return videoOverlay.style.display === 'flex';
}
