// player.js
import { playerPos, targetPos, player, container } from './game.js';

export function movePlayer() {
  const speed = 5;
  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  export function setPlayerImage(url) {
  player.style.backgroundImage = `url('${url}')`;
  player.style.backgroundSize = 'cover';
  player.style.backgroundRepeat = 'no-repeat';
}

  // 若距離小於速度，直接設為目標位置，避免顫動
  if (distance < speed) {
    playerPos.x = targetPos.x;
    playerPos.y = targetPos.y;
  } else {
    playerPos.x += (dx / distance) * speed;
    playerPos.y += (dy / distance) * speed;
  }

  // 邊界限制
  const maxX = container.clientWidth - player.offsetWidth;
  const maxY = container.clientHeight - player.offsetHeight;
  playerPos.x = Math.max(0, Math.min(playerPos.x, maxX));
  playerPos.y = Math.max(0, Math.min(playerPos.y, maxY));

  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';
}
