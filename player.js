import { player, playerPos, targetPos, container } from './game.js';

export function movePlayer() {
  const speed = 4;
  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    playerPos.x += dx / distance * speed;
    playerPos.y += dy / distance * speed;

    const bounds = container.getBoundingClientRect();
    const maxX = bounds.width - player.offsetWidth;
    const maxY = bounds.height - player.offsetHeight;
    playerPos.x = Math.max(0, Math.min(maxX, playerPos.x));
    playerPos.y = Math.max(0, Math.min(maxY, playerPos.y));

    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';
  }
}
