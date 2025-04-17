import { isGameRunning, targetPos, player } from './game.js';
import { isVideoPlaying } from './utils.js';

const container = document.getElementById('game-container');

document.addEventListener('click', (e) => {
  if (!isGameRunning() || isVideoPlaying()) return;

  const rect = container.getBoundingClientRect();
  targetPos.x = e.clientX - rect.left - player.offsetWidth / 2;
  targetPos.y = e.clientY - rect.top - player.offsetHeight / 2;
});
