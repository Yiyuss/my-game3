import { startGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const characterSelect = document.getElementById('character-select');
  const characterImages = document.querySelectorAll('.character');
  const player = document.getElementById('player');

  characterImages.forEach(img => {
    img.addEventListener('click', () => {
      const selectedSrc = img.getAttribute('data-character');
      player.style.backgroundImage = `url('${selectedSrc}')`;
      characterSelect.style.display = 'none';
      startGame();
    });
  });

  // 點擊遊戲區域角色移動
  document.addEventListener('click', (e) => {
    if (!window.gameRunning || isVideoPlaying()) return;

    const rect = document.getElementById('game-container').getBoundingClientRect();
    window.targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
    window.targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
  });
});

function isVideoPlaying() {
  return document.getElementById('video-overlay').style.display === 'flex';
}
