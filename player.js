import { player, playerPos, targetPos, gameRunning, container } from './game.js';

export function movePlayer() {
  if (!gameRunning) return;

  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1) return; // 避免顫動：距離太近不再移動

  const speed = 4;
  const angle = Math.atan2(dy, dx);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  playerPos.x += vx;
  playerPos.y += vy;

  // 邊界限制
  const maxX = container.clientWidth - player.offsetWidth;
  const maxY = container.clientHeight - player.offsetHeight;

  playerPos.x = Math.max(0, Math.min(playerPos.x, maxX));
  playerPos.y = Math.max(0, Math.min(playerPos.y, maxY));

  player.style.left = playerPos.x + 'px';
  player.style.top = playerPos.y + 'px';
}
